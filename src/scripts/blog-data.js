/**
 * Blog Data Helpers
 * Shared metadata for homepage journal cards and the standalone blog page.
 */

const postVisuals = {
  'hotel-photography-bookings': {
    gradient: 'linear-gradient(135deg, #13202c 0%, #244866 55%, #9c7f52 100%)',
    accent: 'rgba(184, 149, 106, 0.28)',
    readTime: { en: '5 min read', es: '5 min de lectura' }
  },
  'hiring-real-estate-photographer': {
    gradient: 'linear-gradient(135deg, #2f241b 0%, #4f3b2a 45%, #cab299 100%)',
    accent: 'rgba(201, 169, 110, 0.22)',
    readTime: { en: '4 min read', es: '4 min de lectura' }
  },
  'restaurant-visual-storytelling': {
    gradient: 'linear-gradient(135deg, #1f1716 0%, #5a2c1f 48%, #bc7e49 100%)',
    accent: 'rgba(188, 126, 73, 0.2)',
    readTime: { en: '6 min read', es: '6 min de lectura' }
  }
};

const defaultVisual = {
  gradient: 'linear-gradient(135deg, #1b2d3d 0%, #0f3460 100%)',
  accent: 'rgba(184, 149, 106, 0.18)',
  readTime: { en: '5 min read', es: '5 min de lectura' }
};

export function getBlogPostVisual(id) {
  return postVisuals[id] || defaultVisual;
}

export function getBlogPostHref(id) {
  return `/blog/${id}/`;
}

export function enrichBlogPosts(posts, lang) {
  return (posts || []).map((post) => {
    const visual = getBlogPostVisual(post.id);
    return {
      ...post,
      href: getBlogPostHref(post.id),
      gradient: visual.gradient,
      accent: visual.accent,
      readTime: visual.readTime[lang] || visual.readTime.en
    };
  });
}

export function normalizePostDate(dateLabel, lang) {
  const map = {
    en: {
      'March 2026': '2026-03-01',
      'February 2026': '2026-02-01',
      'January 2026': '2026-01-01'
    },
    es: {
      'Marzo 2026': '2026-03-01',
      'Febrero 2026': '2026-02-01',
      'Enero 2026': '2026-01-01'
    }
  };

  return map[lang]?.[dateLabel] || map.en[dateLabel] || '2026-01-01';
}
