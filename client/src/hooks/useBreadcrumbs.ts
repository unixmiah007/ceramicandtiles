import { useMemo } from 'react';
import { matchPath, useLocation } from 'react-router-dom';
import { blogCategories, blogPosts, type BlogCategory } from '../data/blog';
import { useLanguage } from '../context/LanguageContext';
import { getBlogCategoryPath } from '../seo/blog';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

function isBlogCategory(value: string): value is BlogCategory {
  return blogCategories.includes(value as BlogCategory);
}

export function useBreadcrumbs(): BreadcrumbItem[] | null {
  const { pathname } = useLocation();
  const { t, f, getServiceById, getValueById, projects } = useLanguage();

  return useMemo(() => {
    if (pathname === '/') {
      return null;
    }

    const crumbs: BreadcrumbItem[] = [{ label: t.nav.home, path: '/' }];

    const blogCategoryMatch = matchPath({ path: '/blog/category/:category', end: true }, pathname);
    if (blogCategoryMatch?.params.category && isBlogCategory(blogCategoryMatch.params.category)) {
      const category = blogCategoryMatch.params.category;
      crumbs.push({ label: f.nav.blog, path: '/blog' });
      crumbs.push({ label: f.blog.categories[category] });
      return crumbs;
    }

    const blogPostMatch = matchPath({ path: '/blog/:slug', end: true }, pathname);
    if (blogPostMatch?.params.slug) {
      const post = blogPosts.find((item) => item.slug === blogPostMatch.params.slug);
      crumbs.push({ label: f.nav.blog, path: '/blog' });
      if (post) {
        const content = f.blog.posts[post.titleKey as keyof typeof f.blog.posts];
        crumbs.push({
          label: f.blog.categories[post.category],
          path: getBlogCategoryPath(post.category),
        });
        crumbs.push({ label: content.title });
      } else {
        crumbs.push({ label: f.blog.readMore });
      }
      return crumbs;
    }

    const serviceMatch = matchPath({ path: '/services/:serviceId', end: true }, pathname);
    if (serviceMatch?.params.serviceId) {
      const service = getServiceById(serviceMatch.params.serviceId);
      if (service) {
        crumbs.push({ label: t.nav.services, path: '/services' });
        crumbs.push({ label: service.title });
        return crumbs;
      }
    }

    const valueMatch = matchPath({ path: '/why-portillo/:valueId', end: true }, pathname);
    if (valueMatch?.params.valueId) {
      const value = getValueById(valueMatch.params.valueId);
      if (value) {
        crumbs.push({ label: t.nav.whyPortillo, path: '/why-portillo' });
        crumbs.push({ label: value.title });
        return crumbs;
      }
    }

    const projectMatch = matchPath({ path: '/experience/:projectId', end: true }, pathname);
    if (projectMatch?.params.projectId) {
      const project = projects.find((item) => item.id === projectMatch.params.projectId);
      if (project) {
        crumbs.push({ label: t.nav.experience, path: '/experience' });
        crumbs.push({ label: project.name });
        return crumbs;
      }
    }

    const staticLabels: Record<string, string> = {
      '/experience': t.nav.experience,
      '/services': t.nav.services,
      '/why-portillo': t.nav.whyPortillo,
      '/contact': t.nav.contact,
      '/quote-wizard': t.nav.quoteWizard,
      '/faq': f.nav.faq,
      '/service-area': f.nav.serviceArea,
      '/before-after': f.nav.beforeAfter,
      '/estimate': f.nav.estimate,
      '/blog': f.nav.blog,
      '/checklist': f.nav.checklist,
    };

    const label = staticLabels[pathname];
    if (label) {
      crumbs.push({ label });
      return crumbs;
    }

    return crumbs.length > 1 ? crumbs : null;
  }, [pathname, t, f, getServiceById, getValueById, projects]);
}
