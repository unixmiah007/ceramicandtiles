import { Locale } from '../i18n/types';
import { ServiceAreaCity, formatCityLabel, getCityPath } from '../data/service-area-cities';
import { BUSINESS, SITE_URL, absoluteUrl } from './site';
import { SeoConfig, buildBreadcrumbSchema, buildLocalBusinessSchema } from './meta';

function regionName(city: ServiceAreaCity, locale: Locale): string {
  const labels: Record<ServiceAreaCity['region'], { en: string; es: string }> = {
    dc: { en: 'Washington, D.C.', es: 'Washington D.C.' },
    maryland: { en: 'Maryland', es: 'Maryland' },
    virginia: { en: 'Virginia', es: 'Virginia' },
    'west-virginia': { en: 'West Virginia', es: 'Virginia Occidental' },
  };
  return labels[city.region][locale === 'es' ? 'es' : 'en'];
}

function buildCityServiceSchema(city: ServiceAreaCity, locale: Locale) {
  const label = formatCityLabel(city);
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name:
      locale === 'es'
        ? `Instalación de azulejos en ${label}`
        : `Tile installation in ${label}`,
    description:
      locale === 'es'
        ? `Contratista de azulejos y cerámica para baños, duchas, cocinas y proyectos comerciales en ${label}.`
        : `Tile and ceramic contractor for bathrooms, showers, kitchens, and commercial projects in ${label}.`,
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: {
      '@type': city.name.includes('County') ? 'AdministrativeArea' : 'City',
      name: city.name,
      containedInPlace: {
        '@type': 'State',
        name: regionName(city, locale),
      },
    },
    serviceType: 'Tile installation',
  };
}

export function getCitySeo(city: ServiceAreaCity, locale: Locale): SeoConfig {
  const label = formatCityLabel(city);
  const path = getCityPath(city);

  const title =
    locale === 'es'
      ? `Instalación de Azulejos en ${label}`
      : `Tile Installation in ${label}`;

  const description =
    locale === 'es'
      ? `Contratista de azulejos en ${label}. Renovaciones de baños, duchas, pisos, backsplash y proyectos comerciales. Llame al ${BUSINESS.phone} para una cotización.`
      : `Tile contractor in ${label}. Bathroom renovations, showers, floor tile, backsplashes, and commercial projects. Call ${BUSINESS.phone} for a quote.`;

  const keywords =
    locale === 'es'
      ? [
          `instalador de azulejos ${label}`,
          `contratista de azulejos ${city.name}`,
          `renovación de baño ${city.name}`,
          `ducha ${city.name}`,
        ]
      : [
          `tile contractor ${label}`,
          `tile installation ${city.name}`,
          `bathroom tile ${city.name}`,
          `shower installation ${city.name}`,
          `${city.name} tile company`,
        ];

  return {
    title,
    description,
    path,
    keywords,
    jsonLd: [
      buildLocalBusinessSchema(locale),
      buildBreadcrumbSchema([
        { name: locale === 'es' ? 'Inicio' : 'Home', path: '/' },
        {
          name: locale === 'es' ? 'Área de Servicio' : 'Service Area',
          path: '/service-area',
        },
        { name: label, path },
      ]),
      buildCityServiceSchema(city, locale),
    ],
  };
}

export function getCityPathForSlug(slug: string): string {
  return `/service-area/${slug}`;
}

export function absoluteCityUrl(city: ServiceAreaCity): string {
  return absoluteUrl(getCityPath(city));
}
