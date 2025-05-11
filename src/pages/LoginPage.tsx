import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Popcorn, Eye, EyeOff } from 'lucide-react'; // Changed icon
import { useAuth } from '../contexts/AuthContext';
import ErrorMessage from '../components/ui/ErrorMessage';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(username, password);
      if (success) {
        navigate('/');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-200 dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-3">
                <Popcorn className="h-12 w-12 text-purple-600 dark:text-purple-400" />
              </div>
              <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                MovieExplorer Login
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && <ErrorMessage message={error} />}

              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Username
                </label>
                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="input bg-gray-50 dark:bg-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-500 rounded-md w-full p-2.5"
                    placeholder="Enter your username"
                    required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input bg-gray-50 dark:bg-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-500 rounded-md w-full p-2.5 pr-10"
                      placeholder="Enter your password"
                      required
                  />
                  <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div>
                <button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 px-4 rounded-md flex justify-center items-center transition-colors"
                    disabled={isLoading}
                >
                  {isLoading ? (
                      <span className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                  ) : null}
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  );
}

export default LoginPage;
