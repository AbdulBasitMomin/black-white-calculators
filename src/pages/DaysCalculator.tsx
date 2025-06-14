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
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto w-full">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="mr-4 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 w-14 h-14"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Days Calculator</h1>
          </div>

          {/* Calculator Card */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
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
                    className="w-full p-6 text-lg"
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
                    className="w-full p-6 text-lg"
                  />
                </div>

                <Button
                  onClick={calculateDays}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 text-lg rounded-full transition-all duration-300 hover:scale-105"
                >
                  Calculate Days
                </Button>

                {/* Result */}
                {result && (
                  <div className="mt-8 animate-fadeIn">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 text-center">
                      <h3 className="text-2xl font-bold mb-6">Time Difference</h3>
                      
                      {/* Total Days */}
                      <div className="mb-6 p-4 bg-white dark:bg-gray-600 rounded-lg">
                        <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                          {result.totalDays.toLocaleString()}
                        </div>
                        <div className="text-gray-600 dark:text-gray-300 text-lg">Total Days</div>
                      </div>

                      {/* Breakdown */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div>
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">{result.years}</div>
                          <div className="text-gray-600 dark:text-gray-300">Years</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">{result.months}</div>
                          <div className="text-gray-600 dark:text-gray-300">Months</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">{result.days}</div>
                          <div className="text-gray-600 dark:text-gray-300">Days</div>
                        </div>
                      </div>

                      <Button
                        onClick={copyResult}
                        variant="outline"
                        className="border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full"
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
    </div>
  );
};

export default DaysCalculator;
