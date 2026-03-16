-- Sutsumu Supabase read-only head backend
-- Minimal starter pack for a live Cloud Sync head without enabling pull/push yet.

create extension if not exists pgcrypto;

create table if not exists public.sutsumu_workspace_heads (
  id uuid primary key default gen_random_uuid(),
  local_workspace_id text not null unique,
  name text not null,
  current_revision_id text not null,
  payload_signature text not null,
  bundle_url text,
  bundle_storage_path text,
  bundle_access text not null default 'authenticated'
    check (bundle_access in ('public', 'authenticated')),
  bundle_signed_ttl_seconds integer not null default 300
    check (bundle_signed_ttl_seconds between 60 and 3600),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint sutsumu_workspace_heads_bundle_ref_check
    check (coalesce(nullif(bundle_url, ''), nullif(bundle_storage_path, '')) is not null)
);

create index if not exists idx_sutsumu_workspace_heads_local_workspace
  on public.sutsumu_workspace_heads(local_workspace_id);

create or replace function public.sutsumu_touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_sutsumu_workspace_heads_updated_at on public.sutsumu_workspace_heads;
create trigger trg_sutsumu_workspace_heads_updated_at
before update on public.sutsumu_workspace_heads
for each row
execute function public.sutsumu_touch_updated_at();

alter table public.sutsumu_workspace_heads enable row level security;

comment on table public.sutsumu_workspace_heads is
  'Read model used by the Sutsumu read-only Supabase head function.';

comment on column public.sutsumu_workspace_heads.bundle_storage_path is
  'Storage path including bucket, for example: sutsumu-sync/workspaces/main-shadow.json';

comment on column public.sutsumu_workspace_heads.bundle_signed_ttl_seconds is
  'Signed URL lifetime used by the Edge Function when the bundle lives in private storage.';

insert into storage.buckets (id, name, public)
values ('sutsumu-sync', 'sutsumu-sync', false)
on conflict (id) do nothing;
