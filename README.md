# Talleres Verjano · nueva web

Nueva versión de [www.talleresverjano.com](https://www.talleresverjano.com/): sitio estático generado con [Astro](https://astro.build), con catálogo completo (15 fichas), formulario de presupuesto funcional, SEO técnico y redirecciones 301 desde las URL antiguas.

**v2 (rediseño visual)**: hero editorial, mega menú de productos, fichas con índice y navegación entre productos, barra de contacto en móvil y animaciones nativas (View Transitions, aparición al hacer scroll) que respetan `prefers-reduced-motion`. Ver `docs/visual-audit.md` y `docs/design-system.md`.

> **Estado**: listo para revisión. **No se ha publicado nada** ni se ha modificado el sitio actual. Antes del lanzamiento hay que resolver los puntos de [Pendientes del propietario](#pendientes-del-propietario).

## Documentación

| Documento | Contenido |
|---|---|
| [docs/audit-report.md](docs/audit-report.md) | Auditoría de la web actual |
| [docs/visual-audit.md](docs/visual-audit.md) | Auditoría visual: v1 → v2 y diagnóstico de la v3 |
| [docs/image-audit.md](docs/image-audit.md) | Auditoría de imágenes, imágenes generadas con IA y cómo incorporarlas |
| [docs/image-credits.md](docs/image-credits.md) | Procedencia y licencias de las imágenes |
| [docs/content-inventory.md](docs/content-inventory.md) | Inventario de contenido, datos comerciales y discrepancias |
| [docs/design-system.md](docs/design-system.md) | Dirección visual, tokens y componentes |
| [docs/technical-decisions.md](docs/technical-decisions.md) | Arquitectura y decisiones técnicas |
| [docs/redirect-map.csv](docs/redirect-map.csv) | Mapa de redirecciones (fuente de `.htaccess` y `_redirects`) |
| [docs/qa-report.md](docs/qa-report.md) | Pruebas ejecutadas y resultados |
| [docs/launch-checklist.md](docs/launch-checklist.md) | Lanzamiento: bloqueantes, migración, restauración, prueba del formulario y checklist posterior |

## Requisitos

- Node.js 20 o superior (probado con Node 22) y npm.
- Para el formulario en producción: alojamiento con PHP 7.4+ (extensión mbstring) y `mail()` operativo (el alojamiento actual ya tiene PHP).

## Desarrollo local

```bash
npm ci            # instala dependencias
npm run dev       # servidor de desarrollo en http://localhost:4321
npm run build     # genera el sitio en dist/
npm run preview   # sirve dist/ en http://localhost:4321
```

El formulario envía a `/api/contacto.php`, que `astro dev` no ejecuta. Para probarlo en local sin enviar correos:

```bash
npm run build
TV_FORM_DRY_RUN=1 php -S 127.0.0.1:8088 -t dist
# Los mensajes se guardan en $TMPDIR/tv-form-dry-run.log en lugar de enviarse
```

## Pruebas

```bash
npm test               # typecheck + build + comprobaciones estáticas + Playwright
npm run typecheck      # astro check
npm run check          # scripts/check-site.mjs sobre dist/
npm run test:e2e       # Playwright (escritorio, móvil y tableta) contra astro preview
```

Para probar contra Apache + PHP reales (redirecciones del `.htaccess` y envío del formulario):

```bash
BASE_URL=http://localhost:8099 E2E_REAL_BACKEND=1 npx playwright test --workers=1
```

Playwright usa Chromium. En este entorno está preinstalado; en otro equipo: `npx playwright install chromium`.

Prueba del formulario contra un servidor (sin enviar correo): `scripts/test-form.sh <url-base>`. El envío real exige autorización expresa: ver `docs/launch-checklist.md` §3. Verificación de un despliegue (solo lectura): `scripts/verify-deploy.sh <url-base>`.

## Editar contenido

| Qué | Dónde |
|---|---|
| Teléfonos, emails, dirección, horario | `src/data/site.ts` |
| Fichas de producto y categorías | `src/data/catalog.ts` (+ imagen en `src/assets/products/`) |
| Imágenes de la portada y de las categorías | `src/data/media.ts`; imágenes generadas opcionales en `src/assets/generated/` (ver `docs/image-audit.md`) |
| Guías de «Consejos» | `src/data/guides.ts` |
| Redirecciones | `docs/redirect-map.csv` (el `.htaccess` se regenera en cada `build`) |
| Colores y tipografía | `src/styles/global.css` (tokens en `:root`) |

Datos pendientes de confirmar (en `src/data/site.ts`), ocultos mientras su indicador valga `false`:

- `hours.confirmed`: al ponerlo a `true` se muestra el horario de `hours.lines` en el pie, la portada y el contacto. Si se quiere incluir en los datos estructurados, añada `openingHoursSpecification` en `src/data/schema.ts`.
- `foundingYearConfirmed`: al ponerlo a `true` aparecen «Desde 1968» y «más de 50 años» en la portada, «La empresa» y el pie.

## Variables de entorno

| Variable | Dónde | Uso | Valor por defecto |
|---|---|---|---|
| `SITE_URL` | Compilación | URL pública (canonical, sitemap, Open Graph) | `https://www.talleresverjano.com` |
| `STAGING` | Compilación | `1` = toda la web con `noindex` y `robots.txt` que bloquea los buscadores (vista previa) | — |
| `TV_FORM_TO` | Servidor (PHP) | Buzón que recibe las solicitudes | `info@talleresverjano.com` |
| `TV_FORM_FROM` | Servidor (PHP) | Remitente técnico del dominio (para SPF/DKIM) | `web@talleresverjano.com` |
| `TV_FORM_DRY_RUN` | Servidor (PHP) | `1` = no envía: guarda el mensaje en un registro temporal | — |

En un alojamiento compartido sin variables de entorno, cree `public/api/config.php` (bloqueado por `.htaccess` para el acceso web):

```php
<?php
return ['to' => 'info@talleresverjano.com', 'from' => 'web@talleresverjano.com'];
```

`config.php` está en `.gitignore`: se crea solo en el servidor. Con PHP-FPM (habitual en alojamientos compartidos), `SetEnv` del `.htaccess` no llega a PHP; en ese caso use `config.php`.

Requisitos del alojamiento para el formulario: **PHP 7.4 o superior** con la extensión **mbstring** y la función `mail()` habilitada (o un relé SMTP configurado por el proveedor). El script no usa funciones de PHP 8.

No hay claves, credenciales ni secretos en el código.

## Despliegue

El sitio compilado (`dist/`) son archivos estáticos más un script PHP, pensados para **el alojamiento actual** (Apache + PHP), sin cambios de DNS ni costes adicionales.

El procedimiento completo está en **[docs/launch-checklist.md](docs/launch-checklist.md)**: bloqueantes, copia de seguridad, vista previa en subdominio, lanzamiento, restauración, prueba del formulario (`scripts/test-form.sh`) y verificación posterior (`scripts/verify-deploy.sh`).

### Alternativa: Netlify o Cloudflare Pages (gratis)

Sirven `dist/` y usan `_redirects` (generado automáticamente), pero **no ejecutan PHP**: el formulario mostraría un error controlado. Habría que conectarlo a un servicio de formularios (ver `docs/technical-decisions.md` §4) y cambiar el DNS del dominio, lo que requiere autorización.

## Costes

- Sin servicios externos de pago: 0 € adicionales.
- Coste recurrente: el alojamiento y el dominio actuales (sin cambios).
- Dependencias de desarrollo y fuentes: gratuitas (licencias MIT y SIL OFL).

## Pendientes del propietario

Lista única de confirmaciones. Mientras no lleguen, los datos afectados están ocultos o retirados de la web; no se rellenan con suposiciones. Los datos legales mínimos y las autorizaciones del lanzamiento están detallados en `docs/launch-checklist.md` §2.

1. **Horario definitivo**: la web actual y Google no coinciden (`docs/content-inventory.md` §1). Activar con `hours.confirmed`.
2. **Antigüedad** que se quiere comunicar («desde 1968»): activar con `foundingYearConfirmed`.
3. **Razón social, NIF, domicilio social y datos registrales** para el aviso legal (página aún inexistente: **bloquea el lanzamiento**) y para `/privacidad/`.
4. **Garantías y condiciones comerciales**: garantía de las lonas de los toldos (5 años en la web actual), financiación sin intereses y cualquier otra condición que se quiera publicar.
5. **WhatsApp**: si el móvil 635 30 40 43 lo admite y se quiere ofrecer. También redes sociales.
6. **Derechos de uso de las imágenes**: las 15 fotos de producto de la web actual (probablemente de fabricantes; la de domótica y la de cerrajería muestran marcas), y el logotipo en vector. Ver `docs/image-credits.md`.
7. **Formulario**: buzón que recibe las solicitudes y remitente del dominio (`TV_FORM_TO`, `TV_FORM_FROM`), SPF/DKIM y autorización para el envío de prueba.
8. **Datos técnicos sin fuente**: porcentajes de ahorro (RPT 60 %, doble acristalamiento 50 %, Planitherm ATR 40/60 %). Solo se volverán a publicar con un documento del fabricante (`docs/content-inventory.md` §4).
9. Confirmar o descartar marcas y servicios citados en la web actual: reformas integrales, PVC Kömmerling, Somfy, Mago y Persax.
10. Descargar los originales de las 2 fotos de Unsplash (`docs/image-credits.md`).
