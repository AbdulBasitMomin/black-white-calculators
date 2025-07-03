import { useState, useEffect } from "react";
import { ArrowLeft, RefreshCw, TrendingUp, DollarSign, Loader2, Copy, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CurrencyCombobox } from "@/components/CurrencyCombobox";
import { useToast } from "@/hooks/use-toast";
import useScrollToTop from "@/hooks/useScrollToTop";

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
  useScrollToTop();
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
      console.log(`Fetching exchange rate from ${fromCurrency} to ${toCurrency}`);
      
      // Try multiple API sources for better accuracy
      let data;
      let rate;
      
      try {
        // Primary API: exchangerate-api.com (most recent data)
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        data = await response.json();
        
        if (data.rates && data.rates[toCurrency]) {
          rate = data.rates[toCurrency];
        } else {
          throw new Error("Currency not found in primary API");
        }
      } catch (primaryError) {
        console.log("Primary API failed, trying backup...", primaryError);
        
        // Backup API: fixer.io (free tier)
        const backupResponse = await fetch(`https://api.fixer.io/latest?base=${fromCurrency}&symbols=${toCurrency}`);
        if (!backupResponse.ok) throw new Error(`Backup API error! status: ${backupResponse.status}`);
        const backupData = await backupResponse.json();
        
        if (backupData.rates && backupData.rates[toCurrency]) {
          rate = backupData.rates[toCurrency];
          data = backupData;
        } else {
          throw new Error("Currency not found in backup API");
        }
      }
      
      console.log("Exchange rate data:", data);
      console.log(`Exchange rate: 1 ${fromCurrency} = ${rate} ${toCurrency}`);
      
      // Use higher precision for calculations
      const convertedAmount = parseFloat(amount) * rate;
      setResult(convertedAmount);
      setExchangeRate(rate);
      setLastUpdated(new Date().toLocaleString());
      
      console.log(`Conversion successful: ${amount} ${fromCurrency} = ${convertedAmount.toFixed(6)} ${toCurrency}`);
      
    } catch (error) {
      console.error("Currency conversion error:", error);
      toast({
        title: "Conversion failed",
        description: "Unable to fetch real-time exchange rates. Please check your internet connection and try again.",
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
        maximumFractionDigits: 6 
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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-200/30 via-pink-200/30 to-blue-200/30 dark:from-purple-400/20 dark:via-pink-300/20 dark:to-blue-400/20 animate-gradientMove"></div>
      <div className="fixed inset-0 bg-gradient-to-tr from-blue-300/20 via-transparent to-purple-300/20 dark:from-blue-600/10 dark:via-transparent dark:to-purple-600/10"></div>
      
      {/* Floating Orbs */}
      <div className="fixed top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-300/60 to-pink-300/60 dark:from-purple-400 dark:to-pink-400 rounded-full blur-3xl opacity-40 dark:opacity-20 animate-float"></div>
      <div className="fixed bottom-32 right-20 w-24 h-24 bg-gradient-to-r from-blue-300/70 to-cyan-300/70 dark:from-blue-400 dark:to-cyan-400 rounded-full blur-2xl opacity-50 dark:opacity-30 animate-float" style={{ animationDelay: "2s" }}></div>
      <div className="fixed top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-pink-300/60 to-purple-300/60 dark:from-pink-400 dark:to-purple-400 rounded-full blur-xl opacity-45 dark:opacity-25 animate-float" style={{ animationDelay: "4s" }}></div>

      <div className="relative z-10 min-h-screen backdrop-blur-[2px] pt-24">
        <div className="max-w-4xl mx-auto px-6 py-8">
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
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500/80 to-purple-600/80 rounded-3xl flex items-center justify-center shadow-2xl backdrop-blur-xl border border-white/20">
                <DollarSign className="w-7 h-7 text-white drop-shadow-sm" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent drop-shadow-sm">
                Currency Converter
              </h1>
            </div>
          </div>

          {/* Main Card */}
          <Card className="glass-card-light shadow-2xl mb-8 rounded-[2rem] overflow-hidden">
            <CardContent className="p-8">
              <div className="space-y-8">
                {/* Amount Input */}
                <div className="space-y-3">
                  <Label htmlFor="amount" className="text-xl font-semibold text-gray-800 dark:text-white drop-shadow-sm">
                    Amount
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full p-6 text-xl rounded-2xl glass-button-light text-gray-800 dark:text-white placeholder:text-gray-500 dark:placeholder:text-white/60 transition-all duration-300 shadow-lg"
                  />
                </div>

                {/* Currency Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                  <div className="space-y-3">
                    <Label className="text-xl font-semibold text-gray-800 dark:text-white drop-shadow-sm">
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
                      className="rounded-full w-14 h-14 glass-button-light text-gray-700 dark:text-white hover:scale-110 transition-all duration-300 shadow-lg"
                    >
                      <RefreshCw className="w-6 h-6" />
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-xl font-semibold text-gray-800 dark:text-white drop-shadow-sm">
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
                <div className="glass-info-card rounded-2xl p-6">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2 flex items-center drop-shadow-sm">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Real-Time Exchange Rates
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Get live currency conversion rates with high precision for accurate financial planning and international transactions.
                  </p>
                  {lastUpdated && (
                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-2">
                      Last updated: {lastUpdated}
                    </p>
                  )}
                </div>

                <Button
                  onClick={convertCurrency}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-500/80 to-purple-600/80 hover:from-blue-600/80 hover:to-purple-700/80 text-white font-bold py-6 text-xl rounded-full transition-all duration-300 hover:scale-105 shadow-2xl backdrop-blur-xl border border-white/20"
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

          {/* Results Card */}
          {result !== null && (
            <Card className="glass-card-light shadow-2xl rounded-[2rem] overflow-hidden animate-fadeIn">
              <CardContent className="p-8 text-center">
                <h3 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white drop-shadow-sm">Conversion Result</h3>
                
                <div className="mb-8">
                  <div className="text-lg text-gray-600 dark:text-gray-300 mb-3">
                    {amount} {fromCurrency} =
                  </div>
                  <div className="text-5xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent mb-6 drop-shadow-sm">
                    {result.toLocaleString(undefined, { 
                      minimumFractionDigits: 2, 
                      maximumFractionDigits: 6 
                    })} {toCurrency}
                  </div>
                  
                  <Button
                    onClick={copyResult}
                    variant="outline"
                    className="glass-button-light text-gray-700 dark:text-white rounded-full px-6 py-3 transition-all duration-300 hover:scale-105"
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
                    <div className="glass-info-card rounded-2xl p-6">
                      <div className="flex items-center mb-3">
                        <TrendingUp className="w-5 h-5 mr-2 text-gray-700 dark:text-white" />
                        <span className="font-semibold text-gray-800 dark:text-white drop-shadow-sm">Exchange Rate</span>
                      </div>
                      <div className="text-xl text-gray-700 dark:text-gray-200">
                        1 {fromCurrency} = {exchangeRate.toFixed(6)} {toCurrency}
                      </div>
                    </div>
                    
                    <div className="glass-info-card rounded-2xl p-6">
                      <div className="font-semibold text-gray-800 dark:text-white mb-3 drop-shadow-sm">
                        Inverse Rate
                      </div>
                      <div className="text-xl text-gray-700 dark:text-gray-200">
                        1 {toCurrency} = {(1/exchangeRate).toFixed(6)} {fromCurrency}
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
