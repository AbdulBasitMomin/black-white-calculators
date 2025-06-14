
import { Calculator, Heart, DollarSign, Calendar, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const calculatorTools = [
  {
    title: "Age Calculator",
    description: "Calculate your exact age in years, months, and days",
    icon: Calculator,
    path: "/age",
  },
  {
    title: "BMI Calculator", 
    description: "Calculate your Body Mass Index and health category",
    icon: Heart,
    path: "/bmi",
  },
  {
    title: "Currency Converter",
    description: "Convert between different currencies with live rates",
    icon: DollarSign,
    path: "/currency",
  },
  {
    title: "Days Calculator",
    description: "Calculate days between two dates accurately",
    icon: Calendar,
    path: "/days",
  },
  {
    title: "Countdown Timer",
    description: "Create countdown timers for special events",
    icon: Clock,
    path: "/countdown",
  }
];

const Home = () => {
  const navigate = useNavigate();

  const scrollToCalculators = () => {
    document.getElementById('calculators')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white pt-16">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center container mx-auto px-4">
        <div className="text-center w-full">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fadeIn">
            Simple Everyday
            <br />
            <span className="text-blue-600 dark:text-blue-400">Calculators</span>
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 mb-8 animate-fadeIn max-w-3xl mx-auto leading-relaxed">
            Age, BMI, Currency, Dates — Free, Fast, Accurate.
          </p>
          <Button
            onClick={scrollToCalculators}
            className="px-8 py-4 text-lg font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all duration-300 hover:scale-105 animate-fadeIn"
          >
            Start Calculating
          </Button>
        </div>
      </section>

      {/* Tools Section */}
      <section id="calculators" className="py-20 container mx-auto px-4">
        <div className="w-full">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12">
            Choose Your Tool
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {calculatorTools.map((tool, index) => (
              <Card
                key={tool.title}
                className="cursor-pointer group hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                onClick={() => navigate(tool.path)}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-6">
                    <tool.icon className="w-16 h-16 mx-auto text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {tool.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {tool.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
