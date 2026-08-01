import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { stats } from '../data/gallery';
import { fadeUp, staggerContainer } from '../utils/motionVariants';

function Counter({ value, decimals = 0, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1400;
    const startTime = performance.now();

    function tick(now) {
      const progress = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = value * eased;
      setDisplay(start);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export default function AnimatedStats() {
  return (
    <section className="bg-ink py-14 px-4 border-t border-b border-gold/10">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 text-center"
      >
        {stats.map((s, i) => (
          <motion.div key={s.id} variants={fadeUp} custom={i}>
            <p className="font-heading font-bold text-3xl sm:text-4xl text-gold">
              <Counter value={s.value} decimals={s.decimals || 0} suffix={s.suffix} />
            </p>
            <p className="font-body text-xs sm:text-sm tracking-wide uppercase text-white/50 mt-2">{s.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
