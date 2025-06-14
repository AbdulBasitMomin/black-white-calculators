
import { useState, useEffect } from "react";
import { ArrowLeft, RefreshCw, TrendingUp, DollarSign, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const currencies = [
  { code: "USD", name: "US Dollar", symbol: "$", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺" },
  { code: "GBP", name: "British Pound", symbol: "£", flag: "🇬🇧" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", flag: "🇯🇵" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$", flag: "🇦🇺" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$", flag: "🇨🇦" },
  { code: "CHF", name: "Swiss Franc", symbol: "Fr", flag: "🇨🇭" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥", flag: "🇨🇳" },
  { code: "INR", name: "Indian Rupee", symbol: "₹", flag: "🇮🇳" },
  { code: "KRW", name: "South Korean Won", symbol: "₩", flag: "🇰🇷" },
  { code: "BRL", name: "Brazilian Real", symbol: "R$", flag: "🇧🇷" },
  { code: "RUB", name: "Russian Ruble", symbol: "₽", flag: "🇷🇺" },
  { code: "MXN", name: "Mexican Peso", symbol: "$", flag: "🇲🇽" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$", flag: "🇸🇬" },
  { code: "HKD", name: "Hong Kong Dollar", symbol: "HK$", flag: "🇭🇰" },
  { code: "NOK", name: "Norwegian Krone", symbol: "kr", flag: "🇳🇴" },
  { code: "SEK", name: "Swedish Krona", symbol: "kr", flag: "🇸🇪" },
  { code: "DKK", name: "Danish Krone", symbol: "kr", flag: "🇩🇰" },
  { code: "PLN", name: "Polish Zloty", symbol: "zł", flag: "🇵🇱" },
  { code: "TRY", name: "Turkish Lira", symbol: "₺", flag: "🇹🇷" },
  { code: "ZAR", name: "South African Rand", symbol: "R", flag: "🇿🇦" },
  { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$", flag: "🇳🇿" },
  { code: "THB", name: "Thai Baht", symbol: "฿", flag: "🇹🇭" },
  { code: "MYR", name: "Malaysian Ringgit", symbol: "RM", flag: "🇲🇾" },
  { code: "IDR", name: "Indonesian Rupiah", symbol: "Rp", flag: "🇮🇩" },
  { code: "PHP", name: "Philippine Peso", symbol: "₱", flag: "🇵🇭" },
  { code: "VND", name: "Vietnamese Dong", symbol: "₫", flag: "🇻🇳" },
  { code: "AED", name: "UAE Dirham", symbol: "د.إ", flag: "🇦🇪" },
  { code: "SAR", name: "Saudi Riyal", symbol: "﷼", flag: "🇸🇦" },
  { code: "EGP", name: "Egyptian Pound", symbol: "£", flag: "🇪🇬" }
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
  const [lastUpdated, setLastUpdated] = useState<string>("");

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
      // Using exchangerate-api.com for real-time rates
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
      const data = await response.json();
      
      if (data.rates && data.rates[toCurrency]) {
        const rate = data.rates[toCurrency];
        const convertedAmount = parseFloat(amount) * rate;
        setResult(convertedAmount);
        setExchangeRate(rate);
        setLastUpdated(new Date(data.date).toLocaleString());
      } else {
        throw new Error("Exchange rate not found");
      }
      
    } catch (error) {
      console.error("Currency conversion error:", error);
      toast({
        title: "Conversion failed",
        description: "Please check your internet connection and try again",
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
    if (amount && fromCurrency && toCurrency && fromCurrency !== toCurrency) {
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
            className="mr-4 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 w-12 h-12 backdrop-blur-sm bg-white/10 border border-white/20"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Currency Converter</h1>
          </div>
        </div>

        {/* Converter Card */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-0 shadow-2xl mb-8 rounded-3xl">
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
                  className="w-full p-4 text-lg rounded-2xl border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm"
                />
              </div>

              {/* Currency Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                <div>
                  <Label className="text-lg font-semibold mb-3 block text-gray-900 dark:text-white">
                    From
                  </Label>
                  <Select value={fromCurrency} onValueChange={setFromCurrency}>
                    <SelectTrigger className="w-full p-4 text-lg rounded-2xl border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-gray-200 dark:border-gray-700 rounded-2xl max-h-60">
                      {currencies.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          <div className="flex items-center space-x-2">
                            <span>{currency.flag}</span>
                            <span>{currency.symbol} {currency.code}</span>
                            <span className="text-sm text-gray-500">- {currency.name}</span>
                          </div>
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
                    className="rounded-full w-12 h-12 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 backdrop-blur-sm bg-white/20 transition-all duration-300 hover:scale-110"
                  >
                    <RefreshCw className="w-5 h-5" />
                  </Button>
                </div>

                <div>
                  <Label className="text-lg font-semibold mb-3 block text-gray-900 dark:text-white">
                    To
                  </Label>
                  <Select value={toCurrency} onValueChange={setToCurrency}>
                    <SelectTrigger className="w-full p-4 text-lg rounded-2xl border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-gray-200 dark:border-gray-700 rounded-2xl max-h-60">
                      {currencies.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          <div className="flex items-center space-x-2">
                            <span>{currency.flag}</span>
                            <span>{currency.symbol} {currency.code}</span>
                            <span className="text-sm text-gray-500">- {currency.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 backdrop-blur-sm">
                <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Real-Time Exchange Rates</h4>
                <p className="text-sm text-purple-600 dark:text-purple-400">
                  Get live currency conversion rates updated every minute for accurate financial planning and international transactions.
                </p>
                {lastUpdated && (
                  <p className="text-xs text-purple-500 dark:text-purple-400 mt-2">
                    Last updated: {lastUpdated}
                  </p>
                )}
              </div>

              <Button
                onClick={convertCurrency}
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold py-4 text-lg rounded-full transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Converting...
                  </>
                ) : (
                  "Convert Currency"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {result !== null && (
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-0 shadow-2xl animate-fadeIn rounded-3xl">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Conversion Result</h3>
              
              <div className="mb-6">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {amount} {fromCurrency} =
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                  {result.toLocaleString(undefined, { 
                    minimumFractionDigits: 2, 
                    maximumFractionDigits: 2 
                  })} {toCurrency}
                </div>
              </div>

              {exchangeRate && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 rounded-2xl p-6 backdrop-blur-sm">
                    <div className="flex items-center mb-2">
                      <TrendingUp className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
                      <span className="font-semibold text-purple-700 dark:text-purple-300">Exchange Rate</span>
                    </div>
                    <div className="text-lg text-gray-600 dark:text-gray-300">
                      1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-2xl p-6 backdrop-blur-sm">
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
