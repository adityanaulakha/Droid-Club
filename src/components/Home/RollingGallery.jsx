import { useEffect, useState, useCallback, useMemo } from "react";
import {
  motion,
  useMotionValue,
  useAnimation,
  useTransform,
} from "framer-motion";

const DEFAULT_IMAGES = [
  "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80",
  "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?q=80",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80",
  "https://images.unsplash.com/photo-1495103033382-fe343886b671?q=80",
  "https://images.unsplash.com/photo-1506781961370-37a89d6b3095?q=80",
  "https://images.unsplash.com/photo-1599576838688-8a6c11263108?q=80",
  "https://images.unsplash.com/photo-1494094892896-7f14a4433b7a?q=80",
  "https://plus.unsplash.com/premium_photo-1664910706524-e783eed89e71?q=80",
  "https://images.unsplash.com/photo-1503788311183-fa3bf9c4bc32?q=80",
  "https://images.unsplash.com/photo-1585970480901-90d6bb2a48b5?q=80",
];

const RollingGallery = ({ autoplay = false, pauseOnHover = false, images = [] }) => {
  const [isSm, setIsSm] = useState(window.innerWidth <= 640);
  const rotation = useMotionValue(0);
  const controls = useAnimation();
  const transform = useTransform(rotation, (val) => `rotate3d(0,1,0,${val}deg)`);

  const imgs = images.length ? images : DEFAULT_IMAGES;
  const faceCount = imgs.length;
  const cylinderWidth = isSm ? 1100 : 1800;
  const faceWidth = useMemo(() => (cylinderWidth / faceCount) * 2, [cylinderWidth, faceCount]);
  const radius = useMemo(() => cylinderWidth / (2 * Math.PI), [cylinderWidth]);

  const dragFactor = 0.05;

  useEffect(() => {
    const onResize = () => setIsSm(window.innerWidth <= 640);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const startSpin = useCallback((startAngle) => {
    controls.start({
      rotateY: [startAngle, startAngle - 360],
      transition: { duration: 20, ease: "linear", repeat: Infinity },
    });
  }, [controls]);

  useEffect(() => {
    autoplay ? startSpin(rotation.get()) : controls.stop();
  }, [autoplay, startSpin, controls, rotation]);

  const onDrag = useCallback((_, info) => {
    controls.stop();
    rotation.set(rotation.get() + info.offset.x * dragFactor);
  }, [controls, rotation]);

  const onDragEnd = useCallback((_, info) => {
    const angle = rotation.get() + info.velocity.x * dragFactor;
    rotation.set(angle);
    if (autoplay) startSpin(angle);
  }, [autoplay, rotation, startSpin]);

  return (
    <div className="relative h-[500px] w-full overflow-hidden">
      {/* Gradient overlays */}
      <div className="absolute top-0 left-0 h-full w-[48px] z-10 bg-gradient-to-l from-transparent to-[#060606]" />
      <div className="absolute top-0 right-0 h-full w-[48px] z-10 bg-gradient-to-r from-transparent to-[#060606]" />

      <div className="flex h-full items-center justify-center [perspective:1000px] [transform-style:preserve-3d]">
        <motion.div
          drag="x"
          dragElastic={0}
          animate={controls}
          onDrag={onDrag}
          onDragEnd={onDragEnd}
          onMouseEnter={() => autoplay && pauseOnHover && controls.stop()}
          onMouseLeave={() => autoplay && pauseOnHover && startSpin(rotation.get())}
          onUpdate={(latest) => {
            if (typeof latest.rotateY === "number") rotation.set(latest.rotateY);
          }}
          style={{
            transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          className="flex min-h-[200px] cursor-grab items-center justify-center"
        >
          {imgs.map((url, i) => (
            <div
              key={i}
              className="group absolute flex p-[8%] md:p-[6%] [backface-visibility:hidden]"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${(360 / faceCount) * i}deg) translateZ(${radius}px)`,
              }}
            >
              <img
                src={url}
                alt={`Gallery Image ${i + 1}`}
                className="pointer-events-none h-[180px] w-[300px] rounded-[15px] border-[3px] border-white object-cover transition-transform duration-300 ease-out group-hover:scale-105 sm:h-[140px] sm:w-[240px]"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default RollingGallery;