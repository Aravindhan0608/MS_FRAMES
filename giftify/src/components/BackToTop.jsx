import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll back to top"
          className="fixed bottom-20 left-4 sm:left-6 lg:bottom-6 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-ink/95 border border-gold/40 text-gold flex items-center justify-center shadow-lift hover:bg-gold hover:text-ink transition-colors focus-visible:ring-2 focus-visible:ring-gold"
        >
          <FiArrowUp className="text-lg" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
