
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";
import Home from "@/pages/Home";
import AgeCalculator from "@/pages/AgeCalculator";
import BMICalculator from "@/pages/BMICalculator";
import CurrencyConverter from "@/pages/CurrencyConverter";
import DaysCalculator from "@/pages/DaysCalculator";
import CountdownTimer from "@/pages/CountdownTimer";
import GPACalculator from "@/pages/GPACalculator";
import CalorieCalculator from "@/pages/CalorieCalculator";
import SleepCalculator from "@/pages/SleepCalculator";
import PregnancyCalculator from "@/pages/PregnancyCalculator";
import NotFound from "@/pages/NotFound";
import "./App.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/age" element={<AgeCalculator />} />
                <Route path="/bmi" element={<BMICalculator />} />
                <Route path="/currency" element={<CurrencyConverter />} />
                <Route path="/days" element={<DaysCalculator />} />
                <Route path="/countdown" element={<CountdownTimer />} />
                <Route path="/gpa" element={<GPACalculator />} />
                <Route path="/calorie" element={<CalorieCalculator />} />
                <Route path="/sleep" element={<SleepCalculator />} />
                <Route path="/pregnancy" element={<PregnancyCalculator />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <Toaster />
          <SonnerToaster />
        </Router>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
