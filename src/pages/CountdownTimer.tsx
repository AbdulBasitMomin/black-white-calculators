
import { useState, useEffect } from "react";
import { ArrowLeft, Play, Pause, RotateCcw, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const CountdownTimer = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [eventName, setEventName] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [targetTime, setTargetTime] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && targetDate && targetTime) {
      interval = setInterval(() => {
        const now = new Date().getTime();
        const target = new Date(`${targetDate}T${targetTime}`).getTime();
        const difference = target - now;

        if (difference > 0) {
          setTimeRemaining({
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((difference % (1000 * 60)) / 1000)
          });
        } else {
          setIsActive(false);
          toast({
            title: "Time's up!",
            description: `${eventName || 'Your event'} has arrived!`,
          });
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, targetDate, targetTime, eventName, toast]);

  const startTimer = () => {
    if (!targetDate || !targetTime) {
      toast({
        title: "Please set date and time",
        variant: "destructive",
      });
      return;
    }
    setIsActive(true);
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
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
              className="mr-4 rounded-full w-12 h-12 glass-button-light hover:scale-110 transition-all duration-300 shadow-lg"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700 dark:text-white drop-shadow-sm" />
            </Button>
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500/80 to-pink-600/80 rounded-3xl flex items-center justify-center shadow-2xl backdrop-blur-xl border border-white/20">
                <Clock className="w-7 h-7 text-white drop-shadow-sm" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 via-purple-600 to-pink-600 dark:from-white dark:via-purple-100 dark:to-pink-100 bg-clip-text text-transparent drop-shadow-sm">
                Countdown Timer
              </h1>
            </div>
          </div>

          {/* Timer Setup Card */}
          <Card className="glass-card-light shadow-2xl mb-8 rounded-[2rem] overflow-hidden">
            <CardContent className="p-8">
              <div className="space-y-8">
                <div className="space-y-3">
                  <Label htmlFor="eventname" className="text-xl font-semibold text-gray-800 dark:text-white drop-shadow-sm">
                    Event Name (Optional)
                  </Label>
                  <Input
                    id="eventname"
                    type="text"
                    placeholder="New Year 2025"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    className="w-full p-6 text-xl rounded-2xl glass-button-light text-gray-800 dark:text-white placeholder:text-gray-500 dark:placeholder:text-white/60 transition-all duration-300 shadow-lg"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="targetdate" className="text-xl font-semibold text-gray-800 dark:text-white drop-shadow-sm">
                      Target Date
                    </Label>
                    <Input
                      id="targetdate"
                      type="date"
                      value={targetDate}
                      onChange={(e) => setTargetDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full p-6 text-xl rounded-2xl glass-button-light text-gray-800 dark:text-white placeholder:text-gray-500 dark:placeholder:text-white/60 transition-all duration-300 shadow-lg"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="targettime" className="text-xl font-semibold text-gray-800 dark:text-white drop-shadow-sm">
                      Target Time
                    </Label>
                    <Input
                      id="targettime"
                      type="time"
                      value={targetTime}
                      onChange={(e) => setTargetTime(e.target.value)}
                      className="w-full p-6 text-xl rounded-2xl glass-button-light text-gray-800 dark:text-white placeholder:text-gray-500 dark:placeholder:text-white/60 transition-all duration-300 shadow-lg"
                    />
                  </div>
                </div>

                <div className="flex space-x-4">
                  {!isActive ? (
                    <Button
                      onClick={startTimer}
                      className="flex items-center space-x-2 bg-gradient-to-r from-green-500/80 to-emerald-600/80 hover:from-green-600/80 hover:to-emerald-700/80 text-white px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg backdrop-blur-xl border border-white/20"
                    >
                      <Play className="w-5 h-5" />
                      <span>Start</span>
                    </Button>
                  ) : (
                    <Button
                      onClick={pauseTimer}
                      className="flex items-center space-x-2 bg-gradient-to-r from-yellow-500/80 to-amber-600/80 hover:from-yellow-600/80 hover:to-amber-700/80 text-white px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg backdrop-blur-xl border border-white/20"
                    >
                      <Pause className="w-5 h-5" />
                      <span>Pause</span>
                    </Button>
                  )}
                  
                  <Button
                    onClick={resetTimer}
                    variant="outline"
                    className="flex items-center space-x-2 px-6 py-3 rounded-full glass-button-light text-gray-700 dark:text-white transition-all duration-300 hover:scale-105"
                  >
                    <RotateCcw className="w-5 h-5" />
                    <span>Reset</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Countdown Display */}
          {(targetDate && targetTime) && (
            <Card className="glass-card-light shadow-2xl rounded-[2rem] overflow-hidden">
              <CardContent className="p-8 text-center">
                {eventName && (
                  <h3 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white drop-shadow-sm">
                    {eventName}
                  </h3>
                )}
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <div className="bg-purple-500/20 dark:bg-purple-500/20 rounded-2xl p-6 border border-purple-200 dark:border-white/20">
                    <div className="text-4xl font-bold text-gray-800 dark:text-white mb-2 drop-shadow-sm">
                      {timeRemaining.days}
                    </div>
                    <div className="text-gray-600 dark:text-white/80">Days</div>
                  </div>
                  <div className="bg-blue-500/20 dark:bg-blue-500/20 rounded-2xl p-6 border border-blue-200 dark:border-white/20">
                    <div className="text-4xl font-bold text-gray-800 dark:text-white mb-2 drop-shadow-sm">
                      {timeRemaining.hours}
                    </div>
                    <div className="text-gray-600 dark:text-white/80">Hours</div>
                  </div>
                  <div className="bg-pink-500/20 dark:bg-pink-500/20 rounded-2xl p-6 border border-blue-200 dark:border-white/20">
                    <div className="text-4xl font-bold text-gray-800 dark:text-white mb-2 drop-shadow-sm">
                      {timeRemaining.minutes}
                    </div>
                    <div className="text-gray-600 dark:text-white/80">Minutes</div>
                  </div>
                  <div className="bg-cyan-500/20 dark:bg-cyan-500/20 rounded-2xl p-6 border border-cyan-200 dark:border-white/20">
                    <div className="text-4xl font-bold text-gray-800 dark:text-white mb-2 drop-shadow-sm">
                      {timeRemaining.seconds}
                    </div>
                    <div className="text-gray-600 dark:text-white/80">Seconds</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
