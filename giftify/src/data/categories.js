import photoFramImg from '../assets/photo_fram.jpeg';
import mirrorFramsImg from '../assets/Mirror_frams.jpg';
import canvaFramesImg from '../assets/canva_frames.webp';
import customsFramesImg from '../assets/customs_frames.jpg';
import img0015 from '../assets/img-wa0015.webp';

export const categories = [
  {
    id: 1,
    name: 'Photo Frames',
    slug: 'photo-frames',
    description: 'Classic teak, walnut, and modern acrylic frames tailored for your memories',
    startingPrice: 499,
    image: photoFramImg,
    alt: 'Classic handcrafted wooden photo frame collection by MS Frames',
  },
  {
    id: 2,
    name: 'Mirror Frames',
    slug: 'mirror-frames',
    description: 'Bespoke ornate and minimalist framed mirrors for home and studio interiors',
    startingPrice: 1299,
    image: mirrorFramsImg,
    alt: 'Luxury gold and brass finished mirror frame designed by MS Frames',
  },
  {
    id: 3,
    name: 'Canvas Frames',
    slug: 'canvas-frames',
    description: 'Museum-grade textured canvas prints mounted on solid wooden stretchers',
    startingPrice: 1499,
    image: canvaFramesImg,
    alt: 'Premium textured canvas portrait frame with wooden border',
  },
  {
    id: 4,
    name: 'Customized Gifts',
    slug: 'customized-gifts',
    description: 'Personalized anniversary, wedding, birthday collages, and memory keepsakes',
    startingPrice: 699,
    image: customsFramesImg,
    alt: 'Custom engraved wedding and baby memory photo collage gift',
  },
  {
    id: 5,
    name: 'Pooja Room Frames',
    slug: 'pooja-room-frames',
    description: 'Sacred deity portraits, temple wall backdrops, and gold-embossed altar setups',
    startingPrice: 899,
    image: img0015,
    alt: 'Devotional pooja room deity photo frame with traditional gold border',
  },
];
