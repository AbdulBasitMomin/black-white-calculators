import { useState } from "react";
import { ArrowLeft, Copy, Check, Calendar, Gift, CalendarIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import useScrollToTop from "@/hooks/useScrollToTop";

const AgeCalculator = () => {
  useScrollToTop();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [birthDate, setBirthDate] = useState<string>("");
  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
    hours: number;
    minutes: number;
    birthSeason: string;
    daysToNextBirthday: number;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const getSeason = (month: number) => {
    if (month >= 2 && month <= 4) return "🌸 Spring";
    if (month >= 5 && month <= 7) return "☀️ Summer";
    if (month >= 8 && month <= 10) return "🍂 Autumn";
    return "❄️ Winter";
  };

  const calculateAge = () => {
    if (!birthDate) {
      toast({
        title: "Please select your birth date",
        variant: "destructive",
      });
      return;
    }

    const birth = new Date(birthDate);
    const today = new Date();

    if (birth > today) {
      toast({
        title: "Birth date cannot be in the future",
        variant: "destructive",
      });
      return;
    }

    // Calculate detailed age
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // Calculate total time difference
    const diffMs = Math.abs(today.getTime() - birth.getTime());
    const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
    const totalMinutes = Math.floor(diffMs / (1000 * 60));
    
    // Get current time components
    const hours = today.getHours();
    const minutes = today.getMinutes();

    // Get birth season
    const birthSeason = getSeason(birth.getMonth());

    // Calculate days to next birthday
    const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    const daysToNextBirthday = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    setResult({
      years,
      months,
      days,
      hours,
      minutes,
      birthSeason,
      daysToNextBirthday
    });
  };

  const copyResult = async () => {
    if (!result) return;
    
    const text = `My age: ${result.years} years, ${result.months} months, ${result.days} days, ${result.hours} hours, and ${result.minutes} minutes. Born in ${result.birthSeason}. Next birthday in ${result.daysToNextBirthday} days!`;
    
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
                <Gift className="w-7 h-7 text-white drop-shadow-sm" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 via-purple-600 to-pink-600 dark:from-white dark:via-purple-100 dark:to-pink-100 bg-clip-text text-transparent drop-shadow-sm">
                Age Calculator
              </h1>
            </div>
          </div>

          {/* Calculator Card */}
          <Card className="glass-card-light shadow-2xl mb-8 rounded-[2rem] overflow-hidden">
            <CardContent className="p-8">
              <div className="space-y-8">
                <div className="space-y-3">
                  <Label htmlFor="birthdate" className="text-xl font-semibold text-gray-800 dark:text-white drop-shadow-sm">
                    Select your birth date
                  </Label>
                  <div className="relative">
                    <Input
                      type="date"
                      id="birthdate"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      max={new Date().toISOString().split('T')[0]}
                      min="1900-01-01"
                      className="w-full p-6 text-xl rounded-2xl glass-button-light text-gray-800 dark:text-white border-white/20 focus:border-purple-500/50 transition-all duration-300 shadow-lg"
                    />
                    <CalendarIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-500 dark:text-white/60 pointer-events-none" />
                  </div>
                </div>

                <Button
                  onClick={calculateAge}
                  className="w-full bg-gradient-to-r from-purple-500/80 to-pink-600/80 hover:from-purple-600/80 hover:to-pink-700/80 text-white font-bold py-6 text-xl rounded-full transition-all duration-300 hover:scale-105 shadow-2xl backdrop-blur-xl border border-white/20"
                >
                  Calculate Age
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          {result && (
            <div className="space-y-6 animate-fadeIn">
              {/* Main Age Display */}
              <Card className="glass-card-light shadow-2xl rounded-[2rem] overflow-hidden">
                <CardContent className="p-8 text-center">
                  <h3 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white drop-shadow-sm">Your Detailed Age</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                    <div className="bg-purple-500/20 dark:bg-purple-500/20 rounded-2xl p-4 border border-purple-200 dark:border-white/20">
                      <div className="text-3xl font-bold text-gray-800 dark:text-white mb-2 drop-shadow-sm">{result.years}</div>
                      <div className="text-gray-600 dark:text-white/80">Years</div>
                    </div>
                    <div className="bg-blue-500/20 dark:bg-blue-500/20 rounded-2xl p-4 border border-blue-200 dark:border-white/20">
                      <div className="text-3xl font-bold text-gray-800 dark:text-white mb-2 drop-shadow-sm">{result.months}</div>
                      <div className="text-gray-600 dark:text-white/80">Months</div>
                    </div>
                    <div className="bg-pink-500/20 dark:bg-pink-500/20 rounded-2xl p-4 border border-pink-200 dark:border-white/20">
                      <div className="text-3xl font-bold text-gray-800 dark:text-white mb-2 drop-shadow-sm">{result.days}</div>
                      <div className="text-gray-600 dark:text-white/80">Days</div>
                    </div>
                    <div className="bg-cyan-500/20 dark:bg-cyan-500/20 rounded-2xl p-4 border border-cyan-200 dark:border-white/20">
                      <div className="text-3xl font-bold text-gray-800 dark:text-white mb-2 drop-shadow-sm">{result.hours}</div>
                      <div className="text-gray-600 dark:text-white/80">Hours</div>
                    </div>
                    <div className="bg-emerald-500/20 dark:bg-emerald-500/20 rounded-2xl p-4 border border-emerald-200 dark:border-white/20">
                      <div className="text-3xl font-bold text-gray-800 dark:text-white mb-2 drop-shadow-sm">{result.minutes}</div>
                      <div className="text-gray-600 dark:text-white/80">Minutes</div>
                    </div>
                  </div>
                  
                  <Button
                    onClick={copyResult}
                    variant="outline"
                    className="glass-button-light text-gray-700 dark:text-white rounded-full px-6 py-3 transition-all duration-300 hover:scale-105"
                  >
                    {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                    {copied ? "Copied!" : "Copy Result"}
                  </Button>
                </CardContent>
              </Card>

              {/* Additional Insights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glass-card-light shadow-2xl rounded-[2rem] overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Calendar className="w-5 h-5 mr-3 text-gray-700 dark:text-white drop-shadow-sm" />
                      <h4 className="text-lg font-bold text-gray-800 dark:text-white drop-shadow-sm">Birth Season</h4>
                    </div>
                    <div className="text-2xl font-bold text-center py-2 text-gray-800 dark:text-white drop-shadow-sm">
                      {result.birthSeason}
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card-light shadow-2xl rounded-[2rem] overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Gift className="w-5 h-5 mr-3 text-gray-700 dark:text-white drop-shadow-sm" />
                      <h4 className="text-lg font-bold text-gray-800 dark:text-white drop-shadow-sm">Next Birthday</h4>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-800 dark:text-white mb-1 drop-shadow-sm">{result.daysToNextBirthday}</div>
                      <div className="text-gray-600 dark:text-white/80">Days to go!</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgeCalculator;
