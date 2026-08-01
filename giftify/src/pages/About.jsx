import { motion } from 'framer-motion';
import { fadeUp } from '../utils/motionVariants';
import AnimatedStats from '../components/AnimatedStats';
import WhyChooseUs from '../components/WhyChooseUs';
import ProcessTimeline from '../components/ProcessTimeline';

export default function About() {
  return (
    <div className="pt-28 pb-10 min-h-screen bg-ink">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-10 max-w-2xl mx-auto px-4 pt-8">
        <p className="font-body text-gold tracking-[0.25em] uppercase text-xs mb-3">Our Story</p>
        <h1 className="font-heading font-bold text-4xl sm:text-5xl text-white mb-2">
          About Us
        </h1>
        <div className="w-16 h-[2px] bg-gold mx-auto my-5" />
        <p className="text-white/60 font-body leading-relaxed">
          At MS Frames, we believe every picture carries a memory, a feeling, and a story worth cherishing
          forever. We specialize in premium-quality photo frames, mirror frames, canvas frames, customized
          gifts, and professional photo printing. Every product is crafted with care, precision, and passion.
          Our goal is simple — to preserve your precious moments in the most beautiful way possible.
        </p>
      </motion.div>

      <AnimatedStats />
      <WhyChooseUs />
      <ProcessTimeline />
    </div>
  );
}
