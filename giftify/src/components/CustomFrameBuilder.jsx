import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { getWhatsAppInquiryUrl } from '../utils/constants';
import { fadeUp } from '../utils/motionVariants';

const frameTypes = [
  { id: 'photo', name: 'Classic Photo Frame', basePrice: 499, desc: 'Natural solid wood & clear glass' },
  { id: 'mirror', name: 'Luxury Mirror Frame', basePrice: 1299, desc: 'Ornate gold or brass border' },
  { id: 'canvas', name: 'Archival Canvas Wrap', basePrice: 1499, desc: '380 GSM textured cotton wrap' },
  { id: 'pooja', name: 'Pooja Room Deity Frame', basePrice: 899, desc: 'Devotional gold-foiled frame' },
  { id: 'collage', name: 'Multi-Photo Collage', basePrice: 799, desc: 'Custom memory grid layout' },
];

const sizeOptions = [
  { id: '6x8', label: '6 × 8 in', sub: 'Desk / Tabletop', multiplier: 1.0 },
  { id: '8x12', label: '8 × 12 in (A4)', sub: 'Compact Wall', multiplier: 1.35 },
  { id: '12x18', label: '12 × 18 in', sub: 'Standard Wall', multiplier: 1.85 },
  { id: '16x24', label: '16 × 24 in', sub: 'Grand Wall', multiplier: 2.6 },
  { id: '20x30', label: '20 × 30 in', sub: 'Gallery Statement', multiplier: 3.4 },
  { id: '24x36', label: '24 × 36 in', sub: 'Panoramic Focal', multiplier: 4.2 },
];

const finishOptions = [
  { id: 'teak', name: 'Natural Solid Teak', color: '#8B5A2B', borderClass: 'border-[#8B5A2B]' },
  { id: 'gold', name: 'Royal Antique Gold', color: '#C89B3C', borderClass: 'border-[#C89B3C]' },
  { id: 'walnut', name: 'Rich Dark Walnut', color: '#4A2E18', borderClass: 'border-[#4A2E18]' },
  { id: 'black', name: 'Sleek Matte Black', color: '#1A1A1A', borderClass: 'border-[#1A1A1A]' },
  { id: 'brass', name: 'Brushed Brass Metal', color: '#D8B56A', borderClass: 'border-[#D8B56A]' },
];

const mattingOptions = [
  { id: 'none', name: 'No Matting (Full Bleed)', price: 0 },
  { id: 'white', name: 'Off-White Classic Mat', price: 150 },
  { id: 'gold_mat', name: 'Royal Gold Beaded Mat', price: 250 },
  { id: 'black_mat', name: 'Velvet Black Gallery Mat', price: 200 },
];

export default function CustomFrameBuilder() {
  const [selectedType, setSelectedType] = useState(frameTypes[0]);
  const [selectedSize, setSelectedSize] = useState(sizeOptions[2]); // 12x18 default
  const [selectedFinish, setSelectedFinish] = useState(finishOptions[0]);
  const [selectedMatting, setSelectedMatting] = useState(mattingOptions[0]);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');

  const estimatedUnitPrice = useMemo(() => {
    const base = selectedType.basePrice * selectedSize.multiplier;
    const mattingCost = selectedMatting.price;
    return Math.round((base + mattingCost) / 10) * 10;
  }, [selectedType, selectedSize, selectedMatting]);

  const totalPrice = useMemo(() => estimatedUnitPrice * quantity, [estimatedUnitPrice, quantity]);


  const whatsappUrl = getWhatsAppInquiryUrl({
    type: 'custom_order',
    frameType: selectedType.name,
    size: selectedSize.label,
    finish: selectedFinish.name,
    matting: selectedMatting.name,
    quantity,
    estimatedPrice: totalPrice,
    notes,
  });

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-14">
        <p className="font-body text-gold tracking-[0.25em] uppercase text-xs mb-3">Bespoke Framing Studio</p>
        <h2 className="font-heading font-bold text-3xl sm:text-5xl text-white mb-4">Custom Frame Builder</h2>
        <div className="w-16 h-[2px] bg-gold mx-auto mb-4" />
        <p className="font-body text-white/65 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Configure your bespoke frame in real-time, get an instant estimate in Indian Rupees, and connect directly with
          our Palani master framing artisans via WhatsApp.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-12 gap-10 items-start">
        {/* Left: Customization Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-10">
          {/* Step 1: Product Type */}
          <div className="p-6 sm:p-7 rounded-xl2 bg-white/[0.03] border border-gold/20 shadow-card">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-7 h-7 rounded-full bg-gold text-ink font-bold text-xs flex items-center justify-center">1</span>
              <h3 className="font-heading font-semibold text-lg text-white">Select Frame Style</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {frameTypes.map((type) => {
                const isSelected = selectedType.id === type.id;
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setSelectedType(type)}
                    className={`p-4 rounded-xl text-left transition-all border ${
                      isSelected
                        ? 'border-gold bg-gold/15 ring-1 ring-gold shadow-gold'
                        : 'border-white/10 bg-white/[0.02] hover:border-gold/40'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <p className="font-heading font-semibold text-sm text-white">{type.name}</p>
                      {isSelected && <FiCheck className="text-gold shrink-0 mt-0.5" />}
                    </div>
                    <p className="text-xs text-white/50 mb-2">{type.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Choose Size */}
          <div className="p-6 sm:p-7 rounded-xl2 bg-white/[0.03] border border-gold/20 shadow-card">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-7 h-7 rounded-full bg-gold text-ink font-bold text-xs flex items-center justify-center">2</span>
              <h3 className="font-heading font-semibold text-lg text-white">Select Dimensions</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {sizeOptions.map((sz) => {
                const isSelected = selectedSize.id === sz.id;
                return (
                  <button
                    key={sz.id}
                    type="button"
                    onClick={() => setSelectedSize(sz)}
                    className={`p-3.5 rounded-xl text-left transition-all border ${
                      isSelected
                        ? 'border-gold bg-gold/15 ring-1 ring-gold'
                        : 'border-white/10 bg-white/[0.02] hover:border-gold/40'
                    }`}
                  >
                    <p className="font-heading font-semibold text-sm text-white mb-0.5">{sz.label}</p>
                    <p className="text-[11px] text-white/50">{sz.sub}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Frame Finish */}
          <div className="p-6 sm:p-7 rounded-xl2 bg-white/[0.03] border border-gold/20 shadow-card">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-7 h-7 rounded-full bg-gold text-ink font-bold text-xs flex items-center justify-center">3</span>
              <h3 className="font-heading font-semibold text-lg text-white">Select Wood / Border Finish</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {finishOptions.map((fn) => {
                const isSelected = selectedFinish.id === fn.id;
                return (
                  <button
                    key={fn.id}
                    type="button"
                    onClick={() => setSelectedFinish(fn)}
                    className={`p-3.5 rounded-xl flex items-center gap-3.5 transition-all border ${
                      isSelected
                        ? 'border-gold bg-gold/15 ring-1 ring-gold'
                        : 'border-white/10 bg-white/[0.02] hover:border-gold/40'
                    }`}
                  >
                    <span
                      className="w-5 h-5 rounded-full shrink-0 border border-white/30 shadow"
                      style={{ backgroundColor: fn.color }}
                    />
                    <div className="flex-1 text-left">
                      <p className="font-heading font-semibold text-xs text-white">{fn.name}</p>
                    </div>
                    {isSelected && <FiCheck className="text-gold text-sm shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 4: Matting Border */}
          <div className="p-6 sm:p-7 rounded-xl2 bg-white/[0.03] border border-gold/20 shadow-card">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-7 h-7 rounded-full bg-gold text-ink font-bold text-xs flex items-center justify-center">4</span>
              <h3 className="font-heading font-semibold text-lg text-white">Choose Matting / Passepartout</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {mattingOptions.map((mat) => {
                const isSelected = selectedMatting.id === mat.id;
                return (
                  <button
                    key={mat.id}
                    type="button"
                    onClick={() => setSelectedMatting(mat)}
                    className={`p-3.5 rounded-xl text-left transition-all border ${
                      isSelected
                        ? 'border-gold bg-gold/15 ring-1 ring-gold'
                        : 'border-white/10 bg-white/[0.02] hover:border-gold/40'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-0.5">
                      <p className="font-heading font-semibold text-xs text-white">{mat.name}</p>
                      {isSelected && <FiCheck className="text-gold text-xs shrink-0" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 5: Quantity & Custom Engraving Notes */}
          <div className="p-6 sm:p-7 rounded-xl2 bg-white/[0.03] border border-gold/20 shadow-card">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-7 h-7 rounded-full bg-gold text-ink font-bold text-xs flex items-center justify-center">5</span>
              <h3 className="font-heading font-semibold text-lg text-white">Quantity &amp; Engraving Notes</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-5 items-end">
              <div>
                <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
                  Quantity (Frames)
                </label>
                <div className="flex items-center border border-gold/30 rounded-xl bg-white/5 w-36 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-gold font-bold hover:bg-gold/20 text-lg transition-colors"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center font-heading font-bold text-white text-sm">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                    className="w-10 h-10 flex items-center justify-center text-gold font-bold hover:bg-gold/20 text-lg transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="custom-notes" className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
                  Names / Dates / Custom Notes
                </label>
                <input
                  id="custom-notes"
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. 'Aarav & Priya - 24.11.2025'"
                  className="w-full bg-white/5 border border-gold/25 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Order Configuration Summary & WhatsApp CTA (5 cols) */}
        <div className="lg:col-span-5 sticky top-28 space-y-6">
          {/* Configuration Summary Card */}
          <div className="rounded-xl2 p-6 sm:p-7 bg-white/[0.04] border border-gold/25 shadow-lift backdrop-blur-md">
            <h3 className="font-heading font-semibold text-sm tracking-wider uppercase text-gold mb-6 pb-4 border-b border-gold/15">
              Your Configuration
            </h3>

            {/* Dynamic Selected Details */}
            <div className="space-y-4 text-xs font-body">
              <div className="flex justify-between items-center text-white/70 py-1">
                <span>Product Style:</span>
                <span className="font-semibold text-white text-right">{selectedType.name}</span>
              </div>
              <div className="flex justify-between items-center text-white/70 py-1">
                <span>Selected Dimensions:</span>
                <span className="font-semibold text-white text-right">{selectedSize.label}</span>
              </div>
              <div className="flex justify-between items-center text-white/70 py-1">
                <span>Frame Material:</span>
                <span className="font-semibold text-white text-right">{selectedFinish.name}</span>
              </div>
              <div className="flex justify-between items-center text-white/70 py-1">
                <span>Matting Border:</span>
                <span className="font-semibold text-white text-right">{selectedMatting.name}</span>
              </div>
              <div className="flex justify-between items-center text-white/70 py-1">
                <span>Quantity:</span>
                <span className="font-semibold text-white text-right">{quantity} units</span>
              </div>
            </div>

            {/* WhatsApp CTA Button */}
            <div className="mt-8 pt-6 border-t border-gold/15">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full btn-gold font-bold text-xs tracking-wider uppercase py-4 px-6 rounded-full flex items-center justify-center gap-2.5 shadow-gold hover:scale-[1.02] active:scale-[0.98] transition-transform"
              >
                <FaWhatsapp className="text-base" />
                Order via WhatsApp Proofing
              </a>
              <p className="text-center text-[11px] text-white/50 mt-3">
                Review your selections and send us a WhatsApp message for confirmation and next steps.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
