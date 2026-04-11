/**
 * Blog Post Page Renderer
 */

import { getLang } from './i18n.js';
import { getBlogPost, getRelatedBlogPosts, getBlogUi } from './blog-content.js';

const SITE_URL = 'https://andreapalacio.art';

export function initBlogPostPage() {
  renderBlogPostPage();
  window.addEventListener('langchange', renderBlogPostPage);
}

function renderBlogPostPage() {
  const postId = document.body?.dataset.postId;
  const lang = getLang();
  const post = getBlogPost(postId, lang);
  const ui = getBlogUi(lang);
  const relatedPosts = getRelatedBlogPosts(postId, lang);

  if (!post) return;

  renderHero(post, ui, lang);
  renderSidebar(post, ui);
  renderContent(post);
  renderFaq(post, ui);
  renderRelated(post, relatedPosts, ui);
  updateMeta(post);
  updateSchema(post, lang);
}

function renderHero(post, ui, lang) {
  const hero = document.getElementById('post-hero');
  if (!hero) return;

  hero.innerHTML = `
    <div class="post-hero-grid">
      <div class="post-hero-copy anim-fade-up">
        <nav class="blog-breadcrumbs" aria-label="Breadcrumb">
          <a href="/">${lang === 'es' ? 'Inicio' : 'Home'}</a>
          <span>/</span>
          <a href="/blog/">${lang === 'es' ? 'Blog' : 'Journal'}</a>
          <span>/</span>
          <span>${post.title}</span>
        </nav>
        <p class="section-label">${post.eyebrow}</p>
        <h1 class="post-title">${post.title}</h1>
        <p class="post-intro">${post.intro}</p>
        <div class="blog-entry-meta">
          <span>${post.eyebrow}</span>
          <span>${ui.published}</span>
          <span>${formatDate(post.published, lang)}</span>
          <span>${post.readTime}</span>
        </div>
      </div>
      <aside class="post-hero-panel anim-fade-up anim-delay-1" style="background:${post.gradient};">
        <div class="post-hero-panel-overlay"></div>
        <div class="post-hero-panel-content">
          ${post.highlights.map((item) => `
            <div class="post-highlight-item">
              <strong>${item.value}</strong>
              <span>${item.label}</span>
            </div>
          `).join('')}
        </div>
      </aside>
    </div>
  `;
}

function renderSidebar(post, ui) {
  const sidebar = document.getElementById('post-sidebar');
  if (!sidebar) return;

  sidebar.innerHTML = `
    <div class="post-sticky-stack">
      <div class="post-sticky-card anim-fade-up">
        <h2 class="post-sidebar-heading">${ui.inThisArticle}</h2>
        <ol class="post-toc">
          ${post.sections.map((section, index) => `
            <li><a href="#section-${index + 1}">${section.title}</a></li>
          `).join('')}
        </ol>
      </div>
      <div class="post-sticky-card anim-fade-up anim-delay-1">
        <h2 class="post-sidebar-heading">${ui.keyTakeaways}</h2>
        <ul class="post-takeaway-list">
          ${post.takeaways.map((item) => `<li>${item}</li>`).join('')}
        </ul>
      </div>
      <div class="post-sticky-card post-sticky-cta anim-fade-up anim-delay-2">
        <h2 class="post-sidebar-heading">${ui.readyTitle}</h2>
        <p>${ui.readyCopy}</p>
        <div class="blog-entry-actions">
          <a href="/#contact" class="btn btn-primary btn-sm">${ui.startProject}</a>
          <a href="/#portfolio" class="btn btn-ghost btn-sm">${ui.viewPortfolio}</a>
        </div>
      </div>
    </div>
  `;
}

function renderContent(post) {
  const content = document.getElementById('post-content');
  if (!content) return;

  content.innerHTML = `
    <div class="post-lead anim-fade-up">
      <p>${post.lead}</p>
    </div>
    ${post.sections.map((section, index) => `
      <section class="post-section anim-fade-up" id="section-${index + 1}">
        <h2 class="post-section-title">${section.title}</h2>
        ${section.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join('')}
        ${section.bullets?.length ? `
          <ul class="post-bullet-list">
            ${section.bullets.map((bullet) => `<li>${bullet}</li>`).join('')}
          </ul>
        ` : ''}
      </section>
    `).join('')}
  `;
}

function renderFaq(post, ui) {
  const faq = document.getElementById('post-faq');
  if (!faq) return;

  faq.innerHTML = `
    <div class="section-header anim-fade-up">
      <p class="section-label">${ui.commonQuestions}</p>
      <h2 class="section-title">${ui.commonQuestions}</h2>
    </div>
    <div class="post-faq-list">
      ${post.faqs.map((item, index) => `
        <details class="post-faq-item anim-fade-up ${index ? 'anim-delay-1' : ''}">
          <summary>${item.question}</summary>
          <div class="post-faq-answer">
            <p>${item.answer}</p>
          </div>
        </details>
      `).join('')}
    </div>
  `;
}

function renderRelated(post, relatedPosts, ui) {
  const related = document.getElementById('post-related');
  if (!related) return;

  related.innerHTML = `
    <div class="section-header anim-fade-up">
      <p class="section-label">${ui.relatedArticles}</p>
      <h2 class="section-title">${ui.relatedArticles}</h2>
    </div>
    <div class="journal-grid post-related-grid">
      ${relatedPosts.map((item) => `
        <a class="journal-card-link anim-fade-up" href="${item.href}" aria-label="${item.title}">
          <article class="journal-card" role="article">
            <div class="journal-card-image-wrapper">
              <div class="journal-card-image" style="background:${item.gradient};"></div>
            </div>
            <div class="journal-card-content">
              <span class="journal-card-tag">${item.eyebrow}</span>
              <h3 class="journal-card-title">${item.title}</h3>
              <p class="journal-card-excerpt">${item.excerpt}</p>
              <div class="journal-card-meta">
                <span class="journal-card-date">${formatDate(item.published, document.documentElement.lang)}</span>
                <span class="journal-card-read">${item.readTime}</span>
              </div>
              <span class="journal-card-readmore">${ui.readArticle}</span>
            </div>
          </article>
        </a>
      `).join('')}
    </div>
  `;
}

function updateMeta(post) {
  document.title = post.seoTitle;

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.content = post.seoDescription;

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.content = post.seoTitle;

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.content = post.seoDescription;
}

function updateSchema(post, lang) {
  const schemaEl = document.getElementById('blog-post-schema');
  if (!schemaEl) return;

  const pageUrl = `${SITE_URL}${post.href}`;
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.seoDescription,
    datePublished: post.published,
    dateModified: post.published,
    mainEntityOfPage: pageUrl,
    inLanguage: lang,
    articleSection: post.eyebrow,
    keywords: [post.eyebrow, 'commercial photography', 'editorial photography'],
    author: {
      '@type': 'Person',
      name: 'Andrea Palacio'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Andrea Palacio Photography',
      url: SITE_URL
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
        item: SITE_URL
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: lang === 'es' ? 'Blog' : 'Journal',
        item: `${SITE_URL}/blog/`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: pageUrl
      }
    ]
  };

  schemaEl.textContent = JSON.stringify([articleSchema, breadcrumbs]);
}

function formatDate(dateString, lang) {
  const locale = lang === 'es' ? 'es-MX' : 'en-US';
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(`${dateString}T12:00:00`));
}
