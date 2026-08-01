import Hero from '../components/Hero';
import AnimatedStats from '../components/AnimatedStats';
import Categories from '../components/Categories';
import FeaturedProducts from '../components/FeaturedProducts';
//import CustomFrameBuilder from '../components/CustomFrameBuilder';
import BeforeAfterGallery from '../components/BeforeAfterGallery';
import RecentWorks from '../components/RecentWorks';
import WhyChooseUs from '../components/WhyChooseUs';
import ProcessTimeline from '../components/ProcessTimeline';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';

export default function Home() {
  return (
    <>
      <Hero />
      <AnimatedStats />
      <Categories />
      <FeaturedProducts />
      {/*<CustomFrameBuilder />*/}
      <BeforeAfterGallery />
      <RecentWorks />
      <WhyChooseUs />
      <ProcessTimeline />
      <Testimonials />
      <FAQ />
    </>
  );
}
