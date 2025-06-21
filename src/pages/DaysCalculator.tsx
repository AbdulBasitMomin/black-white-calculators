
import { useState } from "react";
import { ArrowLeft, Copy, Check, Calendar, Clock, Plus } from "lucide-react";
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
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [showStartTime, setShowStartTime] = useState(false);
  const [showEndTime, setShowEndTime] = useState(false);
  const [result, setResult] = useState<{
    totalDays: number;
    totalHours: number;
    totalMinutes: number;
    years: number;
    months: number;
    days: number;
    hours: number;
    minutes: number;
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

    // Use time if selected, otherwise default to 00:00
    const startTimeValue = showStartTime && startTime ? startTime : "00:00";
    const endTimeValue = showEndTime && endTime ? endTime : "00:00";

    // Combine date and time for precise calculations
    const start = new Date(`${startDate}T${startTimeValue}`);
    const end = new Date(`${endDate}T${endTimeValue}`);

    if (start > end) {
      toast({
        title: "Start date/time must be before end date/time",
        variant: "destructive",
      });
      return;
    }

    // Calculate total time difference
    const timeDiff = end.getTime() - start.getTime();
    const totalMinutes = Math.floor(timeDiff / (1000 * 60));
    const totalHours = Math.floor(timeDiff / (1000 * 3600));
    const totalDays = Math.floor(timeDiff / (1000 * 3600 * 24));

    // Calculate detailed breakdown
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();
    let hours = end.getHours() - start.getHours();
    let minutes = end.getMinutes() - start.getMinutes();

    // Adjust for negative values
    if (minutes < 0) {
      hours--;
      minutes += 60;
    }

    if (hours < 0) {
      days--;
      hours += 24;
    }

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
      totalHours,
      totalMinutes,
      years,
      months,
      days,
      hours,
      minutes
    });
  };

  const copyResult = async () => {
    if (!result) return;
    
    const text = `Time between dates: ${result.totalDays} days, ${result.totalHours} hours, ${result.totalMinutes} minutes (${result.years} years, ${result.months} months, ${result.days} days, ${result.hours} hours, ${result.minutes} minutes)`;
    
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
        <div className="max-w-2xl mx-auto px-6 py-8">
          {/* Glass Header */}
          <div className="flex items-center mb-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="mr-4 rounded-full w-12 h-12 glass-button-light text-gray-700 dark:text-white hover:scale-110 shadow-lg"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500/80 to-pink-600/80 rounded-3xl flex items-center justify-center shadow-2xl backdrop-blur-xl border border-white/20">
                <Calendar className="w-7 h-7 text-white drop-shadow-sm" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 via-purple-600 to-pink-600 dark:from-white dark:via-purple-100 dark:to-pink-100 bg-clip-text text-transparent drop-shadow-sm">
                Days Calculator
              </h1>
            </div>
          </div>

          {/* Main Glass Calculator Card */}
          <Card className="glass-card-light shadow-2xl mb-8 rounded-[2rem] overflow-hidden">
            <CardContent className="p-8">
              <div className="space-y-8">
                {/* Start Date & Time */}
                <div className="space-y-4">
                  <Label className="text-xl font-semibold text-gray-800 dark:text-white drop-shadow-sm flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Start Date
                  </Label>
                  <div className="space-y-4">
                    <Input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full p-4 text-lg rounded-2xl glass-input text-gray-800 dark:text-white"
                    />
                    {!showStartTime && (
                      <Button
                        variant="outline"
                        onClick={() => setShowStartTime(true)}
                        className="flex items-center gap-2 rounded-full glass-button-light text-gray-700 dark:text-white"
                      >
                        <Plus className="w-4 h-4" />
                        Add Time
                      </Button>
                    )}
                    {showStartTime && (
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-white/60" />
                        <Input
                          type="time"
                          value={startTime}
                          onChange={(e) => setStartTime(e.target.value)}
                          className="w-full p-4 pl-12 text-lg rounded-2xl glass-input text-gray-800 dark:text-white"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* End Date & Time */}
                <div className="space-y-4">
                  <Label className="text-xl font-semibold text-gray-800 dark:text-white drop-shadow-sm flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    End Date
                  </Label>
                  <div className="space-y-4">
                    <Input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full p-4 text-lg rounded-2xl glass-input text-gray-800 dark:text-white"
                    />
                    {!showEndTime && (
                      <Button
                        variant="outline"
                        onClick={() => setShowEndTime(true)}
                        className="flex items-center gap-2 rounded-full glass-button-light text-gray-700 dark:text-white"
                      >
                        <Plus className="w-4 h-4" />
                        Add Time
                      </Button>
                    )}
                    {showEndTime && (
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-white/60" />
                        <Input
                          type="time"
                          value={endTime}
                          onChange={(e) => setEndTime(e.target.value)}
                          className="w-full p-4 pl-12 text-lg rounded-2xl glass-input text-gray-800 dark:text-white"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <Button
                  onClick={calculateDays}
                  className="w-full bg-gradient-to-r from-purple-500/80 to-pink-600/80 hover:from-purple-600/80 hover:to-pink-700/80 text-white font-bold py-6 text-xl rounded-full transition-all duration-300 hover:scale-105 shadow-2xl backdrop-blur-xl border border-white/20"
                >
                  Calculate Time Difference
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Glass Card */}
          {result && (
            <Card className="glass-card-light shadow-2xl animate-fadeIn rounded-[2rem] overflow-hidden">
              <CardContent className="p-8 text-center">
                <h3 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white drop-shadow-sm">Time Difference</h3>
                
                {/* Total Time Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="glass-info-card rounded-2xl p-6 border border-purple-200/30 dark:border-white/20">
                    <div className="text-3xl font-bold bg-gradient-to-r from-gray-800 via-purple-600 to-pink-600 dark:from-white dark:via-purple-100 dark:to-pink-100 bg-clip-text text-transparent mb-2">
                      {result.totalDays.toLocaleString()}
                    </div>
                    <div className="text-gray-600 dark:text-white/80">Total Days</div>
                  </div>
                  <div className="glass-info-card rounded-2xl p-6 border border-blue-200/30 dark:border-white/20">
                    <div className="text-3xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-cyan-600 dark:from-white dark:via-blue-100 dark:to-cyan-100 bg-clip-text text-transparent mb-2">
                      {result.totalHours.toLocaleString()}
                    </div>
                    <div className="text-gray-600 dark:text-white/80">Total Hours</div>
                  </div>
                  <div className="glass-info-card rounded-2xl p-6 border border-pink-200/30 dark:border-white/20">
                    <div className="text-3xl font-bold bg-gradient-to-r from-gray-800 via-pink-600 to-rose-600 dark:from-white dark:via-pink-100 dark:to-rose-100 bg-clip-text text-transparent mb-2">
                      {result.totalMinutes.toLocaleString()}
                    </div>
                    <div className="text-gray-600 dark:text-white/80">Total Minutes</div>
                  </div>
                </div>

                {/* Detailed Breakdown */}
                <div className="mb-8">
                  <h4 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Detailed Breakdown</h4>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    <div className="bg-purple-500/20 dark:bg-purple-500/20 rounded-xl p-4 border border-purple-200 dark:border-white/20">
                      <div className="text-2xl font-bold text-gray-800 dark:text-white mb-1">{result.years}</div>
                      <div className="text-sm text-gray-600 dark:text-white/80">Years</div>
                    </div>
                    <div className="bg-blue-500/20 dark:bg-blue-500/20 rounded-xl p-4 border border-blue-200 dark:border-white/20">
                      <div className="text-2xl font-bold text-gray-800 dark:text-white mb-1">{result.months}</div>
                      <div className="text-sm text-gray-600 dark:text-white/80">Months</div>
                    </div>
                    <div className="bg-pink-500/20 dark:bg-pink-500/20 rounded-xl p-4 border border-pink-200 dark:border-white/20">
                      <div className="text-2xl font-bold text-gray-800 dark:text-white mb-1">{result.days}</div>
                      <div className="text-sm text-gray-600 dark:text-white/80">Days</div>
                    </div>
                    <div className="bg-green-500/20 dark:bg-green-500/20 rounded-xl p-4 border border-green-200 dark:border-white/20">
                      <div className="text-2xl font-bold text-gray-800 dark:text-white mb-1">{result.hours}</div>
                      <div className="text-sm text-gray-600 dark:text-white/80">Hours</div>
                    </div>
                    <div className="bg-cyan-500/20 dark:bg-cyan-500/20 rounded-xl p-4 border border-cyan-200 dark:border-white/20">
                      <div className="text-2xl font-bold text-gray-800 dark:text-white mb-1">{result.minutes}</div>
                      <div className="text-sm text-gray-600 dark:text-white/80">Minutes</div>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={copyResult}
                  variant="outline"
                  className="glass-button-light text-gray-700 dark:text-white rounded-full px-6 py-3 transition-all duration-300 hover:scale-105"
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
