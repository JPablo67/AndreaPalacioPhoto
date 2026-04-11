import { initTheme } from './scripts/theme.js';
import { initI18n, setupLangToggle } from './scripts/i18n.js';
import { initAnimations } from './scripts/animations.js';
import { initBlogPostPage } from './scripts/blog-post-page.js';

async function init() {
  initTheme();
  await initI18n();
  setupLangToggle();
  initPageHeader();
  initBlogPostPage();
  initAnimations();
}

function initPageHeader() {
  const header = document.getElementById('site-header');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link, .nav-cta');
  const closeMobileMenu = () => {
    navMenu?.classList.remove('open');
    navToggle?.classList.remove('active');
    navToggle?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  header?.classList.add('scrolled');

  navToggle?.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu?.classList.contains('open')) {
      closeMobileMenu();
      navToggle?.focus();
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
