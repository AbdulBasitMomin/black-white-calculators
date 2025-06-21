
import { useState, useEffect } from "react";
import { ArrowLeft, Copy, Check, GraduationCap, BookOpen, Calculator, Info, Globe, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface GradeScale {
  name: string;
  max: number;
  formula: string;
  regions: string[];
}

const gradeScales: { [key: string]: GradeScale } = {
  "4.0": {
    name: "4.0 Scale (USA/Canada)",
    max: 4.0,
    formula: "GPA × 25",
    regions: ["USA", "Canada"]
  },
  "4.33": {
    name: "4.33 Scale (Canada)",
    max: 4.33,
    formula: "(GPA ÷ 4.33) × 100",
    regions: ["Canada"]
  },
  "5.0": {
    name: "5.0 Scale",
    max: 5.0,
    formula: "(GPA ÷ 5.0) × 100",
    regions: ["Germany", "Netherlands"]
  },
  "10.0": {
    name: "10.0 Scale (India)",
    max: 10.0,
    formula: "(GPA - 0.75) × 10",
    regions: ["India"]
  },
  "100": {
    name: "100-Point Scale",
    max: 100,
    formula: "Direct percentage",
    regions: ["Middle East", "Europe"]
  }
};

const regions = [
  { code: "IN", name: "India", flag: "🇮🇳", preferredScale: "10.0" },
  { code: "US", name: "United States", flag: "🇺🇸", preferredScale: "4.0" },
  { code: "CA", name: "Canada", flag: "🇨🇦", preferredScale: "4.33" },
  { code: "UK", name: "United Kingdom", flag: "🇬🇧", preferredScale: "4.0" },
  { code: "DE", name: "Germany", flag: "🇩🇪", preferredScale: "5.0" },
  { code: "AU", name: "Australia", flag: "🇦🇺", preferredScale: "4.0" },
  { code: "NL", name: "Netherlands", flag: "🇳🇱", preferredScale: "5.0" },
  { code: "AE", name: "UAE", flag: "🇦🇪", preferredScale: "100" },
  { code: "SA", name: "Saudi Arabia", flag: "🇸🇦", preferredScale: "100" }
];

const GPACalculator = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [gpa, setGpa] = useState("");
  const [selectedScale, setSelectedScale] = useState("4.0");
  const [selectedRegion, setSelectedRegion] = useState("US");
  const [showFormula, setShowFormula] = useState(false);
  const [result, setResult] = useState<{
    percentage: number;
    letterGrade: string;
    classification: string;
    interpretation: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  // Auto-detect scale based on region
  useEffect(() => {
    const region = regions.find(r => r.code === selectedRegion);
    if (region) {
      setSelectedScale(region.preferredScale);
    }
  }, [selectedRegion]);

  const getClassification = (percentage: number, region: string) => {
    switch (region) {
      case "IN": // India
        if (percentage >= 85) return { grade: "O", class: "Outstanding", color: "emerald" };
        if (percentage >= 75) return { grade: "A+", class: "Excellent", color: "green" };
        if (percentage >= 65) return { grade: "A", class: "Very Good", color: "blue" };
        if (percentage >= 55) return { grade: "B+", class: "Good", color: "yellow" };
        if (percentage >= 50) return { grade: "B", class: "Above Average", color: "orange" };
        if (percentage >= 40) return { grade: "C", class: "Average", color: "red" };
        return { grade: "F", class: "Fail", color: "red" };

      case "US": // United States
        if (percentage >= 97) return { grade: "A+", class: "Excellent", color: "emerald" };
        if (percentage >= 93) return { grade: "A", class: "Excellent", color: "green" };
        if (percentage >= 90) return { grade: "A-", class: "Very Good", color: "blue" };
        if (percentage >= 87) return { grade: "B+", class: "Good", color: "yellow" };
        if (percentage >= 83) return { grade: "B", class: "Good", color: "orange" };
        if (percentage >= 80) return { grade: "B-", class: "Satisfactory", color: "orange" };
        if (percentage >= 70) return { grade: "C", class: "Average", color: "red" };
        if (percentage >= 60) return { grade: "D", class: "Below Average", color: "red" };
        return { grade: "F", class: "Fail", color: "red" };

      case "UK": // United Kingdom
        if (percentage >= 70) return { grade: "First", class: "First Class Honours", color: "emerald" };
        if (percentage >= 60) return { grade: "2:1", class: "Upper Second Class", color: "green" };
        if (percentage >= 50) return { grade: "2:2", class: "Lower Second Class", color: "blue" };
        if (percentage >= 40) return { grade: "Third", class: "Third Class", color: "yellow" };
        return { grade: "Fail", class: "Fail", color: "red" };

      default:
        if (percentage >= 90) return { grade: "A", class: "Excellent", color: "emerald" };
        if (percentage >= 80) return { grade: "B", class: "Very Good", color: "green" };
        if (percentage >= 70) return { grade: "C", class: "Good", color: "blue" };
        if (percentage >= 60) return { grade: "D", class: "Satisfactory", color: "yellow" };
        return { grade: "F", class: "Fail", color: "red" };
    }
  };

  const getInterpretation = (classification: string, region: string) => {
    const regionName = regions.find(r => r.code === region)?.name || "your region";
    
    switch (classification) {
      case "Outstanding":
      case "Excellent":
        return `Outstanding performance! You're eligible for top honors programs and scholarships in ${regionName}.`;
      case "Very Good":
        return `Excellent work! You're well-positioned for competitive graduate programs in ${regionName}.`;
      case "Good":
        return `Good performance! You meet requirements for most programs in ${regionName}.`;
      case "Satisfactory":
      case "Average":
        return `Satisfactory performance. Consider academic support to improve your standing in ${regionName}.`;
      case "Below Average":
        return `Below average performance. Academic counseling is recommended in ${regionName}.`;
      default:
        return `Performance needs significant improvement. Seek immediate academic support in ${regionName}.`;
    }
  };

  const convertGPA = () => {
    if (!gpa) {
      toast({
        title: "Please enter your GPA",
        variant: "destructive",
      });
      return;
    }

    const gpaNum = parseFloat(gpa);
    const scale = gradeScales[selectedScale];

    if (gpaNum <= 0 || isNaN(gpaNum)) {
      toast({
        title: "Please enter a valid GPA",
        variant: "destructive",
      });
      return;
    }

    if (gpaNum > scale.max) {
      toast({
        title: `GPA cannot exceed ${scale.max} in ${scale.name}`,
        variant: "destructive",
      });
      return;
    }

    setIsCalculating(true);

    setTimeout(() => {
      let percentage: number;

      // Apply region-specific formulas
      switch (selectedScale) {
        case "10.0":
          percentage = (gpaNum - 0.75) * 10;
          break;
        case "4.0":
          percentage = gpaNum * 25;
          break;
        case "4.33":
          percentage = (gpaNum / 4.33) * 100;
          break;
        case "5.0":
          percentage = (gpaNum / 5.0) * 100;
          break;
        case "100":
          percentage = gpaNum;
          break;
        default:
          percentage = (gpaNum / scale.max) * 100;
      }

      // Ensure percentage is within valid range
      percentage = Math.max(0, Math.min(100, percentage));

      const classification = getClassification(percentage, selectedRegion);
      const interpretation = getInterpretation(classification.class, selectedRegion);

      setResult({
        percentage: Math.round(percentage * 100) / 100,
        letterGrade: classification.grade,
        classification: classification.class,
        interpretation
      });

      setIsCalculating(false);
    }, 1000);
  };

  const copyResult = async () => {
    if (!result) return;
    
    const scale = gradeScales[selectedScale];
    const region = regions.find(r => r.code === selectedRegion);
    const text = `GPA: ${gpa} (${scale.name}) = ${result.percentage}% | Grade: ${result.letterGrade} | Classification: ${result.classification} | Region: ${region?.name}`;
    
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast({
        title: "✨ Copied to clipboard!",
        description: "Result copied with all details",
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900 pt-16 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="mr-4 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 w-12 h-12 glass-button transition-all duration-300 hover:scale-110"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              GPA to Percentage Calculator
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator Card */}
          <Card className="glass-card-light shadow-glass rounded-3xl border-0">
            <CardContent className="p-8">
              <div className="space-y-6">
                {/* Region Selection */}
                <div>
                  <Label className="text-lg font-semibold mb-3 block text-gray-900 dark:text-white flex items-center">
                    <Globe className="w-5 h-5 mr-2" />
                    Select Region
                  </Label>
                  <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                    <SelectTrigger className="w-full p-4 text-lg rounded-2xl glass-input border-0">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass-card-light border-0 rounded-2xl z-50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl shadow-glass">
                      {regions.map((region) => (
                        <SelectItem key={region.code} value={region.code} className="rounded-xl">
                          <div className="flex items-center space-x-3">
                            <span className="text-lg">{region.flag}</span>
                            <span className="font-medium">{region.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Scale Selection */}
                <div>
                  <Label className="text-lg font-semibold mb-3 block text-gray-900 dark:text-white flex items-center">
                    <Calculator className="w-5 h-5 mr-2" />
                    Grading Scale
                  </Label>
                  <Select value={selectedScale} onValueChange={setSelectedScale}>
                    <SelectTrigger className="w-full p-4 text-lg rounded-2xl glass-input border-0">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass-card-light border-0 rounded-2xl z-50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl shadow-glass">
                      {Object.entries(gradeScales).map(([key, scale]) => (
                        <SelectItem key={key} value={key} className="rounded-xl">
                          <span className="font-medium">{scale.name}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* GPA Input */}
                <div>
                  <Label htmlFor="gpa" className="text-lg font-semibold mb-3 block text-gray-900 dark:text-white">
                    Your GPA
                  </Label>
                  <Input
                    id="gpa"
                    type="number"
                    value={gpa}
                    onChange={(e) => setGpa(e.target.value)}
                    placeholder={`Enter GPA (0 - ${gradeScales[selectedScale].max})`}
                    className="w-full p-4 text-lg rounded-2xl glass-input border-0"
                    step="0.01"
                    max={gradeScales[selectedScale].max}
                  />
                </div>

                {/* Formula Toggle */}
                <div className="flex items-center justify-between p-4 glass-info-card rounded-2xl">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Show Formula</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFormula(!showFormula)}
                    className="rounded-full glass-button-light border-0"
                  >
                    <Info className="w-4 h-4" />
                  </Button>
                </div>

                {showFormula && (
                  <div className="p-4 glass-info-card rounded-2xl animate-fadeIn">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Formula Used:</h4>
                    <p className="text-sm text-purple-600 dark:text-purple-400 font-mono">
                      {gradeScales[selectedScale].formula}
                    </p>
                  </div>
                )}

                <Button
                  onClick={convertGPA}
                  disabled={isCalculating}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold py-4 text-lg rounded-full transition-all duration-300 hover:scale-105 shadow-2xl disabled:opacity-50 border-0"
                >
                  {isCalculating ? (
                    <>
                      <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                      Calculating...
                    </>
                  ) : (
                    "Calculate GPA"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Panel */}
          {result && (
            <div className="space-y-6 animate-fadeIn">
              {/* Main Result */}
              <Card className="glass-card-light shadow-glass rounded-3xl border-0">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center justify-center">
                    <Check className="w-6 h-6 mr-2 text-green-500" />
                    Conversion Results
                  </h3>
                  
                  <div className="grid grid-cols-1 gap-6 mb-6">
                    <div className="glass-info-card rounded-2xl p-6">
                      <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                        {result.percentage}%
                      </div>
                      <div className="text-gray-600 dark:text-gray-300">Percentage</div>
                    </div>
                    
                    <div className="glass-info-card rounded-2xl p-6">
                      <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                        {result.letterGrade}
                      </div>
                      <div className="text-gray-600 dark:text-gray-300">Letter Grade</div>
                    </div>
                    
                    <div className="glass-info-card rounded-2xl p-6">
                      <div className="text-lg font-bold text-purple-600 dark:text-purple-400 mb-2">
                        {result.classification}
                      </div>
                      <div className="text-gray-600 dark:text-gray-300">Classification</div>
                    </div>
                  </div>
                  
                  <Button
                    onClick={copyResult}
                    variant="outline"
                    className="glass-button-light border-0 rounded-full px-6 py-3 transition-all duration-300 hover:scale-105"
                  >
                    {copied ? <Check className="w-4 h-4 mr-2 text-green-500" /> : <Copy className="w-4 h-4 mr-2" />}
                    {copied ? "Copied!" : "Copy Result"}
                  </Button>
                </CardContent>
              </Card>

              {/* Academic Guidance */}
              <Card className="glass-card-light shadow-glass rounded-3xl border-0">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <BookOpen className="w-5 h-5 mr-3 text-purple-500" />
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">Academic Guidance</h4>
                  </div>
                  
                  <div className="p-4 glass-info-card rounded-2xl">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {result.interpretation}
                    </p>
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

export default GPACalculator;
