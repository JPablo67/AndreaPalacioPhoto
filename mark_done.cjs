const fs = require('fs');
let content = fs.readFileSync('SEO_STRATEGY.md', 'utf8');

content = content.replace(/- \[ \] \*\*Implement `hreflang` Tags:/g, '- [x] **Implement `hreflang` Tags:');
content = content.replace(/- \[ \] \*\*Copy\/Locale Update:/g, '- [x] **Copy/Locale Update:');
content = content.replace(/- \[ \] \*\*Deploy Dedicated Location Pages:/g, '- [x] **Deploy Dedicated Location Pages:');
content = content.replace(/- \[ \] \*\*Add Trust Signals:/g, '- [x] **Add Trust Signals:');
content = content.replace(/- \[ \] \*\*Blog Content Strategy:/g, '- [x] **Blog Content Strategy:');

fs.writeFileSync('SEO_STRATEGY.md', content);
