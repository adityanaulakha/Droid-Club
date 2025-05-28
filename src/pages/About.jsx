import React, { Suspense, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { 
  Code2, 
  Cpu,  
  Users, 
  Rocket, 
  Brain, 
  GitBranch, 
  Terminal,
  ChevronRight,
  ExternalLink,
  Star,
} from "lucide-react";
import ImageCarousel from "../components/Home/ImageCarousel";
import Silk from "../components/Silk";

const About = () => {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // Animated counter hook
  const useAnimatedCounter = (end, duration = 2000, inView) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      if (!inView) return;
      
      let startTime;
      let animationFrame;
      
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        
        setCount(Math.floor(progress * end));
        
        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };
      
      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, inView]);
    
    return count;
  };

  const StatsCard = ({ number, label, icon, delay = 0 }) => {
    const ref = React.useRef(null);
    const inView = useInView(ref, { once: true });
    const animatedNumber = useAnimatedCounter(parseInt(number), 2000, inView);
    
    return (
      <motion.div
        ref={ref}
        className="relative group"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay }}
        viewport={{ once: true }}
      >
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 text-center hover:border-[#9d4edd]/50 transition-all duration-500 group-hover:scale-105">
          <div className="text-[#9d4edd] mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
          <div className="text-4xl font-bold text-white mb-2">
            {animatedNumber}{number.includes('+') ? '+' : ''}
          </div>
          <div className="text-gray-400 font-medium">{label}</div>
        </div>
      </motion.div>
    );
  };

  const FeatureCard = ({ icon, title, description, gradient, delay = 0 }) => (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
    >
      <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl" 
           style={{ background: gradient }}></div>
      
      <div className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-all duration-500 group-hover:transform group-hover:scale-105">
        <div className="text-[#9d4edd] mb-6 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#9d4edd] transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
          {description}
        </p>
      </div>
    </motion.div>
  );

  const TimelineItem = ({ year, title, description, isLast, delay = 0 }) => (
    <motion.div
      className="relative flex gap-8 pb-12"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
    >
      <div className="relative flex flex-col items-center">
        <div className="w-4 h-4 bg-[#9d4edd] rounded-full shadow-lg shadow-[#9d4edd]/50 z-10"></div>
        {!isLast && <div className="w-0.5 bg-gradient-to-b from-[#9d4edd] to-gray-800 h-full mt-4"></div>}
      </div>
      
      <div className="flex-1 -mt-2">
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-[#9d4edd]/50 transition-all duration-300">
          <div className="text-[#9d4edd] font-bold text-lg mb-2">{year}</div>
          <h4 className="text-xl font-semibold text-white mb-3">{title}</h4>
          <p className="text-gray-400 leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  );

  return (
    <main className="bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <section className="min-h-screen relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Silk
            speed={5}
            scale={1}
            color="#9d4edd"
            noiseIntensity={1.5}
            rotation={0}
          />
        </div>
        
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 text-center max-w-6xl mx-auto px-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-3 bg-black/80 backdrop-blur-sm border border-gray-300 rounded-full px-6 py-3 mb-8 shadow-2xl">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white font-medium">Tech Innovation Hub</span>
            </div>
          </motion.div>

          <motion.h1
            className="text-6xl md:text-8xl font-black mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-[#f8f9fa] bg-clip-text text-transparent drop-shadow-2xl">
              DROID
            </span>
            <br />
            <span className="bg-[#f8f9fa] bg-clip-text text-transparent drop-shadow-2xl">
              CLUB
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-100 mb-12 max-w-3xl mx-auto leading-relaxed font-medium bg-black/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Where <span className="text-[#9d4edd] font-bold">innovation</span> meets 
            <span className="text-[#9d4edd] font-bold"> execution</span>. 
            Building the future, one line of code at a time.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a 
                href="/projects" 
                className="group relative overflow-hidden bg-gradient-to-r from-[#5a189a] via-[#7b2cbf] to-[#9d4edd] px-8 py-4 rounded-full font-bold text-lg text-white hover:shadow-2xl hover:shadow-[#9d4edd] transition-all duration-300"
            >
                <span className="relative z-10 flex items-center gap-2">
                Explore Projects <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#9d4edd] to-[#5a189a] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            
            <a 
                href="/contact-us" 
                className="group border-2 border-white hover:border-[#9d4edd] px-10 py-5 rounded-full font-bold text-lg text-white hover:text-[#9d4edd] transition-all duration-300 bg-black/70 backdrop-blur-sm"
            >
                <span className="flex items-center justify-center gap-2">
                <GitBranch className="w-6 h-6 group-hover:scale-110 transition-transform" />
                Join Community
                </span>
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-24 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatsCard number="30+" label="Active Members" icon={<Users className="w-8 h-8" />} delay={0} />
            <StatsCard number="15+" label="Projects Built" icon={<Code2 className="w-8 h-8" />} delay={0.1} />
            <StatsCard number="20+" label="Workshops" icon={<Brain className="w-8 h-8" />} delay={0.2} />
            <StatsCard number="10+" label="Awards Won" icon={<Star className="w-8 h-8" />} delay={0.3} />
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 relative">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#9d4edd] to-[#5a189a] bg-clip-text text-transparent">
                Our Mission
              </span>
              <span className="ml-4 text-6xl">🏢</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              To create a thriving ecosystem where students transform from consumers of technology 
              to creators of innovation. We don't just teach—we inspire, challenge, and empower.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Code2 className="w-12 h-12" />}
              title="Code & Create"
              description="From web apps to AI models, we build real solutions for real problems. Every project is a step toward mastery."
              gradient="linear-gradient(135deg, #9d4edd 0%, #5a189a 100%)"
              delay={0}
            />
            <FeatureCard
              icon={<Cpu className="w-12 h-12" />}
              title="Hardware Hacking"
              description="IoT devices, robotics, and embedded systems. We bridge the gap between software and physical world."
              gradient="linear-gradient(135deg, #9d4edd 0%, #5a189a 100%)"
              delay={0.1}
            />
            <FeatureCard
              icon={<Rocket className="w-12 h-12" />}
              title="Innovation Lab"
              description="Cutting-edge research in IOT, AI/ML, and Emerging tech. We're not just following trends—we're setting them."
              gradient="linear-gradient(135deg, #9d4edd 0%, #5a189a 100%)"
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-24 bg-gray-900/20 relative">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#9d4edd] to-[#5a189a] bg-clip-text text-transparent">
                Our Journey 
              </span>
              <span className="ml-4 text-6xl">✈️</span>
            </h2>
            <p className="text-xl text-gray-300">Evolution through innovation</p>
          </motion.div>

          <div className="relative">
            <TimelineItem
              year="2021"
              title="Genesis"
              description="Born from a simple idea: what if students could build anything they imagined? The foundation was laid with our first 20 members."
              delay={0}
            />
            <TimelineItem
              year="2022"
              title="First Impact"
              description="CodePunk v1.0 launched with 200+ participants. Major workshops in AI/ML and web development established our reputation."
              delay={0.1}
            />
            <TimelineItem
              year="2023"
              title="Innovation Breakthrough"
              description="ATOM Robot project won national recognition. TechFest attracted 1000+ students from across the region."
              delay={0.2}
            />
            <TimelineItem
              year="2024"
              title="Digital Transformation"
              description="Complete platform overhaul, expanded online presence, and established partnerships with leading tech companies."
              isLast={true}
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="pt-16 pb-5 relative bg-gray-900/10">
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              <span className="bg-gradient-to-r from-[#5a189a] via-[#7b2cbf] to-[#9d4edd] bg-clip-text text-transparent">
                Gallery
              </span>
              <span className="ml-4 text-6xl">📸</span>
            </h2>
            <p className="text-xl text-gray-300">Moments that define our journey</p>
            <div className="inline-flex items-center gap-2 mt-4 text-gray-400">
              <ExternalLink className="w-4 h-4" />
              <span>Click images to view in full resolution</span>
            </div>
          </motion.div>

          <motion.div
            className="relative h-[900px] rounded-3xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Suspense 
              fallback={
                <div className="w-full h-full bg-gray-900/50 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center">
                    <div className="relative w-16 h-16 mx-auto mb-6">
                      <div className="absolute inset-0 border-4 border-[#9d4edd]/30 rounded-full"></div>
                      <div className="absolute inset-0 border-4 border-[#9d4edd] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <p className="text-[#9d4edd] font-semibold text-lg">Loading memories...</p>
                  </div>
                </div>
              }
            >
              <ImageCarousel
                autoplay={true}
                className="w-full h-full"
                imageClassName="object-cover w-full h-full"
              />
            </Suspense>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <Silk
            speed={2}
            scale={1.2}
            color="#9d4edd"
            noiseIntensity={1.8}
            rotation={-30}
          />
        </div>
        
        <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              <span className="bg-white bg-clip-text text-transparent drop-shadow-2xl">
                Ready to Build the Future?
              </span>
            </h2>
            
            <p className="text-xl text-gray-100 mb-12 leading-relaxed font-medium bg-black/70 backdrop-blur-sm p-6 rounded-2xl border border-gray-300">
              Join a community of makers, thinkers, and innovators. 
              Your next breakthrough is just one project away.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <a 
                href="/contact-us" 
                className="group relative overflow-hidden bg-gradient-to-r from-[#9d4edd] to-[#5a189a] px-10 py-5 rounded-full font-bold text-lg text-white hover:shadow-2xl hover:shadow-[#9d4edd] transition-all duration-300"
                >
                <span className="relative z-10 flex items-center justify-center gap-2">
                <Rocket className="w-6 h-6 group-hover:-rotate-12 transition-transform" />
                Start Your Journey
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#9d4edd] to-[#5a189a] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
              
              <a 
                href="/projects" 
                className="group relative overflow-hidden border-2 border-white px-8 py-4 rounded-full font-bold text-lg text-white hover:shadow-2xl hover:shadow-[#9d4edd] transition-all duration-300"
                >
                <span className="relative z-10 flex items-center gap-2">
                    View Projects <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#9d4edd] to-[#5a189a] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default About;