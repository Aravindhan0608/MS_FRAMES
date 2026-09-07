import { useEffect } from 'react';
import { BUSINESS_INFO } from '../utils/constants';

function upsertMeta(attr, key, content) {
  if (!content) return;
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel, href) {
  if (!href) return;
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute(rel, rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function upsertJsonLd(id, data) {
  let script = document.getElementById(id);
  if (!script) {
    script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

export default function SEO({ title, description, keywords, path, image, noindex = false }) {
  useEffect(() => {
    const pageTitle = title || `${BUSINESS_INFO.name} | ${BUSINESS_INFO.tagline}`;
    document.title = pageTitle;

    const desc = description || 'MS Frames — Premium photo frames, customized gifts, canvas prints & wall decor in Palani.';
    const siteUrl = BUSINESS_INFO.siteUrl;
    const currentPath = path || window.location.pathname;
    const canonicalUrl = `${siteUrl}${currentPath}`;
    const ogImage = image
      ? (image.startsWith('http') ? image : `${siteUrl}${image}`)
      : `${siteUrl}/og-image.png`;

    upsertMeta('name', 'description', desc);
    upsertMeta('name', 'keywords', keywords || 'photo frames Palani, customized gifts, canvas prints, temple frames');
    upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');

    // Open Graph
    upsertMeta('property', 'og:title', pageTitle);
    upsertMeta('property', 'og:description', desc);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('property', 'og:site_name', BUSINESS_INFO.name);
    upsertMeta('property', 'og:image', ogImage);

    // Twitter
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', pageTitle);
    upsertMeta('name', 'twitter:description', desc);
    upsertMeta('name', 'twitter:image', ogImage);

    // Canonical
    upsertLink('canonical', canonicalUrl);

    // JSON-LD LocalBusiness Structured Data
    const localBusinessSchema = {
      '@context': 'https://schema.org',
      '@type': 'HomeGoodsStore',
      name: BUSINESS_INFO.name,
      image: `${siteUrl}/og-image.png`,
      telephone: BUSINESS_INFO.phone,
      email: BUSINESS_INFO.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: '7/34/L, Jawahar Nagar',
        addressLocality: 'Palani',
        addressRegion: 'Tamil Nadu',
        postalCode: '624601',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 10.4677857,
        longitude: 77.5212119,
      },
      url: siteUrl,
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '09:00',
          closes: '20:00',
        },
      ],
      priceRange: '₹₹',
      sameAs: [BUSINESS_INFO.instagramUrl, BUSINESS_INFO.facebookUrl],
    };

    upsertJsonLd('schema-local-business', localBusinessSchema);
  }, [title, description, keywords, path, image, noindex]);

  return null;
}
