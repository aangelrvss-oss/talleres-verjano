# Informe de QA

Última ejecución: 9 de octubre de 2026 · Rama `claude/busy-gauss-k22go8` · **pre-lanzamiento** · Astro 7.3.8 · Node 22 · Chromium (Playwright 1.56) · Apache 2.4 + PHP 8.3 locales.

Solo se recogen pruebas **realmente ejecutadas**. Limitaciones al final.

## 00. Pre-lanzamiento (tras incorporar las imágenes)

Ejecutado el 9/10/2026 sobre los commits `054dc0f` (imágenes) y el de documentación operativa. Medido con las **imágenes definitivas**.

| Prueba | Resultado |
|---|---|
| `npm test` (astro check + build + check-site + Playwright contra preview) | 0 errores · 27 páginas · 24 redirecciones · **106 superadas**, 8 omitidas |
| Playwright contra Apache + PHP 8.3 | **103 superadas**, 11 omitidas |
| Desbordamiento: 27 páginas × 7 anchos | 0 en 189; 0 errores JS; 0 imágenes rotas |
| `scripts/verify-deploy.sh` contra Apache local | 27 páginas y 24 redirecciones correctas. Fallos esperados en local: los 18 PDF (no existe `archivos/`) y el canonical (apunta a producción). Con marcadores en las rutas de los PDF y `SITE_URL` local: 75/75 |
| `scripts/test-form.sh` sin `--send` | 9/9 (sin envío; registro de envíos vacío) |
| `--send` sin autorización / sin terminal interactiva / opción desconocida | Rechazado las 3 veces antes de cualquier petición (0 peticiones en el registro de Apache). **El envío real no se ha ejecutado** |
| Opción B del lanzamiento (archivos antiguos presentes) | Con un `index.php` y un `.html` antiguos en la raíz: se sirve la portada nueva y la URL antigua responde 301 |
| Recorte de las imágenes nuevas a 320, 390, 1024 y 1440 px | Correcto. Corregido el contraste del contador de «Otros productos» |

**Lighthouse 12** (rendimiento / accesibilidad / buenas prácticas / SEO):

| Página | Móvil | LCP | Escritorio | LCP | Peso (móvil / escr.) |
|---|---|---|---|---|---|
| `/` | 100 / 100 / 100 / 100 | 1,9 s | 100 / 100 / 100 / 100 | 0,5 s | 225 / 284 KiB |
| `/sistemas-aluminio/` | 98 / 100 / 100 / 100 | 2,4 s | 100 / 100 / 100 / 100 | 0,5 s | 281 / 299 KiB |
| `/otros-productos/` | 99 / 100 / 100 / 100 | 2,3 s | 100 / 100 / 100 / 100 | 0,5 s | 238 / 283 KiB |
| `/sistemas-aluminio/abatibles/` | 100 / 100 / 100 / 100 | 1,7 s | 100 / 100 / 100 / 100 | 0,4 s | 143 / 147 KiB |
| `/sistemas-aluminio/correderas/` | 100 / 100 / 100 / 100 | 1,5 s | 100 / 100 / 100 / 100 | 0,4 s | 111 / 115 KiB |

El LCP móvil de las cabeceras de categoría sube (de 1,7 a 2,3–2,4 s) porque las fotos nuevas tienen más detalle que las de 765 px; sigue por debajo de 2,5 s («bueno»). Repetir con PageSpeed Insights en el alojamiento real.

No se ha podido comprobar desde el entorno de desarrollo: el envío real de correo, el DNS del dominio (SPF/DKIM/MX: consultas bloqueadas por la red), PHP 7.4 real, Safari/iOS y el alojamiento de producción. Procedimientos en `docs/launch-checklist.md`.

## 0. Preparación para publicación (v3.1)

Ejecutado el 9/10/2026 sobre la rama `claude/busy-gauss-k22go8` (punto de partida `7266c80`, sin cambios posteriores en el remoto).

| Prueba | Resultado |
|---|---|
| `npm test` (astro check + build + check-site + Playwright contra `astro preview`) | 0 errores · 27 páginas, 25 URL en el sitemap, 24 redirecciones · comprobaciones superadas · **106 superadas**, 8 omitidas |
| Playwright contra Apache + PHP 8.3 real | **103 superadas**, 11 omitidas |
| Barra móvil (prueba nueva), repetida 20 veces (15 contra Apache, 5 contra preview) | 20/20 |
| `scripts/test-form.sh http://localhost:8099 --send` (Apache local en modo de prueba: no envía correo) | **10/10**. Los descartes antispam no generan mensaje (1 entrada en el registro, la del envío válido) |
| Redirecciones (curl, Apache) | 24/24: 301 → 200 en un salto; URL inexistente → 404 |
| Desbordamiento: 27 páginas × 7 anchos (320–1920) | 0 en 189 combinaciones; 0 errores de JavaScript |
| Barra móvil a 320, 375, 390 y 768 px (portada, abatibles, muro cortina, contacto) | 54 px de alto en una sola línea (antes 60 px a 320 por partir el texto). Al final de la página no solapa el pie; con el formulario en pantalla o con errores de validación, oculta; a 768 px no se muestra |
| Tabla de series con teclado (320 px) | Zona enfocable con anillo de 3 px; las flechas desplazan la tabla (abatibles 52 px, correderas 33 px) |
| `php -l public/api/contacto.php` | Sin errores (PHP 8.3). Sin funciones de PHP 8: compatible con 7.4+. Requiere mbstring |

**Lighthouse 12 (v3.1)**, rendimiento / accesibilidad / buenas prácticas / SEO (Apache local; medido con las imágenes de reserva, **hay que repetirlo tras incorporar las generadas**):

| Página | Móvil | LCP | Escritorio | LCP | CLS | Peso (móvil / escr.) |
|---|---|---|---|---|---|---|
| `/` | 100 / 100 / 100 / 100 | 1,9 s | 100 / 100 / 100 / 100 | 0,4 s | 0 / 0,001 | 211 / 241 KiB |
| `/sistemas-aluminio/` | 100 / 100 / 100 / 100 | 1,7 s | 100 / 100 / 100 / 100 | 0,4 s | 0 | 207 / 224 KiB |
| `/sistemas-aluminio/abatibles/` | 100 / 100 / 100 / 100 | 1,4 s | 100 / 100 / 100 / 100 | 0,4 s | 0 | 101 / 105 KiB |
| `/contacto/` | 100 / 100 / 100 / 100 | 1,3 s | 100 / 100 / 100 / 100 | 0,3 s | 0 | 66 / 70 KiB |

**Defectos encontrados y corregidos en la v3.1**

1. La barra de contacto móvil tapaba la parte inferior de tablas y listas de documentos al leer. Ahora se aparta al desplazarse hacia abajo y vuelve al subir o al final.
2. A 320 px, «Pedir presupuesto» se partía en dos líneas y la barra crecía a 60 px.
3. Las etiquetas de los PDF de Q95 («informe de producto») y Q120 («informe de ensayo») no correspondían al documento: ambos son «catálogo de sistema» de QSystems.
4. Las unidades podían quedar separadas del número («228,5 / mm») en las especificaciones.
5. `public/api/config.php` (credenciales del formulario en el servidor) no estaba en `.gitignore`.
6. La nueva prueba de la barra móvil fallaba de forma intermitente contra Apache por una carrera en la propia prueba (dos desplazamientos en el mismo fotograma); se espera a que el navegador procese cada desplazamiento.

**Lo que no se ha probado (y por qué)**

- **Envío real de correo**: no hay acceso al alojamiento de producción. Procedimiento en `README.md`, «Prueba controlada del formulario».
- **PHP 7.4 real**: revisión estática y `php -l` con 8.3; no hay un PHP 7.4 en el entorno.
- **Safari/iOS y lectores de pantalla**: solo Chromium (ver §6).
- **Imágenes definitivas**: no están en el repositorio (`image-audit.md` §2–3).

### Bloqueantes para publicar

Actualizados en la fase de pre-lanzamiento: ver **`docs/launch-checklist.md` §1** (lista vigente). Las 6 imágenes generadas ya están incorporadas.

## 0. Resumen (v3)

| Prueba | Resultado |
|---|---|
| `astro check` | 0 errores, 0 avisos, 0 sugerencias |
| `npm run build` | 27 páginas, 25 URL en el sitemap, 24 redirecciones (sin cambios de URL) |
| `npm run check` | Superadas, incluida la nueva comprobación de porcentajes de ahorro sin fuente |
| Playwright contra `astro preview`, 3 perfiles | **106 superadas**, 8 omitidas (no aplican al perfil) |
| Playwright contra Apache + PHP real (`.htaccess` y envío en modo de prueba) | **103 superadas**, 11 omitidas (casos simulados o de otro perfil) |
| Redirecciones (curl contra Apache) | 24/24: 301 → 200 en un solo salto |
| Desbordamiento horizontal: 27 páginas × 7 anchos (320, 375, 390, 768, 1024, 1440, 1920) | 0 casos en 189 combinaciones; 0 errores de JavaScript |
| Tabla de series de abatibles | Cabe sin desplazamiento desde 375 px (5 columnas visibles); a 320 px se desplaza 52 px, con sombra indicadora |

**Pruebas nuevas en la v3** («Contenido v3»): imagen principal con `fetchpriority="high"` y rótulo «Imagen ilustrativa»; el hero no muestra cifras técnicas y la banda técnica las asocia a Q87C16 y Q120; no hay porcentajes de ahorro; catálogo de la portada con 1 + 2 tarjetas enlazadas; tabla de series sin desbordar a 375 px; PDF en pestaña nueva con `noopener`; el error «teléfono o correo» marca ambos campos y se corrige al rellenar uno.

**Lighthouse 12 (v3)**, rendimiento / accesibilidad / buenas prácticas / SEO:

| Página | Móvil | LCP móvil | Escritorio | LCP escr. | CLS | Peso (móvil / escr.) |
|---|---|---|---|---|---|---|
| `/` | 100 / 100 / 100 / 100 | 1,9 s | 100 / 100 / 100 / 100 | 0,4 s | 0 / 0,001 | 211 / 241 KiB |
| `/sistemas-aluminio/` | 99 / 100 / 100 / 100 | 1,9 s | 100 / 100 / 100 / 100 | 0,4 s | 0 | 207 / 224 KiB |
| `/sistemas-aluminio/abatibles/` | 100 / 100 / 100 / 100 | 1,4 s | 100 / 100 / 100 / 100 | 0,3 s | 0 | 101 / 105 KiB |
| `/contacto/` | 100 / 100 / 100 / 100 | 1,4 s | 100 / 100 / 100 / 100 | 0,3 s | 0 | 66 / 70 KiB |
| `/empresa/` | 100 / 100 / 100 / 100 | 1,4 s | 100 / 100 / 100 / 100 | 0,4 s | 0 / 0,013 | 110 / 133 KiB |
| `/consejos/rotura-puente-termico/` | 100 / 100 / 100 / 100 | 1,3 s | 100 / 100 / 100 / 100 | 0,3 s | 0 | 96 / 176 KiB |

La portada pesa más que en la v2 (165 → 211 KiB en móvil) porque la foto del hero ocupa ahora media pantalla a sangre; el LCP móvil pasa de 1,6 a 1,9 s, dentro del umbral «bueno» (< 2,5 s). TBT de 0–10 ms.

**Defectos encontrados y corregidos en la QA de la v3**

1. Con el error «Indique un teléfono o un correo», el campo de correo se estiraba hasta la altura del de teléfono (que mostraba el mensaje) y quedaba descolocado. `.field` ya no se estira (`align-content: start`).
2. Ese mismo error solo marcaba el teléfono. Ahora marca los dos campos y ambos se limpian al rellenar uno.
6. **Detectado por las pruebas**: al corregir un campo y pulsar «Enviar» directamente, la revalidación al salir del campo borraba un mensaje de error, la página se movía y el clic caía fuera del botón. Los errores resueltos se retiran ahora mientras se escribe (`input`), nunca al salir del campo, y no se añaden errores nuevos hasta el siguiente envío.
3. En móvil, la tabla de series cortaba el título y ocultaba 3 columnas sin ninguna pista visual.
4. En la portada, la foto de vidrios aparecía dos veces (tarjeta y «Destacados»).
5. Con 5 productos, la rejilla de la categoría dejaba un hueco.

**Revisión visual (v3)**: capturas a página completa de la portada, «Sistemas en aluminio», la ficha de abatibles y contacto en escritorio (1440 px) y móvil (390 px), más la portada a 1024 px. Estados revisados: hover y foco de las tarjetas del catálogo, hover de la documentación, errores del formulario y tabla de series a 375 px.

**Limitaciones de la v3**: las imágenes generadas con Higgsfield no están en el repositorio (descarga bloqueada por la red del entorno; ver `image-audit.md`), por lo que las capturas y las mediciones corresponden a las imágenes de reserva. Al activarlas, conviene repetir Lighthouse en la portada.

## 1. Resumen (v2)

| Prueba | Resultado |
|---|---|
| `astro check` | 0 errores, 0 avisos, 0 sugerencias |
| `npm run build` | 27 páginas, 25 URL en el sitemap, 24 redirecciones |
| `npm run check` (comprobaciones estáticas) | Superadas |
| Playwright contra `astro preview` (formulario simulado), 3 perfiles | **91 superadas**, 8 omitidas (no aplican al perfil) |
| Playwright contra Apache + PHP real (`.htaccess` y envío en modo de prueba) | **88 superadas**, 11 omitidas (casos simulados o de otro perfil) |
| Redirecciones de las 24 URL antiguas (curl contra Apache) | 24/24: 301 → 200 en un solo salto |
| Desbordamiento horizontal: 27 páginas × 7 anchos (320–1920 px) | 0 casos en 189 combinaciones; 0 errores de JavaScript |
| Movimiento reducido (`reducedMotion: 'reduce'`) | 0 elementos ocultos y 0 animaciones en marcha |
| Sin JavaScript | Todo el contenido visible; el catálogo es navegable |
| Lighthouse 12 (Apache local, móvil y escritorio) | 100 / 100 / 100 / 100 en todas las páginas medidas (la 404 tiene 69 en SEO a propósito, por `noindex`) |
| `npm audit` | 0 vulnerabilidades |

## 2. Pruebas nuevas en la v2

| Caso | Qué verifica |
|---|---|
| Mega menú «Productos» (3 perfiles) | Se abre y muestra las 3 categorías y las 15 fichas; desde él se llega a «Muro cortina» |
| Mega menú en escritorio | Se abre con hover; un clic justo después no lo cierra; se cierra al salir el ratón; con teclado: Enter abre, Tab entra en el panel, Escape cierra y devuelve el foco |
| Menú móvil | Panel visible, se cierra con Escape (el foco vuelve al botón) y al pulsar el fondo |
| Conmutador de categorías | La categoría actual lleva `aria-current="page"` |
| Ficha | El índice marca la sección activa (`aria-current`) al saltar a «Documentación»; «Siguiente» lleva a la ficha siguiente |
| Aparición al hacer scroll | Los bloques reciben `.is-in` y llegan a opacidad 1 |
| Movimiento reducido | Ningún `[data-reveal]` queda oculto |
| Sin JavaScript | Ningún `[data-reveal]` queda oculto y las tarjetas se ven |
| Barra de contacto móvil | Oculta al cargar, visible tras desplazarse, con `tel:` correcto, y oculta cuando el formulario está en pantalla |
| Formulario | El botón pasa a `aria-busy="true"` (indicador de carga) durante el envío |

Se mantienen todas las pruebas de la v1: 13 páginas representativas y las 25 URL del sitemap (HTTP 200, un H1, sin errores de consola, imágenes visibles cargadas, sin desbordamiento), 404, migas de pan, `tel:`/`mailto:`, mapa bajo demanda, preselección del producto, validación, error del servidor, respuesta no JSON, envío correcto y SEO.

## 3. Lighthouse 12 (v2)

Puntuaciones en el orden rendimiento / accesibilidad / buenas prácticas / SEO. Medición contra Apache local: no hay latencia de red real, aunque Lighthouse simula la conexión móvil.

| Página | Móvil | LCP móvil | Escritorio | LCP escr. | CLS | Peso |
|---|---|---|---|---|---|---|
| `/` | 100 / 100 / 100 / 100 | 1,6 s | 100 / 100 / 100 / 100 | 0,4 s | 0 | 165 KiB |
| `/sistemas-aluminio/` | 100 / 100 / 100 / 100 | 1,9 s | 100 / 100 / 100 / 100 | 0,4 s | 0 | 207 KiB |
| `/sistemas-aluminio/abatibles/` | 100 / 100 / 100 / 100 | 1,4 s | 100 / 100 / 100 / 100 | 0,3 s | 0 | 101 KiB |
| `/otros-productos/toldos-pergolas/` | 100 / 100 / 100 / 100 | 1,4 s | — | — | 0 | — |
| `/contacto/` | 100 / 100 / 100 / 100 | 1,2 s | 100 / 100 / 100 / 100 | 0,3 s | 0 | 66 KiB |
| `/empresa/` | 100 / 100 / 100 / 100 | 1,4 s | 100 / 100 / 100 / 100 | 0,5 s | 0,013 | 110 KiB |
| `/consejos/rotura-puente-termico/` | 100 / 100 / 100 / 100 | 1,3 s | 100 / 100 / 100 / 100 | 0,4 s | 0 | 96 KiB |
| `/404.html` | 100 / 100 / 100 / 69 | 1,1 s | — | — | 0,001 | 59 KiB |

TBT de 0 ms en todas. El peso de la portada sube de 123 a 165 KiB por la foto de alta resolución del hero; sigue dentro de márgenes excelentes.

**Defectos encontrados y corregidos en la QA de la v2**

1. El mega menú no se abría con un clic de ratón: el hover lo abría y el clic lo cerraba. Se ignora el clic durante 500 ms tras abrirse por hover.
2. El enlace del teléfono de la cabecera perdía su nombre accesible cuando se ocultaba el texto (detectado por Lighthouse). El texto pasa a estar oculto solo visualmente.
3. El enlace «volver a la categoría» del índice de la ficha, en móvil, no tenía nombre accesible. Se le añade `aria-label`.
4. El anillo de foco azul tenía un contraste de unos 2,4:1 sobre los fondos oscuros. Ahora es blanco en las zonas oscuras y rojas.
5. En móvil, el texto de las tarjetas de categoría quedaba sobre zonas claras de la foto. Se oscurece más el degradado.
6. En móvil, la etiqueta «Imagen ilustrativa» del hero quedaba tapada por un dato flotante. Se recoloca.
7. En móvil, las tarjetas de contacto se solapaban con la entradilla de la cabecera. Se elimina el margen negativo en móvil.
8. El índice de la ficha mantenía resaltada la última sección al volver arriba. Se calcula por posición de scroll.
9. Texto no verificable: «Sistemas más consultados» pasa a «Sistemas destacados del catálogo».

## 4. Revisión visual

Capturas a página completa y revisadas en escritorio (1440 px) y móvil (iPhone 13, 390 px): portada, «Sistemas en aluminio», ficha de abatibles, contacto, empresa y guía de RPT. También se revisaron el mega menú abierto, el menú móvil (cerrado, abierto y con «Productos» desplegado), la barra móvil y la portada con movimiento reducido.

## 5. Endpoint PHP y Apache (v1, sin cambios en la v2)

- `contacto.php`: 10/10 escenarios correctos (GET 405, errores 422 por campo, éxito, inyección de cabeceras neutralizada, campo trampa, flujo sin JavaScript con 303 o página de error, límite 429 y fallo de envío sin éxito falso).
- `.htaccess`: 404 real, cabeceras de seguridad, caché inmutable en `/_astro/`, gzip y `/api/` protegido. El bucle de redirección de la portada se corrigió en la v1.

## 6. Limitaciones y pendientes

- **Navegadores**: solo Chromium. Las View Transitions entre páginas son una mejora progresiva (Chromium y Safari recientes); en Firefox se navega sin transición. Conviene una revisión manual en Safari (iOS).
- **Lectores de pantalla**: sin prueba manual con NVDA o VoiceOver (sí con Lighthouse y con las pruebas de foco, ARIA y teclado).
- **Correo real**: `mail()` no se ha probado en el alojamiento de producción.
- **Imágenes**:
  - Las 15 fotos de producto miden 765 × 374 px; en las cabeceras de ficha se ven algo blandas en pantallas retina. Se recomienda sustituirlas por originales de mayor tamaño o fotografías propias.
  - Las 2 fotos de Unsplash se recortaron de capturas; conviene descargar los originales (ver `image-credits.md`).
- **Rendimiento real**: Lighthouse se ejecutó en local. Tras publicar, hay que medir con PageSpeed Insights.
- **Datos pendientes** (horario, antigüedad, financiación, garantía de lonas, WhatsApp, razón social y NIF): ocultos o retirados hasta su confirmación (`README.md`).
