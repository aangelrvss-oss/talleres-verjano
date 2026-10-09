#!/usr/bin/env bash
# Verificación posterior al despliegue (solo lectura: peticiones GET/HEAD).
#
#   scripts/verify-deploy.sh https://www.talleresverjano.com
#   scripts/verify-deploy.sh https://nueva.talleresverjano.com --staging
#
# Comprueba, con la lista sacada del propio proyecto (dist/ y docs/redirect-map.csv):
#   1. Las 27 páginas: 25 del sitemap con 200, /contacto/enviado/ con 200 y una URL
#      inexistente con 404 real.
#   2. Las 24 redirecciones: 301, destino exacto y un solo salto hasta un 200.
#   3. Los PDF enlazados desde las fichas: 200 y tipo application/pdf.
#   4. /api/: contacto.php responde 405 a GET; .htaccess y config.php no son accesibles.
#   5. Indexación: en producción no hay noindex; con --staging, sí lo hay.
# No envía formularios ni modifica nada. Requiere haber ejecutado `npm run build`
# con el mismo SITE_URL que se ha desplegado.
set -u
BASE="${1:?Uso: scripts/verify-deploy.sh <url-base> [--staging]}"
BASE="${BASE%/}"
STAGING="${2:-}"
cd "$(dirname "$0")/.."
[ -d dist ] || { echo "Falta dist/: ejecute npm run build" >&2; exit 2; }

pass=0; fail=0
ok() { pass=$((pass+1)); }
ko() { fail=$((fail+1)); echo "  FALLO $1"; }
code() { curl -sS -o /dev/null -w '%{http_code}' --max-time 20 "$@"; }

echo "1. Páginas"
pages=$(grep -ho '<loc>[^<]*</loc>' $(ls dist/sitemap-*.xml | grep -v sitemap-index) | sed -E 's#</?loc>##g; s#^https?://[^/]+##')
n=0
for p in $pages /contacto/enviado/; do
  n=$((n+1)); c=$(code "$BASE$p"); [ "$c" = 200 ] && ok || ko "$p → HTTP $c (esperado 200)"
done
c=$(code "$BASE/esta-url-no-existe-$(date +%s)/"); [ "$c" = 404 ] && ok || ko "URL inexistente → HTTP $c (esperado 404)"
echo "   $((n+1)) comprobadas"

echo "2. Redirecciones"
r=0
while IFS=, read -r old new _; do
  [ -z "$old" ] && continue; r=$((r+1))
  out=$(curl -sS -o /dev/null --max-time 20 -w '%{http_code} %{redirect_url}' "$BASE$old")
  status=${out%% *}; loc=${out#* }
  if [ "$status" != 301 ]; then ko "$old → HTTP $status (esperado 301)"; continue; fi
  case "$loc" in *"$new") ;; *) ko "$old → $loc (esperado …$new)"; continue;; esac
  final=$(curl -sS -o /dev/null -L --max-time 20 -w '%{http_code} %{num_redirects}' "$BASE$old")
  [ "$final" = "200 1" ] && ok || ko "$old → final «$final» (esperado 200 en 1 salto)"
done < <(tail -n +2 docs/redirect-map.csv | tr -d '\r')
echo "   $r comprobadas"

echo "3. Documentos PDF"
pdfs=$(grep -rhoE 'href="/archivos/[^"]+\.pdf"' dist --include=*.html | sed -E 's/^href="//; s/"$//' | sort -u)
d=0
while IFS= read -r pdf; do
  [ -z "$pdf" ] && continue; d=$((d+1))
  out=$(curl -sS -o /dev/null -I --max-time 30 -w '%{http_code} %{content_type}' "$BASE$pdf")
  case "$out" in "200 application/pdf"*) ok;; *) ko "$pdf → $out";; esac
done <<< "$pdfs"
echo "   $d comprobados"

echo "4. Formulario y /api/"
c=$(code "$BASE/api/contacto.php"); [ "$c" = 405 ] && ok || ko "GET /api/contacto.php → $c (esperado 405)"
for f in /api/.htaccess /api/config.php; do c=$(code "$BASE$f"); { [ "$c" = 403 ] || [ "$c" = 404 ]; } && ok || ko "$f → $c (esperado 403/404)"; done

echo "5. Indexación"
home=$(curl -sS --max-time 20 "$BASE/")
robots=$(curl -sS --max-time 20 "$BASE/robots.txt")
if [ "$STAGING" = "--staging" ]; then
  echo "$home" | grep -q 'name="robots" content="noindex' && ok || ko "staging sin <meta robots noindex>"
  echo "$robots" | grep -q 'Disallow: /$' && ok || ko "staging: robots.txt no bloquea"
else
  echo "$home" | grep -q 'name="robots" content="noindex' && ko "producción con noindex (¿se compiló con STAGING=1?)" || ok
  echo "$robots" | grep -q 'Sitemap:' && ok || ko "robots.txt sin Sitemap"
  echo "$home" | grep -q "rel=\"canonical\" href=\"$BASE/\"" && ok || ko "canonical de la portada distinto de $BASE/ (¿SITE_URL correcto?)"
fi

echo "Resultado: $pass correctos, $fail fallos"
[ "$fail" -eq 0 ]
