import { useState } from 'react';
import { motion } from 'framer-motion';
import { beforeAfter } from '../data/gallery';
import { fadeUp, staggerContainer } from '../utils/motionVariants';

function BeforeAfterCard({ item }) {
  const [slider, setSlider] = useState(50);

  return (
    <div className="card-lift rounded-xl2 overflow-hidden shadow-lift bg-white/[0.03] border border-gold/15 hover:border-gold/40 transition-colors">
      <div className="relative h-64 select-none">
        <img src={item.after} alt={`${item.label} — after`} className="absolute inset-0 w-full h-full object-cover" />
        <img
          src={item.before}
          alt={`${item.label} — before`}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ clipPath: `inset(0 ${100 - slider}% 0 0)` }}
        />
        <div className="absolute top-0 bottom-0 w-0.5 bg-gold shadow pointer-events-none" style={{ left: `${slider}%` }} />
        <input
          type="range"
          min="0"
          max="100"
          value={slider}
          onChange={(e) => setSlider(Number(e.target.value))}
          className="absolute inset-x-0 bottom-3 mx-auto w-11/12 accent-[#C89B3C]"
          aria-label="Compare before and after"
        />
        <span className="absolute top-3 left-3 bg-ink/80 text-[10px] font-button font-semibold tracking-wide px-2.5 py-1 rounded-full text-white border border-gold/30">BEFORE</span>
        <span className="absolute top-3 right-3 bg-gold text-[10px] font-button font-semibold tracking-wide px-2.5 py-1 rounded-full text-ink">AFTER</span>
      </div>
      <div className="p-5">
        <h3 className="font-heading font-semibold text-white">{item.label}</h3>
      </div>
    </div>
  );
}

export default function BeforeAfterGallery() {
  return (
    <section className="py-24 px-4 max-w-7xl mx-auto bg-ink">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        className="text-center mb-14"
      >
        <p className="font-body text-gold tracking-[0.25em] uppercase text-xs mb-3">See The Difference</p>
        <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white">Before &amp; After</h2>
        <div className="w-16 h-[2px] bg-gold mx-auto mt-4" />
        <p className="text-white/50 mt-4 max-w-xl mx-auto font-body text-sm">
          Drag the slider to see how a simple photo transforms into a finished framed piece.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={staggerContainer}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {beforeAfter.map((item, i) => (
          <motion.div key={item.id} variants={fadeUp} custom={i}>
            <BeforeAfterCard item={item} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
