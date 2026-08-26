/**
 * Builds a complete sitemap page list from site source data.
 * Run: node scripts/generate-sitemap.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const today = new Date().toISOString().slice(0, 10);
const SITE_URL = (process.env.SITE_URL || 'https://ceramicandtile.com').replace(/\/$/, '');

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

function extractIds(source, pattern) {
  return [...source.matchAll(pattern)].map((match) => match[1]);
}

function unique(items) {
  const seen = new Set();
  return items.filter((item) => {
    const key = item.path;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

const services = extractIds(
  read('client/src/data/services.ts'),
  /id: '([a-z0-9-]+)',\s*\n\s*title:/g
);
const values = extractIds(
  read('client/src/data/values.ts'),
  /id: '([a-z0-9-]+)',\s*\n\s*title:/g
);
const projects = extractIds(
  read('client/src/data/content.ts'),
  /id: '([a-z0-9-]+)',\s*\n\s*name:/g
);
const cities = JSON.parse(read('client/src/data/service-area-cities.json'));
const blogCategoryMatch = read('client/src/data/blog.ts').match(
  /export const blogCategories = \[([^\]]+)\]/
);
const blogCategories = blogCategoryMatch
  ? [...blogCategoryMatch[1].matchAll(/'([^']+)'/g)].map((match) => match[1])
  : [];

const blogManifestPath = path.join(root, 'server/src/data/blog-manifest.json');
const posts = fs.existsSync(blogManifestPath)
  ? JSON.parse(fs.readFileSync(blogManifestPath, 'utf8'))
  : [];

const pages = [];

function add(pathName, changefreq, priority, extras = {}) {
  pages.push({
    path: pathName,
    changefreq,
    priority,
    lastmod: extras.lastmod || today,
    imagePath: extras.imagePath,
    imageTitle: extras.imageTitle,
  });
}

add('/', 'weekly', '1.0', { imagePath: '/images/sections/your-space-deserves-the-best.jpg', imageTitle: 'Portillo Ceramic and Tile' });
add('/services', 'weekly', '0.9');
services.forEach((id) => add(`/services/${id}`, 'monthly', '0.8'));
add('/experience', 'monthly', '0.8');
projects.forEach((id) => add(`/experience/${id}`, 'monthly', '0.7'));
add('/why-portillo', 'monthly', '0.7');
values.forEach((id) => add(`/why-portillo/${id}`, 'monthly', '0.6'));
add('/contact', 'monthly', '0.9');
add('/quote-wizard', 'monthly', '0.8');
add('/service-area', 'monthly', '0.9');
cities.forEach((city) => add(`/service-area/${city.slug}`, 'monthly', '0.75'));
add('/faq', 'monthly', '0.8');
add('/before-after', 'monthly', '0.7');
add('/estimate', 'monthly', '0.8');
add('/checklist', 'monthly', '0.6');
add('/blog', 'weekly', '0.8');
blogCategories.forEach((category) => add(`/blog/category/${category}`, 'weekly', '0.7'));
posts.forEach((post) =>
  add(`/blog/${post.slug}`, 'monthly', '0.6', {
    lastmod: post.date,
    imagePath: post.imagePath,
    imageTitle: post.title,
  })
);

const sitemapPages = unique(pages);

if (services.length !== 12) {
  throw new Error(`Expected 12 services, found ${services.length}`);
}
if (projects.length !== 3) {
  throw new Error(`Expected 3 projects, found ${projects.length}`);
}
if (values.length !== 5) {
  throw new Error(`Expected 5 values, found ${values.length}`);
}
if (cities.length !== 40) {
  throw new Error(`Expected 40 cities, found ${cities.length}`);
}
if (blogCategories.length !== 5) {
  throw new Error(`Expected 5 blog categories, found ${blogCategories.length}`);
}
if (posts.length !== 50) {
  throw new Error(`Expected 50 blog posts, found ${posts.length}`);
}

const outDir = path.join(root, 'server/src/data');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'sitemap-pages.json'), `${JSON.stringify(sitemapPages, null, 2)}\n`);

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const xmlBody = sitemapPages
  .map((page) => {
    const loc = `${SITE_URL}${page.path === '/' ? '/' : page.path}`;
    const lines = [
      '  <url>',
      `    <loc>${escapeXml(loc)}</loc>`,
      `    <lastmod>${page.lastmod}</lastmod>`,
      `    <changefreq>${page.changefreq}</changefreq>`,
      `    <priority>${page.priority}</priority>`,
    ];
    if (page.imagePath) {
      lines.push('    <image:image>');
      lines.push(`      <image:loc>${escapeXml(`${SITE_URL}${page.imagePath}`)}</image:loc>`);
      if (page.imageTitle) {
        lines.push(`      <image:title>${escapeXml(page.imageTitle)}</image:title>`);
      }
      lines.push('    </image:image>');
    }
    lines.push('  </url>');
    return lines.join('\n');
  })
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${xmlBody}
</urlset>
`;

const publicDir = path.join(root, 'client/public');
fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml);

console.log(
  `Sitemap generated: ${sitemapPages.length} URLs (${services.length} services, ${projects.length} projects, ${values.length} values, ${cities.length} cities, ${blogCategories.length} blog categories, ${posts.length} posts)`
);
