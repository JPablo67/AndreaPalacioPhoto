const fs = require('fs');

// Rename hero slides
const heroFiles = [1, 2, 3, 4, 5];
const newPrefix = 'andrea-palacio-houston-monterrey-photographer-';

heroFiles.forEach(num => {
  const oldWebp = `public/hero/slide-${num}.webp`;
  const newWebp = `public/hero/${newPrefix}${num}.webp`;
  if (fs.existsSync(oldWebp)) {
    fs.renameSync(oldWebp, newWebp);
    console.log(`Renamed ${oldWebp} to ${newWebp}`);
  }
});

// Update slideshow.js
let slideJs = fs.readFileSync('src/scripts/slideshow.js', 'utf8');
slideJs = slideJs.replace(/\/hero\/slide-/g, `/hero/${newPrefix}`);
fs.writeFileSync('src/scripts/slideshow.js', slideJs);
console.log('Updated slideshow.js with new semantic hero images.');

