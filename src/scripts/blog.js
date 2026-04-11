/**
 * Blog — Journal Section Renderer
 * Andrea Palacio Photography
 */

import { getTranslations, getLang } from './i18n.js';
import { enrichBlogPosts } from './blog-data.js';

/**
 * Initialize journal/blog section
 */
export function initBlog() {
  renderBlogPosts();

  // Re-render on language change
  window.addEventListener('langchange', () => {
    renderBlogPosts();
  });
}

/**
 * Render blog post cards
 */
function renderBlogPosts() {
  const grid = document.getElementById('journal-grid');
  if (!grid) return;

  const translations = getTranslations();
  const lang = getLang();
  const posts = enrichBlogPosts(translations?.journal?.posts || [], lang);
  const readMore = translations?.journal?.read_more || 'Read More →';

  grid.innerHTML = posts.map((post, i) => `
    <a class="journal-card-link" href="${post.href}" aria-label="${post.title}">
      <article class="journal-card" role="article">
        <div class="journal-card-image-wrapper">
          <div class="journal-card-image" style="width:100%;aspect-ratio:16/10;background:${post.gradient};"></div>
        </div>
        <div class="journal-card-content">
          <span class="journal-card-tag">${post.tag}</span>
          <h3 class="journal-card-title">${post.title}</h3>
          <p class="journal-card-excerpt">${post.excerpt}</p>
          <div class="journal-card-meta">
            <span class="journal-card-date">${post.date}</span>
            <span class="journal-card-read">${post.readTime}</span>
          </div>
          <span class="journal-card-readmore">${readMore}</span>
        </div>
      </article>
    </a>
  `).join('');
}
