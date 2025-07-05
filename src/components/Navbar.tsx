
import { NavLink } from 'react-router-dom';
import { Calculator, Heart, DollarSign, Calendar, Clock, GraduationCap, Moon, Baby, Menu, Share2 } from 'lucide-react';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import ShareModal from './ShareModal';

const navItems = [
  { name: 'Age', path: '/age', icon: <Calculator size={16} /> },
  { name: 'BMI', path: '/bmi', icon: <Heart size={16} /> },
  { name: 'Currency', path: '/currency', icon: <DollarSign size={16} /> },
  { name: 'Days', path: '/days', icon: <Calendar size={16} /> },
  { name: 'Countdown', path: '/countdown', icon: <Clock size={16} /> },
  { name: 'GPA', path: '/gpa', icon: <GraduationCap size={16} /> },
  { name: 'Calorie', path: '/calorie', icon: <Heart size={16} /> },
  { name: 'Sleep', path: '/sleep', icon: <Moon size={16} /> },
  { name: 'Pregnancy', path: '/pregnancy', icon: <Baby size={16} /> },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <NavLink to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Calculator className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <div className="font-bold text-lg text-gray-900 dark:text-white">Lion Calculator</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Premium Calculator Suite</div>
              </div>
            </NavLink>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 shadow-md'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                    }`
                  }
                >
                  {item.icon}
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </div>

            {/* Right side buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsShareModalOpen(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-lg transition-all duration-300 hover:scale-105 shadow-lg text-sm"
              >
                <Share2 size={16} />
                <span className="hidden sm:inline">Share</span>
              </button>
              <ThemeToggle />
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden absolute top-16 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 shadow-lg">
              <div className="grid grid-cols-2 gap-2 p-4">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center space-x-2 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`
                    }
                  >
                    {item.icon}
                    <span>{item.name}</span>
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
