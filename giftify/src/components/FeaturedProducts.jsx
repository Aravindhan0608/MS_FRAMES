import { motion } from 'framer-motion';
import { products } from '../data/products';
import ProductCard from './ProductCard';
import { fadeUp, staggerContainer } from '../utils/motionVariants';

export default function FeaturedProducts() {
  return (
    <section className="py-24 px-4 max-w-7xl mx-auto bg-ink">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        className="text-center mb-14"
      >
        <p className="font-body text-gold tracking-[0.25em] uppercase text-xs mb-3">Handpicked</p>
        <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white">
          Featured Collection
        </h2>
        <div className="w-16 h-[2px] bg-gold mx-auto mt-4" />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {products.slice(0, 8).map((p, i) => (
          <motion.div key={p.id} variants={fadeUp} custom={i}>
            <ProductCard product={p} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
