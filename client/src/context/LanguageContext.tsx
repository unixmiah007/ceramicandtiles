import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { projects as englishProjects } from '../data/content';
import { services as englishServices, getServiceById as getEnglishServiceById } from '../data/services';
import {
  valuePropositions as englishValues,
  getValueById as getEnglishValueById,
} from '../data/values';
import { Project, Service, ValueProposition } from '../types';
import { getFeatureContent, getUiTranslations, Locale, uiTranslations } from '../i18n';
import type { FeatureContent } from '../i18n/features.en';
import { projectsEs } from '../i18n/projects.es';
import { servicesEs } from '../i18n/services.es';
import { valuesEs } from '../i18n/values.es';

const STORAGE_KEY = 'portillo-locale';

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: ReturnType<typeof getUiTranslations>;
  f: FeatureContent;
  services: Service[];
  values: ValueProposition[];
  projects: Project[];
  getServiceById: (id: string) => Service | undefined;
  getValueById: (id: string) => ValueProposition | undefined;
  getEnglishServiceById: (id: string) => Service | undefined;
  getEnglishValueById: (id: string) => ValueProposition | undefined;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') {
    return 'en';
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === 'es' ? 'es' : 'en';
}

function localizeServices(locale: Locale): Service[] {
  if (locale === 'en') {
    return englishServices;
  }

  return englishServices.map((service) => {
    const translation = servicesEs[service.id];
    if (!translation) {
      return service;
    }

    return {
      ...service,
      ...translation,
      sections: service.sections.map((section, index) => ({
        ...section,
        ...(translation.sections?.[index] ?? {}),
      })),
    };
  });
}

function localizeValues(locale: Locale): ValueProposition[] {
  if (locale === 'en') {
    return englishValues;
  }

  return englishValues.map((value) => {
    const translation = valuesEs[value.id];
    if (!translation) {
      return value;
    }

    return {
      ...value,
      ...translation,
      sections: value.sections.map((section, index) => ({
        ...section,
        ...(translation.sections?.[index] ?? {}),
      })),
    };
  });
}

function localizeProjects(locale: Locale): Project[] {
  if (locale === 'en') {
    return englishProjects;
  }

  return englishProjects.map((project) => ({
    ...project,
    ...(projectsEs[project.id] ?? {}),
  }));
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  const setLocale = useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale);
    window.localStorage.setItem(STORAGE_KEY, nextLocale);
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === 'en' ? 'es' : 'en');
  }, [locale, setLocale]);

  useEffect(() => {
    document.documentElement.lang = locale === 'es' ? 'es' : 'en-US';
  }, [locale]);

  const value = useMemo<LanguageContextValue>(() => {
    const services = localizeServices(locale);
    const values = localizeValues(locale);
    const localizedProjects = localizeProjects(locale);

    return {
      locale,
      setLocale,
      toggleLocale,
      t: getUiTranslations(locale),
      f: getFeatureContent(locale),
      services,
      values,
      projects: localizedProjects,
      getServiceById: (id: string) => services.find((service) => service.id === id),
      getValueById: (id: string) => values.find((item) => item.id === id),
      getEnglishServiceById,
      getEnglishValueById,
    };
  }, [locale, setLocale, toggleLocale]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export function useLocaleLabel(locale: Locale) {
  return uiTranslations[locale].language.current;
}
