import { ServiceAreaCity, formatCityLabel } from './service-area-cities';

export const COST_GUIDE_HUB_PATH = '/cost-guides';

export interface CostGuideProject {
  id: string;
  serviceId: string;
  baseMin: number;
  baseMax: number;
}

/** Typical installed ranges for a standard porcelain project before the local multiplier. */
export const COST_GUIDE_PROJECTS: CostGuideProject[] = [
  { id: 'bathroom', serviceId: 'bathroom-renovations', baseMin: 9000, baseMax: 28000 },
  { id: 'shower', serviceId: 'shower-installation', baseMin: 3800, baseMax: 10500 },
  { id: 'backsplash', serviceId: 'backsplashes', baseMin: 900, baseMax: 2800 },
  { id: 'floor', serviceId: 'floor-wall-tile', baseMin: 2200, baseMax: 9000 },
  { id: 'repair', serviceId: 'tile-repair', baseMin: 450, baseMax: 2200 },
  { id: 'commercial', serviceId: 'commercial-tile', baseMin: 12000, baseMax: 45000 },
];

export const COST_GUIDE_SQFT = {
  ceramic: { min: 12, max: 20 },
  porcelain: { min: 16, max: 28 },
  stone: { min: 22, max: 45 },
} as const;

/** Labor, parking, permits, and finish level vary by community. */
export const CITY_COST_MULTIPLIERS: Record<string, number> = {
  'washington-dc': 1.14,
  'bethesda-md': 1.13,
  'silver-spring-md': 1.08,
  'rockville-md': 1.08,
  'gaithersburg-md': 1.05,
  'frederick-md': 1.02,
  'bowie-md': 1.03,
  'college-park-md': 1.04,
  'hyattsville-md': 1.04,
  'laurel-md': 1.03,
  'annapolis-md': 1.07,
  'germantown-md': 1.04,
  'potomac-md': 1.13,
  'chevy-chase-md': 1.14,
  'takoma-park-md': 1.07,
  'wheaton-md': 1.05,
  'arlington-va': 1.11,
  'alexandria-va': 1.1,
  'fairfax-va': 1.08,
  'falls-church-va': 1.1,
  'mclean-va': 1.13,
  'vienna-va': 1.09,
  'reston-va': 1.08,
  'herndon-va': 1.07,
  'leesburg-va': 1.06,
  'sterling-va': 1.06,
  'ashburn-va': 1.07,
  'manassas-va': 1.03,
  'woodbridge-va': 1.03,
  'springfield-va': 1.06,
  'burke-va': 1.06,
  'annandale-va': 1.06,
  'loudoun-county-va': 1.07,
  'prince-william-county-va': 1.03,
  'martinsburg-wv': 0.9,
  'charles-town-wv': 0.92,
  'harpers-ferry-wv': 0.93,
  'shepherdstown-wv': 0.92,
  'ranson-wv': 0.91,
  'inwood-wv': 0.89,
};

export interface CostRange {
  id: string;
  serviceId: string;
  min: number;
  max: number;
}

export interface CityCostGuide {
  multiplier: number;
  projects: CostRange[];
  sqft: {
    ceramic: { min: number; max: number };
    porcelain: { min: number; max: number };
    stone: { min: number; max: number };
  };
}

function roundCost(value: number): number {
  return Math.round(value / 50) * 50;
}

function roundSqft(value: number): number {
  return Math.round(value);
}

export function getCityCostMultiplier(city: ServiceAreaCity): number {
  return CITY_COST_MULTIPLIERS[city.slug] ?? 1;
}

export function getCityCostGuide(city: ServiceAreaCity): CityCostGuide {
  const multiplier = getCityCostMultiplier(city);
  return {
    multiplier,
    projects: COST_GUIDE_PROJECTS.map((project) => ({
      id: project.id,
      serviceId: project.serviceId,
      min: roundCost(project.baseMin * multiplier),
      max: roundCost(project.baseMax * multiplier),
    })),
    sqft: {
      ceramic: {
        min: roundSqft(COST_GUIDE_SQFT.ceramic.min * multiplier),
        max: roundSqft(COST_GUIDE_SQFT.ceramic.max * multiplier),
      },
      porcelain: {
        min: roundSqft(COST_GUIDE_SQFT.porcelain.min * multiplier),
        max: roundSqft(COST_GUIDE_SQFT.porcelain.max * multiplier),
      },
      stone: {
        min: roundSqft(COST_GUIDE_SQFT.stone.min * multiplier),
        max: roundSqft(COST_GUIDE_SQFT.stone.max * multiplier),
      },
    },
  };
}

export function getCostGuidePath(city: ServiceAreaCity): string {
  return `${COST_GUIDE_HUB_PATH}/${city.slug}`;
}

export function formatUsd(value: number, locale = 'en-US'): string {
  return new Intl.NumberFormat(locale === 'es' ? 'es-US' : 'en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatUsdRange(min: number, max: number, locale = 'en-US'): string {
  return `${formatUsd(min, locale)} – ${formatUsd(max, locale)}`;
}

export function bathroomHeadline(city: ServiceAreaCity, locale = 'en'): string {
  const bathroom = getCityCostGuide(city).projects.find((project) => project.id === 'bathroom')!;
  const range = formatUsdRange(bathroom.min, bathroom.max, locale);
  if (locale === 'es') {
    return `El azulejo de baño en ${formatCityLabel(city)} cuesta típicamente ${range}.`;
  }
  return `Bathroom tile in ${formatCityLabel(city)} typically costs ${range}.`;
}
