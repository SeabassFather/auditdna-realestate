import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

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
        localStorage.removeItem('enjoybaja_user');
        localStorage.removeItem('enjoybaja_token');
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      // =============================================
      // MASTER CREDENTIALS - SYNCED WITH App.js
      // =============================================
      const validUsers = [
        // ADMIN
        { email: 'saul@enjoybaja.com', password: 'Admin2026!', role: 'admin', name: 'Saul Garcia' },
        
        // DEMO
        { email: 'demo@enjoybaja.com', password: 'Demo2026!', role: 'demo', name: 'Demo User' },
        
        // AGENTS
        { email: 'agent1@enjoybaja.com', password: 'Agent1!', role: 'agent', name: 'Agent 1' },
        { email: 'agent2@enjoybaja.com', password: 'Agent2!', role: 'agent', name: 'Agent 2' },
        { email: 'agent3@enjoybaja.com', password: 'Agent3!', role: 'agent', name: 'Agent 3' },
        { email: 'agent4@enjoybaja.com', password: 'Agent4!', role: 'agent', name: 'Agent 4' },
        { email: 'agent5@enjoybaja.com', password: 'Agent5!', role: 'agent', name: 'Agent 5' },
        
        // SALES
        { email: 'sales1@enjoybaja.com', password: 'Sales1!', role: 'sales', name: 'Sales Rep 1' },
        { email: 'sales2@enjoybaja.com', password: 'Sales2!', role: 'sales', name: 'Sales Rep 2' },
        { email: 'sales3@enjoybaja.com', password: 'Sales3!', role: 'sales', name: 'Sales Rep 3' },
        { email: 'sales4@enjoybaja.com', password: 'Sales4!', role: 'sales', name: 'Sales Rep 4' },
        { email: 'sales5@enjoybaja.com', password: 'Sales5!', role: 'sales', name: 'Sales Rep 5' }
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
          permissions: foundUser.role === 'admin' ? ['all'] : [foundUser.role],
          loginTime: new Date().toISOString()
        };

        const token = 'TOKEN-' + Math.random().toString(36).substr(2, 16).toUpperCase();

        setUser(userData);
        setIsAuthenticated(true);
        
        // Store user email in sessionStorage for App.js to use
        sessionStorage.setItem('user_email', foundUser.email);
        
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

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('enjoybaja_user');
    localStorage.removeItem('enjoybaja_token');
    sessionStorage.clear();
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated,
    isAdmin: user?.role === 'admin',
    isAgent: user?.role === 'agent',
    isDemo: user?.role === 'demo',
    isSales: user?.role === 'sales'
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;