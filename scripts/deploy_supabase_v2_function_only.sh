#!/bin/bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
PROJECT_REF="${SUPABASE_PROJECT_REF:-vlyhfgrxpyyscsklxoru}"
SUPABASE_BIN=(npx -y supabase@latest)
export NPM_CONFIG_CACHE="${NPM_CONFIG_CACHE:-$ROOT_DIR/.npm-cache}"

run_supabase() {
  "${SUPABASE_BIN[@]}" "$@"
}

echo "Sutsumu v2 · desplegament només de la function"
echo "Projecte: $PROJECT_REF"
echo

mkdir -p "$NPM_CONFIG_CACHE"

if [ ! -f "$ROOT_DIR/supabase/functions/sutsumu-sync-v2/index.ts" ]; then
  echo "No trobo la function local a $ROOT_DIR/supabase/functions/sutsumu-sync-v2/index.ts" >&2
  exit 1
fi

echo "1/2 · comprovant autenticació de Supabase CLI..."
if ! run_supabase projects list --workdir "$ROOT_DIR" >/dev/null 2>&1; then
  echo "No hi ha sessió oberta. Obriré el login de Supabase."
  run_supabase login --workdir "$ROOT_DIR"
fi

echo
echo "2/2 · desplegant la function sutsumu-sync-v2..."
run_supabase functions deploy sutsumu-sync-v2 \
  --workdir "$ROOT_DIR" \
  --project-ref "$PROJECT_REF" \
  --no-verify-jwt \
  --use-api

echo
echo "Fet."
echo "Si abans has aplicat l'SQL manual, ara ja pots tornar a l'iPhone i prémer 'Enviar model natiu'."
