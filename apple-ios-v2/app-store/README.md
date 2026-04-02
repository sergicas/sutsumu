# Sutsumu iOS - Paquet de publicació

Aquest directori agrupa el material pràctic per preparar la build d'App Store.

## Què hi tens

- `../APP_STORE_CONNECT_METADATA.md`
  Textos de la fitxa pública.
- `../APP_REVIEW_NOTES.md`
  Text base per a `Notes for Review`.
- `../APP_PRIVACY_DETAILS.md`
  Guia per omplir `App Privacy Details`.
- `SCREENSHOT_PLAN.md`
  Pla curt per capturar i ordenar screenshots.
- `screenshots/`
  Carpeta reservada per a captures finals d'App Store.

## URLs públiques preparades

- Suport:
  `https://sergicas.github.io/sutsumu/app-store/support/`
- Política de privacitat:
  `https://sergicas.github.io/sutsumu/app-store/privacy/`

## Configuració recomanada abans d'arxivar

Omple aquests camps a `../SutsumuAppleIOSV2/Info.plist` per deixar la build de producció preparada:

- `SutsumuDefaultProjectURL`
- `SutsumuDefaultAnonKey`
- `SutsumuSupportURL`
- `SutsumuPrivacyPolicyURL`

Quan els dos primers camps no són buits, la UI deixa de demanar la connexió a l'usuari final i presenta la build com una app ja configurada.
