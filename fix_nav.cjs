const fs = require('fs');

let mainJs = fs.readFileSync('src/main.js', 'utf8');

// Replace navLinks listener
const oldNavListener = `  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });`;

const newNavListener = `  // Handle clicks on navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // If it's a dropdown toggle on mobile, prevent immediate closing and allow hover state
      if (link.parentElement.classList.contains('has-dropdown') && link.classList.contains('nav-link')) {
        // Only if we are on a smaller screen where the menu is actually a hamburger menu
        if (window.innerWidth <= 768) {
          // If the menu isn't open enough to show this, don't navigate right away
          // Actually, let the CSS hover handle showing it, just don't close the whole mobile menu
          const dropdown = link.nextElementSibling;
          if (dropdown && window.getComputedStyle(dropdown).display === 'none') {
            e.preventDefault();
            return; // User tapped to open dropdown, don't close menu
          }
        }
      }

      // If it's a dropdown link for portfolio filtering
      if (link.classList.contains('dropdown-link') && link.hasAttribute('data-filter')) {
        const filterValue = link.getAttribute('data-filter');
        // Find the actual button in the gallery section and click it programmatically
        const targetBtn = document.querySelector(\`.filter-btn[data-filter="\${filterValue}"]\`);
        if (targetBtn) {
          targetBtn.click();
        }
      }

      closeMobileMenu();
    });
  });`;

mainJs = mainJs.replace(oldNavListener, newNavListener);
fs.writeFileSync('src/main.js', mainJs);
console.log('Fixed navigation behavior in main.js');
