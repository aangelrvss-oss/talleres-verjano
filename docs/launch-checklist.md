# Lanzamiento: procedimiento y checklist

Documento único para publicar la nueva web sin riesgos. Estado a 9/10/2026, rama `claude/busy-gauss-k22go8`.

**Regla**: una casilla solo se marca cuando la comprobación se ha hecho de verdad, con fecha y responsable en el registro del final. Nada de este documento se ha ejecutado aún en el alojamiento real: no hay acceso a él desde el entorno de desarrollo.

## 1. Bloqueantes confirmados

Impiden publicar hasta que se resuelvan.

| # | Bloqueante | Por qué bloquea | Cómo se resuelve |
|---|---|---|---|
| B1 | **Aviso legal inexistente** y política de privacidad sin razón social ni NIF (`site.legalName` vale `null`) | La LSSI exige identificar al titular de una web comercial (denominación social, NIF, domicilio, contacto y datos registrales). El RGPD exige identificar al responsable del tratamiento del formulario | El propietario aporta los datos del §2.1. Después se crea `/aviso-legal/`, se enlaza en el pie y se completa `/privacidad/`. Conviene la revisión de un asesor |
| B2 | **Envío real del formulario no validado** | No se sabe si las solicitudes llegan al buzón (configuración de `mail()`, SPF/DKIM, filtros de spam) | Prueba controlada del §3 en el subdominio de pruebas y, tras el lanzamiento, en producción |
| B3 | **Carpeta `archivos/` fuera del repositorio** | Los 18 PDF de las fichas viven en el servidor actual. Si no se conservan, dan 404 | Migración del §4 (conservar o copiar `archivos/`) y comprobación del §6 |
| B4 | **Sin copia de seguridad verificada** de la web actual | Sin ella no hay vuelta atrás | Paso 4.1 antes de tocar nada |

Recomendado antes de publicar, pero no bloquea: revisión manual en Safari (iPhone), Lighthouse en el alojamiento real tras el lanzamiento y confirmar los derechos de las 15 fotos de producto (§5).

## 2. Acciones que requieren datos o autorización del propietario

No se rellenan con suposiciones: mientras falten, los datos siguen ocultos o la tarea sigue pendiente.

### 2.1 Datos legales y de privacidad (mínimo imprescindible)

| Dato | Para qué |
|---|---|
| Razón social (denominación exacta) | Aviso legal y responsable del tratamiento |
| NIF / CIF | Aviso legal y privacidad |
| Domicilio social, si no es C/ Cerámica 25 | Aviso legal |
| Datos registrales (Registro Mercantil: tomo, folio, hoja, inscripción), si es sociedad | Aviso legal (LSSI art. 10) |
| Correo para ejercer los derechos de protección de datos (por defecto, info@talleresverjano.com) | Privacidad |
| Proveedor de alojamiento y correo | Privacidad («destinatarios»: encargado del tratamiento) |
| Plazo de conservación de las solicitudes que no acaban en contrato (p. ej. 12 meses) | Privacidad (ahora dice «el tiempo necesario») |
| Visto bueno de un asesor legal a ambos textos | Recomendado |

### 2.2 Datos comerciales (no bloquean; ocultos hasta su confirmación)

Horario definitivo, antigüedad («desde 1968»), garantías y condiciones (lonas, financiación), WhatsApp y redes sociales, marcas y servicios citados en la web actual. Lista completa: `README.md`, «Pendientes del propietario».

### 2.3 Autorizaciones y accesos

| Acción | Quién decide |
|---|---|
| Acceso al panel del alojamiento (o FTP/SSH) y a la configuración del dominio | Propietario |
| Buzón de prueba para el formulario y buzón definitivo (`TV_FORM_TO`), remitente del dominio (`TV_FORM_FROM`) | Propietario |
| Autorizar el envío de prueba (§3.3) y el envío final en producción (§3.5) | Propietario |
| Fecha y hora del lanzamiento (con poca actividad) y aviso a la empresa | Propietario |
| Comprobar SPF/DKIM del dominio (no se ha podido consultar el DNS desde el entorno de desarrollo) | Quien gestione el dominio |
| Derechos de uso de las 15 fotos de producto | Propietario |

## 3. Prueba del formulario

Lo verificado hasta ahora (local, Apache 2.4 + PHP 8.3 en modo de prueba, **sin enviar correo**): validación en cliente y servidor, errores por campo, antispam (campo trampa, tiempo mínimo y límite de 5 por hora), respuesta sin JavaScript, bloqueo de `/api/.htaccess` y `config.php`, y que la confirmación solo aparece con `{"ok":true}` del servidor. **El envío real no está validado.**

### 3.1 Requisitos del servidor

- PHP 7.4 o superior con **mbstring** (`php -m | grep mbstring` o la ficha de PHP del panel).
- `mail()` operativo (o el relé SMTP del proveedor) y que el proveedor acepte el parámetro `-f` con el remitente del dominio.
- Variables: `TV_FORM_TO` (buzón), `TV_FORM_FROM` (remitente del propio dominio, p. ej. `web@talleresverjano.com`; debe existir o estar permitido por SPF). `TV_FORM_DRY_RUN` **no** debe estar activo.
- Dónde configurarlas: en el panel (variables de PHP) o, si PHP es módulo de Apache, con `SetEnv` en el `.htaccess` del servidor. Con PHP-FPM, `SetEnv` no llega: cree `public_html/api/config.php` **solo en el servidor** (ya está en `.gitignore` y `/api/.htaccess` impide leerlo desde la web):
  ```php
  <?php
  return ['to' => 'BUZON_CONFIRMADO', 'from' => 'web@talleresverjano.com'];
  ```

### 3.2 Casos que no envían correo (sin autorización especial)

```bash
scripts/test-form.sh https://nueva.talleresverjano.com
```
9 casos: GET 405, POST vacío 422, correo no válido 422, sin privacidad 422, campo trampa y envío en menos de 3 s descartados (200, sin correo), respuesta HTML sin JavaScript, y `config.php` y `.htaccess` inaccesibles. Esperado: «9 correctos, 0 fallos».

### 3.3 Envío real de prueba (solo con autorización)

El script se niega a enviar si falta cualquiera de estas condiciones (comprobado: se rechaza antes de hacer ninguna petición):

1. Autorización del propietario, con nombre: `TV_TEST_AUTORIZADO_POR`.
2. Buzón de prueba confirmado y comprobado en el servidor como `TV_FORM_TO`: `TV_TEST_DESTINATARIO`.
3. Ejecución en una terminal interactiva, escribiendo `ENVIAR`.

```bash
TV_TEST_AUTORIZADO_POR="Nombre Apellido" \
TV_TEST_DESTINATARIO="buzon-de-prueba@talleresverjano.com" \
scripts/test-form.sh https://nueva.talleresverjano.com --send
```

Envía **una** solicitud marcada «PRUEBA TÉCNICA DE LA WEB (fecha), autorizada por …». Esperado: `{"ok":true}` y el mensaje en el buzón de prueba (no en spam), con todos los campos y `Reply-To: prueba@example.com`.

### 3.4 Prueba en el navegador

En `https://nueva…/contacto/?producto=abatibles#presupuesto`: el producto aparece seleccionado; con campos vacíos se ven los errores; con datos válidos, el botón muestra «Enviando» y la confirmación aparece **solo** tras la respuesta del servidor. (Es un segundo envío real: también requiere la autorización del §3.3, y cuenta para el límite de 5 por hora.)

### 3.5 Tras el lanzamiento

Con `TV_FORM_TO` ya en el buzón definitivo, un único envío final identificado como prueba y avisado a la empresa. Si `mail()` falla, la web muestra un error con el teléfono y el correo (nunca un éxito falso): revise el registro de PHP (`[tv-form] mail() devolvió false`), SPF/DKIM y el parámetro `-f`.

## 4. Migración y restauración

Sin cambios de DNS: la web nueva se publica en el mismo alojamiento. Rutas de ejemplo para un panel tipo Plesk (`httpdocs/`); en cPanel suele ser `public_html/`.

### 4.1 Copia de seguridad (antes de nada)

1. Copia completa desde el panel (archivos y, si existiera, base de datos) **o** por SSH:
   ```bash
   cd /ruta/del/dominio
   tar -czf ~/web-actual-$(date +%Y%m%d-%H%M).tar.gz httpdocs
   tar -tzf ~/web-actual-*.tar.gz | wc -l        # el archivo se lee y tiene contenido
   sha256sum ~/web-actual-*.tar.gz > ~/web-actual.sha256
   ```
2. Descargue la copia y su suma de verificación **fuera del servidor**.
3. Compruebe que incluye: `index.php` o `index.html`, los `*.html` antiguos, `archivos/` (con los 18 PDF), `app/` (incluido `app/email/enviar.php`), `css/`, `js/`, `.htaccess` y cualquier otro archivo de la raíz.
4. Anote tamaño, fecha y suma en el registro (§7).

### 4.2 Vista previa en subdominio (sin tocar la web actual)

1. Cree `nueva.talleresverjano.com` con su carpeta y certificado SSL.
2. Compile: `STAGING=1 SITE_URL=https://nueva.talleresverjano.com npm run build`.
3. Suba el **contenido** de `dist/`, incluidos los ocultos `.htaccess` y `api/.htaccess`.
4. **Copie** (no mueva) la carpeta `archivos/` de la web actual a la raíz del subdominio.
5. `scripts/verify-deploy.sh https://nueva.talleresverjano.com --staging` → «0 fallos».
6. Prueba del formulario (§3.2–3.4) con el buzón de prueba.
7. Revisión visual en móvil (incluido un iPhone) y en escritorio.

### 4.3 Lanzamiento (con autorización expresa)

Opción A, recomendada si el panel permite cambiar la carpeta raíz del dominio (cambio inmediato y reversible):
1. Compile la versión definitiva: `npm run build` (sin `STAGING`; `SITE_URL` por defecto `https://www.talleresverjano.com`).
2. Suba `dist/` a una carpeta nueva, p. ej. `httpdocs_nueva/`, y **copie** dentro `archivos/` desde `httpdocs/`.
3. Configure el formulario (§3.1) en esa carpeta.
4. En el panel, cambie la raíz del dominio de `httpdocs` a `httpdocs_nueva`. La web anterior queda intacta en `httpdocs/`.

Opción B, si no se puede cambiar la raíz:
1. Con la copia del §4.1 verificada, suba el contenido de `dist/` a `httpdocs/` sobrescribiendo `.htaccess` e `index`, **sin borrar `archivos/`**.
2. No borre aún los archivos antiguos (`*.html`, `index.php`, `css/`, `js/`, `app/`): el `.htaccess` nuevo fija `DirectoryIndex index.html` y las redirecciones 301 funcionan aunque los archivos antiguos existan (comprobado en Apache local con un `index.php` y un `.html` antiguos presentes: se sirvió la portada nueva y la URL antigua respondió 301). Retírelos cuando el §6 esté completo y haya pasado una semana sin incidencias.

Después, en ambos casos: §6 completo; activar el bloque «Forzar HTTPS y www» del `.htaccess` solo si el certificado cubre `www` y el alojamiento no lo fuerza ya (se edita en `scripts/gen-redirects.mjs`); enviar `https://www.talleresverjano.com/sitemap-index.xml` en Search Console; actualizar la web en la ficha de Google Business Profile.

### 4.4 Restauración (vuelta atrás)

- **Opción A**: vuelva a poner `httpdocs` como raíz del dominio en el panel. Efecto inmediato; no hay que restaurar archivos.
- **Opción B**: 
  ```bash
  cd /ruta/del/dominio
  mv httpdocs httpdocs_fallida_$(date +%Y%m%d-%H%M)
  sha256sum -c ~/web-actual.sha256
  tar -xzf ~/web-actual-AAAAMMDD-HHMM.tar.gz
  ```
  o restaure la copia desde el panel.
- Compruebe: la portada antigua carga, `/01aluminio_sistemas_abatibles.html` responde 200 (sin redirección) y un PDF de `/archivos/` se abre.
- Ensaye la restauración en el subdominio de pruebas antes del lanzamiento, si es posible.

## 5. Estado de las imágenes

| Imagen | Estado |
|---|---|
| 6 imágenes generadas con Higgsfield (hero, 3 categorías, cabeceras de abatibles y correderas) | **Incorporadas** (commit `054dc0f`) desde los originales que aportó el propietario. Convertidas sin ampliar; rotuladas «Imagen ilustrativa generada con IA». No se ha regenerado ninguna ni se han gastado créditos en esta fase |
| `ficha-correderas` | Original de 1168 × 880 y calidad baja de origen; revisada al 100 %: correcta al tamaño en que se muestra |
| 15 fotos de producto de la web actual | En uso. **Derechos pendientes de confirmar** (2 llevan marca de fabricante) |
| Foto de mosquiteras | Correcta (mosquiteras plisadas, revisada al 100 %) pero poco legible a tamaño de tarjeta. Se mantiene; sustitución recomendada, no bloquea (`image-audit.md` §5). Texto alternativo corregido |
| 2 fotos de Unsplash | Licencia verificada; conviene descargar los originales |
| Vídeo de ambiente | Descartado para el hero (corte brusco, peso). No se incluye |

Detalle: `docs/image-audit.md` e `docs/image-credits.md`.

## 6. Checklist posterior al despliegue

Automático (solo lectura; requiere `npm run build` con el mismo `SITE_URL` que se ha desplegado):

```bash
scripts/verify-deploy.sh https://www.talleresverjano.com
```

Comprueba las 27 páginas (25 del sitemap, `/contacto/enviado/` y un 404 real), las **24 redirecciones** (301, destino exacto y un salto), los **18 PDF** (200 y `application/pdf`), `/api/` protegido y la indexación (sin `noindex`, `robots.txt` con sitemap, canonical correcto). Probado contra Apache local: sin la carpeta `archivos/` marca exactamente los 18 PDF; con marcadores en esas rutas da 75/75; en un build de staging detecta el `noindex`.

Manual:

- [ ] `scripts/verify-deploy.sh` → «0 fallos» (anotar resultado)
- [ ] Formulario: envío final en producción recibido en el buzón definitivo (§3.5)
- [ ] La web anterior queda en la copia del §4.1 (y en `httpdocs/` si se usó la opción A)
- [ ] HTTPS sin avisos en `www` y sin `www`; una sola versión canónica
- [ ] Portada, una categoría, una ficha y contacto revisados en un iPhone y en un Android
- [ ] Un PDF de cada ficha con documentación se abre (abatibles, correderas, elevables, mallorquinas, muro cortina)
- [ ] Mapa: «Mostrar mapa» carga Google Maps
- [ ] Search Console: sitemap enviado; revisar errores de cobertura a los 7 días
- [ ] Google Business Profile: web y horario (cuando se confirme)
- [ ] PageSpeed Insights en la portada y una ficha (móvil)
- [ ] Una semana sin incidencias → retirar archivos antiguos (opción B) o la carpeta anterior (opción A), conservando la copia

## 7. Registro

| Fecha | Paso | Responsable | Resultado |
|---|---|---|---|
| | 4.1 Copia de seguridad (tamaño, suma) | | |
| | 4.2 Staging + `verify-deploy.sh --staging` | | |
| | 3.2 Casos sin envío | | |
| | 3.3 Envío de prueba autorizado | | |
| | 4.3 Lanzamiento (opción A/B) | | |
| | 6 `verify-deploy.sh` en producción | | |
| | 3.5 Envío final | | |
