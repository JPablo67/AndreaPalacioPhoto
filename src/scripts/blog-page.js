/**
 * Blog Page Renderer
 * Builds the standalone /blog/ archive and updates SEO schema.
 */

import { getTranslations, getLang } from './i18n.js';
import { enrichBlogPosts, normalizePostDate } from './blog-data.js';

const SITE_URL = 'https://andreapalacio.art';

export function initBlogPage() {
  renderBlogPage();
  window.addEventListener('langchange', renderBlogPage);
}

function renderBlogPage() {
  const lang = getLang();
  const translations = getTranslations();
  const posts = enrichBlogPosts(translations?.journal?.posts || [], lang);
  const featured = posts[0];

  renderFeaturedArticle(featured, translations);
  renderArticleArchive(posts, translations);
  updateBlogSchema(posts, translations, lang);
}

function renderFeaturedArticle(post, translations) {
  const container = document.getElementById('blog-featured');
  if (!container || !post) return;
  const readMore = translations?.journal?.read_more || 'Read More →';
  const startProject = translations?.blogPage?.primary_cta || 'Start a Project';

  container.innerHTML = `
    <article class="blog-featured-card anim-fade-up" id="featured-${post.id}">
      <div class="blog-featured-visual" style="background:${post.gradient};">
        <span class="blog-featured-badge">${translations?.blogPage?.featured_label || 'Featured Perspective'}</span>
      </div>
      <div class="blog-featured-copy">
        <div class="blog-entry-meta">
          <span>${post.tag}</span>
          <span>${post.date}</span>
          <span>${post.readTime}</span>
        </div>
        <h2 class="blog-featured-title">${post.title}</h2>
        <p class="blog-featured-excerpt">${post.excerpt}</p>
        <div class="blog-entry-actions">
          <a href="${post.href}" class="btn btn-primary">${readMore}</a>
          <a href="/#contact" class="btn btn-ghost">${startProject}</a>
        </div>
      </div>
    </article>
  `;
}

function renderArticleArchive(posts, translations) {
  const container = document.getElementById('blog-article-list');
  if (!container) return;
  const readMore = translations?.journal?.read_more || 'Read More →';
  const secondaryCta = translations?.blogPage?.secondary_cta || 'View Portfolio';

  container.innerHTML = posts.map((post, index) => `
    <article class="blog-index-article anim-fade-up ${index % 2 ? 'blog-index-article-reverse' : ''}" id="${post.id}">
      <div class="blog-index-visual" style="background:${post.gradient};">
        <span class="blog-index-number">${String(index + 1).padStart(2, '0')}</span>
      </div>
      <div class="blog-index-copy">
        <div class="blog-entry-meta">
          <span>${post.tag}</span>
          <span>${post.date}</span>
          <span>${post.readTime}</span>
        </div>
        <h2 class="blog-index-title">${post.title}</h2>
        <p class="blog-index-excerpt">${post.excerpt}</p>
        <div class="blog-entry-actions">
          <a href="${post.href}" class="btn btn-primary btn-sm">${readMore}</a>
          <a href="/#portfolio" class="btn btn-ghost btn-sm">${secondaryCta}</a>
        </div>
      </div>
    </article>
  `).join('');
}

function updateBlogSchema(posts, translations, lang) {
  const schemaEl = document.getElementById('blog-schema');
  if (!schemaEl) return;

  const blogUrl = `${SITE_URL}/blog/${lang === 'es' ? '?lang=es' : ''}`;
  const homeUrl = `${SITE_URL}/${lang === 'es' ? '?lang=es' : ''}`;
  const collectionPage = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: translations?.meta?.blog?.title || 'Journal | Andrea Palacio Photography',
    description: translations?.meta?.blog?.description || '',
    url: blogUrl,
    inLanguage: lang,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Andrea Palacio Photography',
      url: SITE_URL
    },
    about: [
      'Hospitality photography',
      'Restaurant photography',
      'Real estate photography',
      'Brand campaign photography'
    ],
    mainEntity: {
      '@type': 'Blog',
      name: 'Andrea Palacio Journal',
      blogPost: posts.map((post) => ({
        '@type': 'BlogPosting',
        headline: post.title,
        datePublished: normalizePostDate(post.date, lang),
        dateModified: normalizePostDate(post.date, lang),
        keywords: post.tag,
        url: `${SITE_URL}${post.href}`,
        description: post.excerpt,
        author: {
          '@type': 'Person',
          name: 'Andrea Palacio'
        },
        publisher: {
          '@type': 'Organization',
          name: 'Andrea Palacio Photography',
          url: SITE_URL
        }
      }))
    }
  };

  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: lang === 'es' ? 'Inicio' : 'Home',
        item: homeUrl
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: translations?.journal?.title || 'Journal',
        item: blogUrl
      }
    ]
  };

  schemaEl.textContent = JSON.stringify([collectionPage, breadcrumbs]);
}
