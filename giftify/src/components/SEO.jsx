import { useEffect } from 'react';

const SITE_NAME = 'MS Frames';
const SITE_URL = typeof window !== 'undefined' ? window.location.origin : '';
const DEFAULT_DESCRIPTION =
  'MS Frames — Premium photo frames, customized gifts, canvas prints & wall decor.';
const DEFAULT_KEYWORDS =
  'photo frames, customized gifts, canvas prints, wall decor, MS Frames, Palani, Tamil Nadu';
const DEFAULT_OG_IMAGE = '/src/assets/logo1.png';

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
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export default function SEO({ title, description, keywords, path, image, noindex = false }) {
  useEffect(() => {
    const pageTitle = title || SITE_NAME;
    document.title = pageTitle;

    const desc = description || DEFAULT_DESCRIPTION;
    const canonicalUrl = `${SITE_URL}${path || window.location.pathname}`;
    const ogImage = image ? (image.startsWith('http') ? image : `${SITE_URL}${image}`) : `${SITE_URL}${DEFAULT_OG_IMAGE}`;

    upsertMeta('name', 'description', desc);
    upsertMeta('name', 'keywords', keywords || DEFAULT_KEYWORDS);
    upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');

    upsertMeta('property', 'og:title', pageTitle);
    upsertMeta('property', 'og:description', desc);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:image', ogImage);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', pageTitle);
    upsertMeta('name', 'twitter:description', desc);
    upsertMeta('name', 'twitter:image', ogImage);

    upsertLink('canonical', canonicalUrl);
  }, [title, description, keywords, path, image, noindex]);

  return null;
}
