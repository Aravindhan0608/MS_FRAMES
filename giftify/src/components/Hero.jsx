import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { fadeUp, slideRight } from '../utils/motionVariants';

export default function Hero() {
  return (
    <section className="relative bg-ink pt-32 pb-24 px-4 overflow-hidden">
      {/* subtle radial glow */}
      <div className="absolute top-0 left-1/4 w-[36rem] h-[36rem] bg-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
          <p className="font-body text-goldLight tracking-[0.3em] uppercase text-xs mb-5">Welcome to</p>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight mb-5 text-white">
            MS <span className="text-gold-gradient">FRAMES</span>
          </h1>
          <p className="font-heading text-goldLight text-lg sm:text-xl tracking-wide mb-6">
            Premium Photo Frames &amp; Customized Gifts
          </p>
          <p className="font-body italic text-white/60 mb-10 max-w-md leading-relaxed">
            "Every picture tells a story — let us frame yours with elegance and perfection."
          </p>
          <div className="flex flex-wrap gap-4">
            <motion.a
              href="/shop"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="btn-gold font-semibold text-sm tracking-wide uppercase px-8 py-3.5 rounded-full flex items-center gap-2"
            >
              Explore Now <FiArrowRight />
            </motion.a>
    <motion.a
  href={`https://wa.me/916369107200?text=${encodeURIComponent(`🎉 Thank you for your order with MS FRAMES!

Your order has been received successfully. ✅

Our team will review it and contact you if any confirmation is needed. We'll begin processing your order as soon as possible.

Thank you for trusting MS FRAMES to frame your precious memories. ❤️`)}`}
  target="_blank"
  rel="noopener noreferrer"
  whileHover={{ scale: 1.04 }}
  whileTap={{ scale: 0.97 }}
  className="btn-ink font-semibold text-sm tracking-wide uppercase px-8 py-3.5 rounded-full flex items-center gap-2"
>
  <FaWhatsapp />
  Order via WhatsApp
</motion.a>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={slideRight}
          className="relative flex justify-center md:justify-end"
        >
          <div className="glass-panel absolute -inset-4 rounded-xl2 hidden sm:block" />
          <div className="relative w-full max-w-md rounded-xl2 overflow-hidden shadow-lift ring-1 ring-gold/20">
            <img
              src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=900&q=80"
              alt="Premium framed family photograph"
              className="w-full h-[420px] sm:h-[480px] object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
