
import { useState } from "react";
import { ArrowLeft, Copy, Check } from "lucide-react";
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
    <div className="min-h-screen min-h-[100dvh] bg-black text-white container-responsive section-spacing neue-haas safe-area-top safe-area-bottom">
      <div className="max-w-2xl mx-auto w-full">
        {/* Header */}
        <div className="flex items-center mb-6 sm:mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="mr-3 sm:mr-4 rounded-full hover:bg-gray-800 electric-glow touch-target w-12 h-12 sm:w-14 sm:h-14"
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </Button>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">Days Calculator</h1>
        </div>

        {/* Calculator Card */}
        <Card className="card-electric bg-black border-gray-800">
          <CardContent className="card-spacing">
            <div className="space-y-6">
              {/* Start Date */}
              <div>
                <Label htmlFor="startdate" className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 block">
                  Start Date
                </Label>
                <Input
                  id="startdate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="input-electric"
                />
              </div>

              {/* End Date */}
              <div>
                <Label htmlFor="enddate" className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 block">
                  End Date
                </Label>
                <Input
                  id="enddate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="input-electric"
                />
              </div>

              <Button
                onClick={calculateDays}
                className="pill-button w-full bg-white text-black hover:bg-gray-100 electric-glow-strong font-bold touch-target"
              >
                Calculate Days
              </Button>

              {/* Result */}
              {result && (
                <div className="mt-6 sm:mt-8 smooth-fade-in">
                  <div className="bg-gray-900 rounded-[20px] sm:rounded-[30px] p-4 sm:p-6 text-center">
                    <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Time Difference</h3>
                    
                    {/* Total Days */}
                    <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-800 rounded-[15px] sm:rounded-[20px]">
                      <div className="text-3xl sm:text-4xl font-bold text-white mb-1 sm:mb-2">
                        {result.totalDays.toLocaleString()}
                      </div>
                      <div className="text-gray-400 text-base sm:text-lg">Total Days</div>
                    </div>

                    {/* Breakdown */}
                    <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
                      <div>
                        <div className="text-xl sm:text-2xl font-bold text-white">{result.years}</div>
                        <div className="text-gray-400 text-sm sm:text-base">Years</div>
                      </div>
                      <div>
                        <div className="text-xl sm:text-2xl font-bold text-white">{result.months}</div>
                        <div className="text-gray-400 text-sm sm:text-base">Months</div>
                      </div>
                      <div>
                        <div className="text-xl sm:text-2xl font-bold text-white">{result.days}</div>
                        <div className="text-gray-400 text-sm sm:text-base">Days</div>
                      </div>
                    </div>

                    <Button
                      onClick={copyResult}
                      variant="outline"
                      className="border-gray-700 text-white hover:bg-gray-800 rounded-full touch-target"
                    >
                      {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
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

export default DaysCalculator;
