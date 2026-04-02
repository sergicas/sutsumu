#!/bin/bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
PROJECT_REF="${SUPABASE_PROJECT_REF:-vlyhfgrxpyyscsklxoru}"
SUPABASE_BIN=(npx -y supabase@latest)
export NPM_CONFIG_CACHE="${NPM_CONFIG_CACHE:-$ROOT_DIR/.npm-cache}"

cleanup() {
  if [ -t 0 ]; then
    stty echo 2>/dev/null || true
  fi
}

trap cleanup EXIT

require_command() {
  local name="$1"
  if ! command -v "$name" >/dev/null 2>&1; then
    echo "Falta la comanda '$name'. Instal·la Node.js i torna-ho a provar." >&2
    exit 1
  fi
}

prompt_db_password() {
  if [ -n "${SUPABASE_DB_PASSWORD:-}" ]; then
    return
  fi
  if [ ! -t 0 ]; then
    echo "Falta SUPABASE_DB_PASSWORD i no hi ha terminal interactiva per demanar-la." >&2
    exit 1
  fi

  echo
  echo "Escriu la contrasenya remota de la base de dades de Supabase."
  echo "La trobaràs a Supabase > Connect > Connection string o a Database settings."
  printf "Contrasenya BD: "
  stty -echo
  read -r SUPABASE_DB_PASSWORD
  stty echo
  printf "\n"

  if [ -z "$SUPABASE_DB_PASSWORD" ]; then
    echo "No s'ha introduït cap contrasenya de base de dades." >&2
    exit 1
  fi
}

run_supabase() {
  "${SUPABASE_BIN[@]}" "$@"
}

echo "Sutsumu v2 · desplegament de Supabase"
echo "Projecte: $PROJECT_REF"
echo

require_command npx
mkdir -p "$NPM_CONFIG_CACHE"

if [ ! -f "$ROOT_DIR/supabase/functions/sutsumu-sync-v2/index.ts" ]; then
  echo "No trobo la function local a $ROOT_DIR/supabase/functions/sutsumu-sync-v2/index.ts" >&2
  exit 1
fi

echo "1/4 · comprovant autenticació de Supabase CLI..."
if ! run_supabase projects list --workdir "$ROOT_DIR" >/dev/null 2>&1; then
  echo "No hi ha sessió oberta. Obriré el login de Supabase."
  run_supabase login --workdir "$ROOT_DIR"
fi

prompt_db_password

echo
echo "2/4 · enllaçant el projecte remot..."
run_supabase link \
  --workdir "$ROOT_DIR" \
  --project-ref "$PROJECT_REF" \
  --password "$SUPABASE_DB_PASSWORD"

echo
echo "3/4 · aplicant migracions..."
run_supabase db push \
  --workdir "$ROOT_DIR" \
  --password "$SUPABASE_DB_PASSWORD"

echo
echo "4/4 · desplegant la function sutsumu-sync-v2..."
run_supabase functions deploy sutsumu-sync-v2 \
  --workdir "$ROOT_DIR" \
  --project-ref "$PROJECT_REF" \
  --no-verify-jwt \
  --use-api

echo
echo "Fet."
echo "Ara torna a l'iPhone, obre Sutsumu i prem 'Enviar model natiu'."
