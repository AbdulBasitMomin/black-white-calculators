
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
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Layers */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-400/20 via-pink-300/20 to-blue-400/20 animate-gradientMove"></div>
      <div className="fixed inset-0 bg-gradient-to-tr from-blue-600/10 via-transparent to-purple-600/10"></div>
      <div className="fixed inset-0 bg-gradient-to-bl from-pink-500/5 via-transparent to-cyan-500/5"></div>
      
      {/* Floating Orbs */}
      <div className="fixed top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-3xl opacity-20 animate-float"></div>
      <div className="fixed bottom-32 right-20 w-24 h-24 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-2xl opacity-30 animate-float" style={{ animationDelay: "2s" }}></div>
      <div className="fixed top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full blur-xl opacity-25 animate-float" style={{ animationDelay: "4s" }}></div>
      <div className="fixed top-1/3 right-1/3 w-20 h-20 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full blur-2xl opacity-20 animate-float" style={{ animationDelay: "1s" }}></div>
      <div className="fixed bottom-1/4 left-1/2 w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full blur-xl opacity-30 animate-float" style={{ animationDelay: "3s" }}></div>

      <div className="relative z-10 min-h-screen backdrop-blur-[2px] pt-20">
        {/* Hero Section */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex items-center justify-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500/80 to-pink-600/80 rounded-[2rem] flex items-center justify-center shadow-2xl backdrop-blur-xl border border-white/20">
                <Calculator className="w-12 h-12 text-white drop-shadow-sm" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent drop-shadow-sm">
                Lion
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-sm">
                Calculator
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-sm">
              Experience the next generation of calculation tools. Precision meets elegance in our collection of premium calculators designed for the modern world.
            </p>

            {/* Featured Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-[2rem] p-6 shadow-2xl">
                <div className="text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-2">9+</div>
                <div className="text-white/80">Premium Tools</div>
              </div>
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-[2rem] p-6 shadow-2xl">
                <div className="text-3xl font-bold bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent mb-2">100%</div>
                <div className="text-white/80">Accurate Results</div>
              </div>
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-[2rem] p-6 shadow-2xl">
                <div className="text-3xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent mb-2">24/7</div>
                <div className="text-white/80">Always Available</div>
              </div>
            </div>
          </div>
        </section>

        {/* Calculators Grid */}
        <section className="px-6 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent mb-4 drop-shadow-sm">
                Premium Calculator Suite
              </h2>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                Discover our collection of meticulously crafted calculators, each designed with precision and elegance in mind.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {calculatorTools.map((tool, index) => (
                <Card
                  key={tool.title}
                  className="group cursor-pointer backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] hover:bg-white/15 rounded-[2rem] overflow-hidden"
                  onClick={() => navigate(tool.path)}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-8">
                    <div className="mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${tool.color} rounded-2xl flex items-center justify-center shadow-2xl mb-4 backdrop-blur-xl border border-white/20 group-hover:scale-110 transition-transform duration-300`}>
                        <tool.icon className="w-8 h-8 text-white drop-shadow-sm" />
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-4 text-white drop-shadow-sm group-hover:text-purple-100 transition-colors duration-300">
                      {tool.title}
                    </h3>
                    
                    <p className="text-white/80 mb-6 leading-relaxed">
                      {tool.description}
                    </p>
                    
                    <div className="space-y-3 mb-8">
                      {tool.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-white/70">
                          <div className="w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-3"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      className={`w-full bg-gradient-to-r ${tool.color} hover:opacity-90 text-white border-0 rounded-2xl py-4 font-semibold text-lg shadow-lg backdrop-blur-xl border border-white/20 transition-all duration-300 group-hover:scale-105`}
                    >
                      {tool.title.includes('Calculator') ? tool.title.replace(' Calculator', '').includes('Calorie') ? 'Calculate Calories' : `Calculate ${tool.title.replace(' Calculator', '')}` : 
                       tool.title.includes('Converter') ? 'Convert Currency' : 
                       tool.title.includes('Timer') ? 'Start Countdown' : 
                       `Use ${tool.title}`}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Call to Action */}
            <div className="text-center mt-20">
              <div className="backdrop-blur-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-white/20 rounded-[3rem] p-12 shadow-3xl max-w-4xl mx-auto">
                <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent mb-4 drop-shadow-sm">
                  Ready to Calculate?
                </h3>
                <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                  Join thousands of users who trust Lion Calculator for their daily computational needs. Experience precision like never before.
                </p>
                <Button 
                  onClick={() => navigate('/age')}
                  className="bg-gradient-to-r from-purple-500/80 to-pink-600/80 hover:from-purple-600/80 hover:to-pink-700/80 text-white px-12 py-4 text-lg rounded-full shadow-2xl backdrop-blur-xl border border-white/20 transition-all duration-300 hover:scale-105"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
