import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { IMAGE_URL_MAP } from './image-url-map.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '../client/public/images');

async function download(url, outputPath) {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed ${response.status} for ${outputPath}`);
  }
  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(outputPath, buffer);
}

async function main() {
  if (fs.existsSync(root)) {
    fs.rmSync(root, { recursive: true, force: true });
  }
  fs.mkdirSync(root, { recursive: true });

  let success = 0;
  for (const [relativePath, url] of Object.entries(IMAGE_URL_MAP)) {
    const outputPath = path.join(root, `${relativePath}.jpg`);
    await download(url, outputPath);
    success += 1;
    console.log(`saved ${relativePath}.jpg`);
  }

  console.log(`Downloaded ${success} heading-based images.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
