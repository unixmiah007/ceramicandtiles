import { Locale } from './types';
import { en } from './en';
import { es } from './es';

export const uiTranslations = { en, es };

export function getUiTranslations(locale: Locale) {
  return uiTranslations[locale];
}

export type { Locale, UiTranslations } from './types';
export { en, es };
