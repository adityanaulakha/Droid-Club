import { motion } from "framer-motion";
import { Suspense, lazy } from "react";

// Static imports
import Aurora from "../components/Home/Aurora";
import RotatingText from "../components/Home/RotatingText";
import ImageCarousel from "../components/Home/ImageCarousel";
import ContactForm from "../components/Home/ContactForm";

// Lazy imports
const Squares = lazy(() => import("../components/Home/Squares"));
const TrueFocus = lazy(() => import("../components/Home/TrueFocus"));
const TeamSection = lazy(() => import("../components/Home/TeamSection"));

export default function Home() {
  return (
    <div className="relative w-full bg-black overflow-hidden">
      {/* Hero Section - Aurora + Rotating Text */}
      <section className="relative flex flex-col items-center justify-center h-screen w-full text-white">
        <div className="absolute inset-0 pointer-events-none">
          <Aurora
            colorStops={["#5a189a", "#7b2cbf", "#9d4edd"]}
            blend={0.5}
            amplitude={1.0}
            speed={0.5}
          />
        </div>

        {/* Text Container */}
        <div className="flex flex-col sm:flex-row items-center gap-2 text-center z-10">
          <section className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
            Droid
          </section>
          <section>
            <RotatingText
              texts={['Think', 'Innovate', 'Apply']}
              mainClassName="font-bold px-2 sm:px-2 md:px-3 bg-[#9d4edd] text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg text-3xl sm:text-3xl md:text-4xl lg:text-5xl"
              staggerFrom={"last"}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2000}
            />
          </section>
        </div>
      </section>

      {/* About Section with Squares Background */}
      <section className="relative w-full min-h-screen overflow-hidden">
        {/* Squares Background */}
        <div className="absolute inset-0">
          <Suspense fallback={<div>Loading squares...</div>}>
            <Squares
              speed={0.7}
              squareSize={40}
              direction="diagonal"
              borderColor="#5a189a"
              hoverFillColor="#9d4edd"
            />
          </Suspense>
        </div>

        {/* About Section */}
        <div className="relative z-10 w-full h-full flex flex-col items-center">
          {/* Section Title */}
          <div className="w-full text-center px-4 sm:px-6 lg:px-8 mt-8 mb-4">
            <Suspense fallback={<div>Loading title...</div>}>
              <TrueFocus
                sentence="ABOUT DROID"
                manualMode={false}
                blurAmount={5}
                borderColor="#9d4edd"
                animationDuration={1.5}
                pauseBetweenAnimations={1}
              />
            </Suspense>
          </div>

          {/* About Content Container */}
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-grow flex items-center">
            <div className="w-full border border-[#9d4edd] rounded-xl overflow-hidden bg-black/60 backdrop-blur-md">
              <div className="p-6 md:p-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                  {/* Left Column */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#9d4edd] underline">
                      Pioneering Digital Innovation:
                    </h2>
                    <div className="space-y-4 text-white">
                      <p className="text-base md:text-lg">
                        At Droid, we transform complex technological challenges into elegant solutions.
                        Founded on the principles of creativity and technical excellence, we build
                        digital experiences that push boundaries while remaining intuitive.
                      </p>
                      <p className="text-base md:text-lg">
                        Our interdisciplinary team combines expertise in AI, design, and development
                        to create products that don't just meet current needs—they anticipate future ones.
                      </p>
                    </div>
                  </motion.div>

                  {/* Right Column */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#9d4edd] underline">
                      Our Approach:
                    </h2>

                    <div className="space-y-6">
                      {[{ title: "THINK", desc: "Research-driven strategy that identifies opportunities" },
                        { title: "INNOVATE", desc: "Creative problem-solving that breaks conventional limits" },
                        { title: "APPLY", desc: "Meticulous execution that delivers tangible results" }].map((step, i) => (
                        <motion.div
                          key={i}
                          className="flex items-start md:items-center gap-4"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-[#5a189a] to-[#9d4edd] flex items-center justify-center">
                            <span className="font-bold text-lg text-white">{`0${i + 1}`}</span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-xl text-white">{step.title}</h3>
                            <p className="text-sm md:text-base text-gray-300">{step.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Why Choose Droid Section */}
                <motion.div
                  className="mt-12 pt-10 border-t border-[#5a189a]/40"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-[#9d4edd] underline">
                    Why Choose DROID?
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-white">
                    {[
                      { title: "Future-Proof", desc: "Solutions built with scalability and adaptability in mind" },
                      { title: "Human-Centered", desc: "Technology that enhances human capabilities and experiences" },
                      { title: "Technical Excellence", desc: "Craftsmanship that stands up to the highest standards" }
                    ].map((feature, i) => (
                      <motion.div
                        key={i}
                        className="p-5 rounded-lg border border-[#5a189a]/30 hover:bg-[#5a189a]/20 transition-colors"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <h3 className="font-bold text-xl mb-3 text-center">{feature.title}</h3>
                        <p className="text-center text-gray-300">{feature.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rolling Gallery Section */}
      <section className="relative mt-10 bg-black">
        <div style={{ height: '600px', position: 'relative' }}>
          <h1 className="text-6xl text-center font-extrabold">
            <span className="text-[#9d4edd] underline">Gallery</span>
          </h1>
          <Suspense fallback={<div>Loading gallery...</div>}>
            {/* <RollingGallery autoplay={true} pauseOnHover={true} /> */}
            <ImageCarousel autoplay={true} />
          </Suspense>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative bg-black m-14">
      <Suspense fallback={<div>Loading team...</div>}>
        <TeamSection />
      </Suspense>
      </section>

      {/* Contact Section */}
      <section className="relative mt-10 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4">
          <Suspense fallback={<div className="text-center">Loading ...</div>}>
            <ContactForm />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
