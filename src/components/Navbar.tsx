
import { NavLink } from 'react-router-dom';
import { Calculator, Heart, DollarSign, Calendar, Clock, GraduationCap, Moon, Baby, Menu, Share2 } from 'lucide-react';
import { useState } from 'react';
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

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <NavLink to="/" className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-shrink-0" aria-label="Home - Lion Calculator">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                <Calculator className="w-4 h-4 sm:w-5 sm:h-5 text-white" aria-hidden="true" />
              </div>
              <div className="hidden sm:block min-w-0">
                <div className="font-bold text-sm sm:text-base lg:text-lg text-gray-900 dark:text-white truncate">Lion Calculator</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 truncate">Premium Calculator Suite</div>
              </div>
            </NavLink>

            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center space-x-1 flex-shrink-0">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  aria-label={item.ariaLabel}
                  className={({ isActive }) =>
                    `flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                      isActive
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 shadow-md'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                    }`
                  }
                >
                  <span aria-hidden="true">{item.icon}</span>
                  <span className="text-xs lg:text-sm">{item.name}</span>
                </NavLink>
              ))}
            </div>

            {/* Right side buttons */}
            <div className="flex items-center space-x-1.5 sm:space-x-2 flex-shrink-0">
              <button
                onClick={() => setIsShareModalOpen(true)}
                aria-label="Share Lion Calculator"
                className="flex items-center space-x-1.5 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-lg transition-all duration-300 hover:scale-105 shadow-lg text-xs sm:text-sm"
              >
                <Share2 size={14} className="sm:w-4 sm:h-4" aria-hidden="true" />
                <span className="hidden sm:inline">Share</span>
              </button>
              <ThemeToggle />
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
                className="xl:hidden p-1.5 sm:p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-300" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="xl:hidden absolute top-14 sm:top-16 left-0 right-0 bg-white/98 dark:bg-gray-900/98 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 shadow-xl">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-3 sm:p-4 max-h-[70vh] overflow-y-auto">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    aria-label={item.ariaLabel}
                    className={({ isActive }) =>
                      `flex items-center space-x-2 px-3 py-2.5 sm:py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`
                    }
                  >
                    <span aria-hidden="true">{item.icon}</span>
                    <span className="truncate">{item.name}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      <ShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} />
    </>
  );
};

export default Navbar;
