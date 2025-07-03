import { useState } from "react";
import { ArrowLeft, Copy, Check, Moon, Clock, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import useScrollToTop from "@/hooks/useScrollToTop";

const SleepCalculator = () => {
  useScrollToTop();
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const [calculationType, setCalculationType] = useState("bedtime");
  const [wakeTime, setWakeTime] = useState("");
  const [bedTime, setBedTime] = useState("");
  const [result, setResult] = useState<{
    suggestedTimes: string[];
    totalSleep: string;
    sleepCycles: number;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const calculateSleep = () => {
    if (calculationType === "bedtime" && !wakeTime) {
      toast({
        title: "Please enter your wake-up time",
        variant: "destructive",
      });
      return;
    }

    if (calculationType === "waketime" && !bedTime) {
      toast({
        title: "Please enter your bedtime",
        variant: "destructive",
      });
      return;
    }

    if (calculationType === "bedtime") {
      // Calculate bedtime based on wake time
      const wake = new Date(`2000-01-01 ${wakeTime}`);
      const suggestedTimes: string[] = [];
      
      // Sleep cycles are typically 90 minutes
      // Recommend 4-6 cycles (6-9 hours)
      for (let cycles = 6; cycles >= 4; cycles--) {
        const sleepTime = new Date(wake.getTime() - (cycles * 90 * 60 * 1000) - (15 * 60 * 1000)); // 15 min to fall asleep
        const hours = sleepTime.getHours().toString().padStart(2, '0');
        const minutes = sleepTime.getMinutes().toString().padStart(2, '0');
        suggestedTimes.push(`${hours}:${minutes}`);
      }

      setResult({
        suggestedTimes,
        totalSleep: "6-9 hours",
        sleepCycles: 6
      });
    } else {
      // Calculate wake time based on bedtime
      const bed = new Date(`2000-01-01 ${bedTime}`);
      const suggestedTimes: string[] = [];
      
      for (let cycles = 4; cycles <= 6; cycles++) {
        const wakeTime = new Date(bed.getTime() + (cycles * 90 * 60 * 1000) + (15 * 60 * 1000));
        const hours = wakeTime.getHours().toString().padStart(2, '0');
        const minutes = wakeTime.getMinutes().toString().padStart(2, '0');
        suggestedTimes.push(`${hours}:${minutes}`);
      }

      setResult({
        suggestedTimes,
        totalSleep: "6-9 hours",
        sleepCycles: 5
      });
    }
  };

  const copyResult = async () => {
    if (!result) return;
    
    const text = `Sleep Schedule: ${result.suggestedTimes.join(", ")} | ${result.totalSleep} total sleep`;
    
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 pt-16">
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
            <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center">
              <Moon className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Sleep Calculator</h1>
          </div>
        </div>

        {/* Calculator Card */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl mb-8">
          <CardContent className="p-8">
            <div className="space-y-6">
              <div>
                <Label className="text-lg font-semibold mb-3 block text-gray-900 dark:text-white">
                  What do you want to calculate?
                </Label>
                <Select value={calculationType} onValueChange={setCalculationType}>
                  <SelectTrigger className="w-full p-4 text-lg rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bedtime">When to go to bed</SelectItem>
                    <SelectItem value="waketime">When to wake up</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {calculationType === "bedtime" ? (
                <div>
                  <Label htmlFor="wakeTime" className="text-lg font-semibold mb-3 block text-gray-900 dark:text-white">
                    What time do you want to wake up?
                  </Label>
                  <Input
                    id="wakeTime"
                    type="time"
                    value={wakeTime}
                    onChange={(e) => setWakeTime(e.target.value)}
                    className="w-full p-4 text-lg rounded-xl border-gray-200 dark:border-gray-700"
                  />
                </div>
              ) : (
                <div>
                  <Label htmlFor="bedTime" className="text-lg font-semibold mb-3 block text-gray-900 dark:text-white">
                    What time do you go to bed?
                  </Label>
                  <Input
                    id="bedTime"
                    type="time"
                    value={bedTime}
                    onChange={(e) => setBedTime(e.target.value)}
                    className="w-full p-4 text-lg rounded-xl border-gray-200 dark:border-gray-700"
                  />
                </div>
              )}

              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-6">
                <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Sleep Cycles</h4>
                <p className="text-sm text-purple-600 dark:text-purple-400">
                  Sleep occurs in cycles of about 90 minutes. Waking up at the end of a cycle 
                  helps you feel more refreshed. We calculate the best times based on 4-6 complete cycles.
                </p>
              </div>

              <Button
                onClick={calculateSleep}
                className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 text-lg rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Calculate Sleep Times
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
                  {calculationType === "bedtime" ? <Moon className="w-6 h-6 mr-2" /> : <Sun className="w-6 h-6 mr-2" />}
                  {calculationType === "bedtime" ? "Bedtime Suggestions" : "Wake Time Suggestions"}
                </h3>
                
                <div className="space-y-4 mb-6">
                  {result.suggestedTimes.map((time, index) => (
                    <div key={index} className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-2xl p-6 text-center">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                        {time}
                      </div>
                      <div className="text-gray-600 dark:text-gray-300">
                        {6 - index} sleep cycles ({(6 - index) * 1.5} hours)
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-2xl p-6 text-center mb-6">
                  <div className="flex items-center justify-center mb-2">
                    <Clock className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
                    <span className="text-lg font-bold text-green-600 dark:text-green-400">
                      Recommended Sleep Duration
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {result.totalSleep}
                  </div>
                </div>
                
                <Button
                  onClick={copyResult}
                  variant="outline"
                  className="w-full border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                >
                  {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                  {copied ? "Copied!" : "Copy Sleep Schedule"}
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default SleepCalculator;
