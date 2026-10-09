# Sistema de diseño

## Dirección visual

**«Taller técnico de confianza»**: una web sobria y precisa, con la claridad de una ficha técnica bien maquetada y la cercanía de una empresa familiar. Se apoya en tres ideas:

1. **El producto es el protagonista.** Fotografía grande y limpia, mucho blanco, texto bien jerarquizado. Nada de sliders ni animaciones decorativas.
2. **La precisión como valor.** Las series y medidas (marco, hoja, vidrio) se presentan en tablas legibles, con números tabulares. Las líneas finas y los ángulos rectos recuerdan a la perfilería de aluminio.
3. **El contacto siempre a mano.** Teléfono y «Pedir presupuesto» visibles en la cabecera y en cada ficha, sin resultar invasivos.

Se conservan los elementos reconocibles de la marca (logo, **rojo** y **azul** del logotipo) pero se reequilibran: el rojo se reserva para la acción principal y los acentos, y el azul de marca se oscurece para textos, fondos y enlaces. La web antigua usaba el rojo en bloques enteros, lo que restaba jerarquía.

## Color

Tokens definidos en `src/styles/global.css` (`:root`).

| Token | Valor | Uso |
|---|---|---|
| `--c-ink` | `#14202e` | Texto principal, fondos oscuros (pie, bandas) |
| `--c-ink-soft` | `#3c4a5a` | Texto secundario (contraste 8,9:1 sobre blanco) |
| `--c-muted` | `#5b6775` | Metadatos y leyendas (5,9:1) |
| `--c-line` | `#dde2e7` | Bordes y separadores |
| `--c-surface` | `#f4f5f3` | Fondo de secciones alternas (tono «aluminio anodizado») |
| `--c-white` | `#ffffff` | Fondo base |
| `--c-brand` | `#d7141a` | Rojo de marca: botón principal, acentos, marcador de sección |
| `--c-brand-dark` | `#b00f14` | Hover del botón principal (contraste del texto blanco 6,4:1) |
| `--c-blue` | `#0b4ea2` | Azul de marca: enlaces y foco (7,0:1) |
| `--c-blue-tint` | `#e8f0fa` | Fondos informativos |

Criterio: todo texto cumple **WCAG AA** (4,5:1 o más). El blanco sobre `--c-brand` da 5,1:1.

## Tipografía

- **Manrope** (variable, autoalojada con `@fontsource-variable/manrope`, subconjunto latino): geométrica, técnica y muy legible, con buen soporte de acentos y ñ. Una sola familia para reducir peso.
- Escala fluida con `clamp()`: cuerpo de 17 px en escritorio (16 px en móvil) e interlineado de 1,65.
- Titulares en peso 700–800 con interletraje ligeramente negativo; antetítulos («eyebrow») en versalitas con espaciado amplio y marcador rojo.
- `font-variant-numeric: tabular-nums` en tablas de especificaciones.

## Espaciado y retícula

- Escala de 4 px: `--s-1` (4) … `--s-10` (128).
- Contenedor de 1200 px de ancho máximo y márgenes laterales fluidos (16–32 px).
- Secciones con padding vertical `clamp(56px, 8vw, 112px)`.
- Radio de borde pequeño (`4px`, `8px` en tarjetas): aspecto preciso, no «app».

## Componentes

| Componente | Archivo | Notas |
|---|---|---|
| Cabecera con barra de contacto | `Header.astro` | Fija al hacer scroll; menús desplegables accesibles por teclado (botones con `aria-expanded`); menú móvil a pantalla completa |
| Pie | `Footer.astro` | Datos de contacto con enlaces `tel:`/`mailto:`, catálogo, empresa y legal |
| Botón | `.btn`, `.btn--primary`, `.btn--ghost`, `.btn--light` | Altura mínima 48 px (objetivo táctil) |
| Tarjeta de producto | `ProductCard.astro` | Imagen 16:9, título, subtítulo, flecha; toda la tarjeta clicable con un solo enlace |
| Cabecera de página | `PageHero.astro` | Migas de pan, H1, entradilla |
| Ficha de producto | `pages/[categoria]/[producto].astro` | Imagen, secciones de contenido, tabla de series, documentación PDF, relacionados, CTA |
| Tabla de series | `SeriesTable.astro` | Tabla real (`<table>`) con desplazamiento horizontal en móvil |
| Lista de documentos | `DocumentList.astro` | Enlaces PDF con tamaño de tipo y aviso de que es documentación del fabricante |
| Bloque CTA | `CtaBand.astro` | Banda oscura con teléfono y presupuesto |
| Formulario | `ContactForm.astro` | Etiquetas visibles, errores por campo con `aria-describedby`, resumen de errores, estados de envío |
| Mapa | `MapEmbed.astro` | Carga bajo demanda (botón); enlace directo a Google Maps |
| Iconos | `Icon.astro` | SVG en línea de trazo de 1,75 px, `aria-hidden` |

## Interacción y movimiento

- Transiciones de 150–200 ms solo en color, sombra y desplazamiento de flechas.
- `prefers-reduced-motion`: se desactivan las transiciones.
- Foco visible: contorno azul de 3 px con separación de 2 px en todos los elementos interactivos.
- Sin carruseles ni animaciones de entrada.

## Imágenes

- Fotografías de producto recuperadas de la web actual (ilustrativas, no trabajos propios). Proporción 765 × 374 → se presentan en 16:9 con `object-fit: cover`.
- Formatos AVIF/WebP generados en la compilación con `astro:assets`, con `width`/`height` explícitos para evitar saltos de maquetación.
- La portada no usa una imagen de fondo con texto encima: imagen y texto van separados para asegurar la legibilidad.

## Decisiones descartadas

- **Slider en la portada**: baja interacción, mala accesibilidad y mensajes que no se podían respaldar.
- **Rojo como color de bloque**: se reserva para la acción principal.
- **Fuentes de Google Fonts por CDN**: se autoalojan para no enviar datos a terceros.
- **Galería de proyectos**: no hay fotografías de trabajos propios con procedencia verificada.
