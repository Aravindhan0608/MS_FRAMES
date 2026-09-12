import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { FiStar, FiMapPin } from 'react-icons/fi';
import { getPublicReviews } from '../admin/services/api';
import { fadeUp } from '../utils/motionVariants';

export default function Testimonials() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    const fetchReviews = async () => {
      try {
        const data = await getPublicReviews();
        if (isMounted) {
          setReviews(data);
        }
      } catch (err) {
        if (isMounted) {
          setError('Unable to load reviews at the moment.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchReviews();
    return () => {
      isMounted = false;
    };
  }, []);

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

      {/* Loading State */}
      {loading && (
        <div className="py-16 text-center text-white/60 font-body text-xs flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-gold border-t-transparent animate-spin" />
          <span>Loading client testimonials...</span>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="py-12 text-center text-white/60 font-body text-xs">
          {error}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && reviews.length === 0 && (
        <div className="py-12 text-center text-white/60 font-body text-xs">
          No reviews available yet.
        </div>
      )}

      {/* Swiper Carousel */}
      {!loading && !error && reviews.length > 0 && (
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
          {reviews.map((t, idx) => {
            const name = t.customerName || t.name;
            const photo = t.profileImageUrl || t.photo;
            const reviewText = t.reviewText || t.review;
            const rating = t.rating || 5;
            const location = t.location;

            return (
              <SwiperSlide key={t._id || t.id || idx} className="h-auto">
                <div className="h-full rounded-xl2 p-7 border border-gold/20 bg-white/[0.03] hover:border-gold/40 shadow-card hover:shadow-lift transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="flex text-gold text-sm">
                        {Array.from({ length: rating }).map((_, i) => (
                          <FiStar key={i} className="fill-current text-gold" />
                        ))}
                      </div>
                      {location && (
                        <span className="text-[11px] font-body text-white/50 flex items-center gap-1">
                          <FiMapPin className="text-gold" /> {location}
                        </span>
                      )}
                    </div>

                    <p className="text-sm font-body text-white/70 leading-relaxed mb-6 italic">"{reviewText}"</p>
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-gold/15">
                    {photo ? (
                      <img
                        src={photo}
                        alt={name}
                        loading="lazy"
                        className="w-11 h-11 rounded-full object-cover ring-2 ring-gold/40"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-gold/10 border border-gold/30 text-gold font-heading font-bold text-sm flex items-center justify-center shrink-0">
                        {name ? name.charAt(0) : 'C'}
                      </div>
                    )}
                    <div>
                      <h3 className="font-heading font-semibold text-white text-sm">{name}</h3>
                      <p className="text-[10px] font-body text-gold uppercase tracking-wider">Verified Customer</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}

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
