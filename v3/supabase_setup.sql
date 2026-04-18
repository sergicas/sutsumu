-- Taula principal de sincronització
-- Executa aquest SQL a: Supabase Dashboard → SQL Editor → New query

CREATE TABLE IF NOT EXISTS sutsumu_workspaces (
  user_id  UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  data     JSONB       NOT NULL DEFAULT '{}',
  synced_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seguretat per files: cada usuari només veu i modifica el seu propi workspace
ALTER TABLE sutsumu_workspaces ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users manage their own workspace" ON sutsumu_workspaces;
CREATE POLICY "Users manage their own workspace"
  ON sutsumu_workspaces FOR ALL
  USING  (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ─────────────────────────────────────────────────────────────────────────────
-- Storage: bucket d'adjunts
-- ─────────────────────────────────────────────────────────────────────────────
-- Executa aquesta secció a: Supabase Dashboard → SQL Editor → New query
-- (o crea el bucket manualment a Dashboard → Storage → New bucket)

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'sutsumu-attachments',
  'sutsumu-attachments',
  false,
  52428800,   -- 50 MB màxim per fitxer
  NULL        -- tots els tipus MIME permesos
)
ON CONFLICT (id) DO NOTHING;

-- Polítiques RLS per a storage.objects
-- Cada usuari només pot accedir als fitxers dins la seva carpeta: {userId}/...

DROP POLICY IF EXISTS "Users can upload to their folder" ON storage.objects;
CREATE POLICY "Users can upload to their folder"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'sutsumu-attachments'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

DROP POLICY IF EXISTS "Users can read their files" ON storage.objects;
CREATE POLICY "Users can read their files"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'sutsumu-attachments'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

DROP POLICY IF EXISTS "Users can update their files" ON storage.objects;
CREATE POLICY "Users can update their files"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'sutsumu-attachments'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

DROP POLICY IF EXISTS "Users can delete their files" ON storage.objects;
CREATE POLICY "Users can delete their files"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'sutsumu-attachments'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );
