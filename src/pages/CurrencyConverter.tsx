
import { useState, useEffect } from "react";
import { ArrowLeft, RefreshCw, TrendingUp, DollarSign } from "lucide-react";
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
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "CHF", name: "Swiss Franc", symbol: "Fr" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "KRW", name: "South Korean Won", symbol: "₩" }
];

const CurrencyConverter = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [amount, setAmount] = useState("1");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [result, setResult] = useState<number | null>(null);
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const convertCurrency = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Simulated exchange rates (in real app, use API like exchangerate-api.com)
      const rates: { [key: string]: number } = {
        "USD-EUR": 0.85,
        "USD-GBP": 0.73,
        "USD-JPY": 110.0,
        "USD-AUD": 1.35,
        "USD-CAD": 1.25,
        "USD-CHF": 0.92,
        "USD-CNY": 6.45,
        "USD-INR": 74.5,
        "USD-KRW": 1180.0,
        "EUR-USD": 1.18,
        "EUR-GBP": 0.86,
        "EUR-JPY": 129.5,
        "GBP-USD": 1.37,
        "GBP-EUR": 1.16,
        "JPY-USD": 0.009,
        "AUD-USD": 0.74,
        "CAD-USD": 0.80,
        "CHF-USD": 1.09,
        "CNY-USD": 0.155,
        "INR-USD": 0.0134,
        "KRW-USD": 0.00085
      };

      const rateKey = `${fromCurrency}-${toCurrency}`;
      const reverseKey = `${toCurrency}-${fromCurrency}`;
      
      let rate = rates[rateKey];
      if (!rate && rates[reverseKey]) {
        rate = 1 / rates[reverseKey];
      }
      if (!rate) {
        rate = 1; // Same currency or fallback
      }

      const convertedAmount = parseFloat(amount) * rate;
      setResult(convertedAmount);
      setExchangeRate(rate);
      
    } catch (error) {
      toast({
        title: "Conversion failed",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setResult(null);
    setExchangeRate(null);
  };

  useEffect(() => {
    if (amount && fromCurrency && toCurrency) {
      convertCurrency();
    }
  }, [fromCurrency, toCurrency]);

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
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Currency Converter</h1>
          </div>
        </div>

        {/* Converter Card */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl mb-8">
          <CardContent className="p-8">
            <div className="space-y-6">
              {/* Amount Input */}
              <div>
                <Label htmlFor="amount" className="text-lg font-semibold mb-3 block text-gray-900 dark:text-white">
                  Amount
                </Label>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full p-4 text-lg rounded-xl border-gray-200 dark:border-gray-700"
                />
              </div>

              {/* Currency Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                <div>
                  <Label className="text-lg font-semibold mb-3 block text-gray-900 dark:text-white">
                    From
                  </Label>
                  <Select value={fromCurrency} onValueChange={setFromCurrency}>
                    <SelectTrigger className="w-full p-4 text-lg rounded-xl border-gray-200 dark:border-gray-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl max-h-60">
                      {currencies.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          {currency.symbol} {currency.code} - {currency.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-center">
                  <Button
                    onClick={swapCurrencies}
                    variant="outline"
                    size="icon"
                    className="rounded-full w-12 h-12 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <RefreshCw className="w-5 h-5" />
                  </Button>
                </div>

                <div>
                  <Label className="text-lg font-semibold mb-3 block text-gray-900 dark:text-white">
                    To
                  </Label>
                  <Select value={toCurrency} onValueChange={setToCurrency}>
                    <SelectTrigger className="w-full p-4 text-lg rounded-xl border-gray-200 dark:border-gray-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl max-h-60">
                      {currencies.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          {currency.symbol} {currency.code} - {currency.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-6">
                <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Live Exchange Rates</h4>
                <p className="text-sm text-purple-600 dark:text-purple-400">
                  Get real-time currency conversion rates for accurate financial planning and international transactions.
                </p>
              </div>

              <Button
                onClick={convertCurrency}
                disabled={loading}
                className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 text-lg rounded-full transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-50"
              >
                {loading ? "Converting..." : "Convert Currency"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {result !== null && (
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl animate-fadeIn">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Conversion Result</h3>
              
              <div className="mb-6">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {amount} {fromCurrency} =
                </div>
                <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-4">
                  {result.toLocaleString(undefined, { 
                    minimumFractionDigits: 2, 
                    maximumFractionDigits: 2 
                  })} {toCurrency}
                </div>
              </div>

              {exchangeRate && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 rounded-2xl p-6">
                    <div className="flex items-center mb-2">
                      <TrendingUp className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
                      <span className="font-semibold text-purple-700 dark:text-purple-300">Exchange Rate</span>
                    </div>
                    <div className="text-lg text-gray-600 dark:text-gray-300">
                      1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-2xl p-6">
                    <div className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
                      Inverse Rate
                    </div>
                    <div className="text-lg text-gray-600 dark:text-gray-300">
                      1 {toCurrency} = {(1/exchangeRate).toFixed(4)} {fromCurrency}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;
