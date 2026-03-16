# Sutsumu Backend Provider v1

Data: 2026-03-15

## Objectiu

Aquesta fase separa la idea de "font remota" del simple `bundle URL`.

Ara Sutsumu pot llegir remot en dos modes:

- `Bundle directe`
- `Head backend`

## Bundle Directe

La URL retorna directament:

- `sutsumu-cloud-sync-shadow-bundle`

És el mode més simple.

## Head Backend

La URL pot retornar:

- un descriptor `sutsumu-cloud-sync-provider-head`
- o una fila compatible de backend, per exemple una resposta `PostgREST`

amb aquests camps principals, en `camelCase` o `snake_case`:

- `provider`
- `workspaceId`
- `workspaceName`
- `headRevisionId`
- `payloadSignature`
- `bundleUrl`

Sutsumu llegeix primer aquest `head` i després resol el `bundleUrl`.

En una resposta tipus `Supabase/PostgREST`, això vol dir que també pot entendre camps com:

- `workspace_id`
- `local_workspace_id`
- `name`
- `current_revision_id`
- `payload_signature`
- `bundle_url`

I en el preset `Supabase públic` també pot construir la consulta si només reps:

- URL del projecte o de `rest/v1`
- taula/vista del head
- `local workspace id`

La consulta REST es prepara amb:

- `select=provider,local_workspace_id,name,current_revision_id,payload_signature,bundle_url,bundle_storage_path,bundle_access,updated_at`
- filtre `local_workspace_id=eq.<id>`
- `limit=1`

## Respostes Reals Que Ara Queden Cobertes

- `200` amb fila valida: connexio correcta
- `200` amb array buit: `Sense head`
- `401/403`: error d'autenticacio remot
- `404`: URL o vista no trobada

## Supabase Storage

En lloc de `bundle_url`, el head remot també pot retornar:

- `bundle_storage_path`
- `bundle_access`

on `bundle_storage_path` és la ruta completa dins de Storage, incloent bucket i camí:

- `sync-public/workspaces/main-shadow.json`

I `bundle_access` pot ser:

- `public`
- `authenticated`

Sutsumu construeix la URL final cap a:

- `/storage/v1/object/public/...`
- `/storage/v1/object/authenticated/...`

## Per Que És Important

Això ja s'assembla molt més a un backend real.

Ens permet preparar:

- Supabase
- un endpoint REST propi
- un servei intermedi

Sense haver de redissenyar la lògica de comparació segura.

## Que Continua Bloquejat

Encara no hi ha:

- autenticació d'usuari
- push remot
- pull automàtic
- resolució de conflictes

Per tant, la política continua sent:

- lectura remota sí
- comparació sí
- sobreescriptura silenciosa no
