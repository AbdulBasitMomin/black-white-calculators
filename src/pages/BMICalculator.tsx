
import { useState } from "react";
import { ArrowLeft, Copy, Check, Heart, Scale } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const BMICalculator = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [unit, setUnit] = useState("metric");
  const [result, setResult] = useState<{
    bmi: number;
    category: string;
    healthStatus: string;
    idealWeight: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const calculateBMI = () => {
    if (!weight || !height) {
      toast({
        title: "Please enter both weight and height",
        variant: "destructive",
      });
      return;
    }

    let weightKg = parseFloat(weight);
    let heightM = parseFloat(height);

    if (unit === "imperial") {
      weightKg = weightKg * 0.453592; // pounds to kg
      heightM = heightM * 0.0254; // inches to meters
    } else {
      heightM = heightM / 100; // cm to meters
    }

    const bmi = weightKg / (heightM * heightM);
    let category: string;
    let healthStatus: string;

    if (bmi < 18.5) {
      category = "Underweight";
      healthStatus = "Consider consulting a healthcare provider";
    } else if (bmi < 25) {
      category = "Normal weight";
      healthStatus = "Keep up the great work!";
    } else if (bmi < 30) {
      category = "Overweight";
      healthStatus = "Consider lifestyle changes";
    } else {
      category = "Obese";
      healthStatus = "Consult with a healthcare provider";
    }

    // Calculate ideal weight range (BMI 18.5-24.9)
    const idealWeightMin = 18.5 * (heightM * heightM);
    const idealWeightMax = 24.9 * (heightM * heightM);
    const idealWeight = `${Math.round(idealWeightMin)}-${Math.round(idealWeightMax)} kg`;

    setResult({
      bmi: Math.round(bmi * 10) / 10,
      category,
      healthStatus,
      idealWeight
    });
  };

  const copyResult = async () => {
    if (!result) return;
    
    const text = `BMI: ${result.bmi} (${result.category}) - ${result.healthStatus}`;
    
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast({
        title: "Copied to clipboard!",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        variant: "destructive",
      });
    }
  };

  const getBMIColor = (bmi: number) => {
    if (bmi < 18.5) return "text-blue-600 dark:text-blue-400";
    if (bmi < 25) return "text-green-600 dark:text-green-400";
    if (bmi < 30) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-200/30 via-pink-200/30 to-blue-200/30 dark:from-purple-400/20 dark:via-pink-300/20 dark:to-blue-400/20 animate-gradientMove"></div>
      <div className="fixed inset-0 bg-gradient-to-tr from-blue-300/20 via-transparent to-purple-300/20 dark:from-blue-600/10 dark:via-transparent dark:to-purple-600/10"></div>
      
      {/* Floating Orbs */}
      <div className="fixed top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-300/60 to-pink-300/60 dark:from-purple-400 dark:to-pink-400 rounded-full blur-3xl opacity-40 dark:opacity-20 animate-float"></div>
      <div className="fixed bottom-32 right-20 w-24 h-24 bg-gradient-to-r from-blue-300/70 to-cyan-300/70 dark:from-blue-400 dark:to-cyan-400 rounded-full blur-2xl opacity-50 dark:opacity-30 animate-float" style={{ animationDelay: "2s" }}></div>
      <div className="fixed top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-pink-300/60 to-purple-300/60 dark:from-pink-400 dark:to-purple-400 rounded-full blur-xl opacity-45 dark:opacity-25 animate-float" style={{ animationDelay: "4s" }}></div>

      <div className="relative z-10 min-h-screen backdrop-blur-[2px] pt-20">
        <div className="max-w-2xl mx-auto px-6 py-8">
          {/* Glass Header */}
          <div className="flex items-center mb-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="mr-4 rounded-full w-12 h-12 glass-button-light text-gray-700 dark:text-white hover:scale-110 shadow-lg"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500/80 to-pink-600/80 rounded-3xl flex items-center justify-center shadow-2xl backdrop-blur-xl border border-white/20">
                <Heart className="w-7 h-7 text-white drop-shadow-sm" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 via-purple-600 to-pink-600 dark:from-white dark:via-purple-100 dark:to-pink-100 bg-clip-text text-transparent drop-shadow-sm">
                BMI Calculator
              </h1>
            </div>
          </div>

          {/* Unit Selection */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <Button
              variant={unit === "metric" ? "default" : "outline"}
              onClick={() => setUnit("metric")}
              className={`p-6 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg ${
                unit === "metric" 
                  ? "bg-gradient-to-r from-purple-500/80 to-pink-600/80 text-white backdrop-blur-xl border border-white/20" 
                  : "glass-button-light text-gray-700 dark:text-white"
              }`}
            >
              <Scale className="w-5 h-5 mr-2" />
              Metric (kg/cm)
            </Button>
            <Button
              variant={unit === "imperial" ? "default" : "outline"}
              onClick={() => setUnit("imperial")}
              className={`p-6 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg ${
                unit === "imperial" 
                  ? "bg-gradient-to-r from-purple-500/80 to-pink-600/80 text-white backdrop-blur-xl border border-white/20" 
                  : "glass-button-light text-gray-700 dark:text-white"
              }`}
            >
              <Scale className="w-5 h-5 mr-2" />
              Imperial (lb/in)
            </Button>
          </div>

          {/* Calculator Card */}
          <Card className="glass-card-light shadow-2xl mb-8 rounded-[2rem] overflow-hidden">
            <CardContent className="p-8">
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="weight" className="text-xl font-semibold text-gray-800 dark:text-white drop-shadow-sm">
                      Weight {unit === "metric" ? "(kg)" : "(lbs)"}
                    </Label>
                    <Input
                      id="weight"
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder={unit === "metric" ? "70" : "154"}
                      className="w-full p-6 text-xl rounded-2xl glass-input text-gray-800 dark:text-white placeholder:text-gray-500 dark:placeholder:text-white/60 transition-all duration-300 shadow-lg"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="height" className="text-xl font-semibold text-gray-800 dark:text-white drop-shadow-sm">
                      Height {unit === "metric" ? "(cm)" : "(inches)"}
                    </Label>
                    <Input
                      id="height"
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder={unit === "metric" ? "175" : "69"}
                      className="w-full p-6 text-xl rounded-2xl glass-input text-gray-800 dark:text-white placeholder:text-gray-500 dark:placeholder:text-white/60 transition-all duration-300 shadow-lg"
                    />
                  </div>
                </div>

                <div className="glass-info-card rounded-2xl p-6">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2 drop-shadow-sm">What is BMI?</h4>
                  <p className="text-sm text-gray-600 dark:text-white/80">
                    Body Mass Index (BMI) is a measure of body fat based on height and weight. It's a useful screening tool for weight categories.
                  </p>
                </div>

                <Button
                  onClick={calculateBMI}
                  className="w-full bg-gradient-to-r from-purple-500/80 to-pink-600/80 hover:from-purple-600/80 hover:to-pink-700/80 text-white font-bold py-6 text-xl rounded-full transition-all duration-300 hover:scale-105 shadow-2xl backdrop-blur-xl border border-white/20"
                >
                  Calculate BMI
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          {result && (
            <div className="space-y-6 animate-fadeIn">
              {/* Main BMI Result */}
              <Card className="glass-card-light shadow-2xl rounded-[2rem] overflow-hidden">
                <CardContent className="p-8 text-center">
                  <h3 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white drop-shadow-sm">Your BMI Results</h3>
                  
                  <div className="mb-8">
                    <div className={`text-5xl font-bold mb-3 drop-shadow-sm ${getBMIColor(result.bmi)}`}>
                      {result.bmi}
                    </div>
                    <div className="text-xl font-semibold text-gray-800 dark:text-white mb-2 drop-shadow-sm">{result.category}</div>
                    <div className="text-gray-600 dark:text-white/80">{result.healthStatus}</div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="glass-card-light rounded-2xl p-6 border border-green-200/30 dark:border-green-500/30">
                      <div className="text-lg font-bold text-gray-800 dark:text-white mb-2 drop-shadow-sm">
                        Ideal Weight Range
                      </div>
                      <div className="text-gray-600 dark:text-white/80">{result.idealWeight}</div>
                    </div>
                    
                    <div className="glass-card-light rounded-2xl p-6 border border-blue-200/30 dark:border-blue-500/30">
                      <div className="text-lg font-bold text-gray-800 dark:text-white mb-2 drop-shadow-sm">
                        Category
                      </div>
                      <div className="text-gray-600 dark:text-white/80">{result.category}</div>
                    </div>
                  </div>
                  
                  <Button
                    onClick={copyResult}
                    variant="outline"
                    className="glass-button-light text-gray-700 dark:text-white rounded-full px-6 py-3 transition-all duration-300 hover:scale-105"
                  >
                    {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                    {copied ? "Copied!" : "Copy Result"}
                  </Button>
                </CardContent>
              </Card>

              {/* BMI Scale */}
              <Card className="glass-card-light shadow-2xl rounded-[2rem] overflow-hidden">
                <CardContent className="p-8">
                  <h4 className="text-lg font-bold mb-4 text-gray-800 dark:text-white drop-shadow-sm">BMI Scale Reference</h4>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 glass-card-light rounded-lg border border-blue-200/30 dark:border-blue-500/30">
                      <span className="font-medium text-gray-800 dark:text-white">Underweight</span>
                      <span className="text-gray-600 dark:text-white/80">Below 18.5</span>
                    </div>
                    <div className="flex justify-between items-center p-3 glass-card-light rounded-lg border border-green-200/30 dark:border-green-500/30">
                      <span className="font-medium text-gray-800 dark:text-white">Normal weight</span>
                      <span className="text-gray-600 dark:text-white/80">18.5 - 24.9</span>
                    </div>
                    <div className="flex justify-between items-center p-3 glass-card-light rounded-lg border border-yellow-200/30 dark:border-yellow-500/30">
                      <span className="font-medium text-gray-800 dark:text-white">Overweight</span>
                      <span className="text-gray-600 dark:text-white/80">25.0 - 29.9</span>
                    </div>
                    <div className="flex justify-between items-center p-3 glass-card-light rounded-lg border border-red-200/30 dark:border-red-500/30">
                      <span className="font-medium text-gray-800 dark:text-white">Obese</span>
                      <span className="text-gray-600 dark:text-white/80">30.0 and above</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BMICalculator;
