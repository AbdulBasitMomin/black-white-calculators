
import { useState } from "react";
import { ArrowLeft, Copy, Check } from "lucide-react";
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
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("metric");
  const [result, setResult] = useState<{
    bmi: number;
    category: string;
    color: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: "Underweight", color: "text-blue-400" };
    if (bmi < 25) return { category: "Normal weight", color: "text-green-400" };
    if (bmi < 30) return { category: "Overweight", color: "text-yellow-400" };
    return { category: "Obese", color: "text-red-400" };
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
    const { category, color } = getBMICategory(bmi);

    setResult({
      bmi: Math.round(bmi * 10) / 10,
      category,
      color
    });
  };

  const copyResult = async () => {
    if (!result) return;
    
    const text = `My BMI: ${result.bmi} (${result.category})`;
    
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
    <div className="min-h-screen bg-black text-white px-4 py-8 neue-haas">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-12">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="mr-6 rounded-full hover:bg-gray-800 electric-glow w-14 h-14"
          >
            <ArrowLeft className="w-7 h-7" />
          </Button>
          <h1 className="text-hierarchy-lg">BMI Calculator</h1>
        </div>

        {/* Calculator Card */}
        <Card className="card-electric bg-black border-gray-800">
          <CardContent className="p-12">
            <div className="space-y-10">
              {/* Unit Selection */}
              <div>
                <Label className="text-2xl font-semibold mb-6 block">Unit System</Label>
                <Select value={unit} onValueChange={setUnit}>
                  <SelectTrigger className="input-electric">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700 z-50 rounded-pill">
                    <SelectItem value="metric">Metric (cm, kg)</SelectItem>
                    <SelectItem value="imperial">Imperial (ft, lbs)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Height Input */}
              <div>
                <Label htmlFor="height" className="text-2xl font-semibold mb-6 block">
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
                <Label htmlFor="weight" className="text-2xl font-semibold mb-6 block">
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
                className="pill-button w-full bg-white text-black hover:bg-gray-100 electric-glow-strong font-bold"
              >
                Calculate BMI
              </Button>

              {/* Result */}
              {result && (
                <div className="mt-12 smooth-fade-in">
                  <div className="bg-gray-900 rounded-pill p-10 text-center border border-gray-700">
                    <h3 className="text-3xl font-bold mb-8">Your BMI</h3>
                    <div className="mb-8">
                      <div className="text-6xl font-bold text-cyan-400 mb-4">{result.bmi}</div>
                      <div className={`text-2xl font-semibold ${result.color}`}>
                        {result.category}
                      </div>
                    </div>
                    <div className="text-sm text-gray-400 mb-8 leading-relaxed">
                      BMI Categories: Underweight (&lt;18.5) • Normal (18.5-24.9) • Overweight (25-29.9) • Obese (≥30)
                    </div>
                    <Button
                      onClick={copyResult}
                      variant="outline"
                      className="border-gray-600 text-white hover:bg-gray-800 electric-glow rounded-pill px-8 py-4"
                    >
                      {copied ? <Check className="w-5 h-5 mr-3" /> : <Copy className="w-5 h-5 mr-3" />}
                      {copied ? "Copied!" : "Copy Result"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BMICalculator;
