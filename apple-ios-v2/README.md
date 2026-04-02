# Sutsumu Apple iOS v2

Projecte iPhone/iPad del reinici natiu v2.

## Obrir amb Xcode

- `/Users/sergicastillo/Documents/Playground/sutsumu/apple-ios-v2/SutsumuAppleIOSV2.xcodeproj`

## Què reutilitza

Aquest projecte no duplica la lògica:

- `../apple-v2/Sources/SutsumuCoreV2`
- `../apple-v2/Sources/SutsumuAppUIV2`

## Què ja fa

- login real amb `Supabase Auth`
- registre de compte nou amb `Supabase Auth`
- enviament de correu de recuperació de contrasenya
- processament d'enllaços de confirmació o recuperació des de l'app
- canvi de contrasenya dins de l'app després del correu de recuperació
- sessió guardada a `Keychain`
- càrrega del `head` remot
- enviament de revisions noves al backend `v2`
- importació i exportació de `JSON` local
- model natiu de carpetes i documents
- editor natiu d'un element seleccionat
- adjunts natius pujats directament a `Supabase Storage`
- baixada i previsualització bàsica d'adjunts remots
- resolució manual de diferències d'adjunt entre local i remot
- reconstrucció del model a partir del `JSON` local
- estat visual de sincronització local/remot
- guia ràpida dins de l'app amb el següent pas recomanat
- missatges d'estat més humans segons sessió, sync i conflictes
- botó per aplicar el `head` remot al model natiu
- enviament del workspace a Supabase directament des del model natiu
- cua local d'operacions incrementals per carpetes i documents
- fallback automàtic a snapshot complet quan el canvi ve d'un import o d'un JSON manual

## Prova ràpida

1. Obre el projecte amb `Xcode 26.4` o superior.
2. Selecciona un simulador o iPhone real.
3. Prem `Play`.
4. La capçalera i la `Guia ràpida` t'indicaran què toca fer a cada moment.
5. A la targeta `Supabase`, enganxa:
   - la URL del projecte
   - l'`anon key`
6. A la targeta `Sessió`, entra:
   - email
   - contrasenya
   - URL de retorn opcional per a confirmació o recuperació
7. Prem `Iniciar sessió`, `Crear compte` o `Recuperar accés` segons el cas.
8. Si fas servir una URL de retorn, recorda permetre-la també a la configuració d'Auth de Supabase.
9. Quan rebràs un correu de confirmació o recuperació, pots:
   - deixar que l'app obri sola l'enllaç
   - o enganxar-lo al camp `Enganxa aquí l'enllaç del correu` i prémer `Obrir enllaç`
10. Si l'enllaç és de recuperació, la mateixa targeta `Sessió` activarà el formulari `Nova contrasenya`.
11. A `Workspace ID`, posa el workspace que vulguis carregar.
12. Crea una carpeta o document des de `Estructura nativa`.
13. Edita'l des de `Editor natiu`.
14. Prem `Carregar remot`.
15. Si vols substituir el model local pel remot, prem `Aplicar remot al model`.
16. Quan hagis editat carpetes o documents, prem `Enviar model natiu`.
17. Mira la targeta `Estat`: si diu `Incremental`, l'app enviarà només les operacions pendents.
18. Per afegir un fitxer a un document, selecciona'l i prem `Afegir adjunt`.
19. L'adjunt es puja al bucket `sutsumu-sync-v2` i el document guarda la metadata (`checksum`, tipus, mida i `remoteObjectKey`).
20. Per recuperar-lo, prem `Descarregar adjunt`.
21. Si és text o imatge, veuràs una previsualització simple dins de l'editor; a més, el pots compartir des del botó `Compartir`.
22. Si el document o carpeta seleccionat difereix del remot, veuràs una caixa de resolució amb `Mantenir local` o `Aplicar remot`.

Ja no cal enganxar manualment un bearer token.

## Preparació real d'iPhone i TestFlight

1. Obre el projecte amb `Xcode 26.4` o superior.
2. Selecciona el target `SutsumuAppleIOSV2`.
3. A `Signing & Capabilities`, tria el teu `Team`.
4. Comprova que el `Bundle Identifier` sigui `cat.sergicastillo.sutsumu.v2` o un altre de teu si el vols canviar.
5. Si vols que la build de producció no demani `Project URL` i `anon key` a l'usuari final, omple aquests camps a `SutsumuAppleIOSV2/Info.plist` abans d'arxivar:
   - `SutsumuDefaultProjectURL`
   - `SutsumuDefaultAnonKey`
6. A Supabase Auth, afegeix aquesta URL a `Allowed Redirect URLs`:
   - `cat.sergicastillo.sutsumu.v2://auth`
7. Aplica les migracions de `supabase/migrations`.
8. Desplega la function `sutsumu-sync-v2`.
   El camí més fàcil és fer doble clic a:
   - `/Users/sergicastillo/Documents/Playground/sutsumu/scripts/deploy_supabase_v2.command`
   Guia curta:
   - `/Users/sergicastillo/Documents/Playground/sutsumu/SUPABASE_V2_DEPLOY.md`
   Aquesta function es desplega amb validació JWT de passarel·la desactivada i validació pròpia dins del codi.
9. Comprova que el bucket privat `sutsumu-sync-v2` existeix i que les polítiques s'han aplicat.
10. Si no has integrat la connexió a `Info.plist`, al primer arrencada de l'app entra:
   - `Project URL`
   - `anon key`
11. Fes una prova mínima abans d'arxivar:
   - iniciar sessió
   - carregar un workspace
   - crear un document
   - enviar-lo
   - afegir un adjunt
12. Quan això passi, ja pots fer `Product > Archive` i pujar la build a `TestFlight`.

Paquet de publicació d'App Store:

- `TESTFLIGHT_CHECKLIST.md`
- `APP_STORE_CONNECT_METADATA.md`
- `APP_REVIEW_NOTES.md`
- `APP_PRIVACY_DETAILS.md`
- `app-store/README.md`

També hi ha un manifest de privacitat base a:

- `SutsumuAppleIOSV2/PrivacyInfo.xcprivacy`

I dues pàgines públiques preparades per a GitHub Pages:

- `https://sergicas.github.io/sutsumu/app-store/support/`
- `https://sergicas.github.io/sutsumu/app-store/privacy/`

## Validació

Compila per a `iPhone Simulator` amb `DerivedData` dins de `Playground`:

```sh
xcodebuild -project /Users/sergicastillo/Documents/Playground/sutsumu/apple-ios-v2/SutsumuAppleIOSV2.xcodeproj \
  -scheme SutsumuAppleIOSV2 \
  -sdk iphonesimulator \
  -destination 'generic/platform=iOS Simulator' \
  -derivedDataPath /Users/sergicastillo/Documents/Playground/.derived-ios-v2 \
  CODE_SIGNING_ALLOWED=NO build
```

I per a `iPhoneOS` genèric:

```sh
xcodebuild -project /Users/sergicastillo/Documents/Playground/sutsumu/apple-ios-v2/SutsumuAppleIOSV2.xcodeproj \
  -scheme SutsumuAppleIOSV2 \
  -sdk iphoneos \
  -destination 'generic/platform=iOS' \
  -derivedDataPath /Users/sergicastillo/Documents/Playground/.derived-ios-v2 \
  CODE_SIGNING_ALLOWED=NO build
```

En aquest entorn de sandbox, `xcodebuild` arriba fins a `CompileAssetCatalogVariant thinned` i allà falla per `CoreSimulatorService / No available simulator runtimes`, fins i tot per `iphoneos`. És una limitació de l'entorn, no un error del codi Swift de l'app.
