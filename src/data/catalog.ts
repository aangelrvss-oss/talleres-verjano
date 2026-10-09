/**
 * Catálogo de Talleres Verjano.
 *
 * Todo el contenido procede de la web actual (www.talleresverjano.com),
 * con correcciones ortográficas y de estilo que no alteran datos técnicos.
 * Las diferencias respecto al original están documentadas en
 * docs/content-inventory.md. No añadir especificaciones que no estén
 * respaldadas por el fabricante o por Talleres Verjano.
 */
import type { ImageMetadata } from 'astro';

import imgAbatibles from '../assets/products/sistemas-abatibles.png';
import imgCorrederas from '../assets/products/sistemas-correderas.png';
import imgElevables from '../assets/products/sistemas-elevables.png';
import imgMallorquinas from '../assets/products/mallorquinas.png';
import imgMuroCortina from '../assets/products/muro-cortina.png';
import imgVidrios from '../assets/products/vidrios-acristalamientos.png';
import imgPersianas from '../assets/products/persianas-compactos.png';
import imgDomotica from '../assets/products/domotica-automatismos.png';
import imgMosquiteras from '../assets/products/mosquiteras.png';
import imgForja from '../assets/products/hierro-forja.png';
import imgToldos from '../assets/products/toldos-pergolas.png';
import imgArmarios from '../assets/products/frentes-armario.png';
import imgMamparas from '../assets/products/mamparas-bano.png';
import imgCerrajeria from '../assets/products/cerrajeria.png';
import imgEstores from '../assets/products/estores.png';
import imgPatio from '../assets/stock/patio-corredera-moderna.jpg';

export type Block =
  | { type: 'p'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'specs'; items: [string, string][] };

export interface Section {
  heading: string;
  blocks: Block[];
}

export interface SeriesTable {
  caption: string;
  columns: string[];
  rows: string[][];
  note?: string;
}

export interface TechDocument {
  label: string;
  /** Ruta en el servidor actual. Ver README: la carpeta /archivos/ debe conservarse. */
  href: string;
}

export interface Product {
  slug: string;
  category: CategorySlug;
  name: string;
  /** Subtítulo original de la ficha. */
  tagline: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  image: ImageMetadata;
  imageAlt: string;
  highlights: string[];
  sections: Section[];
  series?: SeriesTable;
  documents?: TechDocument[];
  brands?: string[];
  related: string[];
  legacyUrl: string;
}

export type CategorySlug = 'sistemas-aluminio' | 'materiales-adicionales' | 'otros-productos';

export interface Category {
  slug: CategorySlug;
  name: string;
  shortName: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
}

export const categories: Category[] = [
  {
    slug: 'sistemas-aluminio',
    name: 'Sistemas en aluminio',
    shortName: 'Aluminio',
    intro:
      'Ventanas, puertas y fachadas de aluminio fabricadas a medida. Trabajamos con perfiles con rotura de puente térmico de QSystems para conseguir un buen aislamiento térmico y acústico.',
    metaTitle: 'Ventanas y puertas de aluminio a medida en Madrid',
    metaDescription:
      'Sistemas de aluminio abatibles, correderos, elevables, mallorquinas y muro cortina con rotura de puente térmico. Fabricación e instalación en Madrid.',
  },
  {
    slug: 'materiales-adicionales',
    name: 'Materiales adicionales',
    shortName: 'Complementos',
    intro:
      'Los complementos que completan una buena ventana: vidrios de altas prestaciones, persianas y compactos, motorización y mosquiteras de aluminio.',
    metaTitle: 'Vidrios, persianas, automatismos y mosquiteras',
    metaDescription:
      'Doble acristalamiento Climalit, persianas de aluminio y de seguridad, motores y domótica, y mosquiteras a medida para sus ventanas en Madrid.',
  },
  {
    slug: 'otros-productos',
    name: 'Otros productos',
    shortName: 'Otros',
    intro:
      'Además de la carpintería de aluminio, realizamos trabajos de forja, protección solar, armarios, mamparas y cerrajería de seguridad.',
    metaTitle: 'Forja, toldos, armarios, mamparas y estores',
    metaDescription:
      'Hierro y forja, toldos y pérgolas, frentes de armario, mamparas de baño, cerrajería de seguridad y estores enrollables en Madrid.',
  },
];

const rptParagraph =
  'Para conseguir mejores resultados de aislamiento térmico utilizamos perfiles de aluminio con rotura de puente térmico (RPT): unas pletinas de poliamida o relleno de resina separan el perfil exterior del interior y actúan como barrera. Así se evita la transmisión de frío o calor al interior de la vivienda o local, se contribuye de forma eficiente al ahorro energético (hasta un 60 %) y se limita la condensación.';

const docBase = '/archivos/01sistemas_de_aluminio';

export const products: Product[] = [
  // ───────────────────────────── Sistemas en aluminio
  {
    slug: 'abatibles',
    category: 'sistemas-aluminio',
    name: 'Sistemas abatibles',
    tagline: 'Apertura del 100 % del espacio que ocupa',
    intro:
      'Ventanas y balconeras practicables de aluminio: las más indicadas para aislar del frío, el calor y el ruido, y las más cómodas de ventilar y limpiar.',
    metaTitle: 'Ventanas abatibles de aluminio con RPT',
    metaDescription:
      'Ventanas abatibles y oscilobatientes de aluminio QSystems con rotura de puente térmico: series Q57 a Q87, vidrio de hasta 62 mm. Presupuesto en Madrid.',
    image: imgAbatibles,
    imageAlt: 'Salón luminoso con balconera abatible de dos hojas abierta al jardín',
    highlights: ['Apertura del 100 % del hueco', 'Rotura de puente térmico', 'Triple junta de estanqueidad', 'Opción oscilobatiente'],
    sections: [
      {
        heading: 'Descripción del sistema abatible (practicable)',
        blocks: [
          {
            type: 'p',
            text: 'Estos sistemas son los ideales para proporcionar aislamiento térmico y acústico, al tiempo que facilitan tareas como la ventilación y la limpieza de las hojas acristaladas. El único inconveniente es el espacio que barre la hoja en su trayectoria de apertura, que debe tenerse en cuenta al diseñar el hueco.',
          },
          {
            type: 'p',
            text: 'Son sistemas de fácil manejo que permiten abrir el 100 % del hueco de la fachada, de modo que la limpieza se hace con total comodidad y seguridad.',
          },
        ],
      },
      {
        heading: 'Energía',
        blocks: [
          { type: 'p', text: rptParagraph },
          { type: 'p', text: 'Además, este sistema dispone de una triple junta de ajuste que proporciona hermeticidad en el cierre.' },
        ],
      },
      {
        heading: 'Aperturas',
        blocks: [
          {
            type: 'p',
            text: 'El sistema abatible permite mover las hojas tanto hacia dentro (apertura interior) como hacia fuera (apertura exterior).',
          },
          {
            type: 'p',
            text: 'También ofrece la posibilidad del movimiento basculante hacia el interior mediante la colocación de herraje oscilobatiente.',
          },
        ],
      },
    ],
    series: {
      caption: 'Series abatibles de QSystems con las que trabajamos',
      columns: ['Serie', 'Tipo', 'Marco', 'Hoja', 'Vidrio máx.'],
      rows: [
        ['Q40', 'Serie clásica', '40 mm', '47 mm', '30 mm'],
        ['Q57', 'Rotura de puente térmico', '50 mm', '67 mm', '36 mm'],
        ['Q67', 'Rotura de puente térmico', '60 mm', '67 mm', '46 mm'],
        ['Q67+', 'Rotura de puente térmico', '60 mm', '67 mm', '46 mm'],
        ['Q75', 'Rotura de puente térmico', '75 mm', '85 mm', '56 mm'],
        ['Q75+', 'Rotura de puente térmico', '75 mm', '85 mm', '56 mm'],
        ['Q77C16', 'RPT, canal 16', '70 mm', '77 mm', '56 mm'],
        ['Q77+', 'Rotura de puente térmico', '70 mm', '77 mm', '56 mm'],
        ['Q87C16', 'RPT, canal 16', '80 mm', '87 mm', '62 mm'],
        ['Q87HO', 'Rotura de puente térmico', '80 mm', '87 mm', '62 mm'],
      ],
      note: 'Medidas según la información publicada por Talleres Verjano. Consulte el catálogo del fabricante para valores de transmitancia y ensayos.',
    },
    documents: [
      { label: 'Serie 40 · catálogo RM40', href: `${docBase}/01abatible/catalogos/Catalogo_RM40.pdf` },
      { label: 'Q57', href: `${docBase}/01abatible/catalogos/Q57.pdf` },
      { label: 'Q67', href: `${docBase}/01abatible/catalogos/Q67.pdf` },
      { label: 'Q67+', href: `${docBase}/01abatible/catalogos/Q67+.pdf` },
      { label: 'Q75', href: `${docBase}/01abatible/catalogos/Q75.pdf` },
      { label: 'Q75+', href: `${docBase}/01abatible/catalogos/Q75+.pdf` },
      { label: 'Q77+', href: `${docBase}/01abatible/catalogos/Q77+.pdf` },
      { label: 'Q77C16', href: `${docBase}/01abatible/catalogos/Q77%20C16.pdf` },
      { label: 'Q87C16', href: `${docBase}/01abatible/catalogos/Q87%20C16.pdf` },
      { label: 'Q87HO', href: `${docBase}/01abatible/catalogos/Q87%20HO.pdf` },
    ],
    brands: ['QSystems'],
    related: ['vidrios-acristalamientos', 'persianas-compactos', 'mosquiteras', 'correderas'],
    legacyUrl: '/01aluminio_sistemas_abatibles.html',
  },
  {
    slug: 'correderas',
    category: 'sistemas-aluminio',
    name: 'Sistemas correderos',
    tagline: 'No ocupan espacio, crean espacio',
    intro:
      'Ventanas y puertas correderas de aluminio que solo ocupan el plano en el que se mueven y aportan mucha luz gracias a su gran superficie acristalada.',
    metaTitle: 'Ventanas y puertas correderas de aluminio',
    metaDescription:
      'Correderas de aluminio con rotura de puente térmico, rodamientos de bola o aguja y vidrios de hasta 30 mm. De 2 a 4 hojas y cerco de tres carriles. Madrid.',
    image: imgCorrederas,
    imageAlt: 'Puerta corredera de aluminio de gran tamaño que da a un jardín',
    highlights: ['Ahorro de espacio', 'Deslizamiento suave y silencioso', 'De 2 a 4 hojas', 'Vidrios de hasta 30 mm'],
    sections: [
      {
        heading: 'Descripción del sistema corredero',
        blocks: [
          {
            type: 'p',
            text: 'Sol, aire fresco… con este tiempo, ¿no le apetecería hacer desaparecer las paredes de su casa? Estos sistemas se distinguen por su capacidad de economizar espacio, ya que solo ocupan el plano en el que se mueven, y por proporcionar gran luminosidad gracias a una mayor superficie acristalada.',
          },
          {
            type: 'p',
            text: 'Se abren indistintamente por el extremo derecho o el izquierdo, lo que permite colocar cortinas y mobiliario sin condicionar el diseño. Gracias a sus rodamientos, pueden mantenerse abiertas en diversas posiciones.',
          },
        ],
      },
      {
        heading: 'Deslizamiento suave y silencioso',
        blocks: [
          {
            type: 'p',
            text: 'Las puertas correderas abren el paso al exterior de manera casi silenciosa gracias a una estructura sólida, duradera y muy fácil de manejar.',
          },
          {
            type: 'p',
            text: 'El sistema incorpora rodamientos de bola o de aguja, que permiten un deslizamiento muy suave y admiten grandes dimensiones sin perder funcionalidad.',
          },
        ],
      },
      {
        heading: 'Ahorrar energía con puertas correderas',
        blocks: [
          { type: 'p', text: rptParagraph },
          {
            type: 'p',
            text: 'Esta carpintería admite vidrios de hasta 30 mm de espesor. Dado el importante papel que juega el cristal por su gran superficie, esto permite aumentar el aislamiento tanto térmico como acústico.',
          },
          {
            type: 'p',
            text: 'Si se necesita, disponemos también de series europeas sin rotura de puente térmico para zonas interiores, por ejemplo el paso entre una habitación y una veranda.',
          },
        ],
      },
      {
        heading: 'Aperturas',
        blocks: [
          { type: 'p', text: 'Los sistemas correderos permiten aperturas horizontales de 2 a 4 hojas.' },
          {
            type: 'p',
            text: 'Dentro de los sistemas tradicionales disponemos del cerco de tres carriles, que permite el deslizamiento de tres hojas por carriles independientes (con un 66 % de hueco de apertura): ideal para grandes dimensiones.',
          },
        ],
      },
    ],
    series: {
      caption: 'Serie corredera de QSystems',
      columns: ['Serie', 'Tipo', 'Marco', 'Hoja', 'Vidrio máx.'],
      rows: [['Q95', 'Serie europea', 'De 70 a 95 mm', '35 mm', '30 mm']],
    },
    documents: [{ label: 'Q95 · informe de producto', href: `${docBase}/02corredera/catalogos/Q95.pdf` }],
    brands: ['QSystems'],
    related: ['elevables', 'vidrios-acristalamientos', 'mosquiteras', 'abatibles'],
    legacyUrl: '/01aluminio_sistemas_corredera.html',
  },
  {
    slug: 'elevables',
    category: 'sistemas-aluminio',
    name: 'Sistemas elevables',
    tagline: 'La mejor solución para los grandes espacios',
    intro:
      'Correderas elevables para cerrar huecos de gran tamaño: las hojas se elevan, se deslizan y vuelven a bajar para cerrar con gran estanqueidad.',
    metaTitle: 'Correderas elevables para grandes huecos',
    metaDescription:
      'Sistema elevable QSystems Q120 RPT: hojas de hasta 3300 × 2800 mm y herraje para hasta 400 kg por hoja. Grandes ventanales en Madrid.',
    image: imgElevables,
    imageAlt: 'Gran ventanal corredero elevable con vistas al mar desde un salón',
    highlights: ['Hasta 400 kg por hoja', 'Maniobra con una sola mano', 'Hojas de hasta 3300 × 2800 mm', 'Cierre de alta estanqueidad'],
    sections: [
      {
        heading: 'Descripción del sistema elevable',
        blocks: [
          {
            type: 'p',
            text: 'Cuando se necesita una corredera para un hueco de grandes dimensiones aparece el problema del peso y la dificultad de mover las hojas. Para eso existe el sistema elevable.',
          },
          {
            type: 'p',
            text: 'Las hojas se deslizan sobre un mismo plano con la secuencia elevar-deslizar-bajar. Incorpora un herraje especial preparado para grandes dimensiones y pesos (hasta 400 kg por hoja), diseñado para un deslizamiento muy suave y una maniobra de apertura con una sola mano.',
          },
        ],
      },
      {
        heading: 'Energía',
        blocks: [
          { type: 'p', text: rptParagraph },
          {
            type: 'p',
            text: 'En posición cerrada proporciona un nivel de aislamiento térmico y acústico muy superior al de la corredera tradicional. Además, tiene una gran estabilidad y resistencia, con un cierre hermético que protege frente al viento, la lluvia y otras condiciones climáticas.',
          },
        ],
      },
      {
        heading: 'Q120 RPT de QSystems',
        blocks: [
          {
            type: 'p',
            text: 'Ante la creciente demanda de seguridad, aislamiento térmico, estanqueidad y durabilidad, QSystems presenta la Q120 RPT: un sistema de corredera elevable de 122 mm de marco con perfilería de aluminio de gran aislamiento térmico y elevada estabilidad.',
          },
          {
            type: 'p',
            text: 'Es ideal para grandes ventanales en restaurantes, hoteles, edificios de oficinas y viviendas. Su cierre elevable consigue un alto nivel de estanqueidad y permite fabricar hojas de hasta 3300 mm de ancho por 2800 mm de alto. También puede montarse con herraje tradicional de corredera, lo que abarata el sistema.',
          },
          {
            type: 'p',
            text: 'Con este sistema, el acceso al balcón, la terraza, el jardín o el invernadero resulta mucho más sencillo y silencioso.',
          },
          {
            type: 'specs',
            items: [
              ['Marco', '122 mm'],
              ['Hoja máxima', '3300 × 2800 mm (ancho × alto)'],
              ['Peso por hoja', 'Hasta 400 kg (herraje elevable)'],
            ],
          },
        ],
      },
    ],
    documents: [{ label: 'Q120 · informe de ensayo', href: `${docBase}/03elevables/catalogos/Q120.pdf` }],
    brands: ['QSystems'],
    related: ['correderas', 'vidrios-acristalamientos', 'domotica-automatismos', 'muro-cortina'],
    legacyUrl: '/01aluminio_sistemas_elevables.html',
  },
  {
    slug: 'mallorquinas',
    category: 'sistemas-aluminio',
    name: 'Mallorquinas',
    tagline: 'La mejor solución en cuanto a protección solar',
    intro:
      'Contraventanas de aluminio exteriores e interiores (fraileros) con lamas fijas o móviles para regular la luz que entra en la vivienda.',
    metaTitle: 'Mallorquinas y contraventanas de aluminio',
    metaDescription:
      'Mallorquinas de aluminio Q40RM con lamas fijas, móviles o panel ciego. Practicables de 1 a 4 hojas y plegables de hasta 7 hojas. Fabricación en Madrid.',
    image: imgMallorquinas,
    imageAlt: 'Contraventanas mallorquinas blancas de lamas en una terraza',
    highlights: ['Lamas fijas o móviles', 'Exteriores o interiores', 'Hasta 7 hojas plegables', 'Mínimo mantenimiento'],
    sections: [
      {
        heading: 'Descripción del sistema mallorquina',
        blocks: [
          {
            type: 'p',
            text: 'Permite realizar tanto contraventanas exteriores que protegen las ventanas como interiores (fraileros), con la posibilidad de combinar lamas fijas o móviles para regular el paso de la luz hacia el interior de la vivienda.',
          },
          {
            type: 'p',
            text: 'La apertura es igual que en los sistemas abatibles (practicables): la hoja barre un espacio en su trayectoria. Se caracterizan por su gran resistencia y duración, incluso en condiciones climáticas adversas, con un mínimo mantenimiento.',
          },
        ],
      },
      {
        heading: 'Q40RM de QSystems',
        blocks: [
          {
            type: 'p',
            text: 'El sistema de mallorquina Q40RM es una buena opción cuando se necesita una solución de protección solar. Se complementa con la serie Q40, con la que comparte todos los perfiles complementarios.',
          },
          {
            type: 'list',
            items: [
              'Lamas móviles, fijas o panel ciego.',
              'Aperturas practicables interiores o exteriores de 1, 2, 3 o 4 hojas.',
              'Aperturas plegables o de libro de hasta 7 hojas.',
              'La apertura plegable cuenta con hoja ajunquillada, que admite acristalamiento de hasta 28 mm y hojas de hasta 60 kg.',
            ],
          },
        ],
      },
    ],
    documents: [{ label: 'Mallorquina · catálogo RM40MN', href: `${docBase}/04mallorquina/catalogos/Catalogo_RM40MN.pdf` }],
    brands: ['QSystems'],
    related: ['abatibles', 'persianas-compactos', 'estores', 'toldos-pergolas'],
    legacyUrl: '/01aluminio_sistemas_mallorquina.html',
  },
  {
    slug: 'muro-cortina',
    category: 'sistemas-aluminio',
    name: 'Muro cortina',
    tagline: 'La última tecnología en aislamiento para fachadas',
    intro:
      'Fachadas ligeras de aluminio y vidrio para edificios de oficinas, hoteles y obra nueva, con sistemas estructurales, semiestructurales, de tapeta e intercalario.',
    metaTitle: 'Muro cortina de aluminio: sistemas E100 y AL50',
    metaDescription:
      'Fachadas de muro cortina de aluminio: sistema E100 (estructural, semiestructural y tapeta) y AL50 (intercalario y tapeta). Fichas técnicas descargables.',
    image: imgMuroCortina,
    imageAlt: 'Fachada de muro cortina de vidrio con una ventana proyectante abierta',
    highlights: ['Sistemas E100 y AL50', 'Estructural, semiestructural y tapeta', 'Aperturas proyectantes ocultas', 'Lacados RAL y especiales'],
    sections: [
      {
        heading: 'Descripción del sistema',
        blocks: [
          {
            type: 'p',
            text: 'El muro cortina sustituye la fachada tradicional por una retícula de montantes y travesaños de aluminio con vidrios de alta resistencia y alto rendimiento energético. Es una de las tendencias del diseño y la arquitectura actuales, muy utilizada en edificios de oficinas, hoteles y edificios en altura.',
          },
        ],
      },
      {
        heading: 'Energía',
        blocks: [
          {
            type: 'p',
            text: 'La combinación de un sistema de muro cortina con un vidrio de alto rendimiento de nueva generación permite alcanzar niveles de ahorro energético muy por encima de una fachada convencional o ventilada, además de aportar seguridad arquitectónica y un diseño actual.',
          },
        ],
      },
      {
        heading: 'Sistema E100 (estructural, semiestructural y tapeta)',
        blocks: [
          {
            type: 'p',
            text: 'Perfiles para fachada ligera compuesta por módulos planos, poligonales o curvos, realizados con perfilería de aleación de aluminio 6063 y tratamiento térmico T-5.',
          },
          {
            type: 'list',
            items: [
              'Estructura autoportante de montantes y travesaños con frente visto de 54 mm, que equilibra resistencia y esbeltez con la máxima entrada de luz.',
              'Fabricación e instalación en obra sin mecanizado de perfiles, con multitud de perfiles complementarios.',
              'Acristalamiento mediante fijación mecánica en el intercalario del vidrio, de 30 a 32 mm de espesor.',
              'Juntas de EPDM resistentes a la intemperie y al envejecimiento; perfiles de EPDM para rotura de puente térmico de 6 y 11 mm.',
              'Apertura proyectante oculta, acristalada mediante pegado estructural y cristal decalado.',
              'Compás de acero inoxidable para hojas de hasta 150 kg.',
              'Anclajes de aluminio extruido a frente de forjado, arranque o coronación, con regulación tridimensional para corregir desplomes y dejar la fachada nivelada y aplomada.',
            ],
          },
        ],
      },
      {
        heading: 'Sistema AL50 (intercalario y tapeta)',
        blocks: [
          {
            type: 'p',
            text: 'Las envolventes acristaladas son una solución estética y aislante que asegura buenos valores energéticos e iluminación natural. En el muro cortina con tapetas, estas forman una retícula en la unión de los vidrios: fachada vertical con sistema de presores y tapetas y aperturas proyectantes de hoja oculta, montada con anclajes y accesorios propios del sistema que garantizan su estanqueidad.',
          },
          {
            type: 'p',
            text: 'Admite una versión mixta con embellecedores en horizontal o en vertical por motivos estéticos (el lado sin tapeta condiciona las dimensiones del vidrio) y una amplia gama de perfiles para cubrir las inercias entre forjados, hacer coplanarios montantes y travesaños, calzos de refuerzo y tapetas rectas, inclinadas o de ala de avión. Acabados en lacado RAL y especiales bajo consulta.',
          },
          {
            type: 'specs',
            items: [
              ['Sección vista de montantes y travesaños', '50 mm'],
              ['Profundidad de montantes', 'De 50 a 225 mm'],
              ['Profundidad de travesaños', 'De 53,5 a 228,5 mm'],
              ['Vidrio', 'De 8 a 43 mm (monolíticos y paneles ciegos)'],
              ['Peso máximo de bastidor fijo', '400 kg'],
              ['Peso máximo de bastidor proyectante', '155 kg'],
            ],
          },
        ],
      },
    ],
    documents: [
      { label: 'E-100 de tapetas · ficha técnica', href: `${docBase}/05muro_cortina/catalogos/Ficha%20Tecnica%20E-100%20de%20tapetas.pdf` },
      { label: 'E-100 estructural · ficha técnica', href: `${docBase}/05muro_cortina/catalogos/Ficha%20Tecnica%20E-100%20Estructural.pdf` },
      { label: 'E-100 semiestructural · ficha técnica', href: `${docBase}/05muro_cortina/catalogos/Ficha%20Tecnica%20E-100%20Semiestructural.pdf` },
      { label: 'AL-50 intercalario · ficha técnica', href: `${docBase}/05muro_cortina/catalogos/Ficha-Tecnica-AL-50-Intercalario-2017-v.3-17.pdf` },
      { label: 'AL-50 tapeta · ficha técnica', href: `${docBase}/05muro_cortina/catalogos/Ficha-Tecnica-Al-50-Tapeta-2017-v.3-17.pdf` },
    ],
    related: ['vidrios-acristalamientos', 'elevables', 'correderas', 'abatibles'],
    legacyUrl: '/01aluminio_sistemas_libro.html',
  },

  // ───────────────────────────── Materiales adicionales
  {
    slug: 'vidrios-acristalamientos',
    category: 'materiales-adicionales',
    name: 'Vidrios y acristalamientos',
    tagline: 'Tecnología e innovación aplicada al cristal',
    intro:
      'El vidrio ocupa la mayor parte de la ventana. Elegir bien la composición del doble acristalamiento es clave para ahorrar en calefacción y aire acondicionado.',
    metaTitle: 'Doble acristalamiento y vidrios Climalit Planitherm',
    metaDescription:
      'Doble acristalamiento SGG Climalit y Climalit Planitherm: control solar, aislamiento térmico reforzado con argón, vidrio acústico y de seguridad. Madrid.',
    image: imgVidrios,
    imageAlt: 'Fachada acristalada de un edificio reflejando un cielo con nubes',
    highlights: ['Doble acristalamiento', 'Control solar y baja emisividad', 'Opción acústica y de seguridad', 'Cámara con gas argón'],
    sections: [
      {
        heading: 'Un buen vidrio se nota en la factura',
        blocks: [
          {
            type: 'p',
            text: 'No escatime al acristalar sus ventanas: el doble acristalamiento ofrece un ahorro energético de hasta el 50 %, ya que minimiza las pérdidas de frío y calor entre el interior y el exterior. Un buen vidrio le aportará un gran ahorro en la factura de la luz y el gas.',
          },
        ],
      },
      {
        heading: 'Acristalamientos para ventanas',
        blocks: [
          {
            type: 'p',
            text: 'Casi todas las ventanas actuales llevan doble acristalamiento, y a veces incluso triple: un vidrio en el exterior de la hoja y otro en el interior, separados por una cámara de aire deshidratado.',
          },
          {
            type: 'p',
            text: 'Trabajamos con uno de los principales fabricantes de vidrio en España, SGG Climalit. Nuestros técnicos le asesorarán sobre la composición más adecuada teniendo en cuenta los distintos factores de influencia (orientación, viento, ruido…).',
          },
          {
            type: 'list',
            items: [
              'Los cristales deben tener un grosor mínimo de 4 mm; cuanto más gruesos, mejor.',
              'Es recomendable que el vidrio exterior sea más grueso que el interior (6 mm recomendado).',
              'Recomendamos una cámara de aire de al menos 12 mm; para una mejor calidad, mayor debe ser la cámara.',
            ],
          },
        ],
      },
      {
        heading: 'Climalit Planitherm, el cristal inteligente',
        blocks: [
          {
            type: 'p',
            text: 'Ahorra energía en invierno y en verano. Filtra la radiación solar, mejora el confort y reduce el uso del aire acondicionado en verano; gracias a su bajo valor U, también ahorrará en calefacción en invierno.',
          },
        ],
      },
      {
        heading: 'Aislamiento acústico',
        blocks: [
          {
            type: 'p',
            text: 'Climalit Planitherm en su versión acústica combina el aislamiento acústico y el térmico para aumentar el confort del hogar y ahorrar energía todo el año.',
          },
        ],
      },
      {
        heading: 'Cristal de seguridad',
        blocks: [
          {
            type: 'p',
            text: 'La versión laminada de Climalit Planitherm ayuda a ahorrar energía y protege el hogar contra el vandalismo y los impactos: control solar, aislamiento térmico y seguridad en un mismo vidrio.',
          },
        ],
      },
      {
        heading: 'Sistema energético: aislamiento térmico reforzado (ATR)',
        blocks: [
          {
            type: 'p',
            text: 'El doble acristalamiento ATR está formado por dos vidrios, uno de ellos revestido de una fina capa transparente con base de plata, de baja emisividad y control solar. La cámara entre ambos vidrios puede rellenarse de gas argón para reforzar el aislamiento térmico.',
          },
          {
            type: 'p',
            text: 'Estos sistemas están diseñados para ahorrar hasta un 40 % de aire acondicionado en verano y un 60 % de calefacción en invierno, contribuyendo a reducir las emisiones de CO₂.',
          },
          {
            type: 'list',
            items: [
              'Aprovechará al máximo la superficie de la vivienda, sin zonas frías junto a las ventanas.',
              'Evitará la condensación en los acristalamientos.',
              'Sin perder luminosidad ni transparencia.',
            ],
          },
        ],
      },
      {
        heading: 'Decoración',
        blocks: [
          {
            type: 'p',
            text: 'El barrotillo es un perfil de aluminio decorativo que va dentro de la cámara del doble acristalamiento. Aporta un estilo clásico a ventanas y puertas sin necesidad de limpieza ni mantenimiento, y se fabrica en una amplia gama de colores, incluso en imitación madera.',
          },
        ],
      },
    ],
    brands: ['SGG Climalit', 'Climalit Planitherm'],
    related: ['abatibles', 'correderas', 'persianas-compactos', 'muro-cortina'],
    legacyUrl: '/02materiales_adicionales_acristalamientos.html',
  },
  {
    slug: 'persianas-compactos',
    category: 'materiales-adicionales',
    name: 'Persianas y compactos',
    tagline: 'Un elemento clave de protección térmica y solar',
    intro:
      'El cajón de persiana es un punto débil si es de baja calidad. Instalamos compactos y persianas de aluminio térmicas, orientables y de alta seguridad.',
    metaTitle: 'Persianas de aluminio y de seguridad',
    metaDescription:
      'Persianas de aluminio con lama térmica, lama orientable y autoblocantes de alta seguridad. Sistema compacto y cierres enrollables para locales. Madrid.',
    image: imgPersianas,
    imageAlt: 'Persianas enrollables de aluminio bajadas en las ventanas de una vivienda',
    highlights: ['Lama térmica con poliuretano', 'Lama orientable', 'Persianas autoblocantes', 'Colores RAL'],
    sections: [
      {
        heading: 'El sistema compacto',
        blocks: [
          {
            type: 'p',
            text: 'Es el sistema con mayor aceptación: el cajón de la persiana se coloca justo encima de la ventana, formando un bloque compacto que simplifica la instalación.',
          },
          {
            type: 'p',
            text: 'La persiana o compacto es un elemento de máxima importancia: si es de baja calidad puede generar grandes pérdidas y rebajar mucho las cualidades térmicas de la ventana. Construidos en aluminio y con un buen diseño, ofrecen gran eficiencia.',
          },
        ],
      },
      {
        heading: 'Persiana de aluminio con lama térmica estándar',
        blocks: [
          {
            type: 'list',
            items: [
              'Inyectadas con espuma aislante de poliuretano, que protege del frío en invierno, del calor en verano y del ruido exterior.',
              'Muy ligeras y fáciles de subir y bajar.',
              'No se deforman con el frío o el calor ni pierden color gracias a su lacado especial para exteriores.',
              'Amplia gama de colores para integrarse en cualquier fachada.',
            ],
          },
        ],
      },
      {
        heading: 'Persianas enrollables con lama regulable de extrusión',
        blocks: [
          {
            type: 'p',
            text: 'Suben y bajan como las enrollables normales, pero cuando están bajadas permiten girar las lamas para conseguir la luz o la ventilación adecuadas sin perder seguridad.',
          },
        ],
      },
      {
        heading: 'Persianas de alta seguridad autoblocantes',
        blocks: [
          {
            type: 'p',
            text: 'Una vez bajadas, y sin necesidad de cerradura, no pueden elevarse desde el exterior: si se intenta forzar la persiana se bloquea, y vuelve a su posición normal cuando se deja de forzar.',
          },
          {
            type: 'list',
            items: [
              'Fabricadas en aluminio extrusionado, resistentes y robustas.',
              'Sistema autoblocante con bloqueo en 44 puntos por metro.',
              'Todos los colores RAL. Elevación siempre con motor.',
              'Dos modelos: ciega (tradicional) o microperforada, que deja pasar luz y aire estando bajada.',
            ],
          },
          {
            type: 'p',
            text: 'También disponemos de cierres enrollables de aluminio de alta seguridad para negocios y puertas de garaje. Le asesoramos sin compromiso.',
          },
        ],
      },
    ],
    related: ['domotica-automatismos', 'abatibles', 'mosquiteras', 'estores'],
    legacyUrl: '/02materiales_adicionales_persianas_y_compactos.html',
  },
  {
    slug: 'domotica-automatismos',
    category: 'materiales-adicionales',
    name: 'Domótica y automatismos',
    tagline: 'Lo último en tecnología para su confort',
    intro:
      'Motorizar persianas y toldos mejora la comodidad, ayuda a ahorrar energía y aporta seguridad. Ofrecemos control por mando, interruptor, programador o smartphone.',
    metaTitle: 'Motores para persianas y toldos y domótica',
    metaDescription:
      'Motorización y domótica para persianas y toldos: mando a distancia, programación horaria y control desde el smartphone. Instalación en Madrid.',
    image: imgDomotica,
    imageAlt: 'Mandos a distancia, interruptor y motor tubular para persianas',
    highlights: ['Control desde el smartphone', 'Programación horaria', 'Simulación de presencia', 'Motores silenciosos'],
    sections: [
      {
        heading: 'Hogar conectado',
        blocks: [
          {
            type: 'p',
            text: 'Las soluciones para el hogar conectado le simplifican el día a día con sistemas sencillos y fáciles de usar que se adaptan a su modo de vida. Ofrecemos domótica controlada desde el smartphone. Instalar un motor en una persiana o un toldo aporta muchas ventajas.',
          },
        ],
      },
      {
        heading: 'Salud',
        blocks: [
          {
            type: 'p',
            text: 'Las articulaciones de dedos, muñecas y codos sufren cada vez que se sube o baja una persiana pesada tirando de la cinta o girando una manivela. Con un motor basta pulsar un botón, en un interruptor o en un mando a distancia.',
          },
        ],
      },
      {
        heading: 'Ahorro energético',
        blocks: [
          {
            type: 'p',
            text: 'En invierno puede programar persianas y toldos para que suban cuando sale el sol y ayuden a calentar la casa, ahorrando calefacción. En verano, para que bajen en las horas de más sol, con un ahorro importante en aire acondicionado.',
          },
        ],
      },
      {
        heading: 'Seguridad',
        blocks: [
          {
            type: 'p',
            text: 'Con un programador, por ejemplo en vacaciones, las persianas pueden subir durante el día y bajar por la noche a distintas horas, simulando que hay gente en casa.',
          },
        ],
      },
      {
        heading: 'Tecnología',
        blocks: [
          {
            type: 'p',
            text: 'Los motores para persianas y toldos cuentan con termoprotección (se detienen si se sobrecalientan), receptor de radio integrado, funcionamiento silencioso y montaje rápido. Trabajamos con marcas como Cherubini.',
          },
        ],
      },
    ],
    brands: ['Cherubini'],
    related: ['persianas-compactos', 'toldos-pergolas', 'estores', 'elevables'],
    legacyUrl: '/02materiales_adicionales_automatismos.html',
  },
  {
    slug: 'mosquiteras',
    category: 'materiales-adicionales',
    name: 'Mosquiteras de aluminio',
    tagline: 'Un complemento imprescindible para sus ventanas',
    intro:
      'Disfrute del verano sin insectos en casa, en el comercio o en la oficina. Fabricamos mosquiteras de aluminio a medida para ventanas, balcones y terrazas.',
    metaTitle: 'Mosquiteras de aluminio a medida',
    metaDescription:
      'Mosquiteras de aluminio enrollables verticales y laterales, fijas, correderas y plisadas, con red de fibra de vidrio y variedad de colores. Madrid.',
    image: imgMosquiteras,
    imageAlt: 'Porche con grandes puertas acristaladas que dan a una piscina',
    highlights: ['Enrollables, fijas, correderas y plisadas', 'Red de fibra de vidrio', 'Variedad de colores', 'Para ventanas y terrazas'],
    sections: [
      {
        heading: 'Mosquitera enrollable vertical',
        blocks: [
          {
            type: 'p',
            text: 'Es el modelo más cómodo y habitual: se recoge en invierno y se acciona rápidamente en verano. La red es de fibra de vidrio en color gris y los perfiles, de aluminio.',
          },
        ],
      },
      {
        heading: 'Mosquitera enrollable lateral simple (1 hoja)',
        blocks: [
          {
            type: 'p',
            text: 'Diseñada para balcones o puertas de una hoja. Se maneja como una puerta corredera, sin esfuerzo. Puede recogerla en invierno y tenerla desplegada todo el verano.',
          },
        ],
      },
      {
        heading: 'Mosquitera enrollable lateral doble',
        blocks: [
          {
            type: 'p',
            text: 'Para accesos a terrazas o puertas de dos hojas: dos mosquiteras laterales simples, una a cada lado, con guías comunes y cierre en el centro.',
          },
        ],
      },
      {
        heading: 'Mosquitera fija',
        blocks: [
          {
            type: 'p',
            text: 'Se instala empotrada en cualquier hueco. Es totalmente automontable, con perfiles de aluminio de extrusión y malla de fibra de vidrio, y lleva felpudo en todo el perímetro para encajar de forma estanca. Se coloca y se retira con la facilidad de un cuadro.',
          },
        ],
      },
      {
        heading: 'Mosquitera corredera',
        blocks: [
          {
            type: 'p',
            text: 'Se coloca sobre el marco de una ventana corredera existente, sin retirar las hojas: la hoja de mosquitera se encarrila en el perfil del marco interior y mantiene el funcionamiento de la ventana. Lleva ruedas en la parte inferior y perfilería de aluminio de extrusión.',
          },
        ],
      },
      {
        heading: 'Mosquitera plegable o plisada',
        blocks: [
          {
            type: 'p',
            text: 'La plisada de una hoja es perfecta para accesos de uso frecuente como balcones, terrazas o patios, y también existe un modelo para ventanas. Para grandes superficies, lo más adecuado es el modelo de dos hojas con cierre magnético central o el modelo reversible, que permite acceder por distintos puntos.',
          },
        ],
      },
      {
        heading: 'Acabados',
        blocks: [{ type: 'p', text: 'Todos los modelos están disponibles en variedad de colores para adaptarse a su ventana o balcón.' }],
      },
    ],
    related: ['abatibles', 'correderas', 'persianas-compactos', 'estores'],
    legacyUrl: '/02materiales_adicionales_mosquiteras.html',
  },

  // ───────────────────────────── Otros productos
  {
    slug: 'hierro-forja',
    category: 'otros-productos',
    name: 'Hierro y forja',
    tagline: 'Soluciones en hierro y forja',
    intro:
      'Trabajos de forja artística, de seguridad y estructural: barandillas, cancelas, rejas, vallas, cerramientos de piscina, pérgolas y celosías.',
    metaTitle: 'Hierro y forja: rejas, barandillas y vallas',
    metaDescription:
      'Forja artística, de seguridad y estructural en Madrid: barandillas, cancelas y rejas de aluminio macizo, vallas, cerramientos de piscina, pérgolas y celosías.',
    image: imgForja,
    imageAlt: 'Detalle de barrotes de forja con espirales decorativas',
    highlights: ['Barandillas y escaleras', 'Cancelas y rejas a medida', 'Vallas y cerramientos de piscina', 'Pérgolas y celosías'],
    sections: [
      {
        heading: 'Forja artística, de seguridad y estructural',
        blocks: [
          {
            type: 'p',
            text: 'Realizamos todo tipo de trabajos de forja con diseños únicos: barandillas, vallas, escaleras, puertas de jardín, puertas de entrada, pérgolas, farolas, muebles de jardín…',
          },
        ],
      },
      {
        heading: 'Barandillas',
        blocks: [
          {
            type: 'p',
            text: 'Amplia gama de barandillas y escaleras en aluminio macizo de estilo clásico forja. Su sistema de ensamblaje permite una instalación rápida y son muy adecuadas para exteriores y zonas costeras.',
          },
        ],
      },
      {
        heading: 'Cancelas',
        blocks: [
          {
            type: 'p',
            text: 'Las puertas de jardín o cancelas clásicas en aluminio macizo son uno de nuestros productos más versátiles: el cliente elige detalle a detalle la decoración dentro de nuestro catálogo. Su ligereza hace que motorizarlas resulte mucho más económico.',
          },
        ],
      },
      {
        heading: 'Rejas',
        blocks: [
          {
            type: 'p',
            text: 'Rejas de aluminio macizo en varios modelos, fabricadas a la medida y en el color que se necesite. Los barrotes y las cenefas van soldados, lo que les da mayor firmeza. Pueden ser fijas o practicables (reja puerta).',
          },
        ],
      },
      {
        heading: 'Vallas',
        blocks: [
          {
            type: 'p',
            text: 'Módulos y flechas fabricados en aluminio macizo de fundición, con decenas de modelos combinables entre sí. Se fabrican a medida en el color deseado y, al ser de aluminio, conservan su aspecto con el paso del tiempo.',
          },
        ],
      },
      {
        heading: 'Cerramientos de piscina',
        blocks: [
          {
            type: 'p',
            text: 'Incorporan la puerta de acceso con los mismos elementos decorativos que el resto, para que el conjunto vaya acorde con el cerramiento y con la propia casa.',
          },
        ],
      },
      {
        heading: 'Pérgolas',
        blocks: [
          {
            type: 'p',
            text: 'Prácticas y decorativas, se combinan con cristal, telas o lamas fijas. También hay pérgolas de lamas motorizadas que giran según se necesite sol, sombra o protección frente a la lluvia gracias a su sistema de vierteaguas. Los acabados en imitación madera unen la estética de la madera con las ventajas del aluminio.',
          },
        ],
      },
      {
        heading: 'Celosías',
        blocks: [
          {
            type: 'p',
            text: 'Se fabrican en el color y las medidas deseados y aportan intimidad sin renunciar a la visión. Hay dos modelos:',
          },
          {
            type: 'list',
            items: [
              'Trenzado: muy resistente gracias a las varillas interiores que lo atraviesan a modo de trenza.',
              'Perforado o troquelado: permite elegir entre una mayor variedad de diseños (cuadrado, círculo, rombo…).',
            ],
          },
        ],
      },
    ],
    related: ['toldos-pergolas', 'cerrajeria', 'mallorquinas', 'persianas-compactos'],
    legacyUrl: '/03_otros_productos_hierro_y_forja.html',
  },
  {
    slug: 'toldos-pergolas',
    category: 'otros-productos',
    name: 'Toldos y pérgolas',
    tagline: 'Innovación y diseño en protección solar',
    intro:
      'Toldos extensibles, verticales, de balcón, de cofre y tipo veranda, y pérgolas de aluminio, con opción de motorización y automatización.',
    metaTitle: 'Toldos y pérgolas de aluminio en Madrid',
    metaDescription:
      'Instalamos toldos extensibles, verticales, de balcón, de cofre y tipo veranda, y pérgolas de aluminio. Lonas acrílicas y microperforadas, motorizables.',
    image: imgToldos,
    imageAlt: 'Toldo extensible de lona clara desplegado sobre una terraza',
    highlights: ['Toldos de todo tipo', 'Motorización y sensores', 'Lonas acrílicas teñidas en masa', 'Pérgolas de aluminio'],
    sections: [
      {
        heading: 'Toldos',
        blocks: [
          {
            type: 'p',
            text: 'Instalamos toldos extensibles, verticales, de balcón, guiados, de punto recto o de brazo acodado, en cofre de aluminio, planos tipo veranda y laterales en cofre vertical.',
          },
          {
            type: 'p',
            text: 'Todos pueden motorizarse y automatizarse: se abren al recibir luz y se cierran al oscurecer o si hace demasiado viento.',
          },
          {
            type: 'list',
            items: [
              'Lonas acrílicas tejidas con hilo teñido en masa para evitar la decoloración, tratadas con fungicida contra el moho y acabadas en teflón para impermeabilizarlas.',
              'Lonas microperforadas que permiten ver desde el interior.',
              'Distintos acabados y perfilerías para diferentes exigencias.',
            ],
          },
        ],
      },
      {
        heading: 'Pérgolas de aluminio',
        blocks: [
          {
            type: 'p',
            text: 'Pérgolas construidas en aluminio, acero y PVC, de accionamiento manual o motorizado y automatizado. Totalmente inoxidables, incluso junto al mar, y con las mismas opciones de lona acrílica o microperforada.',
          },
          {
            type: 'p',
            text: 'Le aconsejamos el sistema que mejor se adapta a sus necesidades. Pídanos presupuesto sin compromiso.',
          },
        ],
      },
    ],
    related: ['domotica-automatismos', 'estores', 'hierro-forja', 'mallorquinas'],
    legacyUrl: '/03_otros_productos_toldos.html',
  },
  {
    slug: 'frentes-armario',
    category: 'otros-productos',
    name: 'Frentes de armario',
    tagline: 'Todo un mundo de posibilidades, dentro y fuera de su armario',
    intro:
      'Frentes e interiores de armario a medida, con sistemas correderos, abatibles, plegables o automatizados y una amplia variedad de acabados.',
    metaTitle: 'Frentes e interiores de armario a medida',
    metaDescription:
      'Frentes de armario a medida: correderas de dos o tres carriles, sin carril inferior, abatibles, plegables y automatizadas. Diseño de interiores. Madrid.',
    image: imgArmarios,
    imageAlt: 'Armario empotrado con puertas correderas blancas y negras en un dormitorio',
    highlights: ['Fabricación a medida', 'Sistemas sin carril inferior', 'Apertura automatizada', 'Diseño de interiores'],
    sections: [
      {
        heading: 'Soluciones a medida',
        blocks: [
          {
            type: 'p',
            text: 'Creamos soluciones a medida garantizando la calidad de nuestros productos, con los plazos acordados.',
          },
          {
            type: 'list',
            items: [
              'Ruedas autolimpiables y sistema anti-golpeo con amortiguación de freno.',
              'Cerco de tres carriles para deslizar todas las hojas y que queden en un mismo plano.',
              'Perfiles minimalistas de estética actual.',
              'Sistemas sin carril inferior, que permiten dividir ambientes.',
              'Además de los tradicionales (corredera de dos carriles, abatibles, plegables…), sistema automatizado en el que la puerta se desliza sola con un toque.',
            ],
          },
        ],
      },
      {
        heading: 'Diseño de interiores y acabados',
        blocks: [
          {
            type: 'p',
            text: 'Nuestro equipo de montaje y diseño le asesorará para aprovechar todo el espacio y crear el interior de armario que desea.',
          },
          {
            type: 'p',
            text: 'Puede elegir puertas lacadas, barnizadas, pantografiadas, con imágenes impresas o paneladas en PVC con diseños exclusivos.',
          },
        ],
      },
    ],
    related: ['mamparas-bano', 'estores', 'cerrajeria', 'correderas'],
    legacyUrl: '/03_otros_productos_frentes_de_armario.html',
  },
  {
    slug: 'mamparas-bano',
    category: 'otros-productos',
    name: 'Mamparas de baño',
    tagline: 'Dé un toque de estilo a su baño',
    intro:
      'Mamparas de baño fabricadas a medida, con las últimas tendencias de diseño de fabricantes como Kassandra y asesoramiento personalizado.',
    metaTitle: 'Mamparas de baño a medida',
    metaDescription:
      'Mamparas de baño a medida con diseños actuales de fabricantes como Kassandra. Calidad, seguridad y servicio pre y posventa en Madrid.',
    image: imgMamparas,
    imageAlt: 'Baño con mampara de ducha de vidrio transparente y perfil cromado',
    highlights: ['Fabricación a medida', 'Diseños actuales', 'Control de calidad', 'Servicio pre y posventa'],
    sections: [
      {
        heading: 'Para cada baño',
        blocks: [
          {
            type: 'p',
            text: 'Ponemos a su disposición una extensa gama de productos para el baño, fabricados a medida con estándares de calidad y seguridad, respetuosos con el medio ambiente, y un equipo cualificado para asesorarle y responder a sus solicitudes.',
          },
        ],
      },
      {
        heading: 'Calidad',
        blocks: [
          {
            type: 'p',
            text: 'Buscamos productos de muy alta calidad y ofrecemos un servicio pre y posventa cuidado. Nuestro valor añadido es la profesionalidad del equipo, la larga vida de los productos y la satisfacción de nuestros clientes.',
          },
        ],
      },
      {
        heading: 'Diseño',
        blocks: [
          {
            type: 'p',
            text: 'Contamos con las últimas creaciones de fabricantes como Kassandra, para que pueda escoger la mampara que mejor encaja con su estilo de decoración.',
          },
        ],
      },
      {
        heading: 'Seguridad',
        blocks: [
          {
            type: 'p',
            text: 'Cuidamos todos los detalles para adaptar los productos a sus necesidades y aplicamos un estricto control de calidad que avala su durabilidad y buen funcionamiento.',
          },
        ],
      },
    ],
    brands: ['Kassandra'],
    related: ['frentes-armario', 'vidrios-acristalamientos', 'cerrajeria', 'estores'],
    legacyUrl: '/03_otros_productos_mamparas_de_bano.html',
  },
  {
    slug: 'cerrajeria',
    category: 'otros-productos',
    name: 'Cerrajería',
    tagline: 'Refuerce la seguridad para usted y los suyos',
    intro:
      'Puertas blindadas y acorazadas y sustitución de bombillos por modelos de seguridad antibumping.',
    metaTitle: 'Puertas blindadas y bombillos antibumping',
    metaDescription:
      'Cerrajería de seguridad en Madrid: puertas blindadas, puertas acorazadas y cambio de bombillos antibumping con llave incopiable y certificado UNE-EN 1303.',
    image: imgCerrajeria,
    imageAlt: 'Ilustración de un bombillo de seguridad seccionado con su llave',
    highlights: ['Puertas blindadas', 'Puertas acorazadas', 'Bombillos antibumping', 'Certificado UNE-EN 1303'],
    sections: [
      {
        heading: 'Puertas blindadas',
        blocks: [
          {
            type: 'p',
            text: 'Están compuestas por una estructura de placas u hojas de madera con inserciones de aleaciones metálicas, recubiertas por ambas caras con chapa de acero de varios milímetros que da consistencia a la puerta. Incorporan un cilindro que impide su extracción con ganzúas o taladros.',
          },
        ],
      },
      {
        heading: 'Puertas acorazadas',
        blocks: [
          {
            type: 'p',
            text: 'Su estructura lleva tubos de acero reforzados con un hormigón especial entre las hojas de madera, además de cerraduras especiales de alta seguridad. Es la opción más segura frente a las puertas blindadas y de seguridad.',
          },
        ],
      },
      {
        heading: 'Bombillos de seguridad antibumping',
        blocks: [
          {
            type: 'p',
            text: 'Realizamos muchos cambios de bombillos antiguos por modelos antibumping, en respuesta al aumento de robos con esta técnica. Sus características:',
          },
          {
            type: 'list',
            items: [
              'Sistema de protección antibumping avanzado.',
              'Llaves incopiables con sensores de seguridad.',
              'Control de copia electrónico.',
              'Protección contra el ganzuado.',
              'Embrague antipánico doble: permite abrir aunque se haya dejado la llave puesta por dentro.',
              'Certificado de calidad UNE-EN 1303.',
            ],
          },
        ],
      },
    ],
    related: ['persianas-compactos', 'hierro-forja', 'frentes-armario', 'abatibles'],
    legacyUrl: '/03_otros_productos_cerrajeria.html',
  },
  {
    slug: 'estores',
    category: 'otros-productos',
    name: 'Estores',
    tagline: 'La unión del estilo y la protección solar',
    intro:
      'Estores enrollables con una amplia colección de tejidos, colores y texturas, y accionamiento manual o motorizado.',
    metaTitle: 'Estores enrollables a medida',
    metaDescription:
      'Estores enrollables con amplia colección de tejidos: accionamiento por cadena, manivela, motor o batería, opción doble tejido e integración domótica.',
    image: imgEstores,
    imageAlt: 'Salón con estores enrollables de bandas horizontales en grandes ventanales',
    highlights: ['Amplia colección de tejidos', 'Motorización y domótica', 'Opción doble tejido', 'Tapas extrafinas'],
    sections: [
      {
        heading: 'Estores enrollables',
        blocks: [
          {
            type: 'p',
            text: 'Este versátil sistema de cortina enrollable, con su amplia colección de tejidos, colores y texturas, contribuye a la decoración y le ayuda a crear ambientes en cada ventana de su hogar o negocio. Encaja en todo tipo de estilos decorativos y aporta sobriedad al espacio.',
          },
        ],
      },
      {
        heading: 'Tipos de accionamiento',
        blocks: [
          {
            type: 'list',
            items: [
              'Cadena manual.',
              'Manivela (cardán).',
              'Motor: mando a distancia, sensores de luz, programadores horarios o integración en el sistema domótico de la vivienda.',
              'Motor de batería.',
            ],
          },
        ],
      },
      {
        heading: 'Máxima personalización',
        blocks: [
          {
            type: 'list',
            items: [
              'Tapas de diseño extrafino para favorecer la ligereza visual de la cortina.',
              'Variedad de colores para combinar con los tejidos.',
              'Opción «doble tejido»: combina un tejido decorativo y otro opaco.',
            ],
          },
        ],
      },
    ],
    related: ['toldos-pergolas', 'domotica-automatismos', 'mallorquinas', 'persianas-compactos'],
    legacyUrl: '/03_otros_productos_estores.html',
  },
];

const categoryImages: Record<CategorySlug, ImageMetadata> = {
  'sistemas-aluminio': imgPatio,
  'materiales-adicionales': imgVidrios,
  'otros-productos': imgToldos,
};
export const getCategoryImage = (slug: CategorySlug) => categoryImages[slug];

export const getCategory = (slug: CategorySlug) => categories.find((c) => c.slug === slug)!;
export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const productsIn = (slug: CategorySlug) => products.filter((p) => p.category === slug);
export const productUrl = (p: Product) => `/${p.category}/${p.slug}/`;
export const categoryUrl = (slug: CategorySlug) => `/${slug}/`;
