import { imagePath } from '../utils/slugify';

export interface StockImage {
  src: string;
  alt: string;
}

export interface HeroSlide {
  id: string;
  image: StockImage;
  headline: string;
  subtitle: string;
}

export interface DetailImages {
  hero: StockImage;
  featured: StockImage;
  gallery: StockImage[];
}

export const FALLBACK_IMAGE: StockImage = {
  src: imagePath('fallback', 'default-tile-installation'),
  alt: 'Professional ceramic and tile installation',
};

function image(category: string, heading: string, alt = heading): StockImage {
  return {
    src: imagePath(category, heading),
    alt,
  };
}

function nestedImage(
  category: 'services' | 'values',
  parentId: string,
  heading: string,
  alt = heading
): StockImage {
  return {
    src: imagePath(category, parentId, heading),
    alt,
  };
}

export function getServiceImage(serviceId: string, title: string): StockImage {
  return nestedImage('services', serviceId, title, title);
}

export function getServiceSectionImage(serviceId: string, heading: string): StockImage {
  return nestedImage('services', serviceId, heading, heading);
}

export function getValueImage(valueId: string, title: string): StockImage {
  return nestedImage('values', valueId, title, title);
}

export function getValueSectionImage(valueId: string, heading: string): StockImage {
  return nestedImage('values', valueId, heading, heading);
}

export function getServiceDetailImages(
  serviceId: string,
  title: string,
  sectionHeadings: string[]
): DetailImages {
  return {
    hero: getServiceImage(serviceId, title),
    featured: getServiceImage(serviceId, title),
    gallery: sectionHeadings.map((heading) => getServiceSectionImage(serviceId, heading)),
  };
}

export function getValueDetailImages(
  valueId: string,
  title: string,
  sectionHeadings: string[]
): DetailImages {
  return {
    hero: getValueImage(valueId, title),
    featured: getValueImage(valueId, title),
    gallery: sectionHeadings.map((heading) => getValueSectionImage(valueId, heading)),
  };
}

export const heroSlides: HeroSlide[] = [
  {
    id: 'transforming-spaces',
    image: image('hero', 'Transforming Spaces', 'Modern bathroom renovation with elegant tile installation'),
    headline: 'Transforming Spaces.',
    subtitle: 'Beautiful tile work that elevates every room.',
  },
  {
    id: 'creating-quality',
    image: image('hero', 'Creating Quality', 'Luxury shower with precision ceramic tile and glass enclosure'),
    headline: 'Creating Quality.',
    subtitle: 'Precision installation from waterproofing to finishing.',
  },
  {
    id: 'building-trust',
    image: image('hero', 'Building Trust', 'Professional commercial interior with quality tile flooring'),
    headline: 'Building Trust.',
    subtitle: 'Trusted by homeowners and professional facilities alike.',
  },
];

export const processStepImages: Record<string, StockImage> = {
  demolition: image('process', 'Demolition and Preparation', 'Construction worker using a jackhammer for demolition and site preparation'),
  waterproofing: image(
    'process',
    'Waterproofing',
    'Construction worker applying waterproofing material with a spray gun'
  ),
  installation: image('process', 'Installation', 'Ceramic tile being precisely installed on a wall surface'),
  finishing: image('process', 'Grout and Finishing', 'Finished bathroom with clean grout lines and polished tile'),
};

export const galleryImages: StockImage[] = [
  image('gallery', 'Spa-like bathroom with floor-to-ceiling tile'),
  image('gallery', 'Kitchen with ceramic tile backsplash'),
  image('gallery', 'Designer shower with geometric tile pattern'),
  image('gallery', 'Large-format floor tile in open living space'),
  image('gallery', 'Walk-in shower with marble-look porcelain tile'),
  image('gallery', 'Detailed mosaic tile accent wall'),
];

export const pageHeroImages: Record<string, StockImage> = {
  experience: image('pages', 'Experience You Can Trust', 'Commercial interior showcasing professional tile installation'),
  services: image('pages', 'Our Services', 'Ceramic tile materials for professional installation'),
  'why-portillo': image('pages', 'Why Portillo', 'Skilled craftsman working on a tile installation project'),
  contact: image('pages', 'Request a Quote Today', 'Beautiful tiled bathroom ready for a new project consultation'),
};

export const sectionImages = {
  craftsmanship: image('sections', 'Craftsmanship You Can See', 'Tile craftsman measuring and cutting ceramic tile'),
  residential: image('sections', 'Residential Projects', 'Residential bathroom renovation with new tile'),
  commercial: image('sections', 'Commercial Projects', 'Commercial facility with professional tile flooring'),
  contactSide: image('sections', 'Contact Abel Portillo', 'Finished tile bathroom showcasing quality craftsmanship'),
  ctaBackground: image('sections', 'Your Vision. Our Craftsmanship.', 'Elegant tiled shower as inspiration for your project'),
  whyPortillo: image('sections', 'Precision Shower Tile', 'Close-up of precision shower tile installation'),
  yourSpaceDeservesTheBest: image('sections', 'Your Space Deserves the Best', 'Beautiful bathroom tile installation'),
};

export const projectImages: Record<string, StockImage> = {
  'washington-capitals': image(
    'projects',
    'Washington Capitals – Capital One Arena',
    'Professional sports facility locker room with tile finishes'
  ),
  'the-pentagon': image('projects', 'The Pentagon', 'Government building interior with commercial tile restrooms'),
  'orangetheory-fitness': image(
    'projects',
    'Orangetheory Fitness',
    'Fitness facility locker room with high-traffic tile flooring'
  ),
};
