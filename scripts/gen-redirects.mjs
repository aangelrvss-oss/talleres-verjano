/**
 * Genera las redirecciones a partir de docs/redirect-map.csv:
 *   - public/.htaccess  (Apache, alojamiento actual con PHP)
 *   - public/_redirects (Netlify / Cloudflare Pages, alternativa)
 * Se ejecuta automáticamente antes de `npm run build`.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const csv = readFileSync(new URL('../docs/redirect-map.csv', import.meta.url), 'utf8').trim().split(/\r?\n/).slice(1);

/** Parser CSV mínimo (admite comillas dobles). */
const parse = (line) => {
  const out = [];
  let cur = '';
  let quoted = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (quoted && ch === '"' && line[i + 1] === '"') {
      cur += '"';
      i++;
    } else if (ch === '"') quoted = !quoted;
    else if (ch === ',' && !quoted) {
      out.push(cur);
      cur = '';
    } else cur += ch;
  }
  out.push(cur);
  return out;
};

const rules = csv.map(parse).map(([from, to, status]) => ({ from, to, status: Number(status) || 301 }));

for (const r of rules) {
  if (!r.from.startsWith('/') || !r.to.startsWith('/')) throw new Error(`Ruta no válida en redirect-map.csv: ${r.from} -> ${r.to}`);
  if (rules.some((o) => o.from === r.to)) throw new Error(`Cadena de redirección: ${r.from} -> ${r.to}`);
}

const escape = (s) => s.replace(/[.+?^${}()|[\]\\]/g, '\\$&');

const htaccess = `# Generado por scripts/gen-redirects.mjs a partir de docs/redirect-map.csv. No editar a mano.
Options -Indexes
DirectoryIndex index.html
ErrorDocument 404 /404.html

AddDefaultCharset UTF-8
AddType image/avif .avif
AddType image/webp .webp

<IfModule mod_headers.c>
  Header always set X-Content-Type-Options "nosniff"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  Header always set X-Frame-Options "SAMEORIGIN"
  Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"
  <FilesMatch "\\.(css|js|woff2|avif|webp|jpg|jpeg|png|svg)$">
    Header set Cache-Control "public, max-age=2592000"
  </FilesMatch>
</IfModule>
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/html "access plus 0 seconds"
</IfModule>

# Los recursos con hash de Astro no cambian nunca
<IfModule mod_headers.c>
  <If "%{REQUEST_URI} =~ m#^/_astro/#">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </If>
</IfModule>

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json image/svg+xml text/plain application/xml
</IfModule>

# --- Forzar HTTPS y www (descomentar SOLO si el certificado cubre www y el
# --- alojamiento no lo hace ya; probar antes en el entorno de pruebas)
# RewriteEngine On
# RewriteCond %{HTTPS} off [OR]
# RewriteCond %{HTTP_HOST} !^www\\. [NC]
# RewriteRule ^ https://www.talleresverjano.com%{REQUEST_URI} [L,R=301]

# --- Redirecciones permanentes de la web antigua
${rules.map((r) => `RedirectMatch ${r.status} ^${escape(r.from)}$ ${r.to}`).join('\n')}
`;

const redirects = `# Generado por scripts/gen-redirects.mjs a partir de docs/redirect-map.csv. No editar a mano.
${rules.map((r) => `${r.from} ${r.to} ${r.status}`).join('\n')}
`;

writeFileSync(new URL('../public/.htaccess', import.meta.url), htaccess);
writeFileSync(new URL('../public/_redirects', import.meta.url), redirects);
console.log(`Redirecciones generadas: ${rules.length}`);
