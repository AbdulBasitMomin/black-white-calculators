import { useState } from "react";
import { ArrowLeft, Copy, Check, Calendar, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import useScrollToTop from "@/hooks/useScrollToTop";

const DaysCalculator = () => {
  useScrollToTop();
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [result, setResult] = useState<{
    days: number;
    workingDays: number;
    weekends: number;
    years: number;
    months: number;
    weeks: number;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const calculateDays = () => {
    if (!startDate || !endDate) {
      toast({
        title: "Please enter both dates",
        variant: "destructive",
      });
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start >= end) {
      toast({
        title: "End date must be after start date",
        variant: "destructive",
      });
      return;
    }

    const timeDiff = end.getTime() - start.getTime();
    const days = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    // Calculate working days (excluding weekends)
    let workingDays = 0;
    let weekends = 0;
    
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const dayOfWeek = d.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        weekends++;
      } else {
        workingDays++;
      }
    }

    const years = Math.floor(days / 365);
    const months = Math.floor(days / 30);
    const weeks = Math.floor(days / 7);

    setResult({
      days,
      workingDays,
      weekends,
      years,
      months,
      weeks
    });
  };

  const copyResult = async () => {
    if (!result) return;
    
    const text = `Days between ${startDate} and ${endDate}: ${result.days} days (${result.workingDays} working days)`;
    
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 pt-16">
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
            <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Days Calculator</h1>
          </div>
        </div>

        {/* Calculator Card */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl mb-8">
          <CardContent className="p-8">
            <div className="space-y-6">
              <div>
                <Label htmlFor="startDate" className="text-lg font-semibold mb-3 block text-gray-900 dark:text-white">
                  Start Date
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-4 text-lg rounded-xl border-gray-200 dark:border-gray-700"
                />
              </div>

              <div>
                <Label htmlFor="endDate" className="text-lg font-semibold mb-3 block text-gray-900 dark:text-white">
                  End Date
                </Label>
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full p-4 text-lg rounded-xl border-gray-200 dark:border-gray-700"
                />
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6">
                <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Calculate</h4>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  Find the exact number of days, working days, and time periods between two dates.
                </p>
              </div>

              <Button
                onClick={calculateDays}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 text-lg rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Calculate Days
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {result && (
          <div className="space-y-6 animate-fadeIn">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white flex items-center justify-center">
                  <Clock className="w-6 h-6 mr-2" />
                  Time Difference
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-2xl p-6 text-center">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                      {result.days}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">Total Days</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-2xl p-6 text-center">
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                      {result.workingDays}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">Working Days</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl p-4 text-center">
                    <div className="text-xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                      {result.years}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Years</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-pink-100 to-pink-200 dark:from-pink-900/30 dark:to-pink-800/30 rounded-xl p-4 text-center">
                    <div className="text-xl font-bold text-pink-600 dark:text-pink-400 mb-1">
                      {result.months}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Months</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30 rounded-xl p-4 text-center">
                    <div className="text-xl font-bold text-yellow-600 dark:text-yellow-400 mb-1">
                      {result.weeks}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Weeks</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 rounded-xl p-4 text-center">
                    <div className="text-xl font-bold text-red-600 dark:text-red-400 mb-1">
                      {result.weekends}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Weekends</div>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default DaysCalculator;
