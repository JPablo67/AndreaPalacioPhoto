const fs = require('fs');

const locales = ['public/locales/en.json', 'public/locales/es.json'];

locales.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    let json = JSON.parse(content);
    
    if (json.contact && json.contact.form) {
      delete json.contact.form.budget;
      delete json.contact.form.budget_placeholder;
    }
    
    fs.writeFileSync(file, JSON.stringify(json, null, 2));
    console.log(`Cleaned budget locales from ${file}`);
  }
});
