-- Sutsumu Cloud Schema v1
-- Base schema for a safe, revision-first sync backend.

create extension if not exists pgcrypto;

create table if not exists sutsumu_user_profiles (
  id uuid primary key default gen_random_uuid(),
  email text unique,
  display_name text,
  plan text not null default 'starter',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists sutsumu_devices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references sutsumu_user_profiles(id) on delete cascade,
  local_device_id text not null,
  label text not null,
  platform text not null,
  last_seen_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  unique(user_id, local_device_id)
);

create table if not exists sutsumu_workspaces (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references sutsumu_user_profiles(id) on delete cascade,
  local_workspace_id text not null,
  name text not null,
  current_revision_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, local_workspace_id)
);

create table if not exists sutsumu_attachment_objects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references sutsumu_user_profiles(id) on delete cascade,
  checksum_sha256 text not null,
  storage_path text not null,
  mime_type text,
  size_bytes bigint not null default 0,
  upload_status text not null default 'pending',
  created_at timestamptz not null default now(),
  unique(user_id, checksum_sha256)
);

create table if not exists sutsumu_workspace_revisions (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references sutsumu_workspaces(id) on delete cascade,
  author_device_id uuid references sutsumu_devices(id) on delete set null,
  base_revision_id uuid references sutsumu_workspace_revisions(id) on delete set null,
  payload_signature text not null,
  payload_schema text not null,
  payload_version integer not null default 1,
  payload_json jsonb not null,
  attachment_summary jsonb not null default '{}'::jsonb,
  commit_status text not null default 'shadow',
  created_at timestamptz not null default now()
);

create index if not exists idx_sutsumu_devices_user_id
  on sutsumu_devices(user_id);

create index if not exists idx_sutsumu_workspaces_user_id
  on sutsumu_workspaces(user_id);

create index if not exists idx_sutsumu_workspace_revisions_workspace_id
  on sutsumu_workspace_revisions(workspace_id, created_at desc);

create index if not exists idx_sutsumu_workspace_revisions_signature
  on sutsumu_workspace_revisions(workspace_id, payload_signature);

alter table sutsumu_workspaces
  add constraint fk_sutsumu_workspaces_current_revision
  foreign key (current_revision_id)
  references sutsumu_workspace_revisions(id)
  on delete set null;
