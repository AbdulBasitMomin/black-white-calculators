
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
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
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <ErrorBoundary>
          <Router>
            <SidebarProvider defaultOpen={false}>
              <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900">
                <AppSidebar />
                <div className="flex-1 flex flex-col">
                  <header className="sticky top-0 z-40 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <div className="flex h-16 items-center px-4">
                      <SidebarTrigger className="mr-4" />
                      <div className="flex-1">
                        <Navbar />
                      </div>
                    </div>
                  </header>
                  <main className="flex-1 overflow-auto">
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
              </div>
              <Toaster />
              <SonnerToaster />
            </SidebarProvider>
          </Router>
        </ErrorBoundary>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
