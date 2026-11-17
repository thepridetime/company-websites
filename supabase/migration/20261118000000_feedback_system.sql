-- ============================================================
-- THE PRIDE TIMES — FEEDBACK & INQUIRY SYSTEM MIGRATION
-- File: supabase/migration/20261118000000_feedback_system.sql
-- ============================================================

-- 1. Create table for general inquiries, story pitches, reader feedback & corrections
create table if not exists public.feedback_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  user_id uuid references auth.users(id) on delete set null,
  name text,
  email text not null,
  category text not null default 'general',
  subject text not null,
  message text not null,
  rating smallint check (rating is null or (rating >= 1 and rating <= 5)),
  article_slug text,
  article_title text,
  page_url text,
  status text not null default 'new' check (status in ('new', 'in_review', 'resolved', 'archived')),
  admin_notes text,
  metadata jsonb default '{}'::jsonb
);

-- 2. Performance indexes
create index if not exists idx_feedback_category on public.feedback_submissions(category);
create index if not exists idx_feedback_status on public.feedback_submissions(status);
create index if not exists idx_feedback_created_at on public.feedback_submissions(created_at desc);
create index if not exists idx_feedback_user_id on public.feedback_submissions(user_id);
create index if not exists idx_feedback_article_slug on public.feedback_submissions(article_slug);

-- 3. Row Level Security (RLS)
alter table public.feedback_submissions enable row level security;

-- Drop existing policies if any
drop policy if exists "Allow public insert to feedback_submissions" on public.feedback_submissions;
drop policy if exists "Users can view own feedback submissions" on public.feedback_submissions;

-- Allow anyone (guest or authenticated) to submit feedback or inquiries
create policy "Allow public insert to feedback_submissions"
  on public.feedback_submissions
  for insert
  to anon, authenticated
  with check (true);

-- Authenticated users can view their own submissions
create policy "Users can view own feedback submissions"
  on public.feedback_submissions
  for select
  to authenticated
  using (auth.uid() = user_id);
