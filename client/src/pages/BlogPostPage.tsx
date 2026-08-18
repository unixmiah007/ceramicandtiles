import { useCallback, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';
import BlogComments from '../components/BlogComments';
import { blogPosts } from '../data/features';
import { useLanguage } from '../context/LanguageContext';
import { BlogComment } from '../types';

const SITE_URL = 'https://portilloceramicandtile.com';

function upsertJsonLd(id: string, data: object) {
  let script = document.getElementById(id) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { f } = useLanguage();
  const post = blogPosts.find((item) => item.slug === slug);
  const content = post
    ? f.blog.posts[post.titleKey as keyof typeof f.blog.posts]
    : null;

  const updateStructuredData = useCallback(
    (comments: BlogComment[]) => {
      if (!post || !slug || !content) return;

      const pageUrl = `${SITE_URL}/blog/${slug}`;

      upsertJsonLd('blog-post-jsonld', {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: content.title,
        description: content.excerpt,
        datePublished: post.date,
        dateModified: post.date,
        author: {
          '@type': 'Organization',
          name: 'Portillo Ceramic and Tile',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Portillo Ceramic and Tile',
        },
        mainEntityOfPage: pageUrl,
        url: pageUrl,
        commentCount: comments.length,
        comment: comments.map((comment) => ({
          '@type': 'Comment',
          author: { '@type': 'Person', name: comment.name },
          datePublished: comment.createdAt,
          text: comment.body,
        })),
      });
    },
    [post, slug, content]
  );

  useEffect(() => {
    if (!post || !content) return;

    document.title = `${content.title} | Portillo Ceramic and Tile`;

    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = content.excerpt;
    updateStructuredData([]);

    return () => {
      document.title = 'Portillo Ceramic and Tile';
    };
  }, [post, content, updateStructuredData]);

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

  return (
    <>
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
