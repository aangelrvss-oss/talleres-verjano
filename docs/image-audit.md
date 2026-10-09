# Auditoría de imágenes (v3)

Revisión de todas las imágenes que usa la web: resolución, nitidez, encuadre, proporción, correspondencia con el producto, coherencia, licencia y necesidad de sustitución. Fecha: 9 de octubre de 2026.

## 1. Imágenes en uso

### 1.1 Editoriales (portada y cabeceras de categoría)

Se gestionan en `src/data/media.ts`. Cada una tiene una imagen de reserva (la que se publica hoy) y un sustituto generado que se activa al copiar el archivo en `src/assets/generated/` (ver §3).

| Uso | Archivo actual | Tamaño | Nitidez y encuadre | Correspondencia | Licencia | ¿Sustituir? |
|---|---|---|---|---|---|---|
| Hero de la portada (mitad derecha a sangre) | `stock/fachada-ventanas-aluminio.jpg` | 1274 × 1793 | Buena. Vertical: encaja en la mitad derecha en escritorio y en 4:3 en móvil | Ventanas proyectantes de aluminio. Correcto | Unsplash | Sí, por `hero-salon-corredera.jpg` (más contexto de vivienda, luz cálida, 2048 px) |
| Tarjeta principal «Sistemas en aluminio» y cabecera de la categoría | `stock/patio-corredera-moderna.jpg` | 2690 × 1793 | Muy nítida | **Débil**: la carpintería ocupa poco espacio, domina el patio | Unsplash | Sí, por `categoria-sistemas-aluminio.jpg` |
| Tarjeta «Materiales adicionales» y cabecera | `products/vidrios-acristalamientos.png` | 765 × 374 | Algo blanda en retina | Muro de vidrio con cielo. Genérica | Web actual (pendiente) | Sí, por `categoria-materiales-adicionales.jpg` |
| Tarjeta «Otros productos» y cabecera | `products/toldos-pergolas.png` | 765 × 374 | Algo blanda en retina | Toldo. Correcto | Web actual (pendiente) | Sí, por `categoria-otros-productos.jpg` |
| «La empresa» | `stock/fachada-ventanas-aluminio.jpg` | 1274 × 1793 | Buena | Correcto | Unsplash | No (pasa a ser exclusiva de esta página cuando se active el nuevo hero) |

### 1.2 Fotos de producto (15 fichas, tarjetas y mega menú)

Todas proceden de la web actual (`ft_cab_cuerpo.jpg`), miden **765 × 374 px** (≈ 2:1) y se ven correctas en pantallas normales y algo blandas en retina. **No se han ampliado**: el `srcset` nunca supera el ancho original.

| Ficha | Contenido | Correspondencia | Observaciones |
|---|---|---|---|
| Abatibles | Salón con ventanas y puerta blancas abiertas al jardín | **Dudosa** | La carpintería blanca podría ser de madera o PVC: no se distingue el aluminio. Se propone sustituirla (§3) |
| Correderas | Corredera de aluminio plata sobre suelo de madera | Correcta | |
| Elevables | Gran corredera con vistas al mar | Correcta | Encuadre con trípode y mobiliario: algo recargada |
| Mallorquinas | Contraventanas de lamas blancas | Correcta | |
| Muro cortina | Fachada de vidrio con proyectante | Correcta | |
| Vidrios y acristalamientos | Fachada de vidrio con cielo | Genérica | Aceptable como ilustración |
| Persianas y compactos | Persianas de aluminio en una vivienda | Correcta | |
| Domótica y automatismos | Mandos y motores | Correcta | Foto de producto de fabricante, con marca visible en los mandos |
| Mosquiteras | Porche con correderas | **Débil** | No se ve ninguna mosquitera |
| Hierro y forja | Barrotes de forja | Correcta | |
| Toldos y pérgolas | Toldo extendido | Correcta | |
| Frentes de armario | Armario con puertas correderas | Correcta | |
| Mamparas de baño | Mampara de ducha | Correcta | |
| Cerrajería | Cilindro de seguridad con llave | Correcta | Imagen de fabricante con marca en la llave |
| Estores | Salón con estores | Correcta | |

**Coherencia del conjunto**: mezcla de fotos de fabricante, renders y fotografía de interiores con distintas temperaturas de color. Es el punto más débil de la web y no se puede corregir sin fotografías nuevas.

**Licencia**: pendiente de confirmar por el propietario (probablemente material cedido por fabricantes).

### 1.3 Otros

| Archivo | Uso | Estado |
|---|---|---|
| `brand/logo-talleres-verjano.png` (292 × 68) | Logotipo | Recorte de la web actual. Conviene el original en vector |
| `RptDiagram.astro` (SVG en línea) | Esquema de rotura de puente térmico | Propio, marcado como «Esquema ilustrativo, no a escala» |

## 2. Imágenes generadas con Higgsfield

Autorizado en el encargo de la v3. Modelo `gpt_image_2_5` (variante *flare*), calidad alta, 2k (2048 × 1360, 3:2), sin texto, logotipos ni marcas de agua en el *prompt*. Coste: 2,75 créditos por imagen, **13,75 créditos** en total (5 imágenes), del saldo existente de 73,7. No se ha comprado nada.

Inventario real comprobado en la cuenta de Higgsfield el 9/10/2026 (consulta del historial, sin coste). Hay **6 imágenes distintas** para los 6 destinos: 5 generadas en la v3 y 1 generada antes por el propietario.

| Archivo de destino | Uso previsto | Escena | ID del trabajo | Original |
|---|---|---|---|---|
| `hero-salon-corredera.jpg` | Hero de la portada | Salón luminoso en Madrid con corredera de aluminio gris antracita abierta a una terraza con olivo | `fd76e3e1-4498-4215-93f3-34ab3ad48010` | 2048 × 1360, calidad alta |
| `categoria-sistemas-aluminio.jpg` | Tarjeta principal y cabecera de «Sistemas en aluminio» | Interior mediterráneo con grandes correderas negras abiertas a una terraza | `ab73ed3b-9ba3-4f1d-abd5-f9369a8aee46` | 2048 × 1360, calidad alta |
| `categoria-materiales-adicionales.jpg` | Tarjeta y cabecera de «Materiales adicionales» | Detalle de ventana de aluminio con doble acristalamiento y persiana a media altura | `841a3ca5-1dc3-41f6-957e-88ccfcb12842` | 2048 × 1360, calidad alta |
| `categoria-otros-productos.jpg` | Tarjeta y cabecera de «Otros productos» | Terraza con pérgola de lamas de aluminio y toldo | `d8d15370-f85b-42b6-8a79-8171c9f8acd4` | 2048 × 1360, calidad alta |
| `ficha-abatibles.jpg` | Cabecera de la ficha de abatibles (sustituye la foto dudosa) | Fachada de ladrillo con ventanas abatibles de aluminio antracita, una abierta | `3714ab50-8614-4729-a596-bea39d67d853` | 2048 × 1360, calidad alta |
| `ficha-correderas.jpg` | Cabecera de la ficha de correderas | Salón con corredera de aluminio antracita abierta a un jardín | `918413d9-02ec-44f9-9d21-1a26c30d47d3` (generada por el propietario el 20/9/2026) | 1168 × 880, **calidad baja**: revisar nitidez antes de usarla |

En la cuenta hay otras dos imágenes del 20/9 que **no se usan**: una fachada blanca con corredera (`6b485d78…`) y un detalle de manilla (`f1c35335…`), ambas de 1168 × 880 y calidad baja. Pueden servir más adelante para una guía o para «La empresa».

**Revisión visual** (sobre las vistas previas): perfiles de aluminio bien definidos y reconocibles como aluminio (antracita o negro, perfiles finos, sin aspecto de PVC), luz natural, sin personas, sin texto ni logotipos visibles. Las escenas son genéricas: **no muestran instalaciones reales de Talleres Verjano** y se rotulan «Imagen ilustrativa generada con IA».

**Estado (pre-lanzamiento): incorporadas.** El propietario aportó los originales en `archive.zip` (8 PNG y el vídeo). Se comprobó que los 6 necesarios coinciden con los ID de la tabla (nombre de archivo, tamaño y contenido), se revisó `918413d9` al 100 % y se incorporaron con `npm run add-image` (JPEG de alta calidad, sin ampliar, sin metadatos): 2,3 MB en el repositorio; la web los sirve en AVIF/WebP. No se regeneró ninguna imagen ni se gastaron créditos. Recorte revisado a 320, 390, 1024 y 1440 px. Commit `054dc0f`.

### Prompts

Todos terminan con: *«No people, no text, no letters, no logos, no watermarks, no signage.»*

1. **Hero**: «Photorealistic architectural interior photograph. A bright contemporary apartment living room in Madrid with a large floor-to-ceiling anthracite grey aluminium sliding window system spanning the right two thirds of the frame. Slim, sharply defined aluminium profiles, visible meeting rail and slim recessed handle, one sliding panel partially open onto a terrace with potted olive tree and soft out-of-focus residential rooftops. Warm late-afternoon natural sunlight, soft shadows on a light oak floor, minimalist neutral furniture, calm plain warm-white wall on the left third. 24mm tilt-shift lens at eye level, perfectly straight verticals, natural colour, high dynamic range, editorial architecture magazine style.»
2. **Sistemas en aluminio**: «Photorealistic architectural photograph taken from inside a modern Spanish home looking out: a wide wall of large fixed and sliding glazing framed in matte black thermally broken aluminium, slim profiles clearly visible with precise mitred corners, floor-to-ceiling, opening onto a sunlit terrace with Mediterranean plants. Soft natural morning light, polished concrete floor, a single low linen sofa at the lower left…»
3. **Abatibles**: «Photorealistic exterior architectural photograph of a renovated Madrid residential brick building facade in soft daylight, several large modern anthracite grey aluminium casement windows (tilt-and-turn) with slim profiles and clear double glazing, one window open inward, light stone window sills, neat white rendered reveals. Frontal view slightly from below, straight verticals…»
4. **Materiales adicionales**: «Photorealistic close-up architectural detail photograph of a modern anthracite aluminium window: insulated double glazing unit with visible warm-edge spacer, slim thermally broken aluminium frame corner, and an exterior aluminium roller shutter lowered halfway… Shallow depth of field, soft natural light…»
5. **Otros productos**: «Photorealistic architectural photograph of a sunny Mediterranean terrace of a Madrid home with a modern white aluminium pergola with adjustable louvres and a retractable neutral beige fabric awning extended over an outdoor dining area, light stone paving, potted plants… late afternoon warm light…»

## 3. Cómo incorporar las imágenes generadas

1. Descargar cada imagen original (PNG) desde la cuenta de Higgsfield: abrir la generación por su ID (tabla del §2) y usar «Descargar». Alternativa: habilitar `d8j0ntlcm91z4.cloudfront.net` en la red del entorno de desarrollo.
2. Incorporarla con el nombre de destino:
   ```bash
   npm run add-image -- ~/Descargas/hf_…_fd76e3e1….png hero-salon-corredera
   ```
   El script (`scripts/add-generated-image.mjs`) solo acepta los 6 nombres previstos, convierte a JPEG de calidad alta **sin cambiar el tamaño** (nunca amplía), elimina los metadatos y avisa si la imagen es pequeña para su uso. Se admiten también archivos ya en JPEG, PNG o WebP copiados a mano: `src/data/media.ts` busca el nombre con cualquiera de esas extensiones.
3. `npm run build`. `src/data/media.ts` detecta el archivo y lo usa con su texto alternativo, su punto de enfoque y el rótulo «Imagen ilustrativa generada con IA». Sin el archivo, se mantiene la imagen de reserva. En la web publicada se sirven en AVIF/WebP con `srcset` (la optimización la hace Astro en la compilación).
4. Revisar el recorte en 320, 390, 1024 y 1440 px y ajustar `focus` en `media.ts` si hace falta. Repetir Lighthouse en la portada (la imagen del hero es la de mayor peso).
5. Actualizar la columna «Estado» de `image-credits.md`.

El mecanismo se ha probado con un archivo temporal (PNG convertido por el script): la portada pasó a usar la imagen y el texto alternativo nuevos, y al retirarlo volvió a la de reserva.

## 4. Vídeo de ambiente

**Evaluado y descartado** para el hero. El propietario aportó un clip generado con Higgsfield (`hf_20260920_115531…mp4`): 1920 × 1080, 5 s, 24 fps, 8,2 Mbit/s, con pista de audio, 5,3 MB.

| Criterio | Vídeo | Imagen fija |
|---|---|---|
| Contenido | Salón vacío con correderas negras y una cortina que se mueve; exterior sobreexpuesto | Escena con más contexto (terraza, luz cálida, Madrid) |
| Continuidad | **Corte brusco** a los 2,3 s (de un plano frontal a uno en ángulo): no sirve como bucle sin recortarlo | — |
| Peso | 5,3 MB; recortado y recomprimido a 720p, unos 0,5–0,8 MB | 60–150 KB (AVIF/WebP) |
| LCP y datos móviles | Necesita póster, carga diferida y desactivarlo en móvil y con «ahorro de datos» | Sin coste extra |
| Movimiento reducido | Debería detenerse | No aplica |

Conclusión: el vídeo no es claramente mejor que la imagen fija y penaliza peso y LCP. No se incluye en el repositorio. Si en el futuro se quiere usar, la opción razonable es el plano en ángulo (2,4–5 s), sin audio, a 1280 × 720, con póster, `preload="none"`, solo en escritorio y detenido con `prefers-reduced-motion`.

## 5. Recomendaciones

1. ~~Activar las imágenes generadas~~: hecho (ver §2).
2. **Abatibles**: sustituida por `ficha-abatibles.jpg` (fachada de ladrillo con ventanas abatibles de aluminio).
3. **Mosquiteras**: no hay ningún recurso adecuado (ni generado ni de stock revisado). Se mantiene temporalmente la foto actual; conviene una foto del fabricante o propia en la que se vea la mosquitera. No se ha generado otra para no gastar créditos sin aprobación.
4. A medio plazo, **fotografía propia** de trabajos reales (con permiso de los clientes): es lo único que resolverá la falta de coherencia de las fotos de producto y aportará prueba de trabajo real.
5. Confirmar los derechos de uso de las 15 fotos de producto.
6. Descargar los originales de Unsplash (ver `image-credits.md`).
