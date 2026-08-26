import { useEffect, useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import PageHero from '../components/PageHero';
import StockImage from '../components/StockImage';
import CTASection from '../components/CTASection';
import SeoHead from '../components/SeoHead';
import { blogCategories, blogPosts, type BlogCategory, type BlogPost } from '../data/blog';
import { useLanguage } from '../context/LanguageContext';
import { getBlogCategoryPath, getBlogCategorySeo, getBlogListingSeo } from '../seo/blog';
import { galleryImages } from '../data/images';

const POSTS_PER_PAGE = 12;

function isBlogCategory(value: string | undefined): value is BlogCategory {
  return !!value && blogCategories.includes(value as BlogCategory);
}

function normalizeSearch(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, ' ');
}

function postMatchesQuery(
  post: BlogPost,
  query: string,
  content: { title: string; excerpt: string; paragraphs: string[] },
  categoryLabel: string
): boolean {
  if (!query) return true;
  const haystack = [
    content.title,
    content.excerpt,
    ...content.paragraphs,
    categoryLabel,
    post.slug.replace(/-/g, ' '),
  ]
    .join(' ')
    .toLowerCase();
  return haystack.includes(query);
}

export default function BlogPage() {
  const { category: categoryParam } = useParams<{ category?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { locale, f } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<BlogCategory | 'all'>('all');
  const [page, setPage] = useState(1);
  const searchQuery = searchParams.get('q') ?? '';

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

  const normalizedQuery = normalizeSearch(searchQuery);

  const filteredPosts = useMemo(() => {
    const byCategory =
      activeCategory === 'all'
        ? sortedPosts
        : sortedPosts.filter((post) => post.category === activeCategory);

    if (!normalizedQuery) return byCategory;

    return byCategory.filter((post) =>
      postMatchesQuery(post, normalizedQuery, getContent(post), f.blog.categories[post.category])
    );
  }, [activeCategory, sortedPosts, normalizedQuery, f.blog.posts, f.blog.categories]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handleSearchChange = (value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value.trim()) {
      next.set('q', value);
    } else {
      next.delete('q');
    }
    setSearchParams(next, { replace: true });
    setPage(1);
  };

  const topicLabel =
    activeCategory === 'all' ? f.blog.allCategories.toLowerCase() : f.blog.categories[activeCategory];

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
          <form
            className="blog-search"
            role="search"
            onSubmit={(event) => event.preventDefault()}
          >
            <label htmlFor="blog-search-input" className="blog-search-label">
              {f.blog.searchLabel}
            </label>
            <div className="blog-search-field">
              <svg className="blog-search-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
                />
              </svg>
              <input
                id="blog-search-input"
                type="search"
                value={searchQuery}
                onChange={(event) => handleSearchChange(event.target.value)}
                placeholder={f.blog.searchPlaceholder}
                autoComplete="off"
                enterKeyHint="search"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="blog-search-clear"
                  onClick={() => handleSearchChange('')}
                  aria-label={f.blog.searchClear}
                >
                  ×
                </button>
              )}
            </div>
          </form>

          <nav className="blog-filters" aria-label="Blog categories">
            <Link
              to={searchQuery ? `/blog?q=${encodeURIComponent(searchQuery)}` : '/blog'}
              aria-current={activeCategory === 'all' ? 'page' : undefined}
              className={`blog-filter-btn${activeCategory === 'all' ? ' blog-filter-btn--active' : ''}`}
            >
              {f.blog.allCategories}
            </Link>
            {blogCategories.map((category) => {
              const path = getBlogCategoryPath(category);
              const href = searchQuery ? `${path}?q=${encodeURIComponent(searchQuery)}` : path;
              return (
                <Link
                  key={category}
                  to={href}
                  aria-current={activeCategory === category ? 'page' : undefined}
                  className={`blog-filter-btn${activeCategory === category ? ' blog-filter-btn--active' : ''}`}
                >
                  {f.blog.categories[category]}
                </Link>
              );
            })}
          </nav>

          <p className="blog-results-meta">
            {f.blog.showingPosts} {paginatedPosts.length} {f.blog.ofPosts} ({filteredPosts.length}{' '}
            {topicLabel}
            {normalizedQuery ? ` ${f.blog.searchResultsFor} “${searchQuery.trim()}”` : ''})
          </p>

          {filteredPosts.length === 0 ? (
            <div className="blog-search-empty" role="status">
              <p>{f.blog.searchEmpty}</p>
              <button type="button" className="btn btn-secondary" onClick={() => handleSearchChange('')}>
                {f.blog.searchClear}
              </button>
            </div>
          ) : (
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
          )}

          {filteredPosts.length > 0 && totalPages > 1 && (
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
