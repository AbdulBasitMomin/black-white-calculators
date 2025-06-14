
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import './index.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AgeCalculator from './pages/AgeCalculator';
import BMICalculator from './pages/BMICalculator';
import CurrencyConverter from './pages/CurrencyConverter';
import DaysCalculator from './pages/DaysCalculator';
import CountdownTimer from './pages/CountdownTimer';
import GPACalculator from './pages/GPACalculator';
import CalorieCalculator from './pages/CalorieCalculator';
import SleepCalculator from './pages/SleepCalculator';
import PregnancyCalculator from './pages/PregnancyCalculator';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

export function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') as 'light' | 'dark' || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router>
          <div className={`min-h-screen transition-colors duration-300 ${theme}`}>
            <Navbar />
            <main className="relative z-10">
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
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="fixed bottom-6 right-6 z-50 p-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full shadow-xl transition-all duration-300 hover:scale-110"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
          <Toaster />
          <Sonner />
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
