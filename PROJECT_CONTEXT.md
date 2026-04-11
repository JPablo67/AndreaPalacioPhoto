# Andrea Palacio Photo - Full Project Context

## Executive Summary

This project is a bilingual, single-page portfolio/marketing website for Andrea Palacio Photography. It is built as a lightweight Vite app with plain HTML, CSS, and vanilla JavaScript modules instead of a framework.

The site is positioned as a premium commercial/editorial photography brand serving Monterrey and Houston. The experience centers on a cinematic hero slideshow, a filterable portfolio grid, service positioning, testimonials, a journal teaser section, and a contact form.

The codebase is relatively small on the application side and very asset-heavy on the media side:

- App source: `src/`, `index.html`, `locales/`
- Production-facing image set: `public/`
- Larger raw/source photo library: `Photos/`
- Build tool: Vite only
- No backend, no tests, no lint setup, no framework

Build verification completed successfully with `npm run build` on April 10, 2026.

## Project Snapshot

- Project name: `andreapalaciophoto`
- Package type: ESM (`"type": "module"`)
- Main scripts:
  - `npm run dev`
  - `npm run build`
  - `npm run preview`
- Dependency model:
  - Direct dev dependency: `vite`
  - No runtime package dependencies
- Source size:
  - `index.html`: 481 lines
  - `src/main.js`: 195 lines
  - `src/scripts/*.js`: 721 lines total
  - `src/styles/*.css`: 2,095 lines total
  - `locales/*.json`: 332 lines total
- Directory sizes:
  - `src`: 148 KB
  - `locales`: 16 KB
  - `public`: 28 MB
  - `Photos`: 248 MB

## Repository Structure

```text
.
|-- index.html
|-- package.json
|-- package-lock.json
|-- locales/
|   |-- en.json
|   `-- es.json
|-- public/
|   |-- favicon.svg
|   |-- icons.svg
|   |-- hero/           # 5 slideshow images
|   `-- portfolio/      # 20 portfolio images
|-- src/
|   |-- main.js
|   |-- assets/
|   |   |-- hero.png
|   `-- scripts/
|       |-- animations.js
|       |-- blog.js
|       |-- forms.js
|       |-- gallery.js
|       |-- i18n.js
|       |-- slideshow.js
|       `-- theme.js
|   `-- styles/
|       |-- animations.css
|       |-- components.css
|       `-- index.css
`-- Photos/
    `-- PAGINA WEB/     # large source-photo library, not runtime-wired
```

Notes:

- `assets/` at the repo root exists but is empty.
- `src/assets/` contains minimal leftovers (`vite.svg`, `hero.png`) and is not central to runtime rendering.
- This folder is not a Git repository, so there is no commit history available from within this workspace.

## Architecture Overview

### Rendering Model

The app is a serverless/static SPA-style landing page:

- `index.html` provides nearly all page structure.
- `src/main.js` initializes behavior once the DOM is ready.
- Individual JS modules progressively enhance sections already present in HTML.
- Content translations come from locale JSON files fetched at runtime.
- Most visual design and layout live in CSS, not JavaScript.

### Initialization Flow

`src/main.js` is the app entry point and bootstraps the site in this order:

1. Theme initialization
2. Internationalization fetch + language application
3. Dynamic content rendering
4. Navigation/testimonial/form/smooth-scroll behavior
5. Scroll-based animation systems
6. Initial hero animation trigger

Imported modules:

- `theme.js`
- `i18n.js`
- `animations.js`
- `gallery.js`
- `forms.js`
- `blog.js`
- `slideshow.js`

Important design choice: most section content is static in `index.html`, while the portfolio grid and journal cards are injected by JavaScript.

## Page Structure

The page is organized into a fixed-header single-page flow:

1. Hero
2. Portfolio
3. Services
4. About
5. Testimonials
6. Journal
7. Contact
8. Footer
9. Portfolio lightbox modal

### 1. Hero

Purpose:

- Establish premium brand positioning
- Show slideshow-driven visual identity
- Drive users to portfolio/contact

Implementation details:

- Hero slides are injected into `#hero-slideshow` by `src/scripts/slideshow.js`
- Overlay gradient is always present for text readability
- CTA buttons jump to `#contact` and `#portfolio`
- Initial animation visibility is manually triggered in `main.js`

### 2. Portfolio

Purpose:

- Showcase selected work in a bento/masonry-style grid
- Allow category filtering
- Open larger previews via lightbox

Implementation details:

- Filter buttons are declared in HTML
- Portfolio card data is hardcoded in `src/scripts/gallery.js`
- Grid items are generated dynamically into `#portfolio-grid`
- Clicking an item opens a modal lightbox with next/prev navigation
- Keyboard handling supports `Enter`, space, `Escape`, and arrow keys

### 3. Services

Purpose:

- Explain commercial offerings
- Position Andrea across multiple photography verticals

Service cards present:

- Editorial & Fashion
- Hotels & Hospitality
- Restaurants & Food
- Real Estate & Architecture
- Brand Campaigns
- Content Creation

These cards are static HTML with translated text injected via `data-i18n`.

### 4. About

Purpose:

- Introduce Andrea’s positioning and editorial point of view
- Reinforce credibility with animated counters

Includes:

- About copy in 3 paragraphs
- Stat counters for followers, projects, and years
- CTA to contact
- Portrait area intended to be image/background driven via CSS

### 5. Testimonials

Purpose:

- Add social proof
- Reinforce premium/hospitality/real-estate positioning

Implementation details:

- Cards are static HTML
- `main.js` controls active slide state
- Buttons and dots allow navigation
- Autoplay runs every 6 seconds
- Hover pauses autoplay

### 6. Journal

Purpose:

- Add editorial/thought-leadership flavor
- Provide content-marketing signal

Implementation details:

- Posts are sourced from `locales/en.json` and `locales/es.json`
- Cards are generated by `src/scripts/blog.js`
- Images are placeholders implemented as CSS gradients, not real article thumbnails
- "View All Posts" currently points to `#`

### 7. Contact

Purpose:

- Convert visitors into inquiries

Current form fields in HTML:

- Full Name
- Email
- Phone prefix
- Phone number
- Project details textarea

Implementation details:

- Validation is browser-validity-based
- Error state is applied by toggling `.error`
- Submission is simulated with a timeout
- Data is logged to the console
- No API endpoint or email integration exists yet

### 8. Footer

Contains:

- Brand line
- Navigation links
- Services links
- Contact email
- Location line
- Instagram link

### 9. Lightbox

Purpose:

- Show larger portfolio imagery
- Keep users on-page instead of linking out

Implementation details:

- Hidden by default
- Uses `img.src = item.image`
- Includes contact CTA
- Navigation loops through filtered items

## JavaScript Module Breakdown

### `src/main.js`

Role:

- App orchestrator
- Owns initialization order
- Also contains local implementations for:
  - navigation behavior
  - testimonial carousel
  - anchor smooth scrolling

Key behaviors:

- Sticky header via scroll listener
- Mobile nav menu open/close
- Section-based active nav highlighting using `IntersectionObserver`
- Testimonial autoplay and controls
- Smooth anchor scrolling with nav-height offset

### `src/scripts/theme.js`

Role:

- Theme preference resolution and persistence

Behavior:

- Reads `ap-theme` from `localStorage`
- Falls back to `prefers-color-scheme`
- Applies `data-theme="light"` or `data-theme="dark"` on `<html>`
- Updates theme toggle icon state
- Watches for system theme changes when user has not manually chosen a theme

### `src/scripts/i18n.js`

Role:

- Runtime translation system

Behavior:

- Loads both `/locales/en.json` and `/locales/es.json`
- Chooses initial language from `localStorage` or browser locale
- Applies translations to all `[data-i18n]` nodes
- Uses dot-notation lookup for nested keys
- Updates `<title>`, meta description, and `<html lang>`
- Emits a custom `langchange` event when user switches language

Important nuance:

- Translation application uses `innerHTML`, which allows strings like `Let's Create<br>Something Beautiful`.

### `src/scripts/gallery.js`

Role:

- Portfolio renderer and lightbox controller

Behavior:

- Defines all portfolio items inline in a `portfolioData` array
- Supports active filter state
- Regenerates cards on language change
- Sets up click and keyboard activation
- Controls lightbox open/close/navigation

Data model:

- `id`
- `title.en`
- `title.es`
- `category`
- `size`
- `image`

### `src/scripts/blog.js`

Role:

- Journal card renderer

Behavior:

- Pulls localized post arrays from the current locale payload
- Generates cards into `#journal-grid`
- Re-renders on `langchange`
- Uses hardcoded gradient backgrounds as image placeholders

### `src/scripts/forms.js`

Role:

- Client-side inquiry form handling

Behavior:

- Attaches `blur` and `input` listeners for validation styling
- Validates required fields before submit
- Scrolls to first invalid field
- Simulates a network request with a 1.5-second delay
- Displays localized success/error text

Current limitation:

- No real submission target exists

### `src/scripts/slideshow.js`

Role:

- Hero background slideshow

Behavior:

- Waits for `DOMContentLoaded`
- Injects five `.hero-slide` elements
- Cycles active slide every 5 seconds
- Relies on CSS opacity transitions and Ken Burns animation

### `src/scripts/animations.js`

Role:

- Scroll-triggered visual behavior

Behavior:

- One `IntersectionObserver` for reveal classes
- One `IntersectionObserver` for stat counters
- Animated counters using `requestAnimationFrame`
- Basic hero-content parallax/fade effect on scroll

## Styling System

The styling is split across three CSS files:

### `src/styles/index.css`

Purpose:

- Global tokens
- theme variables
- reset/base styles
- typography
- utility-level layout primitives
- button styles
- responsive root sizing

Main theme strategy:

- CSS custom properties
- `html[data-theme="light"]` and `html[data-theme="dark"]`
- shared token system for layout, motion, color, depth, and spacing

### `src/styles/components.css`

Purpose:

- Section and component styling

Main component groups:

- Navigation
- Hero
- Portfolio
- Services
- About
- Testimonials
- Journal
- Contact
- Footer
- Lightbox
- Responsive breakpoints at 1024px, 768px, 480px

This is the largest styling file and holds most of the visual identity.

### `src/styles/animations.css`

Purpose:

- Keyframes
- reusable reveal classes
- delay classes
- reduced-motion handling

Includes:

- fade, slide, scale, shimmer, float, Ken Burns, reveal, pulse, dot-pulse patterns

## Localization Model

Languages:

- English: `locales/en.json`
- Spanish: `locales/es.json`

Localized areas include:

- navigation
- hero
- portfolio labels
- services
- about section
- testimonials
- journal posts
- contact copy
- footer

Important implementation detail:

- The journal post content is localized data, not translated HTML fragments.
- Static form markup only partially matches the available locale schema.

## SEO and Metadata

The page includes a reasonable static SEO baseline:

- Title tag
- Meta description
- Canonical URL
- Alternate hreflang links for English and Spanish
- Favicon
- LocalBusiness + Photographer schema markup
- Instagram `sameAs`
- Area served: Monterrey and Houston

This is all embedded directly in `index.html`, with language-specific title/description swapped at runtime.

## Asset Model

### Runtime Assets

Used by the site directly:

- `public/hero`: 5 slideshow images
- `public/portfolio`: 20 portfolio images
- `public/favicon.svg`
- `public/icons.svg`

### Source Asset Library

`Photos/` contains 125 image files and weighs about 248 MB.

This appears to be a source/archive folder for broader image selection and prep work. It is not wired into runtime code directly. The site instead uses the curated and presumably optimized subset in `public/`.

### Asset Observations

- The production site appears intentionally curated to 5 hero images and 20 portfolio images.
- Keeping the large `Photos/` folder in the project is useful for source context, but it also makes the repository much heavier.

## Current Product/Implementation Gaps

These are the most important realities to know if someone continues this project.

### 1. Portfolio filtering is conceptually multi-category but implemented as single-category

All entries in `src/scripts/gallery.js` currently use:

- `category: 'editorial'`

But the UI exposes filters for:

- editorial
- hospitality
- food
- realestate
- brand

Impact:

- Any filter other than `all` or `editorial` will show an empty grid.
- The portfolio titles imply mixed subject matter, but the category data does not reflect that.

### 2. Contact form content and locale schema are out of sync

The locale files include strings for many fields not currently rendered in `index.html`, such as:

- project type
- location
- timeline/date
- budget
- referral source

Impact:

- The translation schema suggests a richer intake form than the UI actually provides.
- The project may have been reduced in HTML without cleaning the locale contract.

### 3. The contact form is demo-only

Submission flow:

- validates fields
- waits 1.5 seconds
- logs to console
- shows success message

Impact:

- No inquiry is actually sent anywhere.
- This site is not production-ready as a lead-capture funnel unless an endpoint, email service, or form provider is added.

### 4. Some user-facing strings are not localized through the i18n system

Example:

- The phone input placeholder is hardcoded as `Phone Number` in HTML.

Impact:

- Spanish mode is incomplete in small but visible places.

### 5. Journal is presentational rather than fully implemented

Current state:

- localized posts exist
- cards render
- there are no actual post detail pages
- "View All Posts" points to `#`
- card imagery is placeholder gradient artwork

Impact:

- The journal is a brand/storytelling teaser, not a functioning content system.

### 6. No test/lint/CI workflow exists

Current tooling covers only:

- dev server
- production build
- preview server

Impact:

- Regression detection is manual
- quality gates are minimal

### 7. Some leftover scaffolding/assets suggest iterative development

Examples:

- empty top-level `assets/` directory
- `src/assets/vite.svg`
- `src/assets/hero.png`
- references in comments to placeholders and future endpoint replacement

Impact:

- Not harmful, but useful to clean if the project is being hardened

## Runtime and Interaction Details

### Theme Persistence

- Storage key: `ap-theme`
- Anti-flash theme script runs inline in `<head>` before CSS loads

### Language Persistence

- Storage key: `ap-lang`
- Browser Spanish preference defaults to `es`, otherwise `en`

### Navigation

- Fixed header
- mobile menu support
- active section state using `IntersectionObserver`
- dropdown menu under portfolio

Important nuance:

- Dropdown links carry `data-filter` attributes in HTML, but filter switching is only wired through clicks inside `#portfolio-filters`, not through the nav dropdown itself.

### Animation Strategy

- Most reveals are CSS-driven once `.is-visible` is added
- JavaScript is only responsible for observer orchestration and counter/parallax updates
- Reduced motion is partially respected in CSS

## Verification Performed

Command run:

```bash
npm run build
```

Result:

- Build succeeded
- Vite version in build output: `8.0.5`
- Generated artifacts:
  - `dist/index.html` 30.45 kB
  - `dist/assets/index-*.css` 31.83 kB
  - `dist/assets/index-*.js` 14.95 kB

## How To Work On This Project

### Local Development

```bash
npm install
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

### Where To Edit Common Things

- Page structure/content shell: `index.html`
- App boot flow: `src/main.js`
- Theme behavior: `src/scripts/theme.js`
- Translations: `locales/en.json`, `locales/es.json`
- Portfolio dataset/lightbox: `src/scripts/gallery.js`
- Journal cards: `src/scripts/blog.js`
- Form behavior: `src/scripts/forms.js`
- Global design tokens: `src/styles/index.css`
- Section/component styling: `src/styles/components.css`
- Motion system: `src/styles/animations.css`

## Recommended Next Priorities

If the goal is to move this site toward production quality, the highest-leverage next steps are:

1. Fix portfolio taxonomy so each item has a real category and every filter returns content.
2. Decide whether the contact form should stay minimal or match the richer locale schema, then align HTML, JS, and translations.
3. Replace simulated form submission with a real delivery path.
4. Finish bilingual polish by moving remaining hardcoded strings into the translation system.
5. Decide whether the journal should stay teaser-only or become a real content section.
6. Remove or reorganize unused scaffolding/assets if the repo is being cleaned up for handoff or deployment.

## Bottom Line

This is a polished static portfolio site with strong visual direction, thoughtful bilingual support, and a clean vanilla-JS architecture. The codebase is easy to understand because behavior is modular and the page is mostly declarative.

The main unfinished areas are product completeness rather than technical instability: category filtering, real form delivery, journal depth, and content/schema consistency. Once those are resolved, the project is already close to being a strong deployable marketing site.
