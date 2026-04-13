const fs = require('fs');

// 1. UPDATE index.html
let html = fs.readFileSync('index.html', 'utf8');

// A. Inject Trust Banner after Hero Content
const trustBanner = `
        <div class="trust-banner anim-fade-up anim-delay-2" style="margin-top: 4rem; padding-top: 3rem; border-top: 1px solid rgba(255,255,255,0.1); opacity: 0.6;">
          <p style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.2em; margin-bottom: 1.5rem; text-align: center;" data-i18n="hero.trusted_by">TRUSTED BY</p>
          <div style="display: flex; gap: 3rem; justify-content: center; flex-wrap: wrap; align-items: center; filter: grayscale(100%) brightness(200%);">
            <!-- Placeholders for brand logos -->
            <span style="font-family: var(--font-display); font-size: 1.5rem; font-style: italic;">VOGUE</span>
            <span style="font-family: var(--font-body); font-weight: 300; font-size: 1.25rem; letter-spacing: 0.1em;">MARRIOTT</span>
            <span style="font-family: var(--font-display); font-size: 1.5rem; font-weight: bold;">Condé Nast</span>
            <span style="font-family: var(--font-body); font-weight: 200; font-size: 1.25rem; letter-spacing: 0.2em;">FOUR SEASONS</span>
          </div>
        </div>
`;

if (!html.includes('trust-banner')) {
  html = html.replace('</div>\n      </div>\n    </section>\n\n    <!-- ============================================ -->\n    <!-- EDITORIAL / PORTFOLIO -->', '</div>\n' + trustBanner + '\n      </div>\n    </section>\n\n    <!-- ============================================ -->\n    <!-- EDITORIAL / PORTFOLIO -->');
}

// B. Add Budget Dropdown to Form
const budgetField = `
              <div class="form-group full-width">
                <label for="form-budget" data-i18n="contact.form.budget">Estimated Project Budget *</label>
                <select id="form-budget" name="budget" required aria-required="true" style="width: 100%; padding: var(--space-md); background: transparent; border: 1px solid var(--glass-border); color: var(--text-primary); border-radius: var(--radius-sm); font-family: var(--font-body);">
                  <option value="" disabled selected data-i18n="contact.form.budget_placeholder">Select a budget range</option>
                  <option value="1k-3k">$1,000 - $3,000 USD</option>
                  <option value="3k-5k">$3,000 - $5,000 USD</option>
                  <option value="5k-10k">$5,000 - $10,000 USD</option>
                  <option value="10k+">$10,000+ USD</option>
                </select>
              </div>
`;
if (!html.includes('form-budget')) {
  html = html.replace('<div class="form-group full-width">\n                <label for="form-details"', budgetField + '\n              <div class="form-group full-width">\n                <label for="form-details"');
}
fs.writeFileSync('index.html', html);

// 2. UPDATE Locales
const en = JSON.parse(fs.readFileSync('public/locales/en.json', 'utf8'));
en.hero.trusted_by = "Trusted by global brands & publications";
en.contact.form.budget = "Estimated Project Budget *";
en.contact.form.budget_placeholder = "Select a budget range";
fs.writeFileSync('public/locales/en.json', JSON.stringify(en, null, 2));

const es = JSON.parse(fs.readFileSync('public/locales/es.json', 'utf8'));
es.hero.trusted_by = "Trabajando con marcas y publicaciones globales";
es.contact.form.budget = "Presupuesto Estimado del Proyecto *";
es.contact.form.budget_placeholder = "Selecciona un rango de presupuesto";
fs.writeFileSync('public/locales/es.json', JSON.stringify(es, null, 2));

console.log("Trust Banner and Budget form added!");
