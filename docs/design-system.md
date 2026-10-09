# Sistema de diseño (v3)

Versión 3 (octubre de 2026): refinamiento de la v2. Portada más editorial, rojo reservado para la acción, tokens de movimiento, fichas más legibles e imágenes auditadas. Los motivos de cada cambio están en `visual-audit.md` (§4 para la v3).

## Dirección visual

**«Precisión arquitectónica con calidez de taller».** La web debe sentirse como la de una empresa técnica y fiable, no como una plantilla. Cuatro ideas:

1. **Contraste editorial.** Cabeceras oscuras (`--c-ink-deep`) con tipografía blanca de gran tamaño y fotografía arquitectónica, alternadas con secciones claras y una banda roja de conversión. La alternancia oscuro → claro → oscuro → claro da ritmo a la lectura.
2. **El perfil de aluminio como motivo.** Líneas verticales finas de fondo, fotografía arquitectónica a sangre, separadores finos y un esquema técnico propio de la rotura de puente térmico.
3. **Datos reales, siempre con su contexto.** Las cifras técnicas (62 mm, 400 kg, triple junta) solo aparecen junto a la serie a la que se refieren (Q87C16, Q120) y con su fuente. Se han retirado los porcentajes de ahorro sin fuente técnica (ver `content-inventory.md` §4).
4. **Movimiento con función.** Las animaciones guían la lectura (aparición progresiva) o confirman una acción (hover, envío). Nunca bloquean ni decoran sin motivo.

### Marca

Se conserva el logotipo y sus dos colores. El gris del logotipo inspira los neutros.

**Regla de color (v3): el rojo es para actuar.** Solo es rojo lo que se pulsa o lo que indica que se está pulsando: botones principales, «Presupuesto» del índice de la ficha, banda de presupuesto, subrayado del enlace activo del menú, flecha de la tarjeta al pasar el ratón y el teléfono de la cabecera. Única excepción decorativa: el subrayado de «a medida» en el titular de la portada, como firma de marca. En la v3 dejan de ser rojos: los guiones de las etiquetas (`.eyebrow`, ahora en el color del texto), los números de pasos y guías (azul), la línea de los pasos y del conmutador de categorías (tinta), los iconos de PDF, del pie y del mapa (neutros) y el borde de los titulares de ficha (tinta). El **azul** de marca se usa en enlaces, foco e iconos informativos.

## Color

Tokens en `src/styles/global.css` (`:root`).

| Token | Valor | Uso |
|---|---|---|
| `--c-ink-deep` | `#0d1620` | Fondo del hero, de las cabeceras interiores y del pie |
| `--c-ink` | `#14202e` | Texto principal; bandas oscuras (técnica, lateral de presupuesto) |
| `--c-ink-soft` | `#3c4a5a` | Texto secundario (9,1:1 sobre blanco) |
| `--c-muted` | `#5b6775` | Metadatos (5,8:1; 5,3:1 sobre `--c-surface`) |
| `--c-line` / `--c-line-strong` | `#dde2e7` / `#c3cbd3` | Bordes y separadores |
| `--c-grid` | `#e8ebe8` | Líneas de fondo en superficies claras |
| `--c-surface` | `#f4f5f3` | Secciones alternas claras |
| `--c-brand` | `#d7141a` | Rojo de marca: acción principal (blanco encima: 5,2:1) |
| `--c-brand-dark` | `#b00f14` | Hover y degradado de la banda roja (7,2:1) |
| `--c-blue` | `#0b4ea2` | Enlaces y anillo de foco (8,0:1) |
| Texto sobre oscuro | `#c9d2dc` / `#9eabb8` | Párrafos y metadatos sobre `--c-ink-deep` (11,9:1 y 7,8:1) |
| Acento sobre oscuro | `#ff8a8d` | Solo la palabra destacada del titular de la portada y el hover de enlaces sobre oscuro |

Todos los textos cumplen WCAG AA. Lighthouse no detecta problemas de contraste (ver `qa-report.md`).

## Tipografía

- **Manrope** variable, autoalojada (`@fontsource-variable/manrope`, sin peticiones a Google).
- Escala ampliada en la v2 para dar jerarquía real:
  - `--fs-display`: `clamp(2.5rem, 1.55rem + 4.4vw, 5.25rem)`. Titular de la portada y de la banda de presupuesto. Peso 800, interletraje −0,035 em.
  - `.h-xl`: `clamp(2rem, 1.4rem + 2.6vw, 3.5rem)`. Títulos de sección.
  - H1 interiores: `clamp(2.25rem, 1.5rem + 3.2vw, 4.25rem)`.
  - Cuerpo de 16 a 17 px con interlineado de 1,65.
- `.num` con cifras tabulares para datos técnicos y numeración (01–04).

## Espaciado, retícula y formas

- Escala de 4 px (`--s-1` … `--s-10`); secciones con `clamp(3.5rem, 8vw, 7rem)` de padding vertical.
- Contenedor de 1200 px con márgenes laterales de 16 a 32 px.
- Radios: 4 px en botones, 10–12 px en tarjetas y campos, 14–18 px en paneles grandes.
- Sombras: `--shadow-sm` (reposo), `--shadow-md` (hover ligero), `--shadow-lg` (tarjetas destacadas, paneles flotantes).

## Componentes

| Componente | Archivo | Notas v2 |
|---|---|---|
| Cabecera | `Header.astro` | Barra superior que sale de pantalla con el scroll y barra principal translúcida fija. **Mega menú «Productos»** con 3 columnas (miniatura, nº de productos, 15 fichas) y bloque de asesoramiento. Subrayado rojo animado en los enlaces. En móvil, **panel lateral** con fondo oscurecido, acordeón de productos y botón hamburguesa que se transforma en aspa |
| Barra móvil | `MobileBar.astro` | «Llamar» y «Pedir presupuesto» fijos abajo en móvil (< 768 px). v3.1: **se aparta mientras se lee hacia abajo** y vuelve al subir o al llegar al final; se oculta con el formulario en pantalla y mientras se escribe en un campo. 54 px de alto con botones de 44 px, una sola línea también a 320 px, respeta el área segura inferior. `scroll-padding-bottom` evita que el foco o un ancla queden debajo y el pie reserva su altura |
| Cabecera de página | `PageHero.astro` | Oscura, con migas de pan, H1 grande, entradilla, imagen opcional y espacio para acciones. Variante `compact` para páginas legales y utilitarias |
| Conmutador de categorías | `CategorySwitch.astro` | Pestañas entre las 3 categorías con contador e indicador animado |
| Tarjeta de producto | `ProductCard.astro` | Etiqueta de categoría opcional, zoom de imagen, elevación y flecha circular que se rellena de rojo al pasar el ratón |
| Hero de la portada | `index.astro` (`.hero`) | v3: texto sobre tinta a la izquierda y fotografía a sangre en la mitad derecha hasta el borde de la ventana (sin tarjeta ni marco). En móvil, foto arriba (4:3) y texto debajo. Tres garantías verificables bajo los botones. Sin cifras técnicas |
| Catálogo de la portada | `index.astro` (`.tile`) | v3: 1 tarjeta principal + 2 secundarias, toda la tarjeta clicable. Sin chips: la principal lista sus 5 sistemas como enlaces de texto separados por filetes |
| Esquema RPT | `RptDiagram.astro` | SVG propio, accesible (`title` y `desc`) y nítido a cualquier resolución. Los perfiles se dibujan al entrar en pantalla |
| Ficha | `[category]/[product].astro` | Cabecera dividida con acciones, **índice fijo** con sección activa, características con iconos, tabla de series, documentación, anterior/siguiente y tarjeta de presupuesto fija en escritorio. v3: sin banda roja final (la tarjeta lateral ya es el cierre); relacionados «También le puede interesar» |
| Tabla de series | `SeriesTable.astro` | v3: título fuera de la zona desplazable, «RPT» abreviado con `<abbr>` y leyenda, unidades que no se separan del número (`src/utils/text.ts`, también en las listas de especificaciones), celdas que pueden partirse en móvil y sombras laterales cuando hay más columnas. Sin columnas ocultas. Cabe sin desplazamiento desde 375 px; a 320 px se desplaza con el dedo o con las flechas del teclado (zona enfocable con anillo de foco) |
| Documentación | `DocumentList.astro` | v3: lista de filas con icono, nombre («Serie Q57», «E-100 estructural»), tipo real del documento («Catálogo del fabricante», «Ficha técnica») y aviso de pestaña nueva; contador de documentos y fabricante |
| Rejilla de categoría | `[category]/index.astro` (`.cgrid`) | v3: sin huecos. Con 4 o 5 productos, la primera fila lleva 2 tarjetas anchas; con 6, 2 filas de 3 |
| Formulario | `ContactForm.astro` | Campos de 52 px con foco animado, selector propio, botón con indicador de carga, error con sacudida y confirmación con check animado. v3: el aviso «al menos un teléfono o un correo» va justo debajo de esos dos campos (antes quedaba tras el selector en móvil) |
| Contacto rápido | `contacto/index.astro` (`.qc`) | v3: en móvil, filas compactas (icono a la izquierda) para que el formulario aparezca antes. La dirección completa ya no se repite en la sección del mapa |
| Banda de presupuesto | `CtaBand.astro` | Degradado rojo, titular grande y dos acciones. Admite un enlace con el producto preseleccionado |
| Iconos | `Icon.astro` | SVG de trazo de 1,75 px |

## Movimiento

**Tokens (v3)** en `global.css`: `--dur-ui` 0,3 s (hover y estados que se desplazan), `--dur-panel` 0,45 s (paneles y barra móvil), `--dur` 0,6 s (apariciones), `--stagger` 70 ms (escalonado, con un tope de 350 ms). Curvas: `--ease` para color y `--ease-out` para movimiento. Antes convivían 0,3 / 0,35 / 0,4 / 0,45 / 0,5 s.

| Efecto | Implementación | Duración |
|---|---|---|
| Transición entre páginas | View Transitions nativas entre documentos (`@view-transition`). La cabecera persiste (`view-transition-name`) | 0,18 s de salida y 0,32 s de entrada |
| Entrada del hero | Animación CSS al cargar: texto que sube 18 px, imagen que se asienta (escala 1,06 → 1, sin opacidad para no retrasar el LCP) y subrayado que se extruye | 0,8–1,8 s, escalonado 60 ms |
| Aparición al hacer scroll | `[data-reveal]` + IntersectionObserver en línea (unas 15 líneas). Variantes: subir (20 px), fundido, lateral (24 px) y revelado de imagen por `clip-path`. Retardo `--d × 70 ms`, máximo 350 ms | 0,6 s |
| Proceso | Línea de tinta de cada paso que se dibuja al entrar | 1 s, escalonada |
| Esquema RPT | Trazo de perfiles (`stroke-dashoffset`), pletinas que crecen y flecha de calor (3 ciclos, no infinita) | 0,6–1,6 s |
| Hover | Tarjetas que se elevan, zoom de imagen, flechas que se desplazan, subrayados y chips | 0,2–0,9 s |
| Menús | Mega menú con fundido y desplazamiento; panel móvil deslizante con fondo oscurecido | 0,22–0,45 s |
| Formulario | Anillo de foco, indicador de carga, sacudida del error, check de confirmación | 0,45–0,8 s |

**Reglas**

- Solo se animan `opacity`, `transform` y `clip-path` (sin reflujo; CLS ≈ 0).
- `prefers-reduced-motion: reduce` desactiva todas las animaciones y transiciones (regla global y condiciones `no-preference` en cada efecto).
- **Sin JavaScript, todo es visible.** El ocultamiento previo a la aparición solo se aplica con la clase `.js`, que añade un script en línea en `<head>`.
- Sin librerías de animación, carruseles automáticos, parallax, vídeo de fondo ni cursores personalizados. En la v3 se evaluó un vídeo de ambiente para el hero y se descartó (ver `image-audit.md` §4).

## Imágenes

Auditoría completa en `image-audit.md`; créditos en `image-credits.md`.

| Uso | Imagen actual | Resolución | Sustituto generado (al copiarlo en `src/assets/generated/`) |
|---|---|---|---|
| Hero de la portada | Fachada con ventanas proyectantes (Unsplash) | 1274 × 1793 | `hero-salon-corredera.jpg` (2048 × 1360) |
| Tarjeta principal y cabecera de «Sistemas en aluminio» | Patio con correderas (Unsplash) | 2690 × 1793 | `categoria-sistemas-aluminio.jpg` |
| Tarjeta y cabecera de «Materiales adicionales» | Foto de producto de vidrios | 765 × 374 | `categoria-materiales-adicionales.jpg` |
| Tarjeta y cabecera de «Otros productos» | Foto de producto de toldos | 765 × 374 | `categoria-otros-productos.jpg` |
| Cabecera de abatibles y de correderas | Fotos de producto | 765 × 374 | `ficha-abatibles.jpg`, `ficha-correderas.jpg` |
| Resto de tarjetas y fichas | 15 fotos de producto de la web actual | 765 × 374 | — |

- Todas son **imágenes ilustrativas** y lo indican; las generadas, «Imagen ilustrativa generada con IA».
- **Sin ampliación artificial**: los `srcset` se filtran para no superar nunca el ancho de la imagen original.
- Cada imagen editorial tiene un **punto de enfoque** (`focus` en `src/data/media.ts`) para recortar bien en la mitad derecha del hero (escritorio), en 4:3 (móvil) y en las tarjetas.
- Ninguna imagen se repite en una misma página (en la v2, la de vidrios aparecía dos veces en la portada).
- Formatos AVIF/WebP generados en la compilación; `fetchpriority="high"` y `loading="eager"` en la imagen principal de cada página.

## Descartado (y por qué)

- **Buscador o filtros**: 15 productos en 3 categorías se recorren mejor con el mega menú y el conmutador de categorías.
- **Carruseles automáticos**: baja interacción y problemas de accesibilidad. En móvil, los sistemas destacados forman un carril con desplazamiento táctil que controla el usuario.
- **Chips de producto en las tarjetas del catálogo** (v2): demasiado ruido sobre la foto. Sustituidos por una lista de texto solo en la tarjeta principal.
- **Cifras técnicas en el hero** (v2): sacadas de contexto parecían valer para toda la gama. Se trasladan a la banda técnica con su serie.
- **WhatsApp**: número no confirmado.
- **GSAP, AOS o Framer Motion**: CSS nativo y unas líneas de JavaScript bastan.
