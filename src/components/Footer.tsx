
import { useState } from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-8">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          © {currentYear} Lion Calculator. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
