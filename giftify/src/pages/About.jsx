import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiAward, FiCheckCircle, FiHeart, FiArrowRight } from 'react-icons/fi';
import aboutImg from '../assets/img-wa0034.webp';
import AnimatedStats from '../components/AnimatedStats';
import WhyChooseUs from '../components/WhyChooseUs';
import ProcessTimeline from '../components/ProcessTimeline';
import { fadeUp, slideLeft, slideRight } from '../utils/motionVariants';

export default function About() {
  return (
    <div className="pt-28 pb-10 min-h-screen bg-ink">
      {/* Hero Header */}
      <section className="px-4 max-w-7xl mx-auto pt-8 mb-16">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center max-w-3xl mx-auto mb-14">
          <p className="font-body text-gold tracking-[0.25em] uppercase text-xs mb-3">Our Legacy &amp; Craft</p>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl text-white mb-4">
            Preserving Memories in Palani Since 1995
          </h1>
          <div className="w-16 h-[2px] bg-gold mx-auto mb-5" />
          <p className="text-white/70 font-body text-sm sm:text-base leading-relaxed">
            At MS Frames, we believe every photograph carries a feeling, a moment of love, and a family story worth
            protecting forever.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-10 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={slideRight}
            className="md:col-span-6 relative"
          >
            <div className="relative rounded-xl2 overflow-hidden shadow-2xl ring-1 ring-gold/25 aspect-[4/3] bg-black/40">
              <img
                src={aboutImg}
                alt="MS Frames Palani workshop craftsmanship"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={slideLeft}
            className="md:col-span-6 space-y-4 text-white/75 font-body text-sm leading-relaxed"
          >
            <h2 className="font-heading font-semibold text-2xl text-white">Three Decades of Master Framing</h2>
            <p>
              Located in the spiritual heartland of <strong>Palani, Tamil Nadu</strong>, MS Frames began as a modest
              custom framing workshop dedicated to quality woodwork and crystal clear glass mounting.
            </p>
            <p>
              Over the last 30 years, we have handcrafted over <strong>50,000 photo frames</strong>, sacred temple pooja
              room altars, mirror designs, and archival canvas prints for families, temples, and businesses across India.
            </p>
            <div className="pt-3 grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-white">
                <FiCheckCircle className="text-gold shrink-0" /> Solid Timber &amp; Teak
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-white">
                <FiCheckCircle className="text-gold shrink-0" /> Anti-Glare Crystal Glass
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-white">
                <FiCheckCircle className="text-gold shrink-0" /> Archival 380 GSM Canvas
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-white">
                <FiCheckCircle className="text-gold shrink-0" /> Doorstep Safe Delivery
              </div>
            </div>
            <div className="pt-4">
              <Link
                to="/customize"
                className="btn-gold inline-flex items-center gap-2 font-bold text-xs tracking-wider uppercase px-6 py-3 rounded-full shadow-gold"
              >
                Start a Custom Order <FiArrowRight />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <AnimatedStats />
      <ProcessTimeline />
      <WhyChooseUs />
    </div>
  );
}
