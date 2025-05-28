import { Suspense, lazy } from "react";
import { ArrowRight } from "lucide-react";


// Static imports
import Aurora from "../components/Home/Aurora";
import RotatingText from "../components/Home/RotatingText";
// import ImageCarousel from "../components/Home/ImageCarousel";
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
        <div className="flex flex-col items-center text-center z-10">
          {/* Droid and Rotating Text in the Same Line */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <section className="text-5xl sm:text-4xl md:text-5xl lg:text-7xl font-bold">
              Droid
            </section>
            <section>
              <RotatingText
                texts={['THINK', 'INNOVATE', 'APPLY']}
                mainClassName="font-bold px-2 sm:px-2 md:px-3 bg-[#9d4edd] text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg text-4xl sm:text-3xl md:text-4xl lg:text-6xl"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2500}
              />
            </section>
          </div>
          {/* Action Buttons Centered Below */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 mt-20">
            <a
              href="/contact-us"
              className="inline-flex items-center justify-center px-8 py-3 rounded-xl font-semibold bg-gradient-to-r from-[#5a189a] via-[#7b2cbf] to-[#9d4edd] hover:from-[#5a189a]/90 hover:to-[#9d4edd]/90 text-white shadow-lg transition text-lg"
            >
              Join Us
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <a
              href="/events"
              className="inline-flex items-center justify-center px-8 py-3 rounded-xl font-semibold bg-gradient-to-r from-[#5a189a] via-[#7b2cbf] to-[#9d4edd] hover:from-[#5a189a]/90 hover:to-[#9d4edd]/90 text-white shadow-lg transition text-lg"
            >
              Explore Events
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
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
          
        </div>
      </section>

      {/* Image Carousel Section */}
      {/* <section className="relative mt-10 bg-black">
        <div className="relative h-[600px] sm:h-[500px] md:h-[600px]">
          <h1 className="text-6xl text-center font-extrabold">
            <span className="text-[#9d4edd] underline">Gallery📸</span>
          </h1>
            <h6 className="text-center font-extrabold">(PS: Click to view better)</h6>
          <Suspense fallback={<div>Loading gallery...</div>}>
            <ImageCarousel autoplay={true} />
          </Suspense>
        </div>
      </section> */}

      {/* Team Section */}
      <section className="relative bg-black m-10">
      <Suspense fallback={<div>Loading team...</div>}>
        <TeamSection />
      </Suspense>
      </section>

      {/* Contact Section */}
      <section className="relative mt-10 bg-black text-white">
        <div className="max-w-5xl mx-auto px-4 py-10">
          <h1 className="text-6xl text-center font-extrabold">
            <span className="text-[#9d4edd] underline">Let's Talk🤝</span>
          </h1>
          <Suspense fallback={<div className="text-center">Loading ...</div>}>
            <ContactForm />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
