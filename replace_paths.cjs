const fs = require('fs');

function walk(dir, extFilter) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file, extFilter));
    } else if (file.match(extFilter)) {
      results.push(file);
    }
  });
  return results;
}

const htmlFiles = walk('.', /\.(html|css|js)$/i).filter(f => !f.includes('node_modules') && !f.includes('dist'));

let count = 0;
htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const org = content;
  content = content.replace(/(public)?\/(hero|portfolio|about|blog|clients)\/.*?\.((jpe?g)|(png))/gi, match => {
    return match.replace(/\.((jpe?g)|(png))$/i, '.webp');
  });

  if (content !== org) {
    fs.writeFileSync(file, content);
    count++;
  }
});

console.log('Modified', count, 'files changing jpg/png paths to webp');
