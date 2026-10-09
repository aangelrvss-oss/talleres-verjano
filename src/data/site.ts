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
  tagline: 'Carpintería de aluminio en Madrid',
  description:
    'Fabricación e instalación de ventanas, puertas y cerramientos de aluminio en Madrid. Sistemas abatibles, correderos y elevables, muro cortina, acristalamientos, persianas y protección solar.',
  /**
   * Fuente: web actual («Contigo desde 1968», «más de 50 años»). Facebook dice
   * «más de 30 años»: PENDIENTE de confirmar. Mientras `foundingYearConfirmed`
   * sea false, la web no muestra el año ni la antigüedad.
   */
  foundingYear: 1968,
  foundingYearConfirmed: false,

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
   * Horario: la web actual (L-V 9:00–14:00 y 15:30–19:30) y Google Maps no
   * coinciden (ver inventario). Mientras `confirmed` sea false NO se muestra:
   * la web invita a llamar antes de la visita. Al confirmarlo, rellenar
   * `lines` y poner `confirmed: true`.
   */
  hours: {
    confirmed: false,
    lines: ['Lunes a viernes', '9:00 – 14:00 y 15:30 – 19:30'],
    note: 'Llámenos antes de su visita y le atenderemos personalmente.',
  },

  /** Opcionales: se activan solo cuando el propietario los confirme. */
  whatsapp: null as string | null,
  social: [] as { name: string; url: string }[],
};

export const primaryPhone = site.phones.find((p) => p.primary)!;
export const primaryEmail = site.emails.find((e) => e.primary)!;

export const fullAddress = `${site.address.street}, ${site.address.area}, ${site.address.postalCode} ${site.address.city}`;

/** Texto sobre la trayectoria que respeta el estado de confirmación. */
export const experience = site.foundingYearConfirmed
  ? {
      short: `Desde ${site.foundingYear}`,
      text: `Más de 50 años en el sector y dos generaciones de profesionales para ofrecerle la mejor solución en calidad, aislamiento térmico y precio.`,
    }
  : {
      short: 'Dos generaciones',
      text: 'Dos generaciones de profesionales para ofrecerle la mejor solución en calidad, aislamiento térmico y precio.',
    };
