# MS Frames — Premium Photo Frames & Customized Gifts

A modern, responsive, frontend-only business showcase and custom order inquiry website for **MS Frames** (Palani, Tamil Nadu), built with **React + Vite**, **Tailwind CSS**, **Framer Motion**, **React Router DOM**, **React Icons**, and **Swiper.js**.

---

## 🌟 Key Features

* **Instant WhatsApp Inquiries & Proofing:** Direct WhatsApp integration across all product cards, quick views, contact forms, and custom order builder with dynamic message pre-formatting.
* **Interactive Custom Frame Builder (`/customize`):** Configure frame type, dimensions, wood finish (solid teak, dark walnut, antique gold, brass), and matting borders with real-time preview and dynamic INR pricing estimates.
* **Full Product Catalog with Quick View:** Filterable shop by category with quick view modal, sizes, materials, and direct WhatsApp inquiry.
* **Master Craftsmanship Gallery:** Masonry portfolio with category filter tabs and accessible keyboard-navigable Lightbox (Arrow Keys & Escape).
* **Before & After Studio Slider:** Direct draggable on-canvas touch handle comparing raw client photos with finished framed pieces.
* **Fully Responsive & Accessible:** Optimized layouts across mobile (320px+), tablet, and desktop viewports with WCAG `:focus-visible` states, ARIA modal attributes, and body scroll locking.
* **Optimized Image Assets:** High-quality local WebP compressed assets, preconnected Google Fonts, and full Schema.org JSON-LD LocalBusiness structured data.

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start local development server
npm run dev
```

Then open `http://localhost:5173` in your browser.

## 📦 Build for Production

```bash
# Build static bundle
npm run build

# Preview production build
npm run preview
```

---

## 📁 Project Structure

```
ms-frames/
├── public/              # Favicon, robots.txt, sitemap.xml, og-image.png
├── src/
│   ├── assets/          # Optimized WebP photo frame assets & logo
│   ├── components/      # Navbar, Hero, Categories, ProductCard, ProductQuickView,
│   │                    # CustomFrameBuilder, RecentWorks, BeforeAfterGallery,
│   │                    # ProcessTimeline, WhyChooseUs, Testimonials, FAQ, Footer...
│   ├── data/            # categories.js, products.js, gallery.js, testimonials.js, policies.js
│   ├── pages/           # Home, Shop, Customize, Gallery, About, Contact, Reviews, Policy, NotFound
│   ├── utils/           # constants.js, helpers.js, motionVariants.js, seoConfig.js
│   ├── App.jsx          # Route definitions & global layout wrappers
│   ├── main.jsx         # Application root mount
│   └── index.css        # Tailwind directives & luxury design tokens
├── index.html           # Production HTML entry with SEO & OG tags
├── tailwind.config.js   # Tailored theme colors & typography
└── vite.config.js       # Vite configuration with React plugin
```

---

## 🎨 Design System

* **Base Ink:** `#0B0B0B`
* **Royal Gold:** `#C89B3C`
* **Light Gold Accent:** `#D8B56A`
* **Typography:**
  * Headings: **Cinzel** (serif)
  * Body: **Poppins** (sans-serif)
  * Buttons & Badges: **Montserrat** (sans-serif)

---

## 📞 Studio Contact Details

* **Studio Address:** 7/34/L, Jawahar Nagar, Palani, Dindigul, Tamil Nadu - 624601
* **Phone:** +91 63691 07200
* **WhatsApp:** +91 63691 07200
* **Email:** msframes01@gmail.com
* **Working Hours:** Monday – Sunday: 9:00 AM – 8:00 PM
