import { useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';
import BlogComments from '../components/BlogComments';
import SeoHead from '../components/SeoHead';
import { blogPosts } from '../data/features';
import { useLanguage } from '../context/LanguageContext';
import { buildBreadcrumbSchema } from '../seo/meta';
import { BlogComment } from '../types';
import { absoluteUrl } from '../seo/site';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { locale, f } = useLanguage();
  const post = blogPosts.find((item) => item.slug === slug);
  const content = post
    ? f.blog.posts[post.titleKey as keyof typeof f.blog.posts]
    : null;

  const updateStructuredData = useCallback(
    (comments: BlogComment[]) => {
      if (!post || !content || !slug) return;

      const pageUrl = absoluteUrl(`/blog/${slug}`);
      const script = document.getElementById('page-jsonld');
      if (!script) return;

      script.textContent = JSON.stringify([
        {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: content.title,
          description: content.excerpt,
          datePublished: post.date,
          dateModified: post.date,
          author: { '@type': 'Organization', name: 'Portillo Ceramic and Tile' },
          publisher: { '@type': 'Organization', name: 'Portillo Ceramic and Tile' },
          mainEntityOfPage: pageUrl,
          url: pageUrl,
          commentCount: comments.length,
          comment: comments.map((comment) => ({
            '@type': 'Comment',
            author: { '@type': 'Person', name: comment.name },
            datePublished: comment.createdAt,
            text: comment.body,
          })),
        },
        buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: locale === 'es' ? 'Blog' : 'Blog', path: '/blog' },
          { name: content.title, path: `/blog/${slug}` },
        ]),
      ]);
    },
    [post, content, slug, locale]
  );

  if (!post || !content) {
    return (
      <section className="section">
        <div className="container text-center">
          <h1>Article not found</h1>
          <Link to="/blog" className="btn btn-secondary">
            {f.blog.backToBlog}
          </Link>
        </div>
      </section>
    );
  }

  const seo = {
    title: content.title,
    description: `${content.excerpt} Expert tile advice for Washington D.C., Maryland, Virginia, and West Virginia.`,
    path: `/blog/${post.slug}`,
    ogType: 'article',
    ogImage: absoluteUrl(post.image.src),
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: content.title,
        description: content.excerpt,
        datePublished: post.date,
        dateModified: post.date,
        author: { '@type': 'Organization', name: 'Portillo Ceramic and Tile' },
        publisher: { '@type': 'Organization', name: 'Portillo Ceramic and Tile' },
        mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
        url: absoluteUrl(`/blog/${post.slug}`),
      },
      buildBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: content.title, path: `/blog/${post.slug}` },
      ]),
    ],
  };

  return (
    <>
      <SeoHead {...seo} />

      <PageHero title={content.title} subtitle={content.excerpt} backgroundImage={post.image} />

      <section className="section">
        <div className="container blog-article">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <p>{content.p1}</p>
          <p>{content.p2}</p>
          <p>{content.p3}</p>
          <Link to="/blog" className="inline-link">
            ← {f.blog.backToBlog}
          </Link>
        </div>
      </section>

      <section className="section section-alt">
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
