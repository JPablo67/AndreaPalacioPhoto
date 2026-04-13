const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else if (file.match(/\.(jpg|jpeg|png)$/i)) {
      results.push(file);
    }
  });
  return results;
}

console.log("Starting WebP conversion...");
const targets = ['public/hero', 'public/portfolio', 'public/about', 'public/blog', 'public/clients'];
let allFiles = [];
targets.forEach(t => {
  if (fs.existsSync(t)) allFiles = allFiles.concat(walk(t));
});

let count = 0;
allFiles.forEach(file => {
  const ext = path.extname(file);
  const newPath = file.replace(new RegExp(ext + '$', 'i'), '.webp');
  if (!fs.existsSync(newPath)) {
    try {
      execSync(`cwebp -q 82 "${file}" -o "${newPath}" -quiet`);
      count++;
    } catch (e) {
      console.log('Failed:', file);
    }
  }
});
console.log(`Converted ${count} images to .webp successfully!`);
