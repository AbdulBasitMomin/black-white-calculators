
// Input sanitization utilities
export const sanitizeNumberInput = (value: string): string => {
  // Remove any non-numeric characters except decimal point and minus sign
  return value.replace(/[^0-9.-]/g, '');
};

export const sanitizeTextInput = (value: string): string => {
  // Remove potentially harmful characters
  return value.replace(/[<>\"']/g, '');
};

export const formatDateInput = (value: string): string => {
  // Ensure date format is correct
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return '';
  }
  return value;
};

export const formatTimeInput = (value: string): string => {
  // Ensure time format is correct
  if (!/^\d{2}:\d{2}$/.test(value)) {
    return '';
  }
  return value;
};

// Enhanced validation with detailed error messages
export const validateAndSanitizeInput = (
  value: string,
  type: 'number' | 'text' | 'date' | 'time'
): { value: string; isValid: boolean; error?: string } => {
  let sanitizedValue = value;
  
  switch (type) {
    case 'number':
      sanitizedValue = sanitizeNumberInput(value);
      if (sanitizedValue && isNaN(Number(sanitizedValue))) {
        return { value: '', isValid: false, error: 'Please enter a valid number' };
      }
      break;
    
    case 'text':
      sanitizedValue = sanitizeTextInput(value);
      break;
    
    case 'date':
      sanitizedValue = formatDateInput(value);
      if (value && !sanitizedValue) {
        return { value: '', isValid: false, error: 'Please enter a valid date (YYYY-MM-DD)' };
      }
      break;
    
    case 'time':
      sanitizedValue = formatTimeInput(value);
      if (value && !sanitizedValue) {
        return { value: '', isValid: false, error: 'Please enter a valid time (HH:MM)' };
      }
      break;
  }
  
  return { value: sanitizedValue, isValid: true };
};

// Performance monitoring utilities
export const measurePerformance = <T>(fn: () => T, label: string): T => {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  console.log(`${label} took ${end - start} milliseconds`);
  return result;
};

// Memory usage monitoring (for development)
export const logMemoryUsage = () => {
  if ('memory' in performance) {
    const memory = (performance as any).memory;
    console.log('Memory usage:', {
      used: Math.round(memory.usedJSHeapSize / 1048576) + ' MB',
      total: Math.round(memory.totalJSHeapSize / 1048576) + ' MB',
      limit: Math.round(memory.jsHeapSizeLimit / 1048576) + ' MB'
    });
  }
};
