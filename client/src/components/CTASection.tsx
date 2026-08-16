import { Link } from 'react-router-dom';
import { sectionImages } from '../data/images';

interface CTASectionProps {
  title?: string;
  description?: string;
}

export default function CTASection({
  title = 'Your Vision. Our Craftsmanship.',
  description = 'Your home or business deserves tile work that looks beautiful and performs for years to come. Let Portillo Ceramic and Tile bring your vision to life.',
}: CTASectionProps) {
  return (
    <section
      className="cta-section cta-section--image"
      style={{ backgroundImage: `url(${sectionImages.ctaBackground.src})` }}
    >
      <div className="cta-section-overlay" aria-hidden="true" />
      <span className="sr-only">{sectionImages.ctaBackground.alt}</span>
      <div className="container cta-content">
        <h2>{title}</h2>
        <p>{description}</p>
        <Link to="/contact" className="btn btn-primary btn-lg">
          Request a Quote Today
        </Link>
      </div>
    </section>
  );
}
