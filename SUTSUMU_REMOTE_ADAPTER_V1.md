# Sutsumu Remote Adapter v1

Data: 2026-03-15

## Objectiu

Aquesta fase afegeix un adaptador remot de lectura.

No escriu al núvol.
No fa `pull` automàtic.

Serveix per:

- connectar una URL remota que retorna un `shadow bundle`
- tornar-la a comprovar quan obres l'app
- comparar el `head` remot amb el local

## Que Accepta

La URL ha de retornar un JSON amb schema:

- `sutsumu-cloud-sync-shadow-bundle`

Pot ser:

- una URL `https://`
- una URL `http://`
- una ruta relativa del mateix origen com `/shadow-bundle.json`

## Que Guarda Localment

Sutsumu recorda:

- la URL remota
- l'última lectura
- l'últim estat
- l'últim error de lectura

## Que Encara No Fa

- autenticació
- push remot
- storage d'adjunts
- pull automàtic real
- resolució de conflictes

## Per Que És Útil

Això ens permet provar la lògica de lectura remota i comparació sense saltar directament a Supabase ni a una sync perillosa.

És una capa intermèdia segura:

- local-first
- remota en mode lectura
- sense sobreescriptures silencioses
