import { useLanguage } from '../context/LanguageContext';

export default function LanguageToggle() {
  const { locale, toggleLocale, t } = useLanguage();

  return (
    <button
      type="button"
      className="language-toggle"
      onClick={toggleLocale}
      aria-label={locale === 'en' ? t.language.switchToSpanish : t.language.switchToEnglish}
      title={locale === 'en' ? t.language.switchToSpanish : t.language.switchToEnglish}
    >
      {locale === 'en' ? t.language.switchToSpanish : t.language.switchToEnglish}
    </button>
  );
}
