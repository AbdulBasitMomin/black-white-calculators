
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
    <div className="min-h-screen bg-black text-white px-4 py-8 neue-haas">
      <div className="max-w-3xl mx-auto">
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
        <Card className="card-electric bg-black border-gray-800">
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

              {/* Result */}
              {result && (
                <div className="mt-12 smooth-fade-in">
                  <div className="bg-gray-900 rounded-pill p-10 text-center border border-gray-700">
                    <h3 className="text-3xl font-bold mb-8">Your Age</h3>
                    <div className="grid grid-cols-3 gap-8 mb-10">
                      <div>
                        <div className="text-5xl font-bold text-cyan-400 mb-2">{result.years}</div>
                        <div className="text-gray-300 text-lg">Years</div>
                      </div>
                      <div>
                        <div className="text-5xl font-bold text-cyan-400 mb-2">{result.months}</div>
                        <div className="text-gray-300 text-lg">Months</div>
                      </div>
                      <div>
                        <div className="text-5xl font-bold text-cyan-400 mb-2">{result.days}</div>
                        <div className="text-gray-300 text-lg">Days</div>
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
