
import { useState, useEffect } from "react";
import { ArrowLeft, RefreshCw, TrendingUp, DollarSign, Loader2, Copy, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CurrencyCombobox } from "@/components/CurrencyCombobox";
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
  { code: "EGP", name: "Egyptian Pound", symbol: "£", flag: "🇪🇬" },
  { code: "ILS", name: "Israeli Shekel", symbol: "₪", flag: "🇮🇱" },
  { code: "CZK", name: "Czech Koruna", symbol: "Kč", flag: "🇨🇿" },
  { code: "HUF", name: "Hungarian Forint", symbol: "Ft", flag: "🇭🇺" },
  { code: "RON", name: "Romanian Leu", symbol: "lei", flag: "🇷🇴" },
  { code: "BGN", name: "Bulgarian Lev", symbol: "лв", flag: "🇧🇬" },
  { code: "HRK", name: "Croatian Kuna", symbol: "kn", flag: "🇭🇷" },
  { code: "ISK", name: "Icelandic Krona", symbol: "kr", flag: "🇮🇸" },
  { code: "RSD", name: "Serbian Dinar", symbol: "дин", flag: "🇷🇸" },
  { code: "UAH", name: "Ukrainian Hryvnia", symbol: "₴", flag: "🇺🇦" },
  { code: "KZT", name: "Kazakhstani Tenge", symbol: "₸", flag: "🇰🇿" },
  { code: "UZS", name: "Uzbekistani Som", symbol: "лв", flag: "🇺🇿" },
  { code: "GEL", name: "Georgian Lari", symbol: "₾", flag: "🇬🇪" },
  { code: "AMD", name: "Armenian Dram", symbol: "֏", flag: "🇦🇲" },
  { code: "AZN", name: "Azerbaijani Manat", symbol: "₼", flag: "🇦🇿" },
  { code: "BYN", name: "Belarusian Ruble", symbol: "Br", flag: "🇧🇾" },
  { code: "MDL", name: "Moldovan Leu", symbol: "L", flag: "🇲🇩" },
  { code: "ALL", name: "Albanian Lek", symbol: "L", flag: "🇦🇱" },
  { code: "MKD", name: "Macedonian Denar", symbol: "ден", flag: "🇲🇰" },
  { code: "BAM", name: "Bosnia-Herzegovina Convertible Mark", symbol: "KM", flag: "🇧🇦" },
  { code: "LKR", name: "Sri Lankan Rupee", symbol: "₨", flag: "🇱🇰" },
  { code: "PKR", name: "Pakistani Rupee", symbol: "₨", flag: "🇵🇰" },
  { code: "BDT", name: "Bangladeshi Taka", symbol: "৳", flag: "🇧🇩" },
  { code: "NPR", name: "Nepalese Rupee", symbol: "₨", flag: "🇳🇵" },
  { code: "BTN", name: "Bhutanese Ngultrum", symbol: "Nu.", flag: "🇧🇹" },
  { code: "AFN", name: "Afghan Afghani", symbol: "؋", flag: "🇦🇫" },
  { code: "IRR", name: "Iranian Rial", symbol: "﷼", flag: "🇮🇷" },
  { code: "IQD", name: "Iraqi Dinar", symbol: "ع.د", flag: "🇮🇶" },
  { code: "JOD", name: "Jordanian Dinar", symbol: "د.ا", flag: "🇯🇴" },
  { code: "KWD", name: "Kuwaiti Dinar", symbol: "د.ك", flag: "🇰🇼" },
  { code: "LBP", name: "Lebanese Pound", symbol: "ل.ل", flag: "🇱🇧" },
  { code: "OMR", name: "Omani Rial", symbol: "ر.ع.", flag: "🇴🇲" },
  { code: "QAR", name: "Qatari Rial", symbol: "ر.ق", flag: "🇶🇦" },
  { code: "SYP", name: "Syrian Pound", symbol: "£", flag: "🇸🇾" },
  { code: "YER", name: "Yemeni Rial", symbol: "﷼", flag: "🇾🇪" }
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
  const [copied, setCopied] = useState(false);

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
      // Using Fixer.io API - free tier with real-time rates
      const response = await fetch(`https://api.fixer.io/latest?access_key=YOUR_API_KEY&base=${fromCurrency}&symbols=${toCurrency}`);
      
      // Fallback to exchangerate-api.com if Fixer fails
      const fallbackResponse = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
      const data = await fallbackResponse.json();
      
      console.log("Exchange rate data:", data);
      
      if (data.rates && data.rates[toCurrency]) {
        const rate = data.rates[toCurrency];
        const convertedAmount = parseFloat(amount) * rate;
        setResult(convertedAmount);
        setExchangeRate(rate);
        setLastUpdated(new Date().toLocaleString());
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

  const copyResult = () => {
    if (result !== null) {
      const resultText = `${amount} ${fromCurrency} = ${result.toLocaleString(undefined, { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
      })} ${toCurrency}`;
      navigator.clipboard.writeText(resultText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Copied to clipboard!",
        description: "Conversion result copied successfully",
      });
    }
  };

  useEffect(() => {
    if (amount && fromCurrency && toCurrency && fromCurrency !== toCurrency) {
      convertCurrency();
    }
  }, [fromCurrency, toCurrency]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-400/20 via-pink-300/20 to-blue-400/20 animate-gradientMove"></div>
      <div className="fixed inset-0 bg-gradient-to-tr from-blue-600/10 via-transparent to-purple-600/10"></div>
      
      {/* Floating Orbs */}
      <div className="fixed top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-3xl opacity-20 animate-float"></div>
      <div className="fixed bottom-32 right-20 w-24 h-24 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-2xl opacity-30 animate-float" style={{ animationDelay: "2s" }}></div>
      <div className="fixed top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full blur-xl opacity-25 animate-float" style={{ animationDelay: "4s" }}></div>

      <div className="relative z-10 min-h-screen backdrop-blur-[2px] pt-20">
        <div className="max-w-2xl mx-auto px-6 py-8">
          {/* Glass Header */}
          <div className="flex items-center mb-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="mr-4 rounded-full w-12 h-12 backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-110 shadow-lg"
            >
              <ArrowLeft className="w-6 h-6 text-white drop-shadow-sm" />
            </Button>
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500/80 to-pink-600/80 rounded-3xl flex items-center justify-center shadow-2xl backdrop-blur-xl border border-white/20">
                <DollarSign className="w-7 h-7 text-white drop-shadow-sm" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent drop-shadow-sm">
                Currency Converter
              </h1>
            </div>
          </div>

          {/* Main Glass Converter Card */}
          <Card className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl mb-8 rounded-[2rem] overflow-hidden">
            <CardContent className="p-8">
              <div className="space-y-8">
                {/* Amount Input */}
                <div className="space-y-3">
                  <Label htmlFor="amount" className="text-xl font-semibold text-white drop-shadow-sm">
                    Amount
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full p-6 text-xl rounded-2xl backdrop-blur-xl bg-white/10 border border-white/30 text-white placeholder:text-white/60 focus:bg-white/20 transition-all duration-300 shadow-lg"
                  />
                </div>

                {/* Currency Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                  <div className="space-y-3">
                    <Label className="text-xl font-semibold text-white drop-shadow-sm">
                      From
                    </Label>
                    <CurrencyCombobox
                      currencies={currencies}
                      value={fromCurrency}
                      onValueChange={setFromCurrency}
                      placeholder="Select currency..."
                    />
                  </div>

                  <div className="flex justify-center">
                    <Button
                      onClick={swapCurrencies}
                      variant="outline"
                      size="icon"
                      className="rounded-full w-14 h-14 backdrop-blur-xl bg-white/10 border border-white/30 hover:bg-white/20 transition-all duration-300 hover:scale-110 shadow-lg"
                    >
                      <RefreshCw className="w-6 h-6 text-white" />
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-xl font-semibold text-white drop-shadow-sm">
                      To
                    </Label>
                    <CurrencyCombobox
                      currencies={currencies}
                      value={toCurrency}
                      onValueChange={setToCurrency}
                      placeholder="Select currency..."
                    />
                  </div>
                </div>

                {/* Info Card */}
                <div className="backdrop-blur-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-white/20">
                  <h4 className="font-semibold text-white mb-2 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Real-Time Exchange Rates
                  </h4>
                  <p className="text-white/80 text-sm">
                    Get live currency conversion rates updated every minute for accurate financial planning and international transactions.
                  </p>
                  {lastUpdated && (
                    <p className="text-white/60 text-xs mt-2">
                      Last updated: {lastUpdated}
                    </p>
                  )}
                </div>

                <Button
                  onClick={convertCurrency}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-500/80 to-pink-600/80 hover:from-purple-600/80 hover:to-pink-700/80 text-white font-bold py-6 text-xl rounded-full transition-all duration-300 hover:scale-105 shadow-2xl backdrop-blur-xl border border-white/20 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                      Converting...
                    </>
                  ) : (
                    "Convert Currency"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Glass Card */}
          {result !== null && (
            <Card className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl animate-fadeIn rounded-[2rem] overflow-hidden">
              <CardContent className="p-8 text-center">
                <h3 className="text-3xl font-bold mb-8 text-white drop-shadow-sm">Conversion Result</h3>
                
                <div className="mb-8">
                  <div className="text-lg text-white/70 mb-3">
                    {amount} {fromCurrency} =
                  </div>
                  <div className="text-5xl font-bold bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent mb-6 drop-shadow-sm">
                    {result.toLocaleString(undefined, { 
                      minimumFractionDigits: 2, 
                      maximumFractionDigits: 2 
                    })} {toCurrency}
                  </div>
                  
                  <Button
                    onClick={copyResult}
                    variant="outline"
                    className="backdrop-blur-xl bg-white/10 border border-white/30 hover:bg-white/20 text-white rounded-full px-6 py-3 transition-all duration-300 hover:scale-105"
                  >
                    {copied ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Result
                      </>
                    )}
                  </Button>
                </div>

                {exchangeRate && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="backdrop-blur-xl bg-purple-500/20 rounded-2xl p-6 border border-white/20">
                      <div className="flex items-center mb-3">
                        <TrendingUp className="w-5 h-5 mr-2 text-white" />
                        <span className="font-semibold text-white">Exchange Rate</span>
                      </div>
                      <div className="text-xl text-white/90">
                        1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
                      </div>
                    </div>
                    
                    <div className="backdrop-blur-xl bg-blue-500/20 rounded-2xl p-6 border border-white/20">
                      <div className="font-semibold text-white mb-3">
                        Inverse Rate
                      </div>
                      <div className="text-xl text-white/90">
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
    </div>
  );
};

export default CurrencyConverter;
