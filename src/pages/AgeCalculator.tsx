
import { useState } from "react";
import { ArrowLeft, Copy, Check, Calendar, Clock, Star, Gift } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Timeline } from "recharts";

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
    lifeStageData: any[];
    ageDistributionData: any[];
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const getSeason = (month: number) => {
    if (month >= 2 && month <= 4) return "🌸 Spring";
    if (month >= 5 && month <= 7) return "☀️ Summer";
    if (month >= 8 && month <= 10) return "🍂 Autumn";
    return "❄️ Winter";
  };

  const getLifeStageData = (age: number) => [
    { stage: "Birth", age: 0, icon: "🎂", passed: age >= 0, color: "#00FFFF" },
    { stage: "School", age: 6, icon: "🏫", passed: age >= 6, color: "#00CCCC" },
    { stage: "Teen", age: 13, icon: "🎓", passed: age >= 13, color: "#009999" },
    { stage: "Adult", age: 18, icon: "👔", passed: age >= 18, color: "#006666" },
    { stage: "Midlife", age: 40, icon: "🏆", passed: age >= 40, color: "#003333" },
    { stage: "Retirement", age: 65, icon: "🌅", passed: age >= 65, color: "#001a1a" },
  ];

  const getAgeDistribution = (age: number) => {
    const decades = Math.floor(age / 10);
    const data = [];
    
    for (let i = 0; i <= decades && i < 10; i++) {
      const startAge = i * 10;
      const endAge = Math.min((i + 1) * 10 - 1, age);
      const yearsInDecade = i === decades ? age - startAge : 10;
      
      data.push({
        decade: `${startAge}-${Math.min(startAge + 9, 99)}`,
        years: yearsInDecade,
        percentage: ((yearsInDecade / age) * 100).toFixed(1),
        color: `hsl(${180 + i * 30}, 70%, ${70 - i * 7}%)`
      });
    }
    
    return data;
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
    const totalMinutes = Math.floor(diffMs / (1000 * 60));
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

    // Generate chart data
    const lifeStageData = getLifeStageData(years);
    const ageDistributionData = getAgeDistribution(years);

    setResult({
      years,
      months,
      days,
      hours,
      minutes,
      birthSeason,
      daysToNextBirthday,
      lifeStageData,
      ageDistributionData
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
    <div className="min-h-screen bg-black text-white px-4 py-8 neue-haas">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-12">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="mr-6 rounded-full hover:bg-gray-800 electric-glow w-14 h-14"
          >
            <ArrowLeft className="w-7 h-7" />
          </Button>
          <h1 className="text-hierarchy-lg">Age Calculator</h1>
        </div>

        {/* Calculator Card */}
        <Card className="card-electric bg-black border-gray-800 mb-8">
          <CardContent className="p-12">
            <div className="space-y-10">
              <div>
                <Label htmlFor="birthdate" className="text-2xl font-semibold mb-6 block">
                  Enter your birth date
                </Label>
                <Input
                  id="birthdate"
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="input-electric"
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>

              <Button
                onClick={calculateAge}
                className="pill-button w-full bg-white text-black hover:bg-gray-100 electric-glow-strong font-bold"
              >
                Calculate Age
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {result && (
          <div className="space-y-8 smooth-fade-in">
            {/* Main Age Display */}
            <Card className="card-electric bg-black border-gray-800">
              <CardContent className="p-10 text-center">
                <h3 className="text-3xl font-bold mb-8">Your Detailed Age</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
                  <div>
                    <div className="text-4xl font-bold text-cyan-400 mb-2">{result.years}</div>
                    <div className="text-gray-300">Years</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-cyan-400 mb-2">{result.months}</div>
                    <div className="text-gray-300">Months</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-cyan-400 mb-2">{result.days}</div>
                    <div className="text-gray-300">Days</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-cyan-400 mb-2">{result.hours}</div>
                    <div className="text-gray-300">Hours</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-cyan-400 mb-2">{result.minutes}</div>
                    <div className="text-gray-300">Minutes</div>
                  </div>
                </div>
                
                <Button
                  onClick={copyResult}
                  variant="outline"
                  className="border-gray-600 text-white hover:bg-gray-800 electric-glow rounded-pill px-8 py-4"
                >
                  {copied ? <Check className="w-5 h-5 mr-3" /> : <Copy className="w-5 h-5 mr-3" />}
                  {copied ? "Copied!" : "Copy Result"}
                </Button>
              </CardContent>
            </Card>

            {/* Additional Insights */}
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="card-electric bg-black border-gray-800">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <Calendar className="w-6 h-6 mr-3 text-cyan-400" />
                    <h4 className="text-xl font-bold">Birth Season</h4>
                  </div>
                  <div className="text-3xl font-bold text-center py-4">
                    {result.birthSeason}
                  </div>
                </CardContent>
              </Card>

              <Card className="card-electric bg-black border-gray-800">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <Gift className="w-6 h-6 mr-3 text-cyan-400" />
                    <h4 className="text-xl font-bold">Next Birthday</h4>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cyan-400 mb-2">{result.daysToNextBirthday}</div>
                    <div className="text-gray-300">Days to go!</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Life Stages Timeline */}
            <Card className="card-electric bg-black border-gray-800">
              <CardContent className="p-8">
                <h4 className="text-2xl font-bold mb-8 text-center">Life Milestones</h4>
                <div className="flex justify-between items-center overflow-x-auto pb-4">
                  {result.lifeStageData.map((stage, index) => (
                    <div key={stage.stage} className="flex flex-col items-center min-w-[100px] mx-2">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-3 transition-all duration-300 ${
                        stage.passed ? 'bg-cyan-400 text-black' : 'bg-gray-800 text-gray-400'
                      }`}>
                        {stage.icon}
                      </div>
                      <div className={`text-sm font-semibold ${stage.passed ? 'text-cyan-400' : 'text-gray-400'}`}>
                        {stage.stage}
                      </div>
                      <div className="text-xs text-gray-500">Age {stage.age}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Age Distribution Chart */}
            {result.ageDistributionData.length > 0 && (
              <Card className="card-electric bg-black border-gray-800">
                <CardContent className="p-8">
                  <h4 className="text-2xl font-bold mb-8 text-center">Life Distribution by Decades</h4>
                  <ChartContainer
                    config={{
                      years: { label: "Years", color: "hsl(var(--electric-blue))" },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={result.ageDistributionData}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          dataKey="years"
                          label={({ decade, percentage }) => `${decade}: ${percentage}%`}
                        >
                          {result.ageDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AgeCalculator;
