# Sutsumu Sync Backlog v1

Data: 2026-03-15

## Per A Què Serveix Aquest Document

Aquest document converteix `SUTSUMU_CLOUD_SYNC_V1.md` en una llista de feina clara.

No es un document tecnic profund.
Es una guia de treball amb:

- ordre
- prioritat
- criteri de "fet"
- risc

## Regla General

No començarem per "fer sync".

Començarem per:

1. definir be què s'ha de sincronitzar
2. muntar la base remota segura
3. validar-la sense tocar encara el flux principal
4. activar automatismes a poc a poc

## Prioritats

### P0 = imprescindible

Sense això, no s'hauria de continuar.

### P1 = molt important

Ja hauria d'entrar a la v1.

### P2 = important pero no bloquejant

Pot entrar una mica mes tard.

## Bloc 0. Preparacio

### [ ] 0.1 Definir el "payload de sync"

Prioritat: P0

Objectiu:
separar clarament el que es sincronitzable del que es nomes local.

Ha d'incloure:

- documents
- carpetes
- etiquetes
- versions
- metadades dels adjunts

No ha d'incloure:

- recents
- UI temporal
- drafts locals
- historial local de backups

Definicio de fet:

- hi ha una llista definitiva de camps sincronitzables
- hi ha una llista definitiva de camps locals
- queda escrita dins del projecte

Risc si es fa malament:

- conflictes absurds
- soroll entre dispositius
- errors dificils d'explicar

### [ ] 0.2 Decidir l'abast real de la v1

Prioritat: P0

La v1 ha de ser:

- un usuari
- diversos dispositius propis
- un workspace principal

Definicio de fet:

- queda explicitament descartat el realtime multiusuari
- queda explicitament descartada la col·laboracio compartida

Risc si es fa malament:

- el projecte creix massa
- es complica abans d'hora

## Bloc 1. Base Remota Segura

### [ ] 1.1 Crear el model de backend

Prioritat: P0

Cal crear:

- usuaris
- dispositius
- workspace actual
- historial de revisions
- storage d'adjunts

Definicio de fet:

- l'esquema existeix
- es pot crear un usuari
- es pot crear un workspace buit

Risc si es fa malament:

- remodelacio dolorosa mes endavant

### [ ] 1.2 Definir el sistema de revisions

Prioritat: P0

Cal que cada canvi remot sigui una revisio nova, no una sobreescriptura opaca.

Definicio de fet:

- cada commit remot crea una nova revisio
- hi ha una revisio actual marcada
- es pot saber de quina revisio parteix cada canvi

Risc si es fa malament:

- sobreescriptures silencioses
- restauracio impossible

### [ ] 1.3 Definir el contracte dels adjunts

Prioritat: P0

Cal decidir:

- on va el fitxer
- com s'identifica
- com es valida
- quan es considera "pujat correctament"

Definicio de fet:

- cada adjunt pot tenir `checksum`
- el backend pot verificar que existeix
- la revisio remota no apunta a fitxers fantasmes

Risc si es fa malament:

- revisions remotes trencades
- fitxers perduts o a mitges

## Bloc 2. Shadow Sync

### [ ] 2.1 Pujar revisions remotes sense governar encara l'app

Prioritat: P0

Objectiu:
que Sutsumu comenci a enviar snapshots remots, pero sense fer encara auto-restore des del nuvol.

Definicio de fet:

- l'app continua funcionant igual en local
- al backend apareixen revisions noves
- si el backend falla, l'app no es trenca

Risc si es fa malament:

- es pot confondre local amb remot massa aviat

### [ ] 2.2 Pujar adjunts nous en segon pla

Prioritat: P1

Objectiu:
fer que els binaris pugin primer i la revisio remota només es tanqui quan tot el necessari hi es.

Definicio de fet:

- els adjunts remots tenen rastre
- si la pujada falla, la revisio no es confirma

Risc si es fa malament:

- revisions remotes incompletes

### [ ] 2.3 Crear pantalla interna d'estat de sync

Prioritat: P1

Objectiu:
que l'usuari pugui veure si la sync esta:

- aturada
- pendent
- correcta
- en conflicte

Definicio de fet:

- existeix un estat visible
- no cal mirar la consola ni coses tecniques

Risc si es fa malament:

- l'usuari no entén què està passant

## Bloc 3. Pull Segur

### [ ] 3.1 Llegir la revisio remota actual en obrir l'app

Prioritat: P0

Objectiu:
saber si hi ha una versio remota mes nova.

Definicio de fet:

- l'app sap si el remot esta mes avançat
- encara no aplica canvis a cegues

### [ ] 3.2 Auto-aplicar el remot només si el local esta net

Prioritat: P0

Objectiu:
si no hi ha canvis locals pendents, el remot es pot aplicar automaticament.

Definicio de fet:

- si local net: pull segur
- si local amb canvis: no es fa pull automatic

Risc si es fa malament:

- perdre canvis locals

## Bloc 4. Push Automatic

### [ ] 4.1 Activar pujada automàtica quan l'estat local sigui estable

Prioritat: P1

Objectiu:
que la sync sigui realment automatica, pero no agressiva.

Definicio de fet:

- no puja a cada tecla
- puja quan l'estat es coherent
- no puja si no hi ha canvis reals

Risc si es fa malament:

- massa soroll
- conflictes innecessaris

### [ ] 4.2 Bloquejar commits si la base remota ha canviat

Prioritat: P0

Objectiu:
evitar que dos dispositius es trepitgin sense saber-ho.

Definicio de fet:

- cada push comprova la revisio base
- si no coincideix, no s'escriu

Risc si es fa malament:

- perdua silenciosa de dades

## Bloc 5. Conflictes

### [ ] 5.1 Dissenyar el flux de conflicte

Prioritat: P0

L'usuari ha d'entendre:

- que ha passat
- que no s'ha perdut res automaticament
- quines opcions te

Definicio de fet:

- existeix un modal o pantalla clara
- les opcions son entenedores

### [ ] 5.2 Crear una sortida segura

Prioritat: P0

Opcions minimes desitjables:

- veure remota
- conservar local com a copia nova
- exportar abans de decidir

Definicio de fet:

- cap conflicte deixa l'usuari bloquejat

Risc si es fa malament:

- suport impossible
- frustracio maxima

## Bloc 6. UX I Producte

### [ ] 6.1 Mostrar l'estat de sync a la UI principal

Prioritat: P1

Exemples d'estat:

- local
- sincronitzat
- pendent
- conflicte
- sense connexio

### [ ] 6.2 Afegir missatges humans

Prioritat: P1

No missatges tecnics.
No errors obscurs.

Definicio de fet:

- una persona no tecnica entén què passa

### [ ] 6.3 Explicar clarament què queda en local i què queda al núvol

Prioritat: P1

Objectiu:
generar confiança real.

## Bloc 7. Validacio

### [ ] 7.1 Proves automatiques noves

Prioritat: P0

Cal cobrir:

- dos dispositius
- conflicte
- pull segur
- push segur
- adjunts
- desconnexio de xarxa

Definicio de fet:

- la suite cobreix els fluxos basics de sync

### [ ] 7.2 Beta privada

Prioritat: P1

Abans de vendre-la:

- pocs usuaris
- dades reals
- seguiment d'errors

Definicio de fet:

- la sync aguanta us real extern al teu

## Bloc 8. Decisions Teves Com A Producte

Aquestes decisions no son tecniques, pero si necessaries:

### [ ] 8.1 Decidir si la sync anira inclosa al pla basic

### [ ] 8.2 Decidir si hi haurà limit de workspaces o d'espai

### [ ] 8.3 Decidir si la PWA serà la via principal o si hi haurà app nativa mes endavant

### [ ] 8.4 Decidir si vols començar amb beta privada abans de cobrar

## Ordre Recomanat De Treball

Aquest es l'ordre bo:

1. Bloc 0
2. Bloc 1
3. Bloc 2
4. Bloc 3
5. Bloc 4
6. Bloc 5
7. Bloc 6
8. Bloc 7

No canviaria aquest ordre sense motiu fort.

## Què Faria Jo Ara Mateix

Si seguim, el primer tall concret hauria de ser:

### Sprint 1

- tancar `payload de sync`
- definir què es local i què es remot
- definir esquema minim de backend
- definir contracte d'adjunts

Sortida:
un document tecnic estable i sense codi trencadís.

### Sprint 2

- començar `shadow sync`
- pujar revisions remotes
- pujar adjunts
- sense activar encara el control remot sobre l'app

Sortida:
una primera sync segura en mode observacio.

## Definicio De "No Petar"

Per aquest projecte, "no petar" vol dir:

- no perdre dades
- no sobreescriure en silenci
- no crear duplicats absurds
- no deixar l'usuari sense saber què ha passat

Si qualsevol pas nou posa en risc alguna d'aquestes 4 coses, s'ha de redissenyar abans d'entrar.
