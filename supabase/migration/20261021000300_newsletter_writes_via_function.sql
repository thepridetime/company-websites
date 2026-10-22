-- DRAFT migration. Review before running on production.
-- Newsletter changes now go through the newsletter-notify edge function, which saves the
-- preference and sends the email. Users can still read their own rows, but can't write them directly.
-- Without this, a change could be saved without an email.

drop policy if exists "newsletter_insert_own" on public.newsletter_subscriptions;
drop policy if exists "newsletter_update_own" on public.newsletter_subscriptions;
