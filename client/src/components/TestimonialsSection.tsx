import { testimonials } from '../data/features';
import { useLanguage } from '../context/LanguageContext';

export default function TestimonialsSection() {
  const { f } = useLanguage();

  return (
    <section className="section section-alt">
      <div className="container">
        <div className="section-header">
          <h2>{f.testimonials.title}</h2>
          <p>{f.testimonials.subtitle}</p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((item) => (
            <blockquote key={item.id} className="testimonial-card">
              <div className="testimonial-stars" aria-label={`${item.rating} stars`}>
                {'★'.repeat(item.rating)}
              </div>
              <p className="testimonial-quote">
                {f.testimonials.quotes[item.quoteKey as keyof typeof f.testimonials.quotes]}
              </p>
              <footer>
                <strong>{item.name}</strong>
                <span>{item.location}</span>
                <span className="testimonial-type">
                  {f.testimonials.projectTypes[item.projectTypeKey as keyof typeof f.testimonials.projectTypes]}
                </span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
