const fs = require('fs');

const filePaths = ['index.html', 'houston/index.html', 'monterrey/index.html'];

filePaths.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Remove the budget form group entirely using regex
    const regex = /\s*<div class="form-group full-width">\s*<label for="form-budget"[\s\S]*?<\/select>\s*<\/div>/g;
    
    content = content.replace(regex, '');
    fs.writeFileSync(file, content);
    console.log(`Removed budget field from ${file}`);
  }
});
