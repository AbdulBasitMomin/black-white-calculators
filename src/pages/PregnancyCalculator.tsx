import { useState } from "react";
import { ArrowLeft, Copy, Check, Baby, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import useScrollToTop from "@/hooks/useScrollToTop";

const PregnancyCalculator = () => {
  useScrollToTop();
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const [lastPeriodDate, setLastPeriodDate] = useState("");
  const [result, setResult] = useState<{
    dueDate: string;
    currentWeek: number;
    currentDay: number;
    daysRemaining: number;
    trimester: number;
    milestones: { week: number; milestone: string }[];
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const calculatePregnancy = () => {
    if (!lastPeriodDate) {
      toast({
        title: "Please enter your last menstrual period date",
        variant: "destructive",
      });
      return;
    }

    const lmpDate = new Date(lastPeriodDate);
    const today = new Date();
    
    // Calculate due date (280 days from LMP)
    const dueDate = new Date(lmpDate);
    dueDate.setDate(dueDate.getDate() + 280);
    
    // Calculate current pregnancy week and day
    const daysSinceLMP = Math.floor((today.getTime() - lmpDate.getTime()) / (1000 * 60 * 60 * 24));
    const currentWeek = Math.floor(daysSinceLMP / 7);
    const currentDay = daysSinceLMP % 7;
    
    // Calculate days remaining
    const daysRemaining = Math.max(0, Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
    
    // Determine trimester
    let trimester: number;
    if (currentWeek <= 12) trimester = 1;
    else if (currentWeek <= 26) trimester = 2;
    else trimester = 3;
    
    // Pregnancy milestones
    const milestones = [
      { week: 4, milestone: "Missed period - take a pregnancy test" },
      { week: 6, milestone: "Heart begins to beat" },
      { week: 8, milestone: "Baby is now called a fetus" },
      { week: 12, milestone: "End of first trimester" },
      { week: 16, milestone: "You might feel the first movements" },
      { week: 20, milestone: "Anatomy scan - find out the gender" },
      { week: 24, milestone: "Baby's hearing is developing" },
      { week: 28, milestone: "Third trimester begins" },
      { week: 32, milestone: "Baby's bones are hardening" },
      { week: 36, milestone: "Baby is considered full-term soon" },
      { week: 40, milestone: "Due date!" }
    ];

    setResult({
      dueDate: dueDate.toLocaleDateString(),
      currentWeek,
      currentDay,
      daysRemaining,
      trimester,
      milestones: milestones.filter(m => m.week >= currentWeek).slice(0, 3)
    });
  };

  const copyResult = async () => {
    if (!result) return;
    
    const text = `Pregnancy Details: Due Date: ${result.dueDate}, Current: ${result.currentWeek} weeks ${result.currentDay} days, ${result.daysRemaining} days remaining`;
    
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-pink-900 pt-20">
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
            <div className="w-12 h-12 bg-pink-500 rounded-2xl flex items-center justify-center">
              <Baby className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Pregnancy Calculator</h1>
          </div>
        </div>

        {/* Calculator Card */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl mb-8">
          <CardContent className="p-8">
            <div className="space-y-6">
              <div>
                <Label htmlFor="lmp" className="text-lg font-semibold mb-3 block text-gray-900 dark:text-white">
                  First day of your last menstrual period
                </Label>
                <Input
                  id="lmp"
                  type="date"
                  value={lastPeriodDate}
                  onChange={(e) => setLastPeriodDate(e.target.value)}
                  className="w-full p-4 text-lg rounded-xl border-gray-200 dark:border-gray-700"
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="bg-pink-50 dark:bg-pink-900/20 rounded-2xl p-6">
                <h4 className="font-semibold text-pink-700 dark:text-pink-300 mb-2">How it works</h4>
                <p className="text-sm text-pink-600 dark:text-pink-400">
                  Pregnancy is calculated from the first day of your last menstrual period (LMP). 
                  The average pregnancy lasts 280 days or 40 weeks from this date.
                </p>
              </div>

              <Button
                onClick={calculatePregnancy}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 text-lg rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Calculate Due Date
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {result && (
          <div className="space-y-6 animate-fadeIn">
            {/* Main Results */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Pregnancy Timeline</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gradient-to-br from-pink-100 to-pink-200 dark:from-pink-900/30 dark:to-pink-800/30 rounded-2xl p-6 text-center">
                    <div className="text-2xl font-bold text-pink-600 dark:text-pink-400 mb-2">
                      {result.dueDate}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">Due Date</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 rounded-2xl p-6 text-center">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                      {result.currentWeek}w {result.currentDay}d
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">Current Progress</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-2xl p-6 text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                      {result.daysRemaining}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">Days Remaining</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-2xl p-6 text-center">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                      {result.trimester}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">
                      {result.trimester === 1 ? "1st" : result.trimester === 2 ? "2nd" : "3rd"} Trimester
                    </div>
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

            {/* Upcoming Milestones */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Calendar className="w-5 h-5 mr-3 text-pink-500" />
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">Upcoming Milestones</h4>
                </div>
                
                <div className="space-y-4">
                  {result.milestones.map((milestone, index) => (
                    <div key={index} className="flex items-start p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="text-white font-bold text-sm">{milestone.week}w</span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white mb-1">
                          Week {milestone.week}
                        </div>
                        <div className="text-gray-600 dark:text-gray-300 text-sm">
                          {milestone.milestone}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default PregnancyCalculator;
