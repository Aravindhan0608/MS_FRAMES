import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { categories } from '../data/categories';
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
        <p className="font-body text-gold tracking-[0.25em] uppercase text-xs mb-3">Browse</p>
        <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white">
          Shop by Category
        </h2>
        <div className="w-16 h-[2px] bg-gold mx-auto mt-4" />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={staggerContainer}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5"
      >
        {categories.map((cat, i) => (
          <motion.div key={cat.id} variants={fadeUp} custom={i}>
            <NavLink
              to="/shop"
              className="card-lift group block rounded-xl2 overflow-hidden shadow-lift bg-white/[0.03] border border-gold/15 hover:border-gold/40 transition-colors"
            >
              <div className="img-zoom h-28 sm:h-32">
                <img src={cat.image} alt={cat.name} loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-heading font-semibold text-sm text-white mb-1">{cat.name}</h3>
                <span className="font-button text-[10px] tracking-widest uppercase text-gold group-hover:underline">
                  View All
                </span>
              </div>
            </NavLink>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
