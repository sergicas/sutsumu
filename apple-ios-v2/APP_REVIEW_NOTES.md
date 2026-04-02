# Sutsumu Apple iOS v2 - Notes d'App Review

Text base per enganxar a `Notes for Review` a App Store Connect.

## Notes suggerides

Sutsumu és una app nativa per a iPhone i iPad per gestionar workspaces, documents, carpetes i adjunts amb sincronització segura.

Punts clau per a revisió:

- La build de producció pot portar la configuració del backend integrada a `Info.plist`, de manera que l'usuari final no ha d'introduir `Project URL` ni `anon key`.
- L'autenticació es fa amb Supabase Auth.
- El flux de recuperació de contrasenya i confirmació de compte fa servir el deep link `cat.sergicastillo.sutsumu.v2://auth`.
- L'app no mostra publicitat ni fa tracking.
- L'app guarda la sessió a `Keychain` i part de la configuració local a `UserDefaults`.
- L'app pot pujar i descarregar adjunts del bucket privat `sutsumu-sync-v2`.

## Demo i verificació manual

Checklist recomanada per al revisor intern abans d'enviar:

1. Iniciar sessió.
2. Crear una carpeta.
3. Crear un document.
4. Enviar el workspace al backend.
5. Carregar remot.
6. Afegir un adjunt.
7. Descarregar l'adjunt.
8. Obrir un correu de recuperació i tornar a l'app.

## Risc a vigilar abans d'enviar

Si la build pública encara demana `Project URL` i `anon key` a l'usuari final, App Review ho pot veure com un flux massa tècnic. Per a App Store és millor integrar aquests valors a `SutsumuAppleIOSV2/Info.plist`.
