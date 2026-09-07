import { motion } from 'framer-motion';
import { FiStar, FiMapPin, FiCheckCircle } from 'react-icons/fi';
import { allReviews } from '../data/testimonials';
import { fadeUp, staggerContainer } from '../utils/motionVariants';

export default function Reviews() {
  return (
    <div className="pt-28 pb-24 px-4 max-w-7xl mx-auto min-h-screen bg-ink">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-16 pt-8">
        <p className="font-body text-gold tracking-[0.25em] uppercase text-xs mb-3">Customer Testimonials</p>
        <h1 className="font-heading font-bold text-4xl sm:text-5xl text-white">All Customer Reviews</h1>
        <div className="w-16 h-[2px] bg-gold mx-auto mt-4" />
        <p className="font-body text-white/60 text-sm mt-4 max-w-lg mx-auto">
          Read genuine reviews from families, photographers, and businesses who trusted MS Frames with their memories.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {allReviews.map((t, i) => (
          <motion.div
            key={t.id}
            variants={fadeUp}
            custom={i}
            className="h-full rounded-xl2 p-7 border border-gold/15 bg-white/[0.03] hover:border-gold/40 shadow-card hover:shadow-lift transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex text-gold text-sm">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <FiStar key={idx} className="fill-current text-gold" />
                  ))}
                </div>
                {t.location && (
                  <span className="text-[11px] font-body text-white/50 flex items-center gap-1">
                    <FiMapPin className="text-gold" /> {t.location}
                  </span>
                )}
              </div>
              <p className="text-sm font-body text-white/70 leading-relaxed mb-6 italic">"{t.review}"</p>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-gold/10">
              <img
                src={t.photo}
                alt={t.name}
                loading="lazy"
                className="w-11 h-11 rounded-full object-cover ring-2 ring-gold/30"
              />
              <div>
                <h3 className="font-heading font-semibold text-white text-sm">{t.name}</h3>
                <span className="text-[10px] text-gold font-body flex items-center gap-1 uppercase tracking-wider">
                  <FiCheckCircle className="text-xs" /> Verified Customer
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
