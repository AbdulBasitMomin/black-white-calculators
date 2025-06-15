
import { useState, useEffect } from "react";
import { ArrowLeft, Copy, Check, Moon, Sun, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const SleepCalculator = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [bedtime, setBedtime] = useState("");
  const [wakeTime, setWakeTime] = useState("");
  const [calculationType, setCalculationType] = useState<"bedtime" | "waketime">("bedtime");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [result, setResult] = useState<{
    optimalTimes: string[];
    sleepCycles: number;
    totalSleep: string;
    powerNap?: boolean;
    noValidTimes?: boolean;
    timeUntilBedtime?: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const getCurrentTimeInMinutes = () => {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  };

  const timeStringToMinutes = (timeString: string) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const minutesToTimeString = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  const calculateTimeUntil = (targetTimeMinutes: number) => {
    const currentMinutes = getCurrentTimeInMinutes();
    let timeDiff = targetTimeMinutes - currentMinutes;
    
    if (timeDiff < 0) {
      timeDiff += 24 * 60; // Next day
    }
    
    const hours = Math.floor(timeDiff / 60);
    const minutes = timeDiff % 60;
    
    if (hours === 0) {
      return `${minutes} minutes`;
    } else if (minutes === 0) {
      return `${hours} hour${hours > 1 ? 's' : ''}`;
    } else {
      return `${hours} hour${hours > 1 ? 's' : ''} and ${minutes} minute${minutes > 1 ? 's' : ''}`;
    }
  };

  const calculateSleepTimes = () => {
    const sleepCycleDuration = 90; // minutes
    const fallAsleepTime = 15; // minutes to fall asleep
    const currentMinutes = getCurrentTimeInMinutes();

    if (calculationType === "bedtime" && wakeTime) {
      const wakeTimeMinutes = timeStringToMinutes(wakeTime);
      
      // Handle wake time tomorrow if it's earlier than current time
      let adjustedWakeTime = wakeTimeMinutes;
      if (wakeTimeMinutes <= currentMinutes) {
        adjustedWakeTime = wakeTimeMinutes + 24 * 60;
      }
      
      const optimalTimes: string[] = [];
      const cycles = [6, 5, 4]; // Recommended sleep cycles
      let validCycles: number[] = [];
      
      cycles.forEach(cycleCount => {
        const totalSleepMinutes = cycleCount * sleepCycleDuration + fallAsleepTime;
        let bedtimeMinutes = adjustedWakeTime - totalSleepMinutes;
        
        // Normalize bedtime to current day
        if (bedtimeMinutes >= 24 * 60) {
          bedtimeMinutes -= 24 * 60;
        } else if (bedtimeMinutes < 0) {
          bedtimeMinutes += 24 * 60;
        }
        
        // Check if bedtime is in the future (at least 5 minutes from now)
        const isValidBedtime = bedtimeMinutes > currentMinutes + 5;
        
        if (isValidBedtime) {
          optimalTimes.push(minutesToTimeString(bedtimeMinutes));
          validCycles.push(cycleCount);
        }
      });

      // Check if we need to suggest a power nap
      const timeUntilWake = adjustedWakeTime - currentMinutes;
      const isPowerNapTime = timeUntilWake < sleepCycleDuration + fallAsleepTime && timeUntilWake > 20;

      if (optimalTimes.length === 0) {
        if (isPowerNapTime) {
          setResult({
            optimalTimes: [],
            sleepCycles: 0,
            totalSleep: "0 hours",
            powerNap: true,
            timeUntilBedtime: calculateTimeUntil(wakeTimeMinutes)
          });
        } else {
          setResult({
            optimalTimes: [],
            sleepCycles: 0,
            totalSleep: "0 hours",
            noValidTimes: true
          });
        }
      } else {
        const firstBedtimeMinutes = timeStringToMinutes(optimalTimes[0]);
        setResult({
          optimalTimes,
          sleepCycles: validCycles[0],
          totalSleep: `${validCycles[0] * 1.5} hours`,
          timeUntilBedtime: calculateTimeUntil(firstBedtimeMinutes)
        });
      }

    } else if (calculationType === "waketime" && bedtime) {
      // Calculate wake times for given bedtime
      const bedtimeMinutes = timeStringToMinutes(bedtime);
      
      const optimalTimes: string[] = [];
      const cycles = [4, 5, 6]; // Different sleep cycle options
      
      cycles.forEach(cycleCount => {
        const totalSleepMinutes = cycleCount * sleepCycleDuration + fallAsleepTime;
        let wakeTimeMinutes = bedtimeMinutes + totalSleepMinutes;
        
        // Handle next day
        if (wakeTimeMinutes >= 24 * 60) {
          wakeTimeMinutes -= 24 * 60;
        }
        
        optimalTimes.push(minutesToTimeString(wakeTimeMinutes));
      });

      setResult({
        optimalTimes,
        sleepCycles: cycles[1],
        totalSleep: `${cycles[1] * 1.5} hours`
      });
    } else {
      toast({
        title: "Please enter a time",
        variant: "destructive",
      });
    }
  };

  const copyResult = async () => {
    if (!result) return;
    
    const text = `Optimal sleep times: ${result.optimalTimes.join(', ')} (${result.sleepCycles} cycles, ${result.totalSleep})`;
    
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

        {/* Current Time Display */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-center space-x-3">
              <Clock className="w-5 h-5 text-purple-500" />
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                Current Time: {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Mode Selection */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Button
            variant={calculationType === "bedtime" ? "default" : "outline"}
            onClick={() => setCalculationType("bedtime")}
            className={`p-6 rounded-2xl ${calculationType === "bedtime" ? "bg-purple-500 text-white" : "border-gray-200 dark:border-gray-700"}`}
          >
            <Moon className="w-5 h-5 mr-2" />
            Find Bedtime
          </Button>
          <Button
            variant={calculationType === "waketime" ? "default" : "outline"}
            onClick={() => setCalculationType("waketime")}
            className={`p-6 rounded-2xl ${calculationType === "waketime" ? "bg-purple-500 text-white" : "border-gray-200 dark:border-gray-700"}`}
          >
            <Sun className="w-5 h-5 mr-2" />
            Find Wake Time
          </Button>
        </div>

        {/* Calculator Card */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl mb-8">
          <CardContent className="p-8">
            <div className="space-y-6">
              {calculationType === "bedtime" ? (
                <div>
                  <Label htmlFor="waketime" className="text-lg font-semibold mb-3 block text-gray-900 dark:text-white">
                    What time do you want to wake up?
                  </Label>
                  <Input
                    id="waketime"
                    type="time"
                    value={wakeTime}
                    onChange={(e) => setWakeTime(e.target.value)}
                    className="w-full p-4 text-lg rounded-xl border-gray-200 dark:border-gray-700"
                  />
                </div>
              ) : (
                <div>
                  <Label htmlFor="bedtime" className="text-lg font-semibold mb-3 block text-gray-900 dark:text-white">
                    What time are you going to bed?
                  </Label>
                  <Input
                    id="bedtime"
                    type="time"
                    value={bedtime}
                    onChange={(e) => setBedtime(e.target.value)}
                    className="w-full p-4 text-lg rounded-xl border-gray-200 dark:border-gray-700"
                  />
                </div>
              )}

              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-6">
                <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Sleep Science</h4>
                <p className="text-sm text-purple-600 dark:text-purple-400">
                  Sleep occurs in 90-minute cycles. Waking up at the end of a complete cycle helps you feel more refreshed and alert.
                </p>
              </div>

              <Button
                onClick={calculateSleepTimes}
                className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 text-lg rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Optimize Sleep
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {result && (
          <div className="space-y-6 animate-fadeIn">
            {result.noValidTimes ? (
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-orange-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                    Not Enough Time
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Not enough time to complete a full sleep cycle before your wake-up time. Consider adjusting your wake time or taking a short nap.
                  </p>
                </CardContent>
              </Card>
            ) : result.powerNap ? (
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Moon className="w-8 h-8 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                    Power Nap Recommended
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    You have {result.timeUntilBedtime} until your wake time. Consider a 20-30 minute power nap instead of a full sleep cycle.
                  </p>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4">
                    <p className="text-sm text-blue-600 dark:text-blue-400">
                      Power naps can help refresh you without entering deep sleep phases that might leave you groggy.
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Optimal Times */}
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
                      {calculationType === "bedtime" ? "Optimal Bedtimes" : "Optimal Wake Times"}
                    </h3>
                    
                    {result.timeUntilBedtime && calculationType === "bedtime" && (
                      <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-4 mb-6 text-center">
                        <p className="text-green-700 dark:text-green-300 font-semibold">
                          Next bedtime in: {result.timeUntilBedtime}
                        </p>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      {result.optimalTimes.map((time, index) => (
                        <div 
                          key={index} 
                          className={`bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 rounded-2xl p-6 text-center transition-all duration-300 ${
                            index === 0 && calculationType === "bedtime" ? 'ring-2 ring-purple-400 animate-pulse' : ''
                          }`}
                        >
                          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                            {time}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">
                            {calculationType === "bedtime" ? 
                              `${[6, 5, 4][index]} cycles (${[9, 7.5, 6][index]}h)` :
                              `${[4, 5, 6][index]} cycles (${[6, 7.5, 9][index]}h)`
                            }
                          </div>
                          {index === 0 && calculationType === "bedtime" && (
                            <div className="text-xs text-purple-500 dark:text-purple-400 mt-1 font-medium">
                              Recommended
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    <Button
                      onClick={copyResult}
                      variant="outline"
                      className="w-full border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                    >
                      {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                      {copied ? "Copied!" : "Copy Times"}
                    </Button>
                  </CardContent>
                </Card>

                {/* Sleep Tips */}
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
                  <CardContent className="p-8">
                    <h4 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Sleep Optimization Tips</h4>
                    
                    <div className="space-y-3">
                      <div className="flex items-start text-gray-600 dark:text-gray-300">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                        Keep a consistent sleep schedule, even on weekends
                      </div>
                      <div className="flex items-start text-gray-600 dark:text-gray-300">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                        Avoid screens 1 hour before bedtime
                      </div>
                      <div className="flex items-start text-gray-600 dark:text-gray-300">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                        Keep your bedroom cool, dark, and quiet
                      </div>
                      <div className="flex items-start text-gray-600 dark:text-gray-300">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                        Avoid caffeine 6 hours before bedtime
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SleepCalculator;
