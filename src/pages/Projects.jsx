import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// --- Futuristic Animated Dots & Lines Background ---
function FuturisticBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    // Generate random points
    const POINTS = 32;
    let points = Array.from({ length: POINTS }).map(() => ({
      x: Math.random(),
      y: Math.random(),
      dx: (Math.random() - 0.5) * 0.0007,
      dy: (Math.random() - 0.5) * 0.0007
    }));

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function draw(time) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Animate points
      points.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > 1) p.dx *= -1;
        if (p.y < 0 || p.y > 1) p.dy *= -1;
      });

      // Draw lines between close points
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const a = points[i];
          const b = points[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 0.18) {
            ctx.save();
            ctx.strokeStyle = `rgba(157,78,237,${0.13 + 0.13 * (0.18 - dist) / 0.18})`;
            ctx.shadowColor = "#9d4edd";
            ctx.shadowBlur = 8;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(a.x * canvas.width, a.y * canvas.height);
            ctx.lineTo(b.x * canvas.width, b.y * canvas.height);
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      // Draw points
      points.forEach((p, idx) => {
        ctx.save();
        ctx.beginPath();
        ctx.arc(
          p.x * canvas.width,
          p.y * canvas.height,
          6 + Math.sin(time * 0.001 + idx) * 2,
          0,
          2 * Math.PI
        );
        ctx.fillStyle = "rgba(157,78,237,0.22)";
        ctx.shadowColor = "#9d4edd";
        ctx.shadowBlur = 16;
        ctx.fill();
        ctx.restore();
      });
    }

    function animate(time) {
      draw(time);
      animationFrameId = requestAnimationFrame(animate);
    }

    animate(0);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ filter: "blur(0px)", opacity: 0.7, background: "transparent" }}
      aria-hidden="true"
    />
  );
}

// --- Carousel Component ---
function Carousel({ images, interval = 2500, className = "", rounded = "rounded-2xl", showArrows = false }) {
  const [idx, setIdx] = useState(0);
  const timeoutRef = useRef();

  useEffect(() => {
    if (!showArrows) {
      timeoutRef.current = setTimeout(() => {
        setIdx(i => (i + 1) % images.length);
      }, interval);
      return () => clearTimeout(timeoutRef.current);
    }
  }, [idx, images.length, interval, showArrows]);

  const goPrev = e => {
    e?.stopPropagation();
    setIdx(i => (i - 1 + images.length) % images.length);
  };
  const goNext = e => {
    e?.stopPropagation();
    setIdx(i => (i + 1) % images.length);
  };

  return (
    <div className={`relative w-full h-56 overflow-hidden ${rounded} ${className}`}>
      {images.map((img, i) => (
        <motion.img
          key={img}
          src={img}
          alt=""
          className={`absolute w-full h-full object-cover ${i === idx ? "z-10" : "z-0"}`}
          initial={false}
          animate={{
            opacity: i === idx ? 1 : 0,
            scale: i === idx ? 1 : 1.08,
            x: i === idx ? 0 : i < idx ? -40 : 40
          }}
          transition={{
            opacity: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
            scale: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
            x: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
          }}
          style={{ pointerEvents: i === idx ? "auto" : "none" }}
          draggable={false}
        />
      ))}
      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, i) => (
          <button
            key={i}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === idx ? "bg-[#9d4edd]" : "bg-white/30"}`}
            onClick={e => {
              e.stopPropagation();
              setIdx(i);
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
      {/* Arrows for modal */}
      {showArrows && images.length > 1 && (
        <>
          <button
            onClick={goPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-[#9d4edd]/80 text-white rounded-full w-9 h-9 flex items-center justify-center transition"
            aria-label="Previous image"
            tabIndex={0}
            type="button"
          >
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-[#9d4edd]/80 text-white rounded-full w-9 h-9 flex items-center justify-center transition"
            aria-label="Next image"
            tabIndex={0}
            type="button"
          >
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}

// --- Projects Data (with images array) ---
const projects = [
  {
    title: "Neural Vision",
    subtitle: "AI-Powered Image Recognition",
    description:
      "A cutting-edge platform that leverages deep learning to analyze and classify images in real-time. Used in medical diagnostics and smart surveillance.",
    tags: ["AI", "Deep Learning", "Computer Vision"],
    images: [
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80"
    ],
    github: "https://github.com/example/neural-vision",
    deployed: "https://neural-vision.example.com",
    link: "#"
  },
  {
    title: "Pulse",
    subtitle: "IoT Health Monitoring",
    description:
      "Wearable sensors and a real-time dashboard for continuous health tracking. Empowering users and doctors with actionable insights.",
    tags: ["IoT", "Healthcare", "Wearables"],
    images: [
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
    ],
    github: "https://github.com/example/pulse",
    deployed: "https://pulse-health.example.com",
    link: "#"
  },
  {
    title: "Synthwave",
    subtitle: "Generative Music Platform",
    description:
      "An AI-driven music generator that creates unique soundtracks for games, films, and creators. Explore endless sonic possibilities.",
    tags: ["AI", "Music", "Generative"],
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=800&q=80"
    ],
    github: "https://github.com/example/synthwave",
    deployed: "https://synthwave.example.com",
    link: "#"
  }
];

// --- Popup Modal Component ---
function ProjectModal({ project, onClose }) {
  if (!project) return null;
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative bg-gradient-to-br from-[#23203a] via-[#18122B] to-[#393053] rounded-3xl shadow-2xl max-w-lg w-full p-8 border border-[#9d4edd]/30"
            initial={{ scale: 0.85, opacity: 0, y: 60 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 60 }}
            transition={{ type: "spring", duration: 0.4 }}
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="z-50 absolute top-4 right-4 text-[#9d4edd] hover:text-white bg-[#23203a]/60 rounded-full w-9 h-9 flex items-center justify-center transition"
              style={{ boxShadow: "0 2px 12px 0 #0008" }}
              onClick={onClose}
              aria-label="Close"
            >
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M6 6l12 12M6 18L18 6" />
              </svg>
            </button>
            {/* Carousel with arrows */}
            <div className="relative z-10">
              <Carousel images={project.images} rounded="rounded-2xl" className="mb-6 shadow-lg" showArrows />
            </div>
            {/* Title & Subtitle */}
            <h2 className="text-3xl font-extrabold text-[#9d4edd] mb-1">{project.title}</h2>
            <h3 className="text-lg text-[#cbb7f0] italic mb-3">{project.subtitle}</h3>
            {/* Description */}
            <p className="text-gray-200 mb-4">{project.description}</p>
            {/* Tech Stacks */}
            <div className="flex flex-wrap gap-2 mb-5">
              {project.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-gradient-to-r from-[#5a189a] to-[#9d4edd] text-xs font-semibold text-white shadow"
                >
                  {tag}
                </span>
              ))}
            </div>
            {/* Links */}
            <div className="flex gap-4">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center py-2 rounded-xl bg-[#23203a] hover:bg-[#9d4edd] text-[#9d4edd] hover:text-white font-bold transition border border-[#9d4edd]/30"
              >
                GitHub
              </a>
              <a
                href={project.deployed}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center py-2 rounded-xl bg-[#23203a] hover:bg-[#7b2cbf] text-[#7b2cbf] hover:text-white font-bold transition border border-[#7b2cbf]/30"
              >
                Live Site
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-[#18122B] via-[#23203a] to-[#393053] overflow-hidden">
      {/* Futuristic Dots & Lines Background */}
      <FuturisticBackground />

      {/* Soft overlay for eye comfort */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px] pointer-events-none z-0" />

      {/* Title */}
      <header className="relative z-10 pt-20 pb-8 text-center mt-5">
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="bg-gradient-to-r from-[#9d4edd] via-[#7b2cbf] to-[#5a189a] bg-clip-text text-transparent">
            Our Projects
          </span>
        </motion.h1>
        <motion.p
          className="mt-4 text-lg md:text-2xl text-gray-200 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Rare. Visionary. Impactful. Explore our most ambitious creations.
        </motion.p>
      </header>

      {/* Projects Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {projects.map((project, idx) => (
            <motion.button
              type="button"
              onClick={() => setSelected(project)}
              key={project.title}
              className="group relative rounded-[2.5rem] overflow-hidden shadow-2xl bg-gradient-to-br from-[#23203a]/80 via-[#18122B]/90 to-[#393053]/80 border border-[#9d4edd]/20 hover:scale-[1.03] hover:shadow-[0_0_40px_10px_#9d4edd33] transition-all duration-300 outline-none focus:ring-2 focus:ring-[#9d4edd]"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.15, duration: 0.7, type: "spring" }}
              viewport={{ once: true }}
            >
              {/* Carousel in Card */}
              <Carousel images={project.images} rounded="rounded-t-[2.5rem]" />
              {/* Project Content */}
              <div className="p-7 flex flex-col gap-2">
                <h2 className="text-2xl font-extrabold text-[#9d4edd] group-hover:underline tracking-wide drop-shadow">{project.title}</h2>
                <h3 className="text-lg text-[#cbb7f0] italic">{project.subtitle}</h3>
                <p className="text-gray-200 mt-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-gradient-to-r from-[#5a189a] to-[#9d4edd] text-xs font-semibold text-white shadow"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              {/* Neon border glow */}
              <div className="absolute inset-0 rounded-[2.5rem] pointer-events-none border-2 border-[#9d4edd]/30 group-hover:border-[#9d4edd] group-hover:shadow-[0_0_60px_10px_#9d4edd55] transition-all duration-300" />
            </motion.button>
          ))}
        </div>
      </section>

      {/* Popup Modal */}
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </div>
  );
}