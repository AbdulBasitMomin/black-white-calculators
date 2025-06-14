
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-green-900 pt-16">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="mr-4 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 w-12 h-12"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">BMI Calculator</h1>
          </div>
        </div>

        {/* Unit Selection */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Button
            variant={unit === "metric" ? "default" : "outline"}
            onClick={() => setUnit("metric")}
            className={`p-6 rounded-2xl ${unit === "metric" ? "bg-green-500 text-white" : "border-gray-200 dark:border-gray-700"}`}
          >
            <Scale className="w-5 h-5 mr-2" />
            Metric (kg/cm)
          </Button>
          <Button
            variant={unit === "imperial" ? "default" : "outline"}
            onClick={() => setUnit("imperial")}
            className={`p-6 rounded-2xl ${unit === "imperial" ? "bg-green-500 text-white" : "border-gray-200 dark:border-gray-700"}`}
          >
            <Scale className="w-5 h-5 mr-2" />
            Imperial (lb/in)
          </Button>
        </div>

        {/* Calculator Card */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl mb-8">
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="weight" className="text-lg font-semibold mb-3 block text-gray-900 dark:text-white">
                    Weight {unit === "metric" ? "(kg)" : "(lbs)"}
                  </Label>
                  <Input
                    id="weight"
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder={unit === "metric" ? "70" : "154"}
                    className="w-full p-4 text-lg rounded-xl border-gray-200 dark:border-gray-700"
                  />
                </div>

                <div>
                  <Label htmlFor="height" className="text-lg font-semibold mb-3 block text-gray-900 dark:text-white">
                    Height {unit === "metric" ? "(cm)" : "(inches)"}
                  </Label>
                  <Input
                    id="height"
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder={unit === "metric" ? "175" : "69"}
                    className="w-full p-4 text-lg rounded-xl border-gray-200 dark:border-gray-700"
                  />
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6">
                <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">What is BMI?</h4>
                <p className="text-sm text-green-600 dark:text-green-400">
                  Body Mass Index (BMI) is a measure of body fat based on height and weight. It's a useful screening tool for weight categories.
                </p>
              </div>

              <Button
                onClick={calculateBMI}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 text-lg rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
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
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Your BMI Results</h3>
                
                <div className="mb-6">
                  <div className={`text-5xl font-bold mb-2 ${getBMIColor(result.bmi)}`}>
                    {result.bmi}
                  </div>
                  <div className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{result.category}</div>
                  <div className="text-gray-600 dark:text-gray-300">{result.healthStatus}</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-2xl p-6">
                    <div className="text-lg font-bold text-green-600 dark:text-green-400 mb-2">
                      Ideal Weight Range
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">{result.idealWeight}</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-2xl p-6">
                    <div className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-2">
                      Category
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">{result.category}</div>
                  </div>
                </div>
                
                <Button
                  onClick={copyResult}
                  variant="outline"
                  className="border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full px-6 py-3"
                >
                  {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                  {copied ? "Copied!" : "Copy Result"}
                </Button>
              </CardContent>
            </Card>

            {/* BMI Scale */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-8">
                <h4 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">BMI Scale Reference</h4>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <span className="font-medium text-blue-700 dark:text-blue-300">Underweight</span>
                    <span className="text-blue-600 dark:text-blue-400">Below 18.5</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="font-medium text-green-700 dark:text-green-300">Normal weight</span>
                    <span className="text-green-600 dark:text-green-400">18.5 - 24.9</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <span className="font-medium text-yellow-700 dark:text-yellow-300">Overweight</span>
                    <span className="text-yellow-600 dark:text-yellow-400">25.0 - 29.9</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <span className="font-medium text-red-700 dark:text-red-300">Obese</span>
                    <span className="text-red-600 dark:text-red-400">30.0 and above</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default BMICalculator;
