import { motion } from 'framer-motion';
import { FiAward, FiSliders, FiShield, FiSmile, FiPackage, FiLayers } from 'react-icons/fi';
import { fadeUp, staggerContainer } from '../utils/motionVariants';

const features = [
  {
    icon: FiAward,
    title: '30+ Years in Palani',
    desc: 'Generations of trusted framing expertise serving families and temples across Tamil Nadu.',
  },
  {
    icon: FiLayers,
    title: 'Solid Teak & Hardwoods',
    desc: 'We select authentic natural timber, premium metal trims, and warp-resistant stretcher bars.',
  },
  {
    icon: FiSliders,
    title: 'Bespoke Customization',
    desc: 'From custom matting to millimeter precision sizes, we craft each frame to your memory.',
  },
  {
    icon: FiPackage,
    title: 'Shockproof Packaging',
    desc: 'Multi-layer bubble protection with reinforced corners to guarantee safe doorstep delivery.',
  },
  {
    icon: FiShield,
    title: 'Transit Guarantee',
    desc: 'In the rare event of transit damage, we provide an immediate brand-new replacement.',
  },
  {
    icon: FiSmile,
    title: 'WhatsApp Proofing',
    desc: 'Direct digital preview approval with our master framing team before any cut is made.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 px-4 max-w-7xl mx-auto bg-ink">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        className="text-center mb-14"
      >
        <p className="font-body text-gold tracking-[0.25em] uppercase text-xs mb-3">Our Quality Promise</p>
        <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white">Why Choose MS Frames?</h2>
        <div className="w-16 h-[2px] bg-gold mx-auto mt-4" />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={staggerContainer}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            variants={fadeUp}
            custom={i}
            className="rounded-xl2 p-7 text-center border border-gold/15 bg-white/[0.03] hover:border-gold/40 transition-colors shadow-card flex flex-col items-center"
          >
            <div className="w-14 h-14 rounded-full border border-gold/40 flex items-center justify-center text-gold text-2xl mb-5 shadow-gold/20">
              <f.icon />
            </div>
            <h3 className="font-heading font-semibold text-lg text-white mb-2">{f.title}</h3>
            <p className="text-xs font-body text-white/60 leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      <p className="text-center font-body text-xs tracking-widest uppercase text-white/40 mt-14">
        Handmade with Devotion in Palani, Tamil Nadu ♥
      </p>
    </section>
  );
}
