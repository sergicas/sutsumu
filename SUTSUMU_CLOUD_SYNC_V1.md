# Sutsumu Cloud Sync v1

Data: 2026-03-15

## Objectiu

Definir una sincronitzacio automatica entre dispositius que sigui:

- segura
- reversible
- comprensible
- compatible amb l'arquitectura local actual de Sutsumu

L'objectiu no es "sincronitzar rapid".
L'objectiu es "sincronitzar sense perdre dades".

## Principi Base

Sutsumu ha de continuar sent `local-first`.

Aixo vol dir:

- cada canvi es desa primer en local
- el nuvol no substitueix d'entrada la base local
- si el nuvol falla, l'usuari continua treballant
- si hi ha conflicte, no s'esborra res en silenci

## Què Ha De Resoldre Aquesta v1

- Mac i iPhone han de poder compartir el mateix espai de treball
- els documents i carpetes han de viatjar sense duplicats absurds
- els adjunts han de tenir un desti remot fiable
- si hi ha conflicte, Sutsumu ha d'aturar-se i explicar-ho
- l'usuari no ha de perdre el que ja tenia en local

## Què No Ha De Fer Aquesta v1

Per seguretat, aquesta primera versio no hauria d'intentar:

- col·laboracio en temps real entre diverses persones
- fusio automatica intel·ligent de textos
- edicio simultania live
- compartir carpetes entre usuaris
- permisos complexos

La v1 ha de ser per:

- un usuari
- diversos dispositius seus
- un workspace principal

## Regla D'Or

Cap escriptura remota pot sobreescriure una altra escriptura si no sabem amb certesa quin estat es el mes recent i valid.

Traduccio no tecnica:
si hi ha dubte, Sutsumu no decideix sola.

## Model Mental Correcte

No hi hauria d'haver "un JSON viu que tothom toca alhora".

Hi hauria d'haver:

- un estat local de treball
- una cronologia de revisions remotes immutables
- una revisio actual marcada com a cap

Es mes segur guardar una sequencia de versions que no pas anar sobreescrivint sempre el mateix objecte.

## Peces Del Sistema

### 1. Usuari

Cada persona te:

- compte
- autenticacio
- espais de treball propis

### 2. Dispositiu

Cada dispositiu te:

- un `device_id`
- una data de darrera sync
- una revisio remota coneguda

### 3. Workspace

Cada workspace te:

- un `workspace_id`
- una revisio actual remota
- un historial de revisions

### 4. Adjunts

Els adjunts no haurien d'anar incrustats en una sola fila remota gegant.

Haurien d'anar a storage separat, amb:

- `checksum`
- mida
- tipus MIME
- ruta remota

## Dades Que S'Haurien De Sincronitzar

- documents
- carpetes
- estructura jerarquica
- etiquetes
- versions de document
- metadades dels adjunts
- referencies a binaris remots

## Dades Que No S'Haurien De Sincronitzar

- carpetes desplegades o plegades
- recents de sessio
- esborranys locals d'edicio
- estat de modals
- preferencies visuals temporals
- historial intern local de backups

Aixo redueix molts errors absurds.

## Proposta Tècnica Segura

### Taula `workspace_heads`

Serveix per saber quina es la revisio actual.

Campos orientatius:

- `workspace_id`
- `current_revision_id`
- `updated_at`
- `updated_by_device`

### Taula `workspace_revisions`

Serveix per guardar snapshots immutables.

Campos orientatius:

- `revision_id`
- `workspace_id`
- `base_revision_id`
- `created_at`
- `created_by_device`
- `checksum`
- `payload_json`

### Taula `attachment_objects`

Serveix per mapar els binaris reals.

Campos orientatius:

- `attachment_id`
- `workspace_id`
- `sha256`
- `size`
- `mime`
- `storage_path`
- `created_at`

### Taula `devices`

Serveix per rastrejar l'origen de cada canvi.

Campos orientatius:

- `device_id`
- `user_id`
- `label`
- `last_seen_at`

## Flux Correcte De Sincronitzacio

### En Local

1. L'usuari canvia alguna cosa.
2. Sutsumu desa el canvi en local com ja fa ara.
3. Es calcula una signatura de l'estat sincronitzable.

### Si Hi Ha Adjunts Nous

4. Els binaris nous es pugen a storage.
5. Es comprova que s'han pujat be.

### Commit Remot

6. Sutsumu intenta escriure una nova revisio remota.
7. Aquesta nova revisio diu de quina revisio remota parteix.
8. Si la revisio remota actual encara coincideix, el commit entra.
9. Si no coincideix, no s'escriu i es marca conflicte.

## Regla De Conflicte

La v1 no hauria d'usar `last write wins`.

La regla bona es:

- si no hi ha divergencia, auto-sync
- si hi ha divergencia, bloqueig segur i decisio guiada

## Què Veuria L'Usuari En Un Conflicte

No un error tecnic.

Sino un missatge clar:

"Hi ha canvis nous en un altre dispositiu i tambe tens canvis locals. Sutsumu no els barreja sola per evitar perdues."

Opcions:

- veure la versio remota
- conservar la local com a copia separada
- exportar abans de decidir

## Regla De Seguretat Abans De Qualsevol Restauracio

Abans d'aplicar estat remot conflictiu o restauracions importants:

- crear backup local
- conservar snapshot de supervivencia
- no destruir mai la copia local sense una copia de seguretat previa

## Com Ho Faria Per Fases

### Fase 0. Contracte De Dades

Abans de connectar cap backend:

- separar dades sincronitzables de dades locals
- decidir l'esquema minim
- definir revisions, adjunts i conflictes

Sortida esperada:
un contracte de dades estable.

### Fase 1. Shadow Sync

Primera connexio al nuvol, pero encara sense governar l'app.

Fer:

- pujar revisions remotes
- pujar adjunts
- no fer encara auto-restore des del nuvol

Objectiu:
validar que el model remot aguanta sense tocar el flux principal local.

### Fase 2. Pull Segur

Fer:

- lectura remota en obrir l'app
- si el local esta net i el remot es mes nou, actualitzar
- si hi ha conflicte, no aplicar res automaticament

Objectiu:
tenir sincronitzacio d'entrada segura.

### Fase 3. Push Automatic

Fer:

- pujada automatica quan l'estat local es estable
- control de revisio base
- bloqueig de conflictes

Objectiu:
tenir sincronitzacio real entre dispositius, pero encara conservadora.

### Fase 4. UX De Conflicte I Recuperacio

Fer:

- pantalla d'estat de sync
- missatges clars
- restauracio guiada
- llista de dispositius

Objectiu:
que l'usuari entengui què passa sense coneixements tecnics.

## Com Escolliria El Backend

La proposta mes raonable segueix sent `Supabase`, pero amb una condicio:

no usar-lo com a "base que sobreescrivim sense mes".

S'ha d'usar com a:

- auth
- base de revisions
- object storage per adjunts

No com a substitut improvisat de la logica local.

## Riscos Reals

Els riscos grossos no son estetics.
Son aquests:

- sobreescriptura silenciosa
- duplicats de documents
- adjunts pujats a mitges
- conflictes mal resolts
- desconnexions entre Mac i iPhone

Per tant, el sistema ha d'estar dissenyat per aturar-se abans de fer mal.

## Senyals Que La v1 Estaria Ben Feta

- no perd dades locals si el nuvol falla
- detecta conflictes i no improvisa
- guarda historial remot de revisions
- els adjunts es poden revalidar
- l'usuari pot entendre l'estat de sync

## Senyals Que La v1 Estaria Mal Plantejada

- una sola fila JSON que es va reescrivint
- no hi ha revisions
- no hi ha control de base revision
- els adjunts depenen de casualitats locals
- es fa `last write wins`

## Recomanacio Final

La forma segura d'entrar en sync no es "implementar Supabase".

La forma segura es:

1. dissenyar el contracte de sync
2. fer shadow sync
3. activar pull segur
4. activar push automatic
5. afegir UX de conflictes

## Seguent Document Util

Si aquest document queda validat, el seguent pas natural seria:

`SUTSUMU_SYNC_BACKLOG_V1.md`

Amb:

- tasques concretes
- ordre d'implementacio
- definicio de "fet"
- i riscos a vigilar en cada fase
