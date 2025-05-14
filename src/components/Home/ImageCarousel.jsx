// components/ImageCarousel.tsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

const images = [
  "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=800&q=80",
];

export default function ImageCarousel() {
  return (
    <motion.div
      className="w-full max-w-7xl mx-auto px-4 py-16"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Swiper
        effect="coverflow"
        grabCursor
        centeredSlides
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        loop
        navigation
        slidesPerView={1.2}
        breakpoints={{
          640: { slidesPerView: 1.5 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 2.5 },
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 120,
          modifier: 2.5,
          slideShadows: false,
        }}
        modules={[EffectCoverflow, Navigation, Autoplay]}
        className="w-full group"
      >
        {images.map((src, i) => (
          <SwiperSlide
            key={i}
            className="relative bg-white rounded-xl overflow-hidden shadow-2xl transition-all duration-500 scale-90 opacity-50 swiper-slide"
          >
            <img
              src={src}
              alt={`Slide ${i}`}
              className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Style Swiper buttons */}
      <style jsx global>{`
        .swiper-slide-active {
          transform: scale(1) !important;
          opacity: 1 !important;
        }

        .swiper-button-prev,
        .swiper-button-next {
          background-color: rgba(0, 0, 0, 0.5);
          color: white;
          padding: 10px;
          border-radius: 9999px;
          transition: background-color 0.3s ease;
        }

        .swiper-button-prev:hover,
        .swiper-button-next:hover {
          background-color: rgba(0, 0, 0, 0.8);
        }

        .swiper-button-prev::after,
        .swiper-button-next::after {
          font-size: 18px;
          font-weight: bold;
        }
      `}</style>
    </motion.div>
  );
}
