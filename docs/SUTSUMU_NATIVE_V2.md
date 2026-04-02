# Sutsumu Native v2

Data: 2026-03-29

## Decisió

Aquest reinici deixa enrere:

- el `WKWebView` com a base principal
- el fitxer `JSON` compartit entre dispositius
- la sincronització manual basada en `iCloud Drive`

I arrenca sobre:

- app SwiftUI nativa
- backend real de `Supabase`
- revisions remotes segures amb detecció de conflictes

## Què he creat ara

### Backend

- `/Users/sergicastillo/Documents/Playground/sutsumu/supabase/migrations/20260329_sutsumu_sync_v2.sql`
- `/Users/sergicastillo/Documents/Playground/sutsumu/supabase/migrations/20260329_02_sutsumu_sync_v2_incremental.sql`
- `/Users/sergicastillo/Documents/Playground/sutsumu/supabase/migrations/20260329_03_sutsumu_sync_v2_storage_policies.sql`
- `/Users/sergicastillo/Documents/Playground/sutsumu/supabase/functions/sutsumu-sync-v2/index.ts`

### App Apple nova

- `/Users/sergicastillo/Documents/Playground/sutsumu/apple-v2/Package.swift`
- `/Users/sergicastillo/Documents/Playground/sutsumu/apple-v2/Sources/SutsumuCoreV2`
- `/Users/sergicastillo/Documents/Playground/sutsumu/apple-v2/Sources/SutsumuAppUIV2`
- `/Users/sergicastillo/Documents/Playground/sutsumu/apple-v2/Sources/SutsumuAppleV2App`
- `/Users/sergicastillo/Documents/Playground/sutsumu/apple-ios-v2/SutsumuAppleIOSV2.xcodeproj`

## Què fa ja la nova app

- guardar configuració de Supabase localment
- iniciar sessió real amb email i contrasenya via `Supabase Auth`
- crear compte nou des de la mateixa app via `Supabase Auth`
- enviar el correu de recuperació de contrasenya des de la mateixa app
- processar un enllaç de confirmació o recuperació directament dins de l'app
- canviar la contrasenya dins de l'app quan arriba una sessió de recuperació
- desar la sessió de forma segura a `Keychain`
- restaurar i refrescar la sessió automàticament
- carregar el `head` remot d'un workspace
- enviar una revisió nova
- detectar conflictes `409`
- veure el payload local i remot en paral·lel
- importar un `JSON` local des del selector natiu
- exportar el `JSON` local com a fitxer
- validar i formatar el payload abans d'enviar-lo
- calcular una signatura `SHA-256` estable del payload
- compartir la capa `SwiftUI` entre `macOS` i `iOS`
- model natiu `Swift` de carpetes, documents, versions i adjunts
- crear carpetes i documents des de la UI nativa
- editar un element seleccionat des de la UI nativa
- regenerar el `JSON` local a partir del model natiu
- enviar revisions a Supabase directament des del model natiu, no del text `JSON`
- mostrar l'estat de sincronització (`Local`, `Sense remot`, `Pendent d'enviar`, `En línia`, `Conflicte`)
- aplicar explícitament el `head` remot sobre el model natiu quan l'usuari ho decideix
- guardar una cua local d'operacions incrementals (`upsert_item`, `delete_items`)
- enviar commits incrementals al backend quan hi ha un `head` base vàlid
- reconstruir el payload final al backend a partir del `head` actual + operacions incrementals
- pujar adjunts reals des d'iPhone/Mac a `Supabase Storage`
- guardar al model natiu la metadata de l'adjunt (`checksum`, tipus, mida, `remoteObjectKey`, disponibilitat)
- registrar al backend un resum dels adjunts de cada revisió i sincronitzar `sutsumu_attachment_objects_v2`
- descarregar adjunts remots des del bucket privat i deixar-ne una còpia temporal local
- previsualitzar text i imatges descarregades directament a l'editor natiu del document
- comparar l'adjunt local i el remot d'un document i resoldre la diferència des de la UI
- comparar un element seleccionat complet (`carpeta` o `document`) amb la seva versió remota i resoldre la diferència des de la UI
- mostrar una guia ràpida dins de l'app amb el següent pas recomanat segons l'estat real
- mostrar missatges d'estat més humans per sessió, sync, conflictes i primera configuració
- tenir una passada visual més neta i orientada a ús real, no només a debug intern
- portar una base de publicació amb checklist de `TestFlight`, metadades d'`App Store Connect` i manifest de privacitat d'iPhone

## Validació actual

- `deno check` passa per a `sutsumu-sync-v2`
- `swift build --disable-sandbox` passa a `apple-v2`
- `swift test --disable-sandbox` passa a `apple-v2`
- el target compartit `SutsumuAppUIV2` passa `typecheck` amb l'SDK d'`iPhone Simulator`
- `xcodebuild` passa per al projecte `apple-ios-v2` si `DerivedData` viu dins de `Playground`
- en aquest entorn sandbox, la fase `CompileAssetCatalogVariant thinned` pot fallar per `CoreSimulatorService / No available simulator runtimes`, fins i tot amb `iphoneos`; això apunta a l'entorn d'execució i no al codi Swift ni a la lògica de la v2

## Carpeta de treball actual

Per limitacions d'escriptura d'aquest entorn, el reinici v2 s'està implementant aquí:

- `/Users/sergicastillo/Documents/Playground/sutsumu`

## Què falta després d'aquest tall

- validació manual final de la icona i l'arxiu des d'Xcode en un Mac sense les limitacions d'aquest sandbox
- validació manual del flux complet en iPhone real amb un projecte Supabase de producció o staging
- polir encara més la comparació visual entre local i remot quan hi ha conflicte
- preparar TestFlight i signing final
