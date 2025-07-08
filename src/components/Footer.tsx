
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-900 dark:to-slate-900 border-t border-gray-200/50 dark:border-gray-700/50 py-8 sm:py-12 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
            © {currentYear} Lion Calculator. All rights reserved.
          </p>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-500 mt-2 leading-relaxed">
            Premium calculation tools for the modern world
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
