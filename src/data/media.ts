/**
 * Imágenes editoriales (portada y cabeceras de categoría).
 *
 * Cada entrada tiene una imagen de reserva que ya está en el repositorio y,
 * opcionalmente, una versión generada (`src/assets/generated/<archivo>`).
 * Si el archivo generado existe, se usa; si no, se usa la reserva. Así las
 * imágenes generadas con Higgsfield (ver docs/image-audit.md) se incorporan
 * copiando el archivo, sin tocar las plantillas.
 *
 * Todas son imágenes ilustrativas: no muestran instalaciones reales de la empresa.
 */
import type { ImageMetadata } from 'astro';
import fachada from '../assets/stock/fachada-ventanas-aluminio.jpg';
import patio from '../assets/stock/patio-corredera-moderna.jpg';
import vidrios from '../assets/products/vidrios-acristalamientos.png';
import toldos from '../assets/products/toldos-pergolas.png';

export interface EditorialImage {
  src: ImageMetadata;
  alt: string;
  /** Punto de enfoque para `object-position` al recortar. */
  focus: string;
  /** true si es una imagen generada con IA (se indica en el crédito). */
  generated: boolean;
}

const generatedFiles = import.meta.glob<{ default: ImageMetadata }>('../assets/generated/*.{jpg,jpeg,png,webp}', { eager: true });

/** Busca `src/assets/generated/<nombre>` con cualquier extensión admitida (.jpg, .jpeg, .png, .webp). */
const findGenerated = (name: string) => {
  const key = Object.keys(generatedFiles).find((k) => k.replace(/^.*\//, '').replace(/\.(jpe?g|png|webp)$/, '') === name);
  return key ? generatedFiles[key] : undefined;
};

function pick(name: string, fallback: Omit<EditorialImage, 'generated'>, generated: Omit<EditorialImage, 'src' | 'generated'>): EditorialImage {
  const mod = findGenerated(name);
  if (mod) return { src: mod.default, ...generated, generated: true };
  return { ...fallback, generated: false };
}

export const heroImage = pick(
  'hero-salon-corredera',
  {
    src: fachada,
    alt: 'Ventanas de aluminio proyectantes abiertas en una fachada, iluminadas por la luz cálida del interior',
    focus: '50% 35%',
  },
  {
    alt: 'Salón luminoso con un gran ventanal corredero de aluminio gris antracita abierto a una terraza',
    focus: '62% 50%',
  },
);

export const categoryImages = {
  'sistemas-aluminio': pick(
    'categoria-sistemas-aluminio',
    { src: patio, alt: '', focus: '35% 50%' },
    { alt: '', focus: '55% 50%' },
  ),
  'materiales-adicionales': pick(
    'categoria-materiales-adicionales',
    { src: vidrios, alt: '', focus: '50% 50%' },
    { alt: '', focus: '45% 50%' },
  ),
  'otros-productos': pick(
    'categoria-otros-productos',
    { src: toldos, alt: '', focus: '50% 50%' },
    { alt: '', focus: '50% 55%' },
  ),
} as const;

/**
 * Sustitutos opcionales de la foto de cabecera de algunas fichas
 * (`src/assets/generated/ficha-<slug>.jpg`). Solo se usan si el archivo existe.
 */
const productOverrides: Record<string, string> = {
  abatibles: 'Fachada de ladrillo con ventanas abatibles de aluminio gris antracita, una de ellas abierta',
  correderas: 'Salón con una gran puerta corredera de aluminio negro abierta a un jardín',
};

export function productImageOverride(slug: string): { src: ImageMetadata; alt: string } | undefined {
  const alt = productOverrides[slug];
  const mod = alt ? findGenerated(`ficha-${slug}`) : undefined;
  return mod ? { src: mod.default, alt } : undefined;
}

export const anyGenerated =
  heroImage.generated || Object.values(categoryImages).some((i) => i.generated) || Object.keys(productOverrides).some((slug) => productImageOverride(slug));
