-- ============================================================
-- THE PRIDE TIMES — USER DEVICES & RPC FUNCTIONS
-- Migration: 20261105000100_user_devices_and_rpc.sql
-- Resolves missing RPCs and tables required by frontend auth & security
-- ============================================================

-- 1. User Devices Table (Used by src/lib/devices.ts)
CREATE TABLE IF NOT EXISTS public.user_devices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    device_id TEXT NOT NULL,
    session_id TEXT NOT NULL,
    label TEXT NOT NULL DEFAULT 'Web Browser',
    last_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT user_devices_user_device_key UNIQUE (user_id, device_id)
);

CREATE INDEX IF NOT EXISTS idx_user_devices_user_id ON public.user_devices(user_id);

ALTER TABLE public.user_devices ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "user_devices_own_select" ON public.user_devices;
CREATE POLICY "user_devices_own_select" ON public.user_devices 
    FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "user_devices_own_insert" ON public.user_devices;
CREATE POLICY "user_devices_own_insert" ON public.user_devices 
    FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "user_devices_own_update" ON public.user_devices;
CREATE POLICY "user_devices_own_update" ON public.user_devices 
    FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "user_devices_own_delete" ON public.user_devices;
CREATE POLICY "user_devices_own_delete" ON public.user_devices 
    FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- 2. start_trial RPC Function (Called by PremiumPage.tsx)
CREATE OR REPLACE FUNCTION public.start_trial()
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    curr_user_id UUID;
    curr_tier TEXT;
    already_used BOOLEAN;
BEGIN
    curr_user_id := auth.uid();
    IF curr_user_id IS NULL THEN
        RAISE EXCEPTION 'Not authenticated';
    END IF;

    -- Check if trial was already used in raw_user_meta_data
    SELECT 
        (raw_user_meta_data->>'trial_started_at') IS NOT NULL,
        raw_user_meta_data->>'tier'
    INTO already_used, curr_tier
    FROM auth.users
    WHERE id = curr_user_id;

    IF already_used THEN
        RAISE EXCEPTION 'You have already used your free trial.';
    END IF;

    -- Update user metadata to set premium tier and 30-day expiration
    UPDATE auth.users
    SET raw_user_meta_data = coalesce(raw_user_meta_data, '{}'::jsonb) || jsonb_build_object(
        'tier', 'premium',
        'trial_started_at', NOW(),
        'trial_until', (NOW() + interval '30 days')
    )
    WHERE id = curr_user_id;

    RETURN jsonb_build_object(
        'success', true,
        'tier', 'premium',
        'trial_until', (NOW() + interval '30 days')
    );
END;
$$;

-- 3. list_my_sessions RPC Function (Called by devices.ts)
CREATE OR REPLACE FUNCTION public.list_my_sessions()
RETURNS TABLE (
    device_id TEXT,
    session_id TEXT,
    label TEXT,
    last_seen_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ
)
LANGUAGE sql
SECURITY DEFINER
AS $$
    SELECT 
        d.device_id,
        d.session_id,
        d.label,
        d.last_seen_at,
        d.created_at
    FROM public.user_devices d
    WHERE d.user_id = auth.uid()
    ORDER BY d.last_seen_at DESC;
$$;

-- 4. revoke_my_session RPC Function (Called by devices.ts)
CREATE OR REPLACE FUNCTION public.revoke_my_session(p_session_id TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    DELETE FROM public.user_devices
    WHERE user_id = auth.uid() AND session_id = p_session_id;

    RETURN true;
END;
$$;

