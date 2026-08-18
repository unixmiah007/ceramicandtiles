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

function upsertLink(rel: string, href: string) {
  let tag = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!tag) {
    tag = document.createElement('link');
    tag.rel = rel;
    document.head.appendChild(tag);
  }
  tag.href = href;
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
}: SeoHeadProps) {
  const { locale } = useLanguage();
  const fullTitle = formatTitle(title);
  const canonical = absoluteUrl(path);
  const image = ogImage || absoluteUrl('/favicon.svg');

  useEffect(() => {
    document.title = fullTitle;
    upsertMeta('description', description);
    if (keywords?.length) {
      upsertMeta('keywords', keywords.join(', '));
    }
    upsertLink('canonical', canonical);
    upsertMeta('robots', noindex ? 'noindex,nofollow' : 'index,follow');

    upsertMeta('og:title', fullTitle, 'property');
    upsertMeta('og:description', description, 'property');
    upsertMeta('og:type', ogType, 'property');
    upsertMeta('og:url', canonical, 'property');
    upsertMeta('og:site_name', SITE_NAME, 'property');
    upsertMeta('og:locale', locale === 'es' ? 'es_US' : 'en_US', 'property');
    upsertMeta('og:image', image, 'property');

    upsertMeta('twitter:card', 'summary_large_image');
    upsertMeta('twitter:title', fullTitle);
    upsertMeta('twitter:description', description);
    upsertMeta('twitter:image', image);

    upsertJsonLd(jsonLd);
  }, [fullTitle, description, canonical, keywords, jsonLd, ogType, image, noindex, locale]);

  return null;
}
