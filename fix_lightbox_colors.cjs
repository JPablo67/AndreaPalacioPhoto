const fs = require('fs');

let css = fs.readFileSync('src/styles/components.css', 'utf8');

// Fix title color
css = css.replace(
  /\.lightbox-title \{\n  font-family: var\(--font-display\);/g,
  '.lightbox-title {\n  color: var(--lightbox-text);\n  font-family: var(--font-display);'
);

// Fix close button color
css = css.replace(
  /\.lightbox-close \{\n  position: absolute;\n  top: var\(--space-xl\);\n  right: var\(--space-xl\);\n  font-size: 2rem;\n  color: var\(--text-secondary\);/g,
  '.lightbox-close {\n  position: absolute;\n  top: var(--space-xl);\n  right: var(--space-xl);\n  font-size: 2rem;\n  color: var(--lightbox-text);'
);
css = css.replace(
  /\.lightbox-close:hover \{\n  color: var\(--text-primary\);/g,
  '.lightbox-close:hover {\n  color: var(--accent);'
);

// Fix nav arrows color
css = css.replace(
  /\.lightbox-nav \{\n  position: absolute;\n  top: 50%;\n  transform: translateY\(-50%\);\n  color: var\(--text-secondary\);\n  transition: all var\(--duration-fast\) ease;\n  width: 48px;\n  height: 48px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: 1px solid var\(--glass-border\);/g,
  '.lightbox-nav {\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  color: var(--accent);\n  transition: all var(--duration-fast) ease;\n  width: 48px;\n  height: 48px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: 1px solid var(--accent);'
);

fs.writeFileSync('src/styles/components.css', css);
console.log('Fixed lightbox colors in components.css');
