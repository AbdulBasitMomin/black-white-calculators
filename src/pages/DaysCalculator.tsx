
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
    <div className="min-h-screen bg-black text-white px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="mr-4 rounded-full hover:bg-gray-800"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-4xl md:text-5xl font-bold">Days Calculator</h1>
        </div>

        {/* Calculator Card */}
        <Card className="bg-black border-gray-800 rounded-3xl">
          <CardContent className="p-8">
            <div className="space-y-6">
              {/* Start Date */}
              <div>
                <Label htmlFor="startdate" className="text-lg font-semibold mb-3 block">
                  Start Date
                </Label>
                <Input
                  id="startdate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-gray-900 border-gray-700 rounded-2xl text-lg py-6 focus-glow"
                />
              </div>

              {/* End Date */}
              <div>
                <Label htmlFor="enddate" className="text-lg font-semibold mb-3 block">
                  End Date
                </Label>
                <Input
                  id="enddate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-gray-900 border-gray-700 rounded-2xl text-lg py-6 focus-glow"
                />
              </div>

              <Button
                onClick={calculateDays}
                className="w-full bg-white text-black hover:bg-gray-200 text-lg py-6 rounded-3xl hover-scale button-glow font-semibold"
              >
                Calculate Days
              </Button>

              {/* Result */}
              {result && (
                <div className="mt-8 animate-fade-in">
                  <div className="bg-gray-900 rounded-3xl p-6 text-center">
                    <h3 className="text-2xl font-bold mb-6">Time Difference</h3>
                    
                    {/* Total Days */}
                    <div className="mb-6 p-4 bg-gray-800 rounded-2xl">
                      <div className="text-4xl font-bold text-white mb-2">
                        {result.totalDays.toLocaleString()}
                      </div>
                      <div className="text-gray-400 text-lg">Total Days</div>
                    </div>

                    {/* Breakdown */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div>
                        <div className="text-2xl font-bold text-white">{result.years}</div>
                        <div className="text-gray-400">Years</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-white">{result.months}</div>
                        <div className="text-gray-400">Months</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-white">{result.days}</div>
                        <div className="text-gray-400">Days</div>
                      </div>
                    </div>

                    <Button
                      onClick={copyResult}
                      variant="outline"
                      className="border-gray-700 text-white hover:bg-gray-800 rounded-2xl"
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
