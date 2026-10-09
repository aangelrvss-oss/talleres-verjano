/**
 * Datos estructurados schema.org. Solo incluyen datos verificados:
 * sin valoraciones, precios ni horario (pendiente de confirmar).
 */
import { site } from './site';

const SITE_URL = (import.meta.env.SITE ?? 'https://www.talleresverjano.com').replace(/\/$/, '');

export const localBusiness: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  '@id': `${SITE_URL}/#empresa`,
  name: site.name,
  description: site.description,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/logo-talleres-verjano.png`,
  image: `${SITE_URL}/logo-talleres-verjano.png`,
  telephone: '+34913038775',
  email: site.emails[0].address,
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${site.address.street} (${site.address.area})`,
    postalCode: site.address.postalCode,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    addressCountry: site.address.country,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: site.geo.lat,
    longitude: site.geo.lng,
  },
  areaServed: { '@type': 'City', name: 'Madrid' },
  hasMap: site.mapsUrl,
};
