import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Smooth scroll to top when route changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    
    // Focus management for accessibility
    const mainElement = document.querySelector('main');
    if (mainElement) {
      mainElement.focus();
    }
  }, [pathname]);
};

export default useScrollToTop;