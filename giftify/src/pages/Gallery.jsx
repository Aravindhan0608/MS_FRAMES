import { motion } from 'framer-motion';
import RecentWorks from '../components/RecentWorks';
import BeforeAfterGallery from '../components/BeforeAfterGallery';
import { fadeUp } from '../utils/motionVariants';

export default function Gallery() {
  return (
    <div className="pt-28 pb-16 min-h-screen bg-ink">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center max-w-3xl mx-auto px-4 pt-8 mb-6">
        <p className="font-body text-gold tracking-[0.25em] uppercase text-xs mb-3">Real Work Portfolio</p>
        <h1 className="font-heading font-bold text-4xl sm:text-5xl text-white mb-4">
          Photo Framing &amp; Artwork Gallery
        </h1>
        <div className="w-16 h-[2px] bg-gold mx-auto mb-4" />
        <p className="text-white/60 font-body text-sm max-w-xl mx-auto">
          Explore our collection of authentic wedding portraits, sacred devotional altars, custom mirror frames, and
          multi-photo anniversary collages.
        </p>
      </motion.div>

      <RecentWorks />
      <BeforeAfterGallery />
    </div>
  );
}
