#!/bin/bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

"$SCRIPT_DIR/deploy_supabase_v2_function_only.sh"

echo
read -r -p "Prem Enter per tancar aquesta finestra..."
