
import { Calculator, Heart, DollarSign, Calendar, Clock, GraduationCap, Moon, Baby } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import CalculatorCard from "@/components/CalculatorCard";
import BackgroundElements from "@/components/BackgroundElements";
import SEOHead from "@/components/SEOHead";

const calculatorTools = [
  {
    title: "Age Calculator",
    description: "Calculate your exact age in years, months, days, hours, and minutes. Find out when your next birthday is!",
    icon: Calculator,
    path: "/age",
    color: "from-blue-500 to-cyan-600",
    hoverColor: "from-blue-600 to-cyan-700",
    features: ["Precise calculations", "Next birthday countdown"]
  },
  {
    title: "BMI Calculator", 
    description: "Calculate your Body Mass Index with visual BMI scale chart and health category analysis.",
    icon: Heart,
    path: "/bmi",
    color: "from-green-500 to-emerald-600",
    hoverColor: "from-green-600 to-emerald-700",
    features: ["Visual BMI scale", "Health insights"]
  },
  {
    title: "Currency Converter",
    description: "Convert between world currencies with real-time exchange rates. Perfect for travel and business.",
    icon: DollarSign,
    path: "/currency",
    color: "from-purple-500 to-violet-600",
    hoverColor: "from-purple-600 to-violet-700",
    features: ["Real-time rates", "180+ currencies"]
  },
  {
    title: "Days Calculator",
    description: "Calculate the difference between two dates. Perfect for project planning and event management.",
    icon: Calendar,
    path: "/days",
    color: "from-orange-500 to-amber-600",
    hoverColor: "from-orange-600 to-amber-700",
    features: ["Detailed breakdowns", "Time-inclusive calculations"]
  },
  {
    title: "Countdown Timer",
    description: "Create countdown timers for special events, deadlines, or any important date you're anticipating.",
    icon: Clock,
    path: "/countdown",
    color: "from-red-500 to-rose-600",
    hoverColor: "from-red-600 to-rose-700",
    features: ["Real-time updates", "Audio alerts"]
  },
  {
    title: "GPA Calculator",
    description: "Convert GPA to percentage using various international grading systems.",
    icon: GraduationCap,
    path: "/gpa",
    color: "from-amber-500 to-yellow-600",
    hoverColor: "from-amber-600 to-yellow-700",
    features: ["Multiple systems", "Academic guidance"]
  },
  {
    title: "Calorie Calculator",
    description: "Calculate daily calorie needs for weight maintenance, loss, and gain goals.",
    icon: Heart,
    path: "/calorie",
    color: "from-teal-500 to-cyan-600",
    hoverColor: "from-teal-600 to-cyan-700",
    features: ["BMR calculation", "Activity levels"]
  },
  {
    title: "Sleep Calculator",
    description: "Find optimal sleep and wake times based on 90-minute sleep cycles for better rest.",
    icon: Moon,
    path: "/sleep",
    color: "from-indigo-500 to-purple-600",
    hoverColor: "from-indigo-600 to-purple-700",
    features: ["Sleep cycles", "Recovery optimization"]
  },
  {
    title: "Pregnancy Calculator",
    description: "Calculate due date and track pregnancy milestones with detailed timeline information.",
    icon: Baby,
    path: "/pregnancy",
    color: "from-pink-500 to-rose-600",
    hoverColor: "from-pink-600 to-rose-700",
    features: ["Due date prediction", "Milestone tracking"]
  }
];

const Home = () => {
  return (
    <>
      <SEOHead 
        title="Lion Calculator - Premium Calculator Tools"
        description="Experience the next generation of calculation tools. Precision meets elegance in our collection of premium calculators designed for the modern world."
        keywords="calculator, age calculator, BMI calculator, currency converter, days calculator, countdown timer, GPA calculator, calorie calculator, sleep calculator, pregnancy calculator, premium calculators"
      />
      <div className="min-h-screen relative overflow-hidden">
        <BackgroundElements />
        
        <div className="relative z-10 min-h-screen">
          <HeroSection />

          {/* Enhanced Cards Grid */}
          <section className="px-4 sm:px-6 pb-16 sm:pb-20">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
                {calculatorTools.map((tool, index) => (
                  <CalculatorCard
                    key={tool.title}
                    {...tool}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Home;
