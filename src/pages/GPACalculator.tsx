
import { useState } from "react";
import { ArrowLeft, Copy, Check, GraduationCap, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const GPACalculator = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [gpa, setGpa] = useState("");
  const [gradingSystem, setGradingSystem] = useState("4.0");
  const [result, setResult] = useState<{
    percentage: number;
    letterGrade: string;
    classification: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const convertGPA = () => {
    if (!gpa) {
      toast({
        title: "Please enter your GPA",
        variant: "destructive",
      });
      return;
    }

    const gpaNum = parseFloat(gpa);
    if (gpaNum <= 0 || isNaN(gpaNum)) {
      toast({
        title: "Please enter a valid GPA",
        variant: "destructive",
      });
      return;
    }

    let percentage: number;
    let letterGrade: string;
    let classification: string;

    // Convert based on grading system
    switch (gradingSystem) {
      case "4.0":
        if (gpaNum > 4.0) {
          toast({
            title: "GPA cannot exceed 4.0 in this system",
            variant: "destructive",
          });
          return;
        }
        percentage = (gpaNum / 4.0) * 100;
        break;
      case "5.0":
        if (gpaNum > 5.0) {
          toast({
            title: "GPA cannot exceed 5.0 in this system",
            variant: "destructive",
          });
          return;
        }
        percentage = (gpaNum / 5.0) * 100;
        break;
      case "10.0":
        if (gpaNum > 10.0) {
          toast({
            title: "GPA cannot exceed 10.0 in this system",
            variant: "destructive",
          });
          return;
        }
        percentage = (gpaNum / 10.0) * 100;
        break;
      default:
        percentage = gpaNum;
    }

    // Determine letter grade and classification
    if (percentage >= 97) {
      letterGrade = "A+";
      classification = "Excellent";
    } else if (percentage >= 93) {
      letterGrade = "A";
      classification = "Excellent";
    } else if (percentage >= 90) {
      letterGrade = "A-";
      classification = "Very Good";
    } else if (percentage >= 87) {
      letterGrade = "B+";
      classification = "Very Good";
    } else if (percentage >= 83) {
      letterGrade = "B";
      classification = "Good";
    } else if (percentage >= 80) {
      letterGrade = "B-";
      classification = "Good";
    } else if (percentage >= 77) {
      letterGrade = "C+";
      classification = "Satisfactory";
    } else if (percentage >= 73) {
      letterGrade = "C";
      classification = "Satisfactory";
    } else if (percentage >= 70) {
      letterGrade = "C-";
      classification = "Pass";
    } else if (percentage >= 60) {
      letterGrade = "D";
      classification = "Pass";
    } else {
      letterGrade = "F";
      classification = "Fail";
    }

    setResult({
      percentage: Math.round(percentage * 100) / 100,
      letterGrade,
      classification
    });
  };

  const copyResult = async () => {
    if (!result) return;
    
    const text = `GPA: ${gpa} (${gradingSystem} scale) = ${result.percentage}% (${result.letterGrade} - ${result.classification})`;
    
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-amber-900 pt-16">
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
            <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">GPA Calculator</h1>
          </div>
        </div>

        {/* Calculator Card */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl mb-8">
          <CardContent className="p-8">
            <div className="space-y-6">
              {/* Grading System */}
              <div>
                <Label className="text-lg font-semibold mb-3 block text-gray-900 dark:text-white">
                  Grading System
                </Label>
                <Select value={gradingSystem} onValueChange={setGradingSystem}>
                  <SelectTrigger className="w-full p-4 text-lg rounded-xl border-gray-200 dark:border-gray-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl">
                    <SelectItem value="4.0">4.0 Scale (US)</SelectItem>
                    <SelectItem value="5.0">5.0 Scale</SelectItem>
                    <SelectItem value="10.0">10.0 Scale (India/Europe)</SelectItem>
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
                  placeholder={gradingSystem === "4.0" ? "3.5" : gradingSystem === "5.0" ? "4.2" : "8.5"}
                  className="w-full p-4 text-lg rounded-xl border-gray-200 dark:border-gray-700"
                  step="0.01"
                  max={gradingSystem}
                />
              </div>

              <Button
                onClick={convertGPA}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 text-lg rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Calculate GPA
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {result && (
          <div className="space-y-6 animate-fadeIn">
            {/* Main Result */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Conversion Results</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900/30 dark:to-amber-800/30 rounded-2xl p-6">
                    <div className="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-2">
                      {result.percentage}%
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">Percentage</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-2xl p-6">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                      {result.letterGrade}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">Letter Grade</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-2xl p-6">
                    <div className="text-lg font-bold text-green-600 dark:text-green-400 mb-2">
                      {result.classification}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">Classification</div>
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

            {/* Academic Guidance */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <BookOpen className="w-5 h-5 mr-3 text-amber-500" />
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">Academic Guidance</h4>
                </div>
                
                <div className="space-y-3">
                  {result.classification === "Excellent" && (
                    <div className="text-gray-600 dark:text-gray-300">
                      Outstanding performance! You're eligible for honors programs and scholarships.
                    </div>
                  )}
                  {result.classification === "Very Good" && (
                    <div className="text-gray-600 dark:text-gray-300">
                      Great work! You're on track for academic success and graduate programs.
                    </div>
                  )}
                  {result.classification === "Good" && (
                    <div className="text-gray-600 dark:text-gray-300">
                      Good performance! Consider study groups and office hours to improve further.
                    </div>
                  )}
                  {result.classification === "Satisfactory" && (
                    <div className="text-gray-600 dark:text-gray-300">
                      Meeting requirements. Focus on study strategies and time management.
                    </div>
                  )}
                  {result.classification === "Pass" && (
                    <div className="text-gray-600 dark:text-gray-300">
                      Passing grade. Consider academic support services and tutoring.
                    </div>
                  )}
                  {result.classification === "Fail" && (
                    <div className="text-gray-600 dark:text-gray-300">
                      Needs improvement. Speak with academic advisors and utilize campus resources.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default GPACalculator;
