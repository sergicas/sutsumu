# Sutsumu Sync Payload v1

Data: 2026-03-15

## Objectiu

Aquest document fixa la forma base del payload que Sutsumu generarà per a la futura sincronització al núvol.

Encara no activa cap backend.
Serveix per deixar clar:

- què entrarà a la sync
- què continuarà sent només local
- quin és l'abast real de la v1

## Abast de la v1

La primera versió de sync està pensada per a:

- 1 usuari
- diversos dispositius propis
- 1 workspace principal

Queda fora de la v1:

- col·laboració multiusuari
- realtime complex
- fusió automàtica de conflictes

## Entrarà A La Sync

- documents
- carpetes
- etiquetes
- versions
- metadades dels adjunts
- favorits i fixats com a propietats dels elements

## Continuarà Només Local

- carpetes desplegades
- recents del dispositiu
- esborranys locals
- historial local de backups
- handles i permisos del sistema de fitxers
- estat temporal de la UI

## Contracte D'Adjunts

La v1 només prepara metadades d'adjunt dins del payload:

- `fileName`
- `fileType`
- `fileSize`
- `sourceFormat`
- `availability`
- `checksum` (pendent de backend)
- `remoteObjectKey` (pendent de backend)

El binari encara no viatja en aquesta fase.

## Criteri De Seguretat

El payload de sync:

- no depèn de `expandedFolders`
- no depèn de `recentDocs`
- no depèn de `recentWorkspaces`
- no depèn dels `drafts` locals
- no depèn de l'historial de backups

Per tant, es pot construir sense barrejar soroll de dispositiu amb dades reals de l'usuari.

## Implementació Actual

La build actual de Sutsumu ja fa això:

- genera un `deviceId` local persistent
- fixa un `workspace` base per a la sync futura
- construeix un payload net exportable
- mostra un resum visible dins l'app

Encara no fa:

- push remot
- pull remot
- autenticació
- resolució de conflictes
