# Sutsumu Remote Push v1

Data: 2026-03-16

## Que Fa Ara Mateix

La fase actual de `push segur` fa això:

- només s'activa en mode `Head backend`
- només permet `push` quan:
  - el local va per davant
  - o encara no existeix cap `head` remot
- abans de fer-lo:
  - crea còpia crítica de recuperació
  - verifica que el `head` remot esperat no hagi canviat
- envia un `shadow bundle` complet al backend
- inclou els adjunts binaris locals dins del bundle com a `inlineDataUrl`
- deixa el remot reconnectat a la mateixa resposta del backend

## Que Encara No Fa

- no fa `push` automàtic
- no resol divergències fent `merge`
- no mou adjunts a object storage separat per checksum

## Criteri De Seguretat

En aquesta fase, Sutsumu bloqueja el `push` si:

- el remot va per davant
- hi ha divergència
- el remot apunta a un altre workspace
- el backend remot no està autenticat o validat

## Limit Actual

Els adjunts viatgen dins del bundle remot, no en un storage separat.

Això és bo per seguretat i simplicitat de `v1`, però no és encara el model final per a col·leccions molt grans.
