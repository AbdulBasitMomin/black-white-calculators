
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Calculator } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-200/30 via-pink-200/30 to-blue-200/30 dark:from-purple-400/20 dark:via-pink-300/20 dark:to-blue-400/20 animate-gradientMove"></div>
      <div className="fixed inset-0 bg-gradient-to-tr from-blue-300/20 via-transparent to-purple-300/20 dark:from-blue-600/10 dark:via-transparent dark:to-purple-600/10"></div>
      
      {/* Floating Orbs */}
      <div className="fixed top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-300/60 to-pink-300/60 dark:from-purple-400 dark:to-pink-400 rounded-full blur-3xl opacity-40 dark:opacity-20 animate-float"></div>
      <div className="fixed bottom-32 right-20 w-24 h-24 bg-gradient-to-r from-blue-300/70 to-cyan-300/70 dark:from-blue-400 dark:to-cyan-400 rounded-full blur-2xl opacity-50 dark:opacity-30 animate-float" style={{ animationDelay: "2s" }}></div>
      <div className="fixed top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-pink-300/60 to-purple-300/60 dark:from-pink-400 dark:to-purple-400 rounded-full blur-xl opacity-45 dark:opacity-25 animate-float" style={{ animationDelay: "4s" }}></div>

      <div className="relative z-10 min-h-screen backdrop-blur-[2px] flex items-center justify-center pt-16">
        <div className="max-w-md mx-auto px-4 text-center">
          <Card className="glass-card-light shadow-2xl rounded-[2rem] overflow-hidden">
            <CardContent className="p-8">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500/80 to-pink-600/80 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl backdrop-blur-xl border border-white/20">
                <Calculator className="w-10 h-10 text-white drop-shadow-sm" />
              </div>
              
              <h1 className="text-6xl font-bold bg-gradient-to-r from-gray-800 via-purple-600 to-pink-600 dark:from-white dark:via-purple-100 dark:to-pink-100 bg-clip-text text-transparent mb-4 drop-shadow-sm">404</h1>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 drop-shadow-sm">Page Not Found</h2>
              
              <p className="text-gray-600 dark:text-white/80 mb-8">
                Oops! The calculator you're looking for doesn't exist. Let's get you back to our amazing collection of tools.
              </p>
              
              <div className="space-y-4">
                <Button
                  onClick={() => navigate("/")}
                  className="w-full bg-gradient-to-r from-red-500/80 to-pink-600/80 hover:from-red-600/80 hover:to-pink-700/80 text-white font-bold py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-2xl backdrop-blur-xl border border-white/20"
                >
                  <Home className="w-5 h-5 mr-2" />
                  Back to Home
                </Button>
                
                <Button
                  onClick={() => navigate(-1)}
                  variant="outline"
                  className="w-full glass-button-light text-gray-700 dark:text-white rounded-full transition-all duration-300 hover:scale-105"
                >
                  Go Back
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
