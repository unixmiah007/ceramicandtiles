/**
 * Copies unique hi-res local images into /images/materials.
 * Run: node scripts/copy-material-images.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const images = path.join(root, 'client/public/images');
const dest = path.join(images, 'materials');

export const MATERIAL_IMAGE_COPIES = {
  'glazed-ceramic-wall-tile': 'blog/glazed-vs-unglazed-ceramic-tile-explained.jpg',
  'unglazed-ceramic-floor-tile': 'blog/grout-color-selection-a-complete-guide.jpg',
  'ceramic-subway-tile': 'services/backsplashes/bathroom-backsplashes.jpg',
  'handmade-zellige-ceramic': 'blog/handcrafted-ceramic-tile-artisan-options.jpg',
  'terracotta-saltillo-tile': 'blog/ceramic-tile-trends-for-2026.jpg',
  'ceramic-mosaic-tile': 'blog/tile-layout-patterns-that-elevate-any-room.jpg',
  'beveled-metro-ceramic': 'blog/best-ceramic-tile-for-kitchen-backsplashes.jpg',
  'kitchen-backsplash-ceramic': 'blog/ceramic-tile-grout-and-sealant-best-practices.jpg',
  'porcelain-floor-tile': 'blog/durable-tile-for-high-traffic-living-areas.jpg',
  'large-format-porcelain': 'blog/large-format-tile-pros-and-cons-for-modern-homes.jpg',
  'rectified-porcelain': 'services/backsplashes/custom-layouts.jpg',
  'marble-look-porcelain': 'blog/walk-in-shower-design-ideas.jpg',
  'wood-look-porcelain-plank': 'blog/creating-a-calm-bedroom-with-neutral-tile-accents.jpg',
  'cement-look-porcelain': 'blog/living-room-rug-layering-over-tile-floors.jpg',
  'slate-look-porcelain': 'blog/natural-stone-vs-porcelain-in-living-spaces.jpg',
  'hexagon-porcelain': 'blog/ada-compliant-bathroom-tile-layout.jpg',
  'outdoor-porcelain-paver': 'services/commercial-tile/professional-facility-experience.jpg',
  'encaustic-look-porcelain': 'blog/tile-fireplace-surrounds-in-master-bedrooms.jpg',
  'travertine-look-porcelain': 'blog/ceramic-tile-for-fireplace-surrounds.jpg',
  'terrazzo-look-porcelain': 'blog/tile-around-living-room-fireplaces.jpg',
  'shower-wall-porcelain': 'services/shower-installation/waterproofing-included.jpg',
  'brick-look-porcelain': 'blog/tub-to-shower-conversion-what-to-know.jpg',
  'thin-porcelain-slab': 'blog/repairing-cracked-ceramic-tile.jpg',
  'glass-mosaic-tile': 'blog/how-to-calculate-tile-quantity-for-your-project.jpg',
  'pebble-mosaic-tile': 'blog/niche-and-bench-ideas-for-shower-tile.jpg',
  'penny-round-mosaic': 'services/tile-replacement/tile-replacement.jpg',
  'fish-scale-mosaic': 'blog/guest-bathroom-refresh-on-a-budget.jpg',
  'quarry-tile': 'services/commercial-tile/built-for-high-traffic-use.jpg',
};

export function copyMaterialImages({ overwrite = false } = {}) {
  fs.mkdirSync(dest, { recursive: true });

  for (const [name, relative] of Object.entries(MATERIAL_IMAGE_COPIES)) {
    const from = path.join(images, relative);
    const to = path.join(dest, `${name}.jpg`);
    if (!fs.existsSync(from)) {
      throw new Error(`Missing source image: ${relative}`);
    }
    if (!overwrite && fs.existsSync(to)) {
      continue;
    }
    fs.copyFileSync(from, to);
    const bytes = fs.statSync(to).size;
    console.log(`copied ${name}.jpg (${bytes} bytes)`);
  }

  console.log(`Material library images: ${Object.keys(MATERIAL_IMAGE_COPIES).length}`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  copyMaterialImages();
}
