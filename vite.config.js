import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8787',
        changeOrigin: true
      }
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        houston: resolve(__dirname, 'houston/index.html'),
        monterrey: resolve(__dirname, 'monterrey/index.html'),
        blog: resolve(__dirname, 'blog/index.html'),
        hotelPhotographyBookings: resolve(__dirname, 'blog/hotel-photography-bookings/index.html'),
        hiringRealEstatePhotographer: resolve(__dirname, 'blog/hiring-real-estate-photographer/index.html'),
        restaurantVisualStorytelling: resolve(__dirname, 'blog/restaurant-visual-storytelling/index.html')
      }
    }
  }
});
