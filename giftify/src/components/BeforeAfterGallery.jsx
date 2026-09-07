import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { beforeAfter } from '../data/gallery';
import { fadeUp, staggerContainer } from '../utils/motionVariants';

function InteractiveComparisonCard({ item }) {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setSliderPos(percent);
  }, []);

  const handleTouchMove = (e) => {
    if (e.touches?.[0]) handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (isDragging) handleMove(e.clientX);
  };

  return (
    <div className="rounded-xl2 overflow-hidden bg-white/[0.03] border border-gold/20 shadow-card hover:shadow-lift transition-all duration-300 flex flex-col h-full">
      {/* Comparison Canvas */}
      <div
        ref={containerRef}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative h-64 sm:h-72 select-none overflow-hidden cursor-ew-resize bg-black/60"
        aria-label={`Before and after comparison for ${item.label}`}
      >
        {/* "After" Image (Underneath) */}
        <img
          src={item.after}
          alt={`${item.label} — Finished Framing`}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* "Before" Image (Clipped on top) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
        >
          <img
            src={item.before}
            alt={`${item.label} — Raw Photo`}
            className="absolute inset-0 w-full h-full object-cover filter contrast-[0.9] brightness-[0.9]"
          />
        </div>

        {/* Draggable Divider Line & Handle */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-gold shadow-[0_0_10px_rgba(200,155,60,0.8)] pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gold text-ink font-bold text-xs flex items-center justify-center shadow-lift ring-2 ring-ink">
            ⇄
          </div>
        </div>

        {/* Badges */}
        <span className="absolute top-3 left-3 bg-ink/85 text-[10px] font-button font-bold tracking-wider px-2.5 py-1 rounded-full text-white/90 border border-white/20">
          RAW PHOTO
        </span>
        <span className="absolute top-3 right-3 bg-gold text-[10px] font-button font-bold tracking-wider px-2.5 py-1 rounded-full text-ink shadow">
          FRAMED PIECE
        </span>
      </div>

      {/* Details */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-heading font-semibold text-white text-base mb-1.5">{item.label}</h3>
        <p className="text-xs font-body text-white/60 leading-relaxed">{item.desc}</p>
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
        <p className="font-body text-gold tracking-[0.25em] uppercase text-xs mb-3">Transformation Proof</p>
        <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white">Before &amp; After Studio Results</h2>
        <div className="w-16 h-[2px] bg-gold mx-auto mt-4" />
        <p className="text-white/60 mt-4 max-w-xl mx-auto font-body text-sm">
          Drag the center slider across the image to compare raw client photos with our master-framed finished products.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={staggerContainer}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {beforeAfter.map((item, i) => (
          <motion.div key={item.id} variants={fadeUp} custom={i}>
            <InteractiveComparisonCard item={item} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
