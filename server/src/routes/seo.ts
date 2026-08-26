import fs from 'fs';
import path from 'path';
import { Router, Request, Response } from 'express';

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

function loadBlogManifest(): BlogManifestEntry[] {
  const manifestPath = path.join(__dirname, '../data/blog-manifest.json');
  if (!fs.existsSync(manifestPath)) {
    return [];
  }
  return JSON.parse(fs.readFileSync(manifestPath, 'utf8')) as BlogManifestEntry[];
}

const STATIC_PAGES: { path: string; changefreq: string; priority: string }[] = [
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

function buildSitemap(posts: BlogManifestEntry[]): string {
  const urls = [
    ...STATIC_PAGES.map((page) => ({
      loc: `${SITE_URL}${page.path}`,
      changefreq: page.changefreq,
      priority: page.priority,
    })),
    ...posts.map((post) => ({
      loc: `${SITE_URL}/blog/${post.slug}`,
      lastmod: post.date,
      changefreq: 'monthly',
      priority: '0.6',
    })),
  ];

  const body = urls
    .map((url) => {
      const parts = [`  <url>`, `    <loc>${escapeXml(url.loc)}</loc>`];
      if ('lastmod' in url && url.lastmod) {
        parts.push(`    <lastmod>${url.lastmod}</lastmod>`);
      }
      parts.push(`    <changefreq>${url.changefreq}</changefreq>`);
      parts.push(`    <priority>${url.priority}</priority>`);
      parts.push(`  </url>`);
      return parts.join('\n');
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
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
  const posts = loadBlogManifest();
  res.type('application/xml').send(buildSitemap(posts));
});

router.get('/rss.xml', (_req: Request, res: Response) => {
  const posts = loadBlogManifest();
  res.type('application/rss+xml').send(buildRss(posts));
});

export default router;
