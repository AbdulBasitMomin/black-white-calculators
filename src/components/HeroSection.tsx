
import { Calculator } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex items-center justify-center mb-8 sm:mb-10 animate-bounce-soft">
          <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl animate-pulse-glow backdrop-blur-xl border border-white/20">
            <Calculator className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-white drop-shadow-lg" />
          </div>
        </div>
        
        {/* Enhanced Typography */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 sm:mb-8 animate-fadeIn text-shadow leading-tight tracking-tight">
          <span className="bg-gradient-to-r from-gray-800 via-purple-700 to-pink-700 dark:from-white dark:via-purple-200 dark:to-pink-200 bg-clip-text text-transparent block">
            Lion
          </span>
          <span className="bg-gradient-to-r from-purple-700 via-pink-700 to-blue-700 dark:from-purple-300 dark:via-pink-300 dark:to-blue-300 bg-clip-text text-transparent">
            Calculator
          </span>
        </h1>
        
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-700 dark:text-white/90 mb-12 sm:mb-16 leading-relaxed tracking-wide animate-slide-up text-shadow font-light">
            Experience the next generation of calculation tools. Precision meets elegance in our collection of premium calculators designed for the modern world.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
