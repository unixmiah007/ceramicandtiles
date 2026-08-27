import { formatCityLabel, type ServiceAreaCity } from '../data/service-area-cities';
import { formatUsdRange, getCityCostGuide, getCostGuidePath } from '../data/cost-guides';
import { Locale } from '../i18n/types';
import { BUSINESS, LOCAL_SEO, SITE_NAME, SITE_URL, absoluteUrl } from './site';
import { SeoConfig, buildBreadcrumbSchema, buildFaqSchema } from './meta';

export function getCostGuidesHubSeo(locale: Locale): SeoConfig {
  const area = LOCAL_SEO.serviceAreaLabel;
  const title =
    locale === 'es'
      ? `Guías de Costo de Azulejos por Ciudad — ${area}`
      : `Tile Cost Guides by City — ${area}`;
  const description =
    locale === 'es'
      ? `Vea rangos típicos de costo de azulejo de baño, ducha, backsplash y piso en Washington D.C., Maryland, Virginia y Virginia Occidental.`
      : `Typical bathroom, shower, backsplash, and floor tile costs in Washington D.C., Maryland, Virginia, and West Virginia. Local ranges for each community we serve.`;

  return {
    title,
    description,
    path: '/cost-guides',
    keywords: [
      'bathroom tile cost Northern Virginia',
      'tile installation cost Bethesda MD',
      'shower tile cost Arlington VA',
      'tile cost Washington DC',
    ],
    jsonLd: [
      buildBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: locale === 'es' ? 'Guías de costo' : 'Cost guides', path: '/cost-guides' },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: title,
        url: absoluteUrl('/cost-guides'),
        description,
        about: {
          '@type': 'HomeAndConstructionBusiness',
          name: SITE_NAME,
          telephone: BUSINESS.phone,
        },
      },
    ],
  };
}

export function getCityCostGuideSeo(
  city: ServiceAreaCity,
  locale: Locale,
  faqItems: { question: string; answer: string }[]
): SeoConfig {
  const label = formatCityLabel(city);
  const guide = getCityCostGuide(city);
  const bathroom = guide.projects.find((project) => project.id === 'bathroom')!;
  const range = formatUsdRange(bathroom.min, bathroom.max, locale);
  const path = getCostGuidePath(city);
  const title =
    locale === 'es'
      ? `Costo de Azulejo de Baño en ${label} | ${SITE_NAME}`
      : `Bathroom Tile Cost in ${label} | ${SITE_NAME}`;
  const description =
    locale === 'es'
      ? `El azulejo de baño en ${label} cuesta típicamente ${range} instalado. Rangos para duchas, backsplash, pisos y trabajo comercial. Cotización gratis: ${BUSINESS.phone}.`
      : `Bathroom tile in ${label} typically costs ${range} installed. See shower, backsplash, floor, and commercial ranges. Free quotes: ${BUSINESS.phone}.`;

  return {
    title,
    description,
    path,
    keywords: [
      `bathroom tile cost ${label}`,
      `tile installation cost ${city.name}`,
      `shower tile cost ${city.name} ${city.state}`,
      `how much does tile cost in ${city.name}`,
    ],
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${SITE_URL}${path}#webpage`,
        url: absoluteUrl(path),
        name: title,
        description,
      },
      buildBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: locale === 'es' ? 'Guías de costo' : 'Cost guides', path: '/cost-guides' },
        { name: label, path },
      ]),
      buildFaqSchema(faqItems),
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: `Tile installation in ${label}`,
        provider: { '@id': `${SITE_URL}/#business` },
        areaServed: { '@type': 'City', name: city.name },
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'USD',
          lowPrice: bathroom.min,
          highPrice: bathroom.max,
          offerCount: guide.projects.length,
        },
      },
    ],
  };
}
