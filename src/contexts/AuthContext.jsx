import React, { createContext, useContext, useState, useEffect } from 'react';
import Brain from '../services/Brain';

// =============================================
// AUTH CONTEXT v3.0 — EnjoyBaja / AuditDNA
// Supports: owner, admin, sales, agent, demo
// Updated: 2026 — New eb.com email format
// =============================================

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser]                       = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading]                 = useState(true);

  // ── Restore session on mount ─────────────────────────────────
  useEffect(() => {
    const storedUser = sessionStorage.getItem('eb_user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        setIsAuthenticated(true);
      } catch {
        sessionStorage.removeItem('eb_user');
      }
    }
    setLoading(false);
  }, []);

  // ── Login ────────────────────────────────────────────────────
  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    sessionStorage.setItem('eb_user', JSON.stringify(userData));

    if (userData.role === 'owner') {
      sessionStorage.setItem('admin_access_level', 'owner');
      sessionStorage.setItem('admin_user_name',    userData.name);
      sessionStorage.setItem('admin_user_email',   userData.email);
    } else if (userData.role === 'admin') {
      sessionStorage.setItem('admin_access_level', 'admin');
      sessionStorage.setItem('admin_user_name',    userData.name);
      sessionStorage.setItem('admin_user_email',   userData.email);
    } else if (userData.role === 'sales') {
      sessionStorage.setItem('admin_access_level', 'sales');
      sessionStorage.setItem('admin_user_name',    userData.name);
      sessionStorage.setItem('admin_user_email',   userData.email);
    } else if (userData.role === 'agent') {
      sessionStorage.setItem('agent_content_authorized', 'true');
    }

    // ── Notify Brain of login event ──────────────────────────
    Brain.logSessionEvent('login', userData);
  };

  // ── Logout ───────────────────────────────────────────────────
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    sessionStorage.removeItem('eb_user');
    sessionStorage.removeItem('admin_access_level');
    sessionStorage.removeItem('admin_user_name');
    sessionStorage.removeItem('admin_user_email');
    sessionStorage.removeItem('agent_content_authorized');

    // ── Notify Brain of logout event ─────────────────────────
    Brain.logSessionEvent('logout', user);
  };

  // ── Role flags ───────────────────────────────────────────────
  const isOwner = user?.role === 'owner';
  const isAdmin = user?.role === 'admin' || user?.role === 'owner';
  const isSales = user?.role === 'sales';
  const isAgent = user?.role === 'agent';
  const isDemo  = user?.role === 'demo';

  // ── Access levels ────────────────────────────────────────────
  const hasOwnerAccess = isOwner;
  const hasAdminAccess = isOwner || isAdmin;
  const hasAgentAccess = isOwner || isAdmin || isAgent;
  const hasSalesAccess = isOwner || isAdmin || isSales;

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      loading,
      login,
      logout,
      isOwner,
      isAdmin,
      isSales,
      isAgent,
      isDemo,
      hasOwnerAccess,
      hasAdminAccess,
      hasAgentAccess,
      hasSalesAccess,
    }}>
      {children}
    </AuthContext.Provider>
  );
};