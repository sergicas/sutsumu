# Sutsumu v1.0.0 estable

Data: 2026-03-15

## Estat

Aquesta build es considera la base estable de Sutsumu per a us real local/PWA.

## Cobertura tancada

- creacio, edicio i reobertura de documents
- etiquetes, filtres i paleta de comandes
- workspace portable i reobertura
- exportacio i importacio JSON
- backups interns
- historial de versions
- paperera i restauracio
- PWA per iPhone

## Limitacio important

La sincronitzacio automatica entre dispositius encara no esta implementada.

## Suite de regressio

Executa:

```bash
cd "/Users/sergicastillo/Downloads/Sutsumu Backups/sutsumu_v1_0_0_estable_work"
npm run test:regression
```

## Protecció extra de dades

- mirall local de supervivència guardat també a localStorage
- pàgina independent de recuperació a `recovery.html`
- recuperació automàtica si l'app arrenca buida després d'una fallada d'IndexedDB
- backup extern automàtic a un fitxer JSON connectat quan el navegador permet accés directe al disc
- protecció per no sobreescriure la còpia externa amb un estat buit
- mirall local específic per a adjunts lleugers, perquè alguns fitxers petits també es puguin reconstruir després d'una fallada
- exportació manual en ZIP segur per treure fora del navegador carpetes, documents, versions i adjunts
