import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeUp } from '../utils/motionVariants';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-24 bg-ink">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} className="rounded-xl2 border border-gold/20 p-12 text-center bg-white/[0.03]">
        <h1 className="font-heading font-bold text-4xl text-white mb-3">Page Not Found</h1>
        <p className="font-body text-white/50 mb-8">The page you're looking for doesn't exist.</p>
        <NavLink to="/" className="btn-gold font-semibold text-xs tracking-wide uppercase px-8 py-3.5 rounded-full">
          Back Home
        </NavLink>
      </motion.div>
    </div>
  );
}
