import { contactInfo } from '../data/content';
import { serviceAreaCities } from '../data/features';

export const SITE_NAME = 'Portillo Ceramic and Tile';
export const SITE_URL =
  import.meta.env.VITE_SITE_URL?.replace(/\/$/, '') || 'https://portilloceramicandtile.com';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/sections/your-space-deserves-the-best.jpg`;

export const LOCAL_SEO = {
  region: 'Washington D.C. Metro',
  regionShort: 'DMV',
  metro: 'Washington, D.C. metro area',
  primaryCities: [
    'Washington, D.C.',
    'Bethesda',
    'Silver Spring',
    'Arlington',
    'Fairfax',
    'Alexandria',
    'Rockville',
    'McLean',
    'Martinsburg',
    'Leesburg',
  ],
  serviceAreaLabel: 'Washington D.C., Maryland, Virginia & West Virginia',
  keywords: [
    'tile installation Washington DC',
    'tile contractor Maryland',
    'ceramic tile installer Virginia',
    'bathroom tile Bethesda MD',
    'shower installation Arlington VA',
    'commercial tile Silver Spring',
    'tile contractor West Virginia',
    'kitchen backsplash Northern Virginia',
    'porcelain tile Rockville MD',
    'tile installer Fairfax VA',
    'tile company Alexandria VA',
    'DMV tile contractor',
  ],
} as const;

export const BUSINESS = {
  name: SITE_NAME,
  legalName: SITE_NAME,
  phone: contactInfo.phone,
  email: contactInfo.email,
  owner: contactInfo.name,
  priceRange: '$$',
  areaServed: serviceAreaCities,
  openingHours: [
    { dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '07:00', closes: '18:00' },
    { dayOfWeek: 'Saturday', opens: '08:00', closes: '14:00' },
  ],
  sameAs: [
    'https://www.facebook.com/',
    'https://www.instagram.com/portilloceramicandtile',
    'https://www.youtube.com/',
  ],
  geo: {
    latitude: 38.8816,
    longitude: -77.1711,
  },
  address: {
    addressLocality: 'Northern Virginia',
    addressRegion: 'VA',
    addressCountry: 'US',
  },
};

export function absoluteUrl(path = '/'): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

export function formatTitle(pageTitle: string): string {
  if (pageTitle.includes(SITE_NAME)) {
    return pageTitle;
  }
  return `${pageTitle} | ${SITE_NAME}`;
}
