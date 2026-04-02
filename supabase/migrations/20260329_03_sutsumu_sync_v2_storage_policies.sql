-- Direct client uploads for Sutsumu v2 attachments.
-- Each user can only read and write objects under their own auth.uid() prefix.

drop policy if exists sutsumu_sync_v2_storage_select on storage.objects;
create policy sutsumu_sync_v2_storage_select
on storage.objects
for select
using (
  bucket_id = 'sutsumu-sync-v2'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists sutsumu_sync_v2_storage_insert on storage.objects;
create policy sutsumu_sync_v2_storage_insert
on storage.objects
for insert
with check (
  bucket_id = 'sutsumu-sync-v2'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists sutsumu_sync_v2_storage_update on storage.objects;
create policy sutsumu_sync_v2_storage_update
on storage.objects
for update
using (
  bucket_id = 'sutsumu-sync-v2'
  and (storage.foldername(name))[1] = auth.uid()::text
)
with check (
  bucket_id = 'sutsumu-sync-v2'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists sutsumu_sync_v2_storage_delete on storage.objects;
create policy sutsumu_sync_v2_storage_delete
on storage.objects
for delete
using (
  bucket_id = 'sutsumu-sync-v2'
  and (storage.foldername(name))[1] = auth.uid()::text
);
