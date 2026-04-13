# Production Readiness Checklist: Andrea Palacio Photography

This document outlines the remaining technical and business requirements to elevate the project from a working codebase to a fully finalized, production-ready website.

---

## 1. Essential SEO, Indexing, & Social Sharing
While the site currently implements Schema.org JSON, it lacks structural indexing files and social media "preview" tags.

### To-Do:
- [x] **Generate `sitemap.xml`**
  - Needs to map out `<url>` entries for the home page (`/`) and all individual blog pages (`/blog/`, `/blog/hotel-photography-bookings/`, etc.).
  - Set appropriate `<changefreq>` and `<priority>` tags so search engines know which pages to crawl most often.
- [x] **Create `robots.txt`**
  - Place a simple `robots.txt` in the `/public` root.
  - Include the `Sitemap: https://andreapalacio.art/sitemap.xml` directive.
  - Allow all crawling (`User-agent: *`, `Allow: /`), but restrict private backend routes if needed (`Disallow: /api/`).
- [x] **Implement OpenGraph (OG) & Twitter Cards**
  - Add `<meta property="og:title">`, `og:description`, `og:image`, and `og:url` to `index.html` and blog pages.
  - Add `<meta name="twitter:card" content="summary_large_image">` and related Twitter tags.
  - **Asset Needed**: Create a high-quality 1200x630px OG preview image (e.g., `public/og-image.jpg`) that showcases Andrea's best work alongside the brand logo. This is what will appear when links are shared on iMessage, WhatsApp, LinkedIn, and Facebook.

---

## 2. API & Contact Form Configuration (.env)
The backend service (`server/index.js`) is written to send inquiries via **Resend**, but it relies on environment variables that do not yet exist, meaning the contact form currently cannot send emails.

### To-Do:
- [x] **Create `.env` file**
  - Add the file to the project root (ensure `.env` is in `.gitignore`!).
- [x] **Register for Resend API**
  - Create a Resend account and verify the domain (`andreapalacio.art`).
  - Generate an API Key.
- [x] **Configure Variables**
  - Set `RESEND_API_KEY="..."`
  - Set `INQUIRY_TO_EMAIL="andy@andreapalacio.art"` (or whoever receives the leads).
  - Set `INQUIRY_FROM_EMAIL="inquiry@andreapalacio.art"` (must be verified domain).
  - Ensure the production server/hosting provider (Vercel, Railway, Render, etc.) has these environment variables configured in its dashboard.

---

## 3. Analytics & Event Tracking
Currently, there is no way to measure site traffic or monitor successful conversions.

### To-Do:
- [x] **Install a snippet (Google Analytics 4 / Plausible / Meta Pixel)**
  - Add the tracking block into the `<head>` of `index.html`.
- [x] **Set up Conversion Tracking**
  - Wire custom JavaScript events to trigger specifically when the inquiry form successfully submits (e.g., `gtag('event', 'generate_lead')`). This allows us to track exactly how many visits lead to actual photoshoot inquiries.

---

## 4. Browser & Device Icons (PWA/Home Screen)
The site uses a basic `favicon.svg`. To look professional on all devices (especially iOS/Android home screens), more formats are required.

### To-Do:
- [x] **Generate Apple Touch Icon**
  - Create an `apple-touch-icon.png` (180x180px) and link it in the `<head>` (`<link rel="apple-touch-icon" href="/apple-touch-icon.png">`).
- [x] **Generate App Manifest (`site.webmanifest`)**
  - Create a manifest file defining the app name, theme color, and Android-specific icons (`android-chrome-192x192.png`, `512x512`).
  - Define `<meta name="theme-color" content="#ffffff">` (or match the primary site color) to style the Chrome toolbar on Android devices.

---

## 5. Performance & Media Optimization
Since this is a photography portfolio, image weight is the biggest threat to Core Web Vitals and load times.

### To-Do:
- [x] **Next-Gen Formats (WebP / AVIF)**
  - Audit all JPEGs/PNGs in `public/hero` and `public/portfolio`.
  - Compress and convert heavy assets into `.webp` or `.avif`.
- [x] **Responsive Image Implementation**
  - Update `<img>` tags to use `srcset` or `<picture>` elements, allowing mobile devices to download smaller resolution files instead of 4K desktop images.
  - Ensure all `<img>` tags have explicit `width`, `height`, and `loading="lazy"` (where appropriate) attributes to prevent Cumulative Layout Shift (CLS).

---

## 6. Pre-Launch Housekeeping
- [x] **Accessibility (a11y) Audit**
  - Verify all form inputs have associated `<label>` attributes and aria-roles.
  - Verify color contrast passing ratios.
- [x] **404 / Error Pages**
  - Create a custom lightweight `404.html` page consistent with the brand's aesthetic.
- [x] **Legal / Privacy**
  - Add a simple Privacy Policy / Terms & Conditions page or modal, which is often required by Meta/Google if running paid ads.