-- DRAFT migration. Review before running on production.
-- Account deletion requests. Users can create and view only their own requests.
-- Process them in Supabase Table Editor > account_requests (service role bypasses RLS).

create table if not exists public.account_requests (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  email         text not null,
  request_type  text not null check (request_type in ('delete')),
  status        text not null default 'pending',
  created_at    timestamptz not null default now()
);

alter table public.account_requests enable row level security;

drop policy if exists "account_requests_insert_own" on public.account_requests;
create policy "account_requests_insert_own" on public.account_requests
  for insert to authenticated with check (auth.uid() = user_id);

drop policy if exists "account_requests_select_own" on public.account_requests;
create policy "account_requests_select_own" on public.account_requests
  for select to authenticated using (auth.uid() = user_id);
