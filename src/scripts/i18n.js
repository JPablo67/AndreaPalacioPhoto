/**
 * i18n — Internationalization System
 * Andrea Palacio Photography
 */

let currentLang = 'en';
let translations = {};

/**
 * Initialize i18n system
 */
export async function initI18n() {
  // Detect language from localStorage or browser
  const urlLang = new URLSearchParams(window.location.search).get('lang');
  const saved = localStorage.getItem('ap-lang');
  const browserLang = navigator.language?.startsWith('es') ? 'es' : 'en';
  currentLang = urlLang === 'es' || urlLang === 'en' ? urlLang : (saved || browserLang);

  // Load both locale files
  const [en, es] = await Promise.all([
    fetch('/locales/en.json').then(r => r.json()),
    fetch('/locales/es.json').then(r => r.json())
  ]);

  translations = { en, es };

  // Apply current language
  applyLanguage(currentLang);
  updateLangToggle();
}

/**
 * Get a nested value from an object using dot notation
 */
function getNestedValue(obj, path) {
  return path.split('.').reduce((acc, part) => acc?.[part], obj);
}

/**
 * Apply translations to all elements with data-i18n attribute
 */
export function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('ap-lang', lang);
  document.documentElement.lang = lang;

  const t = translations[lang];
  if (!t) return;

  // Update all elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const value = getNestedValue(t, key);
    if (value !== undefined) {
      if (el.tagName === 'INPUT' && el.type !== 'submit') {
        el.placeholder = value;
      } else if (el.tagName === 'OPTION') {
        el.textContent = value;
      } else {
        el.innerHTML = value;
      }
    }
  });

  // Update meta tags
  const page = document.body?.dataset.page || 'home';
  const metaDesc = document.querySelector('meta[name="description"]');
  const translatedMetaDesc = getNestedValue(t, `meta.${page}.description`);
  if (metaDesc) {
    metaDesc.content = translatedMetaDesc || (lang === 'es'
      ? 'Narrativa visual elevada para marcas que exigen más. Fotógrafa comercial y editorial especializada en hospitalidad, restaurantes, bienes raíces y campañas de marca en Monterrey y Houston.'
      : 'Elevated visual storytelling for brands that demand more. Commercial & editorial photographer specializing in hospitality, restaurants, real estate, and brand campaigns in Monterrey and Houston.');
  }

  const title = document.querySelector('title');
  const translatedTitle = getNestedValue(t, `meta.${page}.title`);
  if (title) {
    title.textContent = translatedTitle || (lang === 'es'
      ? 'Andrea Palacio | Fotografía Comercial y Editorial · Monterrey · Houston'
      : 'Andrea Palacio | Commercial & Editorial Photography · Monterrey · Houston');
  }

  updateLangToggle();
}

/**
 * Update the language toggle UI
 */
function updateLangToggle() {
  document.querySelectorAll('.lang-option').forEach(btn => {
    const isActive = btn.dataset.lang === currentLang;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', String(isActive));
  });
}

/**
 * Set up language toggle event listeners
 */
export function setupLangToggle() {
  document.querySelectorAll('.lang-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      if (lang !== currentLang) {
        applyLanguage(lang);
        // Re-render dynamic content
        window.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
      }
    });
  });
}

/**
 * Get translation value by key
 */
export function t(key) {
  return getNestedValue(translations[currentLang], key) || key;
}

/**
 * Get current language
 */
export function getLang() {
  return currentLang;
}

/**
 * Get all translations for current language
 */
export function getTranslations() {
  return translations[currentLang];
}
