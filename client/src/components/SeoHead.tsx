import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SeoConfig } from '../seo/meta';
import { SITE_NAME, absoluteUrl, formatTitle } from '../seo/site';

const JSON_LD_ID = 'page-jsonld';

interface SeoHeadProps extends SeoConfig {}

function upsertMeta(name: string, content: string, attribute: 'name' | 'property' = 'name') {
  let tag = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, name);
    document.head.appendChild(tag);
  }
  tag.content = content;
}

function removeMeta(name: string, attribute: 'name' | 'property' = 'name') {
  document.querySelector(`meta[${attribute}="${name}"]`)?.remove();
}

function upsertLink(rel: string, href: string, attrs: Record<string, string> = {}) {
  const selectorParts = [`link[rel="${rel}"]`];
  if (attrs.type) selectorParts.push(`[type="${attrs.type}"]`);
  let tag = document.querySelector(selectorParts.join('')) as HTMLLinkElement | null;

  if (!tag) {
    tag = document.createElement('link');
    tag.rel = rel;
    document.head.appendChild(tag);
  }

  tag.href = href;
  Object.entries(attrs).forEach(([key, value]) => {
    tag!.setAttribute(key, value);
  });
}

function clearAlternateLinks() {
  document.querySelectorAll('link[rel="alternate"]').forEach((tag) => tag.remove());
}

function upsertJsonLd(data: object | object[] | undefined) {
  const existing = document.getElementById(JSON_LD_ID);
  existing?.remove();

  if (!data) return;

  const schemas = Array.isArray(data) ? data : [data];
  const script = document.createElement('script');
  script.id = JSON_LD_ID;
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schemas.length === 1 ? schemas[0] : schemas);
  document.head.appendChild(script);
}

export default function SeoHead({
  title,
  description,
  path,
  keywords,
  jsonLd,
  ogType = 'website',
  ogImage,
  noindex = false,
  article,
  alternateLinks,
}: SeoHeadProps) {
  const { locale } = useLanguage();
  const fullTitle = formatTitle(title);
  const canonical = absoluteUrl(path);
  const image = ogImage || absoluteUrl('/favicon.svg');

  useEffect(() => {
    document.title = fullTitle;
    document.documentElement.lang = locale === 'es' ? 'es' : 'en';
    upsertMeta('description', description);
    if (keywords?.length) {
      upsertMeta('keywords', keywords.join(', '));
    } else {
      removeMeta('keywords');
    }
    upsertLink('canonical', canonical);
    upsertMeta('robots', noindex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large');

    upsertMeta('og:title', fullTitle, 'property');
    upsertMeta('og:description', description, 'property');
    upsertMeta('og:type', ogType, 'property');
    upsertMeta('og:url', canonical, 'property');
    upsertMeta('og:site_name', SITE_NAME, 'property');
    upsertMeta('og:locale', locale === 'es' ? 'es_US' : 'en_US', 'property');
    upsertMeta('og:image', image, 'property');
    upsertMeta('og:image:alt', title, 'property');

    if (article) {
      upsertMeta('article:published_time', article.publishedTime, 'property');
      upsertMeta('article:modified_time', article.modifiedTime || article.publishedTime, 'property');
      if (article.section) {
        upsertMeta('article:section', article.section, 'property');
      }
      if (article.author) {
        upsertMeta('article:author', article.author, 'property');
      }
      document.querySelectorAll('meta[property="article:tag"]').forEach((tag) => tag.remove());
      article.tags?.forEach((tag) => {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'article:tag');
        meta.content = tag;
        document.head.appendChild(meta);
      });
    } else {
      removeMeta('article:published_time', 'property');
      removeMeta('article:modified_time', 'property');
      removeMeta('article:section', 'property');
      removeMeta('article:author', 'property');
      document.querySelectorAll('meta[property="article:tag"]').forEach((tag) => tag.remove());
    }

    upsertMeta('twitter:card', 'summary_large_image');
    upsertMeta('twitter:title', fullTitle);
    upsertMeta('twitter:description', description);
    upsertMeta('twitter:image', image);

    clearAlternateLinks();
    alternateLinks?.forEach((link) => {
      upsertLink('alternate', link.href, {
        ...(link.type ? { type: link.type } : {}),
        ...(link.title ? { title: link.title } : {}),
        ...(link.hreflang ? { hreflang: link.hreflang } : {}),
      });
    });

    upsertJsonLd(jsonLd);
  }, [
    fullTitle,
    description,
    canonical,
    keywords,
    jsonLd,
    ogType,
    image,
    noindex,
    locale,
    title,
    article,
    alternateLinks,
  ]);

  return null;
}
