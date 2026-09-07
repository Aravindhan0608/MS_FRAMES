import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import { categories } from '../data/categories';
import ProductCard from '../components/ProductCard';
import ProductQuickView from '../components/ProductQuickView';
import { fadeUp, staggerContainer } from '../utils/motionVariants';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [active, setActive] = useState('All');
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Sync active filter from URL search param
  useEffect(() => {
    if (categoryParam) {
      const match = categories.find(
        (c) => c.name.toLowerCase() === categoryParam.toLowerCase() || c.slug === categoryParam.toLowerCase()
      );
      if (match) {
        setActive(match.name);
      } else {
        setActive('All');
      }
    } else {
      setActive('All');
    }
  }, [categoryParam]);

  const handleSelectCategory = (catName) => {
    setActive(catName);
    if (catName === 'All') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: catName });
    }
  };

  const filtered = useMemo(
    () => (active === 'All' ? products : products.filter((p) => p.category.toLowerCase() === active.toLowerCase())),
    [active]
  );

  return (
    <div className="pt-28 pb-24 px-4 max-w-7xl mx-auto min-h-screen bg-ink">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-12 pt-8">
        <p className="font-body text-gold tracking-[0.25em] uppercase text-xs mb-3">Our Complete Collection</p>
        <h1 className="font-heading font-bold text-4xl sm:text-5xl text-white">Framed Products &amp; Gifts</h1>
        <div className="w-16 h-[2px] bg-gold mx-auto mt-4" />
        <p className="text-white/60 font-body text-sm mt-4 max-w-xl mx-auto">
          Explore our handcrafted range of photo frames, framed mirrors, fine art canvases, and custom pooja room setups.
        </p>
      </motion.div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 mb-12">
        {['All', ...categories.map((c) => c.name)].map((c) => (
          <button
            key={c}
            onClick={() => handleSelectCategory(c)}
            className={`px-5 py-2 rounded-full text-xs font-button tracking-wide uppercase transition-all ${
              active === c ? 'btn-gold shadow-gold' : 'btn-outline-gold hover:border-gold hover:text-gold'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {filtered.length > 0 ? (
        <motion.div
          key={active}
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {filtered.map((p, i) => (
            <motion.div key={p.id} variants={fadeUp} custom={i} className="h-full">
              <ProductCard product={p} onQuickView={setQuickViewProduct} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-16 text-white/50 font-body">
          <p className="text-base mb-4">No products found in this category.</p>
          <button onClick={() => handleSelectCategory('All')} className="btn-gold text-xs px-6 py-2.5 rounded-full">
            View All Products
          </button>
        </div>
      )}

      {/* Quick View Modal */}
      <ProductQuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  );
}
