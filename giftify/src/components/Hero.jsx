import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import heroImg from '../assets/img-wa0034.webp';
import { getWhatsAppInquiryUrl } from '../utils/constants';
import { fadeUp, slideRight } from '../utils/motionVariants';

export default function Hero() {
  const whatsappUrl = getWhatsAppInquiryUrl();

  return (
    <section className="relative bg-ink pt-32 pb-20 sm:pb-28 px-4 overflow-hidden">
      {/* Subtle radial ambient glows */}
      <div className="absolute top-0 left-1/4 w-[36rem] h-[36rem] bg-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto grid md:grid-cols-12 gap-12 lg:gap-14 items-center">
        {/* Left Text Content (7 cols) */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0} className="md:col-span-7">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/30 mb-6">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="font-button text-[11px] uppercase tracking-widest text-gold font-semibold">
              30+ Years of Craftsmanship in Palani
            </span>
          </div>

          <h1 className="font-heading font-bold text-3xl sm:text-5xl lg:text-6xl leading-[1.15] mb-5 text-white">
            Premium Photo Frames &amp; <span className="text-gold-gradient">Customized Gifts</span>
          </h1>

          <p className="font-body text-white/70 text-base sm:text-lg mb-8 max-w-xl leading-relaxed">
            Preserve your life’s finest moments with handcrafted solid teak frames, bespoke framed mirrors, gallery canvas
            prints, and sacred pooja room altar setups.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/shop"
              className="btn-gold font-bold text-xs tracking-wider uppercase px-7 py-4 rounded-full flex items-center gap-2 shadow-gold"
            >
              Explore Collections <FiArrowRight className="text-sm" />
            </Link>

            <Link
              to="/customize"
              className="btn-ink font-semibold text-xs tracking-wider uppercase px-7 py-4 rounded-full flex items-center gap-2"
            >
              Customize Your Frame
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gold hover:text-goldLight text-xs font-semibold tracking-wide uppercase px-3 py-2 transition-colors"
            >
              <FaWhatsapp className="text-base text-[#25D366]" /> Chat on WhatsApp
            </a>
          </div>
        </motion.div>

        {/* Right Hero Image Card (5 cols) */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={slideRight}
          className="md:col-span-5 relative flex justify-center"
        >
          <div className="glass-panel absolute -inset-3 rounded-xl2 hidden sm:block pointer-events-none" />
          <div className="relative w-full max-w-md rounded-xl2 overflow-hidden shadow-2xl ring-1 ring-gold/30 bg-black/40 aspect-[4/5] sm:aspect-[3/4]">
            <img
              src={heroImg}
              alt="Bespoke handcrafted family collage photo frame by MS Frames Palani"
              fetchpriority="high"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent flex items-end p-6">
              <div>
                <p className="font-heading font-semibold text-white text-base">Handcrafted in Solid Teak</p>
                <p className="font-body text-xs text-gold">Custom sizes, crystal glass &amp; lifetime finish</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
