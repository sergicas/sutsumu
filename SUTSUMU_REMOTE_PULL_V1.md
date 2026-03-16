# Sutsumu Remote Pull v1

Data: 2026-03-15

## Que Fa Ara Mateix

La fase actual de `pull segur` fa això:

- permet importar un `bundle shadow` remot
- llegeix el `head` remot
- el compara amb el `head` local
- permet aplicar manualment un remot quan:
  - el remot va per davant
  - o el dispositiu encara no té cap `head` local equivalent
- quan hi ha divergència, ofereix una resolució guiada:
  - crea còpia crítica de recuperació
  - desa una còpia portable del local a `Workspaces recents`
  - i després aplica el remot només si tu ho confirms
- abans d'aplicar-lo, crea una còpia crítica de recuperació
- no reescriu automàticament ni el `workspace` extern ni el backup extern
- valida adjunts remots si el bundle porta:
  - `inlineDataUrl`
  - o una `downloadUrl` verificable
- detecta si:
  - no hi ha remot
  - el remot està disponible
  - local i remot estan al dia
  - el remot va per davant
  - el local va per davant
  - hi ha divergència
  - el bundle pertany a un altre workspace

## Que Encara No Fa

Encara no aplica canvis remots a cegues ni en tots els casos.

Això és deliberat.

## Per Que El Pull Automàtic Continua Bloquejat

Els `shadow bundles` actuals serveixen per:

- revisions
- comparació
- diagnòstic
- preparació de sync

Però encara no són un backend complet amb:

- storage remot d'adjunts
- verificació de `checksum`
- contracte final de restauració
- resolució de conflictes

Per tant, fer un `pull` automàtic real ara seria massa arriscat.

En aquesta fase, els adjunts remots entren així:

- si el dispositiu ja tenia el mateix fitxer binari local, Sutsumu el conserva
- si el remot porta `inlineDataUrl` o `downloadUrl`, Sutsumu el valida abans d'aplicar-lo
- si no hi ha binari remot descarregable, el document queda marcat només amb metadades

## Criteri De Seguretat

Sutsumu només hauria d'aplicar remot automàticament quan existeixin alhora:

- revisió remota confirmada
- adjunts remots verificats
- workspace coincident
- estat local net
- camí clar de restauració si alguna cosa falla

## Objectiu Del Següent Pas

El següent sprint hauria de preparar:

- adjunts remots fora del bundle inline
- verificació més forta d'integritat per backend viu
- `push` i `pull` guiats directes sobre backend amb contracte estable
