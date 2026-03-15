# Full De Ruta Comercial De Sutsumu

Data: 2026-03-15

## Resum Clar

Sutsumu ja no es un prototip fragil.
Ja es una app funcional i bastant solida per a us real personal.

Pero encara no esta al punt correcte per vendre-la amb tranquil·litat.

El que falta ara no es tant "mes funcions", sino sobretot:

- sincronitzacio automatica segura
- comptes d'usuari
- backend i emmagatzematge al nuvol
- suport, recuperacio i control d'errors
- ultima passada de producte i confiança

## On Es Ara

Ara mateix Sutsumu ja te:

- creacio i edicio de documents
- carpetes, etiquetes, filtres i paleta de comandes
- importacio/exportacio
- backups interns
- recuperacio d'emergencia
- backup extern automatic en escriptori compatible
- PWA usable a iPhone
- regressions critiques automatitzades

Traduccio no tecnica:
la base existeix i funciona.
El que falta es convertir aquesta base en un producte que no et generi problemes quan hi hagi usuaris reals i pagant.

## Les 4 Etapes Bones

### Etapa 1. Producte Fiable Per A Tu

Objectiu:
fer que Sutsumu sigui molt robusta per al teu us real i que no perdi dades.

Aquesta etapa esta molt avancada.

Queda pendent sobretot:

- acabar de blindar la part de sincronitzacio entre dispositius
- continuar ampliant proves critiques
- vigilar adjunts grans i casos limits

Resultat esperat:
tu la pots fer servir cada dia amb confiança alta.

### Etapa 2. Base SaaS Segura

Objectiu:
preparar-la per tenir usuaris i dades al nuvol.

Aixo implica:

- comptes d'usuari
- login
- backend
- sincronitzacio automatica segura
- emmagatzematge d'adjunts
- deteccio de conflictes

Resultat esperat:
la mateixa persona pot fer servir Sutsumu a Mac i iPhone sense por a perdre dades.

### Etapa 3. Beta Privada

Objectiu:
fer-la servir amb pocs usuaris reals abans de vendre-la obertament.

Aixo implica:

- onboarding clar
- recollida d'errors
- missatges d'ajuda
- restauracio de compte o dades
- suport minim

Resultat esperat:
descobrir els problemes reals abans de cobrar a molta gent.

### Etapa 4. Llançament Comercial

Objectiu:
obrir-la com a producte de veritat.

Aixo implica:

- preus
- plans
- pagina web clara
- termes i privacitat
- sistema de cobrament
- suport i incidencies

Resultat esperat:
ja no es nomes una app funcional, sino un negoci petit pero serios.

## El Que Falta De Veritat Per Poder Vendre-la

### Bloc 1. Dades I Confiança

Sense aquest bloc, jo no la vendria.

Falta:

- sync automatic entre dispositius
- recuperacio remota, no nomes local
- historial de revisions al nuvol
- adjunts guardats fora del navegador

### Bloc 2. Identitat D'Usuari

Falta:

- crear compte
- iniciar sessio
- recuperar acces
- distingir dispositius

### Bloc 3. Producte

Falta:

- onboarding de primera entrada
- textos mes polits
- pantalles buides ben resoltes
- explicacions clares de backup, sync i restauracio

### Bloc 4. Negoci

Falta:

- decidir a qui va dirigida
- decidir el preu
- decidir si comences com a PWA o tambe com a app nativa
- decidir quin suport oferiras

## El Que Jo No Faria

Per no fer-la petar, jo evitaria:

- afegir moltes funcions noves abans de tancar la sync
- voler vendre-la abans de tenir comptes i nuvol
- improvisar la sincronitzacio amb solucions parcials
- portar usuaris reals sense un bon sistema de recuperacio

## Ordre Recomanat

Aquest seria l'ordre bo:

1. Dissenyar la `Cloud Sync v1` de forma segura
2. Implementar-la per fases, sense tocar la base local de cop
3. Afegir comptes d'usuari
4. Fer una beta privada amb pocs usuaris
5. Polir onboarding, text i suport
6. Obrir el producte comercialment

## Quan Es Pot Considerar "Vendible"

Jo no diria que Sutsumu es vendible quan "ja funciona".

Jo diria que es vendible quan compleixi aquestes 5 condicions:

- no perd dades
- sincronitza entre dispositius amb confiança
- un usuari pot entrar i recuperar el seu espai
- hi ha una via clara de restauracio si alguna cosa falla
- tu pots entendre i gestionar els errors que apareguin

Si falta una d'aquestes peces, encara no es una app comercial madura.

## Estimacio Honesta

Sense entrar en detall tecnic:

- passar de l'estat actual a una base bona per beta privada es un salt important
- passar de beta privada a producte comercial es un segon salt

No es "un petit retoc".
Es una segona etapa del projecte.

## Decisio Mes Intel·ligent Ara

La decisio correcta ara mateix es aquesta:

no perseguir "mes funcions visibles",
sinó començar la capa que converteix Sutsumu en producte:

- sync segura
- comptes
- nuvol

## Proposta De Seguent Pas

El seguent document que te sentit fer es aquest:

`SUTSUMU_CLOUD_SYNC_V1.md`

Objectiu:
traduir la futura sincronitzacio a un pla clar, per fases, amb risc controlat i pensat ja per comercialitzar Sutsumu mes endavant.
