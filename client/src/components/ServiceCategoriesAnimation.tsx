import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const ROTATE_MS = 2800;

export default function ServiceCategoriesAnimation() {
  const { t } = useLanguage();
  const categories = t.hero.serviceCategories;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const timer = window.setInterval(() => {
      setIsExiting(true);
      window.setTimeout(() => {
        setActiveIndex((current) => (current + 1) % categories.length);
        setIsExiting(false);
      }, 420);
    }, ROTATE_MS);

    return () => window.clearInterval(timer);
  }, [categories.length, prefersReducedMotion]);

  if (prefersReducedMotion) {
    const labels = categories.map((category) => category.label);
    const staticText =
      labels.length <= 1
        ? labels[0] ?? ''
        : `${labels.slice(0, -1).join(', ')} & ${labels[labels.length - 1]}`;

    return (
      <p className="hero-service-categories hero-service-categories--static">
        <span className="hero-service-categories-prefix">{t.hero.serviceCategoriesPrefix}</span>{' '}
        <span className="hero-service-categories-static-list">{staticText}</span>
      </p>
    );
  }

  const activeCategory = categories[activeIndex];

  return (
    <p className="hero-service-categories">
      <span className="hero-service-categories-prefix">{t.hero.serviceCategoriesPrefix}</span>
      <Link to={activeCategory.href} className="hero-service-rotator-link">
        <span className="hero-service-rotator" aria-live="polite">
          {categories.map((category, index) => (
            <span
              key={category.href}
              className={`hero-service-rotator-word${
                index === activeIndex ? ' is-active' : ''
              }${index === activeIndex && isExiting ? ' is-exiting' : ''}`}
            >
              {category.label}
            </span>
          ))}
        </span>
      </Link>
      <span className="hero-service-categories-track" aria-hidden="true">
        {categories.map((category, index) => (
          <span
            key={`dot-${category.href}`}
            className={`hero-service-categories-dot${index === activeIndex ? ' is-active' : ''}`}
          />
        ))}
      </span>
    </p>
  );
}
