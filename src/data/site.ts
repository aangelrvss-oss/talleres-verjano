/**
 * Datos comerciales de Talleres Verjano.
 *
 * Fuente: web actual (www.talleresverjano.com), contrastada con la ficha de
 * Google embebida en la página de contacto. Ver docs/content-inventory.md §1.
 * Todo dato marcado como `pending` debe confirmarlo el propietario antes de
 * publicar la web.
 */

export const site = {
  name: 'Talleres Verjano',
  legalName: null as string | null, // Pendiente: razón social y CIF para el aviso legal
  tagline: 'Carpintería de aluminio en Madrid desde 1968',
  description:
    'Fabricación e instalación de ventanas, puertas y cerramientos de aluminio en Madrid. Sistemas abatibles, correderos y elevables, muro cortina, acristalamientos, persianas y protección solar.',
  foundingYear: 1968, // Fuente: web actual («Contigo desde 1968»). Facebook dice «más de 30 años»: pendiente de confirmación.

  address: {
    street: 'C/ Cerámica, 25',
    area: 'Polígono Industrial La Cerámica',
    district: 'Puente de Vallecas',
    postalCode: '28038',
    city: 'Madrid',
    region: 'Comunidad de Madrid',
    country: 'ES',
    label: 'Exposición y fábrica',
  },
  geo: { lat: 40.4049956, lng: -3.6569774 }, // Ficha de Google Maps embebida en /04contacto.html
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Talleres+Verjano%2C+C.+de+la+Cer%C3%A1mica+25%2C+28038+Madrid',
  mapsEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3038.1755114544503!2d-3.6569928999999988!3d40.404962499999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd4225c4c6dbffff%3A0xac7fbb7e77e90a04!2sTalleres%20Verjano!5e0!3m2!1ses!2ses!4v1771924641014!5m2!1ses!2ses',

  phones: [
    { label: 'Teléfono', display: '91 303 87 75', href: 'tel:+34913038775', primary: true },
    { label: 'Móvil', display: '635 30 40 43', href: 'tel:+34635304043', primary: false },
  ],
  emails: [
    { label: 'Información y presupuestos', address: 'info@talleresverjano.com', primary: true },
    { label: 'Atención a clientes', address: 'clientes@talleresverjano.com', primary: false },
  ],

  /**
   * Horario: la web actual y Google Maps no coinciden (ver inventario).
   * Se muestra el publicado en la web actual con aviso, y NO se incluye en
   * los datos estructurados mientras `confirmed` sea false.
   */
  hours: {
    confirmed: false,
    lines: ['Lunes a viernes', '9:00 – 14:00 y 15:30 – 19:30'],
    note: 'Horario pendiente de actualización: le recomendamos llamar antes de visitarnos.',
  },

  /** Opcionales: se activan solo cuando el propietario los confirme. */
  whatsapp: null as string | null,
  social: [] as { name: string; url: string }[],
};

export const primaryPhone = site.phones.find((p) => p.primary)!;
export const primaryEmail = site.emails.find((e) => e.primary)!;

export const fullAddress = `${site.address.street}, ${site.address.area}, ${site.address.postalCode} ${site.address.city}`;
