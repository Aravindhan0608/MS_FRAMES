import { motion } from 'framer-motion';

export default function ProductCard({ product }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="card-lift rounded-xl2 overflow-hidden shadow-lift bg-white/[0.03] border border-gold/15 hover:border-gold/40 transition-colors"
    >
      <div className="img-zoom h-56">
        <img src={product.image} alt={product.name} loading="lazy" className="w-full h-full object-cover" />
      </div>
      <div className="p-5 text-center">
        <p className="font-button text-[10px] text-gold uppercase tracking-widest mb-1.5">{product.category}</p>
        <h3 className="font-heading font-semibold text-white">{product.name}</h3>
      </div>
    </motion.div>
  );
}
