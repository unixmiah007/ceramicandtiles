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

export function getNearbyCities(city: ServiceAreaCity, limit = 6): ServiceAreaCity[] {
  const regional = citiesByRegion.get(city.region) ?? [];
  const index = regional.findIndex((item) => item.slug === city.slug);
  if (index === -1) {
    return [];
  }

  const nearby: ServiceAreaCity[] = [];
  for (let offset = 1; nearby.length < limit && offset < regional.length; offset += 1) {
    const next = regional[(index + offset) % regional.length];
    if (next.slug !== city.slug) {
      nearby.push(next);
    }
  }
  return nearby;
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
    .replaceAll('{metro}', city.metro);
}

export const SERVICE_AREA_REGION_ORDER: ServiceAreaRegion[] = [
  'dc',
  'maryland',
  'virginia',
  'west-virginia',
];
