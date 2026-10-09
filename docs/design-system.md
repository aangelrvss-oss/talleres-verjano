# Sistema de diseño (v2)

Versión 2 (octubre de 2026): rediseño visual avanzado sobre la base técnica de la v1. Los motivos de cada cambio están en `visual-audit.md`.

## Dirección visual

**«Precisión arquitectónica con calidez de taller».** La web debe sentirse como la de una empresa técnica y fiable, no como una plantilla. Cuatro ideas:

1. **Contraste editorial.** Cabeceras oscuras (`--c-ink-deep`) con tipografía blanca de gran tamaño y fotografía arquitectónica, alternadas con secciones claras y una banda roja de conversión. La alternancia oscuro → claro → oscuro → claro da ritmo a la lectura.
2. **El perfil de aluminio como motivo.** Líneas verticales finas de fondo, marcos desplazados alrededor de las imágenes, subrayados rojos que se «extruyen» al pasar el ratón y un esquema técnico propio de la rotura de puente térmico.
3. **Datos reales como gancho.** Los números de la ficha técnica (62 mm de vidrio, 400 kg por hoja, triple junta) se muestran grandes y con cifras tabulares. Ningún número inventado.
4. **Movimiento con función.** Las animaciones guían la lectura (aparición progresiva) o confirman una acción (hover, envío). Nunca bloquean ni decoran sin motivo.

### Marca

Se conserva el logotipo y sus dos colores. El **rojo** es el color de acción (botones principales, acentos, banda de presupuesto). El **azul** de marca se usa en enlaces y foco y, oscurecido, en los degradados de las cabeceras. El gris del logotipo inspira los neutros.

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
| Acento sobre oscuro | `#ff8a8d` | Palabra destacada del titular, iconos y números sobre fondo oscuro |

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
| Barra móvil | `MobileBar.astro` | «Llamar» y «Pedir presupuesto» fijos abajo en móvil; aparece tras 320 px de scroll y se oculta cuando el formulario está en pantalla. El pie reserva su altura |
| Cabecera de página | `PageHero.astro` | Oscura, con migas de pan, H1 grande, entradilla, imagen opcional y espacio para acciones. Variante `compact` para páginas legales y utilitarias |
| Conmutador de categorías | `CategorySwitch.astro` | Pestañas entre las 3 categorías con contador e indicador animado |
| Tarjeta de producto | `ProductCard.astro` | Etiqueta de categoría opcional, zoom de imagen, elevación y flecha circular que se rellena de rojo al pasar el ratón |
| Bento de catálogo | `index.astro` (`.tile`) | Tarjeta grande y dos medianas con imagen a sangre, degradado y chips de producto |
| Esquema RPT | `RptDiagram.astro` | SVG propio, accesible (`title` y `desc`) y nítido a cualquier resolución. Los perfiles se dibujan al entrar en pantalla |
| Ficha | `[category]/[product].astro` | Cabecera dividida con acciones, **índice fijo** con sección activa, características con iconos, tabla de series, documentación en tarjetas, anterior/siguiente y tarjeta de presupuesto fija en escritorio |
| Formulario | `ContactForm.astro` | Campos de 52 px con foco animado, selector propio, botón con indicador de carga, error con sacudida y confirmación con check animado |
| Banda de presupuesto | `CtaBand.astro` | Degradado rojo, titular grande y dos acciones. Admite un enlace con el producto preseleccionado |
| Iconos | `Icon.astro` | SVG de trazo de 1,75 px |

## Movimiento

| Efecto | Implementación | Duración |
|---|---|---|
| Transición entre páginas | View Transitions nativas entre documentos (`@view-transition`). La cabecera persiste (`view-transition-name`) | 0,18 s de salida y 0,32 s de entrada |
| Entrada del hero | Animación CSS al cargar: texto que sube, imagen que se asienta (escala 1,08 → 1) y subrayado que se extruye | 0,9–1,6 s, escalonado |
| Aparición al hacer scroll | `[data-reveal]` + IntersectionObserver en línea (unas 15 líneas). Variantes: subir, fundido, lateral y revelado de imagen por `clip-path`. Retardo escalonado con `--d` | 0,7 s |
| Proceso | Línea roja de cada paso que se dibuja al entrar | 1 s, escalonada |
| Esquema RPT | Trazo de perfiles (`stroke-dashoffset`), pletinas que crecen y flecha de calor (3 ciclos, no infinita) | 0,6–1,6 s |
| Hover | Tarjetas que se elevan, zoom de imagen, flechas que se desplazan, subrayados y chips | 0,2–0,9 s |
| Menús | Mega menú con fundido y desplazamiento; panel móvil deslizante con fondo oscurecido | 0,22–0,45 s |
| Formulario | Anillo de foco, indicador de carga, sacudida del error, check de confirmación | 0,45–0,8 s |

**Reglas**

- Solo se animan `opacity`, `transform` y `clip-path` (sin reflujo; CLS ≈ 0).
- `prefers-reduced-motion: reduce` desactiva todas las animaciones y transiciones (regla global y condiciones `no-preference` en cada efecto).
- **Sin JavaScript, todo es visible.** El ocultamiento previo a la aparición solo se aplica con la clase `.js`, que añade un script en línea en `<head>`.
- Sin librerías de animación, carruseles automáticos, parallax, vídeo de fondo ni cursores personalizados.

## Imágenes

| Uso | Imagen | Resolución | Origen |
|---|---|---|---|
| Hero de la portada y de «La empresa» | Fachada con ventanas de aluminio proyectantes | 1274 × 1793 | Unsplash (Heng Chiu), licencia Unsplash |
| Tarjeta grande del catálogo, cabecera de «Sistemas en aluminio» y miniatura del mega menú | Patio con correderas de gran formato | 2690 × 1793 | Unsplash (Salvo Media LLC), licencia Unsplash |
| Tarjetas y cabeceras de las fichas | 15 fotos de producto de la web actual | 765 × 374 | Web actual (procedencia original desconocida) |

- Todas se presentan como **imágenes ilustrativas**, con el aviso visible en el hero, en las cabeceras y en el pie.
- Las fotos de producto se muestran a un tamaño cercano al real (tarjetas de unos 380 px; cabeceras de ficha de unos 560 px). **No se han ampliado artificialmente.** En pantallas retina las cabeceras de ficha se ven algo blandas: se recomienda sustituirlas por originales o fotos propias (ver `qa-report.md`).
- Formatos AVIF/WebP con `srcset` generados en la compilación; `fetchpriority="high"` en la imagen principal de cada página.

## Descartado (y por qué)

- **Buscador o filtros**: 15 productos en 3 categorías se recorren mejor con el mega menú y el conmutador de categorías.
- **Carruseles automáticos**: baja interacción y problemas de accesibilidad. En móvil, «Destacados» es un carril con desplazamiento táctil que controla el usuario.
- **WhatsApp**: número no confirmado.
- **GSAP, AOS o Framer Motion**: CSS nativo y unas líneas de JavaScript bastan.
