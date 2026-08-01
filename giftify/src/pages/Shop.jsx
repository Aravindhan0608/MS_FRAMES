import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import { categories } from '../data/categories';
import ProductCard from '../components/ProductCard';
import { fadeUp, staggerContainer } from '../utils/motionVariants';

export default function Shop() {
  const [active, setActive] = useState('All');

  const filtered = useMemo(
    () => (active === 'All' ? products : products.filter((p) => p.category === active)),
    [active]
  );

  return (
    <div className="pt-28 pb-24 px-4 max-w-7xl mx-auto min-h-screen bg-ink">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-12 pt-8">
        <p className="font-body text-gold tracking-[0.25em] uppercase text-xs mb-3">Our Collection</p>
        <h1 className="font-heading font-bold text-4xl sm:text-5xl text-white">
          Products
        </h1>
        <div className="w-16 h-[2px] bg-gold mx-auto mt-4" />
        <p className="text-white/50 font-body text-sm mt-4">Browse our full collection of premium frames and gifts.</p>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {['All', ...categories.map((c) => c.name)].map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`px-5 py-2 rounded-full text-xs font-button tracking-wide uppercase transition-all ${
              active === c ? 'btn-gold' : 'btn-outline-gold'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <motion.div
        key={active}
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {filtered.map((p, i) => (
          <motion.div key={p.id} variants={fadeUp} custom={i}>
            <ProductCard product={p} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
