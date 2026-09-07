import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiSend,
  FiCheck,
  FiInstagram,
  FiFacebook,
  FiHelpCircle,
  FiMessageSquare,
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { BUSINESS_INFO, getWhatsAppInquiryUrl } from '../utils/constants';
import { fadeUp, slideLeft, slideRight } from '../utils/motionVariants';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const nextErrors = {};
    if (!name.trim()) nextErrors.name = 'Please enter your name.';
    if (!email.trim()) {
      nextErrors.email = 'Please enter your email address.';
    } else if (!emailPattern.test(email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!message.trim()) nextErrors.message = 'Please enter your message or custom framing requirements.';
    return nextErrors;
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    const lines = [
      `👋 *New Inquiry from MS Frames Website:*`,
      `• *Name:* ${name.trim()}`,
      phone ? `• *Phone:* ${phone.trim()}` : '',
      `• *Email:* ${email.trim()}`,
      subject ? `• *Subject:* ${subject.trim()}` : '',
      `• *Message:* ${message.trim()}`,
    ].filter(Boolean);

    const url = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    const mailSubject = subject.trim() || `Inquiry from ${name.trim()} - MS Frames`;
    const mailBody = `Name: ${name.trim()}\nPhone: ${phone.trim()}\nEmail: ${email.trim()}\n\nMessage:\n${message.trim()}`;
    const mailtoUrl = `mailto:${BUSINESS_INFO.email}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
    window.location.href = mailtoUrl;
    setSubmitted(true);
  };

  return (
    <div className="pt-28 min-h-screen bg-ink">
      <div className="pb-24 px-4 sm:px-6 max-w-7xl mx-auto">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-14 pt-8">
          <p className="font-body text-gold tracking-[0.25em] uppercase text-xs mb-3">Get in Touch</p>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl text-white">Contact MS Frames</h1>
          <div className="w-16 h-[2px] bg-gold mx-auto mt-4" />
          <p className="text-white/60 font-body text-sm mt-4 max-w-lg mx-auto">
            Have questions about a custom frame, bulk order, or pooja room setup? We’re here to help you preserve your
            memories.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-10 mb-16">
          {/* Left: Contact Info Cards (2 cols) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={slideRight}
            className="md:col-span-2 flex flex-col gap-4"
          >
            {[
              {
                icon: FiPhone,
                label: 'Phone Support',
                value: BUSINESS_INFO.phoneDisplay,
                href: `tel:${BUSINESS_INFO.phone}`,
              },
              {
                icon: FaWhatsapp,
                label: 'Instant WhatsApp',
                value: 'Chat with artisans',
                href: getWhatsAppInquiryUrl(),
              },
              {
                icon: FiMail,
                label: 'Email Address',
                value: BUSINESS_INFO.email,
                href: `mailto:${BUSINESS_INFO.email}`,
              },
              {
                icon: FiMapPin,
                label: 'Palani Studio',
                value: BUSINESS_INFO.address,
                href: BUSINESS_INFO.mapsUrl,
              },
              {
                icon: FiClock,
                label: 'Working Hours',
                value: BUSINESS_INFO.businessHours,
              },
            ].map((item) => {
              const cardContent = (
                <div className="rounded-xl2 p-5 flex items-start gap-4 border border-gold/15 bg-white/[0.03] hover:border-gold/40 transition-colors shadow-card">
                  <div className="w-11 h-11 rounded-full border border-gold flex items-center justify-center text-gold text-lg shrink-0 mt-0.5">
                    <item.icon />
                  </div>
                  <div>
                    <p className="text-[10px] font-button font-semibold tracking-wider uppercase text-gold mb-0.5">
                      {item.label}
                    </p>
                    <p className="font-body text-xs sm:text-sm text-white/90 leading-snug">{item.value}</p>
                  </div>
                </div>
              );

              return item.href ? (
                <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className="block">
                  {cardContent}
                </a>
              ) : (
                <div key={item.label}>{cardContent}</div>
              );
            })}

            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs text-white/50 font-body">Follow our work:</span>
              <a
                href={BUSINESS_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-gold/30 flex items-center justify-center text-white/70 hover:text-gold hover:border-gold transition-colors"
              >
                <FiInstagram />
              </a>
              <a
                href={BUSINESS_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full border border-gold/30 flex items-center justify-center text-white/70 hover:text-gold hover:border-gold transition-colors"
              >
                <FiFacebook />
              </a>
            </div>
          </motion.div>

          {/* Right: Accessible Contact Form (3 cols) */}
          <motion.form
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={slideLeft}
            className="md:col-span-3 rounded-xl2 p-6 sm:p-8 border border-gold/20 bg-white/[0.03] shadow-lift flex flex-col gap-4"
          >
            <h2 className="font-heading font-semibold text-xl text-white mb-2">Send an Instant Message</h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5">
                  Your Name *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Anand Kumar"
                  className="w-full bg-white/5 border border-gold/20 rounded-xl px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-gold font-body text-sm"
                />
                {errors.name && <p className="text-gold text-xs font-body mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="contact-phone" className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5">
                  Phone Number
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +91 98765 43210"
                  className="w-full bg-white/5 border border-gold/20 rounded-xl px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-gold font-body text-sm"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-email" className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5">
                  Email Address *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. anand@example.com"
                  className="w-full bg-white/5 border border-gold/20 rounded-xl px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-gold font-body text-sm"
                />
                {errors.email && <p className="text-gold text-xs font-body mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="contact-subject" className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5">
                  Inquiry Topic
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Custom Teak Wall Frame"
                  className="w-full bg-white/5 border border-gold/20 rounded-xl px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-gold font-body text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5">
                Message / Frame Details *
              </label>
              <textarea
                id="contact-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                placeholder="Describe your photo framing requirements, size preferences, or questions..."
                className="w-full bg-white/5 border border-gold/20 rounded-xl px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-gold resize-none font-body text-sm"
              />
              {errors.message && <p className="text-gold text-xs font-body mt-1">{errors.message}</p>}
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={handleWhatsAppSubmit}
                className="btn-gold font-bold text-xs tracking-wider uppercase px-6 py-3.5 rounded-full flex items-center justify-center gap-2 shadow-gold"
              >
                <FaWhatsapp className="text-base" /> Send via WhatsApp
              </button>

              <button
                type="button"
                onClick={handleEmailSubmit}
                className="btn-ink font-semibold text-xs tracking-wider uppercase px-6 py-3.5 rounded-full flex items-center justify-center gap-2"
              >
                <FiMail className="text-sm" /> Send via Email
              </button>
            </div>

            {submitted && (
              <p className="text-gold font-body text-sm flex items-center gap-1.5 mt-2 bg-gold/10 p-3 rounded-xl border border-gold/30">
                <FiCheck className="text-base" /> Message drafted! Our Palani artisans will connect with you shortly.
              </p>
            )}
          </motion.form>
        </div>

        {/* Embedded Google Map */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="rounded-xl2 overflow-hidden shadow-lift h-80 ring-1 ring-gold/20"
        >
          <iframe
            title="MS Frames Studio Palani Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4842.9673964073045!2d77.5212119!3d10.4677857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba9dff6cf3af39d%3A0x6fcc1242599dac01!2sMs%20frames!5e1!3m2!1sen!2sin!4v1785590584758!5m2!1sen!2sin"
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </motion.div>
      </div>

      {/* Support / Quick Help Tiles */}
      <section className="bg-ink py-16 px-4 border-t border-gold/15">
        <div className="max-w-5xl mx-auto text-center">
          <p className="font-body text-gold tracking-[0.25em] uppercase text-xs mb-2">Need Fast Assistance?</p>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-white mb-8">Customer Support</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            <Link
              to="/customize"
              className="rounded-xl2 p-6 border border-gold/15 bg-white/[0.03] hover:border-gold/50 transition-colors block text-center shadow-card group"
            >
              <FiMessageSquare className="text-gold text-2xl mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-heading font-semibold text-white mb-1">Custom Estimator</h3>
              <p className="text-xs font-body text-white/60">Configure sizes and calculate custom frame pricing.</p>
            </Link>

            <Link
              to="/#categories"
              className="rounded-xl2 p-6 border border-gold/15 bg-white/[0.03] hover:border-gold/50 transition-colors block text-center shadow-card group"
            >
              <FiHelpCircle className="text-gold text-2xl mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-heading font-semibold text-white mb-1">Browse FAQ</h3>
              <p className="text-xs font-body text-white/60">Read quick answers on shipping, sizes, and care.</p>
            </Link>

            <a
              href={getWhatsAppInquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl2 p-6 border border-gold/15 bg-white/[0.03] hover:border-gold/50 transition-colors block text-center shadow-card group"
            >
              <FaWhatsapp className="text-gold text-2xl mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-heading font-semibold text-white mb-1">WhatsApp Live Chat</h3>
              <p className="text-xs font-body text-white/60">Direct artisan advice and instant photo proofing.</p>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
