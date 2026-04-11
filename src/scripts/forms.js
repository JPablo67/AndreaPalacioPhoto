/**
 * Forms — Inquiry Form Logic
 * Andrea Palacio Photography
 */

import { t } from './i18n.js';

/**
 * Initialize form handling
 */
export function initForms() {
  const form = document.getElementById('inquiry-form');
  if (!form) return;

  // Real-time validation styling
  form.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.classList.contains('error')) {
        validateField(field);
      }
    });
  });

  // Form submission
  form.addEventListener('submit', handleSubmit);
}

/**
 * Validate a single field
 */
function validateField(field) {
  const isValid = field.checkValidity();
  field.classList.toggle('error', !isValid && field.required);
  return isValid;
}

/**
 * Handle form submission
 */
async function handleSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const submitBtn = document.getElementById('form-submit');
  const statusEl = document.getElementById('form-status');
  const endpoint = form.dataset.endpoint || '/api/inquiry';

  // Validate all required fields
  let allValid = true;
  form.querySelectorAll('[required]').forEach(field => {
    if (!validateField(field)) {
      allValid = false;
    }
  });

  if (!allValid) {
    // Scroll to first error
    const firstError = form.querySelector('.error');
    if (firstError) {
      firstError.focus();
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return;
  }

  // Collect form data
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  data.phone = data.phone ? `${data.phonePrefix || ''} ${data.phone}`.trim() : '';

  // Disable submit during send
  submitBtn.disabled = true;
  submitBtn.setAttribute('aria-busy', 'true');
  submitBtn.textContent = t('contact.form.sending');
  statusEl.textContent = '';
  statusEl.className = 'form-status';

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await response.json().catch(() => ({}));
    if (!response.ok || !result.ok) {
      throw new Error(result.error || 'Request failed');
    }

    statusEl.textContent = t('contact.form.success');
    statusEl.className = 'form-status success';
    form.reset();

    // Remove error classes
    form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
  } catch (err) {
    statusEl.textContent = t('contact.form.error');
    statusEl.className = 'form-status error';
  } finally {
    submitBtn.disabled = false;
    submitBtn.removeAttribute('aria-busy');
    submitBtn.textContent = t('contact.form.submit');
  }
}
