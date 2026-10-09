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
