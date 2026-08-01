import { motion } from 'framer-motion';
import { FiAward, FiSliders, FiTruck, FiTag, FiShield, FiSmile } from 'react-icons/fi';
import { fadeUp, staggerContainer } from '../utils/motionVariants';

const features = [
  { icon: FiAward, title: 'Premium Quality', desc: 'Best materials and finest craftsmanship.' },
  { icon: FiSliders, title: 'Custom Designs', desc: 'Made exactly the way you imagine.' },
  { icon: FiTruck, title: 'Fast Delivery', desc: 'On time, every time you can trust.' },
  { icon: FiTag, title: 'Affordable Prices', desc: 'Best quality at reasonable prices.' },
  { icon: FiShield, title: 'Trusted by Customers', desc: '100% customer satisfaction guaranteed.' },
  { icon: FiSmile, title: 'Professional Service', desc: 'Friendly support at every step.' },
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
        <p className="font-body text-gold tracking-[0.25em] uppercase text-xs mb-3">Our Promise</p>
        <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white">Why Choose MS Frames?</h2>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={staggerContainer}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            variants={fadeUp}
            custom={i}
            whileHover={{ y: -6 }}
            className="rounded-xl2 p-7 text-center border border-gold/15 bg-white/[0.03] hover:border-gold/40 transition-colors"
          >
            <div className="w-14 h-14 mx-auto rounded-full border border-gold/40 flex items-center justify-center text-gold text-2xl mb-5">
              <f.icon />
            </div>
            <h3 className="font-heading font-semibold text-lg text-white mb-2">{f.title}</h3>
            <p className="text-sm font-body text-white/50">{f.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      <p className="text-center font-body text-xs tracking-widest uppercase text-white/30 mt-14">
        We Frame Memories, You Cherish Forever ♥
      </p>
    </section>
  );
}
