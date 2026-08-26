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
  lat: number;
  lng: number;
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

function buildTitle(city: CityRecord): string {
  return `Tile Contractor in ${formatCityLabel(city)} | Bathroom & Shower Tile | ${SITE_NAME}`;
}

function buildDescription(city: CityRecord): string {
  return `Tile contractor in ${formatCityLabel(city)}, ${city.county}. Bathroom remodels, shower tile, floors, backsplashes & commercial work. Free quotes: ${PHONE}.`;
}

function buildKeywords(city: CityRecord): string {
  const label = formatCityLabel(city);
  return [
    `tile contractor ${label}`,
    `tile installation ${city.name} ${city.state}`,
    `bathroom tile ${city.name}`,
    `shower tile installation ${city.name}`,
    `${city.name} tile company`,
    `ceramic tile installer ${city.county}`,
  ].join(', ');
}

function buildJsonLd(city: CityRecord, canonical: string) {
  const label = formatCityLabel(city);
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      url: canonical,
      name: buildTitle(city),
      description: buildDescription(city),
      inLanguage: 'en-US',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'HomeAndConstructionBusiness',
      name: SITE_NAME,
      url: canonical,
      telephone: PHONE,
      areaServed: {
        '@type': 'City',
        name: city.name,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: city.lat,
        longitude: city.lng,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: `Tile installation in ${label}`,
      provider: { name: SITE_NAME },
      areaServed: city.name,
      serviceType: 'Tile installation',
    },
  ];
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function getCitySlugFromPath(requestPath: string): string | null {
  const match = requestPath.match(/^\/service-area\/([^/?#]+)\/?$/);
  return match?.[1] ?? null;
}

export function injectCityHtmlMeta(html: string, requestPath: string): string | null {
  const slug = getCitySlugFromPath(requestPath);
  if (!slug) return null;

  const city = loadCities().get(slug);
  if (!city) return null;

  const canonical = `${SITE_URL}${requestPath.endsWith('/') ? requestPath.slice(0, -1) : requestPath}`;
  const title = buildTitle(city);
  const description = buildDescription(city);
  const keywords = buildKeywords(city);
  const jsonLd = JSON.stringify(buildJsonLd(city, canonical));

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
  output = output.replace(
    /<meta\s+name="geo\.placename"\s+content="[^"]*"\s*\/?>/,
    `<meta name="geo.placename" content="${escapeHtml(formatCityLabel(city))}" />`
  );

  const jsonLdTag = `<script type="application/ld+json" id="ssr-city-jsonld">${jsonLd}</script>`;
  output = output.replace('</head>', `${jsonLdTag}\n  </head>`);

  return output;
}
