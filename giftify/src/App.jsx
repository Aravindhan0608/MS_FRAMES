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
import Customize from './pages/Customize';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Contact from './pages/Contact';
import Reviews from './pages/Reviews';
import Policy from './pages/Policy';
import NotFound from './pages/NotFound';
import { privacySections, termsSections, shippingSections, returnSections } from './data/policies';
import { seoByPath, notFoundSeo } from './utils/seoConfig';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }, [pathname]);
  return null;
}

export default function App() {
  const location = useLocation();
  const pageSeo = seoByPath[location.pathname];
  const seo = pageSeo || notFoundSeo;

  return (
    <div className="relative min-h-screen bg-ink text-white selection:bg-gold selection:text-ink font-body">
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
          transition={{ duration: 0.25 }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/customize" element={<Customize />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route
              path="/privacy"
              element={<Policy title="Privacy Policy" effectiveDate="August 2026" sections={privacySections} />}
            />
            <Route
              path="/terms"
              element={<Policy title="Terms & Conditions" effectiveDate="August 2026" sections={termsSections} />}
            />
            <Route
              path="/shipping-delivery"
              element={<Policy title="Shipping & Delivery Policy" effectiveDate="August 2026" sections={shippingSections} />}
            />
            <Route
              path="/return-refund"
              element={<Policy title="Return & Replacement Guarantee" effectiveDate="August 2026" sections={returnSections} />}
            />
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
