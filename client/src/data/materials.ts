import { imagePath } from '../utils/slugify';

export const MATERIALS_PATH = '/materials';

export const materialFamilies = ['ceramic', 'porcelain', 'mosaic', 'stone-look'] as const;
export const materialSizeClasses = [
  'mosaic',
  'subway',
  'standard',
  'large-format',
  'hexagon',
  'plank',
] as const;

export type MaterialFamily = (typeof materialFamilies)[number];
export type MaterialSizeClass = (typeof materialSizeClasses)[number];

export interface TileMaterial {
  id: string;
  family: MaterialFamily;
  sizeClass: MaterialSizeClass;
  sizes: string[];
  heading: string;
  imageSrc: string;
}

function material(partial: Omit<TileMaterial, 'imageSrc'>): TileMaterial {
  return {
    ...partial,
    imageSrc: `${imagePath('materials', partial.heading)}?v=2`,
  };
}

export const tileMaterials: TileMaterial[] = [
  material({
    id: 'glazed-ceramic-wall-tile',
    family: 'ceramic',
    sizeClass: 'standard',
    sizes: ['3x6"', '4x4"', '6x6"', '8x10"'],
    heading: 'Glazed Ceramic Wall Tile',
  }),
  material({
    id: 'unglazed-ceramic-floor-tile',
    family: 'ceramic',
    sizeClass: 'standard',
    sizes: ['8x8"', '12x12"', '13x13"'],
    heading: 'Unglazed Ceramic Floor Tile',
  }),
  material({
    id: 'ceramic-subway-tile',
    family: 'ceramic',
    sizeClass: 'subway',
    sizes: ['3x6"', '4x8"', '4x12"'],
    heading: 'Ceramic Subway Tile',
  }),
  material({
    id: 'handmade-zellige-ceramic',
    family: 'ceramic',
    sizeClass: 'standard',
    sizes: ['2x2"', '4x4"', '2x6"'],
    heading: 'Handmade Zellige Ceramic',
  }),
  material({
    id: 'terracotta-saltillo-tile',
    family: 'ceramic',
    sizeClass: 'standard',
    sizes: ['12x12"', '13x13"', '16x16"'],
    heading: 'Terracotta Saltillo Tile',
  }),
  material({
    id: 'ceramic-mosaic-tile',
    family: 'ceramic',
    sizeClass: 'mosaic',
    sizes: ['1x1"', '2x2"', 'sheeted 12x12"'],
    heading: 'Ceramic Mosaic Tile',
  }),
  material({
    id: 'beveled-metro-ceramic',
    family: 'ceramic',
    sizeClass: 'subway',
    sizes: ['3x6" beveled', '4x8"'],
    heading: 'Beveled Metro Ceramic',
  }),
  material({
    id: 'kitchen-backsplash-ceramic',
    family: 'ceramic',
    sizeClass: 'subway',
    sizes: ['3x6"', '4x16"', '6x18"'],
    heading: 'Kitchen Backsplash Ceramic',
  }),
  material({
    id: 'porcelain-floor-tile',
    family: 'porcelain',
    sizeClass: 'standard',
    sizes: ['12x12"', '12x24"', '18x18"'],
    heading: 'Porcelain Floor Tile',
  }),
  material({
    id: 'large-format-porcelain',
    family: 'porcelain',
    sizeClass: 'large-format',
    sizes: ['24x24"', '24x48"', '32x32"'],
    heading: 'Large Format Porcelain',
  }),
  material({
    id: 'rectified-porcelain',
    family: 'porcelain',
    sizeClass: 'large-format',
    sizes: ['12x24"', '24x24"', '24x48"'],
    heading: 'Rectified Porcelain',
  }),
  material({
    id: 'marble-look-porcelain',
    family: 'stone-look',
    sizeClass: 'large-format',
    sizes: ['12x24"', '24x48"', '32x64"'],
    heading: 'Marble Look Porcelain',
  }),
  material({
    id: 'wood-look-porcelain-plank',
    family: 'porcelain',
    sizeClass: 'plank',
    sizes: ['6x24"', '8x36"', '8x48"'],
    heading: 'Wood Look Porcelain Plank',
  }),
  material({
    id: 'cement-look-porcelain',
    family: 'stone-look',
    sizeClass: 'large-format',
    sizes: ['24x24"', '24x48"', '36x36"'],
    heading: 'Cement Look Porcelain',
  }),
  material({
    id: 'slate-look-porcelain',
    family: 'stone-look',
    sizeClass: 'standard',
    sizes: ['12x24"', '16x16"', '18x36"'],
    heading: 'Slate Look Porcelain',
  }),
  material({
    id: 'hexagon-porcelain',
    family: 'porcelain',
    sizeClass: 'hexagon',
    sizes: ['2"', '6"', '8"', '10"'],
    heading: 'Hexagon Porcelain',
  }),
  material({
    id: 'outdoor-porcelain-paver',
    family: 'porcelain',
    sizeClass: 'large-format',
    sizes: ['24x24"', '24x48"', '20mm paver'],
    heading: 'Outdoor Porcelain Paver',
  }),
  material({
    id: 'encaustic-look-porcelain',
    family: 'porcelain',
    sizeClass: 'standard',
    sizes: ['8x8"', '9x9"', '18x18"'],
    heading: 'Encaustic Look Porcelain',
  }),
  material({
    id: 'travertine-look-porcelain',
    family: 'stone-look',
    sizeClass: 'standard',
    sizes: ['12x24"', '18x18"', '16x32"'],
    heading: 'Travertine Look Porcelain',
  }),
  material({
    id: 'terrazzo-look-porcelain',
    family: 'stone-look',
    sizeClass: 'large-format',
    sizes: ['24x24"', '32x32"', '48x48"'],
    heading: 'Terrazzo Look Porcelain',
  }),
  material({
    id: 'shower-wall-porcelain',
    family: 'porcelain',
    sizeClass: 'large-format',
    sizes: ['12x24"', '24x48"', '48x48"'],
    heading: 'Shower Wall Porcelain',
  }),
  material({
    id: 'brick-look-porcelain',
    family: 'porcelain',
    sizeClass: 'subway',
    sizes: ['2.5x8"', '3x12"', '4x12"'],
    heading: 'Brick Look Porcelain',
  }),
  material({
    id: 'thin-porcelain-slab',
    family: 'porcelain',
    sizeClass: 'large-format',
    sizes: ['48x48"', '63x126"', '6mm–12mm'],
    heading: 'Thin Porcelain Slab',
  }),
  material({
    id: 'glass-mosaic-tile',
    family: 'mosaic',
    sizeClass: 'mosaic',
    sizes: ['1x1"', '1x2"', 'sheeted 12x12"'],
    heading: 'Glass Mosaic Tile',
  }),
  material({
    id: 'pebble-mosaic-tile',
    family: 'mosaic',
    sizeClass: 'mosaic',
    sizes: ['random mesh', '12x12" sheets'],
    heading: 'Pebble Mosaic Tile',
  }),
  material({
    id: 'penny-round-mosaic',
    family: 'mosaic',
    sizeClass: 'mosaic',
    sizes: ['¾" rounds', '1" rounds'],
    heading: 'Penny Round Mosaic',
  }),
  material({
    id: 'fish-scale-mosaic',
    family: 'mosaic',
    sizeClass: 'mosaic',
    sizes: ['fan / scale', 'sheeted 10x11"'],
    heading: 'Fish Scale Mosaic',
  }),
  material({
    id: 'quarry-tile',
    family: 'ceramic',
    sizeClass: 'standard',
    sizes: ['6x6"', '8x8"', '4x8"'],
    heading: 'Quarry Tile',
  }),
];

export const materialHeroImage = {
  src: `${imagePath('materials', 'Large Format Porcelain')}?v=2`,
  alt: 'Large-format porcelain tile floor in an open living space',
};
