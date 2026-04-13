const fs = require('fs');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory() && !file.includes('node_modules') && !file.includes('Photos') && !file.includes('dist') && !file.includes('.git') && !file.includes('assets/images')) { 
      results = results.concat(walk(file));
    } else if (file.endsWith('.html')) {
        results.push(file);
    }
  });
  return results;
}

const files = walk('.');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if(content.includes('href="/favicon.svg"')) {
    content = content.replace(/href="\/favicon\.svg"/g, 'href="/favicon.svg?v=2"');
    fs.writeFileSync(file, content);
  }
  if(content.includes('href="/apple-touch-icon.png"')) {
    content = content.replace(/href="\/apple-touch-icon\.png"/g, 'href="/apple-touch-icon.png?v=2"');
    fs.writeFileSync(file, content);
  }
});
console.log('Cache-busting appended to icons in all HTMLs.');
