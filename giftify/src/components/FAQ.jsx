import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';
import { faqs } from '../data/testimonials';
import { fadeUp } from '../utils/motionVariants';

export default function FAQ() {
  const [openId, setOpenId] = useState(faqs[0].id);

  return (
    <section className="py-24 px-4 bg-ink relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-3xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="text-center mb-14"
        >
          <p className="font-body text-gold tracking-[0.25em] uppercase text-xs mb-3">Got Questions?</p>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white">
            Frequently Asked Questions
          </h2>
          <div className="w-16 h-[2px] bg-gold mx-auto mt-4" />
        </motion.div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, i) => {
            const isOpen = openId === faq.id;
            return (
              <motion.div
                key={faq.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -3 }}
                className={`card-lift rounded-xl2 overflow-hidden border shadow-card transition-colors duration-300 ${
                  isOpen ? 'border-gold/50 bg-white/[0.05] shadow-lift' : 'border-gold/15 bg-white/[0.02] hover:border-gold/35'
                }`}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full flex items-center justify-between gap-4 px-7 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-body text-sm sm:text-[15px] text-white/90 flex items-start gap-3">
                    <span className="font-heading text-gold font-semibold shrink-0">{String(i + 1).padStart(2, '0')}</span>
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-colors ${
                      isOpen ? 'bg-gold text-ink border-gold' : 'text-gold border-gold/40'
                    }`}
                  >
                    <FiPlus />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="h-px bg-gold/10 mx-7" />
                      <p className="px-7 pt-4 pb-6 pl-[3.25rem] text-sm font-body text-white/55 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
