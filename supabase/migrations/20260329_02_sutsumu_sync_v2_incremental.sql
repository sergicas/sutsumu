alter table public.sutsumu_workspace_revisions_v2
  add column if not exists commit_mode text not null default 'snapshot'
    check (commit_mode in ('snapshot', 'incremental', 'hybrid'));

alter table public.sutsumu_workspace_revisions_v2
  add column if not exists operation_count integer not null default 0;

alter table public.sutsumu_workspace_revisions_v2
  add column if not exists operations_json jsonb not null default '[]'::jsonb;

create index if not exists idx_sutsumu_revisions_v2_commit_mode
  on public.sutsumu_workspace_revisions_v2(workspace_id, commit_mode, created_at desc);
