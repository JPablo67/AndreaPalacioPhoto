// src/scripts/slideshow.js

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('hero-slideshow');
  if (!container) return;

  const overlay = container.querySelector('.hero-overlay');

  // Array of your newly copied optimized images in the public folder
  const images = [
    { src: '/hero/slide-1.webp' },
    { src: '/hero/slide-2.webp' },
    { src: '/hero/slide-3.webp' },
    { src: '/hero/slide-4.webp' },
    { src: '/hero/slide-5.webp', position: 'center 18%' }
  ];

  let currentSlide = 0;
  const slideElements = [];

  // Create slide elements
  images.forEach(({ src, position }, index) => {
    const slide = document.createElement('div');
    slide.classList.add('hero-slide');
    if (index === 0) slide.classList.add('active'); // First slide is active immediately
    
    // Set background image
    slide.style.backgroundImage = `url("${src}")`;
    if (position) {
      slide.style.backgroundPosition = position;
    }
    
    // Insert before the overlay so the gradient sits on top
    container.insertBefore(slide, overlay);
    slideElements.push(slide);
  });

  // Cycle slides every 5 seconds
  setInterval(() => {
    // Remove active class from current slide
    slideElements[currentSlide].classList.remove('active');
    
    // Increment to next slide, looping to 0 if at the end
    currentSlide = (currentSlide + 1) % slideElements.length;
    
    // Add active class
    slideElements[currentSlide].classList.add('active');
  }, 5000);
});
