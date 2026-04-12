/**
 * Main — App Entry Point
 * Andrea Palacio Photography
 */

import { initTheme } from './scripts/theme.js';
import { initI18n, setupLangToggle } from './scripts/i18n.js';
import { initAnimations, initCounters, initParallax, initStickyMobileCTA } from './scripts/animations.js';
import { initGallery } from './scripts/gallery.js';
import { initForms } from './scripts/forms.js';
import { initBlog } from './scripts/blog.js';
import './scripts/slideshow.js';

/**
 * Initialize the application
 */
async function init() {
  // 0. Theme first (visual theming before anything renders)
  initTheme();

  // 1. i18n (loads translations, applies language)
  await initI18n();
  setupLangToggle();

  // 2. Dynamic content rendering
  initGallery();
  initBlog();

  // 3. Interactive features
  initNavigation();
  initTestimonials();
  initForms();
  initSmoothScroll();

  // 4. Animations (last, after content is rendered)
  initAnimations();
  initCounters();
  initParallax();
  initStickyMobileCTA();

  // 5. Trigger initial hero animations
  requestAnimationFrame(() => {
    document.querySelectorAll('.hero-content .anim-fade-up').forEach(el => {
      el.classList.add('is-visible');
    });
  });
}

/**
 * Navigation — sticky header, mobile menu, active states
 */
function initNavigation() {
  const header = document.getElementById('site-header');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link, .dropdown-link, .nav-cta');
  const closeMobileMenu = () => {
    navMenu?.classList.remove('open');
    navToggle?.classList.remove('active');
    navToggle?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  // Sticky header on scroll
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    header.classList.toggle('scrolled', scrollY > 50);
  }, { passive: true });

  // Mobile toggle
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

  // Close mobile menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Active nav state based on scroll position
  const sections = document.querySelectorAll('section[id]');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            link.classList.toggle('active', href === `#${id}`);
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  sections.forEach(section => observer.observe(section));
}

/**
 * Testimonials carousel
 */
function initTestimonials() {
  const cards = document.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  if (!cards.length) return;

  let currentIndex = 0;
  let autoplayInterval;

  function showSlide(index) {
    cards.forEach((card, cardIndex) => {
      const isActive = cardIndex === index || (index >= cards.length && cardIndex === 0) || (index < 0 && cardIndex === cards.length - 1);
      card.classList.toggle('active', isActive);
      card.hidden = !isActive;
      card.setAttribute('aria-hidden', String(!isActive));
    });
    dots.forEach(dot => {
      dot.classList.remove('active');
      dot.removeAttribute('aria-current');
    });

    currentIndex = index;
    if (currentIndex >= cards.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = cards.length - 1;

    cards[currentIndex].classList.add('active');
    cards[currentIndex].hidden = false;
    cards[currentIndex].setAttribute('aria-hidden', 'false');
    dots[currentIndex]?.classList.add('active');
    dots[currentIndex]?.setAttribute('aria-current', 'true');
  }

  prevBtn?.addEventListener('click', () => {
    showSlide(currentIndex - 1);
    resetAutoplay();
  });

  nextBtn?.addEventListener('click', () => {
    showSlide(currentIndex + 1);
    resetAutoplay();
  });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      showSlide(parseInt(dot.dataset.index));
      resetAutoplay();
    });
  });

  // Autoplay
  function startAutoplay() {
    if (reducedMotion) return;
    autoplayInterval = setInterval(() => showSlide(currentIndex + 1), 6000);
  }

  function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
  }

  // Initialize
  showSlide(0);
  startAutoplay();

  // Pause on hover
  const carousel = document.getElementById('testimonial-carousel');
  carousel?.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
  carousel?.addEventListener('mouseleave', startAutoplay);
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'));
        const offset = target.offsetTop - navHeight;

        window.scrollTo({
          top: offset,
          behavior: reducedMotion ? 'auto' : 'smooth'
        });
      }
    });
  });
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
