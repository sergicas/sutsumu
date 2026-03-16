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
- `name`
- `current_revision_id`
- `payload_signature`
- `bundle_url`

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
