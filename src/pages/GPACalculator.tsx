import { useState, useEffect } from "react";
import { ArrowLeft, Copy, Check, GraduationCap, BookOpen, Calculator, Info, Globe, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import useScrollToTop from "@/hooks/useScrollToTop";

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
  useScrollToTop();
  
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-200/30 via-pink-200/30 to-blue-200/30 dark:from-purple-400/20 dark:via-pink-300/20 dark:to-blue-400/20 animate-gradientMove"></div>
      <div className="fixed inset-0 bg-gradient-to-tr from-blue-300/20 via-transparent to-purple-300/20 dark:from-blue-600/10 dark:via-transparent dark:to-purple-600/10"></div>
      
      {/* Floating Orbs */}
      <div className="fixed top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-300/60 to-pink-300/60 dark:from-purple-400 dark:to-pink-400 rounded-full blur-3xl opacity-40 dark:opacity-20 animate-float"></div>
      <div className="fixed bottom-32 right-20 w-24 h-24 bg-gradient-to-r from-blue-300/70 to-cyan-300/70 dark:from-blue-400 dark:to-cyan-400 rounded-full blur-2xl opacity-50 dark:opacity-30 animate-float" style={{ animationDelay: "2s" }}></div>
      <div className="fixed top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-pink-300/60 to-purple-300/60 dark:from-pink-400 dark:to-purple-400 rounded-full blur-xl opacity-45 dark:opacity-25 animate-float" style={{ animationDelay: "4s" }}></div>

      <div className="relative z-10 min-h-screen backdrop-blur-[2px] pt-20 pb-8">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="flex items-center mb-8 justify-center lg:justify-start">
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
                <GraduationCap className="w-7 h-7 text-white drop-shadow-sm" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-800 via-purple-600 to-pink-600 dark:from-white dark:via-purple-100 dark:to-pink-100 bg-clip-text text-transparent drop-shadow-sm">
                GPA Calculator
              </h1>
            </div>
          </div>

          {/* Center the main content with flexbox */}
          <div className="flex justify-center">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start max-w-7xl w-full">
              {/* Calculator Card */}
              <div className="w-full max-w-2xl mx-auto xl:mx-0">
                <Card className="glass-card-light shadow-2xl rounded-[2rem] overflow-hidden">
                  <CardContent className="p-8">
                    <div className="space-y-8">
                      {/* Region Selection */}
                      <div>
                        <Label className="text-lg font-semibold mb-3 block text-gray-800 dark:text-white flex items-center drop-shadow-sm">
                          <Globe className="w-5 h-5 mr-2" />
                          Select Region
                        </Label>
                        <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                          <SelectTrigger className="w-full p-6 text-lg rounded-2xl glass-button-light transition-all duration-300 shadow-lg">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="glass-card-light rounded-2xl shadow-2xl backdrop-blur-xl border border-white/20">
                            {regions.map((region) => (
                              <SelectItem key={region.code} value={region.code} className="rounded-xl p-4">
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
                        <Label className="text-lg font-semibold mb-3 block text-gray-800 dark:text-white flex items-center drop-shadow-sm">
                          <Calculator className="w-5 h-5 mr-2" />
                          Grading Scale
                        </Label>
                        <Select value={selectedScale} onValueChange={setSelectedScale}>
                          <SelectTrigger className="w-full p-6 text-lg rounded-2xl glass-button-light transition-all duration-300 shadow-lg">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="glass-card-light rounded-2xl shadow-2xl backdrop-blur-xl border border-white/20">
                            {Object.entries(gradeScales).map(([key, scale]) => (
                              <SelectItem key={key} value={key} className="rounded-xl p-4">
                                <span className="font-medium">{scale.name}</span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* GPA Input */}
                      <div>
                        <Label htmlFor="gpa" className="text-lg font-semibold mb-3 block text-gray-800 dark:text-white drop-shadow-sm">
                          Your GPA
                        </Label>
                        <Input
                          id="gpa"
                          type="number"
                          value={gpa}
                          onChange={(e) => setGpa(e.target.value)}
                          placeholder={`Enter GPA (0 - ${gradeScales[selectedScale].max})`}
                          className="w-full p-6 text-xl rounded-2xl glass-button-light text-gray-800 dark:text-white placeholder:text-gray-500 dark:placeholder:text-white/60 transition-all duration-300 shadow-lg"
                          step="0.01"
                          max={gradeScales[selectedScale].max}
                        />
                      </div>

                      {/* Formula Toggle */}
                      <div className="flex items-center justify-between p-6 glass-info-card rounded-2xl">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Show Formula</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowFormula(!showFormula)}
                          className="rounded-full glass-button-light hover:scale-110 transition-all duration-300"
                        >
                          <Info className="w-4 h-4" />
                        </Button>
                      </div>

                      {showFormula && (
                        <div className="p-6 glass-info-card rounded-2xl animate-fadeIn">
                          <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2 drop-shadow-sm">Formula Used:</h4>
                          <p className="text-sm text-purple-600 dark:text-purple-400 font-mono">
                            {gradeScales[selectedScale].formula}
                          </p>
                        </div>
                      )}

                      <Button
                        onClick={convertGPA}
                        disabled={isCalculating}
                        className="w-full bg-gradient-to-r from-purple-500/80 to-pink-600/80 hover:from-purple-600/80 hover:to-pink-700/80 text-white font-bold py-6 text-xl rounded-full transition-all duration-300 hover:scale-105 shadow-2xl backdrop-blur-xl border border-white/20"
                      >
                        {isCalculating ? (
                          <>
                            <Sparkles className="w-6 h-6 mr-2 animate-spin" />
                            Calculating...
                          </>
                        ) : (
                          "Calculate GPA"
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Results Panel */}
              {result && (
                <div className="w-full max-w-2xl mx-auto xl:mx-0 space-y-6 animate-fadeIn">
                  {/* Main Result */}
                  <Card className="glass-card-light shadow-2xl rounded-[2rem] overflow-hidden">
                    <CardContent className="p-8 text-center">
                      <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center justify-center drop-shadow-sm">
                        <Check className="w-6 h-6 mr-2 text-green-500" />
                        Conversion Results
                      </h3>
                      
                      <div className="grid grid-cols-1 gap-6 mb-6">
                        <div className="glass-info-card rounded-2xl p-6">
                          <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 drop-shadow-sm">
                            {result.percentage}%
                          </div>
                          <div className="text-gray-600 dark:text-gray-300">Percentage</div>
                        </div>
                        
                        <div className="glass-info-card rounded-2xl p-6">
                          <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 drop-shadow-sm">
                            {result.letterGrade}
                          </div>
                          <div className="text-gray-600 dark:text-gray-300">Letter Grade</div>
                        </div>
                        
                        <div className="glass-info-card rounded-2xl p-6">
                          <div className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 drop-shadow-sm">
                            {result.classification}
                          </div>
                          <div className="text-gray-600 dark:text-gray-300">Classification</div>
                        </div>
                      </div>
                      
                      <Button
                        onClick={copyResult}
                        variant="outline"
                        className="glass-button-light rounded-full px-6 py-3 transition-all duration-300 hover:scale-105"
                      >
                        {copied ? <Check className="w-4 h-4 mr-2 text-green-500" /> : <Copy className="w-4 h-4 mr-2" />}
                        {copied ? "Copied!" : "Copy Result"}
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Academic Guidance */}
                  <Card className="glass-card-light shadow-2xl rounded-[2rem] overflow-hidden">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        <BookOpen className="w-5 h-5 mr-3 text-purple-500" />
                        <h4 className="text-lg font-bold text-gray-800 dark:text-white drop-shadow-sm">Academic Guidance</h4>
                      </div>
                      
                      <div className="p-6 glass-info-card rounded-2xl">
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
      </div>
    </div>
  );
};

export default GPACalculator;
