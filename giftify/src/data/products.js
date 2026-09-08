import classicTeakImg from '../assets/Photo_Frames_Wooden_classic teak_photo.avif';
import ornateGoldMirrorImg from '../assets/Mirror_Frames_gold.jpg';
import largeGalleryCanvasImg from '../assets/Canvas Frames_large_gallery.webp';
import coupleKeepsakeImg from '../assets/Customized_Gifts_personalized.webp';
import img0015 from '../assets/img-wa0015.webp';
import walnutMultiImg from '../assets/Photo _Frames_walnut_multi.jpg';
import brassAccentMirrorImg from '../assets/Mirror_Frames_polished_brass_accents.jpg';
import panoramicCanvasImg from '../assets/Canvas Frames_panoramic.webp';

export const products = [
  {
    id: 1,
    name: 'Classic Teak Photo Frame',
    category: 'Photo Frames',
    startingPrice: 499,
    material: 'Natural Solid Teak Wood & Crystal Glass',
    sizes: ['6x8 in', '8x12 in', '12x18 in', 'Custom'],
    description:
      'Timeless solid teak wood photo frame with anti-glare crystal glass, elegant inner border beading, and moisture-resistant backing.',
    image: classicTeakImg,
    badge: 'Popular',
  },
  {
    id: 2,
    name: 'Ornate Gold Mirror Frame',
    category: 'Mirror Frames',
    startingPrice: 1699,
    material: 'Gold-leaf Finished Synthetic & Beveled Mirror',
    sizes: ['18x24 in', '24x36 in', '30x48 in'],
    description:
      'Royal antique gold finish framed mirror perfect for living room focal walls, hallways, and luxury dressing areas.',
    image: ornateGoldMirrorImg,
    badge: 'Bestseller',
  },
  {
    id: 3,
    name: 'Large Gallery Canvas Wrap',
    category: 'Canvas Frames',
    startingPrice: 1499,
    material: '380 GSM Archival Canvas & Kiln-Dried Pine Wood',
    sizes: ['12x18 in', '18x24 in', '20x30 in', '24x36 in'],
    description:
      'High-definition archival canvas print stretched over a sturdy pine wood frame with seamless border wrapping.',
    image: largeGalleryCanvasImg,
    badge: 'Premium',
  },
  {
    id: 4,
    name: 'Personalized Couple Keepsake Frame',
    category: 'Customized Gifts',
    startingPrice: 799,
    material: 'Engineered Wood with Acrylic Protective Shield',
    sizes: ['8x12 in', '12x18 in', '16x24 in'],
    description:
      'Multi-photo commemorative collage frame customized with personal names, dates, quotes, and precision photo mounting.',
    image: coupleKeepsakeImg,
    badge: 'Trending',
  },
  {
    id: 5,
    name: 'Sacred Temple Deity Frame Set',
    category: 'Pooja Room Frames',
    startingPrice: 899,
    material: 'Gold-foiled Teak Border with Acrylic Shield',
    sizes: ['8x12 in', '12x18 in', '16x24 in', 'Custom'],
    description:
      'High-resolution divine portraits crafted with gold foil accents, waterproof protective lamination, and traditional borders.',
    image: img0015,
    badge: 'Devotional',
  },
  {
    id: 6,
    name: 'Walnut Multi-Photo Grid Frame',
    category: 'Photo Frames',
    startingPrice: 999,
    material: 'Dark Walnut Finish Engineered Hardwood',
    sizes: ['12x18 in (6 photos)', '16x24 in (9 photos)', '20x30 in (12 photos)'],
    description:
      'Sophisticated grid layout frame designed to display multiple family memories in one unified, elegant wall piece.',
    image: walnutMultiImg,
    badge: 'Collage',
  },
  {
    id: 7,
    name: 'Brushed Brass Accent Mirror',
    category: 'Mirror Frames',
    startingPrice: 2199,
    material: 'Brushed Metal Finish with Beveled Edge Mirror',
    sizes: ['20x20 in', '24x36 in', 'Custom'],
    description:
      'Contemporary minimalist round-corner mirror frame with flawless high-clarity reflection for modern home interiors.',
    image: brassAccentMirrorImg,
    badge: 'Luxury',
  },
  {
    id: 8,
    name: 'Panoramic Wall Art Canvas Frame',
    category: 'Canvas Frames',
    startingPrice: 1999,
    material: 'Premium Matte Canvas on Solid Wooden Stretcher',
    sizes: ['12x36 in', '18x48 in', '24x60 in'],
    description:
      'Breathtaking wide-angle panoramic frame ideal for living room sofa backdrops and office executive boardrooms.',
    image: panoramicCanvasImg,
    badge: 'Panoramic',
  },
];
