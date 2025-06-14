
import { NavLink } from 'react-router-dom';
import { House as HomeIcon, Calculator, Calendar, Clock, LineChart, RefreshCw } from 'lucide-react';

const navItems = [
  { name: 'Home', path: '/', icon: <HomeIcon size={18} /> },
  { name: 'Age', path: '/age', icon: <Calculator size={18} /> },
  { name: 'BMI', path: '/bmi', icon: <LineChart size={18} /> },
  { name: 'Currency', path: '/currency', icon: <RefreshCw size={18} /> },
  { name: 'Days', path: '/days', icon: <Calendar size={18} /> },
  { name: 'Countdown', path: '/countdown', icon: <Clock size={18} /> },
];

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`
                }
              >
                {item.icon}
                <span className="hidden sm:inline">{item.name}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
