import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend, FiCheck, FiInstagram, FiFacebook, FiHelpCircle } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { fadeUp, slideLeft, slideRight } from '../utils/motionVariants';

const RECIPIENT_EMAIL = 'msframes01@gmail.com';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(false);

    const nextErrors = {};
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName) nextErrors.name = 'Name is required.';
    if (!trimmedEmail) nextErrors.email = 'Email is required.';
    else if (!emailPattern.test(trimmedEmail)) nextErrors.email = 'Please enter a valid email address.';
    if (!trimmedMessage) nextErrors.message = 'Message is required.';

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});

    const subject = `New Contact Message from ${trimmedName}`;
    const body = `Name: ${trimmedName}\n\nEmail: ${trimmedEmail}\n\nMessage:\n${trimmedMessage}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(RECIPIENT_EMAIL)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    setSuccess(true);
  };

  return (
    <div className="pt-28 min-h-screen bg-ink">
      <div className="pb-24 px-4 max-w-7xl mx-auto">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-16 pt-8">
          <p className="font-body text-gold tracking-[0.25em] uppercase text-xs mb-3">We'd Love To Hear From You</p>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl text-white">
            Contact Us
          </h1>
          <div className="w-16 h-[2px] bg-gold mx-auto mt-4" />
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8 mb-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={slideRight}
            className="md:col-span-2 flex flex-col gap-4"
          >
            {[
              { icon: FiPhone, label: 'Phone', value: '+91  6369107200' },
              { icon: FaWhatsapp, label: 'WhatsApp', value: 'Chat with us', href: 'https://wa.me/6369107200' },
              { icon: FiMail, label: 'Email', value: ' msframes01@gmail.com' },
              { icon: FiMapPin, label: 'Address', value: 'Jawahar Nagar, Palani, Dindigul, Tamil Nadu — 624601' },
              { icon: FiClock, label: 'Business Hours', value: 'Monday – Sunday, 9:00 AM – 8:00 PM' },
            ].map((item) => {
              const content = (
                <div key={item.label} className="card-lift rounded-xl2 p-6 flex items-center gap-4 border border-gold/15 bg-white/[0.03] hover:border-gold/40 transition-colors">
                  <div className="w-12 h-12 rounded-full border border-gold flex items-center justify-center text-gold text-xl shrink-0">
                    <item.icon />
                  </div>
                  <div>
                    <p className="text-xs font-button tracking-wide uppercase text-white/40">{item.label}</p>
                    <p className="font-body font-medium text-white">{item.value}</p>
                  </div>
                </div>
              );
              return item.href ? (
                <a key={item.label} href={item.href} target="_blank" rel="noreferrer">
                  {content}
                </a>
              ) : (
                content
              );
            })}

            <div className="flex gap-3 mt-2">
              <a href="https://www.instagram.com/ms._frames?igsh=YTdwMDg0Y2txdzNx" target="_blank" rel="noreferrer" aria-label="Instagram" className="w-11 h-11 rounded-full border border-gold/40 flex items-center justify-center text-white/70 hover:text-gold hover:border-gold transition-colors">
                <FiInstagram />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="w-11 h-11 rounded-full border border-gold/40 flex items-center justify-center text-white/70 hover:text-gold hover:border-gold transition-colors">
                <FiFacebook />
              </a>
            </div>
          </motion.div>

          <motion.form
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={slideLeft}
            onSubmit={handleSubmit}
            className="md:col-span-3 rounded-xl2 p-8 border border-gold/20 bg-white/[0.03] shadow-lift flex flex-col gap-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full bg-white/5 border border-gold/20 rounded-xl px-5 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-gold font-body text-sm"
                />
                {errors.name && <p className="text-gold text-xs font-body mt-1.5">{errors.name}</p>}
              </div>
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  className="w-full bg-white/5 border border-gold/20 rounded-xl px-5 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-gold font-body text-sm"
                />
                {errors.email && <p className="text-gold text-xs font-body mt-1.5">{errors.email}</p>}
              </div>
            </div>
            <input placeholder="Subject" className="bg-white/5 border border-gold/20 rounded-xl px-5 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-gold font-body text-sm" />
            <div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                placeholder="Your Message"
                className="w-full bg-white/5 border border-gold/20 rounded-xl px-5 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-gold resize-none font-body text-sm"
              />
              {errors.message && <p className="text-gold text-xs font-body mt-1.5">{errors.message}</p>}
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              type="submit"
              className="btn-gold font-semibold text-xs tracking-wide uppercase px-8 py-3.5 rounded-full flex items-center justify-center gap-2 self-start"
            >
              Send Message <FiSend />
            </motion.button>
            {success && (
              <p className="text-gold font-body text-sm flex items-center gap-1.5">
                <FiCheck /> Gmail opened. Please review and send your message.
              </p>
            )}
          </motion.form>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="rounded-xl2 overflow-hidden shadow-lift h-80 ring-1 ring-gold/15"
        >
          <iframe
  title="MS Frames studio location"
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4842.9673964073045!2d77.5212119!3d10.4677857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba9dff6cf3af39d%3A0x6fcc1242599dac01!2sMs%20frames!5e1!3m2!1sen!2sin!4v1785590584758!5m2!1sen!2sin"
  className="w-full h-full border-0"
  loading="lazy"
  referrerPolicy="strict-origin-when-cross-origin"
  allowFullScreen
/>
        </motion.div>
      </div>
      {/* Support */}
      <section className="bg-ink py-20 px-4 border-t border-gold/10">
        <div className="max-w-5xl mx-auto text-center">
          <p className="font-body text-gold tracking-[0.25em] uppercase text-xs mb-3">Need Help?</p>
          <h2 className="font-heading font-bold text-3xl text-white mb-10">Support</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { title: 'Help Center', desc: 'Answers to common questions.' },
              { title: 'FAQ', desc: 'Find answers to frequently asked questions.' },
              { title: 'WhatsApp Chat', desc: 'Chat with us instantly on WhatsApp.' },
            ].map((s) => (
              <div key={s.title} className="card-lift rounded-xl2 p-6 border border-gold/15 bg-white/[0.03] hover:border-gold/40 transition-colors">
                <FiHelpCircle className="text-gold text-2xl mx-auto mb-3" />
                <h3 className="font-heading font-semibold text-white mb-1.5">{s.title}</h3>
                <p className="text-sm font-body text-white/50">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
