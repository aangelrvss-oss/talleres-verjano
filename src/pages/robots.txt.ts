import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('sitemap-index.xml', site).href;
  // STAGING=1: vista previa que no debe indexarse
  const body =
    process.env.STAGING === '1'
      ? 'User-agent: *\nDisallow: /\n'
      : `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${sitemap}\n`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
