
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

    // Create particle animations
    createParticles();
  }, [theme]);

  const createParticles = () => {
    const existingParticles = document.querySelector('.particles-container');
    if (existingParticles) {
      existingParticles.remove();
    }

    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container fixed inset-0 pointer-events-none z-0';
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = `absolute w-2 h-2 ${theme === 'dark' ? 'bg-blue-400/20' : 'bg-blue-600/10'} rounded-full animate-ping`;
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 2 + 's';
      particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
      particlesContainer.appendChild(particle);
    }
  };

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
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="fixed bottom-6 right-6 z-50 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110"
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
