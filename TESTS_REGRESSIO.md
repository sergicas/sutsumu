# Tests de regressio de Sutsumu

Aquest paquet comprova els fluxos critics de Sutsumu amb Playwright sobre servidor local.

## Cobertura actual

- Crear document
- Editar i desar document
- Etiquetes i filtres rapids
- Paleta de comandes
- Workspace portable (desar i reobrir)
- Exportacio i importacio JSON
- Backup intern manual i historial
- Backup extern automatic amb fitxer connectat
- Recuperacio d'un adjunt lleuger des del mirall local de supervivencia
- Recuperacio des del mirall de supervivencia si es perd IndexedDB

## Com executar-los

```bash
cd /Users/sergicastillo/Downloads/Sutsumu\ Backups/sutsumu_v1_0_0_estable_work
npm install
npm run test:regression
```

## Altres modes utils

```bash
npm run test:regression:headed
npm run test:regression:debug
```

Els informes HTML queden a `playwright-report/` i els artefactes de fallada a `test-results/`.
