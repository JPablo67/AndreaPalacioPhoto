const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Add aria-required to required inputs
html = html.replace('<input type="text" id="form-name" name="name" required autocomplete="name" />', '<input type="text" id="form-name" name="name" required aria-required="true" autocomplete="name" />');
html = html.replace('<input type="email" id="form-email" name="email" required autocomplete="email" />', '<input type="email" id="form-email" name="email" required aria-required="true" autocomplete="email" />');

// Add aria-label to the prefix select which visually doesn't have a label assigned exclusively to it
html = html.replace('<select id="form-phone-prefix" name="phonePrefix" class="phone-prefix">', '<select id="form-phone-prefix" name="phonePrefix" class="phone-prefix" aria-label="Country Code Prefix">');

fs.writeFileSync('index.html', html);
console.log('Injected ARIA attributes to index.html');
