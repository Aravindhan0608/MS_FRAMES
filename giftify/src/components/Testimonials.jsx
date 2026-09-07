import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { FiStar, FiMapPin } from 'react-icons/fi';
import { allReviews } from '../data/testimonials';
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
        <p className="font-body text-gold tracking-[0.25em] uppercase text-xs mb-3">Authentic Client Feedback</p>
        <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white">What Our Customers Say</h2>
        <div className="w-16 h-[2px] bg-gold mx-auto mt-4" />
      </motion.div>

      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={24}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="!pb-14"
      >
        {allReviews.map((t) => (
          <SwiperSlide key={t.id} className="h-auto">
            <div className="h-full rounded-xl2 p-7 border border-gold/20 bg-white/[0.03] hover:border-gold/40 shadow-card hover:shadow-lift transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex text-gold text-sm">
                    {Array.from({ length: t.rating }).map((_, idx) => (
                      <FiStar key={idx} className="fill-current text-gold" />
                    ))}
                  </div>
                  {t.location && (
                    <span className="text-[11px] font-body text-white/50 flex items-center gap-1">
                      <FiMapPin className="text-gold" /> {t.location}
                    </span>
                  )}
                </div>

                <p className="text-sm font-body text-white/70 leading-relaxed mb-6 italic">"{t.review}"</p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-gold/15">
                <img
                  src={t.photo}
                  alt={t.name}
                  loading="lazy"
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-gold/40"
                />
                <div>
                  <h3 className="font-heading font-semibold text-white text-sm">{t.name}</h3>
                  <p className="text-[10px] font-body text-gold uppercase tracking-wider">Verified Customer</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="text-center mt-6">
        <Link
          to="/reviews"
          className="btn-gold inline-block font-bold text-xs tracking-wider uppercase px-8 py-3.5 rounded-full shadow-gold"
        >
          View All Customer Reviews
        </Link>
      </div>
    </section>
  );
}
