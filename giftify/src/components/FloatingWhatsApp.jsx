import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { getWhatsAppInquiryUrl } from '../utils/constants';

export default function FloatingWhatsApp() {
  const whatsappUrl = getWhatsAppInquiryUrl();

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with MS Frames on WhatsApp"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      transition={{ delay: 0.5 }}
      className="fixed bottom-20 right-4 sm:right-6 lg:bottom-6 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl text-2xl sm:text-3xl ring-2 ring-white/20 hover:ring-gold transition-all"
    >
      <FaWhatsapp />
    </motion.a>
  );
}
