/**
 * Animations — Intersection Observer Controller
 * Andrea Palacio Photography
 */

/**
 * Initialize scroll-triggered animations
 */
export function initAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Unobserve after animation (one-time trigger)
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px'
    }
  );

  // Observe all animation-tagged elements
  const animatedEls = document.querySelectorAll(
    '.anim-fade-up, .anim-fade-in, .anim-slide-left, .anim-slide-right, .anim-scale-in, .img-reveal, .stagger-children'
  );

  animatedEls.forEach(el => observer.observe(el));
}

/**
 * Initialize animated number counters
 */
export function initCounters() {
  const counters = document.querySelectorAll('.stat-number');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(el => observer.observe(el));
}

/**
 * Animate a single counter element
 */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 2000;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease-out quart
    const eased = 1 - Math.pow(1 - progress, 4);
    const current = Math.round(target * eased);

    el.textContent = current + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

/**
 * Initialize parallax-like effects for hero
 */
export function initParallax() {
  const hero = document.querySelector('.hero-content');
  if (!hero) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const heroHeight = window.innerHeight;

        if (scrollY < heroHeight) {
          const progress = scrollY / heroHeight;
          // Disable parallax movement and fade-out as requested
          // hero.style.opacity = 1 - progress * 1.2;
          // hero.style.transform = `translateY(${scrollY * 0.3}px)`;
        }

        ticking = false;
      });
      ticking = true;
    }
  });
}


/**
 * Sticky Mobile CTA Behavior
 */
export function initStickyMobileCTA() {
  const primaryCta = document.getElementById('hero-cta-primary');
  const heroSection = document.getElementById('hero');

  if (!primaryCta || !heroSection) return;

  // Create a clone exclusively for the sticky mobile state
  // Appending to body avoids ANY CSS transform/overflow containing block traps.
  const stickyClone = primaryCta.cloneNode(true);
  stickyClone.id = 'hero-cta-sticky';
  stickyClone.className = 'btn btn-primary mobile-sticky-clone'; // Strip all .anim-fade-up locks
  stickyClone.style.display = 'none';
  document.body.appendChild(stickyClone);

  function updateStickyCTA() {
    if (window.innerWidth <= 768) {
      const ctaSection = document.querySelector('.hero-ctas');
      if (ctaSection) {
        const ctaRect = ctaSection.getBoundingClientRect();
        
        // Show clone if the original button in the hero scrolled up out of view
        if (ctaRect.bottom < 50) {
          stickyClone.style.display = 'flex';
          stickyClone.classList.add('is-visible-sticky');
        } else {
          stickyClone.classList.remove('is-visible-sticky');
          stickyClone.style.display = 'none';
        }
      }
    } else {
      stickyClone.style.display = 'none';
      stickyClone.classList.remove('is-visible-sticky');
    }
  }

  window.addEventListener('scroll', updateStickyCTA, { passive: true });
  window.addEventListener('resize', updateStickyCTA, { passive: true });

  // Initial check
  updateStickyCTA();
}
