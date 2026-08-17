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
  hero: {
    eyebrow: string;
    description: string;
    featuredProjects: string;
    previousSlide: string;
    nextSlide: string;
    goToSlide: string;
    slides: Record<string, { headline: string; subtitle: string }>;
  };
  home: {
    yourSpaceTitle: string;
    yourSpaceP1: string;
    yourSpaceP2: string;
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
}
