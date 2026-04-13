const fs = require('fs');

// 1. Edit index.html
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(
  '<a href="#contact" id="lightbox-cta" class="btn btn-primary btn-sm" data-i18n="portfolio.inquire">Inquire About Similar Work</a>',
  '<a href="#contact" id="lightbox-cta" class="btn btn-primary btn-sm nav-cta" data-i18n="nav.cta">Book Your Shoot</a>'
);
fs.writeFileSync('index.html', html);

// 2. Edit gallery.js to hook up close
let js = fs.readFileSync('src/scripts/gallery.js', 'utf8');

if (!js.includes("document.getElementById('lightbox-cta')")) {
  js = js.replace(
    "const nextBtn = document.getElementById('lightbox-next');",
    "const nextBtn = document.getElementById('lightbox-next');\n  const ctaBtn = document.getElementById('lightbox-cta');"
  );
  js = js.replace(
    "nextBtn?.addEventListener('click', () => navigateLightbox(1));",
    "nextBtn?.addEventListener('click', () => navigateLightbox(1));\n  ctaBtn?.addEventListener('click', closeLightbox);"
  );
  fs.writeFileSync('src/scripts/gallery.js', js);
}

console.log('Fixed lightbox-cta HTML and hooked it up to closeLightbox');
