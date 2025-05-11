import { Clapperboard, Heart } from 'lucide-react'; // Changed icon
import { Link } from 'react-router-dom';

function Footer() {
  return (
      <footer className="bg-gradient-to-t from-purple-100 to-indigo-100 dark:from-gray-900 dark:to-gray-800 border-t border-gray-300 dark:border-gray-700 py-10 mt-12">
        <div className="container-custom mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <span className="text-lg font-semibold text-gray-800 dark:text-white">MovieExplorer</span>
            </div>

          </div>

          <div className="flex justify-center mt-8 space-x-6">
            <Link to="/" className="text-sm text-gray-700 dark:text-gray-300 hover:text-purple-700 dark:hover:text-purple-400 transition-colors">
              Home
            </Link>
            <Link to="/favorites" className="text-sm text-gray-700 dark:text-gray-300 hover:text-purple-700 dark:hover:text-purple-400 transition-colors">
              Favorites
            </Link>
          </div>

          <div className="text-center mt-6 text-xs text-gray-500 dark:text-gray-600">
            &copy; {new Date().getFullYear()} MovieExplorer. All rights reserved.
          </div>
        </div>
      </footer>
  );
}

export default Footer;
