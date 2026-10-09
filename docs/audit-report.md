# Informe de auditoría inicial — www.talleresverjano.com

Fecha: 9 de octubre de 2026. Inventario detallado en `content-inventory.md`.

## 1. Resumen

La web actual tiene **contenido técnico valioso** (series QSystems con medidas, 17 catálogos PDF, descripciones de producto bastante completas) pero una **base técnica y de conversión débil**: el formulario de presupuesto no funciona, cuatro llamadas a la acción del slider llevan a páginas inexistentes, todas las páginas comparten título y descripción, no hay H1, sitemap ni robots.txt, y cualquier URL inventada devuelve la portada con código 200.

La prioridad del rediseño es conservar el catálogo, corregir la base técnica y facilitar el contacto, no ampliar la oferta con contenido nuevo.

## 2. Problemas detectados

### 2.1 Conversión y funcionalidad (críticos)

1. **Formulario de presupuesto inoperativo** en /04contacto.html: el botón «Enviar consulta» es `<a href="#">` y la validación nunca se ejecuta. El formulario del pie tampoco. Además, el JavaScript existente mostraría «Gracias por su solicitud» sin comprobar la respuesta del servidor (envío simulado).
2. **Teléfonos y emails no clicables** (texto plano, sin `tel:` ni `mailto:`). El email de la cabecera enlaza a `#`.
3. **Slider con 3 de 4 enlaces rotos** (reformas, automatismos Somfy, PVC) y una oferta de financiación sin condiciones ni página de detalle.
4. **Noticias enlazadas a páginas inexistentes** y botón «Más noticias» a `#`.
5. **Errata de URL** en la portada (/03_otros_productos_mamapras_de_bano.html).
6. **Página de muro cortina oculta** bajo el nombre «Sistemas libro», solo enlazada desde el menú de las fichas (no desde la portada ni el menú de escritorio de la portada).

### 2.2 SEO

- Título idéntico («Talleres Verjano») en todas las páginas; Google los está reescribiendo («sistemas abatibles - Talleres Verjano», etc.).
- Meta description idéntica en todas las páginas; meta keywords (ignoradas por Google).
- Sin H1: los títulos de página son `h3`.
- Sin canonical, Open Graph, datos estructurados, robots.txt ni sitemap.xml.
- **Soft 404**: cualquier URL `.html` inexistente devuelve la portada con 200, lo que permite indexar duplicados (Google tiene indexada /01aluminio_sistemas_libro.html con el título de la portada).
- URLs con prefijos numéricos y guiones bajos (`01aluminio_sistemas_abatibles.html`), poco descriptivas pero **indexadas**: hay que redirigirlas con 301.
- Imágenes sin texto alternativo.
- Los 17 PDF están indexados pero no tienen una página que los contextualice (salvo la columna de documentación).

### 2.3 Accesibilidad

- `user-scalable=no` en el viewport (impide ampliar en móvil).
- Imágenes con `alt=""` incluso cuando transmiten información (categorías, logos).
- Formularios sin `<label>`: usan el valor del campo como marcador y avisos con `alert()`.
- Contraste bajo en textos grises pequeños (párrafos de 13–14 px en gris claro).
- Menús desplegables solo con hover.

### 2.4 Rendimiento y técnica

- 4 hojas de estilo externas (Bootstrap desde maxcdn, w3.css desde w3schools.com, Font Awesome por JavaScript), jQuery cargado dos veces y 6 librerías JavaScript para un sitio de contenido estático.
- Iframe de Google Maps sin carga diferida ni consentimiento (envía datos a Google al abrir la página de contacto).
- Animaciones wow.js que dejan imágenes sin mostrar (en la captura de la portada faltan imágenes de categorías y logos).
- Copyright con año dinámico, pero no hay aviso legal ni política de privacidad (obligatorios con un formulario: LSSI-CE y RGPD).

### 2.5 Contenido

- Erratas: «NOTICAS», «másximo», «anueva», «nuesto», «ofrecerla», «empress», «Eerie», «Persionas», «acristalara sus ventas», «clástico», «comfort», «Magoe».
- Párrafos copiados entre fichas que no aplican (aperturas oscilobatientes en la ficha de elevables).
- Texto de plantilla sin rellenar en muro cortina («dimensiones ….m x ….m»).
- Nombres de serie inconsistentes (Q87HO+ en el texto, Q87HO en el catálogo; botón Q40 que abre el catálogo RM40).
- Superlativos no verificables («valor U más bajo del mercado», «una de las más cualificadas del mercado»).

## 3. Datos comerciales contradictorios

Ver tabla completa en `content-inventory.md` §1. Requieren decisión del propietario:

1. **Horario**: web (L-V 9:00–14:00 / 15:30–19:30) frente a Google (L-J 8:30–14:00 / 14:45–18:00, V 8:30–13:30).
2. **Antigüedad**: «desde 1968» (web) frente a «más de 30 años» (Facebook).
3. **Financiación** sin intereses hasta 20.000 € / 60 cuotas: sin condiciones publicadas.
4. **Reformas integrales**, **PVC Kömmerling** y **Somfy**: anunciados pero sin página.
5. **Dirección antigua** en QDQ (C/ Río San Pedro 10, 28018).
6. **WhatsApp**: no consta que el móvil 635 30 40 43 lo tenga.

## 4. Limitaciones de acceso

- El dominio talleresverjano.com (y .es) está **bloqueado por la política de red** del entorno de desarrollo (HTTP 403 en el proxy). No ha sido posible usar `curl` ni el navegador local contra el sitio.
- Se ha usado **Firecrawl** para obtener Markdown, HTML, enlaces y capturas. Firecrawl no descarga binarios, así que:
  - Las imágenes se recuperaron de capturas PNG sin pérdida (resolución de la imagen tal como se muestra: 765 × 374 px).
  - Los PDF se verificaron (HTTP 200 y primera página) pero **no se han copiado**: se enlazan en su ruta actual.
- No hay acceso a Google Search Console ni a analítica: no se conocen las URLs con tráfico real. Se han usado las URLs indexadas en el buscador como aproximación.
- No se ha podido medir el rendimiento de la web actual con Lighthouse (bloqueo de red).

## 5. Decisiones recomendadas (y aplicadas)

| Decisión | Motivo |
|---|---|
| Sitio estático generado con Astro | Contenido estable, sin necesidad de base de datos ni CMS; HTML rápido y fácil de alojar |
| URLs nuevas legibles por categorías + **redirecciones 301** de todas las URLs antiguas | Las URLs actuales son poco descriptivas; hay que conservar las señales con 301 directas (sin cadenas) |
| Mantener el catálogo completo: 5 sistemas de aluminio, 4 materiales y 6 otros productos (15 fichas) | No perder páginas indexadas ni contenido técnico |
| Formulario nuevo con validación accesible y envío real mediante un script PHP mínimo en el mismo alojamiento | El alojamiento actual ya ejecuta PHP (`/app/email/enviar.php`); evita servicios de pago |
| Enlazar los PDF existentes en su ruta actual | No se pueden descargar desde el entorno; conservan además su indexación |
| No publicar financiación, reformas, PVC, Somfy ni WhatsApp hasta su confirmación | No inventar ni mantener ofertas sin respaldo |
| Mapa de Google con carga bajo demanda | Privacidad y rendimiento |
| Dos guías («Consejos») a partir del contenido técnico existente | Sustituyen a las noticias rotas sin inventar datos |
| Página de privacidad básica | Requisito del formulario |

## 6. Imprescindible frente a opcional

**Imprescindible (hecho en esta entrega)**: formulario funcional, enlaces `tel:`/`mailto:`, títulos y descripciones únicos, H1 por página, canonical, sitemap, robots, 301, página 404 real, accesibilidad básica, responsive, catálogo completo, datos estructurados `LocalBusiness` y `BreadcrumbList`.

**Imprescindible (requiere al propietario)**: confirmar horario y datos de §3, aportar razón social y CIF para el aviso legal, confirmar el buzón que recibirá el formulario, conservar `/archivos/` al desplegar.

**Opcional (siguientes fases)**: fotografías reales de trabajos propios con autorización, logo en vector, página de reformas o PVC si se confirman, alta en Google Search Console y envío del sitemap, analítica respetuosa con la privacidad, ficha de Google Business actualizada con la web nueva.
