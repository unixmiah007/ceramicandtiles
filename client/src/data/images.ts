export interface StockImage {
  src: string;
  alt: string;
  credit?: string;
}

export interface HeroSlide {
  id: string;
  image: StockImage;
  headline: string;
  subtitle: string;
}

const pexels = (id: number, width = 1600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;

const unsplash = (photoId: string, width = 1600) =>
  `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=${width}&q=80`;

// Verified working Unsplash IDs (checked via HTTP)
const u = {
  bathroomModern: '1600607687939-ce8a6c25118c',
  bathroomLuxury: '1620626011761-996317b8d101',
  bathroomBright: '1600566753190-17f0baa2a6c3',
  bathroomTile: '1552321554-5fefe8c9ef14',
  kitchenTile: '1556911220-bff31c812dba',
  commercialOffice: '1497366216548-37526070297c',
  constructionPlan: '1503387762-592deb58ef4e',
  designerBath: '1600585154340-be6161a56a0c',
  homeInterior: '1560518883-ce09059eeffa',
  constructionSite: '1558618666-fcd25c85cd64',
} as const;

// Verified working Pexels IDs (checked via HTTP)
const p = {
  bathroomRenovation: 6580700,
  bathroomTiles: 1080721,
  bathroomSpa: 1457842,
  bathroomModern: 271816,
  bathroomRemodel: 1454805,
  bathroomDetail: 11053437,
  showerTile: 6580702,
  showerModern: 6580704,
  showerLuxury: 6585758,
  kitchenBacksplash: 1571460,
  kitchenModern: 2219026,
  tileSamples: 7534390,
  tileFloor: 6527032,
  tilePattern: 7534391,
  tileWall: 6580703,
  tileDetail: 6580701,
  tileDesign: 1457847,
  commercialInterior: 5691646,
  commercialSpace: 1910472,
  commercialLobby: 1910482,
  constructionWorker: 5824906,
  constructionSite: 5824516,
  renovationDemo: 6492405,
  craftsmanWork: 3862130,
  tileInstall: 3862131,
  interiorBuild: 3862132,
  facilityFloor: 3862134,
  lockerRoom: 6580705,
  gymFacility: 6580706,
  officeRestroom: 1910488,
  buildingInterior: 1910491,
  mosaicDetail: 6580707,
  groutFinish: 6580708,
  customPattern: 6580709,
  luxuryFinish: 6580710,
  warmBath: 1457844,
  cleanBath: 1457845,
  toolWork: 3862135,
  projectSite: 3862136,
} as const;

export const heroSlides: HeroSlide[] = [
  {
    id: 'transforming-spaces',
    image: {
      src: pexels(p.bathroomRenovation),
      alt: 'Modern bathroom renovation with elegant tile installation',
    },
    headline: 'Transforming Spaces.',
    subtitle: 'Beautiful tile work that elevates every room.',
  },
  {
    id: 'creating-quality',
    image: {
      src: unsplash(u.bathroomLuxury),
      alt: 'Luxury shower with precision ceramic tile and glass enclosure',
    },
    headline: 'Creating Quality.',
    subtitle: 'Precision installation from waterproofing to finishing.',
  },
  {
    id: 'building-trust',
    image: {
      src: unsplash(u.commercialOffice),
      alt: 'Professional commercial interior with quality tile flooring',
    },
    headline: 'Building Trust.',
    subtitle: 'Trusted by homeowners and professional facilities alike.',
  },
];

export const processStepImages: Record<string, StockImage> = {
  demolition: {
    src: pexels(p.renovationDemo, 800),
    alt: 'Interior renovation and demolition preparation for new tile',
  },
  waterproofing: {
    src: pexels(p.showerTile, 800),
    alt: 'Shower area prepared with waterproof tile backing',
  },
  installation: {
    src: pexels(p.tileInstall, 800),
    alt: 'Ceramic tile being precisely installed on a wall surface',
  },
  finishing: {
    src: unsplash(u.bathroomTile, 800),
    alt: 'Finished bathroom with clean grout lines and polished tile',
  },
};

export const serviceImages: Record<string, StockImage> = {
  'bathroom-renovations': {
    src: pexels(p.bathroomRemodel, 600),
    alt: 'Renovated bathroom with modern ceramic tile',
  },
  'shower-installation': {
    src: pexels(p.showerLuxury, 600),
    alt: 'Custom walk-in shower with tile walls',
  },
  'ceramic-porcelain': {
    src: pexels(p.tileSamples, 600),
    alt: 'Assorted ceramic and porcelain tile samples',
  },
  'shower-waterproofing': {
    src: pexels(p.showerModern, 600),
    alt: 'Shower enclosure with professional waterproof tile work',
  },
  'floor-wall-tile': {
    src: pexels(p.tileFloor, 600),
    alt: 'Floor and wall tile installed in a bright interior',
  },
  'commercial-tile': {
    src: pexels(p.commercialLobby, 600),
    alt: 'Commercial building interior with professional tile flooring',
  },
  'locker-rooms': {
    src: pexels(p.lockerRoom, 600),
    alt: 'Locker room facility with durable tile surfaces',
  },
  'backsplashes': {
    src: pexels(p.kitchenBacksplash, 600),
    alt: 'Kitchen backsplash with decorative ceramic tile',
  },
  'tile-replacement': {
    src: unsplash(u.designerBath, 600),
    alt: 'Contemporary bathroom after tile replacement',
  },
  'tile-repair': {
    src: pexels(p.groutFinish, 600),
    alt: 'Detailed tile and grout repair work',
  },
  'demolition-removal': {
    src: pexels(p.constructionSite, 600),
    alt: 'Interior renovation and demolition preparation',
  },
  'custom-designs': {
    src: pexels(p.customPattern, 600),
    alt: 'Custom tile pattern in a designer bathroom',
  },
};

export const projectImages: Record<string, StockImage> = {
  'washington-capitals': {
    src: pexels(p.gymFacility, 900),
    alt: 'Professional sports facility locker room with tile finishes',
  },
  'the-pentagon': {
    src: pexels(p.commercialSpace, 900),
    alt: 'Government building interior with commercial tile restrooms',
  },
  'orangetheory-fitness': {
    src: pexels(p.lockerRoom, 900),
    alt: 'Fitness facility locker room with high-traffic tile flooring',
  },
};

export const pageHeroImages: Record<string, StockImage> = {
  experience: {
    src: pexels(p.commercialInterior, 1600),
    alt: 'Commercial interior showcasing professional tile installation',
  },
  services: {
    src: pexels(p.tileWall, 1600),
    alt: 'Ceramic tile materials for professional installation',
  },
  'why-portillo': {
    src: pexels(p.craftsmanWork, 1600),
    alt: 'Skilled craftsman working on a tile installation project',
  },
  contact: {
    src: unsplash(u.bathroomModern, 1600),
    alt: 'Beautiful tiled bathroom ready for a new project consultation',
  },
};

export const galleryImages: StockImage[] = [
  {
    src: unsplash(u.designerBath, 800),
    alt: 'Spa-like bathroom with floor-to-ceiling tile',
  },
  {
    src: pexels(p.kitchenModern, 800),
    alt: 'Kitchen with ceramic tile backsplash',
  },
  {
    src: pexels(p.luxuryFinish, 800),
    alt: 'Designer shower with geometric tile pattern',
  },
  {
    src: pexels(p.tilePattern, 800),
    alt: 'Large-format floor tile in open living space',
  },
  {
    src: unsplash(u.bathroomLuxury, 800),
    alt: 'Walk-in shower with marble-look porcelain tile',
  },
  {
    src: pexels(p.mosaicDetail, 800),
    alt: 'Detailed mosaic tile accent wall',
  },
];

export const sectionImages = {
  craftsmanship: {
    src: pexels(p.craftsmanWork, 900),
    alt: 'Tile craftsman measuring and cutting ceramic tile',
  },
  residential: {
    src: pexels(p.warmBath, 900),
    alt: 'Residential bathroom renovation with new tile',
  },
  commercial: {
    src: pexels(p.officeRestroom, 900),
    alt: 'Commercial facility with professional tile flooring',
  },
  contactSide: {
    src: unsplash(u.bathroomTile, 900),
    alt: 'Finished tile bathroom showcasing quality craftsmanship',
  },
  ctaBackground: {
    src: pexels(p.showerLuxury, 1600),
    alt: 'Elegant tiled shower as inspiration for your project',
  },
  whyPortillo: {
    src: pexels(p.bathroomTiles, 900),
    alt: 'Close-up of precision shower tile installation',
  },
};

export const valueIcons: Record<string, StockImage> = {
  'family-owned': {
    src: pexels(p.warmBath, 400),
    alt: 'Warm residential tile space reflecting family craftsmanship',
  },
  'professional-experience': {
    src: pexels(p.commercialSpace, 400),
    alt: 'Commercial tile project demonstrating professional experience',
  },
  'attention-to-detail': {
    src: pexels(p.mosaicDetail, 400),
    alt: 'Intricate tile pattern showing attention to detail',
  },
  'quality-without-shortcuts': {
    src: pexels(p.tileSamples, 400),
    alt: 'Premium ceramic materials selected for quality results',
  },
  'built-to-last': {
    src: pexels(p.tileFloor, 400),
    alt: 'Durable floor tile built for everyday use',
  },
};

export interface ValueDetailImages {
  hero: StockImage;
  featured: StockImage;
  gallery: StockImage[];
}

export const serviceDetailImages: Record<string, ValueDetailImages> = {
  'bathroom-renovations': {
    hero: { src: pexels(p.bathroomRemodel, 1600), alt: 'Complete bathroom renovation with ceramic tile' },
    featured: { src: pexels(p.warmBath, 900), alt: 'Renovated residential bathroom tile finishes' },
    gallery: [
      { src: pexels(p.cleanBath, 800), alt: 'Modern bathroom floor and wall tile' },
      { src: unsplash(u.bathroomModern, 800), alt: 'Updated bathroom with porcelain tile surfaces' },
      { src: pexels(p.bathroomSpa, 800), alt: 'Spa-style bathroom renovation tile work' },
    ],
  },
  'shower-installation': {
    hero: { src: pexels(p.showerLuxury, 1600), alt: 'Custom walk-in shower tile installation' },
    featured: { src: pexels(p.showerModern, 900), alt: 'Shower renovation with wall and floor tile' },
    gallery: [
      { src: pexels(p.showerTile, 800), alt: 'Shower wall tile with clean grout lines' },
      { src: unsplash(u.bathroomLuxury, 800), alt: 'Luxury shower enclosure with ceramic tile' },
      { src: pexels(p.luxuryFinish, 800), alt: 'Finished shower tile with glass enclosure' },
    ],
  },
  'ceramic-porcelain': {
    hero: { src: pexels(p.tileSamples, 1600), alt: 'Ceramic and porcelain tile samples for installation' },
    featured: { src: pexels(p.tileWall, 900), alt: 'Porcelain wall tile installation in progress' },
    gallery: [
      { src: pexels(p.tileFloor, 800), alt: 'Porcelain floor tile in a bright interior' },
      { src: pexels(p.tilePattern, 800), alt: 'Patterned ceramic tile layout' },
      { src: pexels(p.tileDetail, 800), alt: 'Detailed ceramic tile on a bathroom wall' },
    ],
  },
  'shower-waterproofing': {
    hero: { src: pexels(p.showerTile, 1600), alt: 'Shower waterproofing and tile preparation' },
    featured: { src: pexels(p.showerModern, 900), alt: 'Wet-area shower tile backing and waterproofing' },
    gallery: [
      { src: pexels(p.renovationDemo, 800), alt: 'Shower area prepared for waterproof tile install' },
      { src: pexels(p.tileInstall, 800), alt: 'Professional shower substrate preparation' },
      { src: unsplash(u.bathroomBright, 800), alt: 'Waterproofed shower space ready for tile' },
    ],
  },
  'floor-wall-tile': {
    hero: { src: pexels(p.tileFloor, 1600), alt: 'Professional floor tile installation' },
    featured: { src: pexels(p.bathroomTiles, 900), alt: 'Coordinated floor and wall tile in a bathroom' },
    gallery: [
      { src: pexels(p.tileWall, 800), alt: 'Wall tile installation with even spacing' },
      { src: pexels(p.tilePattern, 800), alt: 'Floor tile layout in an open interior' },
      { src: unsplash(u.bathroomTile, 800), alt: 'Bathroom floor and wall tile combination' },
    ],
  },
  'commercial-tile': {
    hero: { src: pexels(p.commercialLobby, 1600), alt: 'Commercial tile installation in a professional building' },
    featured: { src: pexels(p.commercialSpace, 900), alt: 'Commercial interior with durable tile flooring' },
    gallery: [
      { src: pexels(p.officeRestroom, 800), alt: 'Commercial restroom tile surfaces' },
      { src: unsplash(u.commercialOffice, 800), alt: 'Office facility with professional tile work' },
      { src: pexels(p.facilityFloor, 800), alt: 'High-traffic commercial floor tile' },
    ],
  },
  'locker-rooms': {
    hero: { src: pexels(p.lockerRoom, 1600), alt: 'Locker room tile built for high-traffic use' },
    featured: { src: pexels(p.gymFacility, 900), alt: 'Athletic facility locker room tile installation' },
    gallery: [
      { src: pexels(p.lockerRoom, 800), alt: 'Fitness locker room ceramic tile floors' },
      { src: pexels(p.gymFacility, 800), alt: 'Sports facility tile in wet areas' },
      { src: pexels(p.facilityFloor, 800), alt: 'Durable locker room floor tile' },
    ],
  },
  'backsplashes': {
    hero: { src: pexels(p.kitchenBacksplash, 1600), alt: 'Kitchen backsplash ceramic tile installation' },
    featured: { src: pexels(p.kitchenModern, 900), alt: 'Modern kitchen with decorative backsplash tile' },
    gallery: [
      { src: unsplash(u.kitchenTile, 800), alt: 'Kitchen wall tile backsplash detail' },
      { src: pexels(p.customPattern, 800), alt: 'Decorative backsplash tile pattern' },
      { src: pexels(p.bathroomDetail, 800), alt: 'Bathroom vanity backsplash tile' },
    ],
  },
  'tile-replacement': {
    hero: { src: unsplash(u.designerBath, 1600), alt: 'Bathroom after complete tile replacement' },
    featured: { src: pexels(p.bathroomRenovation, 900), alt: 'Fresh tile surfaces replacing outdated materials' },
    gallery: [
      { src: pexels(p.cleanBath, 800), alt: 'Updated bathroom tile replacement result' },
      { src: pexels(p.warmBath, 800), alt: 'Replaced floor and wall tile in a bathroom' },
      { src: unsplash(u.bathroomModern, 800), alt: 'Modern tile replacement in a residential bath' },
    ],
  },
  'tile-repair': {
    hero: { src: pexels(p.groutFinish, 1600), alt: 'Tile and grout repair work on a ceramic surface' },
    featured: { src: pexels(p.mosaicDetail, 900), alt: 'Detailed tile repair with restored grout lines' },
    gallery: [
      { src: pexels(p.tileDetail, 800), alt: 'Close-up ceramic tile repair' },
      { src: pexels(p.tileDesign, 800), alt: 'Restored tile surface after repair work' },
      { src: pexels(p.customPattern, 800), alt: 'Repaired patterned tile section' },
    ],
  },
  'demolition-removal': {
    hero: { src: pexels(p.constructionSite, 1600), alt: 'Interior demolition before new tile installation' },
    featured: { src: pexels(p.renovationDemo, 900), alt: 'Tile removal and renovation preparation' },
    gallery: [
      { src: unsplash(u.constructionPlan, 800), alt: 'Renovation planning before tile installation' },
      { src: pexels(p.toolWork, 800), alt: 'Tools and materials for demolition and prep work' },
      { src: pexels(p.projectSite, 800), alt: 'Prepared interior space after tile removal' },
    ],
  },
  'custom-designs': {
    hero: { src: pexels(p.customPattern, 1600), alt: 'Custom geometric tile design on a shower wall' },
    featured: { src: pexels(p.luxuryFinish, 900), alt: 'Designer tile pattern with precise installation' },
    gallery: [
      { src: pexels(p.mosaicDetail, 800), alt: 'Mosaic accent tile custom design' },
      { src: pexels(p.tileDesign, 800), alt: 'Decorative floor tile pattern layout' },
      { src: unsplash(u.designerBath, 800), alt: 'Custom tile design in a designer bathroom' },
    ],
  },
};

export const valueDetailImages: Record<string, ValueDetailImages> = {
  'family-owned': {
    hero: {
      src: pexels(p.warmBath, 1600),
      alt: 'Warm residential bathroom with quality ceramic tile finishes',
    },
    featured: {
      src: pexels(p.bathroomRemodel, 900),
      alt: 'Family-crafted bathroom renovation with ceramic tile',
    },
    gallery: [
      { src: pexels(p.cleanBath, 800), alt: 'Clean residential bathroom tile installation' },
      { src: unsplash(u.bathroomModern, 800), alt: 'Modern home bathroom with ceramic tile' },
      { src: pexels(p.bathroomSpa, 800), alt: 'Spa-style shower with porcelain tile walls' },
    ],
  },
  'professional-experience': {
    hero: {
      src: pexels(p.commercialSpace, 1600),
      alt: 'Commercial interior with professional tile installation',
    },
    featured: {
      src: pexels(p.gymFacility, 900),
      alt: 'Professional locker room tile work in a sports facility',
    },
    gallery: [
      { src: pexels(p.lockerRoom, 800), alt: 'Locker room ceramic tile built for high traffic' },
      { src: pexels(p.officeRestroom, 800), alt: 'Commercial restroom with durable tile surfaces' },
      { src: unsplash(u.commercialOffice, 800), alt: 'Professional facility interior with tile flooring' },
    ],
  },
  'attention-to-detail': {
    hero: {
      src: pexels(p.mosaicDetail, 1600),
      alt: 'Detailed mosaic tile pattern with precise grout lines',
    },
    featured: {
      src: pexels(p.groutFinish, 900),
      alt: 'Close-up of finished grout lines and tile edges',
    },
    gallery: [
      { src: pexels(p.customPattern, 800), alt: 'Custom geometric tile layout with clean cuts' },
      { src: pexels(p.luxuryFinish, 800), alt: 'Designer shower tile with precise finishing' },
      { src: pexels(p.tileDetail, 800), alt: 'Detailed ceramic tile installation on a wall surface' },
    ],
  },
  'quality-without-shortcuts': {
    hero: {
      src: pexels(p.craftsmanWork, 1600),
      alt: 'Tile craftsman carefully preparing a ceramic installation',
    },
    featured: {
      src: pexels(p.tileInstall, 900),
      alt: 'Professional tile installation during construction',
    },
    gallery: [
      { src: pexels(p.showerTile, 800), alt: 'Shower waterproofing and tile backing preparation' },
      { src: pexels(p.renovationDemo, 800), alt: 'Interior renovation preparation before tile installation' },
      { src: pexels(p.toolWork, 800), alt: 'Tile tools and materials prepared for quality installation' },
    ],
  },
  'built-to-last': {
    hero: {
      src: pexels(p.tileFloor, 1600),
      alt: 'Durable floor tile installed in a high-use interior space',
    },
    featured: {
      src: pexels(p.facilityFloor, 900),
      alt: 'Commercial-grade floor tile built for everyday traffic',
    },
    gallery: [
      { src: pexels(p.showerLuxury, 800), alt: 'Long-lasting shower tile installation' },
      { src: unsplash(u.bathroomTile, 800), alt: 'Finished bathroom tile built for daily use' },
      { src: pexels(p.tilePattern, 800), alt: 'Large-format porcelain tile in a durable floor layout' },
    ],
  },
};

export const FALLBACK_IMAGE: StockImage = {
  src: pexels(p.bathroomSpa, 800),
  alt: 'Professional ceramic and tile installation',
};
