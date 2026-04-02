# Sutsumu Apple iOS v2 - Metadades d'App Store Connect

## Nom de l'app

Sutsumu

## Subtítol

Workspace natiu amb sync segur

## Promo text

Organitza carpetes, documents i adjunts en una app Apple nativa amb autenticació i sincronització segura.

## Descripció

Sutsumu és una app nativa per a iPhone i iPad pensada per treballar amb workspaces, documents i adjunts sense dependre d'un contenidor web.

Amb Sutsumu pots:

- iniciar sessió amb Supabase Auth
- crear i editar carpetes i documents amb una interfície nativa
- sincronitzar els canvis amb revisions remotes
- resoldre conflictes entre versió local i remota
- afegir, pujar, descarregar i compartir adjunts
- recuperar l'accés al compte des de la mateixa app

La v2 està orientada a estabilitat, estructura clara del workspace i sincronització segura entre dispositius.

## Keywords

sutsumu,workspace,documents,notes,sync,supabase,attachments,folders,productivity

## Categoria

- Primary: Productivity

## URL placeholders

- Support URL: `https://sergicas.github.io/sutsumu/app-store/support/`
- Marketing URL: `https://sergicas.github.io/sutsumu/`
- Privacy Policy URL: `https://sergicas.github.io/sutsumu/app-store/privacy/`

## Notes de revisió

- Si la build es prepara per a App Store, es recomana integrar `Project URL` i `anon key` a `SutsumuAppleIOSV2/Info.plist` perquè l'usuari final no hagi d'introduir valors tècnics.
- El flux de recuperació de contrasenya fa servir el deep link:
  - `cat.sergicastillo.sutsumu.v2://auth`
- L'app no fa tracking publicitari.
- La configuració local i l'estat de la sessió es guarden al dispositiu per mantenir la sessió i preferències de treball.
- L'app envia al backend dades de compte, workspaces, documents i adjunts per fer possible l'autenticació i la sincronització.

## Captures recomanades

1. Pantalla inicial amb la capçalera i la guia ràpida.
2. Targeta de sessió amb login i estat.
3. Estructura nativa amb carpetes i documents.
4. Editor natiu d'un document.
5. Adjunt descarregat amb previsualització.
6. Pantalla de resolució de conflicte.
