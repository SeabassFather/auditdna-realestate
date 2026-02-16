import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    sessionStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('admin_access_level');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};