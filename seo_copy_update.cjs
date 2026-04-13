const fs = require('fs');

const updateValues = (obj, updates) => {
  for (let key in updates) {
    if (typeof updates[key] === 'object' && !Array.isArray(updates[key])) {
      if (!obj[key]) obj[key] = {};
      updateValues(obj[key], updates[key]);
    } else {
      obj[key] = updates[key];
    }
  }
};

// 1. Update English Json
let en = JSON.parse(fs.readFileSync('public/locales/en.json', 'utf8'));
const enUpdates = {
  "hero": {
    "eyebrow": "Editorial Expertise for Commercial Brands",
    "headline": "Elevated Visual<br>Storytelling",
    "subheadline": "Premium editorial, hospitality, and commercial photography across Monterrey, MX and Houston, TX.",
    "cta_primary": "Commission a Campaign",
    "cta_secondary": "View Portfolio"
  },
  "services": {
    "editorial": {
      "title": "Editorial & Fashion",
      "description": "Striking Editorial Campaigns. Bold, narrative-driven fashion and brand photography designed for publications, lookbooks, and global campaigns."
    },
    "hospitality": {
      "title": "Hotels & Hospitality",
      "description": "Immersive Hospitality Photography. Translate the luxury of your space into imagery that drives high-tier bookings. Tailored for boutique hotels, resorts, and elite properties in Houston and Monterrey."
    },
    "food": {
      "title": "Restaurants & Food",
      "description": "Culinary Visuals that Convert. We don't just photograph food; we craft the atmosphere of your dining experience. Essential for award-winning menus and high-end dining aesthetics."
    },
    "realestate": {
      "title": "Real Estate & Architecture",
      "description": "Luxury Real Estate Photographer. High-end property coverage showcasing scale, design, and light for prestige developments."
    },
    "brand": {
      "title": "Brand Campaigns",
      "description": "Commercial brand photography engineered to position your business as a market leader."
    }
  },
  "nav": {
    "cta": "Book Your Shoot"
  }
};
updateValues(en, enUpdates);
fs.writeFileSync('public/locales/en.json', JSON.stringify(en, null, 2));

// 2. Update Spanish Json
let es = JSON.parse(fs.readFileSync('public/locales/es.json', 'utf8'));
const esUpdates = {
  "hero": {
    "eyebrow": "Narrativa Visual de Alto Nivel para Marcas",
    "headline": "Fotografía<br>Editorial",
    "subheadline": "Llevando la estética de alta gama a la hospitalidad, arquitectura y moda en Monterrey y Houston.",
    "cta_primary": "Cotiza tu Proyecto",
    "cta_secondary": "Ver Portafolio"
  },
  "services": {
    "editorial": {
      "title": "Fotografía Editorial y de Moda",
      "description": "Campañas Editoriales Impactantes. Fotografía de moda y marca audaz, narrativa y diseñada para publicaciones, lookbooks y campañas globales. El fotógrafo de moda premier en Monterrey San Pedro."
    },
    "hospitality": {
      "title": "Hoteles y Hospitalidad",
      "description": "Fotografía Inmersiva de Hospitalidad. Traduce el lujo de tu espacio en imágenes que generan altos niveles de reservas. Diseñado para hoteles boutique, resorts y locaciones en Monterrey y Houston."
    },
    "food": {
      "title": "Restaurantes y Alimentos",
      "description": "Visuales Culinarios que Convierten. No solo tomamos fotos gastronómicas; creamos la atmósfera de tu experiencia. Esencial para fotógrafo de restaurantes en Monterrey."
    },
    "realestate": {
      "title": "Bienes Raíces y Arquitectura",
      "description": "Fotografía de Bienes Raíces de Lujo. Cobertura ininterrumpida que muestra la escala, diseño y luz para desarrolladores de prestigio."
    },
    "brand": {
      "title": "Campañas de Marca",
      "description": "Fotografía comercial diseñada para posicionar tu negocio."
    }
  },
  "nav": {
    "cta": "Reservar Sesión"
  }
};
updateValues(es, esUpdates);
fs.writeFileSync('public/locales/es.json', JSON.stringify(es, null, 2));

console.log("English AND Spanish copies perfectly updated for Monterrey/Houston SEO.");

