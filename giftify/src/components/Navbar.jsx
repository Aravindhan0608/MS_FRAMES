import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiShoppingBag } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import logo from '../assets/logo1.png';

const links = [
  { label: 'Home', to: '/' },
  { label: 'Categories', to: '/shop' },
 // { label: 'Custom Order', to: '/customize' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact Us', to: '/contact' },
];

const WHATSAPP_NUMBER = '916369107200';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 bg-ink transition-shadow duration-300 ${
        scrolled ? 'shadow-lift' : ''
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 py-3.5 flex items-center justify-between" aria-label="Primary navigation">
        <NavLink to="/" className="flex items-center gap-2.5 shrink-0" aria-label="MS Frames home">
          <img src={logo} alt="MS Frames logo" className="w-10 h-10 rounded-lg object-cover ring-1 ring-gold/50" />
          <span className="font-heading font-semibold text-base sm:text-lg tracking-wider text-gold leading-none">
            MS FRAMES
          </span>
        </NavLink>

        <ul className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.label}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `nav-underline font-button font-medium text-[12px] tracking-widest uppercase text-white/85 hover:text-gold transition-colors ${
                    isActive ? 'active text-gold' : ''
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5 sm:gap-2.5">
          <NavLink
            to="/shop"
            aria-label="Products"
            className="relative flex items-center justify-center w-9 h-9 rounded-full text-white/85 hover:text-gold transition-colors"
          >
            <FiShoppingBag />
            <span className="absolute -top-0.5 -right-0.5 bg-gold text-ink text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              3
            </span>
          </NavLink>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20MS%20Frames,%20I%20would%20like%20to%20place%20an%20order.`}
            target="_blank"
            rel="noreferrer"
            aria-label="Chat on WhatsApp"
            className="hidden md:flex items-center gap-2 btn-gold font-semibold text-xs tracking-wide uppercase px-4 py-2.5 rounded-full"
          >
            <FaWhatsapp /> WhatsApp
          </a>

          <button
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-full text-white hover:text-gold transition-colors"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-ink border-t border-gold/15 px-5 overflow-hidden"
          >
            <div className="flex flex-col gap-4 py-6">
              {links.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="font-button text-xs tracking-widest uppercase text-white/85 hover:text-gold"
                >
                  {link.label}
                </NavLink>
              ))}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 btn-gold font-semibold text-xs tracking-wide uppercase px-4 py-2.5 rounded-full mt-2"
              >
                <FaWhatsapp /> WhatsApp Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
