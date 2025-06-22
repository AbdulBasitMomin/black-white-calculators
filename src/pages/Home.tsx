import { Calculator, Heart, DollarSign, Calendar, Clock, GraduationCap, Moon, Baby } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const calculatorTools = [
  {
    title: "Age Calculator",
    description: "Calculate your exact age in years, months, days, hours, and minutes. Find out when your next birthday is!",
    icon: Calculator,
    path: "/age",
    color: "from-blue-500/80 to-cyan-600/80",
    features: ["Precise calculations", "Next birthday countdown"]
  },
  {
    title: "BMI Calculator", 
    description: "Calculate your Body Mass Index with visual BMI scale chart and health category analysis.",
    icon: Heart,
    path: "/bmi",
    color: "from-green-500/80 to-emerald-600/80",
    features: ["Visual BMI scale", "Health insights"]
  },
  {
    title: "Currency Converter",
    description: "Convert between world currencies with real-time exchange rates. Perfect for travel and business.",
    icon: DollarSign,
    path: "/currency",
    color: "from-purple-500/80 to-violet-600/80",
    features: ["Real-time rates", "180+ currencies"]
  },
  {
    title: "Days Calculator",
    description: "Calculate the difference between two dates. Perfect for project planning and event management.",
    icon: Calendar,
    path: "/days",
    color: "from-orange-500/80 to-amber-600/80",
    features: ["Detailed breakdowns", "Time-inclusive calculations"]
  },
  {
    title: "Countdown Timer",
    description: "Create countdown timers for special events, deadlines, or any important date you're anticipating.",
    icon: Clock,
    path: "/countdown",
    color: "from-red-500/80 to-rose-600/80",
    features: ["Real-time updates", "Audio alerts"]
  },
  {
    title: "GPA Calculator",
    description: "Convert GPA to percentage using various international grading systems.",
    icon: GraduationCap,
    path: "/gpa",
    color: "from-amber-500/80 to-yellow-600/80",
    features: ["Multiple systems", "Academic guidance"]
  },
  {
    title: "Calorie Calculator",
    description: "Calculate daily calorie needs for weight maintenance, loss, and gain goals.",
    icon: Heart,
    path: "/calorie",
    color: "from-teal-500/80 to-cyan-600/80",
    features: ["BMR calculation", "Activity levels"]
  },
  {
    title: "Sleep Calculator",
    description: "Find optimal sleep and wake times based on 90-minute sleep cycles for better rest.",
    icon: Moon,
    path: "/sleep",
    color: "from-indigo-500/80 to-purple-600/80",
    features: ["Sleep cycles", "Recovery optimization"]
  },
  {
    title: "Pregnancy Calculator",
    description: "Calculate due date and track pregnancy milestones with detailed timeline information.",
    icon: Baby,
    path: "/pregnancy",
    color: "from-pink-500/80 to-rose-600/80",
    features: ["Due date prediction", "Milestone tracking"]
  }
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900">
      {/* Simplified Background Layers */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-200/20 via-pink-200/20 to-blue-200/20 dark:from-purple-400/10 dark:via-pink-300/10 dark:to-blue-400/10"></div>
      <div className="fixed inset-0 bg-gradient-to-tr from-blue-300/10 via-transparent to-purple-300/10 dark:from-blue-600/5 dark:via-transparent dark:to-purple-600/5"></div>
      
      {/* Optimized Floating Orbs - Fewer and hidden on mobile */}
      <div className="hidden lg:block fixed top-20 left-10 w-24 h-24 bg-gradient-to-r from-purple-300/40 to-pink-300/40 dark:from-purple-400/20 dark:to-pink-400/20 rounded-full blur-2xl opacity-30 animate-float"></div>
      <div className="hidden lg:block fixed bottom-32 right-20 w-20 h-20 bg-gradient-to-r from-blue-300/40 to-cyan-300/40 dark:from-blue-400/20 dark:to-cyan-400/20 rounded-full blur-xl opacity-40 animate-float" style={{ animationDelay: "2s" }}></div>

      <div className="relative z-10 min-h-screen pt-16 sm:pt-20">
        {/* Hero Section */}
        <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6 sm:mb-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl sm:rounded-[2rem] flex items-center justify-center shadow-2xl">
                <Calculator className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-gray-800 via-purple-600 to-pink-600 dark:from-white dark:via-purple-100 dark:to-pink-100 bg-clip-text text-transparent">
                Lion
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 dark:from-purple-400 dark:via-pink-400 dark:to-cyan-400 bg-clip-text text-transparent">
                Calculator
              </span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-white/80 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
              Experience the next generation of calculation tools. Precision meets elegance in our collection of premium calculators designed for the modern world.
            </p>
          </div>
        </section>

        {/* Calculators Grid */}
        <section className="px-4 sm:px-6 pb-16 sm:pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {calculatorTools.map((tool, index) => (
                <Card
                  key={tool.title}
                  className="group cursor-pointer glass-card-light border-0 shadow-glass hover:shadow-3xl transition-all duration-300 hover:scale-[1.02] rounded-xl sm:rounded-2xl lg:rounded-[2rem] overflow-hidden"
                  onClick={() => navigate(tool.path)}
                >
                  <CardContent className="p-4 sm:p-6 lg:p-8 relative">
                    <div className="relative z-10">
                      <div className="mb-4 sm:mb-6">
                        <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br ${tool.color} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                          <tool.icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                        </div>
                      </div>
                      
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 text-gray-800 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors duration-300">
                        {tool.title}
                      </h3>
                      
                      <p className="text-sm sm:text-base text-gray-600 dark:text-white/80 mb-4 sm:mb-6 leading-relaxed">
                        {tool.description}
                      </p>
                      
                      <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                        {tool.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center text-xs sm:text-sm text-gray-500 dark:text-white/70">
                            <div className="w-1.5 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-2 sm:mr-3 flex-shrink-0"></div>
                            {feature}
                          </div>
                        ))}
                      </div>
                      
                      <Button 
                        className="w-full glass-button-light text-gray-800 dark:text-white font-bold border-0 rounded-xl sm:rounded-2xl py-3 sm:py-4 text-sm sm:text-base lg:text-lg transition-all duration-300 hover:scale-105"
                      >
                        {tool.title.includes('Calculator') ? tool.title.replace(' Calculator', '').includes('Calorie') ? 'Calculate Calories' : `Calculate ${tool.title.replace(' Calculator', '')}` : 
                         tool.title.includes('Converter') ? 'Convert Currency' : 
                         tool.title.includes('Timer') ? 'Start Countdown' : 
                         `Use ${tool.title}`}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
