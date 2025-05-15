import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "./ImageCarousel.css"; // 👈 Create this CSS file (see below)

const images = [
  "https://res.cloudinary.com/dqdtbavzj/image/upload/v1747302409/IMG-20240911-WA0012_zquvcd.jpg",
  "https://res.cloudinary.com/dqdtbavzj/image/upload/v1747302408/IMG-20240916-WA0023_rrntxt.jpg",
  "https://res.cloudinary.com/dqdtbavzj/image/upload/v1747302397/IMG-20240921-WA0207_yaszsd.jpg",
  "https://res.cloudinary.com/dqdtbavzj/image/upload/v1747302393/IMG-20250214-WA0049_fwot1a.jpg",
  "https://res.cloudinary.com/dqdtbavzj/image/upload/v1747301495/IMG-20241201-WA0208_uzntzb.jpg",
  "https://res.cloudinary.com/dqdtbavzj/image/upload/v1747301505/IMG-20241127-WA0125_uehrwp.jpg",
  "https://res.cloudinary.com/dqdtbavzj/image/upload/v1747301503/IMG-20241201-WA0300_dyhts5.jpg",
];

export default function ImageCarousel() {
  const [selectedImage, setSelectedImage] = useState(null);

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
            className="relative bg-white rounded-xl overflow-hidden shadow-2xl transition-all duration-500 scale-90 opacity-50 cursor-pointer"
            onClick={() => setSelectedImage(src)}
          >
            <img
              src={src}
              alt={`Slide ${i}`}
              className="w-full h-[300px] sm:h-[400px] object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-3xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-white text-3xl font-bold z-50"
              onClick={() => setSelectedImage(null)}
            >
              &times;
            </button>
            <img
              src={selectedImage}
              alt="Full View"
              className="w-full h-auto max-h-[90vh] rounded-xl shadow-lg"
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}
