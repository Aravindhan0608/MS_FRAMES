import { motion } from 'framer-motion';
import RecentWorks from '../components/RecentWorks';
import BeforeAfterGallery from '../components/BeforeAfterGallery';
import { fadeUp } from '../utils/motionVariants';

export default function Gallery() {
  return (
    <div className="pt-28 pb-10 min-h-screen bg-ink">
      <RecentWorks />
      <BeforeAfterGallery />
    </div>
  );
}
