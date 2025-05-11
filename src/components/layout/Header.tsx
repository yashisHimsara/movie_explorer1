import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Clapperboard, Search, User, LogOut, Menu, X, Heart, Sun, Moon,
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import SearchInput from '../ui/SearchInput';

function Header() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchVisible(!isSearchVisible);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
      <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10">
        <div className="container-custom mx-auto py-4 px-4">
          <div className="flex items-center justify-between">

            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-gray-800 dark:text-white">MovieExplorer</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/" className="font-medium text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                Home
              </Link>
              <Link to="/favorites" className="font-medium text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                Favorites
              </Link>
              <button
                  onClick={toggleSearch}
                  className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                  onClick={toggleTheme}
                  className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <div className="flex items-center space-x-1 text-gray-700 dark:text-gray-200">
                <User className="w-5 h-5" />
                <span className="font-medium">{user?.username}</span>
              </div>
              <button
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                  onClick={toggleSearch}
                  className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                  onClick={toggleMenu}
                  className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          {isSearchVisible && (
              <div className="mt-4 px-2 animate-fadeIn">
                <SearchInput onClose={toggleSearch} />
              </div>
          )}

          {/* Mobile Navigation */}
          {isMenuOpen && (
              <nav className="md:hidden py-4 mt-4 bg-gray-50 dark:bg-gray-700 rounded-lg animate-slideDown">
                <div className="flex flex-col space-y-4 p-4">
                  <Link
                      to="/"
                      className="font-medium px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                      to="/favorites"
                      className="font-medium flex items-center px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                  >
                    <Heart className="w-5 h-5 mr-2" />
                    Favorites
                  </Link>
                  <button
                      onClick={() => {
                        toggleTheme();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors text-left"
                  >
                    {theme === 'dark' ? <Sun className="w-5 h-5 mr-2" /> : <Moon className="w-5 h-5 mr-2" />}
                    {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                  </button>
                  <div className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200">
                    <User className="w-5 h-5 mr-2" />
                    <span className="font-medium">{user?.username}</span>
                  </div>
                  <button
                      onClick={handleLogout}
                      className="flex items-center px-4 py-2 text-red-600 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
                  >
                    <LogOut className="w-5 h-5 mr-2" />
                    Logout
                  </button>
                </div>
              </nav>
          )}
        </div>
      </header>
  );
}

export default Header;
