# Sutsumu v1.0 iPhone QA

Aquest document serveix com a checklist curta i dura per decidir si la versio d'iPhone es pot considerar `v1.0`.

## Objectiu

Sutsumu v1.0 per iPhone ha de passar 3 coses:

- no perdre dades
- permetre editar i recuperar documents amb confiança
- resultar comod en us real a pantalla mobil

## Entorn minim de prova

- iPhone fisic
- iOS actual compatible
- instal·lacio des de Xcode o build signada
- prova amb connexio i prova en mode avio
- almenys un `.docx`, un `.pdf` i una imatge

## Bloc A. Instal·lacio i arrencada

- l'app s'instal·la sense errors de signatura
- s'obre des de la icona i no mostra cap pantalla en blanc
- el nom visible es `Sutsumu`
- la icona es veu be a la pantalla d'inici
- la primera carrega no mostra errors evidents ni layout trencat

## Bloc B. Flux basic de contingut

- crear carpeta nova
- crear document nou
- editar titol, categoria i etiquetes
- escriure text llarg
- desar canvis
- reobrir el document i confirmar persistencia
- provar `Mode text simple`
- tornar a `Mode ric`

## Bloc C. Importacio i documents reals

- pujar un `.docx` i confirmar que el text es pot editar
- comprovar que una taula del Word es veu prou be en pantalla mobil
- pujar un `.pdf` i obrir-lo
- pujar una imatge i visualitzar-la
- provar un document llarg amb scroll fluid

## Bloc D. Organitzacio

- afegir etiquetes a un document
- filtrar per tipus
- filtrar per etiqueta
- combinar cerca i filtres
- obrir la paleta de comandes
- localitzar i obrir un document des de la paleta

## Bloc E. Seguretat de dades

- exportar JSON complet
- tornar a importar el JSON
- forcar backup intern
- obrir historial de backups
- restaurar un backup
- confirmar que el document restaurat es pot tornar a editar

## Bloc F. Comportament mobil

- els botons principals son facils de tocar amb el dit
- els modals no queden tallats pel notch ni pels marges segurs
- `Cancel·lar` i `Desar canvis` no tapen el text
- l'editor es llegible en vertical
- la pantalla principal no se sent atapeida
- en girar a horitzontal l'app continua sent usable

## Bloc G. Offline

- obrir l'app sense connexio despres d'haver-la usat
- confirmar que els documents locals continuen visibles
- editar un document offline
- tancar i reobrir offline
- confirmar persistencia un altre cop

## Criteris per dir "v1.0"

La versio es pot considerar `v1.0` si:

- no hi ha cap error de perdua de dades
- no hi ha cap bloqueig greu en editar, importar o restaurar
- el flux document -> desar -> reobrir funciona sempre
- la UI en iPhone es prou comoda sense hacks ni passos estranys

## Errors que bloquegen la v1.0

- document que desapareix o es corromp
- `save` que no persisteix
- import/export que trenca dades
- modal o editor inutilitzable en iPhone
- crash, pantalla en blanc o bloqueig persistent

## Resultat final

Quan aquesta checklist es passi en dispositiu fisic, el seguent pas ja no sera "construir la base", sino polir detalls i decidir la distribucio final.
