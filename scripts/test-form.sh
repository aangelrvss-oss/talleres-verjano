#!/usr/bin/env bash
# Prueba controlada del formulario de presupuesto contra un servidor real.
#
#   scripts/test-form.sh https://staging.ejemplo.com          # 9 casos, NO envía correo
#   scripts/test-form.sh https://staging.ejemplo.com --send   # además, 1 envío real
#
# Sin --send ningún caso llega a llamar a mail(): son errores de validación,
# accesos denegados o envíos que el antispam descarta en silencio.
# Con --send se envía UNA solicitud real, marcada como prueba, al buzón
# configurado (TV_FORM_TO). Úsese solo con autorización del propietario.
set -u
BASE="${1:?Uso: scripts/test-form.sh <url-base> [--send]}"
BASE="${BASE%/}"
SEND="${2:-}"
EP="$BASE/api/contacto.php"
pass=0; fail=0
now_ms() { echo $(( $(date +%s) * 1000 )); }
check() { # nombre, condición (0 = ok), detalle
  if [ "$2" -eq 0 ]; then pass=$((pass+1)); echo "  OK    $1"; else fail=$((fail+1)); echo "  FALLO $1 — $3"; fi
}
req() { curl -sS -o /tmp/tvf.body -w '%{http_code}' "$@"; }
OLD=$(( $(now_ms) - 10000 ))
VALID=(--data-urlencode "nombre=Prueba técnica" --data-urlencode "telefono=600 000 000" --data-urlencode "email=prueba@example.com" --data-urlencode "producto=abatibles" --data-urlencode "mensaje=PRUEBA TÉCNICA DE LA WEB. Ignorar este mensaje." --data-urlencode "privacidad=1" --data-urlencode "t=$OLD")

echo "Formulario: $EP"
c=$(req -X GET "$EP"); check "GET devuelve 405" $([ "$c" = 405 ]; echo $?) "HTTP $c"
c=$(req -H 'Accept: application/json' -X POST "$EP"); check "POST vacío: 422 con errores por campo" $([ "$c" = 422 ] && grep -q '"fields"' /tmp/tvf.body; echo $?) "HTTP $c $(head -c 200 /tmp/tvf.body)"
c=$(req -H 'Accept: application/json' --data-urlencode "nombre=Ana" --data-urlencode "email=correo-mal" --data-urlencode "mensaje=Necesito dos ventanas" --data-urlencode "privacidad=1" --data-urlencode "t=$OLD" "$EP"); check "Correo no válido: 422 en el campo email" $([ "$c" = 422 ] && grep -q '"email"' /tmp/tvf.body; echo $?) "HTTP $c"
c=$(req -H 'Accept: application/json' --data-urlencode "nombre=Ana" --data-urlencode "email=ana@example.com" --data-urlencode "mensaje=Necesito dos ventanas" --data-urlencode "t=$OLD" "$EP"); check "Sin aceptar la privacidad: 422" $([ "$c" = 422 ] && grep -q '"privacidad"' /tmp/tvf.body; echo $?) "HTTP $c"
c=$(req "${VALID[@]}" --data-urlencode "web=http://spam.example" -H 'Accept: application/json' "$EP"); check "Campo trampa relleno: se descarta sin enviar (200)" $([ "$c" = 200 ]; echo $?) "HTTP $c"
c=$(req --data-urlencode "nombre=Prueba" --data-urlencode "email=prueba@example.com" --data-urlencode "mensaje=Envío demasiado rápido" --data-urlencode "privacidad=1" --data-urlencode "t=$(now_ms)" -H 'Accept: application/json' "$EP"); check "Envío en menos de 3 s: se descarta sin enviar (200)" $([ "$c" = 200 ]; echo $?) "HTTP $c"
c=$(req -X POST "$EP"); check "Sin JavaScript (sin Accept JSON): página de error HTML 422" $([ "$c" = 422 ] && grep -qi '<html' /tmp/tvf.body; echo $?) "HTTP $c"
c=$(req "$BASE/api/config.php"); check "config.php no es accesible" $([ "$c" = 403 ] || [ "$c" = 404 ]; echo $?) "HTTP $c"
c=$(req "$BASE/api/.htaccess"); check ".htaccess de /api/ no es accesible" $([ "$c" = 403 ] || [ "$c" = 404 ]; echo $?) "HTTP $c"

if [ "$SEND" = "--send" ]; then
  echo "Envío real (una sola solicitud, marcada como PRUEBA TÉCNICA):"
  c=$(req "${VALID[@]}" -H 'Accept: application/json' "$EP")
  check "Envío válido: 200 y {\"ok\":true}" $([ "$c" = 200 ] && grep -q '"ok":true' /tmp/tvf.body; echo $?) "HTTP $c $(head -c 200 /tmp/tvf.body)"
  echo "  → Compruebe que el correo ha llegado al buzón configurado (y no a spam), con Reply-To: prueba@example.com."
fi
rm -f /tmp/tvf.body
echo "Resultado: $pass correctos, $fail fallos"
[ "$fail" -eq 0 ]
