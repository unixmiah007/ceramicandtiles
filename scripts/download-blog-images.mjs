/**
 * Downloads only blog post images (does NOT wipe other site images).
 * Run: node scripts/download-blog-images.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { BLOG_IMAGE_URL_MAP } from './blog-image-urls.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.join(__dirname, '../client/public/images/blog');

async function download(url, outputPath) {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed ${response.status} for ${outputPath} (${url})`);
  }
  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(outputPath, buffer);
}

async function main() {
  let success = 0;
  let failed = 0;

  for (const [relativePath, url] of Object.entries(BLOG_IMAGE_URL_MAP)) {
    const slug = relativePath.replace('blog/', '');
    const outputPath = path.join(blogDir, `${slug}.jpg`);
    try {
      await download(url, outputPath);
      success += 1;
      console.log(`saved ${slug}.jpg`);
    } catch (error) {
      failed += 1;
      console.error(`FAILED ${slug}: ${error.message}`);
    }
  }

  console.log(`\nDownloaded ${success}/${Object.keys(BLOG_IMAGE_URL_MAP).length} blog images (${failed} failed).`);
  if (failed > 0) process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
