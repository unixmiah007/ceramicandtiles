export type Locale = 'en' | 'es';

export interface UiTranslations {
  language: {
    switchToSpanish: string;
    switchToEnglish: string;
    current: string;
  };
  nav: {
    home: string;
    experience: string;
    services: string;
    whyPortillo: string;
    contact: string;
    requestQuote: string;
    quoteWizard: string;
    openMenu: string;
    closeMenu: string;
  };
  footer: {
    tagline: string;
    quickLinks: string;
    contact: string;
    rights: string;
  };
  common: {
    requestQuote: string;
    requestQuoteToday: string;
    viewServices: string;
    viewAllServices: string;
    viewServiceDetails: string;
    learnMore: string;
    learnMoreAbout: string;
    readFullDetails: string;
    backToAllServices: string;
    exploreServices: string;
    other: string;
    sending: string;
    submitRequest: string;
    phone: string;
    email: string;
    serviceArea: string;
    serviceAreaValue: string;
  };
  topBar: {
    followUs: string;
  };
  hero: {
    eyebrow: string;
    description: string;
    featuredProjects: string;
    previousSlide: string;
    nextSlide: string;
    goToSlide: string;
    serviceCategoriesPrefix: string;
    serviceCategories: { label: string; href: string }[];
    slides: Record<string, { headline: string; subtitle: string }>;
  };
  home: {
    yourSpaceTitle: string;
    yourSpaceEyebrow: string;
    yourSpaceP1: string;
    yourSpaceP2: string;
    yourSpaceHighlightsLabel: string;
    yourSpaceHighlights: string[];
    processSteps: Record<string, { title: string; description: string }>;
    galleryTitle: string;
    galleryDescription: string;
    servicesTitle: string;
    servicesDescription: string;
    whyTitle: string;
    learnMoreAboutUs: string;
  };
  experience: {
    heroTitle: string;
    heroSubtitle: string;
    highlight: string;
    expertiseTitle: string;
    expertiseP1: string;
    expertiseP2: string;
    statServiceArea: string;
    statProjectTypes: string;
    statNotableClients: string;
    statProjectTypesValue: string;
    statNotableClientsValue: string;
    ctaTitle: string;
    ctaDescription: string;
  };
  services: {
    heroTitle: string;
    heroSubtitle: string;
    completeTitle: string;
    completeDescription: string;
    residentialTitle: string;
    residentialItems: string[];
    commercialTitle: string;
    commercialItems: string[];
  };
  serviceDetail: {
    whatWeProvide: string;
    idealFor: string;
    projectExamples: string;
    projectExamplesDescription: string;
    exploreMore: string;
    quoteTitle: string;
    quoteDescription: string;
  };
  whyPortillo: {
    heroTitle: string;
    heroSubtitle: string;
    showcaseEyebrow: string;
    introLead: string;
    introP: string;
    learnMoreAbout: string;
    quote: string;
    quoteAttribution: string;
  };
  valueDetail: {
    whatItMeans: string;
    moreWork: string;
    moreWorkDescription: string;
    exploreOther: string;
    backToWhy: string;
    experienceTitle: string;
    experienceDescription: string;
  };
  contact: {
    heroTitle: string;
    heroSubtitle: string;
    contactTitle: string;
    contactIntro: string;
    note: string;
    formTitle: string;
    fullName: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    phonePlaceholder: string;
    projectType: string;
    selectService: string;
    projectDetails: string;
    messagePlaceholder: string;
    genericError: string;
  };
  cta: {
    defaultTitle: string;
    defaultDescription: string;
  };
  liveChat: {
    title: string;
    liveNow: string;
    offline: string;
    close: string;
    open: string;
    typing: string;
    inputLabel: string;
    placeholder: string;
    send: string;
    welcome: string;
    prompts: string[];
    preferCall: string;
    or: string;
    requestQuote: string;
  };
  wizard: {
    heroTitle: string;
    heroSubtitle: string;
    stepLabels: string[];
    steps: {
      property: { title: string; description: string };
      service: { title: string; description: string };
      tiles: { title: string; description: string };
      details: { title: string; description: string };
      contact: { title: string; description: string };
    };
    propertyType: string;
    residential: string;
    commercial: string;
    propertyDescription: string;
    propertyDescriptionPlaceholder: string;
    location: string;
    locationPlaceholder: string;
    selectService: string;
    tileSamplesTitle: string;
    tileSamplesHint: string;
    projectSize: string;
    timeline: string;
    additionalNotes: string;
    additionalNotesPlaceholder: string;
    reviewTitle: string;
    fullName: string;
    submit: string;
    next: string;
    back: string;
    success: string;
    validation: {
      propertyType: string;
      propertyDescription: string;
      location: string;
      service: string;
      tiles: string;
      projectSize: string;
      timeline: string;
      name: string;
      email: string;
      phone: string;
    };
    projectSizes: Record<string, string>;
    timelines: Record<string, string>;
    tileSamples: Record<string, string>;
    review: {
      propertyType: string;
      location: string;
      property: string;
      service: string;
      tiles: string;
      size: string;
      timeline: string;
      notes: string;
      none: string;
    };
  };
}
