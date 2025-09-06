
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Calculator, Share2, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import ShareModal from './ShareModal';

const Navbar = () => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  return (
    <>
      <nav className="flex items-center justify-between w-full h-full">
        {/* Logo - Perfectly aligned */}
        <NavLink 
          to="/" 
          className="flex items-center gap-3 min-w-0 flex-shrink-0 group" 
          aria-label="Home - Lion Calculator"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 flex-shrink-0">
            <Calculator className="w-4 h-4 text-white drop-shadow-sm flex-shrink-0" aria-hidden="true" />
          </div>
          <div className="hidden sm:block min-w-0">
            <div className="font-bold text-base bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent whitespace-nowrap">
              Lion Calculator
            </div>
          </div>
        </NavLink>

        {/* Right side buttons - Perfect alignment and spacing */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={() => setIsShareModalOpen(true)}
            aria-label="Share Lion Calculator"
            className="flex items-center justify-center gap-2 w-10 h-10 sm:w-auto sm:h-10 sm:px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg text-sm font-medium flex-shrink-0"
          >
            <Share2 className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
            <span className="hidden sm:inline whitespace-nowrap">Share</span>
          </button>
          
          <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <ShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} />
    </>
  );
};

export default Navbar;
