
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Calculator } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-red-900 flex items-center justify-center pt-16">
      <div className="max-w-md mx-auto px-4 text-center">
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
          <CardContent className="p-8">
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Calculator className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Page Not Found</h2>
            
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Oops! The calculator you're looking for doesn't exist. Let's get you back to our amazing collection of tools.
            </p>
            
            <div className="space-y-4">
              <Button
                onClick={() => navigate("/")}
                className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-bold py-3 rounded-full transition-all duration-300 hover:scale-105"
              >
                <Home className="w-5 h-5 mr-2" />
                Back to Home
              </Button>
              
              <Button
                onClick={() => navigate(-1)}
                variant="outline"
                className="w-full border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              >
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;
