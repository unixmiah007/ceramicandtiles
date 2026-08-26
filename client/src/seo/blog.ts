import { blogPosts, type BlogCategory, type BlogPost } from '../data/blog';
import { Locale } from '../i18n/types';
import { buildBreadcrumbSchema, SeoConfig } from './meta';
import { BUSINESS, LOCAL_SEO, SITE_NAME, SITE_URL, absoluteUrl } from './site';

export interface BlogPostContent {
  title: string;
  excerpt: string;
  paragraphs: string[];
}

const PUBLISHER = {
  '@type': 'Organization' as const,
  name: SITE_NAME,
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject' as const,
    url: absoluteUrl('/favicon.svg'),
  },
};

const CATEGORY_KEYWORDS: Record<BlogCategory, string[]> = {
  tile: [
    'tile installation tips',
    'tile selection guide',
    'grout color',
    'Schluter waterproofing',
    'large format tile',
    'tile layout patterns',
    'floor tile durability',
  ],
  ceramic: [
    'ceramic tile',
    'porcelain vs ceramic',
    'ceramic tile maintenance',
    'ceramic floor tile',
    'ceramic backsplash',
    'ceramic tile installation',
  ],
  bathroom: [
    'bathroom tile ideas',
    'shower tile installation',
    'bathroom renovation',
    'bathroom waterproofing',
    'walk-in shower tile',
    'bathroom floor tile',
  ],
  bedroom: [
    'bedroom flooring',
    'bedroom tile ideas',
    'bedroom renovation',
    'accent wall tile',
    'bedroom design',
  ],
  livingroom: [
    'living room tile',
    'living room flooring',
    'fireplace tile',
    'open concept tile',
    'living room renovation',
  ],
};

const BASE_BLOG_KEYWORDS = [
  'tile blog',
  'tile tips',
  'home renovation advice',
  'Portillo Ceramic and Tile',
  ...LOCAL_SEO.keywords.slice(0, 6),
];

function countWords(paragraphs: string[]): number {
  return paragraphs.join(' ').split(/\s+/).filter(Boolean).length;
}

function categoryPath(category: BlogCategory): string {
  return `/blog/category/${category}`;
}

export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  const sameCategory = blogPosts.filter(
    (item) => item.category === post.category && item.slug !== post.slug
  );
  const others = blogPosts.filter(
    (item) => item.category !== post.category && item.slug !== post.slug
  );

  return [...sameCategory, ...others].slice(0, limit);
}

export function buildBlogPostingSchema(
  post: BlogPost,
  content: BlogPostContent,
  locale: Locale,
  categoryLabel: string,
  commentCount = 0,
  comments: { name: string; body: string; createdAt: string }[] = []
) {
  const pageUrl = absoluteUrl(`/blog/${post.slug}`);
  const wordCount = countWords(content.paragraphs);

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${pageUrl}#article`,
    headline: content.title,
    description: content.excerpt,
    image: {
      '@type': 'ImageObject',
      url: absoluteUrl(post.image.src),
      caption: post.image.alt,
    },
    datePublished: post.date,
    dateModified: post.date,
    author: PUBLISHER,
    publisher: PUBLISHER,
    mainEntityOfPage: pageUrl,
    url: pageUrl,
    articleSection: categoryLabel,
    keywords: [...CATEGORY_KEYWORDS[post.category], ...BASE_BLOG_KEYWORDS.slice(0, 4)].join(', '),
    wordCount,
    inLanguage: locale === 'es' ? 'es-US' : 'en-US',
    isPartOf: {
      '@type': 'Blog',
      '@id': `${SITE_URL}/blog#blog`,
      name: locale === 'es' ? 'Consejos de Azulejos' : 'Tile Tips & Insights',
      url: absoluteUrl('/blog'),
    },
  };

  if (commentCount > 0) {
    schema.commentCount = commentCount;
    schema.comment = comments.map((comment) => ({
      '@type': 'Comment',
      author: { '@type': 'Person', name: comment.name },
      datePublished: comment.createdAt,
      text: comment.body,
    }));
  }

  return schema;
}

export function getBlogListingSeo(
  locale: Locale,
  posts: BlogPost[],
  getContent: (post: BlogPost) => BlogPostContent
): SeoConfig {
  const area = LOCAL_SEO.serviceAreaLabel;
  const title =
    locale === 'es'
      ? `Consejos de Azulejos y Cerámica para Propietarios en ${area}`
      : `Tile & Ceramic Tips for ${area} Homeowners`;
  const description =
    locale === 'es'
      ? `Más de ${posts.length} artículos sobre azulejos, cerámica, baños, dormitorios y salas. Consejos de selección, instalación e impermeabilización de Portillo Ceramic and Tile.`
      : `${posts.length}+ expert articles on tile, ceramic, bathrooms, bedrooms, and living spaces. Selection, installation, and waterproofing advice from Portillo Ceramic and Tile serving ${area}.`;

  const sorted = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return {
    title,
    description,
    path: '/blog',
    keywords: [...BASE_BLOG_KEYWORDS, ...Object.values(CATEGORY_KEYWORDS).flat()],
    ogType: 'website',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        '@id': `${SITE_URL}/blog#blog`,
        name: locale === 'es' ? 'Consejos de Azulejos' : 'Tile Tips & Insights',
        description,
        url: absoluteUrl('/blog'),
        publisher: PUBLISHER,
        inLanguage: locale === 'es' ? 'es-US' : 'en-US',
        blogPost: sorted.slice(0, 20).map((post) => {
          const content = getContent(post);
          return {
            '@type': 'BlogPosting',
            headline: content.title,
            url: absoluteUrl(`/blog/${post.slug}`),
            datePublished: post.date,
          };
        }),
      },
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: locale === 'es' ? 'Artículos del blog' : 'Blog articles',
        numberOfItems: sorted.length,
        itemListElement: sorted.map((post, index) => {
          const content = getContent(post);
          return {
            '@type': 'ListItem',
            position: index + 1,
            url: absoluteUrl(`/blog/${post.slug}`),
            name: content.title,
          };
        }),
      },
      buildBreadcrumbSchema([
        { name: locale === 'es' ? 'Inicio' : 'Home', path: '/' },
        { name: locale === 'es' ? 'Blog' : 'Blog', path: '/blog' },
      ]),
    ],
    alternateLinks: [{ href: absoluteUrl('/rss.xml'), type: 'application/rss+xml', title: 'Portillo Ceramic and Tile Blog' }],
  };
}

export function getBlogCategorySeo(
  category: BlogCategory,
  categoryLabel: string,
  locale: Locale,
  posts: BlogPost[],
  getContent: (post: BlogPost) => BlogPostContent
): SeoConfig {
  const area = LOCAL_SEO.serviceAreaLabel;
  const filtered = posts.filter((post) => post.category === category);
  const title =
    locale === 'es'
      ? `${categoryLabel} — Consejos de Azulejos en ${area}`
      : `${categoryLabel} Tile Tips — ${area}`;
  const description =
    locale === 'es'
      ? `${filtered.length} artículos sobre ${categoryLabel.toLowerCase()}: selección, instalación y mantenimiento para propietarios en ${area}.`
      : `${filtered.length} expert ${categoryLabel.toLowerCase()} articles on selection, installation, and maintenance for homeowners in ${area}.`;

  return {
    title,
    description,
    path: categoryPath(category),
    keywords: [...CATEGORY_KEYWORDS[category], ...BASE_BLOG_KEYWORDS.slice(0, 4)],
    ogType: 'website',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: title,
        description,
        url: absoluteUrl(categoryPath(category)),
        isPartOf: { '@id': `${SITE_URL}/blog#blog` },
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: filtered.length,
          itemListElement: filtered.map((post, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: absoluteUrl(`/blog/${post.slug}`),
            name: getContent(post).title,
          })),
        },
      },
      buildBreadcrumbSchema([
        { name: locale === 'es' ? 'Inicio' : 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: categoryLabel, path: categoryPath(category) },
      ]),
    ],
    alternateLinks: [{ href: absoluteUrl('/rss.xml'), type: 'application/rss+xml', title: 'Portillo Ceramic and Tile Blog' }],
  };
}

export function getBlogPostSeo(
  post: BlogPost,
  content: BlogPostContent,
  locale: Locale,
  categoryLabel: string
): SeoConfig {
  const area = LOCAL_SEO.serviceAreaLabel;
  const description = `${content.excerpt} Expert ${categoryLabel.toLowerCase()} advice for ${area}.`;

  return {
    title: content.title,
    description,
    path: `/blog/${post.slug}`,
    keywords: [
      ...CATEGORY_KEYWORDS[post.category],
      content.title,
      BUSINESS.owner,
      ...LOCAL_SEO.keywords.slice(0, 4),
    ],
    ogType: 'article',
    ogImage: absoluteUrl(post.image.src),
    article: {
      publishedTime: post.date,
      modifiedTime: post.date,
      section: categoryLabel,
      tags: CATEGORY_KEYWORDS[post.category],
      author: SITE_NAME,
    },
    jsonLd: [
      buildBlogPostingSchema(post, content, locale, categoryLabel),
      buildBreadcrumbSchema([
        { name: locale === 'es' ? 'Inicio' : 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: categoryLabel, path: categoryPath(post.category) },
        { name: content.title, path: `/blog/${post.slug}` },
      ]),
    ],
    alternateLinks: [{ href: absoluteUrl('/rss.xml'), type: 'application/rss+xml', title: 'Portillo Ceramic and Tile Blog' }],
  };
}

export function getBlogCategoryPath(category: BlogCategory): string {
  return categoryPath(category);
}
