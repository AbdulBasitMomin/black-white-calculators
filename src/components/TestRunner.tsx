
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { runValidationTests } from "@/utils/calculatorValidation";
import { CheckCircle, XCircle, Play } from "lucide-react";

const TestRunner = () => {
  const [testResults, setTestResults] = useState<{
    passed: number;
    failed: number;
    results: string[];
  } | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const runTests = async () => {
    setIsRunning(true);
    // Simulate test execution time
    await new Promise(resolve => setTimeout(resolve, 1000));
    const results = runValidationTests();
    setTestResults(results);
    setIsRunning(false);
  };

  useEffect(() => {
    // Auto-run tests on component mount
    runTests();
  }, []);

  return (
    <Card className="glass-card-light shadow-2xl rounded-[2rem] overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
            Calculator Module Tests
          </h3>
          <Button
            onClick={runTests}
            disabled={isRunning}
            className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-full px-6 py-2"
          >
            <Play className="w-4 h-4 mr-2" />
            {isRunning ? "Running..." : "Run Tests"}
          </Button>
        </div>

        {testResults && (
          <div className="space-y-4">
            <div className="flex space-x-4 mb-4">
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                <CheckCircle className="w-4 h-4 mr-1" />
                Passed: {testResults.passed}
              </Badge>
              <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
                <XCircle className="w-4 h-4 mr-1" />
                Failed: {testResults.failed}
              </Badge>
            </div>

            <div className="space-y-2">
              {testResults.results.map((result, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg ${
                    result.startsWith("✅")
                      ? "bg-green-50 text-green-800 border border-green-200"
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  {result}
                </div>
              ))}
            </div>

            {testResults.failed === 0 && (
              <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-green-800 font-semibold">
                  All tests passed! All calculator modules are working correctly.
                </p>
              </div>
            )}
          </div>
        )}

        {isRunning && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-2"></div>
            <p className="text-gray-600 dark:text-white/80">Running validation tests...</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TestRunner;
