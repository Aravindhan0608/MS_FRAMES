import { motion } from 'framer-motion';
import { FiShoppingBag, FiUploadCloud, FiSliders, FiPenTool, FiPrinter, FiTruck } from 'react-icons/fi';
import { processSteps } from '../data/gallery';
import { fadeUp, staggerContainer } from '../utils/motionVariants';

const icons = [FiShoppingBag, FiUploadCloud, FiSliders, FiPenTool, FiPrinter, FiTruck];

export default function ProcessTimeline() {
  return (
    <section className="py-24 px-4 max-w-7xl mx-auto bg-ink">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        className="text-center mb-16"
      >
        <p className="font-body text-gold tracking-[0.25em] uppercase text-xs mb-3">How It Works</p>
        <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white">Our Process</h2>
        <p className="font-body text-xs tracking-widest uppercase text-white/40 mt-3">
          Simple Steps, Perfect Frames
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={staggerContainer}
        className="relative grid sm:grid-cols-2 lg:grid-cols-6 gap-8"
      >
        <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-gold/20" />
        {processSteps.map((step, i) => {
          const Icon = icons[i];
          return (
            <motion.div key={step.id} variants={fadeUp} custom={i} className="relative flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-ink border-2 border-gold flex items-center justify-center text-gold text-2xl mb-4 z-10">
                <Icon />
              </div>
              <span className="font-heading font-semibold text-gold text-sm mb-1">{i + 1}</span>
              <h3 className="font-heading font-semibold text-white mb-1">{step.title}</h3>
              <p className="text-xs font-body text-white/50 max-w-[10rem]">{step.desc}</p>
            </motion.div>
          );
        })}
      </motion.div>

      <p className="text-center font-body text-xs tracking-widest uppercase text-white/30 mt-16">
        Quality • Precision • Perfection ♥
      </p>
    </section>
  );
}
