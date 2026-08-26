import { useCallback, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import PageHero from '../components/PageHero';
import StockImage from '../components/StockImage';
import CTASection from '../components/CTASection';
import BlogComments from '../components/BlogComments';
import SeoHead from '../components/SeoHead';
import { blogPosts } from '../data/blog';
import { useLanguage } from '../context/LanguageContext';
import {
  buildBlogPostingSchema,
  getBlogCategoryPath,
  getBlogPostSeo,
  getRelatedPosts,
} from '../seo/blog';
import { buildBreadcrumbSchema } from '../seo/meta';
import { BlogComment } from '../types';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { locale, f } = useLanguage();
  const post = blogPosts.find((item) => item.slug === slug);
  const content = post
    ? f.blog.posts[post.titleKey as keyof typeof f.blog.posts]
    : null;

  const relatedPosts = useMemo(
    () => (post ? getRelatedPosts(post) : []),
    [post]
  );

  const updateStructuredData = useCallback(
    (comments: BlogComment[]) => {
      if (!post || !content || !slug) return;

      const script = document.getElementById('page-jsonld');
      if (!script) return;

      script.textContent = JSON.stringify([
        buildBlogPostingSchema(
          post,
          content,
          locale,
          f.blog.categories[post.category],
          comments.length,
          comments
        ),
        buildBreadcrumbSchema([
          { name: locale === 'es' ? 'Inicio' : 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: f.blog.categories[post.category], path: getBlogCategoryPath(post.category) },
          { name: content.title, path: `/blog/${slug}` },
        ]),
      ]);
    },
    [post, content, slug, locale, f.blog.categories]
  );

  if (!post || !content) {
    return (
      <>
        <SeoHead
          title="Article not found"
          description="The requested blog article could not be found."
          path="/blog"
          noindex
        />
        <section className="section">
          <div className="container text-center">
            <h1>Article not found</h1>
            <Link to="/blog" className="btn btn-secondary">
              {f.blog.backToBlog}
            </Link>
          </div>
        </section>
      </>
    );
  }

  const seo = getBlogPostSeo(post, content, locale, f.blog.categories[post.category]);

  return (
    <>
      <SeoHead {...seo} />

      <PageHero title={content.title} subtitle={content.excerpt} backgroundImage={post.image} />

      <article className="section" itemScope itemType="https://schema.org/BlogPosting">
        <div className="container blog-article">
          <meta itemProp="headline" content={content.title} />
          <meta itemProp="description" content={content.excerpt} />
          <meta itemProp="datePublished" content={post.date} />
          <meta itemProp="dateModified" content={post.date} />
          <Link to={getBlogCategoryPath(post.category)} className="blog-card-category" itemProp="articleSection">
            {f.blog.categories[post.category]}
          </Link>
          <time dateTime={post.date} itemProp="datePublished">
            {new Date(post.date).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          {content.paragraphs.map((paragraph, index) => (
            <p key={index} itemProp={index === 0 ? 'articleBody' : undefined}>
              {paragraph}
            </p>
          ))}

          <nav className="blog-article-links" aria-label="Related site links">
            <Link to="/estimate" className="inline-link">
              {f.blog.getEstimate}
            </Link>
            <Link to="/contact" className="inline-link">
              {f.blog.requestQuote}
            </Link>
            <Link to={getBlogCategoryPath(post.category)} className="inline-link">
              {f.blog.moreInCategory.replace('{category}', f.blog.categories[post.category])}
            </Link>
          </nav>

          <Link to="/blog" className="inline-link">
            ← {f.blog.backToBlog}
          </Link>
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="section section-alt">
          <div className="container">
            <h2 className="blog-related-title">{f.blog.relatedPosts}</h2>
            <div className="blog-related-grid">
              {relatedPosts.map((related) => {
                const relatedContent =
                  f.blog.posts[related.titleKey as keyof typeof f.blog.posts];
                return (
                  <article key={related.id} className="blog-related-card">
                    <Link to={`/blog/${related.slug}`}>
                      <StockImage
                        image={related.image}
                        aspectRatio="16 / 10"
                        className="blog-related-image"
                      />
                    </Link>
                    <div className="blog-related-body">
                      <Link to={getBlogCategoryPath(related.category)} className="blog-card-category">
                        {f.blog.categories[related.category]}
                      </Link>
                      <h3>
                        <Link to={`/blog/${related.slug}`}>{relatedContent.title}</Link>
                      </h3>
                      <p>{relatedContent.excerpt}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <BlogComments
            slug={post.slug}
            postTitle={content.title}
            postDate={post.date}
            onCommentsChange={updateStructuredData}
          />
        </div>
      </section>

      <CTASection />
    </>
  );
}
