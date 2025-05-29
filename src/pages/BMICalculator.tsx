import { useState } from "react";
import { ArrowLeft, Copy, Check, Heart, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const BMICalculator = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("metric");
  const [result, setResult] = useState<{
    bmi: number;
    category: string;
    color: string;
    riskLevel: string;
    idealWeightRange: { min: number; max: number };
    healthTips: string[];
    bmiCategoryData: any[];
    riskGaugeData: any[];
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { 
      category: "Underweight", 
      color: "text-blue-400", 
      riskLevel: "Low Risk",
      riskColor: "#3B82F6",
      tips: ["Increase caloric intake with nutrient-dense foods", "Include protein-rich meals", "Consider consulting a nutritionist"]
    };
    if (bmi < 25) return { 
      category: "Normal weight", 
      color: "text-green-400", 
      riskLevel: "Healthy",
      riskColor: "#10B981",
      tips: ["Maintain current healthy lifestyle", "Continue regular exercise", "Keep balanced nutrition"]
    };
    if (bmi < 30) return { 
      category: "Overweight", 
      color: "text-yellow-400", 
      riskLevel: "Moderate Risk",
      riskColor: "#F59E0B",
      tips: ["Incorporate regular cardio exercise", "Focus on portion control", "Increase vegetable intake"]
    };
    return { 
      category: "Obese", 
      color: "text-red-400", 
      riskLevel: "High Risk",
      riskColor: "#EF4444",
      tips: ["Consult healthcare provider", "Start with low-impact exercises", "Consider professional weight management"]
    };
  };

  const getIdealWeightRange = (heightCm: number) => {
    const heightM = heightCm / 100;
    const minWeight = 18.5 * heightM * heightM;
    const maxWeight = 24.9 * heightM * heightM;
    return { min: Math.round(minWeight), max: Math.round(maxWeight) };
  };

  const getBMICategoryData = (userBMI: number) => [
    { category: "Underweight", range: "< 18.5", value: 18.5, userHere: userBMI < 18.5, color: "#3B82F6" },
    { category: "Normal", range: "18.5-24.9", value: 21.7, userHere: userBMI >= 18.5 && userBMI < 25, color: "#10B981" },
    { category: "Overweight", range: "25-29.9", value: 27.5, userHere: userBMI >= 25 && userBMI < 30, color: "#F59E0B" },
    { category: "Obese", range: "≥ 30", value: 35, userHere: userBMI >= 30, color: "#EF4444" },
  ];

  const getRiskGaugeData = (bmi: number) => {
    const percentage = Math.min((bmi / 40) * 100, 100);
    return [
      { name: "Current", value: percentage, color: "#00FFFF" },
      { name: "Remaining", value: 100 - percentage, color: "#333333" },
    ];
  };

  const calculateBMI = () => {
    if (!height || !weight) {
      toast({
        title: "Please enter both height and weight",
        variant: "destructive",
      });
      return;
    }

    let heightInM, weightInKg;

    if (unit === "metric") {
      heightInM = parseFloat(height) / 100;
      weightInKg = parseFloat(weight);
    } else {
      heightInM = parseFloat(height) * 0.3048;
      weightInKg = parseFloat(weight) * 0.453592;
    }

    if (heightInM <= 0 || weightInKg <= 0) {
      toast({
        title: "Please enter valid positive numbers",
        variant: "destructive",
      });
      return;
    }

    const bmi = weightInKg / (heightInM * heightInM);
    const { category, color, riskLevel, tips } = getBMICategory(bmi);
    const idealWeightRange = getIdealWeightRange(heightInM * 100);
    const bmiCategoryData = getBMICategoryData(bmi);
    const riskGaugeData = getRiskGaugeData(bmi);

    setResult({
      bmi: Math.round(bmi * 10) / 10,
      category,
      color,
      riskLevel,
      idealWeightRange,
      healthTips: tips,
      bmiCategoryData,
      riskGaugeData
    });
  };

  const copyResult = async () => {
    if (!result) return;
    
    const text = `My BMI: ${result.bmi} (${result.category}). Risk Level: ${result.riskLevel}. Ideal weight: ${result.idealWeightRange.min}-${result.idealWeightRange.max}kg`;
    
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

  return (
    <div className="min-h-screen min-h-[100dvh] bg-black text-white container-responsive section-spacing neue-haas safe-area-top safe-area-bottom">
      <div className="max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="flex items-center mb-6 sm:mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="mr-4 sm:mr-6 rounded-full hover:bg-gray-800 electric-glow touch-target w-12 h-12 sm:w-14 sm:h-14"
          >
            <ArrowLeft className="w-5 h-5 sm:w-7 sm:h-7" />
          </Button>
          <h1 className="text-hierarchy-lg">BMI Calculator</h1>
        </div>

        {/* Calculator Card */}
        <Card className="card-electric bg-black border-gray-800 mb-6 sm:mb-8">
          <CardContent className="card-spacing">
            <div className="space-y-6 sm:space-y-8">
              {/* Unit Selection */}
              <div>
                <Label className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 block">Unit System</Label>
                <Select value={unit} onValueChange={setUnit}>
                  <SelectTrigger className="input-electric">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700 z-50 rounded-[20px] sm:rounded-[30px]">
                    <SelectItem value="metric">Metric (cm, kg)</SelectItem>
                    <SelectItem value="imperial">Imperial (ft, lbs)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Height Input */}
              <div>
                <Label htmlFor="height" className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 block">
                  Height {unit === "metric" ? "(cm)" : "(ft)"}
                </Label>
                <Input
                  id="height"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder={unit === "metric" ? "170" : "5.7"}
                  className="input-electric"
                  step={unit === "metric" ? "1" : "0.1"}
                />
              </div>

              {/* Weight Input */}
              <div>
                <Label htmlFor="weight" className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 block">
                  Weight {unit === "metric" ? "(kg)" : "(lbs)"}
                </Label>
                <Input
                  id="weight"
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder={unit === "metric" ? "70" : "154"}
                  className="input-electric"
                  step="0.1"
                />
              </div>

              <Button
                onClick={calculateBMI}
                className="pill-button w-full bg-white text-black hover:bg-gray-100 electric-glow-strong font-bold touch-target"
              >
                Calculate BMI
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {result && (
          <div className="space-y-4 sm:space-y-6 smooth-fade-in">
            {/* Main BMI Display */}
            <Card className="card-electric bg-black border-gray-800">
              <CardContent className="card-spacing text-center">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Your BMI Results</h3>
                <div className="mb-4 sm:mb-6">
                  <div className="text-4xl sm:text-5xl font-bold text-cyan-400 mb-2 sm:mb-3">{result.bmi}</div>
                  <div className={`text-lg sm:text-xl font-semibold mb-1 sm:mb-2 ${result.color}`}>
                    {result.category}
                  </div>
                  <div className="text-base sm:text-lg text-gray-300">
                    Risk Level: {result.riskLevel}
                  </div>
                </div>
                
                <Button
                  onClick={copyResult}
                  variant="outline"
                  className="border-gray-600 text-white hover:bg-gray-800 electric-glow rounded-full px-4 py-2 sm:px-6 sm:py-3 touch-target"
                >
                  {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                  {copied ? "Copied!" : "Copy Result"}
                </Button>
              </CardContent>
            </Card>

            {/* Health Insights */}
            <div className="grid-responsive">
              <Card className="card-electric bg-black border-gray-800">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-cyan-400" />
                    <h4 className="text-base sm:text-lg font-bold">Ideal Weight Range</h4>
                  </div>
                  <div className="text-center">
                    <div className="text-lg sm:text-xl font-bold text-cyan-400 mb-1 sm:mb-2">
                      {result.idealWeightRange.min} - {result.idealWeightRange.max} kg
                    </div>
                    <div className="text-gray-300 text-xs sm:text-sm">Healthy weight for your height</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-electric bg-black border-gray-800">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-cyan-400" />
                    <h4 className="text-base sm:text-lg font-bold">Health Tips</h4>
                  </div>
                  <ul className="space-y-1">
                    {result.healthTips.map((tip, index) => (
                      <li key={index} className="text-gray-300 text-xs sm:text-sm flex items-start">
                        <span className="text-cyan-400 mr-2 mt-1">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* BMI Categories Chart */}
            <Card className="card-electric bg-black border-gray-800">
              <CardContent className="p-4 sm:p-6">
                <h4 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-center">BMI Categories</h4>
                <div className="bg-gray-900 rounded-[20px] sm:rounded-[30px] p-3 sm:p-4">
                  <ChartContainer
                    config={{
                      value: { label: "BMI Value", color: "hsl(var(--electric-blue))" },
                    }}
                    className="chart-container"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={result.bmiCategoryData} margin={{ top: 10, right: 15, left: 10, bottom: 5 }}>
                        <XAxis dataKey="category" tick={{ fontSize: 10 }} />
                        <YAxis tick={{ fontSize: 10 }} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="value" radius={[2, 2, 0, 0]}>
                          {result.bmiCategoryData.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={entry.userHere ? "#00FFFF" : entry.color}
                              opacity={entry.userHere ? 1 : 0.6}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            {/* Health Risk Gauge */}
            <Card className="card-electric bg-black border-gray-800">
              <CardContent className="p-4 sm:p-6">
                <h4 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-center">Health Risk Assessment</h4>
                <div className="bg-gray-900 rounded-[20px] sm:rounded-[30px] p-3 sm:p-4">
                  <ChartContainer
                    config={{
                      value: { label: "Risk Level", color: "hsl(var(--electric-blue))" },
                    }}
                    className="h-[150px] sm:h-[200px] w-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={result.riskGaugeData}
                          cx="50%"
                          cy="50%"
                          startAngle={180}
                          endAngle={0}
                          innerRadius={40}
                          outerRadius={60}
                          dataKey="value"
                        >
                          {result.riskGaugeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
                <div className="text-center mt-3 sm:mt-4">
                  <div className="text-base sm:text-lg font-semibold text-cyan-400">{result.riskLevel}</div>
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
