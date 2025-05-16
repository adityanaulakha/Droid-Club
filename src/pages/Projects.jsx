import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
  {
    title: "<CodePunk v1.0/>",
    description: "CodePunk is a tech fest uniting coders, innovators, and builders through challenges, workshops, and hackathons. Fuel your passion. Build the future.",
    tags: ["Hackathon", "Web Dev", "AI"],
    link: "https://github.com/adityanaulakha/-CodePunk-v1.0-",
    deployed: "https://code-punk-v1-0.vercel.app/",
    image: "https://res.cloudinary.com/dqdtbavzj/image/upload/v1747424501/Screenshot_2025-05-17_011029_y93fb8.png",
    techStack: ["React", "Cloudinary", "CHATGPT", "TailwindCSS"],
    highlights: [
      "Innovation, Coding, and Collaboration",
      "AI-powered challenges & judge scoring",
      "End-to-end offline experience, no distractions"
    ]
  },
  {
    title: "DROID Rover",
    description: "A Mars rover simulation robot designed and built by club members, featuring autonomous navigation and real-time video streaming.",
    tags: ["Robotics", "Simulation", "IoT"],
    link: "https://github.com/example/droid-rover",
    deployed: "https://droid-rover.vercel.app/",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    techStack: ["Python", "ROS", "OpenCV", "Raspberry Pi"],
    highlights: [
      "Autonomous pathfinding",
      "Live video feed",
      "Remote control via web"
    ]
  },
  {
    title: "Open Cosmos",
    description: "An open-source platform for space data visualization and collaborative research, connecting students globally.",
    tags: ["Open Source", "Space", "Visualization"],
    link: "https://github.com/example/open-cosmos",
    deployed: "https://open-cosmos.vercel.app/",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    techStack: ["Next.js", "D3.js", "MongoDB"],
    highlights: [
      "Global collaboration tools",
      "Interactive space data visualizations",
      "Open API for researchers"
    ]
  }
  // Add more projects here
];

export default function Projects() {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col items-center">
      {/* Aurora-like background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-[#9d4edd]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[350px] h-[350px] bg-[#5f0a87]/30 rounded-full blur-2xl animate-pulse" />
      </div>

      {/* Section Title */}
      <div className="relative z-10 w-full text-center px-4 sm:px-6 lg:px-8 mt-24 mb-4">
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-[#9d4edd] via-[#5f0a87] to-[#a4508b] bg-clip-text text-transparent drop-shadow-lg tracking-tight"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          PROJECTS
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-gray-300 mt-4 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Discover our most innovative, collaborative, and rare creations—each project is a testament to our passion for technology and teamwork.
        </motion.p>
      </div>

      {/* Redesigned Projects Grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              className="relative group rounded-3xl overflow-hidden shadow-2xl bg-[#18122B] border-2 border-[#9d4edd]/30 hover:border-[#a4508b] transition-all duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx, duration: 0.7 }}
              viewport={{ once: true }}
            >
              {/* Cover image with overlay */}
              <div className="relative h-56 w-full overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#18122B]/90 via-[#9d4edd]/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-[#9d4edd]/80 rounded-full text-xs font-bold text-white shadow"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              {/* Card content */}
              <div className="flex flex-col justify-between p-6 h-[220px]">
                <div>
                  <h2 className="text-2xl font-extrabold mb-2 text-[#9d4edd] tracking-wide group-hover:text-[#a4508b] transition-colors">
                    {project.title}
                  </h2>
                  <p className="text-gray-300 text-base mb-4 line-clamp-3">{project.description}</p>
                </div>
                <button
                  onClick={() => setOpenIdx(idx)}
                  className="mt-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#9d4edd] to-[#5f0a87] text-white font-bold shadow-lg hover:scale-105 transition-transform duration-200 tracking-wide"
                >
                  Explore
                </button>
              </div>
              {/* Glow border effect */}
              <div className="absolute inset-0 pointer-events-none rounded-3xl border-2 border-transparent group-hover:border-[#a4508b] group-hover:shadow-[0_0_32px_4px_#a4508b66] transition-all duration-300" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {openIdx !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[#18122B] rounded-2xl shadow-2xl max-w-lg w-full mx-4 relative overflow-hidden"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <button
                className="absolute top-4 right-4 text-2xl text-[#a4508b] hover:text-[#fff] transition-colors z-10"
                onClick={() => setOpenIdx(null)}
                aria-label="Close"
              >
                &times;
              </button>
              <img
                src={projects[openIdx].image}
                alt={projects[openIdx].title}
                className="w-full h-56 object-cover object-center rounded-t-2xl"
              />
              <div className="p-6">
                <h2 className="text-3xl font-bold mb-2 text-[#9d4edd]">{projects[openIdx].title}</h2>
                <p className="text-gray-200 mb-4">{projects[openIdx].description}</p>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-[#a4508b] mb-1">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {projects[openIdx].techStack.map(tech => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-[#9d4edd]/20 rounded-full text-xs font-semibold text-[#9d4edd] border border-[#9d4edd]/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-[#a4508b] mb-1">Highlights</h3>
                  <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                    {projects[openIdx].highlights.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex gap-4 mt-6">
                  <a
                    href={projects[openIdx].deployed}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-[#9d4edd] to-[#5f0a87] text-white font-bold shadow hover:scale-105 transition-transform"
                  >
                    Live Demo
                  </a>
                  <a
                    href={projects[openIdx].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full border border-[#a4508b] text-[#a4508b] font-bold hover:bg-[#a4508b] hover:text-white transition-colors"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle animated squares background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            className="absolute border border-[#9d4edd]/10 rounded-lg"
            style={{
              width: `${30 + (i % 3) * 20}px`,
              height: `${30 + (i % 3) * 20}px`,
              top: `${Math.random() * 95}%`,
              left: `${Math.random() * 95}%`,
              opacity: 0.12 + (i % 3) * 0.07,
              animation: `floatSquare 6s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes floatSquare {
          0%, 100% { transform: translateY(0px);}
          50% { transform: translateY(-20px);}
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}