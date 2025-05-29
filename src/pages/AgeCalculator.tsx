
import { useState } from "react";
import { ArrowLeft, Copy, Check, Calendar, Gift } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const AgeCalculator = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [birthDate, setBirthDate] = useState("");
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
        title: "Please enter your birth date",
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

    // Calculate hours and minutes
    const diffMs = today.getTime() - birth.getTime();
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

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
    <div className="min-h-screen min-h-[100dvh] bg-black text-white container-responsive section-spacing neue-haas safe-area-top safe-area-bottom">
      <div className="max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="flex items-center mb-6 sm:mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="mr-4 sm:mr-6 rounded-full hover:bg-gray-800 electric-glow touch-target w-12 h-12 sm:w-14 sm:h-14"
          >
            <ArrowLeft className="w-5 h-5 sm:w-7 sm:h-7" />
          </Button>
          <h1 className="text-hierarchy-lg">Age Calculator</h1>
        </div>

        {/* Calculator Card */}
        <Card className="card-electric bg-black border-gray-800 mb-6 sm:mb-8">
          <CardContent className="card-spacing">
            <div className="space-y-6 sm:space-y-8">
              <div>
                <Label htmlFor="birthdate" className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 block">
                  Enter your birth date
                </Label>
                <Input
                  id="birthdate"
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="input-electric w-full"
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>

              <Button
                onClick={calculateAge}
                className="pill-button w-full bg-white text-black hover:bg-gray-100 electric-glow-strong font-bold touch-target"
              >
                Calculate Age
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {result && (
          <div className="space-y-4 sm:space-y-6 smooth-fade-in">
            {/* Main Age Display */}
            <Card className="card-electric bg-black border-gray-800">
              <CardContent className="card-spacing text-center">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Your Detailed Age</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-1 sm:mb-2">{result.years}</div>
                    <div className="text-gray-300 text-sm sm:text-base">Years</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-1 sm:mb-2">{result.months}</div>
                    <div className="text-gray-300 text-sm sm:text-base">Months</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-1 sm:mb-2">{result.days}</div>
                    <div className="text-gray-300 text-sm sm:text-base">Days</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-1 sm:mb-2">{result.hours}</div>
                    <div className="text-gray-300 text-sm sm:text-base">Hours</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-1 sm:mb-2">{result.minutes}</div>
                    <div className="text-gray-300 text-sm sm:text-base">Minutes</div>
                  </div>
                </div>
                
                <Button
                  onClick={copyResult}
                  variant="outline"
                  className="border-gray-600 text-white hover:bg-gray-800 electric-glow rounded-full px-4 py-2 sm:px-6 sm:py-3 touch-target"
                >
                  {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                  {copied ? "Copied!" : "Copy Result"}
                </Button>
              </CardContent>
            </Card>

            {/* Additional Insights */}
            <div className="grid-responsive">
              <Card className="card-electric bg-black border-gray-800">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-cyan-400" />
                    <h4 className="text-base sm:text-lg font-bold">Birth Season</h4>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-center py-2">
                    {result.birthSeason}
                  </div>
                </CardContent>
              </Card>

              <Card className="card-electric bg-black border-gray-800">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <Gift className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-cyan-400" />
                    <h4 className="text-base sm:text-lg font-bold">Next Birthday</h4>
                  </div>
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-bold text-cyan-400 mb-1">{result.daysToNextBirthday}</div>
                    <div className="text-gray-300 text-sm sm:text-base">Days to go!</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgeCalculator;
