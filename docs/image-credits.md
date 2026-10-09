# Créditos y procedencia de las imágenes

## Clasificación por origen (v3.1)

| Origen | Recursos | Situación de derechos |
|---|---|---|
| **Originales de la empresa** | Logotipo (`brand/logo-talleres-verjano.png`) | Propio. No hay ninguna fotografía confirmada como propia: la web no muestra trabajos realizados |
| **Imágenes de fabricantes** (probable) | Fotos de producto de la web actual. Seguro en 2 casos, por la marca visible: `domotica-automatismos.png` y `cerrajeria.png` | **Pendiente**: confirmar que la empresa puede usarlas (material cedido por el fabricante o distribuidor) |
| **Procedencia sin identificar** | Las otras 13 fotos de producto de la web actual (`src/assets/products/`) | **Pendiente de confirmar** por el propietario. Se usan como ilustración, nunca como trabajos realizados |
| **Stock con licencia** | `stock/fachada-ventanas-aluminio.jpg` (Heng Chiu) y `stock/patio-corredera-moderna.jpg` (Salvo Media LLC) | Licencia de Unsplash verificada |
| **Generadas con IA** | 6 imágenes de Higgsfield (`src/assets/generated/`) | Generadas en la cuenta del propietario e **incorporadas** desde los originales que aportó. Rotuladas «Imagen ilustrativa generada con IA» en los pies de foto y en el pie de la web |
| **Gráficos propios** | Esquema de rotura de puente térmico (`RptDiagram.astro`) | Propio |

**Imágenes problemáticas en fichas**:
- **Abatibles**: resuelto con `ficha-abatibles.jpg` (generada con IA, rotulada).
- **Mosquiteras**: la foto sí muestra mosquiteras plisadas (revisada al 100 %), pero a tamaño de tarjeta se distinguen poco. Se mantiene; sustitución recomendada en `image-audit.md` §5. Texto alternativo corregido.

## Detalle

| Archivo | Uso | Procedencia | Autor | Licencia | Estado |
|---|---|---|---|---|---|
| `src/assets/stock/fachada-ventanas-aluminio.jpg` | Cabecera de «La empresa» (y reserva del hero) | https://unsplash.com/photos/modern-building-facade-with-open-aluminum-windows-reflecting-light-O0-nO2ipXAg | Heng Chiu (@chiuchuuu) | [Unsplash License](https://unsplash.com/license): uso comercial gratuito, sin atribución obligatoria | Verificado «Free to use under the Unsplash License» el 9/10/2026 |
| `src/assets/stock/patio-corredera-moderna.jpg` | Reserva de la tarjeta y cabecera de «Sistemas en aluminio» (hoy no se publica) | https://unsplash.com/photos/modern-outdoor-patio-with-pool-and-contemporary-architecture-xtfvGngzrO0 | Salvo Media LLC (@salvomedia) | Unsplash License | Verificado el 9/10/2026 |
| `src/assets/products/*.png` (15) | Tarjetas y cabeceras de ficha | Web actual de Talleres Verjano (`ft_cab_cuerpo.jpg` de cada ficha) | Desconocido (probablemente material de fabricantes) | **Pendiente de confirmar por el propietario** | Ver `content-inventory.md` §3.8 |
| `src/assets/generated/*.jpg` (6, incorporadas) | Hero, tarjetas y cabeceras de categoría, cabeceras de abatibles y correderas | Generadas con Higgsfield (modelo `gpt_image_2_5`): 5 el 9/10/2026 por encargo del propietario y 1 (correderas) por el propietario el 20/9/2026 | Imagen generada con IA | Según los términos de Higgsfield para la cuenta del propietario (plan *starter*) | Incorporadas desde los originales del propietario (`image-audit.md` §2) |
| `src/assets/brand/logo-talleres-verjano.png` | Logotipo | Web actual | Talleres Verjano | Propio | Se recomienda obtener el original en vector |

## Notas

- **Imágenes generadas con IA**: se rotulan «Imagen ilustrativa generada con IA», no muestran trabajos reales de la empresa, no contienen texto, logotipos ni marcas de agua y no se han ampliado. Los *prompts*, los ID de los trabajos y el coste están en `image-audit.md`.
- **Vídeo de ambiente**: evaluado y descartado (ver `image-audit.md` §4). No se incluye.

- Las dos fotografías de Unsplash se obtuvieron de una captura de la página del autor (el dominio de imágenes de Unsplash está bloqueado desde el entorno de desarrollo), a 1274 × 1793 y 2690 × 1793 px. **Antes del lanzamiento conviene descargar los originales** con el botón «Download free» de cada enlace y reemplazar los archivos (mismo nombre): se gana fidelidad de color y resolución sin tocar el código.
- Se descartaron candidatas en las que aparecían personas (fotografía de Arno Senoner), una instalación de fábrica que podría confundirse con un taller propio (MBOR MC) y fotos sin carpintería de aluminio (Jason Leung, Ayumi Kubo).
- Ninguna imagen se presenta como trabajo realizado por Talleres Verjano. El hero, las cabeceras y el pie indican «Imagen ilustrativa».
- No aparecen rostros, matrículas ni datos personales.
- La atribución no es obligatoria en la Licencia de Unsplash, pero puede añadirse en el pie si el propietario lo desea.
