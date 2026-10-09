# Inventario de contenido — www.talleresverjano.com

Fecha del rastreo: 9 de octubre de 2026.
Método: el dominio no es accesible directamente desde el entorno de desarrollo (el proxy de salida devuelve 403), por lo que el rastreo se hizo con Firecrawl (Markdown, HTML bruto, enlaces y capturas de pantalla) y con búsquedas `site:` en el índice web. Detalle de limitaciones en `audit-report.md`.

Leyenda de estado de migración:

- **Migrado**: el contenido está en la nueva web (corregido ortográficamente, sin alterar datos técnicos).
- **Migrado con cambios**: se ha eliminado o reubicado algo; el motivo se indica.
- **No migrado**: no se ha publicado; motivo indicado.
- **Pendiente de confirmación**: necesita validación del propietario.

---

## 1. Datos comerciales verificados y discrepancias

| Dato | Valor en la web actual | Otras fuentes | Estado |
|---|---|---|---|
| Razón social | No aparece | «TALLERES VERJANO SL» (Cinco Días, Axesor) | Pendiente (necesaria para aviso legal, con CIF) |
| Dirección | C/ Cerámica 25, P.I. La Cerámica, 28038 Madrid («Exposición y fábrica») | Google Maps (ficha embebida en /04contacto.html): «Polígono Industrial la Cerámica, C. de la Cerámica, 25, Puente de Vallecas, 28038 Madrid». QDQ: «Calle Río San Pedro 10, 28018» | Se usa la dirección de la web (coincide con Google). La de QDQ parece antigua: pendiente de confirmar y, si procede, corregir en el directorio |
| Coordenadas | — | 40.4049956, -3.6569774 (ficha de Google embebida) | Usadas en el enlace al mapa y en `LocalBusiness` |
| Teléfono fijo | 91 303 87 75 | Google: 913 03 87 75 | Verificado |
| Teléfono móvil | 635 30 40 43 | Solo en la web | Migrado. Uso como WhatsApp: **no confirmado**, no se ha añadido |
| Email general | info@talleresverjano.com | — | Migrado |
| Email clientes | clientes@talleresverjano.com (solo en /04contacto.html) | — | Migrado en la página de contacto |
| Horario | L-V 9:00 a 14:00 / 15:30 a 19:30 (pie de página) | Google (oct. 2026): L-J 8:30–14:00 y 14:45–18:00; V 8:30–13:30; S-D cerrado. Infobel: L-J 9-14 y 15-19; V 9-14 | **Contradicción. Pendiente de confirmación.** La web nueva muestra provisionalmente el horario publicado en la web actual y avisa de confirmar por teléfono. No se incluye en datos estructurados |
| Antigüedad | «Contigo desde 1968», «más de 50 años», «dos generaciones» | Facebook: «más de 30 años de experiencia». Axesor: sociedad «constituida hace 7 meses» (posible nueva sociedad) | Se mantiene «desde 1968» (fuente propia, repetida). Pendiente de confirmación |
| Actividad | «Fabricante e instalador de aluminio en Madrid» (meta description), «Exposición y fábrica» | Google: «Carpintería metálica y de aluminio» | Verificado |
| Financiación | Slider: «sin intereses, hasta 20.000 € y en un máximo de 60 cuotas» | Ninguna | **No migrado.** Oferta comercial sin condiciones, entidad ni vigencia. Reactivable si el propietario la confirma |
| Reformas integrales | Slider con enlace a /02reformas_en_general.html | La URL no existe (devuelve la portada) | **No migrado.** No hay contenido que lo respalde |
| PVC Kömmerling («distribuidores oficiales») | Slider con enlace a /02sistemas_en_pvc.html | La URL no existe | **No migrado.** Pendiente de confirmar la distribución oficial |
| Automatismos Somfy | Slider con enlace a /01materiales_adicionales_automatismos.html | La URL no existe; la página real de automatismos cita Cherubini y «Mago/Magoe» | Se cita Cherubini. Somfy y Mago/Magoe pendientes de confirmación |
| Valoraciones | — | Google: 4,9 / 48 reseñas | No se publican ni se usan en datos estructurados |
| Redes sociales | No enlazadas | facebook.com/talleresverjano, Instagram (reels) | No enlazadas: pendiente de que el propietario confirme cuáles mantiene activas |
| Dominio .es | Noticia «Bienvenidos a nuestra nueva web www.talleresverjano.es» | — | No migrado (texto obsoleto). Canonical: www.talleresverjano.com |

## 2. Marcas y fabricantes citados

| Marca | Dónde aparece | Uso en la nueva web |
|---|---|---|
| QSystems (aluminio) | Abatibles, correderas, elevables, mallorquinas; PDFs del fabricante | Citada en las fichas |
| Rominio | Catálogos RM40 / RM40MN (PDF) | Solo como nombre del documento |
| Technoform Bautec (poliamidas) | Portada de los PDF de QSystems | No citado (dato del fabricante) |
| SGG Climalit / Climalit Planitherm (Saint-Gobain) | Vidrios y acristalamientos | Citada en la ficha |
| Cherubini | Automatismos; logo en la portada | Citada |
| Mago / Magoe | Automatismos (escrito de dos formas) | Pendiente de confirmación |
| Kassandra | Mamparas | Citada |
| Persax | Logo en la portada | No citada en texto (no hay contenido asociado). Pendiente |
| Kömmerling, Somfy | Solo en el slider, con enlaces rotos | Pendiente |
| Logos de proveedores 3–5 de la portada | No cargan en la captura (animación) | No reutilizados. No se usan logotipos de terceros |

## 3. Inventario de páginas

Todas las páginas comparten el mismo `<title>` («Talleres Verjano»), la misma meta description y las mismas meta keywords. Ninguna tiene H1 (los títulos son `h3`), canonical, Open Graph ni datos estructurados. El texto alternativo de todas las imágenes está vacío.

### 3.1 Portada

| Campo | Valor |
|---|---|
| URL original | https://www.talleresverjano.com/ (también /index.php) |
| Contenido | Barra superior (teléfonos, email), menú, slider de 4 diapositivas (financiación, reformas, automatismos Somfy, PVC Kömmerling), 3 valores (Desde 1968, Ahorro energético, Calidad y garantía), rejilla de categorías (4 + 4 + 6), 5 logos de proveedores sin enlace, 3 «últimas noticias», pie con formulario corto |
| Imágenes | /archivos/00front/01slider/img01–04.jpg, 02valores/ico-*.png, 03sistemas_de_aluminio/img01–04.jpg, 04materiales_adicionales/img01–04.jpg, 05otros_productos/img01–06.jpg, 06proveedores/img01–05.png, 07ultimas_noticias/img01–03.jpg |
| Enlaces rotos | Los 3 enlaces de noticias apuntan a fichas que no existen o a otro producto (/03_otros_productos_aluminio_modular.html, /03_otros_productos_cierres_de_seguridad.html, /03_otros_productos_frentes_de_armario.html). «Más noticias», logos y email apuntan a `#`. Mamparas en la rejilla enlaza a /03_otros_productos_mamapras_de_bano.html (errata, URL inexistente). El menú móvil enlaza «Sistemas libro» a /01aluminio_sistemas_sistemas_libro.html (inexistente) |
| URL destino | / |
| Estado | Migrado con cambios (slider sustituido por hero; financiación, reformas, PVC y noticias no migrados; ver §1) |

### 3.2 Sistemas en aluminio

Plantilla común: banner con título y migas de pan, imagen principal, subtítulo, secciones «::», columna de **Documentación** (PDF del fabricante) y bloque «Materiales adicionales».

| URL original | Título visible / subtítulo | Contenido técnico | Documentos | URL destino | Estado |
|---|---|---|---|---|---|
| /01aluminio_sistemas_abatibles.html | Sistemas abatibles — «Apertura del 100% del espacio que ocupa» | Descripción (practicables), energía (RPT con pletinas de poliamida o resina, ahorro de hasta un 60 %, triple junta), series QSystems: Q40 (marco 40 / hoja 47 / vidrio 30 mm), Q57 (50/67/36), Q67 y Q67+ (60/67/46), Q75 y Q75+ (75/85/56), Q77C16 (70 canal 16/77/56), Q77+ (70/77/56), Q87C16 (80 canal 16/87/62), Q87HO+ (80/87/62); aperturas interior/exterior y oscilobatiente | Catalogo_RM40.pdf (botón «Q40»), Q57, Q67, Q67+, Q75, Q75+, Q77+, Q77 C16, Q87 C16, Q87 HO (todos verificados, HTTP 200) | /sistemas-aluminio/abatibles/ | Migrado. «Q87HO+» se publica como «Q87HO», que es el nombre del catálogo y del botón. Erratas corregidas («empress») |
| /01aluminio_sistemas_corredera.html | Sistemas corredera — «No ocupan espacio, crean espacio» | Descripción, deslizamiento sobre rodamientos de bola o aguja, energía (RPT, vidrios hasta 30 mm, series europeas sin RPT para interiores), serie Q95 (europea de 70 a 95 mm, hoja 35 mm, vidrio hasta 30 mm), aperturas de 2 a 4 hojas, cerco de tres carriles (66 % de hueco) | Q95.pdf (informe de ensayo Applus+) | /sistemas-aluminio/correderas/ | Migrado («Eerie» → «Serie») |
| /01aluminio_sistemas_elevables.html | Sistemas elevables — «La mejor solución para los grandes espacios» | Elevar-deslizar-bajar, herraje para hasta 400 kg por hoja, maniobra con una mano, energía, Q120 RPT (marco de 122 mm, hojas de hasta 3300 × 2800 mm, opción de herraje de corredera tradicional) | Q120.pdf | /sistemas-aluminio/elevables/ | Migrado con cambios: se elimina el párrafo «Aperturas» (copiado de abatibles: habla de apertura interior/exterior y oscilobatiente, que no aplica a una elevadora) |
| /01aluminio_sistemas_mallorquina.html | Sistemas mallorquina — «La mejor solución en cuanto a protección solar» | Contraventanas exteriores e interiores (fraileros), lamas fijas o móviles; Q40RM: lamas móviles, fijas o panel ciego; practicables de 1 a 4 hojas y plegables de hasta 7 hojas; acristalamiento de hasta 28 mm y hojas de hasta 60 kg | Catalogo_RM40MN.pdf | /sistemas-aluminio/mallorquinas/ | Migrado con cambios: se elimina el párrafo genérico «Aperturas» copiado de abatibles (la información de aperturas de Q40RM se mantiene) |
| /01aluminio_sistemas_libro.html (enlazado en el menú de las fichas como «Sistemas libro») | Banner «SISTEMAS LIBRO», pero el contenido es **muro cortina** — «La última tecnología en aislamiento para fachadas» | Descripción, energía, sistema E100 (estructural, semiestructural y tapeta: aluminio 6063 T-5, frente visto 54 mm, vidrio 30–32 mm, juntas EPDM, RPT 6 y 11 mm, proyectante oculta, compás inox hasta 150 kg por hoja, anclajes regulables), sistema AL50 (intercalario y tapeta: montantes y travesaños de 50 mm, profundidades 50–225 / 53,5–228,5 mm, vidrio 8–43 mm, bastidor fijo 400 kg, proyectante 155 kg) | Fichas E-100 de tapetas, Estructural, Semiestructural; AL-50 Intercalario; AL-50 Tapeta | /sistemas-aluminio/muro-cortina/ | Migrado con cambios: se nombra correctamente como «Muro cortina»; se elimina el texto de plantilla «dimensiones ….m x ….m» |
| /01aluminio_sistemas_sistemas_libro.html | (enlace del menú móvil y de la portada) | No existe: devuelve la portada con 200 | — | Redirección a /sistemas-aluminio/ | — |

Imágenes de cada ficha: `bk_marcasec.jpg` (banner), `ft_cab_cuerpo.jpg` (principal, recuperada), `ft_detalle.jpg` (dibujos de aperturas), `bt_cat_XXa.jpg` (miniaturas de perfiles en la columna de documentación).

### 3.3 Materiales adicionales

| URL original | Título / subtítulo | Contenido | URL destino | Estado |
|---|---|---|---|---|
| /02materiales_adicionales_acristalamientos.html | Vidrios y acristalamientos — «Tecnología e innovación aplicada al cristal» | Doble acristalamiento (hasta un 50 % de ahorro), SGG Climalit, recomendaciones de grosor (mín. 4 mm, exterior 6 mm recomendado, cámara mín. 12 mm), Climalit Planitherm: cristal inteligente, acústico, de seguridad, sistema energético ATR con argón (hasta 40 % en aire acondicionado y 60 % en calefacción), barrotillo decorativo | /materiales-adicionales/vidrios-acristalamientos/ | Migrado (se suaviza el superlativo «valor U más bajo del mercado» → «bajo valor U»; erratas «acristalara sus ventas», «clástico») |
| /02materiales_adicionales_persianas_y_compactos.html | Persianas y compactos — «Un elemento clave de protección térmica y solar» | Sistema compacto, lama térmica estándar (poliuretano inyectado), lama regulable de extrusión, autoblocantes de alta seguridad (aluminio extrusionado, 44 puntos de bloqueo por metro, RAL, motor; ciega o microperforada), cierres enrollables para negocios y garajes | /materiales-adicionales/persianas-compactos/ | Migrado (migas «Persionas» corregidas) |
| /02materiales_adicionales_automatismos.html | Domótica y automatismos — «Lo último en tecnología para su confort» | Hogar conectado y control por smartphone, ventajas: salud, ahorro energético, seguridad (simulación de presencia), tecnología de los motores (termoprotección, receptor de radio, funcionamiento silencioso) | /materiales-adicionales/domotica-automatismos/ | Migrado con cambios: se cita Cherubini; «Mago/Magoe» pendiente |
| /02materiales_adicionales_mosquiteras.html | Mosquiteras de aluminio — «Un complemento imprescindible para sus ventanas» | Enrollable vertical, enrollable lateral simple, lateral doble, fija, corredera, plegable/plisada (1 o 2 hojas, cierre magnético, reversible); red de fibra de vidrio gris; variedad de colores | /materiales-adicionales/mosquiteras/ | Migrado |
| /01materiales_adicionales_automatismos.html | Enlace del slider «Automatismos Somfy» | No existe (devuelve la portada) | Redirección a /materiales-adicionales/domotica-automatismos/ | — |

### 3.4 Otros productos

Plantilla: banner, imagen principal, texto y «Galería de imágenes» (8 fotos por producto en `/galeria/ft01–08.jpg`).

| URL original | Título / subtítulo | Contenido | URL destino | Estado |
|---|---|---|---|---|
| /03_otros_productos_hierro_y_forja.html | Hierro y forja — «Soluciones en hierro y forja» | Forja artística, de seguridad y estructural; barandillas, cancelas, rejas, vallas, cerramientos de piscina, pérgolas, celosías (trenzado y perforado) | /otros-productos/hierro-forja/ | Migrado (se suaviza «una de las más cualificadas del mercado») |
| /03_otros_productos_toldos.html | Toldos — «Innovación y diseño en protección solar» | Tipos de toldo, motorización y automatización, lonas acrílicas teñidas en masa con 5 años de garantía (según la web), lonas microperforadas, pérgolas de aluminio | /otros-productos/toldos-pergolas/ | Migrado (la garantía de 5 años de las lonas se mantiene literal; pendiente de confirmar vigencia) |
| /03_otros_productos_frentes_de_armario.html | Frentes de armario — «Todo un mundo de posibilidades, dentro y fuera de tu armario» | Ruedas autolimpiables, anti-golpeo, tres carriles, perfiles minimalistas, sin carril inferior, sistema automatizado, interiores, acabados | /otros-productos/frentes-armario/ | Migrado |
| /03_otros_productos_mamparas_de_bano.html | Mamparas de baño — «Da un toque de estilo a tu baño» | Calidad, diseño (Kassandra), seguridad | /otros-productos/mamparas-bano/ | Migrado (se suaviza «empresa líder del sector») |
| /03_otros_productos_mamapras_de_bano.html | Errata enlazada desde la portada | No existe | Redirección a /otros-productos/mamparas-bano/ | — |
| /03_otros_productos_cerrajeria.html | Cerrajería — «Refuerza la seguridad para ti y para los tuyos» | Puertas blindadas, acorazadas, bombillos antibumping (características y certificado UNE-EN 1303) | /otros-productos/cerrajeria/ | Migrado |
| /03_otros_productos_estores.html | Estores — «La unión del estilo y la protección solar» | Estores enrollables, accionamientos (cadena, manivela, motor, motor de batería), personalización, doble tejido | /otros-productos/estores/ | Migrado |
| /03_otros_productos_aluminio_modular.html, /03_otros_productos_cierres_de_seguridad.html | Enlazadas desde «Últimas noticias» | No existen | Redirección a /consejos/ | — |

### 3.5 Contacto

| Campo | Valor |
|---|---|
| URL original | /04contacto.html |
| Contenido | Mapa de Google, datos de contacto (exposición y fábrica, teléfonos, emails), formulario «Solicite presupuesto sin compromiso» (nombre, email, teléfono, necesidades) |
| Funcionalidad | **El formulario no funciona**: el botón es un enlace a `#` y la función `validar_consulta()` nunca se invoca. Además, si se invocara, mostraría «Gracias por su solicitud» sin comprobar la respuesta del servidor (`/app/email/enviar.php`). El formulario corto del pie tampoco está conectado y no envía la consulta escrita |
| URL destino | /contacto/ |
| Estado | Migrado con formulario nuevo funcional (ver `technical-decisions.md`) |

### 3.6 Noticias

| Título | Destino del enlace actual | Estado |
|---|---|---|
| Bienvenidos a nuestra nueva web www.talleresverjano.es | URL inexistente | No migrado (obsoleto) |
| Qué es la rotura de puente térmico y para qué sirve | URL inexistente; solo existe la entradilla | Guía nueva en /consejos/rotura-puente-termico/ redactada **exclusivamente** con el contenido técnico ya publicado en las fichas de aluminio |
| ¿Cómo ahorrar energía sustituyendo los vidrios? | URL inexistente; solo existe la entradilla | Guía nueva en /consejos/ahorrar-energia-cambiando-vidrios/ redactada con el contenido de la ficha de acristalamientos |

### 3.7 Documentación técnica (PDF)

Todos verificados con HTTP 200 el 9/10/2026. Son catálogos de fabricante (QSystems, Rominio y fichas de muro cortina). No se han podido descargar al repositorio (dominio bloqueado desde el entorno), por lo que la web nueva los enlaza en su **ruta actual**. Es imprescindible conservar la carpeta `/archivos/` en el servidor al desplegar (ver `README.md`).

| Archivo | Ficha |
|---|---|
| /archivos/01sistemas_de_aluminio/01abatible/catalogos/Catalogo_RM40.pdf | Abatibles (serie 40) |
| …/01abatible/catalogos/Q57.pdf, Q67.pdf, Q67+.pdf, Q75.pdf, Q75+.pdf, Q77+.pdf, Q77 C16.pdf, Q87 C16.pdf, Q87 HO.pdf | Abatibles |
| …/02corredera/catalogos/Q95.pdf | Correderas |
| …/03elevables/catalogos/Q120.pdf | Elevables |
| …/04mallorquina/catalogos/Catalogo_RM40MN.pdf | Mallorquinas |
| …/05muro_cortina/catalogos/Ficha Tecnica E-100 de tapetas.pdf, Ficha Tecnica E-100 Estructural.pdf, Ficha Tecnica E-100 Semiestructural.pdf, Ficha-Tecnica-AL-50-Intercalario-2017-v.3-17.pdf, Ficha-Tecnica-Al-50-Tapeta-2017-v.3-17.pdf | Muro cortina |

### 3.8 Imágenes reutilizadas

Recuperadas a partir de capturas de pantalla sin pérdida (PNG) de las fichas a 1920 px de ancho, recortando la imagen principal (`ft_cab_cuerpo.jpg`, 765 × 374 px). Están en `src/assets/products/` y se optimizan a AVIF/WebP en la compilación.

| Archivo nuevo | Origen |
|---|---|
| sistemas-abatibles.png … estores.png (15) | `ft_cab_cuerpo.jpg` de cada ficha |
| brand/logo-talleres-verjano.png | `/archivos/00cabecera/logo.png` (recorte de la cabecera, 292 × 68 px) |

Procedencia original desconocida (probablemente material gráfico de fabricantes). Se usan como imágenes ilustrativas de producto, **nunca** como trabajos realizados. No se ha creado galería de proyectos. Las galerías de 8 fotos por producto no se han migrado (solo se dispone de miniaturas con iconos superpuestos).

### 3.9 Elementos técnicos

| Elemento | Estado actual |
|---|---|
| robots.txt | 404 |
| sitemap.xml | 404 |
| URLs inexistentes | Devuelven la portada con HTTP 200 (soft 404) → riesgo de contenido duplicado |
| Canonical / OG / datos estructurados | Ausentes |
| Viewport | `user-scalable=no` (impide el zoom: problema de accesibilidad) |
| Dependencias | jQuery (dos copias), Bootstrap 3.3.7 desde CDN, w3.css desde w3schools.com, Font Awesome 5 desde CDN, fancybox 1.3.4, owl.carousel, meanmenu, wow.js |
| Google Maps | Iframe cargado sin consentimiento previo |
