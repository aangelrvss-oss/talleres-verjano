# Auditoría visual de la implementación (v1) y plan de mejora

Fecha: 9 de octubre de 2026. Revisada en el navegador (Chromium) a 1440 px, 1366 px, 820 px y 390 px sobre la compilación servida por Apache local. La v1 es técnicamente sólida (Lighthouse 100, 0 errores), pero **visualmente correcta y poco memorable**.

## 1. Diagnóstico por áreas

| Área | Problema concreto en la v1 | Impacto |
|---|---|---|
| **Impacto de la portada** | El hero es un bloque claro con texto a la izquierda y una foto de 765 px enmarcada a la derecha. Se parece a cualquier plantilla corporativa; no hay contraste ni una imagen dominante. | Alto |
| **Imágenes** | Las 15 fotos recuperadas miden **765 × 374 px**. En el hero y en pantallas retina se ven blandas. No hay ninguna imagen de alta resolución. | Alto |
| **Tipografía** | Manrope está bien elegida, pero la escala es plana: el H1 de la portada (56 px) apenas destaca sobre los H2 (40 px). Las versalitas pequeñas («eyebrow») se repiten en todas las secciones. | Medio |
| **Jerarquía y composición** | Casi todas las secciones siguen el mismo patrón: antetítulo, H2 y rejilla de tarjetas blancas con borde gris. Sucesión monótona. | Alto |
| **Contraste de secciones** | Solo alternan blanco y gris muy claro, y al final una banda oscura. Falta ritmo. | Medio |
| **Botones** | Correctos y accesibles, pero planos; sin microinteracción (flecha, presión, carga). | Bajo |
| **Navegación** | Tres desplegables separados que suman 6 elementos más el botón: el menú queda muy lleno a 1280–1440 px. No se ve el catálogo completo de un vistazo. En móvil funciona, pero el panel aparece de golpe. | Medio |
| **Catálogo (categorías)** | Rejilla de tarjetas iguales sin introducción visual ni forma de saltar entre categorías. | Medio |
| **Fichas** | El título está en una cabecera gris genérica y la foto aparece debajo, lejos del H1. No hay índice de secciones ni navegación anterior/siguiente. La caja de presupuesto se pierde en fichas largas. | Alto |
| **Contacto y formulario** | El formulario funciona bien, pero tiene un aspecto «administrativo»: el selector de producto es un desplegable largo y no hay feedback visual del envío más allá del texto. | Medio |
| **Footer** | Correcto, pero denso y sin cierre visual (sin llamada a la acción ni logotipo). | Bajo |
| **Responsive** | No hay desbordamientos, pero en móvil la llamada a la acción desaparece al hacer scroll: no hay acceso rápido a «Llamar» o «Presupuesto». | Medio |
| **Animaciones** | Prácticamente inexistentes (solo hover de tarjetas y desplegables). La web se siente estática. | Alto |
| **Consistencia** | Buena: mismos tokens en todas las páginas. Es una fortaleza que hay que conservar. | — |

## 2. Datos que la v1 mostraba como seguros y siguen pendientes

La v1 destacaba **«Desde 1968»** (hero, antetítulos, títulos SEO) y mostraba el **horario** de la web antigua con una nota, y la **garantía de 5 años** de las lonas. Los tres siguen pendientes de confirmar por el propietario (ver `content-inventory.md` §1). En la v2:

- La antigüedad y el horario se controlan con indicadores en `src/data/site.ts` (`foundingYearConfirmed`, `hours.confirmed`) y **no se muestran mientras sean `false`**.
- La garantía de las lonas se retira del texto hasta que se confirme.

## 3. Plan de mejora (por impacto)

1. **Hero editorial oscuro a sangre** con una fotografía arquitectónica de alta resolución (fachada con ventanas de aluminio, 1274 × 1793 px, licencia Unsplash), titular grande, dos llamadas a la acción y una franja de accesos rápidos al catálogo.
2. **Imágenes**: dos fotografías de stock de alta resolución con licencia Unsplash para el hero y la banda de proyecto, siempre como **imágenes ilustrativas**. Las 15 fotos de producto se mantienen en las tarjetas, a un tamaño que no supera su resolución real.
3. **Ritmo de secciones**: hero oscuro → catálogo asimétrico (una categoría grande y dos medianas) → banda técnica sobre la rotura de puente térmico con un esquema SVG propio → proceso de trabajo en 4 pasos → destacados → fabricantes → consejos → banda de presupuesto con foto panorámica → contacto.
4. **Mega menú «Productos»** con las 3 categorías y las 15 fichas en una sola vista, más un acceso a presupuesto. Esto descarga la barra (Productos, Empresa, Consejos, Contacto). En móvil, un panel lateral animado con acordeones.
5. **Fichas**: hero dividido (H1, entradilla y llamadas a la acción junto a la imagen), índice de secciones fijo en escritorio, características destacadas, tablas legibles, documentación en tarjetas, navegación anterior/siguiente dentro de la categoría y enlace de vuelta a la categoría.
6. **Categorías**: cabecera con imagen y conmutador entre las 3 categorías.
7. **Formulario**: selector de interés por categoría en chips, campos con microinteracción de foco, botón con indicador de carga y confirmación animada (solo cuando el servidor confirma).
8. **Barra de contacto fija en móvil** (Llamar · Presupuesto), que aparece al pasar el hero y se oculta en el formulario.
9. **Movimiento**: aparición progresiva de secciones con IntersectionObserver y CSS, transiciones entre páginas con View Transitions nativas, hover en tarjetas e imágenes, flechas animadas, cabecera que se compacta al hacer scroll. Todo se desactiva con `prefers-reduced-motion` y el contenido es visible sin JavaScript.
10. **Footer** con llamada a la acción y logotipo.

**Descartado**: buscador o filtros (15 productos en 3 categorías no lo justifican), carruseles automáticos, parallax, vídeo de fondo, cursores personalizados, librerías de animación (GSAP, AOS…), subida de archivos y WhatsApp (número no confirmado).

## 4. Iteración v3: diagnóstico de la v2 y cambios aplicados

Revisión de la v2 en Chromium a 1440, 1024 y 390 px (capturas en el informe final). La v2 tenía buen ritmo, pero arrastraba problemas de composición, de rigor en los datos y de exceso de llamadas a la acción.

| Área | Problema en la v2 | Cambio en la v3 |
|---|---|---|
| **Hero** | Foto vertical de 34 rem dentro de un marco desplazado, sobre un bloque oscuro: se leía como «tarjeta pequeña dentro de un bloque oscuro». Dos datos flotantes tapaban la foto | Foto **a sangre en la mitad derecha**, de arriba abajo y hasta el borde de la ventana, sin marco ni sombra. En móvil, foto 4:3 a todo el ancho y texto debajo. Titular algo menor (máx. 72 px) para no pasar de 4 líneas |
| **Datos del hero** | «62 mm de vidrio máximo en las series abatibles con RPT» y «400 kg por hoja en correderas elevables» se presentaban como generales | Retirados del hero. En la banda técnica, con su serie y su fuente: «62 mm… en la serie abatible Q87C16», «400 kg por hoja en la corredera elevable Q120», «Datos de los catálogos técnicos de QSystems». El hero muestra 3 garantías verificables: fábrica y exposición en Madrid, perfiles QSystems con RPT y asesoramiento sin compromiso |
| **Porcentajes de ahorro** | «≤ 60 % de ahorro energético» (portada), «hasta el 50 %» y «40 %/60 %» (vidrios, guías) | Sin fuente técnica: retirados en toda la web y bloqueados en `npm run check` (ver `content-inventory.md` §4) |
| **Accesos rápidos del hero** | Repetían las 3 categorías justo encima del catálogo | Eliminados |
| **Catálogo de la portada** | Chips de todos los productos sobre las fotos (ruido); la foto de vidrios aparecía también en «Destacados» | 1 tarjeta principal + 2 secundarias, sin chips. La principal lista sus 5 sistemas como texto. Toda la tarjeta es clicable, con foco visible |
| **Destacados** | 6 tarjetas que repetían el catálogo | 3 sistemas de aluminio («Abrir, deslizar o elevar») |
| **Rojo** | Rojo en guiones de etiquetas, números, líneas, iconos y bordes: competía con los botones | Rojo solo para la acción (ver `design-system.md`, «Regla de color») |
| **Fichas: cierre** | Hero con CTA + índice con «Presupuesto» + tarjeta lateral + banda roja final: 4 llamadas a la acción | Se retira la banda roja de las fichas. La tarjeta lateral («Presupuesto sin compromiso», con el nombre del producto) cierra la ficha en móvil |
| **Fichas: tarjeta lateral** | «¿Le interesa sistemas abatibles?» (concordancia forzada) | Antetítulo con el producto y título «Presupuesto sin compromiso» |
| **Fichas: tabla de series** | En móvil se cortaba el título y las columnas «Marco», «Hoja» y «Vidrio» quedaban fuera de la vista sin ninguna pista | Título fuera de la zona desplazable, «RPT» abreviado con leyenda, celdas que pueden partirse y sombras laterales. Las 5 columnas caben desde 375 px; a 320 px se desplaza con indicación |
| **Fichas: PDF** | 10 cajas pequeñas en rejilla; «Serie 40 · catálogo RM40» partía en dos líneas | Lista de filas: icono, «Serie Q57», «Catálogo técnico · PDF», icono de pestaña nueva; contador y fabricante en la entradilla |
| **Relacionados** | «Frentes de armario» sugería «Sistemas correderos» y «Mamparas» sugería «Cerrajería» | Corregido; título «También le puede interesar» |
| **Categorías** | Con 5 productos, la rejilla 3 + 2 dejaba un hueco | Rejilla de 6 columnas: 2 tarjetas anchas + 3 (con 4 productos, 2 + 2) |
| **Contacto** | En móvil, 3 tarjetas altas antes del formulario; la dirección aparecía 3 veces; el aviso «al menos un teléfono o un correo» quedaba bajo el selector de producto | Tarjetas en filas compactas en móvil; la sección del mapa ya no repite la dirección; el aviso va bajo teléfono y correo |
| **Movimiento** | 6 duraciones distintas para hover y paneles; desplazamientos de 28–32 px | Tokens `--dur-ui`, `--dur-panel`, `--dur`, `--stagger`; desplazamientos de 18–24 px y escalonado con tope |
| **Imágenes** | Ver `image-audit.md` | 5 imágenes generadas con Higgsfield, listas para activarse al copiarlas (§3 de `image-audit.md`). Vídeo evaluado y descartado |

Se mantienen sin cambios: URLs, 27 páginas, 24 redirecciones, metadatos, sitemap, datos estructurados y enlaces a los PDF.
