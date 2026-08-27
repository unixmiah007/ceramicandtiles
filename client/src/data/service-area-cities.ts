import citiesData from './service-area-cities.json';

export type ServiceAreaRegion = 'dc' | 'maryland' | 'virginia' | 'west-virginia';

export interface ServiceAreaCity {
  slug: string;
  name: string;
  state: 'DC' | 'MD' | 'VA' | 'WV';
  region: ServiceAreaRegion;
  county: string;
  metro: string;
  lat: number;
  lng: number;
}

export const SERVICE_AREA_CITIES = citiesData as ServiceAreaCity[];

/** @deprecated Use SERVICE_AREA_CITIES — kept for schema and legacy references. */
export const serviceAreaCities = SERVICE_AREA_CITIES.map((city) => city.name);

export const FEATURED_CITY_SERVICE_IDS = [
  'bathroom-renovations',
  'shower-installation',
  'ceramic-porcelain',
  'floor-wall-tile',
  'backsplashes',
  'commercial-tile',
] as const;

export const CITY_RELATED_BLOG_SLUGS = [
  'master-bathroom-renovation-planning-guide',
  'walk-in-shower-design-ideas',
  'schluter-vs-traditional-waterproofing-for-tile-projects',
] as const;

const citiesBySlug = new Map(SERVICE_AREA_CITIES.map((city) => [city.slug, city]));

const citiesByRegion = SERVICE_AREA_CITIES.reduce<Map<ServiceAreaRegion, ServiceAreaCity[]>>(
  (groups, city) => {
    const list = groups.get(city.region) ?? [];
    list.push(city);
    groups.set(city.region, list);
    return groups;
  },
  new Map()
);

export function getCityBySlug(slug: string | undefined): ServiceAreaCity | undefined {
  if (!slug) return undefined;
  return citiesBySlug.get(slug);
}

export function getCityPath(city: ServiceAreaCity): string {
  return `/service-area/${city.slug}`;
}

export function formatCityLabel(city: ServiceAreaCity): string {
  if (city.state === 'DC') {
    return city.name;
  }
  return `${city.name}, ${city.state}`;
}

function toRad(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

function distanceMiles(from: ServiceAreaCity, to: ServiceAreaCity): number {
  const earthMiles = 3958.8;
  const dLat = toRad(to.lat - from.lat);
  const dLng = toRad(to.lng - from.lng);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(from.lat)) * Math.cos(toRad(to.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * earthMiles * Math.asin(Math.min(1, Math.sqrt(a)));
}

export function getNearbyCities(city: ServiceAreaCity, limit = 6): ServiceAreaCity[] {
  return SERVICE_AREA_CITIES.filter((item) => item.slug !== city.slug)
    .sort((left, right) => distanceMiles(city, left) - distanceMiles(city, right))
    .slice(0, limit);
}

export function getCityMapUrls(city: ServiceAreaCity): { embedSrc: string; openUrl: string } {
  const isCounty = city.slug.includes('county');
  const latSpan = isCounty ? 0.2 : city.state === 'DC' ? 0.11 : 0.09;
  const lngSpan = isCounty ? 0.28 : city.state === 'DC' ? 0.16 : 0.13;
  const minLat = city.lat - latSpan;
  const maxLat = city.lat + latSpan;
  const minLng = city.lng - lngSpan;
  const maxLng = city.lng + lngSpan;
  const bbox = [minLng, minLat, maxLng, maxLat].map((value) => value.toFixed(5)).join('%2C');
  const zoom = isCounty ? 11 : 13;

  return {
    embedSrc: `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${city.lat}%2C${city.lng}`,
    openUrl: `https://www.openstreetmap.org/?mlat=${city.lat}&mlon=${city.lng}#map=${zoom}/${city.lat}/${city.lng}`,
  };
}

export function getCitiesByRegion(region: ServiceAreaRegion): ServiceAreaCity[] {
  return citiesByRegion.get(region) ?? [];
}

export function replaceCityTokens(template: string, city: ServiceAreaCity): string {
  return template
    .replaceAll('{city}', city.name)
    .replaceAll('{cityState}', formatCityLabel(city))
    .replaceAll('{state}', city.state)
    .replaceAll('{region}', city.region)
    .replaceAll('{county}', city.county)
    .replaceAll('{metro}', city.metro)
    .replaceAll('{slug}', city.slug);
}

export const SERVICE_AREA_REGION_ORDER: ServiceAreaRegion[] = [
  'dc',
  'maryland',
  'virginia',
  'west-virginia',
];
