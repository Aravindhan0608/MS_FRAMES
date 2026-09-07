import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { products } from '../data/products';
import ProductCard from './ProductCard';
import ProductQuickView from './ProductQuickView';
import { fadeUp, staggerContainer } from '../utils/motionVariants';

export default function FeaturedProducts() {
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  return (
    <section className="py-24 px-4 max-w-7xl mx-auto bg-ink">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        className="text-center mb-14"
      >
        <p className="font-body text-gold tracking-[0.25em] uppercase text-xs mb-3">Handcrafted In Palani</p>
        <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white">Featured Collection</h2>
        <div className="w-16 h-[2px] bg-gold mx-auto mt-4" />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {products.slice(0, 8).map((p, i) => (
          <motion.div key={p.id} variants={fadeUp} custom={i} className="h-full">
            <ProductCard product={p} onQuickView={setQuickViewProduct} />
          </motion.div>
        ))}
      </motion.div>

      <div className="text-center mt-12">
        <Link
          to="/shop"
          className="btn-outline-gold inline-flex items-center gap-2 font-semibold text-xs tracking-wider uppercase px-8 py-3.5 rounded-full"
        >
          View All Products <FiArrowRight />
        </Link>
      </div>

      <ProductQuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </section>
  );
}
