import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PageHero from '../components/PageHero';
import StockImage from '../components/StockImage';
import CTASection from '../components/CTASection';
import SeoHead from '../components/SeoHead';
import { blogCategories, blogPosts, type BlogCategory } from '../data/blog';
import { useLanguage } from '../context/LanguageContext';
import { getBlogCategoryPath, getBlogCategorySeo, getBlogListingSeo } from '../seo/blog';
import { galleryImages } from '../data/images';

const POSTS_PER_PAGE = 12;

function isBlogCategory(value: string | undefined): value is BlogCategory {
  return !!value && blogCategories.includes(value as BlogCategory);
}

export default function BlogPage() {
  const { category: categoryParam } = useParams<{ category?: string }>();
  const { locale, f } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<BlogCategory | 'all'>('all');
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (isBlogCategory(categoryParam)) {
      setActiveCategory(categoryParam);
      setPage(1);
    } else if (!categoryParam) {
      setActiveCategory('all');
    }
  }, [categoryParam]);

  const getContent = (post: (typeof blogPosts)[number]) =>
    f.blog.posts[post.titleKey as keyof typeof f.blog.posts];

  const seo = useMemo(() => {
    if (isBlogCategory(categoryParam)) {
      return getBlogCategorySeo(
        categoryParam,
        f.blog.categories[categoryParam],
        locale,
        blogPosts,
        getContent
      );
    }
    return getBlogListingSeo(locale, blogPosts, getContent);
  }, [categoryParam, f.blog.categories, f.blog.posts, locale]);

  const sortedPosts = useMemo(
    () => [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    []
  );

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'all') return sortedPosts;
    return sortedPosts.filter((post) => post.category === activeCategory);
  }, [activeCategory, sortedPosts]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <>
      <SeoHead {...seo} />
      <PageHero
        title={f.blog.heroTitle}
        subtitle={f.blog.heroSubtitle}
        backgroundImage={galleryImages[1]}
      />

      <section className="section">
        <div className="container">
          <nav className="blog-filters" aria-label="Blog categories">
            <Link
              to="/blog"
              aria-current={activeCategory === 'all' ? 'page' : undefined}
              className={`blog-filter-btn${activeCategory === 'all' ? ' blog-filter-btn--active' : ''}`}
            >
              {f.blog.allCategories}
            </Link>
            {blogCategories.map((category) => (
              <Link
                key={category}
                to={getBlogCategoryPath(category)}
                aria-current={activeCategory === category ? 'page' : undefined}
                className={`blog-filter-btn${activeCategory === category ? ' blog-filter-btn--active' : ''}`}
              >
                {f.blog.categories[category]}
              </Link>
            ))}
          </nav>

          <p className="blog-results-meta">
            {f.blog.showingPosts} {paginatedPosts.length} {f.blog.ofPosts} ({filteredPosts.length}{' '}
            {activeCategory === 'all' ? f.blog.allCategories.toLowerCase() : f.blog.categories[activeCategory]})
          </p>

          <div className="blog-grid">
            {paginatedPosts.map((post) => {
              const content = getContent(post);
              return (
                <article key={post.id} className="blog-card">
                  <Link to={`/blog/${post.slug}`} className="blog-card-image-link">
                    <StockImage image={post.image} aspectRatio="16 / 10" className="blog-card-image" />
                  </Link>
                  <div className="blog-card-body">
                    <Link to={getBlogCategoryPath(post.category)} className="blog-card-category">
                      {f.blog.categories[post.category]}
                    </Link>
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                    <h2>
                      <Link to={`/blog/${post.slug}`}>{content.title}</Link>
                    </h2>
                    <p>{content.excerpt}</p>
                    <Link to={`/blog/${post.slug}`} className="inline-link">
                      {f.blog.readMore}
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          {totalPages > 1 && (
            <nav className="blog-pagination" aria-label="Blog pagination">
              <button
                type="button"
                className="btn btn-secondary btn-small"
                disabled={currentPage <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                ←
              </button>
              <span>
                {currentPage} / {totalPages}
              </span>
              <button
                type="button"
                className="btn btn-secondary btn-small"
                disabled={currentPage >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                →
              </button>
            </nav>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
