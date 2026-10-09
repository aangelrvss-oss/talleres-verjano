# Talleres Verjano · nueva web

Nueva versión de [www.talleresverjano.com](https://www.talleresverjano.com/): sitio estático generado con [Astro](https://astro.build), con catálogo completo (15 fichas), formulario de presupuesto funcional, SEO técnico y redirecciones 301 desde las URL antiguas.

**v2 (rediseño visual)**: hero editorial, mega menú de productos, fichas con índice y navegación entre productos, barra de contacto en móvil y animaciones nativas (View Transitions, aparición al hacer scroll) que respetan `prefers-reduced-motion`. Ver `docs/visual-audit.md` y `docs/design-system.md`.

> **Estado**: listo para revisión. **No se ha publicado nada** ni se ha modificado el sitio actual. Antes del lanzamiento hay que resolver los puntos de [Pendientes del propietario](#pendientes-del-propietario).

## Documentación

| Documento | Contenido |
|---|---|
| [docs/audit-report.md](docs/audit-report.md) | Auditoría de la web actual |
| [docs/visual-audit.md](docs/visual-audit.md) | Auditoría visual de la v1 y plan del rediseño (v2) |
| [docs/image-credits.md](docs/image-credits.md) | Procedencia y licencias de las imágenes |
| [docs/content-inventory.md](docs/content-inventory.md) | Inventario de contenido, datos comerciales y discrepancias |
| [docs/design-system.md](docs/design-system.md) | Dirección visual, tokens y componentes |
| [docs/technical-decisions.md](docs/technical-decisions.md) | Arquitectura y decisiones técnicas |
| [docs/redirect-map.csv](docs/redirect-map.csv) | Mapa de redirecciones (fuente de `.htaccess` y `_redirects`) |
| [docs/qa-report.md](docs/qa-report.md) | Pruebas ejecutadas y resultados |

## Requisitos

- Node.js 20 o superior (probado con Node 22) y npm.
- Para el formulario en producción: alojamiento con PHP 7.4+ y `mail()` operativo (el alojamiento actual ya tiene PHP).

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

## Editar contenido

| Qué | Dónde |
|---|---|
| Teléfonos, emails, dirección, horario | `src/data/site.ts` |
| Fichas de producto y categorías | `src/data/catalog.ts` (+ imagen en `src/assets/products/`) |
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

No hay claves, credenciales ni secretos en el código.

## Despliegue sin afectar a la web actual

El sitio compilado (`dist/`) son archivos estáticos más un script PHP. El destino recomendado es **el alojamiento actual** (Apache + PHP), que permite reutilizar el `.htaccess` generado y el formulario PHP sin coste adicional.

### 1. Vista previa (staging)

1. En el panel del alojamiento, cree un subdominio, por ejemplo `nueva.talleresverjano.com`, con su propia carpeta y certificado SSL.
2. Compile la vista previa:
   ```bash
   STAGING=1 SITE_URL=https://nueva.talleresverjano.com npm run build
   ```
3. Suba el **contenido** de `dist/` (incluidos los archivos ocultos `.htaccess` y `api/.htaccess`) a la carpeta del subdominio.
4. Copie también la carpeta `archivos/` del sitio actual, para que funcionen los PDF técnicos.
5. Configure `TV_FORM_TO` con un buzón de pruebas y envíe un formulario de prueba **solo a ese buzón**.
6. Revise la web. El subdominio no se indexa (`noindex` y `robots.txt`).

### 2. Lanzamiento (requiere autorización del propietario)

1. Haga una **copia de seguridad completa** de la carpeta pública actual (`httpdocs/` o equivalente).
2. Compile la versión definitiva: `npm run build` (sin `STAGING`).
3. Suba el contenido de `dist/` a la carpeta pública **conservando la carpeta `archivos/`**. Los antiguos `*.html`, `index.php`, `css/`, `js/` y `app/` pueden retirarse; sus URLs quedan cubiertas por las redirecciones 301.
4. Compruebe:
   - `/01aluminio_sistemas_abatibles.html` responde 301 → `/sistemas-aluminio/abatibles/`.
   - `/una-url-inventada` responde 404.
   - El formulario llega al buzón real (envíe un mensaje identificado como prueba y avise a la empresa).
   - Un PDF de una ficha se abre correctamente.
5. Si el certificado cubre `www` y el alojamiento no fuerza HTTPS, active el bloque comentado «Forzar HTTPS y www» del `.htaccess` (editándolo en `scripts/gen-redirects.mjs`).
6. Envíe `https://www.talleresverjano.com/sitemap-index.xml` en Google Search Console y actualice el horario y la web en la ficha de Google Business Profile.

**Vuelta atrás**: restaure la copia de seguridad del paso 1.

### Alternativa: Netlify o Cloudflare Pages (gratis)

Sirven `dist/` y usan `_redirects` (generado automáticamente), pero **no ejecutan PHP**: el formulario mostraría un error controlado. Habría que conectarlo a un servicio de formularios (ver `docs/technical-decisions.md` §4) y cambiar el DNS del dominio, lo que requiere autorización.

## Costes

- Sin servicios externos de pago: 0 € adicionales.
- Coste recurrente: el alojamiento y el dominio actuales (sin cambios).
- Dependencias de desarrollo y fuentes: gratuitas (licencias MIT y SIL OFL).

## Pendientes del propietario

1. **Horario**: la web actual y Google no coinciden (ver inventario §1).
2. **Razón social y NIF** para el aviso legal, y revisión legal de `/privacidad/`.
3. **Confirmar** o descartar: financiación sin intereses, reformas integrales, PVC Kömmerling, Somfy, Mago y Persax, WhatsApp en el móvil y redes sociales.
4. **Buzón** que debe recibir el formulario y remitente del dominio (`TV_FORM_TO` y `TV_FORM_FROM`); comprobar SPF/DKIM.
5. **Derechos de las imágenes** reutilizadas de la web actual (probablemente de fabricantes) y, si es posible, fotografías propias y el logo en vector. Descargar los originales de las 2 fotos de Unsplash (ver `docs/image-credits.md`).
6. Confirmar la antigüedad («desde 1968») y la garantía de 5 años de las lonas de los toldos.
