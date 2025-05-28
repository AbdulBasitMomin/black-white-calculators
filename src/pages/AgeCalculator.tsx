
import { useState } from "react";
import { ArrowLeft, Copy, Check } from "lucide-react";
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
  } | null>(null);
  const [copied, setCopied] = useState(false);

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

    setResult({ years, months, days });
  };

  const copyResult = async () => {
    if (!result) return;
    
    const text = `My age: ${result.years} years, ${result.months} months, and ${result.days} days`;
    
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
          <h1 className="text-4xl md:text-5xl font-bold">Age Calculator</h1>
        </div>

        {/* Calculator Card */}
        <Card className="bg-black border-gray-800 rounded-3xl">
          <CardContent className="p-8">
            <div className="space-y-6">
              <div>
                <Label htmlFor="birthdate" className="text-lg font-semibold mb-3 block">
                  Enter your birth date
                </Label>
                <Input
                  id="birthdate"
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="bg-gray-900 border-gray-700 rounded-2xl text-lg py-6 focus-glow"
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>

              <Button
                onClick={calculateAge}
                className="w-full bg-white text-black hover:bg-gray-200 text-lg py-6 rounded-3xl hover-scale button-glow font-semibold"
              >
                Calculate Age
              </Button>

              {/* Result */}
              {result && (
                <div className="mt-8 animate-fade-in">
                  <div className="bg-gray-900 rounded-3xl p-6 text-center">
                    <h3 className="text-2xl font-bold mb-4">Your Age</h3>
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div>
                        <div className="text-3xl font-bold text-white">{result.years}</div>
                        <div className="text-gray-400">Years</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-white">{result.months}</div>
                        <div className="text-gray-400">Months</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-white">{result.days}</div>
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

export default AgeCalculator;
