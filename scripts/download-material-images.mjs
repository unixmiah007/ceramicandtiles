/**
 * Downloads unique hi-res tile photos into /images/materials only.
 * Falls back to existing local copies if a remote fetch fails.
 * Run: node scripts/download-material-images.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { copyMaterialImages, MATERIAL_IMAGE_COPIES } from './copy-material-images.mjs';
import { MATERIAL_IMAGE_URLS } from './material-image-urls.mjs';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const dest = path.join(root, 'client/public/images/materials');
const MIN_BYTES = 80_000;

async function download(url, outputPath) {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'PortilloCeramicTile/1.0 (material library image fetch)',
      Accept: 'image/jpeg,image/*,*/*',
    },
  });
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  const buffer = Buffer.from(await response.arrayBuffer());
  if (buffer.length < MIN_BYTES) {
    throw new Error(`too small (${buffer.length} bytes)`);
  }
  fs.writeFileSync(outputPath, buffer);
  return buffer.length;
}

async function main() {
  copyMaterialImages();
  fs.mkdirSync(dest, { recursive: true });

  let downloaded = 0;
  let fallback = 0;

  for (const name of Object.keys(MATERIAL_IMAGE_COPIES)) {
    const outputPath = path.join(dest, `${name}.jpg`);
    const url = MATERIAL_IMAGE_URLS[name];
    if (!url) {
      fallback += 1;
      continue;
    }
    try {
      const existing = fs.existsSync(outputPath) ? fs.statSync(outputPath).size : 0;
      const tempPath = `${outputPath}.tmp`;
      const bytes = await download(url, tempPath);
      if (bytes >= existing) {
        fs.renameSync(tempPath, outputPath);
        downloaded += 1;
        console.log(`downloaded ${name}.jpg (${bytes} bytes)`);
      } else {
        fs.unlinkSync(tempPath);
        fallback += 1;
        console.log(`kept local ${name}.jpg (${existing} bytes > ${bytes})`);
      }
    } catch (error) {
      fallback += 1;
      console.warn(`fallback ${name}.jpg: ${error.message}`);
    }
  }

  console.log(`Material images ready: ${downloaded} downloaded, ${fallback} local copies`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
