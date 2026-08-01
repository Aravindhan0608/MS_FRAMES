# MS Frames — Premium Photo Frames & Customized Gifts

A modern, responsive business showcase website built with **React + Vite**, **Tailwind CSS**, **Framer Motion**, **React Router DOM**, **React Icons**, and **Swiper.js**.

This project has gone through three passes:
1. Refactored from an earlier "Giftify" gift-shop template into the MS Frames brand (same architecture, new content/business logic).
2. Visual redesign into a black & gold minimal-luxury aesthetic (JSX structure, Tailwind classes, typography, colors, icons, and animations updated; no functionality, routing, or state management changed).
3. **Full-site consistency pass (this pass):** every remaining section/page (Categories, Featured Collection, Before & After, Shop, Gallery, About, Contact) now uses the same black/gold theme as the Hero. Search bar and dark/light theme toggle removed entirely from the navbar. Product cards simplified (no price, no "View Details"). FAQ restyled with premium hover/active states. Customer Reviews redesigned with premium card styling, and "View All Reviews" now routes to a dedicated `/reviews` page.

## Getting Started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── assets/         # MS Frames logo
├── components/      # Navbar, Hero, Categories, FeaturedProducts, CustomFrameBuilder,
│                     BeforeAfterGallery, RecentWorks, WhyChooseUs, ProcessTimeline,
│                     Testimonials, FAQ, Footer, ScrollProgress, BackToTop, FloatingWhatsApp...
├── pages/           # Home, Shop (Products), Gallery, Customize, About, Contact, Reviews, Policy, NotFound
├── hooks/           # (currently empty — dark/light theme toggle removed)
├── utils/           # helpers + framer-motion variants
├── data/            # products, categories, testimonials, faqs, gallery/process/stats
├── App.jsx
└── main.jsx
```

## Design System (current)

- **Ink (base black):** `#0B0B0B` · **Gold:** `#C89B3C` · **Light Gold:** `#D8B56A` · **Cream:** `#FAF6EE` · **Off-white:** `#F8F6F2`
- Headings in **Cinzel**, body copy in **Poppins**, buttons/labels in **Montserrat**
- Minimal luxury: black hero/navbar/footer sections, cream/white content sections, thin gold dividers, gold hover-lift cards, subtle glass panel only behind the hero image
- Animations: fade up/left/right, hover lift, image zoom, animated counters — used sparingly per section

## Key Sections

- Sticky black navbar with gold logo wordmark, uppercase nav links with gold underline, products icon, WhatsApp CTA (no search bar, no theme toggle)
- Hero with large Cinzel heading, italic tagline, dual gold/black CTAs, glass-panel-backed hero image
- Animated business stats bar (black background, gold numbers)
- Category & Featured Collection grids — clean image + name cards, no price or "View Details"
- Custom Order section: numbered step icons + live-estimate frame builder with "Request Quote" / "Order via WhatsApp"
- Before & After comparison sliders
- Our Gallery — Pinterest-style masonry with gold filter tabs + lightbox
- Why Choose MS Frames, Our Process timeline, Customer Reviews carousel (premium hover-lift cards, "View All Reviews" → `/reviews` page), FAQ accordion with active-state highlighting
- Contact page: contact cards, WhatsApp/map embed, contact form, Support section
- Privacy Policy / Terms & Conditions / Shipping & Delivery / Return & Refund — sectioned dark policy pages
- Site-wide scroll progress bar, back-to-top button, floating WhatsApp button
- Every section and page now shares the same black (`#0B0B0B`) background with gold accents for full-site visual consistency

## Notes

- Product/gallery images are pulled from Unsplash via URL for demo purposes — replace with your own studio photography before shipping.
- The WhatsApp number (`+1 555 234 8899`) and studio contact details are placeholders — update them in `Navbar.jsx`, `Hero.jsx`, `CustomFrameBuilder.jsx`, `Footer.jsx`, `FloatingWhatsApp.jsx`, and `Contact.jsx`.
- The Google Maps embed in `Contact.jsx` currently points to a generic "Palani, Tamil Nadu" query — swap in your real studio address.
