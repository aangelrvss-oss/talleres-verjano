# Decisiones técnicas

## 1. Arquitectura: sitio estático con Astro

**Decisión**: Astro 7 en modo estático (`output` por defecto), sin JavaScript de framework en el cliente.

**Motivos**

- El contenido (15 fichas, 2 guías, páginas corporativas) cambia poco y no necesita base de datos.
- Astro genera HTML puro: carga muy rápida, SEO sin depender de la ejecución de JavaScript y alojamiento en cualquier servidor (incluido el actual).
- Componentes reutilizables (`.astro`) y optimización de imágenes integrada (`astro:assets` + sharp → AVIF/WebP/JPEG con `srcset`).
- El JavaScript del cliente se reduce a tres scripts pequeños: menú, formulario y mapa bajo demanda.

**Descartado**: Next.js o React (más dependencias y JavaScript en el cliente sin ningún beneficio para este caso), WordPress o un CMS (mantenimiento, actualizaciones de seguridad y coste de alojamiento innecesarios para un catálogo estable).

**Versión**: se partió de Astro 5 y se actualizó a **7.3.8** porque `npm audit` señalaba avisos de seguridad en todas las versiones ≤ 7.2.7 (XSS en SSR y vulnerabilidades de libvips/sharp). Aunque la mayoría solo afectan a SSR, la actualización no rompió nada: 0 vulnerabilidades, mismas páginas y todas las pruebas en verde.

## 2. Contenido: archivos de datos locales

- `src/data/site.ts`: datos comerciales (dirección, teléfonos, emails, horario y campos pendientes).
- `src/data/catalog.ts`: categorías y fichas (texto por secciones, tablas de series, documentos, relacionados, URL antigua).
- `src/data/guides.ts`: guías de la sección «Consejos».
- `src/data/schema.ts`: datos estructurados.

Una sola plantilla (`src/pages/[category]/[product].astro`) genera las 15 fichas. Añadir un producto consiste en añadir un objeto al array y una imagen en `src/assets/products/`. TypeScript avisa si falta algún campo obligatorio.

**Descartado**: content collections con Markdown. Las fichas tienen estructura (series, documentos, relacionados) que se expresa mejor como datos tipados, y el volumen es pequeño.

## 3. URLs y redirecciones

- URLs nuevas por categoría y con barra final: `/sistemas-aluminio/abatibles/` (`trailingSlash: 'always'`, `build.format: 'directory'`).
- Fuente única de verdad: `docs/redirect-map.csv`. El script `scripts/gen-redirects.mjs` (se ejecuta antes de `build` y `dev`) genera:
  - `public/.htaccess` para Apache (alojamiento actual): `RedirectMatch 301`, `ErrorDocument 404`, cabeceras de seguridad, caché y compresión.
  - `public/_redirects` para Netlify o Cloudflare Pages, si se cambia de alojamiento.
- El script falla si hay rutas no válidas o **cadenas de redirección**.
- **Hallazgo durante las pruebas en Apache**: una regla `/index.html → /` provocaba un bucle en la portada, porque mod_dir sirve `/` internamente como `/index.html`. Se eliminó; la regla no hacía falta porque esa URL nunca existió.

## 4. Formulario de presupuesto

**Decisión**: script PHP mínimo (`public/api/contacto.php`, sin dependencias) que usa `mail()` del alojamiento.

**Motivos**: el alojamiento actual ya ejecuta PHP (existe `/app/email/enviar.php`), por lo que no hace falta contratar nada. Se evita depender de servicios de terceros que tratan los datos personales fuera de la empresa.

**Comportamiento**

- Validación en el cliente (mensajes por campo con `aria-describedby`, resumen de errores enfocable) **y** en el servidor (los mismos criterios).
- El mensaje de éxito **solo** aparece si el servidor responde `{"ok": true}`. Ante un error, un error de red o una respuesta que no es JSON (por ejemplo, un alojamiento sin PHP), se muestra un error con el teléfono y el correo como alternativa.
- Sin JavaScript, el formulario se envía de forma tradicional y el servidor redirige a `/contacto/enviado/` (página `noindex`) o muestra una página de error.
- Antispam sin cookies ni servicios externos: campo trampa, tiempo mínimo de 3 s y límite de 5 envíos por IP y hora (con hash de la IP en el directorio temporal).
- Seguridad: limpieza de saltos de línea en los campos de una línea (evita la inyección de cabeceras), `Reply-To` solo si el email es válido, remitente fijo del dominio (SPF/DKIM) y bloqueo del resto de archivos de `/api/` por `.htaccess`.
- Configuración por variables de entorno (`TV_FORM_TO`, `TV_FORM_FROM`, `TV_FORM_DRY_RUN`) o por `public/api/config.php` (opcional, no incluido).

**Alternativas, si el alojamiento final no tiene PHP**: Formspree, Web3Forms o Netlify Forms (tienen planes gratuitos con límites). Requerirían cambiar el `endpoint` de `ContactForm.astro` y revisar la política de privacidad, porque los datos pasarían por un tercero.

## 5. SEO técnico

- `<title>` y meta description únicos por página (comprobado automáticamente), un H1 por página, `lang="es"`.
- Canonical absoluto desde `SITE_URL` (por defecto `https://www.talleresverjano.com`).
- Open Graph con una imagen de 1200 × 630 generada en la compilación.
- `@astrojs/sitemap` (excluye `/contacto/enviado/` y la 404) y `robots.txt` generado con la URL del sitemap.
- JSON-LD: `HomeAndConstructionBusiness` (portada y contacto) con dirección, coordenadas y teléfono; `BreadcrumbList` en las páginas interiores; `WebPage` en las fichas. **Sin** `openingHours` (pendiente), valoraciones ni precios. No se usa `Product`, porque Google exige precio u opiniones para mostrarlo y no hay datos que lo respalden.
- 404 real (HTTP 404 con `ErrorDocument`) en lugar del soft 404 actual.

## 6. Documentos PDF

No se han podido copiar al repositorio (dominio bloqueado desde el entorno de desarrollo). Las fichas los enlazan en su ruta actual (`/archivos/01sistemas_de_aluminio/...`). Al desplegar en el mismo alojamiento hay que **conservar la carpeta `/archivos/`** (o copiarla a `public/archivos/`). El comprobador `npm run check` ignora ese prefijo de forma explícita.

## 7. Imágenes

- Recuperadas de la web actual como recortes de capturas PNG sin pérdida (ver inventario §3.8).
- Optimizadas en la compilación: `widths` + `sizes` responsivos, AVIF/WebP, `width`/`height` explícitos (CLS ≈ 0), `loading="lazy"` excepto la imagen principal, que lleva `fetchpriority="high"`.
- Logo: PNG de 292 × 68 px recortado de la cabecera actual. Se recomienda obtener el logo original en vector (SVG o PDF).

## 8. Privacidad y terceros

- Fuente Manrope **autoalojada** (`@fontsource-variable/manrope`): no se hacen peticiones a Google Fonts.
- Google Maps se carga **solo** al pulsar «Mostrar mapa»; hay un enlace directo a Google Maps como alternativa.
- No hay cookies, analítica ni píxeles. Si se añade analítica, se recomienda una sin cookies (por ejemplo, Plausible o Matomo sin cookies) o un banner de consentimiento.

## 9. Calidad

| Herramienta | Qué comprueba |
|---|---|
| `npm run typecheck` (`astro check`) | Tipos de TypeScript y plantillas |
| `npm run check` (`scripts/check-site.mjs`) | H1, títulos y descripciones únicos, canonical, enlaces e imágenes internas, `alt`, JSON-LD, texto de relleno, sitemap, redirecciones sin cadenas |
| `npm run test:e2e` (Playwright) | 3 perfiles (escritorio, móvil Pixel 7, tableta), errores de consola, imágenes rotas, desbordamiento horizontal, menú con teclado, formulario (validación, error, éxito, respuesta no JSON), mapa bajo demanda, 404, SEO |
| `BASE_URL=… E2E_REAL_BACKEND=1` | Las mismas pruebas contra Apache + PHP reales (redirecciones y envío real en modo de prueba) |

## 10. Dependencias

| Paquete | Uso | Tipo |
|---|---|---|
| astro | Generador del sitio | Producción (solo en la compilación) |
| @astrojs/sitemap | Sitemap XML | Producción (solo en la compilación) |
| @fontsource-variable/manrope | Fuente autoalojada (licencia SIL OFL) | Producción |
| @playwright/test, @astrojs/check, typescript | Pruebas y tipos | Desarrollo |

El sitio publicado no carga ninguna librería de terceros en el navegador.

## 11. Rediseño v2: decisiones técnicas

- **Sin dependencias nuevas.** Todo el movimiento usa CSS nativo y unas 15 líneas de JavaScript en línea (IntersectionObserver). No se han añadido GSAP, AOS, Framer Motion ni otras librerías.
- **View Transitions entre documentos** (`@view-transition { navigation: auto; }`). Mejora progresiva: Chromium y Safari reciente las animan; el resto navega con normalidad. La cabecera tiene `view-transition-name` para no parpadear.
- **Aparición al hacer scroll segura**: los elementos `[data-reveal]` solo se ocultan si `<html>` tiene la clase `.js` (la añade un script en línea en `<head>`) y el usuario no pide movimiento reducido. El observador también va en línea al final del `<body>`, de modo que no depende de la carga de un módulo. Sin `IntersectionObserver`, todo se muestra.
- **Sin animación de opacidad en la imagen LCP**: la imagen del hero solo hace una animación de escala, para no retrasar el LCP (1,4 s en móvil según Lighthouse).
- **Mega menú**: un solo panel con los 18 enlaces del catálogo en el HTML (buenos enlaces internos). Se abre con hover (solo en dispositivos con ratón), clic y teclado, y se cierra con Escape, clic fuera o pérdida de foco. Sin JavaScript se abre con `:hover`.
- **Panel móvil**: en móvil se quita el `backdrop-filter` de la barra, porque crearía un bloque contenedor y descolocaría el panel `position: fixed`.
- **Barra de contacto móvil**: se oculta con `visibility` cuando no está a la vista (no recibe el foco con el tabulador) y cuando el formulario está en pantalla.
- **Índice de la ficha**: el resaltado de la sección activa se calcula por posición de scroll con `requestAnimationFrame` (más fiable que IntersectionObserver para secciones de alturas muy distintas).
- **Datos pendientes ocultos por indicadores** (`foundingYearConfirmed`, `hours.confirmed`) en `site.ts`, en lugar de mostrarlos con avisos.
- **Imágenes de stock**: dos fotos de Unsplash de alta resolución para el hero y las cabeceras (ver `image-credits.md`). Se recortaron de capturas de página porque el dominio de imágenes de Unsplash está bloqueado desde el entorno de desarrollo; conviene sustituirlas por los originales antes de publicar.

## 12. Iteración v3: decisiones técnicas

- **Imágenes editoriales con sustituto opcional** (`src/data/media.ts`). `import.meta.glob` busca archivos en `src/assets/generated/`; si existen, se usan con su texto alternativo, su punto de enfoque y el rótulo «generada con IA»; si no, se usa la imagen de reserva. Así la web compila y se publica igual con o sin las imágenes generadas, y activarlas no exige tocar plantillas. Las fichas admiten lo mismo (`ficha-<slug>.jpg`) para abatibles y correderas.
- **Sin ampliación de imágenes**: los `widths` de `<Image>` se filtran con el ancho real del archivo (`w <= src.width`).
- **Descarga de imágenes generadas bloqueada**: el dominio de Higgsfield (`d8j0ntlcm91z4.cloudfront.net`) no está permitido por la política de red del entorno de desarrollo. No se ha intentado eludir el bloqueo. Ver `image-audit.md` §3.
- **Vídeo**: descartado para el hero por peso, LCP y un corte brusco a mitad del clip (`image-audit.md` §4).
- **Comprobación de datos comerciales**: `scripts/check-site.mjs` falla si una página muestra un porcentaje de ahorro (`UNVERIFIED_CLAIM`). Los datos técnicos que se mantienen se han contrastado con los PDF de QSystems (`content-inventory.md` §4).
- **Tokens de movimiento** (`--dur-ui`, `--dur-panel`, `--dur`, `--stagger`) en lugar de duraciones sueltas. Sin librerías nuevas.
- **Pruebas nuevas** (Playwright, «Contenido v3»): imagen principal prioritaria, cifras técnicas con su serie, 3 tarjetas de catálogo enlazadas, tabla de series sin desbordar a 375 px y PDF en pestaña nueva.
