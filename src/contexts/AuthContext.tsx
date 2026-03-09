import { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

interface Subscription {
  id: number;
  app: number;
  plan: string;
  status: string;
  end_date: string | null;
}

interface AuthContextType {
  user: User | null;
  subscriptions: Subscription[];
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAppAccess: (appId: number) => boolean;
  refreshSubscriptions: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = 'http://localhost:8000/api';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      fetchCurrentUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/me/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        await fetchSubscriptions();
      } else {
        localStorage.removeItem('access_token');
      }
    } catch (error) {
      console.error('Failed to fetch user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSubscriptions = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/subscriptions/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setSubscriptions(data);
      }
    } catch (error) {
      console.error('Failed to fetch subscriptions:', error);
    }
  };

  const login = async (username: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    setUser(data.user);
    localStorage.setItem('access_token', data.access);
    await fetchSubscriptions();
  };

  const register = async (username: string, email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    // Auto login after registration
    await login(username, password);
  };

  const logout = async () => {
    await fetch(`${API_BASE_URL}/auth/logout/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    });
    
    localStorage.removeItem('access_token');
    setUser(null);
    setSubscriptions([]);
  };

  const checkAppAccess = (appId: number): boolean => {
    return subscriptions.some(sub => 
      sub.app === appId && sub.status === 'active'
    );
  };

  const refreshSubscriptions = async () => {
    await fetchSubscriptions();
  };

  return (
    <AuthContext.Provider value={{
      user,
      subscriptions,
      isLoading,
      login,
      register,
      logout,
      checkAppAccess,
      refreshSubscriptions,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};