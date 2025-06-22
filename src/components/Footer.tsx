
import { Share2, Copy, Check } from 'lucide-react';
import { useState } from 'react';

const Footer = () => {
  const [showShareMessage, setShowShareMessage] = useState(false);
  const [copied, setCopied] = useState(false);
  const currentYear = new Date().getFullYear();

  const shareWebsite = async () => {
    const shareData = {
      title: 'Lion Calculator - Premium Calculator Suite',
      text: 'Check out these amazing calculator tools! Age, BMI, Currency, GPA and more calculators.',
      url: window.location.origin,
    };

    try {
      // Try native sharing first (mobile devices)
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        return;
      }
      
      // Fallback to clipboard copy
      await navigator.clipboard.writeText(`${shareData.title} - ${shareData.text} ${shareData.url}`);
      setCopied(true);
      setShowShareMessage(true);
      setTimeout(() => {
        setShowShareMessage(false);
        setCopied(false);
      }, 3000);
    } catch (error) {
      console.log('Error sharing:', error);
      // Final fallback - try to copy just the URL
      try {
        await navigator.clipboard.writeText(window.location.origin);
        setCopied(true);
        setShowShareMessage(true);
        setTimeout(() => {
          setShowShareMessage(false);
          setCopied(false);
        }, 3000);
      } catch (clipboardError) {
        console.log('Clipboard error:', clipboardError);
      }
    }
  };

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © {currentYear} Lion Calculator. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <button
              onClick={shareWebsite}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
            >
              {copied ? <Check size={16} /> : <Share2 size={16} />}
              <span>{copied ? 'Copied!' : 'Share'}</span>
            </button>
            {showShareMessage && (
              <span className="text-green-600 dark:text-green-400 text-sm animate-fade-in">
                Link copied to clipboard!
              </span>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
