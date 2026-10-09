/**
 * Guías de la sección «Consejos».
 *
 * La web antigua anunciaba estas dos noticias, pero sus enlaces llevaban a
 * páginas inexistentes. Se han redactado reorganizando EXCLUSIVAMENTE el
 * contenido técnico ya publicado en las fichas (ver docs/content-inventory.md
 * §3.6). No añadir cifras que no estén en el catálogo.
 */
import type { Section } from './catalog';

export interface Guide {
  slug: string;
  title: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  sections: Section[];
  relatedProducts: string[];
  legacyUrl?: string;
}

export const guides: Guide[] = [
  {
    slug: 'rotura-puente-termico',
    title: 'Qué es la rotura de puente térmico y para qué sirve',
    excerpt:
      'La rotura de puente térmico (RPT) es una de las características principales a la hora de elegir ventanas de aluminio. Le explicamos en qué consiste.',
    metaTitle: 'Qué es la rotura de puente térmico (RPT)',
    metaDescription:
      'Qué es la rotura de puente térmico en las ventanas de aluminio, cómo funciona y qué series con RPT ofrecemos en abatibles, correderas y elevables.',
    sections: [
      {
        heading: 'El problema: el aluminio conduce el calor',
        blocks: [
          {
            type: 'p',
            text: 'Un perfil de aluminio continuo transmite el frío o el calor del exterior hacia el interior de la vivienda. Ese «puente» térmico provoca pérdidas de energía, zonas frías junto a la ventana y condensación.',
          },
        ],
      },
      {
        heading: 'La solución: separar el perfil exterior del interior',
        blocks: [
          {
            type: 'p',
            text: 'En los perfiles con rotura de puente térmico, unas pletinas de poliamida o un relleno de resina separan el perfil exterior del interior y actúan como barrera. Así se evita la transmisión de frío o calor al interior de la vivienda o local, se contribuye de forma eficiente al ahorro energético (hasta un 60 %) y se limita la condensación.',
          },
        ],
      },
      {
        heading: 'Qué más influye en el aislamiento de una ventana',
        blocks: [
          {
            type: 'list',
            items: [
              'El vidrio: ocupa la mayor parte de la ventana. Un doble acristalamiento bien elegido es tan importante como el perfil.',
              'Las juntas: los sistemas abatibles que instalamos incorporan triple junta para un cierre hermético.',
              'El tipo de apertura: en posición cerrada, una corredera elevable aísla bastante más que una corredera tradicional.',
              'El cajón de persiana: si es de baja calidad, puede rebajar mucho las cualidades térmicas de la ventana.',
            ],
          },
        ],
      },
      {
        heading: 'Series con RPT que instalamos',
        blocks: [
          {
            type: 'p',
            text: 'En sistemas abatibles trabajamos con las series de QSystems Q57, Q67, Q67+, Q75, Q75+, Q77+, Q77C16, Q87C16 y Q87HO, todas con rotura de puente térmico. En grandes huecos, la corredera elevable Q120 RPT. Para zonas interiores, donde no hace falta aislamiento, disponemos también de series sin RPT.',
          },
        ],
      },
    ],
    relatedProducts: ['abatibles', 'elevables', 'correderas', 'vidrios-acristalamientos'],
    legacyUrl: '/03_otros_productos_cierres_de_seguridad.html',
  },
  {
    slug: 'ahorrar-energia-cambiando-vidrios',
    title: '¿Cómo ahorrar energía sustituyendo los vidrios?',
    excerpt:
      'Las ventanas son el punto más débil de la eficiencia energética de una vivienda. Elegir bien el acristalamiento marca la diferencia.',
    metaTitle: 'Cómo ahorrar energía cambiando los vidrios',
    metaDescription:
      'Consejos para elegir el doble acristalamiento: grosores recomendados, cámara de aire, vidrios de baja emisividad con argón, acústicos y de seguridad.',
    sections: [
      {
        heading: '¿Cuál es el problema?',
        blocks: [
          {
            type: 'p',
            text: 'Si hablamos de eficiencia energética, las ventanas son quizá el punto más débil de una vivienda, y el vidrio es la mayor parte de la ventana. El doble acristalamiento ofrece un ahorro energético de hasta el 50 %, porque minimiza las pérdidas de frío y calor entre el interior y el exterior.',
          },
        ],
      },
      {
        heading: 'Recomendaciones básicas',
        blocks: [
          {
            type: 'list',
            items: [
              'Cristales de al menos 4 mm de grosor: cuanto más gruesos, mejor.',
              'Vidrio exterior más grueso que el interior (6 mm recomendado).',
              'Cámara de aire de al menos 12 mm; cuanto mayor, mejor calidad.',
              'Tenga en cuenta la orientación, el viento y el ruido de la zona: nuestros técnicos le asesoran sobre la composición más adecuada.',
            ],
          },
        ],
      },
      {
        heading: 'Vidrios de baja emisividad y control solar',
        blocks: [
          {
            type: 'p',
            text: 'El doble acristalamiento con aislamiento térmico reforzado (ATR) incorpora un vidrio con una fina capa transparente con base de plata, de baja emisividad y control solar, como Climalit Planitherm. La cámara puede rellenarse de gas argón para reforzar el aislamiento.',
          },
          {
            type: 'p',
            text: 'Estos sistemas están diseñados para ahorrar hasta un 40 % de aire acondicionado en verano y un 60 % de calefacción en invierno, sin zonas frías junto a la ventana, sin condensación y sin perder luminosidad.',
          },
        ],
      },
      {
        heading: 'Si además le preocupa el ruido o la seguridad',
        blocks: [
          {
            type: 'list',
            items: [
              'Vidrio acústico: combina aislamiento acústico y térmico.',
              'Vidrio laminado de seguridad: protege contra el vandalismo y los impactos sin renunciar al control solar.',
            ],
          },
        ],
      },
      {
        heading: 'No olvide el perfil',
        blocks: [
          {
            type: 'p',
            text: 'Un buen vidrio necesita un perfil a la altura. Los perfiles de aluminio con rotura de puente térmico admiten vidrios de mayor espesor: desde 30 mm en correderas hasta 62 mm en las series abatibles de 80 mm.',
          },
        ],
      },
    ],
    relatedProducts: ['vidrios-acristalamientos', 'abatibles', 'correderas', 'persianas-compactos'],
  },
];

export const getGuide = (slug: string) => guides.find((g) => g.slug === slug);
