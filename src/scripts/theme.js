/**
 * Theme Switcher — Light / Dark Mode
 * Andrea Palacio Photography
 * 
 * - Detects system preference on first visit
 * - Persists user choice in localStorage
 * - Toggle button with sun/moon icon animation
 * - No flash: inline script in <head> sets [data-theme] before CSS loads
 */

const STORAGE_KEY = 'ap-theme';

/**
 * Get the resolved theme: user preference → system preference → default (light)
 */
function getPreferredTheme() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') return stored;

  // Check system preference
  if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

/**
 * Apply theme to the document
 */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  updateToggleIcon(theme);
}

/**
 * Update the toggle button icon
 */
function updateToggleIcon(theme) {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  btn.setAttribute('aria-pressed', String(theme === 'dark'));
  btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  btn.title = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';

  const sunIcon = btn.querySelector('.theme-icon-sun');
  const moonIcon = btn.querySelector('.theme-icon-moon');

  if (sunIcon && moonIcon) {
    if (theme === 'dark') {
      sunIcon.style.opacity = '1';
      sunIcon.style.transform = 'rotate(0deg) scale(1)';
      moonIcon.style.opacity = '0';
      moonIcon.style.transform = 'rotate(-90deg) scale(0.5)';
    } else {
      sunIcon.style.opacity = '0';
      sunIcon.style.transform = 'rotate(90deg) scale(0.5)';
      moonIcon.style.opacity = '1';
      moonIcon.style.transform = 'rotate(0deg) scale(1)';
    }
  }
}

/**
 * Toggle between light and dark themes
 */
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  localStorage.setItem(STORAGE_KEY, next);
  applyTheme(next);
}

/**
 * Initialize the theme system
 */
export function initTheme() {
  const theme = getPreferredTheme();
  applyTheme(theme);

  // Setup toggle button
  const btn = document.getElementById('theme-toggle');
  btn?.addEventListener('click', toggleTheme);

  // Listen for system preference changes
  window.matchMedia?.('(prefers-color-scheme: dark)')
    .addEventListener?.('change', (e) => {
      // Only react if user hasn't manually set a preference
      if (!localStorage.getItem(STORAGE_KEY)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
}
