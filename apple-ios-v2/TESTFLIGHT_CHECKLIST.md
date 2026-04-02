# Sutsumu Apple iOS v2 - Checklist de TestFlight

## Abans d'arxivar

1. Obre:
   - `/Users/sergicastillo/Documents/Playground/sutsumu/apple-ios-v2/SutsumuAppleIOSV2.xcodeproj`
2. Comprova `Signing & Capabilities`:
   - `Team`
   - `Bundle Identifier`
   - signing automàtic
3. Comprova `Version` i `Build`:
   - `MARKETING_VERSION = 2.0`
   - `CURRENT_PROJECT_VERSION = 2`
4. Revisa que la icona surti bé a `Assets.xcassets > AppIcon.appiconset`.
5. A Supabase, comprova:
   - `Allowed Redirect URLs` inclou `cat.sergicastillo.sutsumu.v2://auth`
   - migracions aplicades
   - function `sutsumu-sync-v2` desplegada
   - bucket `sutsumu-sync-v2` disponible
6. Si aquesta és la build d'App Store, decideix si la connexió va integrada:
   - omple `SutsumuDefaultProjectURL` i `SutsumuDefaultAnonKey` a `SutsumuAppleIOSV2/Info.plist`
   - comprova que `SutsumuSupportURL` i `SutsumuPrivacyPolicyURL` apunten a les pàgines públiques
7. Repassa el paquet de publicació:
   - `APP_STORE_CONNECT_METADATA.md`
   - `APP_REVIEW_NOTES.md`
   - `APP_PRIVACY_DETAILS.md`
   - `app-store/SCREENSHOT_PLAN.md`

## Prova mínima abans de pujar

1. Iniciar sessió amb email i contrasenya.
2. Crear compte nou.
3. Enviar correu de recuperació.
4. Obrir l'enllaç de recuperació a l'app.
5. Crear una carpeta i un document.
6. Enviar el model natiu al backend.
7. Carregar remot.
8. Afegir un adjunt i descarregar-lo.
9. Forçar un conflicte simple i comprovar que surt la resolució manual.

## Arxiu i pujada

1. A Xcode, selecciona `Any iOS Device`.
2. Prem `Product > Archive`.
3. Quan s'obri `Organizer`, tria l'arxiu nou.
4. Prem `Distribute App`.
5. Tria `TestFlight / App Store Connect`.
6. Pugeu la build i espera que processi.

## Després de la pujada

1. Omple notes de la build a `App Store Connect`.
2. Assigna testers interns.
3. Fes una prova en un iPhone real:
   - login
   - sync
   - adjunts
   - recuperació de contrasenya
4. Si tot va bé, prepara després la fitxa d'App Store.
5. Si publiques per App Store, carrega:
   - `Support URL`: `https://sergicas.github.io/sutsumu/app-store/support/`
   - `Privacy Policy URL`: `https://sergicas.github.io/sutsumu/app-store/privacy/`
