# Sutsumu Apple iOS v2 - Guia de privacitat per App Store Connect

Document de treball per omplir la fitxa de `App Privacy Details` a App Store Connect.

Referència oficial d'Apple:

- [App Privacy Details](https://developer.apple.com/app-store/app-privacy-details/)

## Resum curt

- Tracking: `No`
- Third-party advertising: `No`
- Analytics de tercers: `No`, segons el codi actual del repo
- Política de privacitat pública: `https://sergicas.github.io/sutsumu/app-store/privacy/`

## Dades que probablement s'han de declarar

Aquestes dades s'envien fora del dispositiu quan l'usuari fa servir autenticació, sincronització o adjunts.

### Contact Info

- `Email Address`
  Finalitat probable:
  - `App Functionality`

### User Content

- `Other User Content`
  Inclou workspaces, carpetes, documents i text introduït per l'usuari.
  Finalitat probable:
  - `App Functionality`

- `Photos or Videos`
  Només si l'usuari puja aquest tipus d'adjunt a través de la funcionalitat d'adjunts.
  Finalitat probable:
  - `App Functionality`

- `Audio Data`
  Només si l'usuari puja un fitxer d'àudio com a adjunt.
  Finalitat probable:
  - `App Functionality`

### Identifiers

- `User ID`
  El backend d'autenticació i sincronització treballa amb un identificador d'usuari.
  Finalitat probable:
  - `App Functionality`

## Dades que no semblen necessàries de declarar com a tracking

- `Device ID` publicitari: no apareix cap ús d'IDFA o tracking ads al codi actual.
- `Location`, `Contacts`, `Health`, `Payments`: no apareixen al codi actual.
- `Diagnostics` o `Analytics`: no apareix cap SDK d'analítica de tercers al repo actual.

## Dades locals al dispositiu

Això no substitueix la fitxa d'App Store Connect, però és útil per explicar el comportament real:

- Sessió guardada a `Keychain`
- Configuració i estat local a `UserDefaults`
- Fitxers temporals per a adjunts descarregats

## Nota important abans d'enviar

Revisa aquesta guia contra el backend real que faràs servir en producció. Si el backend o la infraestructura retenen logs, IPs, mètriques o altres dades de forma persistent, pot caldre ampliar la declaració abans de la submissió.
