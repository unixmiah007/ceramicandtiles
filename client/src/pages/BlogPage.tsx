import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import StockImage from '../components/StockImage';
import CTASection from '../components/CTASection';
import { blogPosts } from '../data/features';
import { useLanguage } from '../context/LanguageContext';
import { galleryImages } from '../data/images';

export default function BlogPage() {
  const { f } = useLanguage();

  return (
    <>
      <PageHero
        title={f.blog.heroTitle}
        subtitle={f.blog.heroSubtitle}
        backgroundImage={galleryImages[1]}
      />

      <section className="section">
        <div className="container blog-grid">
          {blogPosts.map((post) => {
            const content = f.blog.posts[post.titleKey as keyof typeof f.blog.posts];
            return (
              <article key={post.id} className="blog-card">
                <StockImage image={post.image} aspectRatio="16 / 10" className="blog-card-image" />
                <div className="blog-card-body">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  <h2>{content.title}</h2>
                  <p>{content.excerpt}</p>
                  <Link to={`/blog/${post.slug}`} className="inline-link">
                    {f.blog.readMore}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <CTASection />
    </>
  );
}
