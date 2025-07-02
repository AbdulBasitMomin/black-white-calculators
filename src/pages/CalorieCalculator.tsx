import { useState } from "react";
import { ArrowLeft, Copy, Check, Heart, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import useScrollToTop from "@/hooks/useScrollToTop";

const CalorieCalculator = () => {
  useScrollToTop();
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

    let bmr: number;
    if (gender === "male") {
      bmr = 88.362 + (13.397 * weightNum) + (4.799 * heightNum) - (5.677 * ageNum);
    } else {
      bmr = 447.593 + (9.247 * weightNum) + (3.098 * heightNum) - (4.330 * ageNum);
    }

    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      very: 1.725,
      extra: 1.9
    };

    const maintenance = bmr * activityMultipliers[activityLevel as keyof typeof activityMultipliers];
    const weightLoss = maintenance - 500;
    const weightGain = maintenance + 500;

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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-200/30 via-pink-200/30 to-blue-200/30 dark:from-purple-400/20 dark:via-pink-300/20 dark:to-blue-400/20 animate-gradientMove"></div>
      <div className="fixed inset-0 bg-gradient-to-tr from-blue-300/20 via-transparent to-purple-300/20 dark:from-blue-600/10 dark:via-transparent dark:to-purple-600/10"></div>
      
      {/* Floating Orbs */}
      <div className="fixed top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-300/60 to-pink-300/60 dark:from-purple-400 dark:to-pink-400 rounded-full blur-3xl opacity-40 dark:opacity-20 animate-float"></div>
      <div className="fixed bottom-32 right-20 w-24 h-24 bg-gradient-to-r from-blue-300/70 to-cyan-300/70 dark:from-blue-400 dark:to-cyan-400 rounded-full blur-2xl opacity-50 dark:opacity-30 animate-float" style={{ animationDelay: "2s" }}></div>
      <div className="fixed top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-pink-300/60 to-purple-300/60 dark:from-pink-400 dark:to-purple-400 rounded-full blur-xl opacity-45 dark:opacity-25 animate-float" style={{ animationDelay: "4s" }}></div>

      <div className="relative z-10 min-h-screen backdrop-blur-[2px] pt-20">
        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* Glass Header */}
          <div className="flex items-center mb-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="mr-4 rounded-full w-12 h-12 glass-button-light hover:scale-110 transition-all duration-300 shadow-lg"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700 dark:text-white drop-shadow-sm" />
            </Button>
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500/80 to-pink-600/80 rounded-3xl flex items-center justify-center shadow-2xl backdrop-blur-xl border border-white/20">
                <Heart className="w-7 h-7 text-white drop-shadow-sm" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 via-purple-600 to-pink-600 dark:from-white dark:via-purple-100 dark:to-pink-100 bg-clip-text text-transparent drop-shadow-sm">
                Calorie Calculator
              </h1>
            </div>
          </div>

          {/* Calculator Card */}
          <Card className="glass-card-light shadow-2xl mb-8 rounded-[2rem] overflow-hidden">
            <CardContent className="p-8">
              <div className="space-y-8">
                {/* Basic Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="age" className="text-xl font-semibold text-gray-800 dark:text-white drop-shadow-sm">
                      Age
                    </Label>
                    <Input
                      id="age"
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="25"
                      className="w-full p-6 text-xl rounded-2xl glass-button-light text-gray-800 dark:text-white placeholder:text-gray-500 dark:placeholder:text-white/60 transition-all duration-300 shadow-lg"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-xl font-semibold text-gray-800 dark:text-white drop-shadow-sm">
                      Gender
                    </Label>
                    <Select value={gender} onValueChange={setGender}>
                      <SelectTrigger className="w-full p-6 text-xl rounded-2xl glass-button-light text-gray-800 dark:text-white transition-all duration-300 shadow-lg">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent className="backdrop-blur-xl bg-white/90 dark:bg-gray-800/90 border border-white/30 rounded-xl z-50">
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="height" className="text-xl font-semibold text-gray-800 dark:text-white drop-shadow-sm">
                      Height (cm)
                    </Label>
                    <Input
                      id="height"
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder="175"
                      className="w-full p-6 text-xl rounded-2xl glass-button-light text-gray-800 dark:text-white placeholder:text-gray-500 dark:placeholder:text-white/60 transition-all duration-300 shadow-lg"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="weight" className="text-xl font-semibold text-gray-800 dark:text-white drop-shadow-sm">
                      Weight (kg)
                    </Label>
                    <Input
                      id="weight"
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="70"
                      className="w-full p-6 text-xl rounded-2xl glass-button-light text-gray-800 dark:text-white placeholder:text-gray-500 dark:placeholder:text-white/60 transition-all duration-300 shadow-lg"
                      step="0.1"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-xl font-semibold text-gray-800 dark:text-white drop-shadow-sm">
                    Activity Level
                  </Label>
                  <Select value={activityLevel} onValueChange={setActivityLevel}>
                    <SelectTrigger className="w-full p-6 text-xl rounded-2xl glass-button-light text-gray-800 dark:text-white transition-all duration-300 shadow-lg">
                      <SelectValue placeholder="Select activity level" />
                    </SelectTrigger>
                    <SelectContent className="backdrop-blur-xl bg-white/90 dark:bg-gray-800/90 border border-white/30 rounded-xl z-50">
                      <SelectItem value="sedentary">Sedentary (little/no exercise)</SelectItem>
                      <SelectItem value="light">Light (1-3 days/week)</SelectItem>
                      <SelectItem value="moderate">Moderate (3-5 days/week)</SelectItem>
                      <SelectItem value="very">Very Active (6-7 days/week)</SelectItem>
                      <SelectItem value="extra">Extra Active (very intense exercise)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="text-xl font-semibold text-gray-800 dark:text-white drop-shadow-sm">
                    Goal
                  </Label>
                  <Select value={goal} onValueChange={setGoal}>
                    <SelectTrigger className="w-full p-6 text-xl rounded-2xl glass-button-light text-gray-800 dark:text-white transition-all duration-300 shadow-lg">
                      <SelectValue placeholder="Select your goal" />
                    </SelectTrigger>
                    <SelectContent className="backdrop-blur-xl bg-white/90 dark:bg-gray-800/90 border border-white/30 rounded-xl z-50">
                      <SelectItem value="lose">Lose Weight</SelectItem>
                      <SelectItem value="maintain">Maintain Weight</SelectItem>
                      <SelectItem value="gain">Gain Weight</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={calculateCalories}
                  className="w-full bg-gradient-to-r from-purple-500/80 to-pink-600/80 hover:from-purple-600/80 hover:to-pink-700/80 text-white font-bold py-6 text-xl rounded-full transition-all duration-300 hover:scale-105 shadow-2xl backdrop-blur-xl border border-white/20"
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
              <Card className="glass-card-light shadow-2xl rounded-[2rem] overflow-hidden">
                <CardContent className="p-8">
                  <h3 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white drop-shadow-sm">Daily Calorie Needs</h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-blue-500/20 dark:bg-blue-500/20 rounded-2xl p-4 text-center border border-blue-200 dark:border-white/20">
                      <div className="text-2xl font-bold text-gray-800 dark:text-white mb-1 drop-shadow-sm">
                        {result.bmr}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-white/80">BMR</div>
                    </div>
                    
                    <div className="bg-green-500/20 dark:bg-green-500/20 rounded-2xl p-4 text-center border border-green-200 dark:border-white/20">
                      <div className="text-2xl font-bold text-gray-800 dark:text-white mb-1 drop-shadow-sm">
                        {result.maintenance}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-white/80">Maintain</div>
                    </div>
                    
                    <div className="bg-red-500/20 dark:bg-red-500/20 rounded-2xl p-4 text-center border border-red-200 dark:border-white/20">
                      <div className="text-2xl font-bold text-gray-800 dark:text-white mb-1 drop-shadow-sm">
                        {result.weightLoss}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-white/80">Lose Weight</div>
                    </div>
                    
                    <div className="bg-orange-500/20 dark:bg-orange-500/20 rounded-2xl p-4 text-center border border-orange-200 dark:border-white/20">
                      <div className="text-2xl font-bold text-gray-800 dark:text-white mb-1 drop-shadow-sm">
                        {result.weightGain}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-white/80">Gain Weight</div>
                    </div>
                  </div>
                  
                  <Button
                    onClick={copyResult}
                    variant="outline"
                    className="w-full glass-button-light text-gray-700 dark:text-white rounded-full transition-all duration-300 hover:scale-105"
                  >
                    {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                    {copied ? "Copied!" : "Copy Results"}
                  </Button>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card className="glass-card-light shadow-2xl rounded-[2rem] overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <Activity className="w-5 h-5 mr-3 text-gray-700 dark:text-white drop-shadow-sm" />
                    <h4 className="text-lg font-bold text-gray-800 dark:text-white drop-shadow-sm">Nutrition Recommendations</h4>
                  </div>
                  
                  <ul className="space-y-3">
                    {result.recommendations.map((tip, index) => (
                      <li key={index} className="flex items-start text-gray-600 dark:text-white/80">
                        <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
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
    </div>
  );
};

export default CalorieCalculator;
