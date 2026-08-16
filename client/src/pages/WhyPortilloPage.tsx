import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';
import StockImage from '../components/StockImage';
import { valuePropositions } from '../data/values';
import { pageHeroImages, sectionImages, getValueImage } from '../data/images';

export default function WhyPortilloPage() {
  return (
    <>
      <PageHero
        title="Why Portillo?"
        subtitle="Family-Owned Craftsmanship. Professional Results."
        backgroundImage={pageHeroImages['why-portillo']}
      />

      <section className="section">
        <div className="container">
          <div className="split-feature split-feature--reverse">
            <StockImage
              image={sectionImages.whyPortillo}
              aspectRatio="4 / 3"
              className="split-feature-image rounded-image"
            />
            <div className="split-feature-content intro-block intro-block--left">
              <p className="lead">
                At Portillo Ceramic and Tile, we believe great tile work can completely
                transform a space. Our name is on every project—we treat every customer and
                every home with respect.
              </p>
              <p>
                These are the qualities that guide every bathroom renovation, shower
                installation, and commercial tile project we take on. Select any topic below
                to learn more about what sets our work apart.
              </p>
            </div>
          </div>

          <div className="values-grid values-grid-large">
            {valuePropositions.map((value, index) => (
              <article key={value.id} className="value-card value-card-large value-card--image">
                <StockImage
                  image={getValueImage(value.id, value.title)}
                  aspectRatio="16 / 9"
                  className="value-card-image"
                />
                <div className="value-card-body">
                  <span className="value-number">{String(index + 1).padStart(2, '0')}</span>
                  <h2>{value.title}</h2>
                  <p className="value-card-tagline">{value.tagline}</p>
                  <p>{value.description}</p>
                  <p className="value-card-preview">{value.intro}</p>
                  <ul className="value-card-highlights">
                    {value.highlights.slice(0, 2).map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                  <Link to={`/why-portillo/${value.id}`} className="btn btn-secondary value-card-link">
                    Learn More About {value.title}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="quote-block">
            <blockquote>
              Clean cuts, precise layouts, consistent grout lines, and quality finishing are
              what separate good work from great work.
            </blockquote>
            <p className="quote-attribution">— Portillo Ceramic and Tile</p>
          </div>

          <div className="value-links-grid">
            {valuePropositions.map((value) => (
              <Link key={value.id} to={`/why-portillo/${value.id}`} className="value-link-card">
                <h3>{value.title}</h3>
                <p>{value.tagline}</p>
                <span className="value-link-card-action">Read Full Details</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
