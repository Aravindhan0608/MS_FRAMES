{/*import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FiUpload, FiMaximize2, FiImage, FiEdit3, FiCheckCircle, FiTruck } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { fadeUp, staggerContainer } from '../utils/motionVariants';

const frameTypes = [
  { label: 'Classic Wood', base: 24.99 },
  { label: 'Modern Metal', base: 29.99 },
  { label: 'Canvas Wrap', base: 39.99 },
  { label: 'Mirror Frame', base: 49.99 },
];

const frameSizes = [
  { label: '5x7 in', add: 0 },
  { label: '8x10 in', add: 8 },
  { label: '12x16 in', add: 18 },
  { label: '18x24 in', add: 35 },
  { label: '24x36 in', add: 55 },
];

const frameColors = ['Walnut', 'Black', 'White', 'Gold', 'Silver'];

const steps = [
  { icon: FiUpload, label: 'Upload Photo' },
  { icon: FiMaximize2, label: 'Select Size' },
  { icon: FiImage, label: 'Choose Frame' },
  { icon: FiEdit3, label: 'Add Details' },
  { icon: FiCheckCircle, label: 'Confirm Order' },
  { icon: FiTruck, label: 'We Deliver' },
];

export default function CustomFrameBuilder() {
  const [fileName, setFileName] = useState('');
  const [frameType, setFrameType] = useState(frameTypes[0].label);
  const [size, setSize] = useState(frameSizes[0].label);
  const [color, setColor] = useState(frameColors[0]);
  const [message, setMessage] = useState('');
  const [giftWrap, setGiftWrap] = useState(false);

  const price = useMemo(() => {
    const base = frameTypes.find((f) => f.label === frameType)?.base || 0;
    const addOn = frameSizes.find((s) => s.label === size)?.add || 0;
    const wrap = giftWrap ? 6 : 0;
    return (base + addOn + wrap).toFixed(2);
  }, [frameType, size, giftWrap]);

  const whatsappMessage = encodeURIComponent(
    `Hi MS Frames! I'd like a quote for:\nFrame: ${frameType}\nSize: ${size}\nColor: ${color}\nMessage: ${message || '—'}\nGift Wrap: ${giftWrap ? 'Yes' : 'No'}\nEstimated Price: $${price}`
  );

  return (
    <section className="py-24 px-4 bg-ink">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="text-center mb-6"
        >
          <p className="font-body text-gold tracking-[0.25em] uppercase text-xs mb-3">Made For You</p>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white">Custom Order</h2>
          <p className="text-white/50 mt-3 max-w-lg mx-auto font-body text-sm">
            Create your own unique frame in simple steps
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="flex flex-wrap justify-center gap-6 md:gap-10 mb-14"
        >
          {steps.map((s, i) => (
            <motion.div key={s.label} variants={fadeUp} custom={i} className="flex flex-col items-center gap-2 text-center w-20">
              <div className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center text-gold text-lg">
                <s.icon />
              </div>
              <span className="font-button text-[10px] tracking-wide uppercase text-white/60">{s.label}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          custom={1}
          className="bg-white rounded-xl2 p-8 md:p-10 shadow-lift grid md:grid-cols-2 gap-8"
        >
          <div className="flex flex-col gap-5">
            <label className="block">
              <span className="text-xs font-button tracking-wide uppercase text-ink/50 mb-1.5 block">Upload Photo</span>
              <div className="border border-dashed border-gold/50 rounded-xl p-6 text-center cursor-pointer hover:border-gold transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  id="photo-upload"
                  className="hidden"
                  onChange={(e) => setFileName(e.target.files?.[0]?.name || '')}
                />
                <label htmlFor="photo-upload" className="cursor-pointer flex flex-col items-center gap-2 text-ink/80">
                  <FiUpload className="text-2xl text-gold" />
                  <span className="text-sm font-body">{fileName || 'Click to upload or drag and drop'}</span>
                </label>
              </div>
            </label>

            <Select label="Select Size" value={size} onChange={setSize} options={frameSizes.map((s) => s.label)} />
            <Select label="Choose Frame" value={frameType} onChange={setFrameType} options={frameTypes.map((f) => f.label)} />
            <Select label="Frame Color" value={color} onChange={setColor} options={frameColors} />

            <label className="block">
              <span className="text-xs font-button tracking-wide uppercase text-ink/50 mb-1.5 block">Add Special Instructions</span>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your instructions here..."
                className="w-full border border-ink/10 rounded-xl px-4 py-3 bg-offwhite text-ink placeholder:text-ink/30 focus:outline-none focus:border-gold resize-none font-body text-sm"
              />
            </label>

            <label className="flex items-center gap-3 text-sm font-body text-ink/80">
              <input type="checkbox" checked={giftWrap} onChange={(e) => setGiftWrap(e.target.checked)} className="w-4 h-4 accent-[#C89B3C]" />
              Add Gift Wrap (+$6.00)
            </label>
          </div>

          <div className="flex flex-col">
            <div className="bg-offwhite rounded-xl2 p-8 flex-1 flex flex-col items-center justify-center text-center border border-ink/5">
              <p className="text-xs font-button tracking-widest uppercase text-ink/40 mb-2">Price Estimate</p>
              <p className="font-heading font-bold text-5xl text-ink mb-2">${price}</p>
              <p className="text-xs font-body text-ink/50 mb-8 max-w-xs">
                Price may vary based on size, frame &amp; customizations.
              </p>
              <p className="text-[11px] font-body text-ink/40 mb-6 max-w-xs">
                Our team will share the final confirmation before you start production.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <button type="button" className="btn-ink font-semibold text-xs tracking-wide uppercase px-6 py-3.5 rounded-full flex-1 flex items-center justify-center gap-2">
                  Request Quote
                </button>
                <a
                  href={`https://wa.me/15552348899?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-gold font-semibold text-xs tracking-wide uppercase px-6 py-3.5 rounded-full flex-1 flex items-center justify-center gap-2"
                >
                  <FaWhatsapp /> Order via WhatsApp
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <label className="block">
      <span className="text-xs font-button tracking-wide uppercase text-ink/50 mb-1.5 block">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-ink/10 rounded-xl px-4 py-3 text-ink bg-offwhite focus:outline-none focus:border-gold font-body text-sm"
      >
        {options.map((o) => (
          <option key={o} value={o} className="text-ink">
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
*/}