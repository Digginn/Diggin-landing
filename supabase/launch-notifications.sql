create table if not exists public.launch_notifications (
  id uuid primary key default gen_random_uuid(),
  phone text not null,
  phone_digits text not null unique,
  privacy_agreed boolean not null default true,
  agreed_at timestamptz not null default now(),
  agreement_version text not null default '2026-09-12',
  source text not null default 'landing',
  send_status text not null default 'pending',
  created_at timestamptz not null default now(),

  constraint phone_digits_format check (phone_digits ~ '^010[0-9]{8}$'),
  constraint privacy_must_be_agreed check (privacy_agreed = true)
);

alter table public.launch_notifications enable row level security;

revoke all on table public.launch_notifications from anon;
revoke all on table public.launch_notifications from authenticated;

grant usage on schema public to service_role;
grant insert on table public.launch_notifications to service_role;
