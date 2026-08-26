import { Link } from 'react-router-dom';
import { sectionImages } from '../data/images';
import { useLanguage } from '../context/LanguageContext';

interface CTASectionProps {
  title?: string;
  description?: string;
}

export default function CTASection({ title, description }: CTASectionProps) {
  const { t } = useLanguage();

  return (
    <section
      className="cta-section cta-section--image"
      style={{ backgroundImage: `url(${sectionImages.ctaBackground.src})` }}
    >
      <div className="cta-section-overlay" aria-hidden="true" />
      <span className="sr-only">{sectionImages.ctaBackground.alt}</span>
      <div className="container cta-content">
        <h2>{title ?? t.cta.defaultTitle}</h2>
        <p>{description ?? t.cta.defaultDescription}</p>
        <Link to="/contact" className="btn btn-primary btn-lg">
          {t.common.requestQuoteToday}
        </Link>
      </div>
    </section>
  );
}
