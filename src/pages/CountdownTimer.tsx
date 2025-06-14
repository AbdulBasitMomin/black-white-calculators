
import { useState, useEffect } from "react";
import { ArrowLeft, Play, Pause, RotateCcw } from "lucide-react";
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
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto w-full">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="mr-4 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Countdown Timer</h1>
          </div>

          {/* Timer Setup Card */}
          <Card className="mb-8 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="eventname" className="text-lg font-semibold mb-3 block">
                    Event Name (Optional)
                  </Label>
                  <Input
                    id="eventname"
                    type="text"
                    placeholder="New Year 2025"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    className="w-full"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="targetdate" className="text-lg font-semibold mb-3 block">
                      Target Date
                    </Label>
                    <Input
                      id="targetdate"
                      type="date"
                      value={targetDate}
                      onChange={(e) => setTargetDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <Label htmlFor="targettime" className="text-lg font-semibold mb-3 block">
                      Target Time
                    </Label>
                    <Input
                      id="targettime"
                      type="time"
                      value={targetTime}
                      onChange={(e) => setTargetTime(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="flex space-x-4">
                  {!isActive ? (
                    <Button
                      onClick={startTimer}
                      className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full"
                    >
                      <Play className="w-5 h-5" />
                      <span>Start</span>
                    </Button>
                  ) : (
                    <Button
                      onClick={pauseTimer}
                      className="flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-full"
                    >
                      <Pause className="w-5 h-5" />
                      <span>Pause</span>
                    </Button>
                  )}
                  
                  <Button
                    onClick={resetTimer}
                    variant="outline"
                    className="flex items-center space-x-2 px-6 py-3 rounded-full"
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
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardContent className="p-8 text-center">
                {eventName && (
                  <h3 className="text-2xl font-bold mb-6 text-blue-600 dark:text-blue-400">
                    {eventName}
                  </h3>
                )}
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                      {timeRemaining.days}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">Days</div>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                      {timeRemaining.hours}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">Hours</div>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                      {timeRemaining.minutes}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">Minutes</div>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                      {timeRemaining.seconds}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">Seconds</div>
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
