
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Calculator, Share2, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import ShareModal from './ShareModal';

const Navbar = () => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  return (
    <>
      <nav className="flex items-center justify-between w-full">
        {/* Logo - Simplified for sidebar layout */}
        <NavLink 
          to="/" 
          className="flex items-center space-x-3 min-w-0 flex-shrink-0 group" 
          aria-label="Home - Lion Calculator"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
            <Calculator className="w-4 h-4 text-white drop-shadow-sm" aria-hidden="true" />
          </div>
          <div className="hidden sm:block min-w-0">
            <div className="font-bold text-base bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Lion Calculator
            </div>
          </div>
        </NavLink>

        {/* Right side buttons */}
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
        </div>
      </nav>

      <ShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} />
    </>
  );
};

export default Navbar;
