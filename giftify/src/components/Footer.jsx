import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  FiInstagram,
  FiFacebook,
  FiMapPin,
  FiPhone,
  FiMail,
  FiSend,
  FiHome,
  FiGrid,
  FiImage,
  FiSliders,
  FiInfo,
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import logo from '../assets/logo.webp';
import { categories } from '../data/categories';
import { BUSINESS_INFO, getWhatsAppInquiryUrl } from '../utils/constants';

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Shop Products', to: '/shop' },
  { label: 'Custom Order', to: '/customize' },
  { label: 'Gallery Portfolio', to: '/gallery' },
  { label: 'About Us', to: '/about' },
  { label: 'Customer Reviews', to: '/reviews' },
  { label: 'Contact Us', to: '/contact' },
];

const mobileNavLinks = [
  { label: 'Home', to: '/', icon: FiHome, end: true },
  { label: 'Shop', to: '/shop', icon: FiGrid },
  { label: 'Custom', to: '/customize', icon: FiSliders },
  { label: 'Gallery', to: '/gallery', icon: FiImage },
  { label: 'Contact', to: '/contact', icon: FiMail },
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
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const whatsappGeneralUrl = getWhatsAppInquiryUrl();

  return (
    <footer className="bg-ink pt-16 border-t border-gold/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Newsletter / Custom Order Banner */}
        <div className="border-b border-gold/15 pb-12 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="font-heading font-semibold text-xl sm:text-2xl text-white mb-1">
              Need a Custom Frame Estimate?
            </h3>
            <p className="text-xs sm:text-sm font-body text-white/60">
              Subscribe for exclusive seasonal offers or connect directly with our Palani workshop.
            </p>
          </div>

          {subscribed ? (
            <p className="text-gold font-body text-sm font-semibold bg-gold/10 px-6 py-3 rounded-full border border-gold/30">
              ✓ Thank you for subscribing to MS Frames!
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                aria-label="Email address for newsletter"
                className="flex-1 sm:w-72 bg-white/5 border border-gold/25 rounded-full px-5 py-3 text-xs sm:text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-gold"
              />
              <button
                type="submit"
                className="btn-gold font-bold text-xs tracking-wider uppercase px-6 py-3 rounded-full flex items-center gap-1.5 shrink-0 shadow-gold"
              >
                Subscribe <FiSend className="text-xs" />
              </button>
            </form>
          )}
        </div>

        {/* 4 Column Footer Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div>
            <NavLink to="/" className="flex items-center gap-2.5 mb-4">
              <img
                src={logo}
                alt="MS Frames logo"
                width="44"
                height="44"
                className="w-11 h-11 rounded-lg object-cover ring-1 ring-gold/50"
              />
              <div>
                <p className="font-heading font-semibold text-base text-gold leading-none">MS FRAMES</p>
                <p className="font-body text-[10px] text-white/50 mt-1">Palani, Tamil Nadu</p>
              </div>
            </NavLink>
            <p className="text-xs font-body text-white/60 leading-relaxed max-w-xs mb-4">
              Preserving precious memories with handcrafted wooden photo frames, luxury framed mirrors, fine art canvas,
              and devotional pooja room setups since 1995.
            </p>
            <div className="flex gap-2.5">
              <a
                href={BUSINESS_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="MS Frames on Instagram"
                className="w-9 h-9 rounded-full border border-gold/30 flex items-center justify-center text-white/70 hover:text-gold hover:border-gold transition-colors"
              >
                <FiInstagram />
              </a>
              <a
                href={BUSINESS_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="MS Frames on Facebook"
                className="w-9 h-9 rounded-full border border-gold/30 flex items-center justify-center text-white/70 hover:text-gold hover:border-gold transition-colors"
              >
                <FiFacebook />
              </a>
              <a
                href={whatsappGeneralUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with MS Frames on WhatsApp"
                className="w-9 h-9 rounded-full border border-gold/30 flex items-center justify-center text-white/70 hover:text-gold hover:border-gold transition-colors"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4 text-sm tracking-wide">Quick Navigation</h4>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <NavLink to={l.to} className="text-xs font-body text-white/60 hover:text-gold transition-colors">
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4 text-sm tracking-wide">Collections</h4>
            <ul className="flex flex-col gap-2.5">
              {categories.map((c) => (
                <li key={c.id}>
                  <Link
                    to={`/shop?category=${encodeURIComponent(c.name)}`}
                    className="text-xs font-body text-white/60 hover:text-gold transition-colors"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4 text-sm tracking-wide">Palani Workshop</h4>
            <ul className="flex flex-col gap-3 text-xs font-body text-white/65 mb-4">
              <li className="flex items-start gap-2.5">
                <FiMapPin className="text-gold shrink-0 mt-0.5" />
                <a
                  href={BUSINESS_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors"
                >
                  {BUSINESS_INFO.address}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <FiPhone className="text-gold shrink-0" />
                <a href={`tel:${BUSINESS_INFO.phone}`} className="hover:text-gold transition-colors">
                  {BUSINESS_INFO.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <FiMail className="text-gold shrink-0" />
                <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-gold transition-colors">
                  {BUSINESS_INFO.email}
                </a>
              </li>
            </ul>
            <p className="text-[11px] text-white/40 font-body">Open 7 Days a week: 9:00 AM – 8:00 PM</p>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="border-t border-gold/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-body text-white/40 pb-28 lg:pb-8">
          <p>© {new Date().getFullYear()} MS Frames Palani. All Rights Reserved.</p>
          <div className="flex flex-wrap gap-4">
            {legalLinks.map((leg) => (
              <NavLink key={leg.to} to={leg.to} className="hover:text-gold transition-colors">
                {leg.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed Bottom Navigation Bar for Mobile */}
      <nav
        aria-label="Mobile Bottom Navigation"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-ink/95 backdrop-blur-md border-t border-gold/20 shadow-2xl"
      >
        <ul className="flex items-center justify-around px-2 py-1.5 max-w-md mx-auto">
          {mobileNavLinks.map((link) => (
            <li key={link.label}>
              <NavLink
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center py-1 px-2.5 rounded-lg transition-colors ${
                    isActive ? 'text-gold' : 'text-white/60 hover:text-gold'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <link.icon className={`text-lg mb-0.5 ${isActive ? 'text-gold scale-110' : 'text-inherit'}`} />
                    <span className="font-button text-[9px] uppercase tracking-wider leading-none">
                      {link.label}
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
