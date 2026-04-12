/**
 * Gallery — Portfolio Grid & Lightbox
 * Andrea Palacio Photography
 */

import { t, getLang } from './i18n.js';

// Portfolio data — populated with real images and mixed natively for an organic masonry layout
// Portfolio data — populated with real images and mixed natively for an organic masonry layout
const portfolioData = [
  { id: 1, title: { en: 'Editorial Food Photographer', es: 'Editorial Comida Fotógrafo' }, category: 'editorial', size: 'size-wide', image: '/portfolio/editorial/andrea-palacio-editorial-food-photographer-1.png', featured: true },
  { id: 11, title: { en: 'Editorial Food Photographer', es: 'Editorial Comida Fotógrafo' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-editorial-food-photographer-11.jpeg', featured: true },
  { id: 12, title: { en: 'Luxury Hotel Photography Monterrey', es: 'Lujo Hotel Fotografía Monterrey' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-luxury-hotel-photography-monterrey-12.jpeg', featured: true },
  { id: 2, title: { en: 'Luxury Hotel Photography Monterrey', es: 'Lujo Hotel Fotografía Monterrey' }, category: 'editorial', size: 'size-wide', image: '/portfolio/editorial/andrea-palacio-luxury-hotel-photography-monterrey-2.png', featured: true },
  { id: 13, title: { en: 'Architectural Interior Design', es: 'Architectural Interior Design' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-architectural-interior-design-13.jpeg', featured: true },
  { id: 14, title: { en: 'Commercial Brand Lifestyle', es: 'Commercial Brand Lifestyle' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-commercial-brand-lifestyle-14.jpeg', featured: true },
  { id: 3, title: { en: 'Architectural Interior Design', es: 'Architectural Interior Design' }, category: 'editorial', size: 'size-wide', image: '/portfolio/editorial/andrea-palacio-architectural-interior-design-3.png', featured: true },
  { id: 15, title: { en: 'Fine Dining Restaurant Shoot', es: 'Fine Dining Restaurant Shoot' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-fine-dining-restaurant-shoot-15.jpeg', featured: true },
  { id: 16, title: { en: 'Real Estate Property Photography', es: 'Bienes Raíces Property Fotografía' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-real-estate-property-photography-16.jpeg', featured: false },
  { id: 4, title: { en: 'Commercial Brand Lifestyle', es: 'Commercial Brand Lifestyle' }, category: 'editorial', size: 'size-wide', image: '/portfolio/editorial/andrea-palacio-commercial-brand-lifestyle-4.png', featured: true },
  { id: 17, title: { en: 'Chef Portrait Editorial', es: 'Chef Portrait Editorial' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-chef-portrait-editorial-17.jpeg', featured: false },
  { id: 18, title: { en: 'Boutique Hotel Interior', es: 'Boutique Hotel Interior' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-boutique-hotel-interior-18.jpeg', featured: false },
  { id: 5, title: { en: 'Fine Dining Restaurant Shoot', es: 'Fine Dining Restaurant Shoot' }, category: 'editorial', size: 'size-wide', image: '/portfolio/editorial/andrea-palacio-fine-dining-restaurant-shoot-5.png', featured: true },
  { id: 19, title: { en: 'Modern Living Residential', es: 'Modern Living Residential' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-modern-living-residential-19.jpeg', featured: false },
  { id: 20, title: { en: 'High End Hospitality Photography', es: 'High End Hospitality Fotografía' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-high-end-hospitality-photography-20.jpeg', featured: true },
  { id: 6, title: { en: 'Real Estate Property Photography', es: 'Bienes Raíces Property Fotografía' }, category: 'editorial', size: 'size-wide', image: '/portfolio/editorial/andrea-palacio-real-estate-property-photography-6.png', featured: true },
  { id: 21, title: { en: 'Editorial Food Photographer', es: 'Editorial Comida Fotógrafo' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-editorial-food-photographer-21.jpeg', featured: false },
  { id: 22, title: { en: 'Luxury Hotel Photography Monterrey', es: 'Lujo Hotel Fotografía Monterrey' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-luxury-hotel-photography-monterrey-22.jpeg', featured: false },
  { id: 7, title: { en: 'Chef Portrait Editorial', es: 'Chef Portrait Editorial' }, category: 'editorial', size: 'size-wide', image: '/portfolio/editorial/andrea-palacio-chef-portrait-editorial-7.png', featured: true },
  { id: 23, title: { en: 'Architectural Interior Design', es: 'Architectural Interior Design' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-architectural-interior-design-23.jpeg', featured: false },
  { id: 24, title: { en: 'Commercial Brand Lifestyle', es: 'Commercial Brand Lifestyle' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-commercial-brand-lifestyle-24.jpeg', featured: false },
  { id: 8, title: { en: 'Boutique Hotel Interior', es: 'Boutique Hotel Interior' }, category: 'editorial', size: 'size-wide', image: '/portfolio/editorial/andrea-palacio-boutique-hotel-interior-8.png', featured: true },
  { id: 25, title: { en: 'Fine Dining Restaurant Shoot', es: 'Fine Dining Restaurant Shoot' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-fine-dining-restaurant-shoot-25.jpeg', featured: true },
  { id: 26, title: { en: 'Real Estate Property Photography', es: 'Bienes Raíces Property Fotografía' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-real-estate-property-photography-26.jpeg', featured: false },
  { id: 9, title: { en: 'Modern Living Residential', es: 'Modern Living Residential' }, category: 'editorial', size: 'size-wide', image: '/portfolio/editorial/andrea-palacio-modern-living-residential-9.png', featured: true },
  { id: 27, title: { en: 'Chef Portrait Editorial', es: 'Chef Portrait Editorial' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-chef-portrait-editorial-27.jpeg', featured: false },
  { id: 28, title: { en: 'Boutique Hotel Interior', es: 'Boutique Hotel Interior' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-boutique-hotel-interior-28.jpg', featured: false },
  { id: 10, title: { en: 'High End Hospitality Photography', es: 'High End Hospitality Fotografía' }, category: 'editorial', size: 'size-wide', image: '/portfolio/editorial/andrea-palacio-high-end-hospitality-photography-10.png', featured: true },
  { id: 29, title: { en: 'Modern Living Residential', es: 'Modern Living Residential' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-modern-living-residential-29.jpeg', featured: false },
  { id: 30, title: { en: 'High End Hospitality Photography', es: 'High End Hospitality Fotografía' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-high-end-hospitality-photography-30.jpeg', featured: true },
  { id: 31, title: { en: 'Editorial Food Photographer', es: 'Editorial Comida Fotógrafo' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-editorial-food-photographer-31.jpg', featured: false },
  { id: 32, title: { en: 'Luxury Hotel Photography Monterrey', es: 'Lujo Hotel Fotografía Monterrey' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-luxury-hotel-photography-monterrey-32.jpeg', featured: false },
  { id: 33, title: { en: 'Architectural Interior Design', es: 'Architectural Interior Design' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-architectural-interior-design-33.jpeg', featured: false },
  { id: 34, title: { en: 'Commercial Brand Lifestyle', es: 'Commercial Brand Lifestyle' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-commercial-brand-lifestyle-34.jpeg', featured: false },
  { id: 35, title: { en: 'Fine Dining Restaurant Shoot', es: 'Fine Dining Restaurant Shoot' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-fine-dining-restaurant-shoot-35.jpeg', featured: true },
  { id: 36, title: { en: 'Real Estate Property Photography', es: 'Bienes Raíces Property Fotografía' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-real-estate-property-photography-36.jpeg', featured: false },
  { id: 37, title: { en: 'Chef Portrait Editorial', es: 'Chef Portrait Editorial' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-chef-portrait-editorial-37.jpeg', featured: false },
  { id: 38, title: { en: 'Boutique Hotel Interior', es: 'Boutique Hotel Interior' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-boutique-hotel-interior-38.jpeg', featured: false },
  { id: 39, title: { en: 'Modern Living Residential', es: 'Modern Living Residential' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-modern-living-residential-39.jpeg', featured: false },
  { id: 40, title: { en: 'High End Hospitality Photography', es: 'High End Hospitality Fotografía' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-high-end-hospitality-photography-40.jpeg', featured: true },
  { id: 41, title: { en: 'Editorial Food Photographer', es: 'Editorial Comida Fotógrafo' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-editorial-food-photographer-41.jpeg', featured: false },
  { id: 42, title: { en: 'Luxury Hotel Photography Monterrey', es: 'Lujo Hotel Fotografía Monterrey' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-luxury-hotel-photography-monterrey-42.jpeg', featured: false },
  { id: 43, title: { en: 'Architectural Interior Design', es: 'Architectural Interior Design' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-architectural-interior-design-43.jpeg', featured: false },
  { id: 44, title: { en: 'Commercial Brand Lifestyle', es: 'Commercial Brand Lifestyle' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-commercial-brand-lifestyle-44.jpeg', featured: false },
  { id: 45, title: { en: 'Fine Dining Restaurant Shoot', es: 'Fine Dining Restaurant Shoot' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-fine-dining-restaurant-shoot-45.jpeg', featured: true },
  { id: 46, title: { en: 'Real Estate Property Photography', es: 'Bienes Raíces Property Fotografía' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-real-estate-property-photography-46.jpeg', featured: false },
  { id: 47, title: { en: 'Chef Portrait Editorial', es: 'Chef Portrait Editorial' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-chef-portrait-editorial-47.jpeg', featured: false },
  { id: 48, title: { en: 'Boutique Hotel Interior', es: 'Boutique Hotel Interior' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-boutique-hotel-interior-48.jpeg', featured: false },
  { id: 49, title: { en: 'Modern Living Residential', es: 'Modern Living Residential' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-modern-living-residential-49.jpeg', featured: false },
  { id: 50, title: { en: 'High End Hospitality Photography', es: 'High End Hospitality Fotografía' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-high-end-hospitality-photography-50.jpeg', featured: true },
  { id: 51, title: { en: 'Editorial Food Photographer', es: 'Editorial Comida Fotógrafo' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-editorial-food-photographer-51.jpeg', featured: false },
  { id: 52, title: { en: 'Luxury Hotel Photography Monterrey', es: 'Lujo Hotel Fotografía Monterrey' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-luxury-hotel-photography-monterrey-52.jpeg', featured: false },
  { id: 53, title: { en: 'Architectural Interior Design', es: 'Architectural Interior Design' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-architectural-interior-design-53.jpeg', featured: false },
  { id: 54, title: { en: 'Commercial Brand Lifestyle', es: 'Commercial Brand Lifestyle' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-commercial-brand-lifestyle-54.jpeg', featured: false },
  { id: 55, title: { en: 'Fine Dining Restaurant Shoot', es: 'Fine Dining Restaurant Shoot' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-fine-dining-restaurant-shoot-55.jpeg', featured: true },
  { id: 56, title: { en: 'Real Estate Property Photography', es: 'Bienes Raíces Property Fotografía' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-real-estate-property-photography-56.jpeg', featured: false },
  { id: 57, title: { en: 'Chef Portrait Editorial', es: 'Chef Portrait Editorial' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-chef-portrait-editorial-57.jpeg', featured: false },
  { id: 58, title: { en: 'Boutique Hotel Interior', es: 'Boutique Hotel Interior' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-boutique-hotel-interior-58.jpg', featured: false },
  { id: 59, title: { en: 'Modern Living Residential', es: 'Modern Living Residential' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-modern-living-residential-59.jpg', featured: false },
  { id: 60, title: { en: 'High End Hospitality Photography', es: 'High End Hospitality Fotografía' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-high-end-hospitality-photography-60.jpg', featured: true },
  { id: 61, title: { en: 'Editorial Food Photographer', es: 'Editorial Comida Fotógrafo' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-editorial-food-photographer-61.jpg', featured: false },
  { id: 62, title: { en: 'Luxury Hotel Photography Monterrey', es: 'Lujo Hotel Fotografía Monterrey' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-luxury-hotel-photography-monterrey-62.jpg', featured: false },
  { id: 63, title: { en: 'Architectural Interior Design', es: 'Architectural Interior Design' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-architectural-interior-design-63.jpg', featured: false },
  { id: 64, title: { en: 'Commercial Brand Lifestyle', es: 'Commercial Brand Lifestyle' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-commercial-brand-lifestyle-64.jpg', featured: false },
  { id: 65, title: { en: 'Fine Dining Restaurant Shoot', es: 'Fine Dining Restaurant Shoot' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-fine-dining-restaurant-shoot-65.jpg', featured: true },
  { id: 66, title: { en: 'Real Estate Property Photography', es: 'Bienes Raíces Property Fotografía' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-real-estate-property-photography-66.jpg', featured: false },
  { id: 67, title: { en: 'Chef Portrait Editorial', es: 'Chef Portrait Editorial' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-chef-portrait-editorial-67.jpg', featured: false },
  { id: 68, title: { en: 'Boutique Hotel Interior', es: 'Boutique Hotel Interior' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-boutique-hotel-interior-68.jpg', featured: false },
  { id: 69, title: { en: 'Modern Living Residential', es: 'Modern Living Residential' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-modern-living-residential-69.jpg', featured: false },
  { id: 70, title: { en: 'High End Hospitality Photography', es: 'High End Hospitality Fotografía' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-high-end-hospitality-photography-70.jpg', featured: true },
  { id: 71, title: { en: 'Editorial Food Photographer', es: 'Editorial Comida Fotógrafo' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-editorial-food-photographer-71.jpg', featured: false },
  { id: 72, title: { en: 'Luxury Hotel Photography Monterrey', es: 'Lujo Hotel Fotografía Monterrey' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-luxury-hotel-photography-monterrey-72.jpg', featured: false },
  { id: 73, title: { en: 'Architectural Interior Design', es: 'Architectural Interior Design' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-architectural-interior-design-73.jpg', featured: false },
  { id: 74, title: { en: 'Commercial Brand Lifestyle', es: 'Commercial Brand Lifestyle' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-commercial-brand-lifestyle-74.jpg', featured: false },
  { id: 75, title: { en: 'Fine Dining Restaurant Shoot', es: 'Fine Dining Restaurant Shoot' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-fine-dining-restaurant-shoot-75.jpg', featured: true },
  { id: 76, title: { en: 'Real Estate Property Photography', es: 'Bienes Raíces Property Fotografía' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-real-estate-property-photography-76.jpg', featured: false },
  { id: 77, title: { en: 'Chef Portrait Editorial', es: 'Chef Portrait Editorial' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-chef-portrait-editorial-77.jpg', featured: false },
  { id: 78, title: { en: 'Boutique Hotel Interior', es: 'Boutique Hotel Interior' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-boutique-hotel-interior-78.jpg', featured: false },
  { id: 79, title: { en: 'Modern Living Residential', es: 'Modern Living Residential' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-modern-living-residential-79.jpg', featured: false },
  { id: 80, title: { en: 'High End Hospitality Photography', es: 'High End Hospitality Fotografía' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-high-end-hospitality-photography-80.jpg', featured: true },
  { id: 81, title: { en: 'Editorial Food Photographer', es: 'Editorial Comida Fotógrafo' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-editorial-food-photographer-81.jpg', featured: false },
  { id: 82, title: { en: 'Luxury Hotel Photography Monterrey', es: 'Lujo Hotel Fotografía Monterrey' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-luxury-hotel-photography-monterrey-82.jpg', featured: false },
  { id: 83, title: { en: 'Architectural Interior Design', es: 'Architectural Interior Design' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-architectural-interior-design-83.jpg', featured: false },
  { id: 84, title: { en: 'Commercial Brand Lifestyle', es: 'Commercial Brand Lifestyle' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-commercial-brand-lifestyle-84.jpg', featured: false },
  { id: 85, title: { en: 'Fine Dining Restaurant Shoot', es: 'Fine Dining Restaurant Shoot' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-fine-dining-restaurant-shoot-85.jpg', featured: true },
  { id: 86, title: { en: 'Real Estate Property Photography', es: 'Bienes Raíces Property Fotografía' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-real-estate-property-photography-86.jpg', featured: false },
  { id: 87, title: { en: 'Chef Portrait Editorial', es: 'Chef Portrait Editorial' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-chef-portrait-editorial-87.jpg', featured: false },
  { id: 88, title: { en: 'Boutique Hotel Interior', es: 'Boutique Hotel Interior' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-boutique-hotel-interior-88.jpg', featured: false },
  { id: 89, title: { en: 'Modern Living Residential', es: 'Modern Living Residential' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-modern-living-residential-89.jpg', featured: false },
  { id: 90, title: { en: 'High End Hospitality Photography', es: 'High End Hospitality Fotografía' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-high-end-hospitality-photography-90.jpg', featured: true },
  { id: 91, title: { en: 'Editorial Food Photographer', es: 'Editorial Comida Fotógrafo' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-editorial-food-photographer-91.jpg', featured: false },
  { id: 92, title: { en: 'Luxury Hotel Photography Monterrey', es: 'Lujo Hotel Fotografía Monterrey' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-luxury-hotel-photography-monterrey-92.jpg', featured: false },
  { id: 93, title: { en: 'Architectural Interior Design', es: 'Architectural Interior Design' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-architectural-interior-design-93.jpg', featured: false },
  { id: 94, title: { en: 'Commercial Brand Lifestyle', es: 'Commercial Brand Lifestyle' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-commercial-brand-lifestyle-94.jpg', featured: false },
  { id: 95, title: { en: 'Fine Dining Restaurant Shoot', es: 'Fine Dining Restaurant Shoot' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-fine-dining-restaurant-shoot-95.jpg', featured: true },
  { id: 96, title: { en: 'Real Estate Property Photography', es: 'Bienes Raíces Property Fotografía' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-real-estate-property-photography-96.jpg', featured: false },
  { id: 97, title: { en: 'Chef Portrait Editorial', es: 'Chef Portrait Editorial' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-chef-portrait-editorial-97.jpg', featured: false },
  { id: 98, title: { en: 'Boutique Hotel Interior', es: 'Boutique Hotel Interior' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-boutique-hotel-interior-98.jpg', featured: false },
  { id: 99, title: { en: 'Modern Living Residential', es: 'Modern Living Residential' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-modern-living-residential-99.jpg', featured: false },
  { id: 100, title: { en: 'High End Hospitality Photography', es: 'High End Hospitality Fotografía' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-high-end-hospitality-photography-100.jpg', featured: true },
  { id: 101, title: { en: 'Editorial Food Photographer', es: 'Editorial Comida Fotógrafo' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-editorial-food-photographer-101.jpg', featured: false },
  { id: 102, title: { en: 'Luxury Hotel Photography Monterrey', es: 'Lujo Hotel Fotografía Monterrey' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-luxury-hotel-photography-monterrey-102.jpg', featured: false },
  { id: 103, title: { en: 'Architectural Interior Design', es: 'Architectural Interior Design' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-architectural-interior-design-103.jpg', featured: false },
  { id: 104, title: { en: 'Commercial Brand Lifestyle', es: 'Commercial Brand Lifestyle' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-commercial-brand-lifestyle-104.jpg', featured: false },
  { id: 105, title: { en: 'Fine Dining Restaurant Shoot', es: 'Fine Dining Restaurant Shoot' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-fine-dining-restaurant-shoot-105.jpg', featured: true },
  { id: 106, title: { en: 'Real Estate Property Photography', es: 'Bienes Raíces Property Fotografía' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-real-estate-property-photography-106.jpg', featured: false },
  { id: 107, title: { en: 'Chef Portrait Editorial', es: 'Chef Portrait Editorial' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-chef-portrait-editorial-107.jpg', featured: false },
  { id: 108, title: { en: 'Boutique Hotel Interior', es: 'Boutique Hotel Interior' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-boutique-hotel-interior-108.jpg', featured: false },
  { id: 109, title: { en: 'Modern Living Residential', es: 'Modern Living Residential' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-modern-living-residential-109.jpg', featured: false },
  { id: 110, title: { en: 'High End Hospitality Photography', es: 'High End Hospitality Fotografía' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-high-end-hospitality-photography-110.jpg', featured: true },
  { id: 111, title: { en: 'Editorial Food Photographer', es: 'Editorial Comida Fotógrafo' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-editorial-food-photographer-111.jpg', featured: false },
  { id: 112, title: { en: 'Luxury Hotel Photography Monterrey', es: 'Lujo Hotel Fotografía Monterrey' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-luxury-hotel-photography-monterrey-112.jpg', featured: false },
  { id: 113, title: { en: 'Architectural Interior Design', es: 'Architectural Interior Design' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-architectural-interior-design-113.jpg', featured: false },
  { id: 114, title: { en: 'Commercial Brand Lifestyle', es: 'Commercial Brand Lifestyle' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-commercial-brand-lifestyle-114.jpg', featured: false },
  { id: 115, title: { en: 'Fine Dining Restaurant Shoot', es: 'Fine Dining Restaurant Shoot' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-fine-dining-restaurant-shoot-115.jpg', featured: true },
  { id: 116, title: { en: 'Real Estate Property Photography', es: 'Bienes Raíces Property Fotografía' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-real-estate-property-photography-116.jpg', featured: false },
  { id: 117, title: { en: 'Chef Portrait Editorial', es: 'Chef Portrait Editorial' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-chef-portrait-editorial-117.jpg', featured: false },
  { id: 118, title: { en: 'Boutique Hotel Interior', es: 'Boutique Hotel Interior' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-boutique-hotel-interior-118.jpg', featured: false },
  { id: 119, title: { en: 'Modern Living Residential', es: 'Modern Living Residential' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-modern-living-residential-119.jpg', featured: false },
  { id: 120, title: { en: 'High End Hospitality Photography', es: 'High End Hospitality Fotografía' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-high-end-hospitality-photography-120.jpg', featured: true },
  { id: 121, title: { en: 'Editorial Food Photographer', es: 'Editorial Comida Fotógrafo' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-editorial-food-photographer-121.jpg', featured: false },
  { id: 122, title: { en: 'Luxury Hotel Photography Monterrey', es: 'Lujo Hotel Fotografía Monterrey' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-luxury-hotel-photography-monterrey-122.jpg', featured: false },
  { id: 123, title: { en: 'Architectural Interior Design', es: 'Architectural Interior Design' }, category: 'editorial', size: 'size-tall', image: '/portfolio/editorial/andrea-palacio-architectural-interior-design-123.jpg', featured: false },
];

const categoryLabels = {
  editorial: { en: 'Editorial & Fashion', es: 'Editorial y Moda' },
  hospitality: { en: 'Hotels & Hospitality', es: 'Hoteles y Hospitalidad' },
  food: { en: 'Restaurants & Food', es: 'Restaurantes y Gastronomía' },
  realestate: { en: 'Real Estate & Architecture', es: 'Bienes Raíces y Arquitectura' },
  brand: { en: 'Brand Campaigns', es: 'Campañas de Marca' }
};

let currentFilter = 'all';
let lightboxIndex = 0;
let filteredItems = [];
let lastFocusedElement = null;
const preloadedImages = new Set();
const eagerImageCount = 6;
let displayedCount = 18;
const ITEMS_PER_PAGE = 18;

/**
 * Initialize portfolio gallery
 */
export function initGallery() {
  preloadPortfolioImages();
  renderPortfolio();
  setupFilters();
  setupLightbox();

  // Setup load more
  const loadMoreBtn = document.getElementById('portfolio-load-more');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      displayedCount += ITEMS_PER_PAGE;
      renderPortfolio();
    });
  }

  // Re-render on language change
  window.addEventListener('langchange', () => {
    renderPortfolio();
  });
}

function preloadPortfolioImages() {
  const priorityImages = portfolioData.slice(0, 8).map((item) => item.image);
  warmImageUrls(priorityImages, 'high');

  const remainingImages = portfolioData.slice(8).map((item) => item.image);
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => warmImageUrls(remainingImages, 'low'));
  } else {
    window.setTimeout(() => warmImageUrls(remainingImages, 'low'), 1200);
  }
}

function warmImageUrls(urls, priority) {
  urls.forEach((url) => {
    if (preloadedImages.has(url)) return;
    const img = new Image();
    img.decoding = 'async';
    if ('fetchPriority' in img) {
      img.fetchPriority = priority;
    }
    img.src = url;
    preloadedImages.add(url);
  });
}

/**
 * Render portfolio grid items
 */
function renderPortfolio() {
  const grid = document.getElementById('portfolio-grid');
  if (!grid) return;

  const lang = getLang();
  const items = currentFilter === 'all'
    ? portfolioData.filter(p => p.featured)
    : portfolioData.filter(p => p.category === currentFilter);

  filteredItems = items;

    const paginatedItems = items.slice(0, displayedCount);

  grid.innerHTML = paginatedItems.map((item, index) => `
    <div class="portfolio-item ${item.size}" 
         data-category="${item.category}" 
         data-index="${index}"
         role="button"
         tabindex="0"
         aria-label="${item.title[lang]}">
      <img
        class="portfolio-item-img"
        src="${item.image}"
        alt="${item.title[lang]}"
        loading="${index < eagerImageCount ? 'eager' : 'lazy'}"
        decoding="async"
        fetchpriority="${index < eagerImageCount ? 'high' : 'auto'}"
      >
      <div class="portfolio-item-overlay">
        <h3 class="portfolio-item-title">${item.title[lang]}</h3>
        <span class="portfolio-item-cat">${categoryLabels[item.category]?.[lang] || item.category}</span>
      </div>
    </div>
  `).join('');

  // Add click handlers
  grid.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', () => openLightbox(parseInt(item.dataset.index)));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(parseInt(item.dataset.index));
      }
    });
  });

  const loadMoreBtn = document.getElementById('portfolio-load-more');
  if (loadMoreBtn) {
    if (displayedCount < items.length) {
      loadMoreBtn.style.display = 'inline-flex';
    } else {
      loadMoreBtn.style.display = 'none';
    }
  }
}

/**
 * Setup filter buttons
 */
function setupFilters() {
  const filterContainer = document.getElementById('portfolio-filters');
  if (!filterContainer) return;

  syncFilterAccessibility(filterContainer);

  filterContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    // Update active state
    filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    currentFilter = btn.dataset.filter;
    syncFilterAccessibility(filterContainer);
    displayedCount = ITEMS_PER_PAGE;
    renderPortfolio();
  });
}

function syncFilterAccessibility(filterContainer) {
  filterContainer.querySelectorAll('.filter-btn').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.classList.contains('active')));
  });
}

/**
 * Setup lightbox
 */
function setupLightbox() {
  const lightbox = document.getElementById('lightbox');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');

  if (!lightbox) return;

  closeBtn?.addEventListener('click', closeLightbox);
  prevBtn?.addEventListener('click', () => navigateLightbox(-1));
  nextBtn?.addEventListener('click', () => navigateLightbox(1));

  // Close on backdrop click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (lightbox.hidden) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
    if (e.key === 'Tab') trapFocus(e, lightbox);
  });
}

/**
 * Open lightbox at index
 */
function openLightbox(index) {
  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  const title = document.getElementById('lightbox-title');
  const category = document.getElementById('lightbox-category');

  if (!lightbox || !filteredItems[index]) return;

  lightboxIndex = index;
  const item = filteredItems[index];
  const lang = getLang();

  // Render actual image
  img.style.display = 'block';
  img.src = item.image;
  img.alt = item.title[lang];
  
  // Clean up any old placeholders if they exist
  const imgDiv = document.querySelector('.lightbox-content');
  const placeholder = imgDiv.querySelector('.lightbox-placeholder');
  if (placeholder) {
    placeholder.remove();
  }

  title.textContent = item.title[lang];
  category.textContent = categoryLabels[item.category]?.[lang] || item.category;

  lastFocusedElement = document.activeElement;
  lightbox.hidden = false;
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  document.getElementById('lightbox-close')?.focus();
}

/**
 * Close lightbox
 */
function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.hidden = true;
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lastFocusedElement?.focus?.();
  }
}

/**
 * Navigate lightbox
 */
function navigateLightbox(direction) {
  const newIndex = lightboxIndex + direction;
  if (newIndex >= 0 && newIndex < filteredItems.length) {
    openLightbox(newIndex);
  } else if (newIndex < 0) {
    openLightbox(filteredItems.length - 1);
  } else {
    openLightbox(0);
  }
}

function trapFocus(event, container) {
  const focusable = container.querySelectorAll(
    'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
  );

  if (!focusable.length) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}
