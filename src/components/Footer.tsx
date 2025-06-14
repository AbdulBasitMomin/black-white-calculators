
import { Share2 } from 'lucide-react';
import { useState } from 'react';

const Footer = () => {
  const [showShareMessage, setShowShareMessage] = useState(false);
  const currentYear = new Date().getFullYear();

  const shareWebsite = async () => {
    const shareData = {
      title: 'Everyday Tools Hub',
      text: 'Check out these useful calculator tools!',
      url: window.location.origin,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.origin);
        setShowShareMessage(true);
        setTimeout(() => setShowShareMessage(false), 3000);
      }
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © {currentYear} Everyday Tools Hub. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <button
              onClick={shareWebsite}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              <Share2 size={16} />
              <span>Share</span>
            </button>
            {showShareMessage && (
              <span className="text-green-600 dark:text-green-400 text-sm">
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
