const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      if (!file.includes('node_modules') && !file.includes('.git') && !file.includes('dist')) {
        results = results.concat(walk(file));
      }
    } else if (file.match(/\.(html|js|json|md|txt|env.*|css|cjs)$/i)) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('.');
let updateCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  // Update emails
  content = content.replace(/hello@andreapalacio\.art/g, 'andy@andreapalacio.art');
  content = content.replace(/andrea@andreapalacio\.art/g, 'andy@andreapalacio.art');
  
  // Update Instagram links
  content = content.replace(/https:\/\/www\.instagram\.com\/andreapalacioblog/g, 'https://www.instagram.com/andreapalaciofoto');
  
  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log('Updated:', file);
    updateCount++;
  }
});

console.log(`Global replace completed across ${updateCount} files.`);
