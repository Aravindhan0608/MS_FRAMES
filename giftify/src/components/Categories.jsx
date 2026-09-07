import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { categories } from '../data/categories';
import { formatPrice } from '../utils/helpers';
import { fadeUp, staggerContainer } from '../utils/motionVariants';

export default function Categories() {
  return (
    <section id="categories" className="relative py-24 px-4 max-w-7xl mx-auto bg-ink">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        className="text-center mb-14"
      >
        <p className="font-body text-gold tracking-[0.25em] uppercase text-xs mb-3">Explore Categories</p>
        <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white">Shop by Category</h2>
        <div className="w-16 h-[2px] bg-gold mx-auto mt-4" />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={staggerContainer}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6"
      >
        {categories.map((cat, i) => (
          <motion.div key={cat.id} variants={fadeUp} custom={i}>
            <Link
              to={`/shop?category=${encodeURIComponent(cat.name)}`}
              className="group block rounded-xl2 overflow-hidden bg-white/[0.03] border border-gold/15 hover:border-gold/50 shadow-card hover:shadow-lift transition-all duration-300 h-full flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-black/40">
                <img
                  src={cat.image}
                  alt={cat.alt || cat.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                />
              </div>
              <div className="p-4 text-center flex flex-col flex-1">
                <h3 className="font-heading font-semibold text-sm sm:text-base text-white mb-1 group-hover:text-goldLight transition-colors">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-white/50 mb-2 line-clamp-2">{cat.description}</p>
                <p className="mt-auto text-[11px] font-semibold text-gold">From {formatPrice(cat.startingPrice)}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
