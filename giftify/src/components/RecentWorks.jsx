import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight, FiMaximize2 } from 'react-icons/fi';
import { getPublicGallery } from '../admin/services/api';
import { fadeUp, staggerContainer } from '../utils/motionVariants';

const filters = ['All', 'Wedding Frames', 'Baby Frames', 'Anniversary Gifts', 'God & Devotional Frames'];

export default function RecentWorks() {
  const [galleryWorks, setGalleryWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [active, setActive] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchGallery = async () => {
      try {
        const data = await getPublicGallery();
        if (isMounted) {
          setGalleryWorks(data);
        }
      } catch (err) {
        if (isMounted) {
          setError('Unable to load gallery at the moment.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchGallery();
    return () => {
      isMounted = false;
    };
  }, []);

  const items = active === 'All' ? galleryWorks : galleryWorks.filter((g) => g.category === active);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxIndex]);

  const handlePrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((curr) => (curr > 0 ? curr - 1 : items.length - 1));
  }, [lightboxIndex, items.length]);

  const handleNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((curr) => (curr < items.length - 1 ? curr + 1 : 0));
  }, [lightboxIndex, items.length]);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, handlePrev, handleNext]);

  const activeItem = lightboxIndex !== null ? items[lightboxIndex] : null;

  return (
    <section className="py-24 px-4 max-w-7xl mx-auto bg-ink">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        className="text-center mb-10"
      >
        <p className="font-body text-gold tracking-[0.25em] uppercase text-xs mb-3">Master Framing Portfolio</p>
        <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white">Our Craftsmanship Gallery</h2>
        <div className="w-16 h-[2px] bg-gold mx-auto mt-4" />
      </motion.div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 mb-10">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => {
              setActive(f);
              setLightboxIndex(null);
            }}
            className={`px-4 py-2 rounded-full text-[11px] font-button tracking-wide uppercase transition-all ${
              active === f
                ? 'bg-gold text-ink font-semibold shadow-gold'
                : 'border border-gold/30 text-white/70 hover:border-gold hover:text-gold'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="py-20 text-center text-white/60 font-body text-xs flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-gold border-t-transparent animate-spin" />
          <span>Loading gallery collection...</span>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="py-16 text-center text-white/60 font-body text-xs">
          {error}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && items.length === 0 && (
        <div className="py-16 text-center text-white/60 font-body text-xs">
          No gallery items available yet.
        </div>
      )}

      {/* Masonry Columns */}
      {!loading && !error && items.length > 0 && (
        <motion.div
          key={active}
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="columns-1 sm:columns-2 md:columns-3 gap-4 [column-fill:_balance]"
        >
          {items.map((item, i) => (
            <motion.div
              key={item._id || item.id || i}
              variants={fadeUp}
              custom={i}
              className="mb-4 break-inside-avoid"
            >
              <button
                type="button"
                onClick={() => setLightboxIndex(i)}
                aria-label={`View enlarged photo: ${item.title || item.category}`}
                className="group relative w-full rounded-xl2 overflow-hidden shadow-card hover:shadow-lift block ring-1 ring-gold/15 bg-black/40 focus-visible:ring-2 focus-visible:ring-gold text-left"
              >
                <img
                  src={item.imageUrl || item.image}
                  alt={item.alt || item.title || item.category}
                  loading="lazy"
                  className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                    item.tall !== undefined ? (item.tall ? 'h-72 sm:h-80' : 'h-48 sm:h-56') : (i % 3 === 0 ? 'h-72 sm:h-80' : 'h-48 sm:h-56')
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <span className="text-[10px] text-gold font-button uppercase tracking-widest">{item.category}</span>
                  <p className="text-sm font-heading font-semibold text-white truncate">{item.title}</p>
                </div>
              </button>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Accessible Lightbox Modal */}
      <AnimatePresence>
        {activeItem && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={activeItem.title || 'Image Preview'}
            onClick={(e) => {
              if (e.target === e.currentTarget) setLightboxIndex(null);
            }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxIndex(null)}
              aria-label="Close Lightbox (Esc)"
              className="absolute top-5 right-5 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-gold hover:text-ink text-gold flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-gold"
            >
              <FiX className="text-xl" />
            </button>

            {/* Prev Button */}
            <button
              onClick={handlePrev}
              aria-label="Previous Image (Left Arrow)"
              className="absolute left-4 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-gold hover:text-ink text-gold flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-gold"
            >
              <FiChevronLeft className="text-2xl" />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              aria-label="Next Image (Right Arrow)"
              className="absolute right-4 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-gold hover:text-ink text-gold flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-gold"
            >
              <FiChevronRight className="text-2xl" />
            </button>

            {/* Image Preview Box */}
            <div className="relative max-h-[85vh] max-w-4xl flex flex-col items-center">
              <motion.img
                key={activeItem._id || activeItem.id || lightboxIndex}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                src={activeItem.imageUrl || activeItem.image}
                alt={activeItem.alt || activeItem.title}
                className="max-h-[75vh] max-w-full rounded-xl shadow-2xl ring-1 ring-gold/40 object-contain"
              />
              <div className="mt-4 text-center">
                <span className="text-xs text-gold uppercase tracking-widest font-button">{activeItem.category}</span>
                <h3 className="text-white font-heading font-semibold text-base mt-1">{activeItem.title}</h3>
                <p className="text-[11px] text-white/50 mt-0.5">
                  {lightboxIndex + 1} of {items.length} • Use Arrow Keys to navigate
                </p>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
