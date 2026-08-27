/**
 * Builds a complete sitemap from App.tsx routes and site source data.
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

function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function extractPairs(source, pattern) {
  return [...source.matchAll(pattern)].map((match) => ({ id: match[1], label: match[2] }));
}

function unique(items) {
  const seen = new Set();
  return items.filter((item) => {
    if (seen.has(item.path)) {
      return false;
    }
    seen.add(item.path);
    return true;
  });
}

function imageEntry(imagePath, imageTitle) {
  return { loc: imagePath, title: imageTitle };
}

const services = extractPairs(
  read('client/src/data/services.ts'),
  /id: '([a-z0-9-]+)',\s*\n\s*title: '([^']+)'/g
);
const values = extractPairs(
  read('client/src/data/values.ts'),
  /id: '([a-z0-9-]+)',\s*\n\s*title: '([^']+)'/g
);
const projects = extractPairs(
  read('client/src/data/content.ts'),
  /id: '([a-z0-9-]+)',\s*\n\s*name: '([^']+)'/g
);
const cities = JSON.parse(read('client/src/data/service-area-cities.json'));
const materialHeadings = [...read('client/src/data/materials.ts').matchAll(/heading: '([^']+)'/g)].map(
  (match) => match[1]
);
const blogCategoryMatch = read('client/src/data/blog.ts').match(
  /export const blogCategories = \[([^\]]+)\]/
);
const blogCategories = blogCategoryMatch
  ? [...blogCategoryMatch[1].matchAll(/'([^']+)'/g)].map((match) => match[1])
  : [];
const blogSlugs = [...read('client/src/data/blog.ts').matchAll(/slug: '([^']+)'/g)].map((match) => match[1]);

const blogManifestPath = path.join(root, 'server/src/data/blog-manifest.json');
const posts = fs.existsSync(blogManifestPath)
  ? JSON.parse(fs.readFileSync(blogManifestPath, 'utf8'))
  : [];

const pages = [];

function add(pathName, changefreq, priority, extras = {}) {
  const images = extras.images
    ? extras.images
    : extras.imagePath
      ? [imageEntry(extras.imagePath, extras.imageTitle)]
      : [];
  pages.push({
    path: pathName,
    changefreq,
    priority,
    lastmod: extras.lastmod || today,
    imagePath: images[0]?.loc,
    imageTitle: images[0]?.title,
    images,
  });
}

add('/', 'weekly', '1.0', {
  imagePath: '/images/sections/your-space-deserves-the-best.jpg',
  imageTitle: 'Portillo Ceramic and Tile',
});
add('/services', 'weekly', '0.9', {
  imagePath: '/images/pages/our-services.jpg',
  imageTitle: 'Tile installation services',
});
services.forEach((service) =>
  add(`/services/${service.id}`, 'monthly', '0.8', {
    imagePath: `/images/services/${service.id}/${slugify(service.label)}.jpg`,
    imageTitle: service.label,
  })
);
add('/experience', 'monthly', '0.8', {
  imagePath: '/images/pages/experience-you-can-trust.jpg',
  imageTitle: 'Tile project experience',
});
projects.forEach((project) =>
  add(`/experience/${project.id}`, 'monthly', '0.7', {
    imagePath: `/images/projects/${slugify(project.label)}.jpg`,
    imageTitle: project.label,
  })
);
add('/why-portillo', 'monthly', '0.7', {
  imagePath: '/images/pages/why-portillo.jpg',
  imageTitle: 'Why Portillo Ceramic and Tile',
});
values.forEach((value) =>
  add(`/why-portillo/${value.id}`, 'monthly', '0.6', {
    imagePath: `/images/values/${value.id}/${slugify(value.label)}.jpg`,
    imageTitle: value.label,
  })
);
add('/contact', 'monthly', '0.9', {
  imagePath: '/images/pages/request-a-quote-today.jpg',
  imageTitle: 'Request a tile quote',
});
add('/quote-wizard', 'monthly', '0.8');
add('/service-area', 'monthly', '0.9');
cities.forEach((city) => add(`/service-area/${city.slug}`, 'monthly', '0.75'));
add('/faq', 'monthly', '0.8');
add('/before-after', 'monthly', '0.7', {
  imagePath: '/images/gallery/spa-like-bathroom-with-floor-to-ceiling-tile.jpg',
  imageTitle: 'Before and after tile gallery',
});
add('/estimate', 'monthly', '0.8');
add('/checklist', 'monthly', '0.6');
add('/cost-guides', 'monthly', '0.85');
cities.forEach((city) => add(`/cost-guides/${city.slug}`, 'monthly', '0.7'));
add('/materials', 'monthly', '0.8', {
  images: materialHeadings.map((heading) =>
    imageEntry(`/images/materials/${slugify(heading)}.jpg`, heading)
  ),
});
add('/blog', 'weekly', '0.8');
blogCategories.forEach((category) => add(`/blog/category/${category}`, 'weekly', '0.7'));

const postsBySlug = new Map(posts.map((post) => [post.slug, post]));
blogSlugs.forEach((slug) => {
  const post = postsBySlug.get(slug);
  add(`/blog/${slug}`, 'monthly', '0.6', {
    lastmod: post?.date,
    imagePath: post?.imagePath,
    imageTitle: post?.title,
  });
});

const sitemapPages = unique(pages);

const appSource = read('client/src/App.tsx');
const staticAppRoutes = [...appSource.matchAll(/path="(\/[^"]*)"/g)]
  .map((match) => match[1])
  .filter((route) => !route.includes(':'));
const missingAppRoutes = staticAppRoutes.filter(
  (route) => !sitemapPages.some((page) => page.path === route)
);
if (missingAppRoutes.length > 0) {
  throw new Error(`Sitemap missing App.tsx routes: ${missingAppRoutes.join(', ')}`);
}

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
if (blogSlugs.length !== 50) {
  throw new Error(`Expected 50 blog posts, found ${blogSlugs.length}`);
}
if (materialHeadings.length !== 28) {
  throw new Error(`Expected 28 materials, found ${materialHeadings.length}`);
}

const expectedCount =
  staticAppRoutes.length +
  services.length +
  projects.length +
  values.length +
  cities.length * 2 +
  blogCategories.length +
  blogSlugs.length;
if (sitemapPages.length !== expectedCount) {
  throw new Error(`Expected ${expectedCount} sitemap URLs, found ${sitemapPages.length}`);
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
    const images = page.images?.length
      ? page.images
      : page.imagePath
        ? [{ loc: page.imagePath, title: page.imageTitle }]
        : [];
    images.forEach((image) => {
      if (!image?.loc) {
        return;
      }
      lines.push('    <image:image>');
      lines.push(`      <image:loc>${escapeXml(`${SITE_URL}${image.loc}`)}</image:loc>`);
      if (image.title) {
        lines.push(`      <image:title>${escapeXml(image.title)}</image:title>`);
      }
      lines.push('    </image:image>');
    });
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
  `Sitemap generated: ${sitemapPages.length} URLs (${services.length} services, ${projects.length} projects, ${values.length} values, ${cities.length} cities, ${cities.length} cost guides, ${materialHeadings.length} materials, ${blogCategories.length} blog categories, ${blogSlugs.length} posts)`
);
