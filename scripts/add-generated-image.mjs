// Incorpora una imagen generada a src/assets/generated/ con el nombre previsto.
//
// Uso: node scripts/add-generated-image.mjs <archivo-origen> <nombre>
//   p. ej.: node scripts/add-generated-image.mjs ~/Descargas/hf_…fd76e3e1….png hero-salon-corredera
//
// - Solo admite los nombres que usa src/data/media.ts.
// - Convierte a JPEG de alta calidad, conserva el tamaño original (nunca amplía)
//   y elimina los metadatos.
// - Avisa si la imagen es más pequeña de lo recomendable para su uso.
// sharp lo instala Astro como dependencia propia para optimizar imágenes.
import sharp from 'sharp';
import { existsSync, mkdirSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

// nombre → [uso, ancho mínimo recomendado]
const TARGETS = {
  'hero-salon-corredera': ['Hero de la portada', 1600],
  'categoria-sistemas-aluminio': ['Tarjeta principal y cabecera de «Sistemas en aluminio»', 1300],
  'categoria-materiales-adicionales': ['Tarjeta y cabecera de «Materiales adicionales»', 1000],
  'categoria-otros-productos': ['Tarjeta y cabecera de «Otros productos»', 1000],
  'ficha-abatibles': ['Cabecera de la ficha de sistemas abatibles', 1120],
  'ficha-correderas': ['Cabecera de la ficha de sistemas correderos', 1120],
};

const [input, name] = process.argv.slice(2);
if (!input || !name || !(name in TARGETS)) {
  console.error('Uso: node scripts/add-generated-image.mjs <archivo-origen> <nombre>\nNombres válidos:');
  for (const [n, [use]] of Object.entries(TARGETS)) console.error(`  ${n.padEnd(34)} ${use}`);
  process.exit(1);
}
if (!existsSync(input)) {
  console.error(`No existe el archivo: ${input}`);
  process.exit(1);
}

const outDir = resolve('src/assets/generated');
mkdirSync(outDir, { recursive: true });
const out = resolve(outDir, `${name}.jpg`);

const meta = await sharp(input).metadata();
await sharp(input).rotate().jpeg({ quality: 88, mozjpeg: true, progressive: true }).toFile(out);

const [use, minWidth] = TARGETS[name];
console.log(`${name}.jpg ← ${input}`);
console.log(`  Uso: ${use}`);
console.log(`  Tamaño: ${meta.width} × ${meta.height} px (sin ampliar) · ${Math.round(statSync(out).size / 1024)} KB`);
if (meta.width < minWidth) console.warn(`  Aviso: mide menos de ${minWidth} px de ancho; puede verse blanda en pantallas de alta densidad.`);
console.log('  Siguiente paso: npm run build y revisar el recorte (ver docs/image-audit.md §3).');
