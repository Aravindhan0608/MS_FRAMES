import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCheck, FiLayers, FiMaximize2, FiTag } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { getWhatsAppInquiryUrl } from '../utils/constants';

export default function ProductQuickView({ product, onClose }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!product) return;

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus close button on mount
    closeButtonRef.current?.focus();

    // Escape key listener
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [product, onClose]);

  if (!product) return null;

  const whatsappUrl = getWhatsAppInquiryUrl({
    type: 'product',
    name: product.name,
    category: product.category,
    price: product.startingPrice,
  });

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-view-title"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-3xl rounded-xl2 bg-ink border border-gold/30 shadow-2xl overflow-hidden my-8"
        >
          {/* Close Button */}
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close product preview"
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/10 text-gold hover:bg-gold hover:text-ink flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-gold"
          >
            <FiX className="text-xl" />
          </button>

          <div className="grid md:grid-cols-2 gap-6 p-6 sm:p-8 items-center">
            {/* Product Image */}
            <div className="relative rounded-xl overflow-hidden aspect-[4/3] md:aspect-square bg-black/40 border border-gold/15">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <span className="absolute top-3 left-3 bg-gold text-ink font-button font-bold text-[10px] tracking-wider uppercase px-3 py-1 rounded-full shadow">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Product Details */}
            <div className="flex flex-col">
              <p className="font-button text-[11px] text-gold uppercase tracking-widest mb-1.5 font-semibold">
                {product.category}
              </p>
              <h2 id="quick-view-title" className="font-heading font-bold text-2xl text-white mb-3 leading-snug">
                {product.name}
              </h2>

              <p className="font-body text-xs text-white/70 leading-relaxed mb-5">
                {product.description}
              </p>

              {/* Specs */}
              <div className="space-y-2 mb-6 text-xs font-body border-t border-b border-gold/15 py-3.5">
                <div className="flex items-center gap-2 text-white/80">
                  <FiLayers className="text-gold shrink-0" />
                  <span className="text-white/50">Material:</span>
                  <span className="font-medium text-white">{product.material}</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <FiMaximize2 className="text-gold shrink-0" />
                  <span className="text-white/50">Available Sizes:</span>
                  <span className="font-medium text-white">{product.sizes?.join(', ')}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 btn-gold font-bold text-xs tracking-wide uppercase py-3.5 px-6 rounded-full flex items-center justify-center gap-2 shadow-gold"
                >
                  <FaWhatsapp className="text-base" /> Inquire on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
