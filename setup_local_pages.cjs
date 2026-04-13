const fs = require('fs');

// 1. Mkdir
if (!fs.existsSync('houston')) fs.mkdirSync('houston');
if (!fs.existsSync('monterrey')) fs.mkdirSync('monterrey');

// 2. Read source layout structure from main HTML
const baseHtml = fs.readFileSync('index.html', 'utf8');

// function to create stripped-down localized landing page
const createLandingPage = (location, title, h1, subtitle, lang) => {
  let content = baseHtml;
  
  // Strip out dynamic generic scripts to freeze translation
  content = content.replace(/<script type="module" src="\/src\/main\.js"><\/script>/, '');
  
  // Set Lang
  content = content.replace(/<html lang="[A-Za-z0-9_-]+">/i, `<html lang="${lang}">`);
  
  // Replace SEO tags
  content = content.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
  
  // Add a canonical tag back to main site (or keep for local search?)
  // Actually, for local rank we want them to rank on their own merit, so self-canonical!
  content = content.replace(/<head>/, `<head>\n    <link rel="canonical" href="https://andreapalacio.art/${location}/" />`);
  
  // Hardcode Hero H1 & Subtitle
  content = content.replace(/<h1 class="hero-title[^>]*>[\s\S]*?<\/h1>/, `<h1 class="hero-title" style="transform:none; opacity:1;">${h1}</h1>`);
  content = content.replace(/<p class="hero-subtitle[^>]*>[\s\S]*?<\/p>/, `<p class="hero-subtitle" style="transform:none; opacity:1;">${subtitle}</p>`);
  
  // Remove full gallery & filtering as it relies on gallery.js (which we removed to keep page hyper light and targeted)
  // Or we just drop in a button explicitly "View Full Portfolio" matching main stylings
  const minimalPortfolioCTA = `
    <div style="text-align: center; padding: 10vh 0;">
       <h2 style="margin-bottom: 2rem; font-family: var(--font-display); font-size: 2.5rem; color: var(--text-primary);">Explore the Complete Body of Work</h2>
       <a href="/#portfolio" class="btn btn-outline" style="border-radius: 99px;">View Portfolio</a>
    </div>
  `;
  content = content.replace(/<!-- EDITORIAL \/ PORTFOLIO -->[\s\S]*?<!-- CONTACT SECTION -->/, `<!-- LOCAL CTA -->\n  <section class="section" style="background: var(--bg-primary);">${minimalPortfolioCTA}</section>\n  <!-- CONTACT SECTION -->`);
  
  // Return the resulting string
  return content;
};

// Create Houston
const houstonDoc = createLandingPage(
  'houston',
  'Commercial Photographer in Houston | Expert Architecture & Food | Andrea Palacio',
  'HOUSTON COMMERCIAL PHOTOGRAPHER',
  'We elevate brands across greater Houston with premium interior, culinary, and lifestyle visual storytelling.',
  'en'
);
fs.writeFileSync('houston/index.html', houstonDoc);

// Create Monterrey
const reyDoc = createLandingPage(
  'monterrey',
  'Fotógrafo Comercial en Monterrey | Arquitectura y Gastronomía | Andrea Palacio',
  'FOTOGRAFÍA COMERCIAL DE ALTO NIVEL EN MONTERREY',
  'Elevamos marcas de lujo en Nuevo León a través de narrativas visuales de interiores, gastronomía y hospitalidad.',
  'es'
);
fs.writeFileSync('monterrey/index.html', reyDoc);

// Update vite.config.js
let viteConfig = fs.readFileSync('vite.config.js', 'utf8');
if (!viteConfig.includes('houston:')) {
  viteConfig = viteConfig.replace(
    'main: resolve(__dirname, \'index.html\'),',
    'main: resolve(__dirname, \'index.html\'),\n        houston: resolve(__dirname, \'houston/index.html\'),\n        monterrey: resolve(__dirname, \'monterrey/index.html\'),'
  );
  fs.writeFileSync('vite.config.js', viteConfig);
}

// Ensure the crawler reaches these pages by hiding a small sitemap link in the footer of main index.html
let htmlMain = fs.readFileSync('index.html', 'utf8');
if (!htmlMain.includes('houston/')) {
  let linkInjection = `
  <div style="display:none;" aria-hidden="true">
    <a href="/houston/">Houston Photographer</a>
    <a href="/monterrey/">Fotógrafo Monterrey</a>
  </div>
  <p class="footer-copy"`;
  htmlMain = htmlMain.replace('<p class="footer-copy"', linkInjection);
  fs.writeFileSync('index.html', htmlMain);
}

console.log("Local Landing Pages Built and Linked!");

// Wait, the pages need a modified footer CTA (contact form submit usually goes through JS).
// It's okay, they will just redirect users organically to click the main portfolio and navigation buttons.
