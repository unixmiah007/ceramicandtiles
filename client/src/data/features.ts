import { galleryImages, projectImages, sectionImages } from './images';

export interface BeforeAfterProject {
  id: string;
  titleKey: string;
  beforeImage: typeof galleryImages[0];
  afterImage: typeof galleryImages[0];
  category: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  projectTypeKey: string;
  quoteKey: string;
  rating: number;
}

export interface FaqItem {
  id: string;
  questionKey: string;
  answerKey: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  titleKey: string;
  excerptKey: string;
  bodyKeys: string[];
  date: string;
  image: typeof galleryImages[0];
}

export interface CaseStudy {
  id: string;
  projectId: string;
  image: typeof projectImages[string];
  scopeKeys: string[];
  challengeKey: string;
  solutionKey: string;
  resultKey: string;
}

export interface EstimateOption {
  id: string;
  labelKey: string;
  minCost: number;
  maxCost: number;
  weeksMin: number;
  weeksMax: number;
}

export interface ChecklistItem {
  id: string;
  phaseKey: string;
  itemsKeys: string[];
}

export const beforeAfterProjects: BeforeAfterProject[] = [
  {
    id: 'master-bath',
    titleKey: 'masterBath',
    beforeImage: sectionImages.residential,
    afterImage: galleryImages[0],
    category: 'bathroom',
  },
  {
    id: 'walk-in-shower',
    titleKey: 'walkInShower',
    beforeImage: sectionImages.whyPortillo,
    afterImage: galleryImages[4],
    category: 'shower',
  },
  {
    id: 'kitchen-backsplash',
    titleKey: 'kitchenBacksplash',
    beforeImage: galleryImages[1],
    afterImage: sectionImages.craftsmanship,
    category: 'kitchen',
  },
  {
    id: 'commercial-restroom',
    titleKey: 'commercialRestroom',
    beforeImage: sectionImages.commercial,
    afterImage: projectImages['the-pentagon'],
    category: 'commercial',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Maria G.',
    location: 'Arlington, VA',
    projectTypeKey: 'bathroom',
    quoteKey: 'maria',
    rating: 5,
  },
  {
    id: '2',
    name: 'James T.',
    location: 'Fairfax, VA',
    projectTypeKey: 'shower',
    quoteKey: 'james',
    rating: 5,
  },
  {
    id: '3',
    name: 'Linda P.',
    location: 'Alexandria, VA',
    projectTypeKey: 'kitchen',
    quoteKey: 'linda',
    rating: 5,
  },
  {
    id: '4',
    name: 'Robert K.',
    location: 'Leesburg, VA',
    projectTypeKey: 'commercial',
    quoteKey: 'robert',
    rating: 5,
  },
];

export const faqItems: FaqItem[] = [
  { id: 'timeline', questionKey: 'timelineQ', answerKey: 'timelineA' },
  { id: 'waterproofing', questionKey: 'waterproofingQ', answerKey: 'waterproofingA' },
  { id: 'ceramic-vs-porcelain', questionKey: 'ceramicQ', answerKey: 'ceramicA' },
  { id: 'quote', questionKey: 'quoteQ', answerKey: 'quoteA' },
  { id: 'prep', questionKey: 'prepQ', answerKey: 'prepA' },
  { id: 'commercial', questionKey: 'commercialQ', answerKey: 'commercialA' },
  { id: 'repair-vs-replace', questionKey: 'repairQ', answerKey: 'repairA' },
  { id: 'service-area', questionKey: 'areaQ', answerKey: 'areaA' },
];

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'when-to-replace-tile',
    titleKey: 'replaceTile',
    excerptKey: 'replaceTileExcerpt',
    bodyKeys: ['replaceTileP1', 'replaceTileP2', 'replaceTileP3'],
    date: '2026-03-01',
    image: galleryImages[3],
  },
  {
    id: '2',
    slug: 'waterproofing-matters',
    titleKey: 'waterproofing',
    excerptKey: 'waterproofingExcerpt',
    bodyKeys: ['waterproofingP1', 'waterproofingP2', 'waterproofingP3'],
    date: '2026-02-15',
    image: galleryImages[4],
  },
  {
    id: '3',
    slug: 'commercial-locker-room-tile',
    titleKey: 'lockerRoom',
    excerptKey: 'lockerRoomExcerpt',
    bodyKeys: ['lockerRoomP1', 'lockerRoomP2', 'lockerRoomP3'],
    date: '2026-01-20',
    image: projectImages['orangetheory-fitness'],
  },
];

export const caseStudies: CaseStudy[] = [
  {
    id: 'capitals',
    projectId: 'washington-capitals',
    image: projectImages['washington-capitals'],
    scopeKeys: ['scope1', 'scope2', 'scope3'],
    challengeKey: 'capitalsChallenge',
    solutionKey: 'capitalsSolution',
    resultKey: 'capitalsResult',
  },
  {
    id: 'pentagon',
    projectId: 'the-pentagon',
    image: projectImages['the-pentagon'],
    scopeKeys: ['scope1', 'scope2', 'scope3'],
    challengeKey: 'pentagonChallenge',
    solutionKey: 'pentagonSolution',
    resultKey: 'pentagonResult',
  },
  {
    id: 'orangetheory',
    projectId: 'orangetheory-fitness',
    image: projectImages['orangetheory-fitness'],
    scopeKeys: ['scope1', 'scope2', 'scope3'],
    challengeKey: 'otChallenge',
    solutionKey: 'otSolution',
    resultKey: 'otResult',
  },
];

export const estimateOptions: EstimateOption[] = [
  { id: 'backsplash', labelKey: 'backsplash', minCost: 800, maxCost: 2500, weeksMin: 1, weeksMax: 2 },
  { id: 'shower', labelKey: 'shower', minCost: 3500, maxCost: 9000, weeksMin: 1, weeksMax: 3 },
  { id: 'bathroom', labelKey: 'bathroom', minCost: 8000, maxCost: 25000, weeksMin: 2, weeksMax: 4 },
  { id: 'floor', labelKey: 'floor', minCost: 2000, maxCost: 8000, weeksMin: 1, weeksMax: 2 },
  { id: 'commercial', labelKey: 'commercial', minCost: 10000, maxCost: 50000, weeksMin: 2, weeksMax: 8 },
];

export const checklistPhases: ChecklistItem[] = [
  { id: 'before', phaseKey: 'before', itemsKeys: ['before1', 'before2', 'before3', 'before4'] },
  { id: 'during', phaseKey: 'during', itemsKeys: ['during1', 'during2', 'during3', 'during4'] },
  { id: 'after', phaseKey: 'after', itemsKeys: ['after1', 'after2', 'after3', 'after4'] },
];

export const serviceAreaCities = [
  'Arlington', 'Alexandria', 'Fairfax', 'Falls Church', 'McLean', 'Vienna', 'Reston',
  'Herndon', 'Leesburg', 'Sterling', 'Ashburn', 'Manassas', 'Woodbridge', 'Springfield',
  'Burke', 'Annandale', 'Washington, D.C.',
];

export const instagramFeedImages = galleryImages.slice(0, 6);
