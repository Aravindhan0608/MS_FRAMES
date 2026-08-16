import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { galleryWorks } from '../data/gallery';
import { fadeUp, staggerContainer } from '../utils/motionVariants';

const filters = ['All', 'Wedding Frames', 'Baby Frames', 'Anniversary Gifts', 'God frams'];

export default function RecentWorks() {
  const [active, setActive] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  const items = active === 'All' ? galleryWorks : galleryWorks.filter((g) => g.category === active);

  return (
    <section className="py-24 px-4 max-w-7xl mx-auto bg-ink">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        className="text-center mb-10"
      >
        <p className="font-body text-gold tracking-[0.25em] uppercase text-xs mb-3">Our Craft</p>
        <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white">Our Gallery</h2>
        <div className="w-16 h-[2px] bg-gold mx-auto mt-4" />
      </motion.div>

      <div className="flex flex-wrap justify-center gap-2.5 mb-10">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`px-4 py-2 rounded-full text-[11px] font-button tracking-wide uppercase transition-all ${
              active === f ? 'bg-gold text-ink' : 'border border-gold/30 text-white/70 hover:border-gold hover:text-gold'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <motion.div
        key={active}
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="columns-2 md:columns-3 gap-4 [column-fill:_balance]"
      >
        {items.map((item, i) => (
          <motion.button
            key={item.id}
            variants={fadeUp}
            custom={i}
            onClick={() => setLightbox(item)}
            className={`img-zoom mb-4 w-full rounded-xl2 overflow-hidden shadow-lift block break-inside-avoid ring-1 ring-gold/10 ${
              item.tall ? 'h-80' : 'h-52'
            }`}
          >
            <img src={item.image} alt={item.category} loading="lazy" className="w-full h-full object-cover" />
          </motion.button>
        ))}
      </motion.div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-6 cursor-zoom-out"
          >
            <motion.img
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={lightbox.image}
              alt={lightbox.category}
              className="max-h-[85vh] max-w-full rounded-xl2 shadow-2xl ring-1 ring-gold/30"
            />
            <button
              onClick={() => setLightbox(null)}
              aria-label="Close"
              className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-gold/20 text-gold flex items-center justify-center transition-colors"
            >
              <FiX className="text-xl" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
