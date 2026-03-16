## Sutsumu Supabase Edge Setup v1

Aquesta es la primera configuracio real de backend viu per a `Sutsumu`, amb lectura segura del `head` i `push` manual controlat.

### Que fa aquest starter pack

- crea la taula `sutsumu_workspace_heads`
- crea un bucket privat `sutsumu-sync`
- desplega una `Edge Function` anomenada `sutsumu-head`
- retorna un descriptor `head` compatible amb l'app
- genera una URL signada del bundle quan el fitxer es en storage privat
- accepta un `POST` manual de Sutsumu per pujar un nou bundle si el `head` remot esperat continua sent el mateix

### Fitxers

- `supabase/migrations/20260316_sutsumu_head_readonly.sql`
- `supabase/functions/sutsumu-head/index.ts`
- `supabase/config.toml`

### Variables que necessita la funcio

- `SUTSUMU_SHARED_KEY`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

### Passos recomanats

1. Aplicar la migracio SQL.
2. Desplegar la funcio `sutsumu-head`.
3. Definir `SUTSUMU_SHARED_KEY` a Supabase.
4. Pujar un bundle shadow a `sutsumu-sync/...`.
5. Crear o actualitzar una fila a `sutsumu_workspace_heads`.

Quan ja tinguis el connector configurat a l'app, aquest pas 4/5 també el pot fer `Sutsumu` des del botó `Push manual`.

### Exemple de fila minima

- `local_workspace_id`: `workspace-principal`
- `name`: `Workspace principal`
- `current_revision_id`: `rev_2026_03_16`
- `payload_signature`: `sha256:...`
- `bundle_storage_path`: `sutsumu-sync/workspaces/main-shadow.json`
- `bundle_access`: `authenticated`

### Com es configura a Sutsumu

1. `Cloud Sync v1`
2. `Head backend`
3. Preset `Supabase Edge Function`
4. URL projecte: `https://<project>.supabase.co`
5. Nom funcio: `sutsumu-head`
6. Local workspace id: el mateix de la fila
7. Shared key: la mateixa que a `SUTSUMU_SHARED_KEY`

### Politica de seguretat en aquesta fase

- la funcio llegeix el `head` i accepta `push` manual
- no hi ha `pull` automàtic ni `push` automàtic
- cada `push` exigeix `expectedHeadRevisionId`
- si el `head` remot ha canviat, la funcio respon `409`
- la taula queda amb `RLS` activada
- l'accés passa per la `Edge Function`, no directament per REST
