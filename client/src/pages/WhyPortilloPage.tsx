import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';
import StockImage from '../components/StockImage';
import { valuePropositions } from '../data/content';
import { pageHeroImages, sectionImages, valueIcons } from '../data/images';

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
            </div>
          </div>

          <div className="values-grid values-grid-large">
            {valuePropositions.map((value, index) => (
              <article key={value.id} className="value-card value-card-large value-card--image">
                <StockImage
                  image={valueIcons[value.id]}
                  aspectRatio="16 / 9"
                  className="value-card-image"
                />
                <div className="value-card-body">
                  <span className="value-number">{String(index + 1).padStart(2, '0')}</span>
                  <h2>{value.title}</h2>
                  <p>{value.description}</p>
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

          <div className="principles-grid">
            <div className="principle principle--image">
              <StockImage
                image={valueIcons['quality-without-shortcuts']}
                aspectRatio="16 / 10"
                className="principle-image"
              />
              <h3>We Do Things Correctly</h3>
              <p>
                We believe in doing things correctly—not simply getting the job finished
                quickly. Quality without shortcuts is our standard.
              </p>
            </div>
            <div className="principle principle--image">
              <StockImage
                image={valueIcons['built-to-last']}
                aspectRatio="16 / 10"
                className="principle-image"
              />
              <h3>Built to Last</h3>
              <p>
                We focus on proper preparation and installation so your investment can stand
                up to everyday use for years to come.
              </p>
            </div>
            <div className="principle principle--image">
              <StockImage
                image={valueIcons['professional-experience']}
                aspectRatio="16 / 10"
                className="principle-image"
              />
              <h3>Professional &amp; Personal</h3>
              <p>
                Our work spans residential projects and professional commercial facilities,
                bringing the same level of care to every job.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
