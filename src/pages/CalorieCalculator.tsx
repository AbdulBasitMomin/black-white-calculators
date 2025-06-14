
import { useState } from "react";
import { ArrowLeft, Copy, Check, Heart, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const CalorieCalculator = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [goal, setGoal] = useState("");
  const [result, setResult] = useState<{
    bmr: number;
    maintenance: number;
    weightLoss: number;
    weightGain: number;
    recommendations: string[];
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const calculateCalories = () => {
    if (!age || !gender || !height || !weight || !activityLevel || !goal) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const ageNum = parseInt(age);
    const heightNum = parseFloat(height);
    const weightNum = parseFloat(weight);

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr: number;
    if (gender === "male") {
      bmr = 88.362 + (13.397 * weightNum) + (4.799 * heightNum) - (5.677 * ageNum);
    } else {
      bmr = 447.593 + (9.247 * weightNum) + (3.098 * heightNum) - (4.330 * ageNum);
    }

    // Activity multipliers
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      very: 1.725,
      extra: 1.9
    };

    const maintenance = bmr * activityMultipliers[activityLevel as keyof typeof activityMultipliers];
    const weightLoss = maintenance - 500; // 500 calorie deficit for 1lb/week loss
    const weightGain = maintenance + 500; // 500 calorie surplus for 1lb/week gain

    let recommendations: string[] = [];
    
    switch (goal) {
      case "maintain":
        recommendations = [
          "Focus on balanced nutrition with all macronutrients",
          "Stay hydrated with 8-10 glasses of water daily",
          "Include regular physical activity in your routine"
        ];
        break;
      case "lose":
        recommendations = [
          "Create a moderate calorie deficit (500 calories/day)",
          "Increase protein intake to preserve muscle mass",
          "Combine cardio and strength training exercises"
        ];
        break;
      case "gain":
        recommendations = [
          "Eat in a calorie surplus with nutrient-dense foods",
          "Focus on protein for muscle building (1.6-2.2g/kg body weight)",
          "Include strength training to build lean muscle mass"
        ];
        break;
    }

    setResult({
      bmr: Math.round(bmr),
      maintenance: Math.round(maintenance),
      weightLoss: Math.round(weightLoss),
      weightGain: Math.round(weightGain),
      recommendations
    });
  };

  const copyResult = async () => {
    if (!result) return;
    
    const text = `Daily Calorie Needs: BMR: ${result.bmr}, Maintenance: ${result.maintenance}, Weight Loss: ${result.weightLoss}, Weight Gain: ${result.weightGain}`;
    
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
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Calorie Calculator</h1>
          </div>
        </div>

        {/* Calculator Card */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl mb-8">
          <CardContent className="p-8">
            <div className="space-y-6">
              {/* Basic Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="age" className="text-lg font-semibold mb-3 block text-gray-900 dark:text-white">
                    Age
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="25"
                    className="w-full p-4 text-lg rounded-xl border-gray-200 dark:border-gray-700"
                  />
                </div>

                <div>
                  <Label className="text-lg font-semibold mb-3 block text-gray-900 dark:text-white">
                    Gender
                  </Label>
                  <Select value={gender} onValueChange={setGender}>
                    <SelectTrigger className="w-full p-4 text-lg rounded-xl border-gray-200 dark:border-gray-700">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl">
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="height" className="text-lg font-semibold mb-3 block text-gray-900 dark:text-white">
                    Height (cm)
                  </Label>
                  <Input
                    id="height"
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="175"
                    className="w-full p-4 text-lg rounded-xl border-gray-200 dark:border-gray-700"
                  />
                </div>

                <div>
                  <Label htmlFor="weight" className="text-lg font-semibold mb-3 block text-gray-900 dark:text-white">
                    Weight (kg)
                  </Label>
                  <Input
                    id="weight"
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="70"
                    className="w-full p-4 text-lg rounded-xl border-gray-200 dark:border-gray-700"
                    step="0.1"
                  />
                </div>
              </div>

              <div>
                <Label className="text-lg font-semibold mb-3 block text-gray-900 dark:text-white">
                  Activity Level
                </Label>
                <Select value={activityLevel} onValueChange={setActivityLevel}>
                  <SelectTrigger className="w-full p-4 text-lg rounded-xl border-gray-200 dark:border-gray-700">
                    <SelectValue placeholder="Select activity level" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl">
                    <SelectItem value="sedentary">Sedentary (little/no exercise)</SelectItem>
                    <SelectItem value="light">Light (1-3 days/week)</SelectItem>
                    <SelectItem value="moderate">Moderate (3-5 days/week)</SelectItem>
                    <SelectItem value="very">Very Active (6-7 days/week)</SelectItem>
                    <SelectItem value="extra">Extra Active (very intense exercise)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-lg font-semibold mb-3 block text-gray-900 dark:text-white">
                  Goal
                </Label>
                <Select value={goal} onValueChange={setGoal}>
                  <SelectTrigger className="w-full p-4 text-lg rounded-xl border-gray-200 dark:border-gray-700">
                    <SelectValue placeholder="Select your goal" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl">
                    <SelectItem value="lose">Lose Weight</SelectItem>
                    <SelectItem value="maintain">Maintain Weight</SelectItem>
                    <SelectItem value="gain">Gain Weight</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={calculateCalories}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 text-lg rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Calculate Calories
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {result && (
          <div className="space-y-6 animate-fadeIn">
            {/* Calorie Breakdown */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Daily Calorie Needs</h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-2xl p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                      {result.bmr}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">BMR</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-2xl p-4 text-center">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                      {result.maintenance}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">Maintain</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 rounded-2xl p-4 text-center">
                    <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-1">
                      {result.weightLoss}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">Lose Weight</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 rounded-2xl p-4 text-center">
                    <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-1">
                      {result.weightGain}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">Gain Weight</div>
                  </div>
                </div>
                
                <Button
                  onClick={copyResult}
                  variant="outline"
                  className="w-full border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                >
                  {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                  {copied ? "Copied!" : "Copy Results"}
                </Button>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Activity className="w-5 h-5 mr-3 text-green-500" />
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">Nutrition Recommendations</h4>
                </div>
                
                <ul className="space-y-3">
                  {result.recommendations.map((tip, index) => (
                    <li key={index} className="flex items-start text-gray-600 dark:text-gray-300">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      {tip}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalorieCalculator;
