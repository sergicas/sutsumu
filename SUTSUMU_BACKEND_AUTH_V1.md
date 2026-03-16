## Sutsumu Backend Auth v1

Aquesta fase afegeix una capa local de credencials per a la lectura segura del `head` remot.

### Queda resolt ara

- El dispositiu pot guardar un perfil remot local per a `Head backend`.
- El perfil pot funcionar en quatre presets:
  - `Sense auth`
  - `Bearer token`
  - `Capçalera API`
  - `Supabase públic`
- El mode `Supabase públic` envia:
  - `apikey: <anon key>`
  - `Authorization: Bearer <access token o anon key>`
- Les credencials només s'utilitzen per llegir el `head` i el `bundle` remot.
- Encara no hi ha `pull`, `push` ni sobreescriptura automàtica.

### Política de seguretat

- `Sutsumu` continua sent `local-first`.
- El backend encara no governa l'estat local.
- Si el remot està trencat o respon malament, l'app només marca error remot.
- Si falten credencials obligatòries, no es dispara la connexió.

### Ús previst

1. Triar `Head backend`.
2. Escollir el preset local.
3. Introduir les credencials mínimes.
4. Connectar la URL del `head`.
5. Comparar el `head` remot amb el local.

### El següent pas segur

Implementar un connector real de backend autenticat que llegeixi el `head` des d'un servei viu, mantenint la mateixa regla:

`cap sobreescriptura silenciosa del workspace local`
