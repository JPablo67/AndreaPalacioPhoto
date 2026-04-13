const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const targetStr = '<p data-i18n="footer.copyright">© 2026 Andrea Palacio Photography. All rights reserved.</p>';
const replacement = `<p data-i18n="footer.copyright">© 2026 Andrea Palacio Photography. All rights reserved.</p>
          <p style="margin-top: 0.5rem; font-size: 0.8rem; opacity: 0.6;">
            <a href="/privacy.html" style="color: inherit; text-decoration: none;">Privacy Policy</a> &nbsp;|&nbsp;
            <a href="/terms.html" style="color: inherit; text-decoration: none;">Terms & Conditions</a>
          </p>`;

html = html.replace(targetStr, replacement);
fs.writeFileSync('index.html', html);
console.log('injected legal into index.html footer');
