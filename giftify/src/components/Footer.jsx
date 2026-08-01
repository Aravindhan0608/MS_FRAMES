import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiInstagram, FiFacebook, FiMapPin, FiPhone, FiMail, FiSend } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import logo from '../assets/logo1.png';
import { categories } from '../data/categories';

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Categories', to: '/shop' },
  { label: 'Custom Order', to: '/customize' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact Us', to: '/contact' },
];

const legalLinks = [
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms & Conditions', to: '/terms' },
  { label: 'Shipping & Delivery', to: '/shipping-delivery' },
  { label: 'Return & Refund', to: '/return-refund' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) setSubscribed(true);
  };

  return (
    <footer className="bg-ink pt-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Newsletter */}
        <div className="border-b border-gold/10 pb-12 mb-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <h3 className="font-heading font-semibold text-xl text-white mb-1">Newsletter</h3>
            <p className="text-sm font-body text-white/50">Subscribe to get updates &amp; offers</p>
          </div>
          {subscribed ? (
            <p className="text-gold font-body text-sm">You're subscribed! Thank you.</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex w-full sm:w-auto gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                aria-label="Email address"
                className="flex-1 sm:w-64 bg-white/5 border border-gold/25 rounded-full px-5 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold"
              />
              <button type="submit" className="btn-gold font-semibold text-xs tracking-wide uppercase px-5 py-2.5 rounded-full flex items-center gap-1.5 shrink-0">
                Subscribe <FiSend className="text-xs" />
              </button>
            </form>
          )}
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div>
            <NavLink to="/" className="flex items-center gap-2.5 mb-4">
              <img src={logo} alt="MS Frames logo" className="w-11 h-11 rounded-lg object-cover ring-1 ring-gold/50" />
              <div>
                <p className="font-heading font-semibold text-base text-gold leading-none">MS FRAMES</p>
                <p className="font-body text-[10px] text-white/40 mt-1">Frame Your Memories</p>
              </div>
            </NavLink>
            <p className="text-sm font-body text-white/45 max-w-xs">
              Premium photo frames and customized gifts, crafted with care for every memory.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-white mb-4 text-sm tracking-wide">Quick Links</h4>
            <ul className="flex flex-col gap-2">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <NavLink to={l.to} className="text-sm font-body text-white/50 hover:text-gold transition-colors">
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-white mb-4 text-sm tracking-wide">Categories</h4>
            <ul className="flex flex-col gap-2">
              {categories.slice(0, 5).map((c) => (
                <li key={c.id}>
                  <NavLink to="/shop" className="text-sm font-body text-white/50 hover:text-gold transition-colors">
                    {c.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-white mb-4 text-sm tracking-wide">Contact</h4>
            <ul className="flex flex-col gap-3 text-sm font-body text-white/50 mb-4">
              <li className="flex items-center gap-2"><FiMapPin className="text-gold shrink-0" /> 128 Maple Street, Suite 4B</li>
              <li className="flex items-center gap-2"><FiPhone className="text-gold shrink-0" /> +91 6369107200</li>
              <li className="flex items-center gap-2"><FiMail className="text-gold shrink-0" /> msframes01@gmail.com</li>
            </ul>
            <div className="flex gap-3">
              {[
                { icon: FiInstagram, href: 'https://www.instagram.com/ms._frames?igsh=YTdwMDg0Y2txdzNx', label: 'Instagram' },
                { icon: FiFacebook, href: 'https://facebook.com', label: 'Facebook' },
                { icon: FaWhatsapp, href: 'https://wa.me/6369107200', label: 'WhatsApp' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-gold/25 flex items-center justify-center text-white/70 hover:text-gold hover:border-gold transition-colors"
                >
                  <s.icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gold/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-body text-white/35">
          <p>© {new Date().getFullYear()} MS Frames. All Rights Reserved.</p>
          <div className="flex gap-4">
            <NavLink to="/privacy" className="hover:text-gold transition-colors">Privacy Policy</NavLink>
            <NavLink to="/terms" className="hover:text-gold transition-colors">Terms &amp; Conditions</NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
