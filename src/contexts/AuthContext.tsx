import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  username: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load user from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Simple login function (no actual authentication in this demo)
  const login = async (username: string, password: string): Promise<boolean> => {
    // For demo purposes, just checking if fields are filled
    if (!username || !password) {
      setError('Please enter both username and password');
      return false;
    }
    
    try {
      // In a real app, this would be an API call
      // For demo, just accept any non-empty credentials
      if (username.trim() && password.trim()) {
        const userData = { username };
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userData));
        setError(null);
        return true;
      } else {
        setError('Invalid credentials');
        return false;
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}