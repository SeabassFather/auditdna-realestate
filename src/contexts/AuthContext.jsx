// AuthContext.jsx - localStorage based (works immediately)
// src/contexts/AuthContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

// ADMIN ACCOUNTS - Change these before going live!
const ADMIN_ACCOUNTS = [
  { email: 'admin@enjoybaja.com', password: 'EnjoyBaja2026!', name: 'Admin' },
  { email: 'saul@enjoybaja.com', password: 'SaulAdmin2026!', name: 'Saul Garcia' }
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('enjoybaja_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('enjoybaja_user');
      }
    }
    setLoading(false);
  }, []);

  // ============================================
  // LOGIN
  // ============================================
  const login = async (email, password) => {
    // Check admin accounts
    const admin = ADMIN_ACCOUNTS.find(
      a => a.email.toLowerCase() === email.toLowerCase() && a.password === password
    );
    
    if (admin) {
      const userData = {
        email: admin.email,
        name: admin.name,
        role: 'admin',
        loginAt: new Date().toISOString()
      };
      setUser(userData);
      localStorage.setItem('enjoybaja_user', JSON.stringify(userData));
      return { success: true, user: userData };
    }

    // Check approved agents
    const approvedAgents = JSON.parse(localStorage.getItem('approved_agents') || '[]');
    const agent = approvedAgents.find(
      a => a.email.toLowerCase() === email.toLowerCase() && a.password === password
    );

    if (agent) {
      const userData = {
        email: agent.email,
        name: agent.fullName || agent.name,
        role: 'agent',
        company: agent.companyName,
        loginAt: new Date().toISOString()
      };
      setUser(userData);
      localStorage.setItem('enjoybaja_user', JSON.stringify(userData));
      return { success: true, user: userData };
    }

    return { success: false, error: 'Invalid email or password' };
  };

  // ============================================
  // LOGOUT
  // ============================================
  const logout = () => {
    setUser(null);
    localStorage.removeItem('enjoybaja_user');
  };

  // ============================================
  // REGISTER AGENT (Pending approval)
  // ============================================
  const registerAgent = (agentData) => {
    const pendingAgents = JSON.parse(localStorage.getItem('pending_agents') || '[]');
    
    // Check if email already exists
    if (pendingAgents.find(a => a.email.toLowerCase() === agentData.email.toLowerCase())) {
      return { success: false, error: 'Email already registered' };
    }

    const newAgent = {
      ...agentData,
      id: 'AGT-' + Date.now(),
      status: 'pending',
      submittedAt: new Date().toISOString()
    };

    pendingAgents.push(newAgent);
    localStorage.setItem('pending_agents', JSON.stringify(pendingAgents));
    
    return { success: true, agentId: newAgent.id };
  };

  // ============================================
  // APPROVE AGENT (Admin only)
  // ============================================
  const approveAgent = (agentId, credentials) => {
    const pendingAgents = JSON.parse(localStorage.getItem('pending_agents') || '[]');
    const approvedAgents = JSON.parse(localStorage.getItem('approved_agents') || '[]');

    const agentIndex = pendingAgents.findIndex(a => a.id === agentId);
    if (agentIndex === -1) return { success: false, error: 'Agent not found' };

    const agent = pendingAgents[agentIndex];
    
    // Move to approved with credentials
    const approvedAgent = {
      ...agent,
      ...credentials,
      status: 'approved',
      approvedAt: new Date().toISOString()
    };

    approvedAgents.push(approvedAgent);
    pendingAgents.splice(agentIndex, 1);

    localStorage.setItem('pending_agents', JSON.stringify(pendingAgents));
    localStorage.setItem('approved_agents', JSON.stringify(approvedAgents));

    return { success: true, agent: approvedAgent };
  };

  // ============================================
  // REJECT AGENT (Admin only)
  // ============================================
  const rejectAgent = (agentId, reason) => {
    const pendingAgents = JSON.parse(localStorage.getItem('pending_agents') || '[]');
    const rejectedAgents = JSON.parse(localStorage.getItem('rejected_agents') || '[]');

    const agentIndex = pendingAgents.findIndex(a => a.id === agentId);
    if (agentIndex === -1) return { success: false, error: 'Agent not found' };

    const agent = pendingAgents[agentIndex];
    
    // Move to rejected
    const rejectedAgent = {
      ...agent,
      status: 'rejected',
      rejectionReason: reason,
      rejectedAt: new Date().toISOString()
    };

    rejectedAgents.push(rejectedAgent);
    pendingAgents.splice(agentIndex, 1);

    localStorage.setItem('pending_agents', JSON.stringify(pendingAgents));
    localStorage.setItem('rejected_agents', JSON.stringify(rejectedAgents));

    return { success: true };
  };

  // ============================================
  // GET ALL AGENTS (Admin only)
  // ============================================
  const getAllAgents = () => {
    const pending = JSON.parse(localStorage.getItem('pending_agents') || '[]');
    const approved = JSON.parse(localStorage.getItem('approved_agents') || '[]');
    const rejected = JSON.parse(localStorage.getItem('rejected_agents') || '[]');

    return {
      pending,
      approved,
      rejected,
      all: [...pending, ...approved, ...rejected]
    };
  };

  // ============================================
  // CHANGE PASSWORD
  // ============================================
  const changePassword = (currentPassword, newPassword) => {
    if (!user || user.role !== 'agent') {
      return { success: false, error: 'Not authorized' };
    }

    const approvedAgents = JSON.parse(localStorage.getItem('approved_agents') || '[]');
    const agentIndex = approvedAgents.findIndex(a => a.email === user.email);

    if (agentIndex === -1) return { success: false, error: 'Agent not found' };
    if (approvedAgents[agentIndex].password !== currentPassword) {
      return { success: false, error: 'Current password is incorrect' };
    }

    approvedAgents[agentIndex].password = newPassword;
    localStorage.setItem('approved_agents', JSON.stringify(approvedAgents));

    return { success: true };
  };

  // ============================================
  // CONTEXT VALUE
  // ============================================
  const value = {
    user,
    loading,
    login,
    logout,
    registerAgent,
    approveAgent,
    rejectAgent,
    getAllAgents,
    changePassword,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isAgent: user?.role === 'agent'
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}