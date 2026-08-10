import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SEO from './components/SEO';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Gallery from './pages/Gallery';
//import Customize from './pages/Customize';
import About from './pages/About';
import Contact from './pages/Contact';
import Reviews from './pages/Reviews';
import Policy from './pages/Policy';
import NotFound from './pages/NotFound';
import { seoByPath, notFoundSeo } from './utils/seoConfig';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }, [pathname]);
  return null;
}

const privacySections = [
  { heading: 'Information We Collect', body: 'Name, phone number, email address, delivery address, photos uploaded for custom orders, and payment information (if applicable).' },
  { heading: 'How We Use Your Information', body: 'To process and deliver your orders, communicate regarding your orders and inquiries, and improve our products and services.' },
  { heading: 'Photo Privacy', body: 'Photos uploaded by customers are used only for creating the requested products. We do not share, sell, or use your photos for any other purpose without permission.' },
  { heading: 'Information Security', body: 'We take reasonable measures to protect your personal information from unauthorized access, misuse, or disclosure.' },
  { heading: 'Third-Party Services', body: 'Our website may use third-party services such as Google Maps, WhatsApp, and payment gateways. These services have their own privacy policies.' },
  { heading: 'Changes to This Policy', body: 'We may update this Privacy Policy from time to time. Changes will be published on this page.' },
];

const termsSections = [
  { heading: 'Orders', body: 'All orders are subject to confirmation. Customers are responsible for ensuring that all uploaded photos, sizes, names, and other details are accurate.' },
  { heading: 'Customized Orders', body: 'Customized products will be manufactured only after final confirmation. Production has started and cancellations may not be possible.' },
  { heading: 'Pricing', body: 'Prices are subject to change without prior notice. Final price may vary depending on size, materials, and customization.' },
  { heading: 'Payments', body: 'Orders may require full or partial advance payment. Accepted payment methods will be communicated during ordering.' },
  { heading: 'Cancellation Policy', body: 'Cancellation charges of up to 70% of the product price may apply depending on the stage of production.' },
  { heading: 'Returns & Replacements', body: 'Customized products are not eligible for return or exchange unless damaged or defective. Report any issue within 48 hours of delivery.' },
  { heading: 'Delivery', body: 'Delivery times are estimates and may vary depending on location and order volume.' },
  { heading: 'Intellectual Property', body: 'All content, logos, images, and designs on this website are the property of MS Frames and may not be used without permission.' },
  { heading: 'Limitation of Liability', body: 'MS Frames shall not be liable for any indirect, incidental, or consequential damages.' },
  { heading: 'Contact Us', body: 'For any questions about these terms, contact us via phone, WhatsApp, email, or by visiting our store.' },
];

const shippingSections = [
  { heading: 'Processing Time', body: 'Orders are processed within 1-3 business days after confirmation and payment.' },
  { heading: 'Delivery Time', body: 'Standard delivery takes 3-7 business days depending on your location.' },
  { heading: 'Shipping Charges', body: 'Shipping charges are calculated at checkout based on your delivery location and order size.' },
  { heading: 'Delivery Areas', body: 'We deliver across India. Some remote areas may take slightly longer to reach.' },
  { heading: 'Order Delays', body: 'Delays may occur due to courier issues, weather, or unforeseen circumstances beyond our control.' },
];

const returnSections = [
  { heading: 'Eligible Returns', body: 'Returns are accepted only for damaged or defective products reported within 48 hours of delivery.' },
  { heading: 'Report an Issue', body: 'Please report any issue within 48 hours of delivery along with photos of the product.' },
  { heading: 'Refund Process', body: 'After verification, a refund or replacement will be processed within 5-7 business days.' },
  { heading: 'Non-Returnable Items', body: 'Customized products, hand items, and products damaged by misuse are not eligible for return.' },
];

export default function App() {
  const location = useLocation();
  const pageSeo = seoByPath[location.pathname];
  const seo = pageSeo || notFoundSeo;

  return (
    <div className="relative min-h-screen bg-ink">
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        path={location.pathname}
        noindex={!pageSeo}
      />
      <ScrollProgress />
      <ScrollToTop />
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/gallery" element={<Gallery />} />
            {/*<Route path="/customize" element={<Customize />} /> */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/privacy" element={<Policy title="Privacy Policy" effectiveDate="July 26, 2026" sections={privacySections} />} />
            <Route path="/terms" element={<Policy title="Terms & Conditions" effectiveDate="July 26, 2026" sections={termsSections} />} />
            <Route path="/shipping-delivery" element={<Policy title="Shipping & Delivery Policy" sections={shippingSections} />} />
            <Route path="/return-refund" element={<Policy title="Return & Refund Policy" sections={returnSections} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Footer />
      <BackToTop />
      <FloatingWhatsApp />
    </div>
  );
}
