import { faqItems } from '../data/features';
import { Service, ValueProposition } from '../types';
import { Locale } from '../i18n/types';
import { BUSINESS, LOCAL_SEO, SITE_NAME, SITE_URL, absoluteUrl } from './site';

export interface SeoAlternateLink {
  href: string;
  hreflang?: string;
  type?: string;
  title?: string;
}

export interface SeoArticleMeta {
  publishedTime: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  author?: string;
}

export interface SeoConfig {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  jsonLd?: object | object[];
  ogType?: string;
  ogImage?: string;
  noindex?: boolean;
  article?: SeoArticleMeta;
  alternateLinks?: SeoAlternateLink[];
}

function localSuffix(locale: Locale): string {
  return locale === 'es'
    ? 'Washington D.C., Maryland, Virginia y Virginia Occidental'
    : LOCAL_SEO.serviceAreaLabel;
}

export function buildLocalBusinessSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': `${SITE_URL}/#business`,
    name: BUSINESS.name,
    description:
      locale === 'es'
        ? 'Empresa familiar de instalación de azulejos y cerámica para proyectos residenciales y comerciales en Washington D.C., Maryland, Virginia y Virginia Occidental.'
        : 'Family-owned tile and ceramic installation for residential and commercial projects throughout Washington D.C., Maryland, Virginia, and West Virginia.',
    url: SITE_URL,
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    priceRange: BUSINESS.priceRange,
    image: `${SITE_URL}/favicon.svg`,
    areaServed: BUSINESS.areaServed.map((city) => ({
      '@type': 'City',
      name: city,
    })),
    address: {
      '@type': 'PostalAddress',
      addressLocality: BUSINESS.address.addressLocality,
      addressRegion: BUSINESS.address.addressRegion,
      addressCountry: BUSINESS.address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS.geo.latitude,
      longitude: BUSINESS.geo.longitude,
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
      'Commercial tile',
      'Kitchen backsplash',
      'Ceramic and porcelain tile',
    ],
  };
}

export function buildWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: { '@id': `${SITE_URL}/#business` },
    inLanguage: ['en-US', 'es'],
  };
}

export function buildBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildServiceSchema(service: Service, locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: LOCAL_SEO.serviceAreaLabel,
    serviceType: service.title,
    url: absoluteUrl(`/services/${service.id}`),
    inLanguage: locale === 'es' ? 'es' : 'en-US',
  };
}

export function buildFaqSchema(
  items: { question: string; answer: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function buildAggregateReviewSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#reviews`,
    name: SITE_NAME,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '4',
      bestRating: '5',
    },
    review: [
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Maria G.' },
        reviewRating: { '@type': 'Rating', ratingValue: '5' },
        reviewBody:
          locale === 'es'
            ? 'Abel y su equipo transformaron nuestro baño principal en Arlington.'
            : 'Abel and his team transformed our master bath in Arlington, VA.',
      },
    ],
  };
}

export function getHomeSeo(locale: Locale): SeoConfig {
  const area = localSuffix(locale);
  return {
    title: formatHomeTitle(locale),
    description:
      locale === 'es'
        ? `Instalación profesional de azulejos y cerámica en ${area}. Baños, duchas, pisos, backsplash y proyectos comerciales. Cotización gratis: ${BUSINESS.phone}.`
        : `Professional tile & ceramic installation in ${area}. Bathrooms, showers, floors, backsplashes & commercial projects. Free quotes — call ${BUSINESS.phone}.`,
    path: '/',
    keywords: [...LOCAL_SEO.keywords],
    ogType: 'website',
    jsonLd: [buildLocalBusinessSchema(locale), buildWebsiteSchema(), buildAggregateReviewSchema(locale)],
  };
}

function formatHomeTitle(locale: Locale): string {
  return locale === 'es'
    ? `Instalación de Azulejos — D.C., Maryland, Virginia y Virginia Occidental`
    : `Tile Installation — DC, Maryland, Virginia & West Virginia`;
}

export function getStaticPageSeo(page: string, locale: Locale): SeoConfig | null {
  const area = localSuffix(locale);
  const pages: Record<string, SeoConfig> = {
    services: {
      title:
        locale === 'es'
          ? `Servicios de Azulejos en ${area}`
          : `Tile Installation Services in ${area}`,
      description:
        locale === 'es'
          ? `Servicios de azulejos residenciales y comerciales en ${area}: baños, duchas, pisos, backsplash, impermeabilización y más.`
          : `Residential & commercial tile services in ${area} — bathrooms, showers, floors, backsplashes, waterproofing, locker rooms & more.`,
      path: '/services',
      keywords: ['tile services DMV', 'ceramic tile contractor Maryland', 'commercial tile Washington DC', 'tile installer Virginia'],
      jsonLd: buildBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: locale === 'es' ? 'Servicios' : 'Services', path: '/services' },
      ]),
    },
    experience: {
      title:
        locale === 'es'
          ? `Experiencia en Proyectos de Azulejos en ${area}`
          : `Tile Project Experience in ${area}`,
      description:
        locale === 'es'
          ? `Portafolio de proyectos residenciales y comerciales en ${area}, incluyendo Capital One Arena, el Pentágono y Orangetheory Fitness.`
          : `Portfolio of residential and commercial tile work in ${area}, including Capital One Arena, the Pentagon, and Orangetheory Fitness.`,
      path: '/experience',
    },
    contact: {
      title:
        locale === 'es'
          ? `Solicitar Cotización de Azulejos en ${area}`
          : `Request a Tile Quote in ${area}`,
      description:
        locale === 'es'
          ? `Contacte a Abel Portillo para una cotización de azulejos en ${area}. Llame al ${BUSINESS.phone} o envíe su proyecto en línea.`
          : `Contact Abel Portillo for a tile installation quote in ${area}. Call ${BUSINESS.phone} or submit your project online.`,
      path: '/contact',
    },
    'service-area': {
      title:
        locale === 'es'
          ? `Área de Servicio de Azulejos — ${area}`
          : `Tile Contractor Service Area — ${area}`,
      description:
        locale === 'es'
          ? `Instalamos azulejos en Washington D.C., Maryland (Bethesda, Silver Spring, Rockville), Virginia (Arlington, Fairfax, Alexandria) y Virginia Occidental (Martinsburg, Charles Town).`
          : `We install tile in Washington D.C., Maryland (Bethesda, Silver Spring, Rockville), Virginia (Arlington, Fairfax, Alexandria), and West Virginia (Martinsburg, Charles Town).`,
      path: '/service-area',
      keywords: ['tile contractor near me', 'tile installer Bethesda MD', 'tile company Arlington VA', 'tile contractor Martinsburg WV'],
    },
    faq: {
      title:
        locale === 'es'
          ? `Preguntas Frecuentes sobre Azulejos en ${area}`
          : `Tile Installation FAQ — ${area}`,
      description:
        locale === 'es'
          ? `Respuestas sobre plazos, impermeabilización, cotizaciones y área de servicio para proyectos de azulejos en ${area}.`
          : `Answers about tile project timelines, waterproofing, quotes, and service areas for ${area} homeowners and businesses.`,
      path: '/faq',
    },
    blog: {
      title:
        locale === 'es'
          ? `Consejos de Azulejos para Propietarios en ${area}`
          : `Tile Tips for ${area} Homeowners`,
      description:
        locale === 'es'
          ? `Consejos de selección de azulejos, impermeabilización y mantenimiento para renovaciones en ${area}.`
          : `Tile selection, waterproofing, and renovation planning tips for ${area} homeowners and facility managers.`,
      path: '/blog',
    },
    'before-after': {
      title:
        locale === 'es'
          ? `Galería Antes y Después — Azulejos en ${area}`
          : `Before & After Tile Projects in ${area}`,
      description:
        locale === 'es'
          ? `Vea transformaciones reales de baños, duchas y cocinas con azulejos en Washington D.C., Maryland, Virginia y Virginia Occidental.`
          : `See real bathroom, shower, and kitchen tile transformations across Washington D.C., Maryland, Virginia, and West Virginia.`,
      path: '/before-after',
    },
    estimate: {
      title:
        locale === 'es'
          ? `Calculadora de Costos de Azulejos en ${area}`
          : `Tile Project Cost Estimator — ${area}`,
      description:
        locale === 'es'
          ? `Estime el costo y plazo de backsplash, duchas, baños completos y proyectos comerciales en ${area}.`
          : `Estimate cost and timeline for backsplashes, showers, full bathrooms, and commercial tile in ${area}.`,
      path: '/estimate',
    },
    checklist: {
      title:
        locale === 'es'
          ? `Lista de Preparación para Proyectos de Azulejos`
          : `Tile Project Preparation Checklist`,
      description:
        locale === 'es'
          ? `Prepare su hogar o negocio en ${area} antes, durante y después de la instalación de azulejos.`
          : `Prepare your ${area} home or business before, during, and after tile installation.`,
      path: '/checklist',
    },
    'cost-guides': {
      title:
        locale === 'es'
          ? `Guías de Costo de Azulejos por Ciudad — ${area}`
          : `Tile Cost Guides by City — ${area}`,
      description:
        locale === 'es'
          ? `Rangos típicos de azulejo de baño, ducha y piso en Washington D.C., Maryland, Virginia y Virginia Occidental.`
          : `Typical bathroom, shower, and floor tile costs in Washington D.C., Maryland, Virginia, and West Virginia.`,
      path: '/cost-guides',
      keywords: [
        'bathroom tile cost Northern Virginia',
        'tile installation cost Bethesda',
        'shower tile cost Arlington',
      ],
    },
    materials: {
      title:
        locale === 'es'
          ? `Biblioteca de Materiales de Azulejo — ${area}`
          : `Tile Material Library — ${area}`,
      description:
        locale === 'es'
          ? `Galería de porcelanato, cerámica, mosaicos y looks de piedra con tamaños y fotos de alta resolución. Instalación en ${area}.`
          : `Gallery of porcelain, ceramic, mosaics, and stone-look tile with sizes and high-resolution photos. Installed throughout ${area}.`,
      path: '/materials',
      ogImage: '/images/materials/large-format-porcelain.jpg',
      keywords: [
        'porcelain vs ceramic tile',
        'subway tile sizes',
        'large format porcelain',
        'mosaic tile gallery',
        'zellige tile',
      ],
      jsonLd: buildBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: locale === 'es' ? 'Biblioteca de materiales' : 'Material library', path: '/materials' },
      ]),
    },
    'quote-wizard': {
      title:
        locale === 'es'
          ? `Asistente de Cotización de Azulejos en ${area}`
          : `Tile Quote Wizard — ${area}`,
      description:
        locale === 'es'
          ? `Describa su proyecto de azulejos en ${area} y reciba una cotización personalizada de Portillo Ceramic and Tile.`
          : `Describe your ${area} tile project and receive a personalized quote from Portillo Ceramic and Tile.`,
      path: '/quote-wizard',
    },
    'why-portillo': {
      title:
        locale === 'es'
          ? `Por Qué Elegir Portillo Ceramic and Tile en ${area}`
          : `Why Choose Portillo Ceramic and Tile in ${area}`,
      description:
        locale === 'es'
          ? `Empresa familiar con más de 25 años de experiencia en azulejos residenciales y comerciales en ${area}.`
          : `Family-owned tile craftsmanship with 25+ years of residential and commercial experience in ${area}.`,
      path: '/why-portillo',
    },
  };

  return pages[page] ?? null;
}

const SERVICE_SEO: Record<string, { en: { title: string; description: string }; es: { title: string; description: string } }> = {
  'bathroom-renovations': {
    en: {
      title: 'Bathroom Tile Renovation — DC, MD, VA & WV',
      description: 'Full bathroom tile renovation in Washington D.C., Bethesda, Silver Spring, Arlington, Fairfax, Alexandria, and Martinsburg.',
    },
    es: {
      title: 'Renovación de Baños con Azulejos — D.C., MD, VA y WV',
      description: 'Renovación completa de baños con azulejos en Washington D.C., Bethesda, Silver Spring, Arlington, Fairfax, Alexandria y Martinsburg.',
    },
  },
  'shower-installation': {
    en: {
      title: 'Custom Shower Tile Installation — DC Metro',
      description: 'Walk-in shower tile installation with proper waterproofing across Washington D.C., Maryland, Virginia, and West Virginia.',
    },
    es: {
      title: 'Instalación de Duchas con Azulejos — Área Metropolitana de D.C.',
      description: 'Duchas walk-in con impermeabilización profesional en Washington D.C., Maryland, Virginia y Virginia Occidental.',
    },
  },
  'ceramic-porcelain': {
    en: {
      title: 'Ceramic & Porcelain Tile Installation — DC, MD, VA & WV',
      description: 'Ceramic and porcelain tile for floors, walls, and showers across the Washington D.C. metro and surrounding states.',
    },
    es: {
      title: 'Azulejo Cerámico y Porcelanato — D.C., MD, VA y WV',
      description: 'Instalación de cerámica y porcelanato para pisos, paredes y duchas en el área metropolitana de D.C. y estados cercanos.',
    },
  },
  'shower-waterproofing': {
    en: {
      title: 'Shower Waterproofing Contractor — DC Metro',
      description: 'Professional shower waterproofing and membrane installation in Bethesda, Arlington, Fairfax, Rockville, and surrounding communities.',
    },
    es: {
      title: 'Impermeabilización de Duchas — Área Metropolitana de D.C.',
      description: 'Impermeabilización profesional de duchas en Bethesda, Arlington, Fairfax, Rockville y comunidades cercanas.',
    },
  },
  'floor-wall-tile': {
    en: {
      title: 'Floor & Wall Tile Installation — DC, MD, VA & WV',
      description: 'Precision floor and wall tile installation for homes and businesses throughout the Washington D.C. metro area.',
    },
    es: {
      title: 'Instalación de Pisos y Paredes de Azulejo — D.C., MD, VA y WV',
      description: 'Instalación precisa de azulejos en pisos y paredes para hogares y negocios en el área metropolitana de D.C.',
    },
  },
  'commercial-tile': {
    en: {
      title: 'Commercial Tile Installation — DC, MD, VA & WV',
      description: 'Commercial tile for restrooms, locker rooms, and high-traffic facilities in Washington D.C., Maryland, Virginia, and West Virginia.',
    },
    es: {
      title: 'Azulejos Comerciales — D.C., MD, VA y WV',
      description: 'Azulejos comerciales para baños, vestuarios e instalaciones de alto tráfico en D.C., Maryland, Virginia y Virginia Occidental.',
    },
  },
  'locker-rooms': {
    en: {
      title: 'Locker Room Tile Installation — DC Metro',
      description: 'Durable locker room and fitness facility tile in Leesburg, Reston, Bethesda, Silver Spring, and the greater DMV area.',
    },
    es: {
      title: 'Azulejos para Vestuarios — Área Metropolitana de D.C.',
      description: 'Azulejos duraderos para vestuarios y gimnasios en Leesburg, Reston, Bethesda, Silver Spring y el área del DMV.',
    },
  },
  backsplashes: {
    en: {
      title: 'Kitchen Backsplash Tile — DC, MD & VA',
      description: 'Custom kitchen backsplash tile installation in Bethesda, Silver Spring, Arlington, McLean, Vienna, and Alexandria.',
    },
    es: {
      title: 'Backsplash de Cocina — D.C., MD y VA',
      description: 'Instalación de backsplash de cocina en Bethesda, Silver Spring, Arlington, McLean, Vienna y Alexandria.',
    },
  },
  'tile-replacement': {
    en: {
      title: 'Tile Replacement Services — DC, MD, VA & WV',
      description: 'Replace outdated or damaged tile in bathrooms, kitchens, and floors throughout the Washington D.C. metro area.',
    },
    es: {
      title: 'Reemplazo de Azulejos — D.C., MD, VA y WV',
      description: 'Reemplace azulejos dañados o anticuados en baños, cocinas y pisos en el área metropolitana de D.C.',
    },
  },
  'tile-repair': {
    en: {
      title: 'Tile Repair Contractor — DC, MD, VA & WV',
      description: 'Cracked, loose, or damaged tile repair in Washington D.C., Bethesda, Arlington, Fairfax, Alexandria, and Martinsburg.',
    },
    es: {
      title: 'Reparación de Azulejos — D.C., MD, VA y WV',
      description: 'Reparación de azulejos agrietados o sueltos en Washington D.C., Bethesda, Arlington, Fairfax, Alexandria y Martinsburg.',
    },
  },
  'demolition-removal': {
    en: {
      title: 'Tile Demolition & Removal — DC Metro',
      description: 'Careful tile demolition and surface prep before new installation in homes and businesses across the DMV region.',
    },
    es: {
      title: 'Demolición de Azulejos — Área Metropolitana de D.C.',
      description: 'Demolición cuidadosa y preparación de superficies antes de nueva instalación en la región del DMV.',
    },
  },
  'custom-designs': {
    en: {
      title: 'Custom Tile Design & Installation — DC Metro',
      description: 'Custom tile layouts, patterns, and accent designs for bathrooms, showers, and kitchens across Maryland, Virginia, and D.C.',
    },
    es: {
      title: 'Diseños Personalizados de Azulejos — Área Metropolitana de D.C.',
      description: 'Diseños personalizados de azulejos para baños, duchas y cocinas en Maryland, Virginia y D.C.',
    },
  },
};

export function getServiceSeo(service: Service, locale: Locale): SeoConfig {
  const custom = SERVICE_SEO[service.id]?.[locale === 'es' ? 'es' : 'en'];
  return {
    title: custom?.title ?? `${service.title} — ${LOCAL_SEO.serviceAreaLabel}`,
    description: custom?.description ?? `${service.description} Serving ${LOCAL_SEO.serviceAreaLabel}.`,
    path: `/services/${service.id}`,
    keywords: [service.title.toLowerCase(), ...LOCAL_SEO.keywords.slice(0, 3)],
    jsonLd: [
      buildServiceSchema(service, locale),
      buildBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: locale === 'es' ? 'Servicios' : 'Services', path: '/services' },
        { name: service.title, path: `/services/${service.id}` },
      ]),
    ],
  };
}

export function getValueSeo(value: ValueProposition, locale: Locale): SeoConfig {
  return {
    title: `${value.title} — ${SITE_NAME}`,
    description: `${value.description} Trusted tile contractor serving ${LOCAL_SEO.serviceAreaLabel}.`,
    path: `/why-portillo/${value.id}`,
    jsonLd: buildBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: locale === 'es' ? 'Por Qué Portillo' : 'Why Portillo', path: '/why-portillo' },
      { name: value.title, path: `/why-portillo/${value.id}` },
    ]),
  };
}

export function getFaqSeo(
  locale: Locale,
  items: { question: string; answer: string }[]
): SeoConfig {
  const base = getStaticPageSeo('faq', locale)!;
  return {
    ...base,
    jsonLd: [
      buildFaqSchema(items),
      buildBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: locale === 'es' ? 'Preguntas Frecuentes' : 'FAQ', path: '/faq' },
      ]),
    ],
  };
}

export function getFaqItemsForSchema(_locale: Locale, f: {
  faq: { items: Record<string, string> };
}) {
  return faqItems.map((item) => ({
    question: f.faq.items[item.questionKey as keyof typeof f.faq.items],
    answer: f.faq.items[item.answerKey as keyof typeof f.faq.items],
  }));
}

export function getCaseStudySeo(
  projectName: string,
  location: string,
  description: string,
  projectId: string,
  locale: Locale
): SeoConfig {
  const area = localSuffix(locale);
  return {
    title:
      locale === 'es'
        ? `${projectName} — Caso de Estudio de Azulejos`
        : `${projectName} — Commercial Tile Case Study`,
    description: `${description} Professional tile work in ${location}, serving ${area}.`,
    path: `/experience/${projectId}`,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: projectName,
        description,
        contentLocation: { '@type': 'Place', name: location },
        provider: { '@id': `${SITE_URL}/#business` },
      },
      buildBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: locale === 'es' ? 'Experiencia' : 'Experience', path: '/experience' },
        { name: projectName, path: `/experience/${projectId}` },
      ]),
    ],
  };
}
