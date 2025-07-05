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
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900">
      {/* Enhanced Background Layers */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-200/30 via-pink-200/30 to-blue-200/30 dark:from-purple-400/20 dark:via-pink-300/20 dark:to-blue-400/20 animate-gradientMove"></div>
      <div className="fixed inset-0 bg-gradient-to-tr from-blue-300/20 via-transparent to-purple-300/20 dark:from-blue-600/10 dark:via-transparent dark:to-purple-600/10"></div>
      
      {/* Enhanced Floating Orbs with More Sophisticated Animation */}
      <div className="hidden lg:block fixed top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-300/50 to-pink-300/50 dark:from-purple-400/30 dark:to-pink-400/30 rounded-full blur-3xl opacity-60 animate-float"></div>
      <div className="hidden lg:block fixed bottom-32 right-20 w-28 h-28 bg-gradient-to-r from-blue-300/50 to-cyan-300/50 dark:from-blue-400/30 dark:to-cyan-400/30 rounded-full blur-2xl opacity-50 animate-float" style={{ animationDelay: "2s" }}></div>
      <div className="hidden md:block fixed top-1/2 left-1/4 w-20 h-20 bg-gradient-to-r from-pink-300/40 to-purple-300/40 dark:from-pink-400/25 dark:to-purple-400/25 rounded-full blur-xl opacity-45 animate-float" style={{ animationDelay: "4s" }}></div>
      <div className="hidden xl:block fixed top-1/3 right-1/3 w-16 h-16 bg-gradient-to-r from-cyan-300/40 to-blue-300/40 dark:from-cyan-400/25 dark:to-blue-400/25 rounded-full blur-lg opacity-40 animate-float" style={{ animationDelay: "6s" }}></div>

      <div className="relative z-10 min-h-screen pt-20 pb-8">
        {/* Hero Section with proper top spacing */}
        <section className="py-12 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex items-center justify-center mb-8 animate-bounce-soft">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl sm:rounded-[2rem] flex items-center justify-center shadow-2xl animate-pulse-glow backdrop-blur-xl border border-white/20">
                <Calculator className="w-10 h-10 md:w-12 md:h-12 text-white drop-shadow-lg" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fadeIn text-shadow">
              <span className="bg-gradient-to-r from-gray-800 via-purple-600 to-pink-600 dark:from-white dark:via-purple-100 dark:to-pink-100 bg-clip-text text-transparent">
                Lion
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 dark:from-purple-400 dark:via-pink-400 dark:to-cyan-400 bg-clip-text text-transparent">
                Calculator
              </span>
            </h1>
            
            <p className="text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed px-4 animate-slide-up text-shadow line-height-relaxed">
              Experience the next generation of calculation tools. Precision meets elegance in our collection of premium calculators designed for the modern world.
            </p>
          </div>
        </section>

        {/* Cards Grid with consistent spacing and alignment */}
        <section className="px-4 sm:px-6 pb-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {calculatorTools.map((tool, index) => (
                <Card
                  key={tool.title}
                  className="group cursor-pointer h-[520px] flex flex-col glass-card-light border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] rounded-2xl overflow-hidden animate-slide-up backdrop-blur-2xl border border-white/20"
                  onClick={() => navigate(tool.path)}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-8 flex flex-col h-full relative overflow-hidden">
                    {/* Shimmer effect on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <div className="absolute inset-0 animate-shimmer"></div>
                    </div>
                    
                    <div className="relative z-10 flex flex-col h-full">
                      {/* Icon Section - Standardized size */}
                      <div className="h-20 mb-4 flex-shrink-0 flex items-start">
                        <div className={`w-16 h-16 bg-gradient-to-br ${tool.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 backdrop-blur-xl border border-white/20`}>
                          <tool.icon className="w-8 h-8 text-white drop-shadow-lg" />
                        </div>
                      </div>
                      
                      {/* Title Section - Consistent height */}
                      <div className="h-16 mb-4 flex-shrink-0 flex items-start">
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-all duration-500 text-shadow leading-tight">
                          {tool.title}
                        </h3>
                      </div>
                      
                      {/* Description Section - Better line height */}
                      <div className="h-20 mb-4 flex-shrink-0">
                        <p className="text-base text-gray-600 dark:text-white/80 leading-relaxed transition-all duration-300 group-hover:text-gray-700 dark:group-hover:text-white/90 line-clamp-3" style={{ lineHeight: '1.6' }}>
                          {tool.description}
                        </p>
                      </div>
                      
                      {/* Features Section - Consistent spacing */}
                      <div className="h-16 mb-6 flex-shrink-0">
                        <div className="space-y-2">
                          {tool.features.slice(0, 2).map((feature, idx) => (
                            <div key={idx} className="flex items-center text-sm text-gray-500 dark:text-white/70 transition-all duration-300 group-hover:text-gray-600 dark:group-hover:text-white/80">
                              <div className={`w-2 h-2 bg-gradient-to-r ${tool.color} rounded-full mr-3 flex-shrink-0 group-hover:scale-125 transition-transform duration-300`}></div>
                              <span className="line-clamp-1">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Spacer */}
                      <div className="flex-grow"></div>
                      
                      {/* Button Section - Matching gradient colors */}
                      <div className="flex-shrink-0">
                        <Button 
                          className={`w-full font-bold border-0 rounded-2xl py-4 text-base transition-all duration-500 hover:scale-105 bg-gradient-to-r ${tool.color} hover:${tool.hoverColor} text-white shadow-lg hover:shadow-xl backdrop-blur-xl`}
                        >
                          {tool.title.includes('Calculator') ? tool.title.replace(' Calculator', '').includes('Calorie') ? 'Calculate Calories' : `Calculate ${tool.title.replace(' Calculator', '')}` : 
                           tool.title.includes('Converter') ? 'Convert Currency' : 
                           tool.title.includes('Timer') ? 'Start Countdown' : 
                           `Use ${tool.title}`}
                        </Button>
                      </div>
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
