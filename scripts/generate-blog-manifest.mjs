/**
 * Generates server/src/data/blog-manifest.json from client blog data.
 * Run: node scripts/generate-blog-manifest.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const blogTs = fs.readFileSync(path.join(root, 'client/src/data/blog.ts'), 'utf8');
const blogEn = fs.readFileSync(path.join(root, 'client/src/i18n/blog.en.ts'), 'utf8');

const postBlocks = blogTs.matchAll(
  /slug: '([^']+)',\s*\n\s*titleKey: '([^']+)',\s*\n\s*category: '([^']+)',\s*\n\s*date: '([^']+)',\s*\n\s*image: blogImage\('([^']+)'/g
);

const contentByKey = {};
for (const match of blogEn.matchAll(
  /(\w+):\s*\{\s*\n\s*title: "((?:\\.|[^"\\])*)",\s*\n\s*excerpt: "((?:\\.|[^"\\])*)"/g
)) {
  contentByKey[match[1]] = {
    title: match[2].replace(/\\"/g, '"'),
    excerpt: match[3].replace(/\\"/g, '"'),
  };
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const manifest = [];
for (const [, slug, titleKey, category, date, imageHeading] of postBlocks) {
  const content = contentByKey[titleKey];
  if (!content) {
    console.warn(`Missing content for titleKey: ${titleKey}`);
    continue;
  }

  manifest.push({
    slug,
    titleKey,
    category,
    date,
    title: content.title,
    excerpt: content.excerpt,
    imagePath: `/images/blog/${slugify(imageHeading)}.jpg`,
  });
}

manifest.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const outDir = path.join(root, 'server/src/data');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'blog-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);

console.log(`Generated blog manifest with ${manifest.length} posts.`);
