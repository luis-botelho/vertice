create extension if not exists pgcrypto;
create sequence if not exists public.quotations_protocol_seq;

create table if not exists public.representative_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'representative' check (role in ('representative', 'admin')),
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.quotations (
  id uuid primary key default gen_random_uuid(),
  protocol text not null unique default ('VTC-' || to_char(now(), 'YYYY') || '-' || lpad(nextval('public.quotations_protocol_seq')::text, 4, '0')),
  customer_data jsonb not null,
  items jsonb not null,
  status text not null default 'pending' check (status in ('pending', 'in_review', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);

create table if not exists public.contact_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  cnpj text,
  whatsapp text not null,
  city text,
  message text not null,
  status text not null default 'new' check (status in ('new', 'in_progress', 'closed')),
  created_at timestamptz not null default now()
);

alter table public.representative_profiles enable row level security;
alter table public.quotations enable row level security;
alter table public.contact_requests enable row level security;

revoke all on public.representative_profiles from anon, authenticated;
revoke all on public.quotations from anon, authenticated;
revoke all on public.contact_requests from anon, authenticated;
