import { Locale } from './types';
import { en } from './en';
import { es } from './es';
import { featuresEn } from './features.en';
import { featuresEs } from './features.es';

export const uiTranslations = { en, es };
export const featureContent = { en: featuresEn, es: featuresEs };

export function getUiTranslations(locale: Locale) {
  return uiTranslations[locale];
}

export function getFeatureContent(locale: Locale) {
  return featureContent[locale];
}

export type { Locale, UiTranslations } from './types';
export type { FeatureContent } from './features.en';
export { en, es, featuresEn, featuresEs };
