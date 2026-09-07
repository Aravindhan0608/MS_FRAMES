import { motion } from 'framer-motion';
import CustomFrameBuilder from '../components/CustomFrameBuilder';
import ProcessTimeline from '../components/ProcessTimeline';
import WhyChooseUs from '../components/WhyChooseUs';
import FAQ from '../components/FAQ';
import { fadeUp } from '../utils/motionVariants';

export default function Customize() {
  return (
    <div className="pt-28 pb-16 min-h-screen bg-ink">
      <CustomFrameBuilder />
      <ProcessTimeline />
      <WhyChooseUs />
      <FAQ />
    </div>
  );
}
