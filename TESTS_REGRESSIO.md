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

## Com executar-los

```bash
cd /Users/sergicastillo/Desktop/mibento.com
npm install
npm run test:regression
```

## Altres modes utils

```bash
npm run test:regression:headed
npm run test:regression:debug
```

Els informes HTML queden a `playwright-report/` i els artefactes de fallada a `test-results/`.
