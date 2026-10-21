-- DRAFT migration. Review before running on production. Not applied.
-- Makes the three user-content tables safe to use from the browser:
-- every row is readable and writable only by its owner.
-- Note: reading_history already exists in production; "if not exists" leaves it intact.

-- 1. Reading history --------------------------------------------------------
create table if not exists public.reading_history (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  title       text not null,
  category    text,
  path        text not null,
  is_premium  boolean not null default false,
  read_at     timestamptz not null default now()
);
create index if not exists reading_history_user_read_idx
  on public.reading_history (user_id, read_at desc);
create index if not exists reading_history_user_path_idx
  on public.reading_history (user_id, path);

alter table public.reading_history enable row level security;

drop policy if exists "reading_history_select_own" on public.reading_history;
create policy "reading_history_select_own" on public.reading_history
  for select to authenticated using (auth.uid() = user_id);

drop policy if exists "reading_history_insert_own" on public.reading_history;
create policy "reading_history_insert_own" on public.reading_history
  for insert to authenticated with check (auth.uid() = user_id);

drop policy if exists "reading_history_delete_own" on public.reading_history;
create policy "reading_history_delete_own" on public.reading_history
  for delete to authenticated using (auth.uid() = user_id);

-- 2. Saved articles ---------------------------------------------------------
create table if not exists public.saved_articles (
  id        uuid primary key default gen_random_uuid(),
  user_id   uuid not null references auth.users(id) on delete cascade,
  title     text not null,
  category  text,
  path      text not null,
  saved_at  timestamptz not null default now(),
  constraint saved_articles_user_path_key unique (user_id, path)
);
create index if not exists saved_articles_user_saved_idx
  on public.saved_articles (user_id, saved_at desc);

alter table public.saved_articles enable row level security;

drop policy if exists "saved_articles_select_own" on public.saved_articles;
create policy "saved_articles_select_own" on public.saved_articles
  for select to authenticated using (auth.uid() = user_id);

drop policy if exists "saved_articles_insert_own" on public.saved_articles;
create policy "saved_articles_insert_own" on public.saved_articles
  for insert to authenticated with check (auth.uid() = user_id);

drop policy if exists "saved_articles_update_own" on public.saved_articles;
create policy "saved_articles_update_own" on public.saved_articles
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "saved_articles_delete_own" on public.saved_articles;
create policy "saved_articles_delete_own" on public.saved_articles
  for delete to authenticated using (auth.uid() = user_id);

-- 3. Newsletter subscriptions ----------------------------------------------
create table if not exists public.newsletter_subscriptions (
  user_id         uuid not null references auth.users(id) on delete cascade,
  newsletter_key  text not null,
  subscribed      boolean not null default false,
  updated_at      timestamptz not null default now(),
  primary key (user_id, newsletter_key)
);

alter table public.newsletter_subscriptions enable row level security;

drop policy if exists "newsletter_select_own" on public.newsletter_subscriptions;
create policy "newsletter_select_own" on public.newsletter_subscriptions
  for select to authenticated using (auth.uid() = user_id);

drop policy if exists "newsletter_insert_own" on public.newsletter_subscriptions;
create policy "newsletter_insert_own" on public.newsletter_subscriptions
  for insert to authenticated with check (auth.uid() = user_id);

drop policy if exists "newsletter_update_own" on public.newsletter_subscriptions;
create policy "newsletter_update_own" on public.newsletter_subscriptions
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
