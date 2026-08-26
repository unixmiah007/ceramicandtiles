import { Locale } from '../i18n/types';
import {
  ServiceAreaCity,
  formatCityLabel,
  getCityPath,
  replaceCityTokens,
} from '../data/service-area-cities';
import { BUSINESS, DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL, absoluteUrl } from './site';
import { SeoConfig, buildBreadcrumbSchema, buildFaqSchema } from './meta';

export interface CityFaqItem {
  question: string;
  answer: string;
}

function regionName(city: ServiceAreaCity, locale: Locale): string {
  const labels: Record<ServiceAreaCity['region'], { en: string; es: string }> = {
    dc: { en: 'Washington, D.C.', es: 'Washington D.C.' },
    maryland: { en: 'Maryland', es: 'Maryland' },
    virginia: { en: 'Virginia', es: 'Virginia' },
    'west-virginia': { en: 'West Virginia', es: 'Virginia Occidental' },
  };
  return labels[city.region][locale === 'es' ? 'es' : 'en'];
}

function cityPlaceType(city: ServiceAreaCity): 'City' | 'AdministrativeArea' {
  return city.name.includes('County') || city.state === 'DC' ? 'AdministrativeArea' : 'City';
}

function buildCityPlaceSchema(city: ServiceAreaCity, locale: Locale) {
  const label = formatCityLabel(city);
  return {
    '@context': 'https://schema.org',
    '@type': cityPlaceType(city),
    '@id': `${SITE_URL}${getCityPath(city)}#place`,
    name: city.name,
    description:
      locale === 'es'
        ? `Área de servicio de azulejos y cerámica en ${label}.`
        : `Tile and ceramic contractor service area for ${label}.`,
    containedInPlace: {
      '@type': 'AdministrativeArea',
      name: city.county,
      containedInPlace: {
        '@type': 'State',
        name: regionName(city, locale),
      },
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: city.lat,
      longitude: city.lng,
    },
  };
}

function buildCityWebPageSchema(
  city: ServiceAreaCity,
  locale: Locale,
  title: string,
  description: string
) {
  const path = getCityPath(city);
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}${path}#webpage`,
    url: absoluteUrl(path),
    name: title,
    description,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}${path}#place` },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: DEFAULT_OG_IMAGE,
    },
    inLanguage: locale === 'es' ? 'es-US' : 'en-US',
    breadcrumb: { '@id': `${SITE_URL}${path}#breadcrumb` },
  };
}

function buildCityLocalBusinessSchema(city: ServiceAreaCity, locale: Locale) {
  const label = formatCityLabel(city);
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': `${SITE_URL}${getCityPath(city)}#localbusiness`,
    name: SITE_NAME,
    url: absoluteUrl(getCityPath(city)),
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    priceRange: BUSINESS.priceRange,
    image: DEFAULT_OG_IMAGE,
    description:
      locale === 'es'
        ? `Contratista de azulejos y cerámica en ${label} y ${city.county}.`
        : `Tile and ceramic contractor serving ${label} and ${city.county}.`,
    areaServed: {
      '@type': cityPlaceType(city),
      name: city.name,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: city.county,
      },
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: city.lat,
      longitude: city.lng,
    },
    openingHoursSpecification: BUSINESS.openingHours.map((hours) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: hours.dayOfWeek,
      opens: hours.opens,
      closes: hours.closes,
    })),
    sameAs: BUSINESS.sameAs,
    knowsAbout: [
      'Bathroom tile installation',
      'Shower waterproofing',
      'Kitchen backsplash tile',
      'Porcelain and ceramic tile',
      'Commercial restroom tile',
    ],
  };
}

function buildCityServiceSchema(city: ServiceAreaCity, locale: Locale) {
  const label = formatCityLabel(city);
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}${getCityPath(city)}#service`,
    name:
      locale === 'es'
        ? `Instalación de azulejos en ${label}`
        : `Tile installation in ${label}`,
    description:
      locale === 'es'
        ? `Renovaciones de baño, duchas, pisos, backsplash y azulejos comerciales en ${label} y ${city.county}.`
        : `Bathroom renovations, showers, floor tile, backsplashes, and commercial tile in ${label} and ${city.county}.`,
    provider: { '@id': `${SITE_URL}${getCityPath(city)}#localbusiness` },
    areaServed: { '@id': `${SITE_URL}${getCityPath(city)}#place` },
    serviceType: locale === 'es' ? 'Instalación de azulejos' : 'Tile installation',
    url: absoluteUrl(getCityPath(city)),
  };
}

function buildCityServiceListSchema(city: ServiceAreaCity, locale: Locale) {
  const services =
    locale === 'es'
      ? [
          'Renovaciones de baño',
          'Instalación de duchas',
          'Azulejos cerámicos y porcelanato',
          'Azulejos de piso y pared',
          'Backsplash de cocina',
          'Azulejos comerciales',
        ]
      : [
          'Bathroom renovations',
          'Shower installation',
          'Ceramic and porcelain tile',
          'Floor and wall tile',
          'Kitchen backsplashes',
          'Commercial tile',
        ];

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name:
      locale === 'es'
        ? `Servicios de azulejos en ${formatCityLabel(city)}`
        : `Tile services in ${formatCityLabel(city)}`,
    itemListElement: services.map((name, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name,
    })),
  };
}

function buildCityTitle(city: ServiceAreaCity, locale: Locale): string {
  const label = formatCityLabel(city);
  if (locale === 'es') {
    return `Contratista de Azulejos en ${label} | Baños y Duchas`;
  }
  return `Tile Contractor in ${label} | Bathroom & Shower Tile`;
}

function buildCityDescription(city: ServiceAreaCity, locale: Locale): string {
  const label = formatCityLabel(city);
  if (locale === 'es') {
    return `Contratista de azulejos en ${label} (${city.county}). Baños, duchas, pisos, backsplash y proyectos comerciales. Cotización gratis: ${BUSINESS.phone}.`;
  }
  return `Tile contractor in ${label}, ${city.county}. Bathroom remodels, shower tile, floors, backsplashes & commercial work. Free quotes: ${BUSINESS.phone}.`;
}

function buildCityKeywords(city: ServiceAreaCity, locale: Locale): string[] {
  const label = formatCityLabel(city);
  if (locale === 'es') {
    return [
      `contratista de azulejos ${label}`,
      `instalador de azulejos ${city.name}`,
      `azulejos baño ${city.name}`,
      `ducha ${city.name} ${city.state}`,
      `renovación baño ${city.county}`,
      `cerámica ${city.name}`,
      `contratista azulejos cerca de mí ${city.name}`,
    ];
  }
  return [
    `tile contractor ${label}`,
    `tile installation ${city.name} ${city.state}`,
    `bathroom tile ${city.name}`,
    `shower tile installation ${city.name}`,
    `${city.name} tile company`,
    `ceramic tile installer ${city.county}`,
    `tile contractor near me ${city.name}`,
    `kitchen backsplash ${city.name}`,
    `commercial tile ${city.county}`,
  ];
}

export function buildCityFaqItems(
  city: ServiceAreaCity,
  templates: CityFaqItem[]
): CityFaqItem[] {
  return templates.map((item) => ({
    question: replaceCityTokens(item.question, city),
    answer: replaceCityTokens(item.answer, city),
  }));
}

export function getCitySeo(
  city: ServiceAreaCity,
  locale: Locale,
  faqItems: CityFaqItem[] = []
): SeoConfig {
  const path = getCityPath(city);
  const title = buildCityTitle(city, locale);
  const description = buildCityDescription(city, locale);
  const label = formatCityLabel(city);

  const breadcrumbSchema = {
    ...buildBreadcrumbSchema([
      { name: locale === 'es' ? 'Inicio' : 'Home', path: '/' },
      {
        name: locale === 'es' ? 'Área de Servicio' : 'Service Area',
        path: '/service-area',
      },
      { name: label, path },
    ]),
    '@id': `${SITE_URL}${path}#breadcrumb`,
  };

  const jsonLd: object[] = [
    buildCityWebPageSchema(city, locale, title, description),
    breadcrumbSchema,
    buildCityPlaceSchema(city, locale),
    buildCityLocalBusinessSchema(city, locale),
    buildCityServiceSchema(city, locale),
    buildCityServiceListSchema(city, locale),
  ];

  if (faqItems.length > 0) {
    jsonLd.push(buildFaqSchema(faqItems));
  }

  return {
    title,
    description,
    path,
    keywords: buildCityKeywords(city, locale),
    ogImage: DEFAULT_OG_IMAGE,
    jsonLd,
  };
}

export function getCityPathForSlug(slug: string): string {
  return `/service-area/${slug}`;
}

export function absoluteCityUrl(city: ServiceAreaCity): string {
  return absoluteUrl(getCityPath(city));
}
