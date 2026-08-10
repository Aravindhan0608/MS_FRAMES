import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiInstagram, FiFacebook, FiMapPin, FiPhone, FiMail, FiSend, FiHome, FiGrid, FiImage, FiInfo } from 'react-icons/fi';
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

const mobileNavLinks = [
  { label: 'Home', to: '/', icon: FiHome, end: true },
  { label: 'Categories', to: '/shop', icon: FiGrid },
  { label: 'Gallery', to: '/gallery', icon: FiImage },
  { label: 'About Us', to: '/about', icon: FiInfo },
  { label: 'Contact Us', to: '/contact', icon: FiMail },
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

        <div className="border-t border-gold/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-body text-white/35 pb-24 lg:pb-6">
          <p>© {new Date().getFullYear()} MS Frames. All Rights Reserved.</p>
          <div className="flex gap-4">
            <NavLink to="/privacy" className="hover:text-gold transition-colors">Privacy Policy</NavLink>
            <NavLink to="/terms" className="hover:text-gold transition-colors">Terms &amp; Conditions</NavLink>
          </div>
        </div>
      </div>

      <nav
        aria-label="Mobile navigation"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-ink/95 backdrop-blur-sm border-t border-gold/15 shadow-lift"
      >
        <ul className="flex items-center justify-between gap-1 px-2 py-2 sm:px-3 sm:py-2.5 max-w-2xl mx-auto">
          {mobileNavLinks.map((link) => (
            <li key={link.label} className="flex-1 min-w-0">
              <NavLink
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `group flex flex-col items-center justify-center gap-1 py-2 px-1 transition-all duration-[250ms] ease-in-out ${
                    isActive ? 'text-gold' : 'text-white/55'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <link.icon
                      className={`text-[1.15rem] sm:text-xl shrink-0 transition-all duration-[250ms] ease-in-out group-hover:scale-110 group-hover:-translate-y-0.5 group-hover:text-gold group-hover:drop-shadow-[0_0_8px_rgba(200,155,60,0.4)] group-active:scale-110 group-active:-translate-y-0.5 group-active:text-gold group-active:drop-shadow-[0_0_8px_rgba(200,155,60,0.4)] ${
                        isActive
                          ? 'text-gold scale-105 drop-shadow-[0_0_6px_rgba(200,155,60,0.35)]'
                          : 'text-inherit'
                      }`}
                    />
                    <span className="relative font-button text-[8px] sm:text-[10px] tracking-wide uppercase leading-tight text-center truncate w-full transition-colors duration-[250ms] ease-in-out group-hover:text-gold group-active:text-gold">
                      {link.label}
                      <span
                        className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-[2px] rounded-full bg-gold transition-all duration-[250ms] ease-in-out ${
                          isActive
                            ? 'w-4 opacity-100'
                            : 'w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 group-active:w-4 group-active:opacity-100'
                        }`}
                      />
                    </span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
}
