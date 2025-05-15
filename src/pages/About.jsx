import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-[#2d0066] to-[#9d4edd] text-white flex items-center justify-center p-6 overflow-hidden">
      {/* Aurora & Particle Glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-[#9d4edd]/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[350px] h-[350px] bg-[#5f0a87]/40 rounded-full blur-2xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 w-[200px] h-[200px] bg-[#fff]/10 rounded-full blur-2xl opacity-30 animate-spin-slow" />
        {/* Particle Stars */}
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/30 rounded-full"
            style={{
              width: `${Math.random() * 3 + 2}px`,
              height: `${Math.random() * 3 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: "blur(0.5px)",
              opacity: Math.random() * 0.7 + 0.2,
              animation: `twinkle ${2 + Math.random() * 2}s infinite alternate`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      <div className="relative w-full max-w-6xl bg-black/80 border border-[#9d4edd] rounded-3xl shadow-2xl backdrop-blur-xl p-8 md:p-20 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#9d4edd] via-[#5f0a87] to-[#a4508b] drop-shadow-lg animate-gradient-x">
            <span className="inline-block">DROID</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-12 text-center leading-relaxed font-light">
            <span className="font-semibold text-[#9d4edd]">DROID</span> is a rare breed—a fusion of visionaries, makers, and rebels, united by the thrill of invention. We are the architects of tomorrow, blending code, creativity, and community to shape a digital world that inspires awe.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#9d4edd]/20 to-[#5f0a87]/10 rounded-2xl p-6 shadow-lg border border-[#9d4edd]/30"
          >
            <h2 className="text-2xl font-bold text-[#9d4edd] mb-3">Our Ethos</h2>
            <ul className="space-y-2 text-gray-300 text-lg">
              <li>✨ Dream fearlessly</li>
              <li>⚡ Build relentlessly</li>
              <li>🌐 Connect globally</li>
              <li>🚀 Disrupt positively</li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#5f0a87]/20 to-[#a4508b]/10 rounded-2xl p-6 shadow-lg border border-[#5f0a87]/30"
          >
            <h2 className="text-2xl font-bold text-[#a4508b] mb-3">What We Do</h2>
            <ul className="space-y-2 text-gray-300 text-lg">
              <li>🤖 AI & Robotics Labs</li>
              <li>🧠 Futuristic Hackathons</li>
              <li>🛰️ Open-source Missions</li>
              <li>🎤 Tech Talks & Mentorship</li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#a4508b]/20 to-[#9d4edd]/10 rounded-2xl p-6 shadow-lg border border-[#a4508b]/30"
          >
            <h2 className="text-2xl font-bold text-[#5f0a87] mb-3">Why Join?</h2>
            <ul className="space-y-2 text-gray-300 text-lg">
              <li>🌟 Be part of a rare, vibrant tribe</li>
              <li>🧬 Collaborate on legendary projects</li>
              <li>🎯 Shape the future, today</li>
              <li>💡 Find your spark—and ignite others</li>
            </ul>
          </motion.div>
        </div>
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-[#9d4edd] mb-3">Ready to Build the Unimaginable?</h2>
          <p className="text-gray-300 text-lg mb-6">
            If you crave challenge, creativity, and a community that feels like home—DROID is your launchpad. <br />
            <span className="text-[#a4508b] font-semibold">Dare to join the rare.</span>
          </p>
          <a
            href="/contact-us"
            className="inline-block px-10 py-4 rounded-full bg-gradient-to-r from-[#9d4edd] to-[#5f0a87] text-white font-bold shadow-xl hover:scale-105 transition-transform duration-200 tracking-wide"
          >
            Join the Movement
          </a>
        </motion.div>
      </div>
      {/* Custom animation for rare effect */}
      <style>{`
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease-in-out infinite;
        }
        @keyframes gradient-x {
          0%, 100% { background-position: left center; }
          50% { background-position: right center; }
        }
        .animate-spin-slow {
          animation: spin 12s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
        @keyframes twinkle {
          from { opacity: 0.3; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}