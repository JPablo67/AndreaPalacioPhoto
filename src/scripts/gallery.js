/**
 * Gallery — Portfolio Grid & Lightbox
 * Andrea Palacio Photography
 */

import { t, getLang } from './i18n.js';

// Portfolio data — populated with real images and mixed natively for an organic masonry layout
const portfolioData = [
  // Mixed Layout (Interleaving tall and wide for dynamic visual balance)
  { id: 11, title: { en: 'Boutique Details', es: 'Detalles Boutique' }, category: 'editorial', size: 'size-tall', image: '/portfolio/port-1.jpeg' },
  { id: 1, title: { en: 'Lumière Kitchen', es: 'Cocina Lumière' }, category: 'editorial', size: 'size-wide', image: '/portfolio/1.png' },
  { id: 12, title: { en: 'Architectural Shadow', es: 'Sombra Arquitectónica' }, category: 'editorial', size: 'size-tall', image: '/portfolio/port-2.jpeg' },
  { id: 2, title: { en: 'Grand Hotel Monterrey', es: 'Grand Hotel Monterrey' }, category: 'editorial', size: 'size-wide', image: '/portfolio/2.png' },
  { id: 13, title: { en: 'Plated Art', es: 'Arte en Plato' }, category: 'editorial', size: 'size-tall', image: '/portfolio/port-3.jpeg' },
  { id: 14, title: { en: 'Brand Essence', es: 'Esencia de Marca' }, category: 'editorial', size: 'size-tall', image: '/portfolio/port-4.jpeg' },
  { id: 3, title: { en: 'Urban Collection', es: 'Colección Urbana' }, category: 'editorial', size: 'size-wide', image: '/portfolio/3.png' },
  { id: 16, title: { en: 'Lobby Luxury', es: 'Lujo en Lobby' }, category: 'editorial', size: 'size-tall', image: '/portfolio/port-6.jpg' },
  { id: 4, title: { en: 'Modern Living', es: 'Vida Moderna' }, category: 'editorial', size: 'size-wide', image: '/portfolio/4.png' },
  { id: 18, title: { en: 'Chef in Action', es: 'Chef en Acción' }, category: 'editorial', size: 'size-tall', image: '/portfolio/port-8.jpg' },
  { id: 5, title: { en: 'Vogue Nights', es: 'Noches Vogue' }, category: 'editorial', size: 'size-wide', image: '/portfolio/5.png' },
  { id: 15, title: { en: 'Editorial Portrait', es: 'Retrato Editorial' }, category: 'editorial', size: 'size-tall', image: '/portfolio/port-5.jpeg' },
  { id: 6, title: { en: 'Coastal Resort & Spa', es: 'Resort & Spa Costero' }, category: 'editorial', size: 'size-wide', image: '/portfolio/6.png' },
  { id: 17, title: { en: 'Interior Mood', es: 'Atmosfera Interior' }, category: 'editorial', size: 'size-tall', image: '/portfolio/port-7.jpg' },
  { id: 7, title: { en: 'Farm to Table', es: 'Del Campo a la Mesa' }, category: 'editorial', size: 'size-wide', image: '/portfolio/7.png' },
  { id: 19, title: { en: 'Product Highlight', es: 'Destacado de Producto' }, category: 'editorial', size: 'size-tall', image: '/portfolio/port-9.jpg' },
  { id: 8, title: { en: 'Skyline Residences', es: 'Residencias Skyline' }, category: 'editorial', size: 'size-wide', image: '/portfolio/8.png' },
  { id: 20, title: { en: 'Fashion Week', es: 'Semana de la Moda' }, category: 'editorial', size: 'size-tall', image: '/portfolio/port-10.jpg' },
  { id: 9, title: { en: 'Artisan Craft Spirits', es: 'Destilados Artesanales' }, category: 'editorial', size: 'size-wide', image: '/portfolio/9.png' },
  { id: 10, title: { en: 'Noir Beauty', es: 'Belleza Noir' }, category: 'editorial', size: 'size-wide', image: '/portfolio/10.png' }
];

const categoryLabels = {
  editorial: { en: 'Editorial & Fashion', es: 'Editorial y Moda' },
  hospitality: { en: 'Hotels & Hospitality', es: 'Hoteles y Hospitalidad' },
  food: { en: 'Restaurants & Food', es: 'Restaurantes y Gastronomía' },
  realestate: { en: 'Real Estate & Architecture', es: 'Bienes Raíces y Arquitectura' },
  brand: { en: 'Brand Campaigns', es: 'Campañas de Marca' }
};

let currentFilter = 'all';
let lightboxIndex = 0;
let filteredItems = [];
let lastFocusedElement = null;
const preloadedImages = new Set();
const eagerImageCount = 6;

/**
 * Initialize portfolio gallery
 */
export function initGallery() {
  preloadPortfolioImages();
  renderPortfolio();
  setupFilters();
  setupLightbox();

  // Re-render on language change
  window.addEventListener('langchange', () => {
    renderPortfolio();
  });
}

function preloadPortfolioImages() {
  const priorityImages = portfolioData.slice(0, 8).map((item) => item.image);
  warmImageUrls(priorityImages, 'high');

  const remainingImages = portfolioData.slice(8).map((item) => item.image);
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => warmImageUrls(remainingImages, 'low'));
  } else {
    window.setTimeout(() => warmImageUrls(remainingImages, 'low'), 1200);
  }
}

function warmImageUrls(urls, priority) {
  urls.forEach((url) => {
    if (preloadedImages.has(url)) return;
    const img = new Image();
    img.decoding = 'async';
    if ('fetchPriority' in img) {
      img.fetchPriority = priority;
    }
    img.src = url;
    preloadedImages.add(url);
  });
}

/**
 * Render portfolio grid items
 */
function renderPortfolio() {
  const grid = document.getElementById('portfolio-grid');
  if (!grid) return;

  const lang = getLang();
  const items = currentFilter === 'all'
    ? portfolioData
    : portfolioData.filter(p => p.category === currentFilter);

  filteredItems = items;

  grid.innerHTML = items.map((item, index) => `
    <div class="portfolio-item ${item.size}" 
         data-category="${item.category}" 
         data-index="${index}"
         role="button"
         tabindex="0"
         aria-label="${item.title[lang]}">
      <img
        class="portfolio-item-img"
        src="${item.image}"
        alt="${item.title[lang]}"
        loading="${index < eagerImageCount ? 'eager' : 'lazy'}"
        decoding="async"
        fetchpriority="${index < eagerImageCount ? 'high' : 'auto'}"
      >
      <div class="portfolio-item-overlay">
        <h3 class="portfolio-item-title">${item.title[lang]}</h3>
        <span class="portfolio-item-cat">${categoryLabels[item.category]?.[lang] || item.category}</span>
      </div>
    </div>
  `).join('');

  // Add click handlers
  grid.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', () => openLightbox(parseInt(item.dataset.index)));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(parseInt(item.dataset.index));
      }
    });
  });
}

/**
 * Setup filter buttons
 */
function setupFilters() {
  const filterContainer = document.getElementById('portfolio-filters');
  if (!filterContainer) return;

  syncFilterAccessibility(filterContainer);

  filterContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    // Update active state
    filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    currentFilter = btn.dataset.filter;
    syncFilterAccessibility(filterContainer);
    renderPortfolio();
  });
}

function syncFilterAccessibility(filterContainer) {
  filterContainer.querySelectorAll('.filter-btn').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.classList.contains('active')));
  });
}

/**
 * Setup lightbox
 */
function setupLightbox() {
  const lightbox = document.getElementById('lightbox');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');

  if (!lightbox) return;

  closeBtn?.addEventListener('click', closeLightbox);
  prevBtn?.addEventListener('click', () => navigateLightbox(-1));
  nextBtn?.addEventListener('click', () => navigateLightbox(1));

  // Close on backdrop click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (lightbox.hidden) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
    if (e.key === 'Tab') trapFocus(e, lightbox);
  });
}

/**
 * Open lightbox at index
 */
function openLightbox(index) {
  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  const title = document.getElementById('lightbox-title');
  const category = document.getElementById('lightbox-category');

  if (!lightbox || !filteredItems[index]) return;

  lightboxIndex = index;
  const item = filteredItems[index];
  const lang = getLang();

  // Render actual image
  img.style.display = 'block';
  img.src = item.image;
  img.alt = item.title[lang];
  
  // Clean up any old placeholders if they exist
  const imgDiv = document.querySelector('.lightbox-content');
  const placeholder = imgDiv.querySelector('.lightbox-placeholder');
  if (placeholder) {
    placeholder.remove();
  }

  title.textContent = item.title[lang];
  category.textContent = categoryLabels[item.category]?.[lang] || item.category;

  lastFocusedElement = document.activeElement;
  lightbox.hidden = false;
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  document.getElementById('lightbox-close')?.focus();
}

/**
 * Close lightbox
 */
function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.hidden = true;
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lastFocusedElement?.focus?.();
  }
}

/**
 * Navigate lightbox
 */
function navigateLightbox(direction) {
  const newIndex = lightboxIndex + direction;
  if (newIndex >= 0 && newIndex < filteredItems.length) {
    openLightbox(newIndex);
  } else if (newIndex < 0) {
    openLightbox(filteredItems.length - 1);
  } else {
    openLightbox(0);
  }
}

function trapFocus(event, container) {
  const focusable = container.querySelectorAll(
    'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
  );

  if (!focusable.length) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}
