
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Calculator } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-400/20 via-pink-300/20 to-blue-400/20 animate-gradientMove"></div>
      <div className="fixed inset-0 bg-gradient-to-tr from-blue-600/10 via-transparent to-purple-600/10"></div>
      
      {/* Floating Orbs */}
      <div className="fixed top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-3xl opacity-20 animate-float"></div>
      <div className="fixed bottom-32 right-20 w-24 h-24 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-2xl opacity-30 animate-float" style={{ animationDelay: "2s" }}></div>
      <div className="fixed top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full blur-xl opacity-25 animate-float" style={{ animationDelay: "4s" }}></div>

      <div className="relative z-10 min-h-screen backdrop-blur-[2px] flex items-center justify-center pt-16">
        <div className="max-w-md mx-auto px-4 text-center">
          <Card className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-[2rem] overflow-hidden">
            <CardContent className="p-8">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500/80 to-pink-600/80 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl backdrop-blur-xl border border-white/20">
                <Calculator className="w-10 h-10 text-white drop-shadow-sm" />
              </div>
              
              <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent mb-4 drop-shadow-sm">404</h1>
              <h2 className="text-2xl font-bold text-white mb-4 drop-shadow-sm">Page Not Found</h2>
              
              <p className="text-white/80 mb-8">
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
                  className="w-full backdrop-blur-xl bg-white/10 border border-white/30 hover:bg-white/20 text-white rounded-full transition-all duration-300 hover:scale-105"
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
