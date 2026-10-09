// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// URL pública del sitio: se usa en canonical, Open Graph, sitemap y robots.txt.
// Para una previsualización en otro dominio: SITE_URL=https://preview.example npm run build
const SITE_URL = process.env.SITE_URL || 'https://www.talleresverjano.com';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'always',
  build: { format: 'directory' },
  compressHTML: true,
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/contacto/enviado/'),
      changefreq: 'monthly',
    }),
  ],
});
