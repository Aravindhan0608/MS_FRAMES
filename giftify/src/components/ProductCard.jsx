import { FiEye } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { getWhatsAppInquiryUrl } from '../utils/constants';

export default function ProductCard({ product, onQuickView }) {
  const whatsappUrl = getWhatsAppInquiryUrl({
    type: 'product',
    name: product.name,
    category: product.category,
    price: product.startingPrice,
  });

  return (
    <div className="group rounded-xl2 overflow-hidden bg-white/[0.03] border border-gold/15 hover:border-gold/50 shadow-card hover:shadow-lift transition-all duration-300 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-black/40">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 bg-gold text-ink font-button font-bold text-[9px] tracking-wider uppercase px-2.5 py-0.5 rounded-full shadow">
            {product.badge}
          </span>
        )}

        {/* Quick View Button overlay on hover */}
        {onQuickView && (
          <button
            type="button"
            onClick={() => onQuickView(product)}
            className="absolute inset-x-4 bottom-3 bg-ink/90 border border-gold text-gold font-button font-semibold text-[11px] uppercase tracking-wider py-2 rounded-xl flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lift hover:bg-gold hover:text-ink focus-visible:opacity-100"
          >
            <FiEye className="text-xs" /> Quick View
          </button>
        )}
      </div>

      {/* Content Container */}
      <div className="p-5 flex flex-col flex-1">
        <p className="font-button text-[10px] text-gold uppercase tracking-widest font-semibold mb-1">
          {product.category}
        </p>
        <h3 className="font-heading font-semibold text-white text-base mb-2 group-hover:text-goldLight transition-colors">
          {product.name}
        </h3>

        <div className="mt-auto pt-3 border-t border-gold/10 flex items-center justify-end">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Inquire about ${product.name} on WhatsApp`}
            className="p-2.5 rounded-full bg-gold/15 text-gold border border-gold/40 hover:bg-gold hover:text-ink transition-colors shrink-0"
          >
            <FaWhatsapp className="text-base" />
          </a>
        </div>
      </div>
    </div>
  );
}
