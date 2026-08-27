import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Router, Request, Response } from 'express';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const router = Router();

const SITE_URL = (process.env.SITE_URL || 'https://ceramicandtile.com').replace(/\/$/, '');

interface BlogManifestEntry {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  imagePath: string;
}

interface CityManifestEntry {
  slug: string;
  path: string;
}

interface SitemapImage {
  loc: string;
  title?: string;
}

interface SitemapPage {
  path: string;
  changefreq: string;
  priority: string;
  lastmod?: string;
  imagePath?: string;
  imageTitle?: string;
  images?: SitemapImage[];
}

function loadJson<T>(relativePath: string, fallback: T): T {
  const filePath = path.join(__dirname, relativePath);
  if (!fs.existsSync(filePath)) {
    return fallback;
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf8')) as T;
}

function loadBlogManifest(): BlogManifestEntry[] {
  return loadJson<BlogManifestEntry[]>('../data/blog-manifest.json', []);
}

function loadCityManifest(): CityManifestEntry[] {
  return loadJson<CityManifestEntry[]>('../data/city-manifest.json', []);
}

function loadSitemapPages(): SitemapPage[] {
  return loadJson<SitemapPage[]>('../data/sitemap-pages.json', []);
}

const STATIC_PAGES: SitemapPage[] = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/services', changefreq: 'weekly', priority: '0.9' },
  { path: '/services/bathroom-renovations', changefreq: 'monthly', priority: '0.8' },
  { path: '/services/shower-installation', changefreq: 'monthly', priority: '0.8' },
  { path: '/services/ceramic-porcelain', changefreq: 'monthly', priority: '0.8' },
  { path: '/services/shower-waterproofing', changefreq: 'monthly', priority: '0.8' },
  { path: '/services/floor-wall-tile', changefreq: 'monthly', priority: '0.8' },
  { path: '/services/commercial-tile', changefreq: 'monthly', priority: '0.8' },
  { path: '/services/locker-rooms', changefreq: 'monthly', priority: '0.8' },
  { path: '/services/backsplashes', changefreq: 'monthly', priority: '0.8' },
  { path: '/services/tile-replacement', changefreq: 'monthly', priority: '0.8' },
  { path: '/services/tile-repair', changefreq: 'monthly', priority: '0.8' },
  { path: '/services/demolition-removal', changefreq: 'monthly', priority: '0.8' },
  { path: '/services/custom-designs', changefreq: 'monthly', priority: '0.8' },
  { path: '/experience', changefreq: 'monthly', priority: '0.8' },
  { path: '/experience/washington-capitals', changefreq: 'monthly', priority: '0.7' },
  { path: '/experience/the-pentagon', changefreq: 'monthly', priority: '0.7' },
  { path: '/experience/orangetheory-fitness', changefreq: 'monthly', priority: '0.7' },
  { path: '/why-portillo', changefreq: 'monthly', priority: '0.7' },
  { path: '/why-portillo/family-owned', changefreq: 'monthly', priority: '0.6' },
  { path: '/why-portillo/professional-experience', changefreq: 'monthly', priority: '0.6' },
  { path: '/why-portillo/attention-to-detail', changefreq: 'monthly', priority: '0.6' },
  { path: '/why-portillo/quality-without-shortcuts', changefreq: 'monthly', priority: '0.6' },
  { path: '/why-portillo/built-to-last', changefreq: 'monthly', priority: '0.6' },
  { path: '/contact', changefreq: 'monthly', priority: '0.9' },
  { path: '/quote-wizard', changefreq: 'monthly', priority: '0.8' },
  { path: '/service-area', changefreq: 'monthly', priority: '0.9' },
  { path: '/faq', changefreq: 'monthly', priority: '0.8' },
  { path: '/before-after', changefreq: 'monthly', priority: '0.7' },
  { path: '/estimate', changefreq: 'monthly', priority: '0.8' },
  { path: '/checklist', changefreq: 'monthly', priority: '0.6' },
  { path: '/cost-guides', changefreq: 'monthly', priority: '0.85' },
  { path: '/materials', changefreq: 'monthly', priority: '0.8' },
  { path: '/blog', changefreq: 'weekly', priority: '0.8' },
  { path: '/blog/category/tile', changefreq: 'weekly', priority: '0.7' },
  { path: '/blog/category/ceramic', changefreq: 'weekly', priority: '0.7' },
  { path: '/blog/category/bathroom', changefreq: 'weekly', priority: '0.7' },
  { path: '/blog/category/bedroom', changefreq: 'weekly', priority: '0.7' },
  { path: '/blog/category/livingroom', changefreq: 'weekly', priority: '0.7' },
];

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function uniquePages(pages: SitemapPage[]): SitemapPage[] {
  const seen = new Set<string>();
  return pages.filter((page) => {
    if (seen.has(page.path)) {
      return false;
    }
    seen.add(page.path);
    return true;
  });
}

function deriveAllPages(): SitemapPage[] {
  const posts = loadBlogManifest();
  const cities = loadCityManifest();
  return [
    ...STATIC_PAGES,
    ...cities.map((city) => ({
      path: city.path,
      changefreq: 'monthly',
      priority: '0.75',
    })),
    ...cities.map((city) => ({
      path: `/cost-guides/${city.slug}`,
      changefreq: 'monthly',
      priority: '0.7',
    })),
    ...posts.map((post) => ({
      path: `/blog/${post.slug}`,
      changefreq: 'monthly',
      priority: '0.6',
      lastmod: post.date,
      imagePath: post.imagePath,
      imageTitle: post.title,
    })),
  ];
}

function resolvePages(): SitemapPage[] {
  const generated = loadSitemapPages();
  return uniquePages([...generated, ...deriveAllPages()]);
}

function buildSitemap(pages: SitemapPage[]): string {
  const body = pages
    .map((page) => {
      const loc = `${SITE_URL}${page.path === '/' ? '/' : page.path}`;
      const parts = [
        '  <url>',
        `    <loc>${escapeXml(loc)}</loc>`,
      ];
      if (page.lastmod) {
        parts.push(`    <lastmod>${page.lastmod}</lastmod>`);
      }
      parts.push(`    <changefreq>${page.changefreq}</changefreq>`);
      parts.push(`    <priority>${page.priority}</priority>`);
      const images =
        page.images && page.images.length > 0
          ? page.images
          : page.imagePath
            ? [{ loc: page.imagePath, title: page.imageTitle }]
            : [];
      images.forEach((image) => {
        if (!image?.loc) {
          return;
        }
        parts.push('    <image:image>');
        parts.push(`      <image:loc>${escapeXml(`${SITE_URL}${image.loc}`)}</image:loc>`);
        if (image.title) {
          parts.push(`      <image:title>${escapeXml(image.title)}</image:title>`);
        }
        parts.push('    </image:image>');
      });
      parts.push('  </url>');
      return parts.join('\n');
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${body}
</urlset>
`;
}

function buildRss(posts: BlogManifestEntry[]): string {
  const items = posts
    .slice(0, 50)
    .map((post) => {
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}/blog/${escapeXml(post.slug)}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${escapeXml(post.slug)}</guid>
      <pubDate>${new Date(`${post.date}T12:00:00Z`).toUTCString()}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
      <category>${escapeXml(post.category)}</category>
    </item>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Portillo Ceramic and Tile Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Tile, ceramic, bathroom, bedroom, and living room tips from Portillo Ceramic and Tile serving Washington D.C., Maryland, Virginia, and West Virginia.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;
}

router.get('/sitemap.xml', (_req: Request, res: Response) => {
  const xml = buildSitemap(resolvePages());
  res.set('Cache-Control', 'public, max-age=3600');
  res.type('application/xml').send(xml);
});

router.get('/rss.xml', (_req: Request, res: Response) => {
  const posts = loadBlogManifest();
  res.set('Cache-Control', 'public, max-age=3600');
  res.type('application/rss+xml').send(buildRss(posts));
});

export default router;
