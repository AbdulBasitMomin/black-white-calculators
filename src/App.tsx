
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
import SEOHead from "@/components/SEOHead";
import useScrollToTop from "@/hooks/useScrollToTop";
import { lazy, Suspense } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";

// Lazy load calculator components for better performance
const Home = lazy(() => import("@/pages/Home"));
const AgeCalculator = lazy(() => import("@/pages/AgeCalculator"));
const BMICalculator = lazy(() => import("@/pages/BMICalculator"));
const CurrencyConverter = lazy(() => import("@/pages/CurrencyConverter"));
const DaysCalculator = lazy(() => import("@/pages/DaysCalculator"));
const CountdownTimer = lazy(() => import("@/pages/CountdownTimer"));
const GPACalculator = lazy(() => import("@/pages/GPACalculator"));
const CalorieCalculator = lazy(() => import("@/pages/CalorieCalculator"));
const SleepCalculator = lazy(() => import("@/pages/SleepCalculator"));
const PregnancyCalculator = lazy(() => import("@/pages/PregnancyCalculator"));
const NotFound = lazy(() => import("@/pages/NotFound"));
import "./App.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

const AppContent = () => {
  useScrollToTop();
  
  return (
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
          <main className="flex-1 overflow-auto" tabIndex={-1}>
            <SEOHead />
            <Suspense fallback={<LoadingSpinner size="lg" text="Loading calculator..." />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/age" element={
                  <ErrorBoundary>
                    <AgeCalculator />
                  </ErrorBoundary>
                } />
                <Route path="/bmi" element={
                  <ErrorBoundary>
                    <BMICalculator />
                  </ErrorBoundary>
                } />
                <Route path="/currency" element={
                  <ErrorBoundary>
                    <CurrencyConverter />
                  </ErrorBoundary>
                } />
                <Route path="/days" element={
                  <ErrorBoundary>
                    <DaysCalculator />
                  </ErrorBoundary>
                } />
                <Route path="/countdown" element={
                  <ErrorBoundary>
                    <CountdownTimer />
                  </ErrorBoundary>
                } />
                <Route path="/gpa" element={
                  <ErrorBoundary>
                    <GPACalculator />
                  </ErrorBoundary>
                } />
                <Route path="/calorie" element={
                  <ErrorBoundary>
                    <CalorieCalculator />
                  </ErrorBoundary>
                } />
                <Route path="/sleep" element={
                  <ErrorBoundary>
                    <SleepCalculator />
                  </ErrorBoundary>
                } />
                <Route path="/pregnancy" element={
                  <ErrorBoundary>
                    <PregnancyCalculator />
                  </ErrorBoundary>
                } />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </div>
      <Toaster />
      <SonnerToaster />
    </SidebarProvider>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <ErrorBoundary>
          <Router>
            <AppContent />
          </Router>
        </ErrorBoundary>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
