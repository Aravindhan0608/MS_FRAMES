import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { FiStar } from 'react-icons/fi';
import { testimonials } from '../data/testimonials';
import { fadeUp } from '../utils/motionVariants';

export default function Testimonials() {
  return (
    <section className="py-24 px-4 max-w-7xl mx-auto bg-ink">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        className="text-center mb-14"
      >
        <p className="font-body text-gold tracking-[0.25em] uppercase text-xs mb-3">Testimonials</p>
        <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white">Customer Reviews</h2>
        <div className="w-16 h-[2px] bg-gold mx-auto mt-4" />
      </motion.div>

      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={24}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        className="!pb-14"
      >
        {testimonials.map((t) => (
          <SwiperSlide key={t.id}>
            <motion.div
              whileHover={{ y: -8 }}
              className="card-lift h-full rounded-xl2 p-7 border border-gold/15 bg-white/[0.03] hover:border-gold/40 shadow-card hover:shadow-lift transition-colors duration-300"
            >
              <div className="flex text-gold text-sm mb-4">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <FiStar key={idx} className="fill-current" />
                ))}
              </div>
              <p className="text-sm font-body text-white/65 leading-relaxed mb-6">"{t.review}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-gold/10">
                <img src={t.photo} alt={t.name} className="w-11 h-11 rounded-full object-cover ring-2 ring-gold/30" />
                <h4 className="font-heading font-semibold text-white text-sm">{t.name}</h4>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="text-center mt-6">
        <NavLink to="/reviews" className="btn-gold inline-block font-semibold text-xs tracking-wide uppercase px-7 py-3 rounded-full">
          View All Reviews
        </NavLink>
      </div>
    </section>
  );
}
