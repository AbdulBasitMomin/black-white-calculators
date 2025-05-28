
import { useState, useEffect } from "react";
import { ArrowLeft, Copy, Check, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const currencies = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
];

const CurrencyConverter = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [result, setResult] = useState<{
    convertedAmount: number;
    rate: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({});

  // Fetch exchange rates
  const fetchExchangeRates = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      const data = await response.json();
      setExchangeRates(data.rates);
    } catch (error) {
      console.error('Failed to fetch exchange rates:', error);
      toast({
        title: "Failed to fetch exchange rates",
        description: "Using cached rates or default values",
        variant: "destructive",
      });
      // Fallback rates
      setExchangeRates({
        USD: 1,
        EUR: 0.85,
        GBP: 0.73,
        JPY: 110,
        CNY: 6.5,
        INR: 75,
        CAD: 1.25,
        AUD: 1.35,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  const convertCurrency = () => {
    if (!amount) {
      toast({
        title: "Please enter an amount",
        variant: "destructive",
      });
      return;
    }

    const amountNum = parseFloat(amount);
    if (amountNum <= 0) {
      toast({
        title: "Please enter a valid positive amount",
        variant: "destructive",
      });
      return;
    }

    if (Object.keys(exchangeRates).length === 0) {
      toast({
        title: "Exchange rates not loaded",
        description: "Please try again in a moment",
        variant: "destructive",
      });
      return;
    }

    // Convert to USD first, then to target currency
    const usdAmount = fromCurrency === "USD" ? amountNum : amountNum / exchangeRates[fromCurrency];
    const convertedAmount = toCurrency === "USD" ? usdAmount : usdAmount * exchangeRates[toCurrency];
    const rate = toCurrency === "USD" ? 1 / exchangeRates[fromCurrency] : exchangeRates[toCurrency] / exchangeRates[fromCurrency];

    setResult({
      convertedAmount: Math.round(convertedAmount * 100) / 100,
      rate: Math.round(rate * 10000) / 10000
    });
  };

  const copyResult = async () => {
    if (!result) return;
    
    const fromSymbol = currencies.find(c => c.code === fromCurrency)?.symbol || fromCurrency;
    const toSymbol = currencies.find(c => c.code === toCurrency)?.symbol || toCurrency;
    const text = `${fromSymbol}${amount} ${fromCurrency} = ${toSymbol}${result.convertedAmount} ${toCurrency}`;
    
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
          <h1 className="text-4xl md:text-5xl font-bold">Currency Converter</h1>
        </div>

        {/* Calculator Card */}
        <Card className="bg-black border-gray-800 rounded-3xl">
          <CardContent className="p-8">
            <div className="space-y-6">
              {/* Amount Input */}
              <div>
                <Label htmlFor="amount" className="text-lg font-semibold mb-3 block">
                  Amount
                </Label>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="100"
                  className="bg-gray-900 border-gray-700 rounded-2xl text-lg py-6 focus-glow"
                  step="0.01"
                />
              </div>

              {/* From Currency */}
              <div>
                <Label className="text-lg font-semibold mb-3 block">From</Label>
                <Select value={fromCurrency} onValueChange={setFromCurrency}>
                  <SelectTrigger className="bg-gray-900 border-gray-700 rounded-2xl text-lg py-6 focus-glow">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700 z-50">
                    {currencies.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        {currency.symbol} {currency.code} - {currency.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* To Currency */}
              <div>
                <Label className="text-lg font-semibold mb-3 block">To</Label>
                <Select value={toCurrency} onValueChange={setToCurrency}>
                  <SelectTrigger className="bg-gray-900 border-gray-700 rounded-2xl text-lg py-6 focus-glow">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700 z-50">
                    {currencies.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        {currency.symbol} {currency.code} - {currency.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={convertCurrency}
                  disabled={loading}
                  className="flex-1 bg-white text-black hover:bg-gray-200 text-lg py-6 rounded-3xl hover-scale button-glow font-semibold"
                >
                  {loading ? "Converting..." : "Convert"}
                </Button>
                <Button
                  onClick={fetchExchangeRates}
                  disabled={loading}
                  variant="outline"
                  size="icon"
                  className="border-gray-700 text-white hover:bg-gray-800 rounded-2xl w-14 h-14"
                >
                  <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                </Button>
              </div>

              {/* Result */}
              {result && (
                <div className="mt-8 animate-fade-in">
                  <div className="bg-gray-900 rounded-3xl p-6 text-center">
                    <h3 className="text-2xl font-bold mb-4">Converted Amount</h3>
                    <div className="mb-4">
                      <div className="text-3xl font-bold text-white mb-2">
                        {currencies.find(c => c.code === toCurrency)?.symbol}
                        {result.convertedAmount.toLocaleString()} {toCurrency}
                      </div>
                      <div className="text-gray-400">
                        1 {fromCurrency} = {result.rate} {toCurrency}
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

export default CurrencyConverter;
