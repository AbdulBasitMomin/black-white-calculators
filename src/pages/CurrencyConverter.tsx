
import { useState, useEffect } from "react";
import { ArrowLeft, Copy, Check, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { CurrencyCombobox } from "@/components/CurrencyCombobox";

// Comprehensive currency list with ISO 4217 codes
const currencies = [
  { code: "AED", name: "UAE Dirham", symbol: "د.إ" },
  { code: "AFN", name: "Afghan Afghani", symbol: "؋" },
  { code: "ALL", name: "Albanian Lek", symbol: "L" },
  { code: "AMD", name: "Armenian Dram", symbol: "֏" },
  { code: "ANG", name: "Netherlands Antillean Guilder", symbol: "ƒ" },
  { code: "AOA", name: "Angolan Kwanza", symbol: "Kz" },
  { code: "ARS", name: "Argentine Peso", symbol: "$" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "AWG", name: "Aruban Florin", symbol: "ƒ" },
  { code: "AZN", name: "Azerbaijani Manat", symbol: "₼" },
  { code: "BAM", name: "Bosnia-Herzegovina Convertible Mark", symbol: "KM" },
  { code: "BBD", name: "Barbadian Dollar", symbol: "$" },
  { code: "BDT", name: "Bangladeshi Taka", symbol: "৳" },
  { code: "BGN", name: "Bulgarian Lev", symbol: "лв" },
  { code: "BHD", name: "Bahraini Dinar", symbol: ".د.ب" },
  { code: "BIF", name: "Burundian Franc", symbol: "FBu" },
  { code: "BMD", name: "Bermudan Dollar", symbol: "$" },
  { code: "BND", name: "Brunei Dollar", symbol: "$" },
  { code: "BOB", name: "Bolivian Boliviano", symbol: "$b" },
  { code: "BRL", name: "Brazilian Real", symbol: "R$" },
  { code: "BSD", name: "Bahamian Dollar", symbol: "$" },
  { code: "BTN", name: "Bhutanese Ngultrum", symbol: "Nu." },
  { code: "BWP", name: "Botswanan Pula", symbol: "P" },
  { code: "BYN", name: "Belarusian Ruble", symbol: "Br" },
  { code: "BZD", name: "Belize Dollar", symbol: "BZ$" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "CDF", name: "Congolese Franc", symbol: "FC" },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF" },
  { code: "CLP", name: "Chilean Peso", symbol: "$" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "COP", name: "Colombian Peso", symbol: "$" },
  { code: "CRC", name: "Costa Rican Colón", symbol: "₡" },
  { code: "CUP", name: "Cuban Peso", symbol: "₱" },
  { code: "CVE", name: "Cape Verdean Escudo", symbol: "$" },
  { code: "CZK", name: "Czech Republic Koruna", symbol: "Kč" },
  { code: "DJF", name: "Djiboutian Franc", symbol: "Fdj" },
  { code: "DKK", name: "Danish Krone", symbol: "kr" },
  { code: "DOP", name: "Dominican Peso", symbol: "RD$" },
  { code: "DZD", name: "Algerian Dinar", symbol: "دج" },
  { code: "EGP", name: "Egyptian Pound", symbol: "£" },
  { code: "ERN", name: "Eritrean Nakfa", symbol: "Nfk" },
  { code: "ETB", name: "Ethiopian Birr", symbol: "Br" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "FJD", name: "Fijian Dollar", symbol: "$" },
  { code: "FKP", name: "Falkland Islands Pound", symbol: "£" },
  { code: "GBP", name: "British Pound Sterling", symbol: "£" },
  { code: "GEL", name: "Georgian Lari", symbol: "₾" },
  { code: "GHS", name: "Ghanaian Cedi", symbol: "¢" },
  { code: "GIP", name: "Gibraltar Pound", symbol: "£" },
  { code: "GMD", name: "Gambian Dalasi", symbol: "D" },
  { code: "GNF", name: "Guinean Franc", symbol: "GFr" },
  { code: "GTQ", name: "Guatemalan Quetzal", symbol: "Q" },
  { code: "GYD", name: "Guyanaese Dollar", symbol: "$" },
  { code: "HKD", name: "Hong Kong Dollar", symbol: "HK$" },
  { code: "HNL", name: "Honduran Lempira", symbol: "L" },
  { code: "HRK", name: "Croatian Kuna", symbol: "kn" },
  { code: "HTG", name: "Haitian Gourde", symbol: "G" },
  { code: "HUF", name: "Hungarian Forint", symbol: "Ft" },
  { code: "IDR", name: "Indonesian Rupiah", symbol: "Rp" },
  { code: "ILS", name: "Israeli New Sheqel", symbol: "₪" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "IQD", name: "Iraqi Dinar", symbol: "ع.د" },
  { code: "IRR", name: "Iranian Rial", symbol: "﷼" },
  { code: "ISK", name: "Icelandic Króna", symbol: "kr" },
  { code: "JMD", name: "Jamaican Dollar", symbol: "J$" },
  { code: "JOD", name: "Jordanian Dinar", symbol: "JD" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "KES", name: "Kenyan Shilling", symbol: "KSh" },
  { code: "KGS", name: "Kyrgystani Som", symbol: "лв" },
  { code: "KHR", name: "Cambodian Riel", symbol: "៛" },
  { code: "KMF", name: "Comorian Franc", symbol: "CF" },
  { code: "KRW", name: "South Korean Won", symbol: "₩" },
  { code: "KWD", name: "Kuwaiti Dinar", symbol: "KD" },
  { code: "KYD", name: "Cayman Islands Dollar", symbol: "$" },
  { code: "KZT", name: "Kazakhstani Tenge", symbol: "₸" },
  { code: "LAK", name: "Laotian Kip", symbol: "₭" },
  { code: "LBP", name: "Lebanese Pound", symbol: "£" },
  { code: "LKR", name: "Sri Lankan Rupee", symbol: "₨" },
  { code: "LRD", name: "Liberian Dollar", symbol: "$" },
  { code: "LSL", name: "Lesotho Loti", symbol: "M" },
  { code: "LYD", name: "Libyan Dinar", symbol: "LD" },
  { code: "MAD", name: "Moroccan Dirham", symbol: "MAD" },
  { code: "MDL", name: "Moldovan Leu", symbol: "lei" },
  { code: "MGA", name: "Malagasy Ariary", symbol: "Ar" },
  { code: "MKD", name: "Macedonian Denar", symbol: "ден" },
  { code: "MMK", name: "Myanma Kyat", symbol: "K" },
  { code: "MNT", name: "Mongolian Tugrik", symbol: "₮" },
  { code: "MOP", name: "Macanese Pataca", symbol: "MOP$" },
  { code: "MRU", name: "Mauritanian Ouguiya", symbol: "UM" },
  { code: "MUR", name: "Mauritian Rupee", symbol: "₨" },
  { code: "MVR", name: "Maldivian Rufiyaa", symbol: "Rf" },
  { code: "MWK", name: "Malawian Kwacha", symbol: "MK" },
  { code: "MXN", name: "Mexican Peso", symbol: "$" },
  { code: "MYR", name: "Malaysian Ringgit", symbol: "RM" },
  { code: "MZN", name: "Mozambican Metical", symbol: "MT" },
  { code: "NAD", name: "Namibian Dollar", symbol: "$" },
  { code: "NGN", name: "Nigerian Naira", symbol: "₦" },
  { code: "NIO", name: "Nicaraguan Córdoba", symbol: "C$" },
  { code: "NOK", name: "Norwegian Krone", symbol: "kr" },
  { code: "NPR", name: "Nepalese Rupee", symbol: "₨" },
  { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$" },
  { code: "OMR", name: "Omani Rial", symbol: "﷼" },
  { code: "PAB", name: "Panamanian Balboa", symbol: "B/." },
  { code: "PEN", name: "Peruvian Nuevo Sol", symbol: "S/." },
  { code: "PGK", name: "Papua New Guinean Kina", symbol: "K" },
  { code: "PHP", name: "Philippine Peso", symbol: "₱" },
  { code: "PKR", name: "Pakistani Rupee", symbol: "₨" },
  { code: "PLN", name: "Polish Zloty", symbol: "zł" },
  { code: "PYG", name: "Paraguayan Guarani", symbol: "Gs" },
  { code: "QAR", name: "Qatari Rial", symbol: "﷼" },
  { code: "RON", name: "Romanian Leu", symbol: "lei" },
  { code: "RSD", name: "Serbian Dinar", symbol: "Дин." },
  { code: "RUB", name: "Russian Ruble", symbol: "₽" },
  { code: "RWF", name: "Rwandan Franc", symbol: "R₣" },
  { code: "SAR", name: "Saudi Riyal", symbol: "﷼" },
  { code: "SBD", name: "Solomon Islands Dollar", symbol: "$" },
  { code: "SCR", name: "Seychellois Rupee", symbol: "₨" },
  { code: "SDG", name: "Sudanese Pound", symbol: "ج.س." },
  { code: "SEK", name: "Swedish Krona", symbol: "kr" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$" },
  { code: "SHP", name: "Saint Helena Pound", symbol: "£" },
  { code: "SLE", name: "Sierra Leonean Leone", symbol: "Le" },
  { code: "SOS", name: "Somali Shilling", symbol: "S" },
  { code: "SRD", name: "Surinamese Dollar", symbol: "$" },
  { code: "STN", name: "São Tomé and Príncipe Dobra", symbol: "Db" },
  { code: "SYP", name: "Syrian Pound", symbol: "£" },
  { code: "SZL", name: "Swazi Lilangeni", symbol: "E" },
  { code: "THB", name: "Thai Baht", symbol: "฿" },
  { code: "TJS", name: "Tajikistani Somoni", symbol: "SM" },
  { code: "TMT", name: "Turkmenistani Manat", symbol: "T" },
  { code: "TND", name: "Tunisian Dinar", symbol: "د.ت" },
  { code: "TOP", name: "Tongan Paʻanga", symbol: "T$" },
  { code: "TRY", name: "Turkish Lira", symbol: "₺" },
  { code: "TTD", name: "Trinidad and Tobago Dollar", symbol: "TT$" },
  { code: "TWD", name: "New Taiwan Dollar", symbol: "NT$" },
  { code: "TZS", name: "Tanzanian Shilling", symbol: "TSh" },
  { code: "UAH", name: "Ukrainian Hryvnia", symbol: "₴" },
  { code: "UGX", name: "Ugandan Shilling", symbol: "USh" },
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "UYU", name: "Uruguayan Peso", symbol: "$U" },
  { code: "UZS", name: "Uzbekistan Som", symbol: "лв" },
  { code: "VES", name: "Venezuelan Bolívar", symbol: "Bs" },
  { code: "VND", name: "Vietnamese Dong", symbol: "₫" },
  { code: "VUV", name: "Vanuatu Vatu", symbol: "VT" },
  { code: "WST", name: "Samoan Tala", symbol: "WS$" },
  { code: "XAF", name: "CFA Franc BEAC", symbol: "FCFA" },
  { code: "XCD", name: "East Caribbean Dollar", symbol: "$" },
  { code: "XDR", name: "Special Drawing Rights", symbol: "SDR" },
  { code: "XOF", name: "CFA Franc BCEAO", symbol: "CFA" },
  { code: "XPF", name: "CFP Franc", symbol: "₣" },
  { code: "YER", name: "Yemeni Rial", symbol: "﷼" },
  { code: "ZAR", name: "South African Rand", symbol: "R" },
  { code: "ZMW", name: "Zambian Kwacha", symbol: "ZK" },
  { code: "ZWL", name: "Zimbabwean Dollar", symbol: "Z$" }
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
      if (!response.ok) {
        throw new Error('Failed to fetch exchange rates');
      }
      const data = await response.json();
      setExchangeRates(data.rates);
      console.log('Exchange rates fetched:', data.rates);
    } catch (error) {
      console.error('Failed to fetch exchange rates:', error);
      toast({
        title: "Failed to fetch exchange rates",
        description: "Please check your internet connection and try again",
        variant: "destructive",
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
    if (amountNum <= 0 || isNaN(amountNum)) {
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

    // Same currency conversion
    if (fromCurrency === toCurrency) {
      setResult({
        convertedAmount: amountNum,
        rate: 1
      });
      return;
    }

    // Get rates (all rates are relative to USD)
    const fromRate = fromCurrency === "USD" ? 1 : exchangeRates[fromCurrency];
    const toRate = toCurrency === "USD" ? 1 : exchangeRates[toCurrency];

    if (!fromRate && fromCurrency !== "USD") {
      toast({
        title: "Currency not supported",
        description: `${fromCurrency} is not available in current exchange rates`,
        variant: "destructive",
      });
      return;
    }

    if (!toRate && toCurrency !== "USD") {
      toast({
        title: "Currency not supported", 
        description: `${toCurrency} is not available in current exchange rates`,
        variant: "destructive",
      });
      return;
    }

    // Convert: amount in fromCurrency -> USD -> toCurrency
    const amountInUSD = fromCurrency === "USD" ? amountNum : amountNum / fromRate;
    const convertedAmount = toCurrency === "USD" ? amountInUSD : amountInUSD * toRate;
    
    // Calculate exchange rate from fromCurrency to toCurrency
    const exchangeRate = fromCurrency === "USD" ? toRate : 
                        toCurrency === "USD" ? (1 / fromRate) : 
                        toRate / fromRate;

    console.log('Conversion details:', {
      amount: amountNum,
      fromCurrency,
      toCurrency,
      fromRate,
      toRate,
      amountInUSD,
      convertedAmount,
      exchangeRate
    });

    setResult({
      convertedAmount: Math.round(convertedAmount * 100) / 100,
      rate: Math.round(exchangeRate * 10000) / 10000
    });
  };

  const copyResult = async () => {
    if (!result) return;
    
    const fromSymbol = currencies.find(c => c.code === fromCurrency)?.symbol || fromCurrency;
    const toSymbol = currencies.find(c => c.code === toCurrency)?.symbol || toCurrency;
    const text = `${fromSymbol}${amount} ${fromCurrency} = ${toSymbol}${result.convertedAmount.toLocaleString()} ${toCurrency}`;
    
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
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="mr-4 rounded-full hover:bg-gray-800 electric-glow"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-hierarchy-lg">Currency Converter</h1>
        </div>

        {/* Calculator Card */}
        <Card className="card-electric bg-black border-gray-800">
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
                  className="input-electric text-white"
                  step="0.01"
                />
              </div>

              {/* From Currency */}
              <div>
                <Label className="text-lg font-semibold mb-3 block">From</Label>
                <CurrencyCombobox
                  currencies={currencies}
                  value={fromCurrency}
                  onValueChange={setFromCurrency}
                  placeholder="Select currency..."
                />
              </div>

              {/* To Currency */}
              <div>
                <Label className="text-lg font-semibold mb-3 block">To</Label>
                <CurrencyCombobox
                  currencies={currencies}
                  value={toCurrency}
                  onValueChange={setToCurrency}
                  placeholder="Select currency..."
                />
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={convertCurrency}
                  disabled={loading}
                  className="flex-1 pill-button bg-white text-black hover:bg-gray-100 electric-glow-strong font-bold text-lg"
                >
                  {loading ? "Converting..." : "Convert"}
                </Button>
                <Button
                  onClick={fetchExchangeRates}
                  disabled={loading}
                  variant="outline"
                  size="icon"
                  className="border-gray-700 text-white hover:bg-gray-800 rounded-pill w-16 h-16 electric-glow"
                >
                  <RefreshCw className={`w-6 h-6 ${loading ? 'animate-spin' : ''}`} />
                </Button>
              </div>

              {/* Result */}
              {result && (
                <div className="mt-6 smooth-fade-in">
                  <div className="bg-gray-900 rounded-pill p-6 text-center electric-glow">
                    <h3 className="text-xl font-bold mb-4">Converted Amount</h3>
                    <div className="mb-4">
                      <div className="text-hierarchy-md text-white mb-2">
                        {currencies.find(c => c.code === toCurrency)?.symbol}
                        {result.convertedAmount.toLocaleString()} {toCurrency}
                      </div>
                      <div className="text-gray-400 text-base">
                        1 {fromCurrency} = {result.rate} {toCurrency}
                      </div>
                    </div>
                    <Button
                      onClick={copyResult}
                      variant="outline"
                      className="border-gray-700 text-white hover:bg-gray-800 rounded-pill electric-glow"
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
