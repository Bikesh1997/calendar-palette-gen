import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState, LoginCredentials } from '@/types/auth';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: 'sales_executive' | 'supervisor' | 'inbound_agent' | 'relationship_manager' | 'admin') => void;
  updateUserRole: (userId: string, newRole: 'sales_executive' | 'supervisor' | 'inbound_agent' | 'relationship_manager' | 'admin') => void;
  updateProfile: (updates: Partial<User>) => void;
  resetPassword: (email: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Enhanced user data with more details including new roles - Added admin account
const MOCK_USERS: User[] = [
  {
    id: '1',
    email: 'admin@bank.com',
    name: 'System Administrator',
    role: 'admin',
    branch: 'Head Office'
  },
  {
    id: '2',
    email: 'supervisor@bank.com',
    name: 'Priya Manager',
    role: 'supervisor',
    branch: 'Mumbai Central'
  },
  {
    id: '3',
    email: 'sales2@bank.com',
    name: 'Anjali Patel',
    role: 'sales_executive',
    department: 'inbound',
    branch: 'Mumbai Central'
  },
  {
    id: '4',
    email: 'inbound@bank.com',
    name: 'Vikram Singh',
    role: 'inbound_agent',
    department: 'inbound',
    branch: 'Mumbai Central'
  },
  {
    id: '5',
    email: 'relationship@bank.com',
    name: 'Neha Gupta',
    role: 'relationship_manager',
    department: 'branch',
    branch: 'Mumbai Central'
  }
];

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    console.log('AuthProvider: Initializing authentication');
    
    // Check for existing session with timeout
    const initAuth = async () => {
      try {
        console.log('AuthProvider: Checking localStorage for existing session');
        const savedUser = localStorage.getItem('user');
        const sessionExpiry = localStorage.getItem('sessionExpiry');
        
        console.log('AuthProvider: savedUser exists:', !!savedUser);
        console.log('AuthProvider: sessionExpiry exists:', !!sessionExpiry);
        
        if (savedUser && sessionExpiry) {
          const now = new Date().getTime();
          const expiryTime = parseInt(sessionExpiry);
          console.log('AuthProvider: Current time:', now, 'Expiry time:', expiryTime);
          
          if (now < expiryTime) {
            const parsedUser = JSON.parse(savedUser);
            console.log('AuthProvider: Restoring user session:', parsedUser);
            setUser(parsedUser);
            setIsAuthenticated(true);
          } else {
            console.log('AuthProvider: Session expired, clearing storage');
            localStorage.removeItem('user');
            localStorage.removeItem('sessionExpiry');
          }
        } else {
          console.log('AuthProvider: No existing session found');
        }
      } catch (error) {
        console.error('AuthProvider: Auth initialization error:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('sessionExpiry');
      }
      
      console.log('AuthProvider: Initialization complete, setting loading to false');
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = React.useCallback(async (credentials: LoginCredentials): Promise<boolean> => {
    console.log('AuthProvider: Login attempt for email:', credentials.email);
    setIsLoading(true);
    
    try {
      // Simulate API delay
      console.log('AuthProvider: Simulating API call delay');
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const foundUser = MOCK_USERS.find(u => u.email === credentials.email);
      console.log('AuthProvider: User found:', !!foundUser);
      
      if (foundUser && credentials.password === 'password123') {
        console.log('AuthProvider: Password correct, logging in user:', foundUser);
        setUser(foundUser);
        setIsAuthenticated(true);
        
        // Set session expiry (24 hours)
        const expiry = new Date().getTime() + (24 * 60 * 60 * 1000);
        console.log('AuthProvider: Setting localStorage with expiry:', expiry);
        
        try {
          localStorage.setItem('user', JSON.stringify(foundUser));
          localStorage.setItem('sessionExpiry', expiry.toString());
          console.log('AuthProvider: localStorage set successfully');
        } catch (storageError) {
          console.error('AuthProvider: localStorage error:', storageError);
        }
        
        setIsLoading(false);
        console.log('AuthProvider: Login successful');
        return true;
      }
      
      console.log('AuthProvider: Login failed - invalid credentials');
      setIsLoading(false);
      return false;
    } catch (error) {
      console.error('AuthProvider: Login error:', error);
      setIsLoading(false);
      return false;
    }
  }, []);

  const logout = React.useCallback(() => {
    console.log('AuthProvider: Logging out user');
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('sessionExpiry');
    console.log('AuthProvider: Logout complete');
  }, []);

  const switchRole = React.useCallback((role: 'sales_executive' | 'supervisor' | 'inbound_agent' | 'relationship_manager' | 'admin') => {
    if (user) {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  }, [user]);

  const updateUserRole = React.useCallback((userId: string, newRole: 'sales_executive' | 'supervisor' | 'inbound_agent' | 'relationship_manager' | 'admin') => {
    if (user?.role === 'supervisor') {
      const targetUser = MOCK_USERS.find(u => u.id === userId);
      if (targetUser) {
        targetUser.role = newRole;
        if (user.id === userId) {
          const updatedUser = { ...user, role: newRole };
          setUser(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
      }
    }
  }, [user]);

  const updateProfile = React.useCallback((updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  }, [user]);

  const resetPassword = React.useCallback(async (email: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    const userExists = MOCK_USERS.some(u => u.email === email);
    return userExists;
  }, []);

  const contextValue = React.useMemo(() => {
    console.log('AuthProvider: Context value updated - isAuthenticated:', isAuthenticated, 'user:', user?.email);
    return {
      user,
      isAuthenticated,
      isLoading,
      login,
      logout,
      switchRole: (role: 'sales_executive' | 'supervisor' | 'inbound_agent' | 'relationship_manager') => {
        if (user) {
          const updatedUser = { ...user, role };
          setUser(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
      },
      updateUserRole: (userId: string, newRole: 'sales_executive' | 'supervisor' | 'inbound_agent' | 'relationship_manager') => {
        if (user?.role === 'supervisor') {
          const targetUser = MOCK_USERS.find(u => u.id === userId);
          if (targetUser) {
            targetUser.role = newRole;
            if (user.id === userId) {
              const updatedUser = { ...user, role: newRole };
              setUser(updatedUser);
              localStorage.setItem('user', JSON.stringify(updatedUser));
            }
          }
        }
      },
      updateProfile: (updates: Partial<User>) => {
        if (user) {
          const updatedUser = { ...user, ...updates };
          setUser(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
      },
      resetPassword: async (email: string): Promise<boolean> => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const userExists = MOCK_USERS.some(u => u.email === email);
        return userExists;
      }
    };
  }, [user, isAuthenticated, isLoading, login, logout]);

  return (
    <AuthContext.Provider value={contextValue}>
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
