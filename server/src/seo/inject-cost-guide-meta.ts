import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_URL = (process.env.SITE_URL || 'https://ceramicandtile.com').replace(/\/$/, '');
const SITE_NAME = 'Portillo Ceramic and Tile';
const PHONE = '703-867-0742';

interface CityRecord {
  slug: string;
  name: string;
  state: string;
  county: string;
}

let cityCache: Map<string, CityRecord> | null = null;

function loadCities(): Map<string, CityRecord> {
  if (cityCache) return cityCache;
  const filePath = path.join(__dirname, '../data/service-area-cities.json');
  if (!fs.existsSync(filePath)) {
    cityCache = new Map();
    return cityCache;
  }
  const cities = JSON.parse(fs.readFileSync(filePath, 'utf8')) as CityRecord[];
  cityCache = new Map(cities.map((city) => [city.slug, city]));
  return cityCache;
}

function formatCityLabel(city: CityRecord): string {
  return city.state === 'DC' ? city.name : `${city.name}, ${city.state}`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function getCostGuideSlugFromPath(requestPath: string): string | null {
  const match = requestPath.match(/^\/cost-guides\/([^/?#]+)\/?$/);
  return match?.[1] ?? null;
}

export function injectCostGuideHtmlMeta(html: string, requestPath: string): string | null {
  const slug = getCostGuideSlugFromPath(requestPath);
  if (!slug) return null;

  const city = loadCities().get(slug);
  if (!city) return null;

  const label = formatCityLabel(city);
  const canonical = `${SITE_URL}${requestPath.endsWith('/') ? requestPath.slice(0, -1) : requestPath}`;
  const title = `Bathroom Tile Cost in ${label} | ${SITE_NAME}`;
  const description = `Bathroom tile in ${label} typically costs a local installed range based on size and material. See shower, backsplash, floor, and commercial tile costs. Free quotes: ${PHONE}.`;
  const keywords = [
    `bathroom tile cost ${label}`,
    `tile installation cost ${city.name}`,
    `shower tile cost ${city.name}`,
  ].join(', ');

  let output = html;
  output = output.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`);
  output = output.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${escapeHtml(description)}" />`
  );
  output = output.replace(
    /<meta\s+name="keywords"\s+content="[^"]*"\s*\/?>/,
    `<meta name="keywords" content="${escapeHtml(keywords)}" />`
  );
  output = output.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${escapeHtml(canonical)}" />`
  );
  output = output.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${escapeHtml(title)}" />`
  );
  output = output.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${escapeHtml(description)}" />`
  );
  output = output.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${escapeHtml(canonical)}" />`
  );

  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: canonical,
    name: title,
    description,
  });
  output = output.replace('</head>', `<script type="application/ld+json" id="ssr-cost-guide-jsonld">${jsonLd}</script>\n  </head>`);

  return output;
}
