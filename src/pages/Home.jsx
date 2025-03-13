import Aurora from "../components/Aurora";
import RotatingText from '../components/RotatingText';

export default function Home() {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Aurora Background */}
      <div className="absolute inset-0">
        <Aurora colorStops={["#5a189a", "#7b2cbf", "#9d4edd"]} blend={0.5} amplitude={1.0} speed={0.5} />
      </div>

      {/* Content Overlay */}
      <header className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
        <div className="flex flex-col sm:flex-row items-center gap-2 text-center">
          <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">Droid Club</span>
          <RotatingText
            texts={['Think', 'Innovate', 'Apply']}
            mainClassName="font-bold px-2 sm:px-2 md:px-3 bg-[#9d4edd] text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
            staggerFrom={"last"}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2000}
          />
        </div>
      </header>
    </div>
  );
}