
import React from "react";
import { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface CalculatorCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  color: string;
  hoverColor: string;
  features: string[];
  index: number;
}

const CalculatorCard: React.FC<CalculatorCardProps> = ({
  title,
  description,
  icon: Icon,
  path,
  color,
  hoverColor,
  features,
  index
}) => {
  const navigate = useNavigate();

  const getButtonText = () => {
    if (title.includes('Calculator')) {
      const name = title.replace(' Calculator', '');
      return name === 'Calorie' ? 'Calculate Calories' : `Calculate ${name}`;
    }
    if (title.includes('Converter')) return 'Convert Currency';
    if (title.includes('Timer')) return 'Start Countdown';
    return `Use ${title}`;
  };

  return (
    <Card
      className={`group cursor-pointer h-full flex flex-col glass-card-light border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02] rounded-2xl overflow-hidden animate-slide-up backdrop-blur-2xl border border-white/30 dark:border-white/10`}
      onClick={() => navigate(path)}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <CardContent className="p-6 sm:p-8 flex flex-col h-full relative overflow-hidden">
        {/* Enhanced Shimmer effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
        </div>
        
        <div className="relative z-10 flex flex-col h-full">
          {/* Enhanced Icon Section */}
          <div className="mb-6 flex-shrink-0">
            <div className={`w-16 h-16 sm:w-18 sm:h-18 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 backdrop-blur-xl border border-white/30`}>
              <Icon className="w-8 h-8 sm:w-9 sm:h-9 text-white drop-shadow-lg" />
            </div>
          </div>
          
          {/* Enhanced Title */}
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-all duration-500 text-shadow leading-tight tracking-tight mb-4">
            {title}
          </h3>
          
          {/* Enhanced Description */}
          <p className="text-sm sm:text-base text-gray-600 dark:text-white/80 leading-relaxed transition-all duration-300 group-hover:text-gray-700 dark:group-hover:text-white/90 mb-6 flex-grow">
            {description}
          </p>
          
          {/* Enhanced Features */}
          <div className="mb-6">
            <div className="space-y-2">
              {features.slice(0, 2).map((feature, idx) => (
                <div key={idx} className="flex items-center text-sm text-gray-500 dark:text-white/70 transition-all duration-300 group-hover:text-gray-600 dark:group-hover:text-white/80">
                  <div className={`w-2 h-2 bg-gradient-to-r ${color} rounded-full mr-3 flex-shrink-0 group-hover:scale-125 transition-transform duration-300`}></div>
                  <span className="leading-tight">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Enhanced Button */}
          <Button 
            className={`w-full font-bold border-0 rounded-2xl py-4 text-base transition-all duration-500 hover:scale-105 bg-gradient-to-r ${color} hover:${hoverColor} text-white shadow-lg hover:shadow-xl backdrop-blur-xl group-hover:shadow-2xl`}
          >
            {getButtonText()}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CalculatorCard;
