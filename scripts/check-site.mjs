/**
 * Comprobaciones estáticas del sitio compilado (dist/), sin dependencias.
 * Uso: npm run build && npm run check
 *
 *  - Un único <h1> por página, <title> y meta description únicos y de longitud razonable.
 *  - Canonical absoluto y coherente con la ruta.
 *  - Enlaces internos e imágenes que apuntan a archivos existentes.
 *  - Todas las <img> con atributo alt.
 *  - JSON-LD válido.
 *  - Ningún texto de relleno.
 *  - Destinos de redirección existentes y sin cadenas.
 */
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;
const errors = [];
const warnings = [];
const fail = (page, msg) => errors.push(`${page}: ${msg}`);

const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

const files = walk(DIST);
const htmlFiles = files.filter((f) => f.endsWith('.html'));

/** Rutas que existen en el servidor actual y se conservan al desplegar (ver README). */
const PRESERVED_PREFIXES = ['/archivos/'];

const resolvesToFile = (path) => {
  const clean = decodeURIComponent(path.split('#')[0].split('?')[0]);
  if (clean === '' || clean === '/') return existsSync(join(DIST, 'index.html'));
  const p = join(DIST, clean);
  if (existsSync(p) && statSync(p).isFile()) return true;
  return existsSync(join(p, 'index.html'));
};

const titles = new Map();
const descriptions = new Map();
const PLACEHOLDER = /[Ll]orem ipsum|\bTODO\b|\bFIXME\b|[Pp]laceholder|[Tt]exto de ejemplo|\bXXX\b|\[[Pp]endiente/;

for (const file of htmlFiles) {
  const rel = '/' + relative(DIST, file).replace(/index\.html$/, '');
  const html = readFileSync(file, 'utf8');
  const isUtility = rel === '/404.html' || rel.startsWith('/contacto/enviado');

  const h1 = html.match(/<h1[\s>]/g) ?? [];
  if (h1.length !== 1) fail(rel, `tiene ${h1.length} <h1>`);

  const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
  if (!title) fail(rel, 'sin <title>');
  else {
    if (!isUtility && (title.length < 20 || title.length > 70)) warnings.push(`${rel}: <title> de ${title.length} caracteres`);
    if (titles.has(title)) fail(rel, `<title> duplicado con ${titles.get(title)}`);
    titles.set(title, rel);
  }

  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  if (!desc) fail(rel, 'sin meta description');
  else {
    if (!isUtility && (desc.length < 70 || desc.length > 165)) warnings.push(`${rel}: description de ${desc.length} caracteres`);
    if (descriptions.has(desc)) fail(rel, `description duplicada con ${descriptions.get(desc)}`);
    descriptions.set(desc, rel);
  }

  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  if (!canonical || !/^https?:\/\//.test(canonical)) fail(rel, 'canonical ausente o relativo');
  else if (!isUtility && new URL(canonical).pathname !== rel) fail(rel, `canonical (${canonical}) no coincide con la ruta`);

  if (!/<html lang="es"/.test(html)) fail(rel, 'falta lang="es"');
  if (/user-scalable=no/.test(html)) fail(rel, 'viewport impide el zoom');

  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\salt(=|\s|>)/.test(m[0])) fail(rel, `imagen sin alt: ${m[0].slice(0, 80)}`);
  }

  for (const m of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const url = m[1].replace(/&amp;/g, '&');
    if (/^(https?:|mailto:|tel:|#|data:)/.test(url)) continue;
    if (!url.startsWith('/')) {
      fail(rel, `enlace relativo no esperado: ${url}`);
      continue;
    }
    if (PRESERVED_PREFIXES.some((p) => url.startsWith(p))) continue;
    if (url.startsWith('/api/')) {
      if (!resolvesToFile(url)) fail(rel, `endpoint inexistente: ${url}`);
      continue;
    }
    if (!resolvesToFile(url)) fail(rel, `enlace roto: ${url}`);
  }
  for (const m of html.matchAll(/srcset="([^"]+)"/g)) {
    for (const part of m[1].split(',')) {
      const url = part.trim().split(/\s+/)[0];
      if (url.startsWith('/') && !resolvesToFile(url)) fail(rel, `srcset roto: ${url}`);
    }
  }

  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const data = JSON.parse(m[1]);
      if (!data['@context'] || !data['@type']) fail(rel, 'JSON-LD sin @context/@type');
      if (/aggregateRating|review|offers|price/i.test(m[1])) fail(rel, 'JSON-LD con valoraciones o precios');
    } catch (e) {
      fail(rel, `JSON-LD inválido: ${e.message}`);
    }
  }

  const text = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, ' ');
  if (PLACEHOLDER.test(text)) fail(rel, `texto de relleno: «${text.match(PLACEHOLDER)[0]}»`);
}

// Redirecciones
const redirects = readFileSync(join(DIST, '_redirects'), 'utf8')
  .split('\n')
  .filter((l) => l && !l.startsWith('#'))
  .map((l) => l.split(/\s+/));
for (const [from, to] of redirects) {
  if (!resolvesToFile(to)) fail('_redirects', `destino inexistente: ${from} -> ${to}`);
  if (redirects.some(([f]) => f === to)) fail('_redirects', `cadena: ${from} -> ${to}`);
}
if (!existsSync(join(DIST, '.htaccess'))) fail('dist', 'falta .htaccess');
if (!existsSync(join(DIST, 'robots.txt'))) fail('dist', 'falta robots.txt');
if (!existsSync(join(DIST, 'sitemap-index.xml'))) fail('dist', 'falta sitemap-index.xml');

const sitemap = readFileSync(join(DIST, 'sitemap-0.xml'), 'utf8');
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
for (const u of sitemapUrls) if (!resolvesToFile(u)) fail('sitemap', `URL inexistente: ${u}`);
if (sitemapUrls.some((u) => u.includes('enviado') || u.includes('404'))) fail('sitemap', 'incluye páginas que no deben indexarse');

console.log(`Páginas HTML: ${htmlFiles.length} · URLs en sitemap: ${sitemapUrls.length} · Redirecciones: ${redirects.length}`);
warnings.forEach((w) => console.warn(`AVISO  ${w}`));
if (errors.length) {
  errors.forEach((e) => console.error(`ERROR  ${e}`));
  console.error(`\n${errors.length} error(es).`);
  process.exit(1);
}
console.log('Comprobaciones superadas.');
