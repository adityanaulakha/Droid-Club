import Aurora from "../components/Home/Aurora";
import RotatingText from "../components/Home/RotatingText";
import Squares from "../components/Home/Squares";
import TrueFocus from "../components/Home/TrueFocus";

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

      {/* Squares Section - Placed Below */}
      <section className="relative w-full h-screen overflow-hidden">
        <Squares 
          speed={0.7} 
          squareSize={40}
          direction="diagonal"
          borderColor="#5a189a"
          hoverFillColor="#9d4edd"
        />
        {/* TrueFocus overlayed on top center */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
        <TrueFocus 
          sentence="ABOUT DROID"
          manualMode={false}
          blurAmount={5}
          borderColor="purple"
          animationDuration={1.5}
          pauseBetweenAnimations={1}
        />
      </div>
      </section>
    </div>
  );
}
