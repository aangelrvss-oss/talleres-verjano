# Informe de QA

Fecha: 9 de octubre de 2026 · Rama: `claude/busy-gauss-k22go8` · Astro 7.3.8 · Node 22 · Chromium (Playwright 1.56)

Solo se recogen pruebas **realmente ejecutadas**. Las limitaciones están al final.

## 1. Resumen

| Prueba | Resultado |
|---|---|
| `astro check` (TypeScript y plantillas) | 0 errores, 0 avisos, 0 sugerencias |
| `npm run build` | 27 páginas HTML, 25 URL en el sitemap, 24 redirecciones; 3,0 MB en total (incluidas todas las variantes de imagen) |
| `npm run check` (comprobaciones estáticas) | Superadas, sin avisos |
| Playwright contra `astro preview` (formulario simulado) | **76 superadas**, 5 omitidas (solo aplican a escritorio o a Apache) |
| Playwright contra Apache 2.4 + PHP 8.3 con el `.htaccess` real | **73 superadas**, 8 omitidas (casos simulados o solo de escritorio) |
| Redirecciones de las 24 URL antiguas (curl contra Apache) | 24/24 → 301 directa y destino 200 (un solo salto) |
| Endpoint PHP (curl) | 10/10 escenarios correctos (ver §4) |
| Lighthouse 12 (móvil y escritorio, contra Apache local) | 100 en rendimiento, accesibilidad, buenas prácticas y SEO en todas las páginas medidas |
| `npm audit` | 0 vulnerabilidades |

## 2. Comprobaciones estáticas (`scripts/check-site.mjs`)

Sobre las 27 páginas generadas:

- Exactamente un `<h1>` por página.
- `<title>` y meta description presentes, **únicos** y de longitud razonable (título de 20 a 70 caracteres; descripción de 70 a 165).
- Canonical absoluto y coherente con la ruta; `lang="es"`; viewport que **permite** el zoom.
- Todas las `<img>` con atributo `alt` (vacío solo en las imágenes decorativas de las tarjetas, cuyo enlace ya tiene texto).
- Todos los enlaces internos, `src` y `srcset` apuntan a archivos existentes. Excepción documentada: `/archivos/…` (PDF que se conservan en el servidor).
- JSON-LD válido, sin valoraciones, ofertas ni precios.
- Sin texto de relleno (lorem ipsum, TODO, placeholder…).
- Sitemap sin páginas `noindex`; todas sus URL existen.
- Redirecciones: destinos existentes y sin cadenas.

**Errores encontrados y corregidos durante la QA**: títulos de más de 70 caracteres (7 páginas), el logo sin texto alternativo útil, el enlace del teléfono sin nombre accesible en móvil (detectado por Lighthouse) y un falso positivo del propio comprobador (la palabra «todo» en español).

## 3. Pruebas de navegador (Playwright)

Perfiles: **escritorio** (1366 × 900), **móvil** (Pixel 7, táctil) y **tableta** (820 × 1180, táctil).

| Caso | Qué verifica |
|---|---|
| 13 páginas representativas | HTTP 200, un H1, cero errores de consola o JavaScript, imágenes cargadas (tras forzar la carga diferida), sin desbordamiento horizontal |
| Todas las URL del sitemap (25) | Lo mismo para cada ficha, categoría y página corporativa |
| URL inexistente | HTTP 404, página útil con enlaces y `noindex` |
| Menú | En móvil y tableta, botón de menú con `aria-expanded`; se llega a «Muro cortina» desde el desplegable |
| Teclado (escritorio) | El enlace «Saltar al contenido» es el primer foco y lleva a `#contenido`; el desplegable se abre con Enter, se cierra con Escape y devuelve el foco al botón |
| Migas de pan | Enlazan a la categoría |
| Enlaces de contacto | `tel:+34913038775`, `tel:+34635304043`, `mailto:info@…` y `mailto:clientes@…` |
| Mapa | No hay iframe de Google hasta pulsar «Mostrar mapa» |
| Preselección | «Pedir presupuesto» en una ficha abre el formulario con el producto seleccionado |
| Validación | Envío vacío: resumen de errores con foco, `aria-invalid`, mensajes por campo y **ninguna petición** al servidor; email con formato incorrecto |
| Error del servidor (500) | Se muestra un error con alternativas; **no** se muestra el éxito |
| Respuesta no JSON (alojamiento sin PHP) | Se trata como error; **no** se muestra el éxito |
| Envío correcto | Estado «Enviando…», confirmación del servidor, mensaje de éxito con foco |
| SEO | Título, canonical, `og:image` absoluta y `BreadcrumbList` |
| Redirección (solo Apache) | `/01aluminio_sistemas_abatibles.html` → 301 → `/sistemas-aluminio/abatibles/` |

En la ejecución contra Apache + PHP, el envío correcto recorre el flujo real (navegador → `contacto.php` → «correo») con `TV_FORM_DRY_RUN=1`: el mensaje se escribió en el registro de prueba en lugar de enviarse. **No se ha enviado ningún correo a la empresa.**

### Anchos de pantalla

Script adicional (Chromium) sobre 12 páginas a **320, 375, 768, 1024, 1280, 1440 y 1920 px**: sin desbordamiento horizontal. Al principio había un desbordamiento de 10 px en la cabecera a 1440 px (el botón «Pedir presupuesto» se partía en dos líneas); se corrigió antes de esta medición.

### Revisión visual

Capturas revisadas en escritorio (1366 y 1440) y móvil (390): portada, ficha de abatibles, contacto con errores de validación, menú móvil abierto, desplegable de escritorio y página de empresa. Ajustes aplicados: separación visual entre la banda de contacto y el pie, texto del selector recortado, estilo de la ayuda del formulario y columna lateral de las fichas no fija (con muchos PDF superaba la altura de la pantalla).

## 4. Endpoint PHP (curl contra `php -S` y Apache)

| Escenario | Resultado esperado | Obtenido |
|---|---|---|
| GET | 405 | 405 |
| POST con campos inválidos (JSON) | 422 con errores por campo | Correcto |
| POST válido (JSON) | `{"ok":true}` y mensaje generado | Correcto |
| Intento de inyección de cabeceras (`\r\nBcc:` en el nombre) | Neutralizado en una sola línea | Correcto (el asunto quedó en una línea; sin cabecera Bcc) |
| Campo trampa relleno | Éxito aparente, sin envío | Correcto |
| POST válido sin JavaScript | 303 → `/contacto/enviado/` | Correcto |
| POST inválido sin JavaScript | 422 con página de error en HTML | Correcto |
| Más de 5 envíos por hora desde una IP | 429 | Correcto |
| Fallo de envío (registro sin permiso de escritura en Apache) | 500 con error; **sin** éxito falso | Correcto (detectado de forma fortuita: el cliente mostró el error) |
| Acceso a `/api/.htaccess` | 403 | 403 |

## 5. Apache y `.htaccess`

Apache 2.4 + mod_php 8.3 local, `AllowOverride All`:

- 24 URL antiguas: 301 directa al destino nuevo (un salto); destino 200.
- `/no-existe.html`: 404 con la página 404 de la web.
- Cabeceras: `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`; `/_astro/*` con `Cache-Control: public, max-age=31536000, immutable`; HTML comprimido con gzip (8,6 KB la portada).
- **Fallo detectado y corregido**: la regla `/index.html → /` creaba un bucle de redirección en la portada (mod_dir sirve `/` internamente como `/index.html`). Se eliminó del mapa.

## 6. Lighthouse 12

Contra Apache local (sin latencia de red real, aunque Lighthouse simula la conexión móvil). Puntuaciones: rendimiento / accesibilidad / buenas prácticas / SEO.

| Página | Móvil | LCP móvil | CLS | Escritorio | Peso |
|---|---|---|---|---|---|
| `/` | 100 / 100 / 100 / 100 | 1,4 s | 0,001 | 100 / 100 / 100 / 100 | 123 KiB |
| `/sistemas-aluminio/abatibles/` | 100 / 100 / 100 / 100 | 1,4 s | 0,001 | 100 / 100 / 100 / 100 | 96 KiB |
| `/contacto/` | 100 / 100 / 100 / 100 | 1,2 s | 0 | 100 / 100 / 100 / 100 | 62 KiB |
| `/materiales-adicionales/` | 100 / 100 / 100 / 100 | 1,6 s | 0 | 100 / 100 / 100 / 100 | 155 KiB |
| `/otros-productos/hierro-forja/` | 100 / 100 / 100 / 100 | 1,5 s | 0,001 | 100 / 100 / 100 / 100 | 86 KiB |
| `/sistemas-aluminio/muro-cortina/`, `/consejos/rotura-puente-termico/`, `/empresa/` (solo móvil) | 100 / 100 / 100 / 100 | — | — | — | — |
| `/404.html` | 100 / 100 / 100 / **69** | 1,4 s | 0,002 | 100 / 100 / 100 / 69 | 56 KiB |

El 69 de SEO de la 404 es esperado: devuelve 404 y lleva `noindex`.

## 7. Contrastes

Ratios WCAG calculados para los tokens de color: todos ≥ 4,5:1 (texto secundario 9,1:1, texto atenuado 5,8:1, enlaces 8,0:1, botón principal 5,2:1). Lighthouse no detecta problemas de contraste.

## 8. Limitaciones y pendientes

- **Navegadores**: solo se ha probado con Chromium. Firefox y Safari/WebKit no están disponibles en el entorno. El código usa CSS y JavaScript estándar sin funciones experimentales, pero conviene una revisión manual en Safari (iOS) antes del lanzamiento.
- **Lectores de pantalla**: no se ha hecho una prueba manual con NVDA o VoiceOver; sí las comprobaciones automáticas de Lighthouse y la estructura ARIA cubierta por las pruebas.
- **Correo real**: `mail()` no se ha probado en el alojamiento de producción (no hay acceso). Hay que verificarlo en la vista previa con un buzón de pruebas (README, «Despliegue»).
- **PDF**: no se han copiado al repositorio; se verificó (HTTP 200) que existen los 17 en el servidor actual el 9/10/2026.
- **Rendimiento real**: Lighthouse se ejecutó en local. Tras publicar, hay que medir con PageSpeed Insights sobre el dominio real.
- **Rastreo de la web antigua**: limitado a lo enlazado y a lo indexado (no hay acceso a Search Console). Pueden existir URL antiguas con tráfico que no estén en el mapa de redirecciones; se recomienda revisar el informe de páginas de Search Console tras el lanzamiento.
- **Contenido pendiente de confirmar**: ver `README.md`, «Pendientes del propietario».
