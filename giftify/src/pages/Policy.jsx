import { motion } from 'framer-motion';
import { fadeUp } from '../utils/motionVariants';

export default function Policy({ title, effectiveDate, sections }) {
  return (
    <div className="pt-28 pb-24 px-4 max-w-4xl mx-auto min-h-screen bg-ink">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center pt-8 mb-12">
        <h1 className="font-heading font-bold text-3xl sm:text-4xl text-white mb-2">{title}</h1>
        {effectiveDate && <p className="font-body text-xs tracking-widest uppercase text-gold/70">Effective Date: {effectiveDate}</p>}
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-5">
        {sections.map((sec, i) => (
          <motion.div
            key={sec.heading}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            custom={i}
            className="rounded-xl2 p-6 border border-gold/15 bg-white/[0.03]"
          >
            <h2 className="font-heading font-semibold text-gold text-sm tracking-wide uppercase mb-2">{sec.heading}</h2>
            <p className="text-sm font-body text-white/55 leading-relaxed">{sec.body}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
