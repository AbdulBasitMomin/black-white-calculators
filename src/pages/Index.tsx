
import { Calculator, Heart, DollarSign, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const calculatorTools = [
  {
    title: "Age Calculator",
    description: "Calculate your exact age in years, months, and days",
    icon: Calculator,
    path: "/age",
    color: "from-gray-800 to-gray-900"
  },
  {
    title: "BMI Calculator",
    description: "Calculate your Body Mass Index and health category",
    icon: Heart,
    path: "/bmi",
    color: "from-gray-800 to-gray-900"
  },
  {
    title: "Currency Converter",
    description: "Convert between different currencies with live rates",
    icon: DollarSign,
    path: "/currency",
    color: "from-gray-800 to-gray-900"
  },
  {
    title: "Days Calculator",
    description: "Calculate days between two dates accurately",
    icon: Calendar,
    path: "/days",
    color: "from-gray-800 to-gray-900"
  }
];

const Index = () => {
  const navigate = useNavigate();

  const scrollToCalculators = () => {
    document.getElementById('calculators')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Simple Everyday
            <br />
            <span className="text-white">Calculators</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-8 animate-fade-in">
            Age, BMI, Currency, Dates — Free, Fast, Accurate.
          </p>
          <Button
            onClick={scrollToCalculators}
            className="bg-white text-black hover:bg-gray-200 text-lg px-8 py-6 rounded-3xl hover-scale button-glow font-semibold"
          >
            Start Calculating
          </Button>
        </div>
      </section>

      {/* Tools Section */}
      <section id="calculators" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Choose Your Tool
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {calculatorTools.map((tool, index) => (
              <Card
                key={tool.title}
                className="bg-black border-gray-800 rounded-3xl hover-scale cursor-pointer button-glow group"
                onClick={() => navigate(tool.path)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8 text-center">
                  <div className="mb-6">
                    <tool.icon className="w-16 h-16 mx-auto text-white group-hover:animate-glow" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">
                    {tool.title}
                  </h3>
                  <p className="text-gray-400 text-lg leading-relaxed">
                    {tool.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-500">
            © 2025 Everyday Tools Hub. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
