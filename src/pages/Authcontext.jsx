import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const AuthContext = createContext(null);

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const savedUser = localStorage.getItem('enjoybaja_user');
        const savedToken = localStorage.getItem('enjoybaja_token');
        
        if (savedUser && savedToken) {
          const userData = JSON.parse(savedUser);
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('enjoybaja_user');
        localStorage.removeItem('enjoybaja_token');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800));

      const validUsers = [
        { 
          email: 'admin@enjoybaja.com', 
          password: 'EnjoyBaja2026!',
          role: 'admin',
          name: 'Admin User'
        },
        { 
          email: 'saul@enjoybaja.com', 
          password: 'SaulAdmin2026!',
          role: 'admin',
          name: 'Saul Garcia'
        },
        { 
          email: 'agent@enjoybaja.com', 
          password: 'Agent2026!',
          role: 'agent',
          name: 'Test Agent'
        }
      ];

      const foundUser = validUsers.find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (foundUser) {
        const userData = {
          id: 'USR-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
          email: foundUser.email,
          name: foundUser.name,
          role: foundUser.role,
          permissions: foundUser.role === 'admin' ? ['all'] : ['agent'],
          loginTime: new Date().toISOString()
        };

        const token = 'TOKEN-' + Math.random().toString(36).substr(2, 16).toUpperCase();

        setUser(userData);
        setIsAuthenticated(true);

        localStorage.setItem('enjoybaja_user', JSON.stringify(userData));
        localStorage.setItem('enjoybaja_token', token);

        setLoading(false);
        return { success: true, user: userData };
      } else {
        setLoading(false);
        return { success: false, error: 'Invalid email or password' };
      }
    } catch (error) {
      setLoading(false);
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('enjoybaja_user');
    localStorage.removeItem('enjoybaja_token');
  };

  // Register function (for agents)
  const register = async (userData) => {
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800));

      const newUser = {
        id: 'USR-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        email: userData.email,
        name: userData.name || userData.email.split('@')[0],
        role: 'agent',
        permissions: ['agent'],
        phone: userData.phone || '',
        company: userData.company || '',
        registeredAt: new Date().toISOString()
      };

      const token = 'TOKEN-' + Math.random().toString(36).substr(2, 16).toUpperCase();

      setUser(newUser);
      setIsAuthenticated(true);

      localStorage.setItem('enjoybaja_user', JSON.stringify(newUser));
      localStorage.setItem('enjoybaja_token', token);

      setLoading(false);
      return { success: true, user: newUser };
    } catch (error) {
      setLoading(false);
      return { success: false, error: 'Registration failed. Please try again.' };
    }
  };

  const hasRole = (role) => {
    return user?.role === role || user?.role === 'admin';
  };

  const hasPermission = (permission) => {
    return user?.permissions?.includes(permission) || user?.permissions?.includes('all');
  };

  // =============================================
  // THIS IS THE FIX - isAdmin COMPUTED HERE
  // =============================================
  const isAdmin = user?.role === 'admin';

  const value = {
    user,
    isAuthenticated,
    isAdmin,           // <-- THIS WAS MISSING IN YOUR FILE!
    loading,
    login,
    logout,
    register,
    hasRole,
    hasPermission
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;