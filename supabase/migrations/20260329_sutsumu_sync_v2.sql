-- Sutsumu Sync Backend v2
-- Real backend restart for the native Apple app.

create extension if not exists pgcrypto;

create table if not exists public.sutsumu_devices_v2 (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  local_device_id text not null,
  label text not null,
  platform text not null,
  last_seen_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, local_device_id)
);

create table if not exists public.sutsumu_workspaces_v2 (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  local_workspace_id text not null,
  name text not null,
  current_revision_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, local_workspace_id)
);

create table if not exists public.sutsumu_attachment_objects_v2 (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  workspace_id uuid references public.sutsumu_workspaces_v2(id) on delete cascade,
  checksum_sha256 text not null,
  storage_path text not null,
  mime_type text,
  size_bytes bigint not null default 0,
  upload_status text not null default 'pending'
    check (upload_status in ('pending', 'uploaded', 'failed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, checksum_sha256)
);

create table if not exists public.sutsumu_workspace_revisions_v2 (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.sutsumu_workspaces_v2(id) on delete cascade,
  author_device_id uuid references public.sutsumu_devices_v2(id) on delete set null,
  base_revision_id uuid references public.sutsumu_workspace_revisions_v2(id) on delete set null,
  payload_signature text not null,
  payload_schema text not null default 'sutsumu-workspace-v2',
  payload_version integer not null default 1,
  payload_json jsonb not null,
  attachment_summary jsonb not null default '{}'::jsonb,
  commit_status text not null default 'committed'
    check (commit_status in ('shadow', 'committed', 'conflict')),
  client_saved_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.sutsumu_workspaces_v2
  add constraint fk_sutsumu_workspaces_v2_current_revision
  foreign key (current_revision_id)
  references public.sutsumu_workspace_revisions_v2(id)
  on delete set null;

create index if not exists idx_sutsumu_devices_v2_user
  on public.sutsumu_devices_v2(user_id);

create index if not exists idx_sutsumu_workspaces_v2_user
  on public.sutsumu_workspaces_v2(user_id);

create index if not exists idx_sutsumu_revisions_v2_workspace
  on public.sutsumu_workspace_revisions_v2(workspace_id, created_at desc);

create index if not exists idx_sutsumu_revisions_v2_signature
  on public.sutsumu_workspace_revisions_v2(workspace_id, payload_signature);

create or replace function public.sutsumu_touch_updated_at_v2()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_sutsumu_devices_v2_updated_at on public.sutsumu_devices_v2;
create trigger trg_sutsumu_devices_v2_updated_at
before update on public.sutsumu_devices_v2
for each row
execute function public.sutsumu_touch_updated_at_v2();

drop trigger if exists trg_sutsumu_workspaces_v2_updated_at on public.sutsumu_workspaces_v2;
create trigger trg_sutsumu_workspaces_v2_updated_at
before update on public.sutsumu_workspaces_v2
for each row
execute function public.sutsumu_touch_updated_at_v2();

drop trigger if exists trg_sutsumu_attachment_objects_v2_updated_at on public.sutsumu_attachment_objects_v2;
create trigger trg_sutsumu_attachment_objects_v2_updated_at
before update on public.sutsumu_attachment_objects_v2
for each row
execute function public.sutsumu_touch_updated_at_v2();

alter table public.sutsumu_devices_v2 enable row level security;
alter table public.sutsumu_workspaces_v2 enable row level security;
alter table public.sutsumu_attachment_objects_v2 enable row level security;
alter table public.sutsumu_workspace_revisions_v2 enable row level security;

drop policy if exists sutsumu_devices_v2_owner_policy on public.sutsumu_devices_v2;
create policy sutsumu_devices_v2_owner_policy
on public.sutsumu_devices_v2
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists sutsumu_workspaces_v2_owner_policy on public.sutsumu_workspaces_v2;
create policy sutsumu_workspaces_v2_owner_policy
on public.sutsumu_workspaces_v2
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists sutsumu_attachment_objects_v2_owner_policy on public.sutsumu_attachment_objects_v2;
create policy sutsumu_attachment_objects_v2_owner_policy
on public.sutsumu_attachment_objects_v2
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists sutsumu_workspace_revisions_v2_owner_policy on public.sutsumu_workspace_revisions_v2;
create policy sutsumu_workspace_revisions_v2_owner_policy
on public.sutsumu_workspace_revisions_v2
for all
using (
  exists (
    select 1
    from public.sutsumu_workspaces_v2 workspaces
    where workspaces.id = workspace_id
      and workspaces.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.sutsumu_workspaces_v2 workspaces
    where workspaces.id = workspace_id
      and workspaces.user_id = auth.uid()
  )
);

insert into storage.buckets (id, name, public)
values ('sutsumu-sync-v2', 'sutsumu-sync-v2', false)
on conflict (id) do nothing;
