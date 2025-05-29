
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
  }
];

const Index = () => {
  const navigate = useNavigate();

  const scrollToCalculators = () => {
    document.getElementById('calculators')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white neue-haas">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-6xl mx-auto">
          <h1 className="text-hierarchy-xl mb-6 smooth-fade-in">
            Simple Everyday
            <br />
            <span className="text-white">Calculators</span>
          </h1>
          <p className="text-hierarchy-md text-gray-300 mb-8 smooth-fade-in max-w-3xl mx-auto leading-relaxed">
            Age, BMI, Currency, Dates — Free, Fast, Accurate.
          </p>
          <Button
            onClick={scrollToCalculators}
            className="pill-button bg-white text-black hover:bg-gray-100 electric-glow-strong font-bold"
          >
            Start Calculating
          </Button>
        </div>
      </section>

      {/* Tools Section */}
      <section id="calculators" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-hierarchy-lg text-center mb-12">
            Choose Your Tool
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {calculatorTools.map((tool, index) => (
              <Card
                key={tool.title}
                className="card-electric bg-black border-gray-800 cursor-pointer group"
                onClick={() => navigate(tool.path)}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <CardContent className="p-8 text-center">
                  <div className="mb-6">
                    <tool.icon className="w-16 h-16 mx-auto text-white group-hover:text-cyan-400 transition-colors duration-300" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors duration-300">
                    {tool.title}
                  </h3>
                  <p className="text-gray-300 text-base leading-relaxed">
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
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400 text-base">
            © 2025 Everyday Tools Hub. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
