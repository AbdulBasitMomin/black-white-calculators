
import { useState } from "react";
import { ArrowLeft, Copy, Check, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const DaysCalculator = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [result, setResult] = useState<{
    totalDays: number;
    years: number;
    months: number;
    days: number;
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

    if (start > end) {
      toast({
        title: "Start date must be before end date",
        variant: "destructive",
      });
      return;
    }

    // Calculate total days
    const timeDiff = end.getTime() - start.getTime();
    const totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    // Calculate years, months, days breakdown
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(end.getFullYear(), end.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setResult({
      totalDays,
      years,
      months,
      days
    });
  };

  const copyResult = async () => {
    if (!result) return;
    
    const text = `Days between dates: ${result.totalDays} days (${result.years} years, ${result.months} months, ${result.days} days)`;
    
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
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-400/20 via-pink-300/20 to-blue-400/20 animate-gradientMove"></div>
      <div className="fixed inset-0 bg-gradient-to-tr from-blue-600/10 via-transparent to-purple-600/10"></div>
      
      {/* Floating Orbs */}
      <div className="fixed top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-3xl opacity-20 animate-float"></div>
      <div className="fixed bottom-32 right-20 w-24 h-24 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-2xl opacity-30 animate-float" style={{ animationDelay: "2s" }}></div>
      <div className="fixed top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full blur-xl opacity-25 animate-float" style={{ animationDelay: "4s" }}></div>

      <div className="relative z-10 min-h-screen backdrop-blur-[2px] pt-20">
        <div className="max-w-2xl mx-auto px-6 py-8">
          {/* Glass Header */}
          <div className="flex items-center mb-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="mr-4 rounded-full w-12 h-12 backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-110 shadow-lg"
            >
              <ArrowLeft className="w-6 h-6 text-white drop-shadow-sm" />
            </Button>
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500/80 to-pink-600/80 rounded-3xl flex items-center justify-center shadow-2xl backdrop-blur-xl border border-white/20">
                <Calendar className="w-7 h-7 text-white drop-shadow-sm" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent drop-shadow-sm">
                Days Calculator
              </h1>
            </div>
          </div>

          {/* Main Glass Calculator Card */}
          <Card className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl mb-8 rounded-[2rem] overflow-hidden">
            <CardContent className="p-8">
              <div className="space-y-8">
                {/* Start Date */}
                <div className="space-y-3">
                  <Label htmlFor="startdate" className="text-xl font-semibold text-white drop-shadow-sm">
                    Start Date
                  </Label>
                  <Input
                    id="startdate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full p-6 text-xl rounded-2xl backdrop-blur-xl bg-white/10 border border-white/30 text-white placeholder:text-white/60 focus:bg-white/20 transition-all duration-300 shadow-lg"
                  />
                </div>

                {/* End Date */}
                <div className="space-y-3">
                  <Label htmlFor="enddate" className="text-xl font-semibold text-white drop-shadow-sm">
                    End Date
                  </Label>
                  <Input
                    id="enddate"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full p-6 text-xl rounded-2xl backdrop-blur-xl bg-white/10 border border-white/30 text-white placeholder:text-white/60 focus:bg-white/20 transition-all duration-300 shadow-lg"
                  />
                </div>

                <Button
                  onClick={calculateDays}
                  className="w-full bg-gradient-to-r from-purple-500/80 to-pink-600/80 hover:from-purple-600/80 hover:to-pink-700/80 text-white font-bold py-6 text-xl rounded-full transition-all duration-300 hover:scale-105 shadow-2xl backdrop-blur-xl border border-white/20"
                >
                  Calculate Days
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Glass Card */}
          {result && (
            <Card className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl animate-fadeIn rounded-[2rem] overflow-hidden">
              <CardContent className="p-8 text-center">
                <h3 className="text-3xl font-bold mb-8 text-white drop-shadow-sm">Time Difference</h3>
                
                {/* Total Days */}
                <div className="mb-8 backdrop-blur-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-white/20">
                  <div className="text-5xl font-bold bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent mb-3 drop-shadow-sm">
                    {result.totalDays.toLocaleString()}
                  </div>
                  <div className="text-white/80 text-xl">Total Days</div>
                </div>

                {/* Breakdown */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="backdrop-blur-xl bg-purple-500/20 rounded-2xl p-6 border border-white/20">
                    <div className="text-3xl font-bold text-white mb-2">{result.years}</div>
                    <div className="text-white/80">Years</div>
                  </div>
                  <div className="backdrop-blur-xl bg-blue-500/20 rounded-2xl p-6 border border-white/20">
                    <div className="text-3xl font-bold text-white mb-2">{result.months}</div>
                    <div className="text-white/80">Months</div>
                  </div>
                  <div className="backdrop-blur-xl bg-pink-500/20 rounded-2xl p-6 border border-white/20">
                    <div className="text-3xl font-bold text-white mb-2">{result.days}</div>
                    <div className="text-white/80">Days</div>
                  </div>
                </div>

                <Button
                  onClick={copyResult}
                  variant="outline"
                  className="backdrop-blur-xl bg-white/10 border border-white/30 hover:bg-white/20 text-white rounded-full px-6 py-3 transition-all duration-300 hover:scale-105"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Result
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default DaysCalculator;
