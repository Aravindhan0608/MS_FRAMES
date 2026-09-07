import { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiGrid } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import logo from '../assets/logo.webp';
import { BUSINESS_INFO, getWhatsAppInquiryUrl } from '../utils/constants';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'Custom Order', to: '/customize' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const whatsappUrl = getWhatsAppInquiryUrl();

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 bg-ink/95 backdrop-blur-md transition-shadow duration-300 border-b border-gold/15 ${
        scrolled ? 'shadow-lift' : ''
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between" aria-label="Primary navigation">
        {/* Brand Logo & Name */}
        <NavLink to="/" className="flex items-center gap-3 shrink-0 focus-visible:ring-2 focus-visible:ring-gold rounded-lg" aria-label="MS Frames Home">
          <img src={logo} alt="MS Frames logo" width="40" height="40" className="w-10 h-10 rounded-lg object-cover ring-1 ring-gold/50" />
          <div>
            <span className="font-heading font-semibold text-base sm:text-lg tracking-wider text-gold leading-none block">
              MS FRAMES
            </span>
            <span className="text-[9px] text-white/50 tracking-widest uppercase block font-body">
              Palani • Est. 1995
            </span>
          </div>
        </NavLink>

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <li key={link.label}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `nav-underline font-button font-medium text-[11px] tracking-widest uppercase transition-colors py-1 ${
                    isActive ? 'active text-gold' : 'text-white/80 hover:text-gold'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <Link
            to="/shop"
            aria-label="Browse Products"
            className="hidden sm:flex items-center gap-1.5 text-white/80 hover:text-gold text-xs font-button font-medium tracking-wide uppercase px-3 py-2 rounded-full border border-white/10 hover:border-gold/40 transition-colors"
          >
            <FiGrid className="text-sm text-gold" /> Products
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with MS Frames on WhatsApp"
            className="hidden md:flex items-center gap-2 btn-gold font-bold text-xs tracking-wide uppercase px-4 py-2.5 rounded-full shadow-gold"
          >
            <FaWhatsapp className="text-sm" /> WhatsApp
          </a>

          <button
            type="button"
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full text-white hover:text-gold transition-colors focus-visible:ring-2 focus-visible:ring-gold"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label="Toggle navigation menu"
          >
            {open ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-ink/98 border-t border-gold/20 px-6 py-6 overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `font-button text-xs tracking-widest uppercase py-2 border-b border-white/5 transition-colors ${
                      isActive ? 'text-gold font-bold' : 'text-white/80 hover:text-gold'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 btn-gold font-bold text-xs tracking-wide uppercase px-5 py-3 rounded-full mt-3 shadow-gold"
              >
                <FaWhatsapp className="text-base" /> Inquire on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
