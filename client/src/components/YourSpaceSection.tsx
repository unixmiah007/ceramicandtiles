import { useEffect, useRef, useState } from 'react';
import YourSpaceVideo from './YourSpaceVideo';
import { useLanguage } from '../context/LanguageContext';

export default function YourSpaceSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25, rootMargin: '0px 0px -8% 0px' }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const visibleClass = isVisible ? ' is-visible' : '';

  return (
    <section
      ref={sectionRef}
      className={`your-space-section${visibleClass}`}
      aria-labelledby="your-space-title"
    >
      <div className="container">
        <div className="split-feature your-space-feature">
          <div className={`your-space-content${visibleClass}`}>
            <p className="your-space-eyebrow">{t.home.yourSpaceEyebrow}</p>
            <h2 id="your-space-title" className="your-space-title">
              {t.home.yourSpaceTitle}
              <span className="your-space-title-line" aria-hidden="true" />
            </h2>
            <p className="your-space-paragraph your-space-paragraph--1">{t.home.yourSpaceP1}</p>
            <p className="your-space-paragraph your-space-paragraph--2">{t.home.yourSpaceP2}</p>
            <ul className="your-space-highlights" aria-label={t.home.yourSpaceHighlightsLabel}>
              {t.home.yourSpaceHighlights.map((highlight, index) => (
                <li
                  key={highlight}
                  className="your-space-highlight"
                  style={{ transitionDelay: `${0.55 + index * 0.12}s` }}
                >
                  <span className="your-space-highlight-dot" aria-hidden="true" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          <div className={`your-space-media${visibleClass}`}>
            <span className="your-space-frame your-space-frame--tl" aria-hidden="true" />
            <span className="your-space-frame your-space-frame--br" aria-hidden="true" />
            <YourSpaceVideo isVisible={isVisible} />
            <span className="your-space-shimmer" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
