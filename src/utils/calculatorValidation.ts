
// Validation utilities for all calculator modules
export const validateAge = (birthDate: string): { isValid: boolean; error?: string } => {
  if (!birthDate) {
    return { isValid: false, error: "Birth date is required" };
  }
  
  const birth = new Date(birthDate);
  const today = new Date();
  
  if (isNaN(birth.getTime())) {
    return { isValid: false, error: "Invalid date format" };
  }
  
  if (birth > today) {
    return { isValid: false, error: "Birth date cannot be in the future" };
  }
  
  if (birth.getFullYear() < 1900) {
    return { isValid: false, error: "Birth year must be after 1900" };
  }
  
  return { isValid: true };
};

export const validateBMI = (weight: string, height: string, unit: string): { isValid: boolean; error?: string } => {
  if (!weight || !height) {
    return { isValid: false, error: "Both weight and height are required" };
  }
  
  const weightNum = parseFloat(weight);
  const heightNum = parseFloat(height);
  
  if (isNaN(weightNum) || isNaN(heightNum)) {
    return { isValid: false, error: "Please enter valid numbers" };
  }
  
  if (weightNum <= 0 || heightNum <= 0) {
    return { isValid: false, error: "Values must be positive" };
  }
  
  if (unit === "metric") {
    if (weightNum > 1000 || heightNum > 300) {
      return { isValid: false, error: "Values seem unrealistic" };
    }
  } else {
    if (weightNum > 2000 || heightNum > 120) {
      return { isValid: false, error: "Values seem unrealistic" };
    }
  }
  
  return { isValid: true };
};

export const validateCalorie = (age: string, gender: string, height: string, weight: string): { isValid: boolean; error?: string } => {
  if (!age || !gender || !height || !weight) {
    return { isValid: false, error: "All fields are required" };
  }
  
  const ageNum = parseInt(age);
  const heightNum = parseFloat(height);
  const weightNum = parseFloat(weight);
  
  if (isNaN(ageNum) || isNaN(heightNum) || isNaN(weightNum)) {
    return { isValid: false, error: "Please enter valid numbers" };
  }
  
  if (ageNum < 10 || ageNum > 120) {
    return { isValid: false, error: "Age must be between 10 and 120" };
  }
  
  if (heightNum < 50 || heightNum > 300) {
    return { isValid: false, error: "Height must be between 50 and 300 cm" };
  }
  
  if (weightNum < 20 || weightNum > 500) {
    return { isValid: false, error: "Weight must be between 20 and 500 kg" };
  }
  
  return { isValid: true };
};

export const validateCountdown = (targetDate: string, targetTime: string): { isValid: boolean; error?: string } => {
  if (!targetDate || !targetTime) {
    return { isValid: false, error: "Both date and time are required" };
  }
  
  const target = new Date(`${targetDate}T${targetTime}`);
  const now = new Date();
  
  if (isNaN(target.getTime())) {
    return { isValid: false, error: "Invalid date or time format" };
  }
  
  if (target <= now) {
    return { isValid: false, error: "Target date must be in the future" };
  }
  
  // Check if date is not too far in the future (100 years)
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 100);
  
  if (target > maxDate) {
    return { isValid: false, error: "Target date is too far in the future" };
  }
  
  return { isValid: true };
};

// Test all validation functions
export const runValidationTests = (): { passed: number; failed: number; results: string[] } => {
  const results: string[] = [];
  let passed = 0;
  let failed = 0;
  
  // Test Age Calculator
  const ageTest1 = validateAge("1990-01-01");
  if (ageTest1.isValid) {
    passed++;
    results.push("✅ Age validation: Valid date passed");
  } else {
    failed++;
    results.push("❌ Age validation: Valid date failed");
  }
  
  const ageTest2 = validateAge("2030-01-01");
  if (!ageTest2.isValid) {
    passed++;
    results.push("✅ Age validation: Future date rejected");
  } else {
    failed++;
    results.push("❌ Age validation: Future date not rejected");
  }
  
  // Test BMI Calculator
  const bmiTest1 = validateBMI("70", "175", "metric");
  if (bmiTest1.isValid) {
    passed++;
    results.push("✅ BMI validation: Valid metric values passed");
  } else {
    failed++;
    results.push("❌ BMI validation: Valid metric values failed");
  }
  
  const bmiTest2 = validateBMI("-10", "175", "metric");
  if (!bmiTest2.isValid) {
    passed++;
    results.push("✅ BMI validation: Negative weight rejected");
  } else {
    failed++;
    results.push("❌ BMI validation: Negative weight not rejected");
  }
  
  // Test Calorie Calculator
  const calorieTest1 = validateCalorie("25", "male", "175", "70");
  if (calorieTest1.isValid) {
    passed++;
    results.push("✅ Calorie validation: Valid values passed");
  } else {
    failed++;
    results.push("❌ Calorie validation: Valid values failed");
  }
  
  const calorieTest2 = validateCalorie("200", "male", "175", "70");
  if (!calorieTest2.isValid) {
    passed++;
    results.push("✅ Calorie validation: Invalid age rejected");
  } else {
    failed++;
    results.push("❌ Calorie validation: Invalid age not rejected");
  }
  
  // Test Countdown Timer
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];
  
  const countdownTest1 = validateCountdown(tomorrowStr, "12:00");
  if (countdownTest1.isValid) {
    passed++;
    results.push("✅ Countdown validation: Valid future date passed");
  } else {
    failed++;
    results.push("❌ Countdown validation: Valid future date failed");
  }
  
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];
  
  const countdownTest2 = validateCountdown(yesterdayStr, "12:00");
  if (!countdownTest2.isValid) {
    passed++;
    results.push("✅ Countdown validation: Past date rejected");
  } else {
    failed++;
    results.push("❌ Countdown validation: Past date not rejected");
  }
  
  return { passed, failed, results };
};
