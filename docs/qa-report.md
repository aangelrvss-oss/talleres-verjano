# Informe de QA

Última ejecución: 9 de octubre de 2026 · Rama `claude/busy-gauss-k22go8` · **v2 (rediseño visual)** · Astro 7.3.8 · Node 22 · Chromium (Playwright 1.56) · Apache 2.4 + PHP 8.3 locales.

Solo se recogen pruebas **realmente ejecutadas**. Limitaciones al final.

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
