# Desplegament del backend v2 de Sutsumu

Aquest és el pas que falta perquè el botó `Enviar model natiu` deixi de respondre amb `Requested function was not found`.

## Què farà

- enllaçar el projecte local amb el projecte Supabase real `vlyhfgrxpyyscsklxoru`
- aplicar les migracions de `supabase/migrations`
- desplegar la function `sutsumu-sync-v2`

## Camí més fàcil

1. Obre `Finder`.
2. Ves a:
   `/Users/sergicastillo/Documents/Playground/sutsumu/scripts`
3. Fes doble clic a:
   `deploy_supabase_v2.command`
4. Si ho demana, permet que s'obri amb `Terminal`.
5. Si surt el login de Supabase al navegador, completa'l.
6. Quan el script te la demani, escriu la contrasenya remota de la base de dades de Supabase.

Quan acabi, torna a l'iPhone i prem `Enviar model natiu`.

## Si la contrasenya de Postgres falla

Hi ha un camí alternatiu que evita `db push`:

1. Obre `Supabase` > `SQL Editor`.
2. Obre aquest fitxer local:
   `/Users/sergicastillo/Documents/Playground/sutsumu/supabase/sql/sutsumu_v2_manual_setup.sql`
3. Copia tot el contingut.
4. Enganxa'l al `SQL Editor`.
5. Prem `Run`.
6. Després fes doble clic a:
   `/Users/sergicastillo/Documents/Playground/sutsumu/scripts/deploy_supabase_v2_function_only.command`

Amb aquest camí, l'SQL el poses des del dashboard i el Terminal només desplega la function.

## Nota de seguretat

La function `sutsumu-sync-v2` es desplega amb la verificació JWT de passarel·la desactivada (`--no-verify-jwt`), però continua protegida perquè el mateix codi exigeix `Authorization: Bearer ...` i valida l'usuari amb Supabase Auth abans de llegir o escriure dades.

## On trobar la contrasenya de la base de dades

La pots veure a Supabase en un d'aquests llocs:

- `Connect` > `Connection string`
- o `Settings` > `Database`

## Fitxers que desplega

- `supabase/migrations/20260329_sutsumu_sync_v2.sql`
- `supabase/migrations/20260329_02_sutsumu_sync_v2_incremental.sql`
- `supabase/migrations/20260329_03_sutsumu_sync_v2_storage_policies.sql`
- `supabase/functions/sutsumu-sync-v2/index.ts`

## Si el Terminal et diu que falta login

És normal al primer cop. El mateix script obrirà el login de Supabase CLI.

## Si després encara falla

Comprovacions ràpides:

- el projecte Supabase correcte és `vlyhfgrxpyyscsklxoru`
- la function ha de dir-se exactament `sutsumu-sync-v2`
- a l'iPhone has d'estar amb `Sessió activa`
