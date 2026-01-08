import React, { createContext, useContext, useState, useEffect } from 'react';
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('auditdna_user');
    if (storedUser) {
      try { setUser(JSON.parse(storedUser)); }
      catch (error) { localStorage.removeItem('auditdna_user'); }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    if (email === 'admin@auditdna.com' && password === 'admin123') {
      const user = { id: 'admin-1', email, name: 'Admin', role: 'admin', token: 'admin-' + Date.now() };
      setUser(user);
      localStorage.setItem('auditdna_user', JSON.stringify(user));
      return { success: true, user };
    }
    if (email === 'agent@auditdna.com' && password === 'agent123') {
      const user = { id: 'agent-1', email, name: 'Agent', role: 'agent', token: 'agent-' + Date.now() };
      setUser(user);
      localStorage.setItem('auditdna_user', JSON.stringify(user));
      return { success: true, user };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const register = async (userData) => {
    const users = JSON.parse(localStorage.getItem('registered_users') || '[]');
    if (users.some(u => u.email === userData.email)) return { success: false, error: 'Email exists' };
    const newUser = { id: 'user-' + Date.now(), ...userData, role: 'user' };
    users.push(newUser);
    localStorage.setItem('registered_users', JSON.stringify(users));
    setUser(newUser);
    localStorage.setItem('auditdna_user', JSON.stringify(newUser));
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auditdna_user');
  };

  const value = { user, login, register, logout, isAuthenticated: !!user, isAdmin: user?.role === 'admin', isAgent: user?.role === 'agent', loading };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}