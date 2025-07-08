
import { NavLink } from 'react-router-dom';
import { Calculator, Heart, DollarSign, Calendar, Clock, GraduationCap, Moon, Baby, Menu, Share2, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';
import ShareModal from './ShareModal';

const navItems = [
  { name: 'Age', path: '/age', icon: <Calculator size={16} />, ariaLabel: 'Age Calculator' },
  { name: 'BMI', path: '/bmi', icon: <Heart size={16} />, ariaLabel: 'BMI Calculator' },
  { name: 'Currency', path: '/currency', icon: <DollarSign size={16} />, ariaLabel: 'Currency Converter' },
  { name: 'Days', path: '/days', icon: <Calendar size={16} />, ariaLabel: 'Days Calculator' },
  { name: 'Countdown', path: '/countdown', icon: <Clock size={16} />, ariaLabel: 'Countdown Timer' },
  { name: 'GPA', path: '/gpa', icon: <GraduationCap size={16} />, ariaLabel: 'GPA Calculator' },
  { name: 'Calorie', path: '/calorie', icon: <Heart size={16} />, ariaLabel: 'Calorie Calculator' },
  { name: 'Sleep', path: '/sleep', icon: <Moon size={16} />, ariaLabel: 'Sleep Calculator' },
  { name: 'Pregnancy', path: '/pregnancy', icon: <Baby size={16} />, ariaLabel: 'Pregnancy Calculator' },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-200/30 dark:border-gray-700/30 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo - Enhanced */}
            <NavLink 
              to="/" 
              className="flex items-center space-x-3 min-w-0 flex-shrink-0 group" 
              aria-label="Home - Lion Calculator"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <Calculator className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-sm" aria-hidden="true" />
              </div>
              <div className="hidden sm:block min-w-0">
                <div className="font-bold text-lg lg:text-xl bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Lion Calculator
                </div>
                <div className="text-xs lg:text-sm text-gray-500 dark:text-gray-400 font-medium">
                  Premium Calculator Suite
                </div>
              </div>
            </NavLink>

            {/* Desktop Navigation - Enhanced */}
            <div className="hidden xl:flex items-center space-x-1 flex-shrink-0">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  aria-label={item.ariaLabel}
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap group ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-700 dark:text-blue-300 shadow-md border border-blue-200/30 dark:border-blue-700/30'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-gray-100/80 hover:to-gray-50/80 dark:hover:from-gray-800/80 dark:hover:to-gray-700/80 hover:text-gray-900 dark:hover:text-white hover:shadow-sm'
                    }`
                  }
                >
                  <span className="group-hover:scale-110 transition-transform duration-200" aria-hidden="true">{item.icon}</span>
                  <span className="text-xs lg:text-sm">{item.name}</span>
                </NavLink>
              ))}
            </div>

            {/* Right side buttons - Enhanced */}
            <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
              <button
                onClick={() => setIsShareModalOpen(true)}
                aria-label="Share Lion Calculator"
                className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg text-sm font-medium"
              >
                <Share2 size={16} className="sm:w-4 sm:h-4" aria-hidden="true" />
                <span className="hidden sm:inline">Share</span>
              </button>
              
              <ThemeToggle />
              
              {/* Mobile Menu Button - Enhanced */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
                className="xl:hidden p-2 rounded-xl hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-all duration-200 hover:scale-105"
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5 text-gray-600 dark:text-gray-300" aria-hidden="true" />
                ) : (
                  <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu - Enhanced */}
          <div className={`xl:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen 
              ? 'max-h-screen opacity-100 visible' 
              : 'max-h-0 opacity-0 invisible'
          } overflow-hidden`}>
            <div className="pb-6 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {navItems.map((item, index) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    aria-label={item.ariaLabel}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-[1.02] ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-700 dark:text-blue-300 shadow-md border border-blue-200/30 dark:border-blue-700/30'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-gray-100/80 hover:to-gray-50/80 dark:hover:from-gray-800/80 dark:hover:to-gray-700/80 hover:shadow-sm'
                      }`
                    }
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <span className="flex-shrink-0" aria-hidden="true">{item.icon}</span>
                    <span className="truncate">{item.name}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 xl:hidden"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </nav>

      <ShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} />
    </>
  );
};

export default Navbar;
