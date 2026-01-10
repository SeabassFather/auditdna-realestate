import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// ============================================
// CONTEXT PROVIDERS
// ============================================
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';

// ============================================
// AUTH COMPONENTS
// ============================================
import ProtectedRoute from './components/auth/ProtectedRoute';

// ============================================
// PUBLIC PAGES
// ============================================
import Login from './pages/Login';
import MexicoRealEstate from './pages/MexicoRealEstate';
import USAMortgage from './pages/USAMortgage';
import Developments from './pages/Developments';
import AgentRegistration from './pages/AgentRegistration';

// ============================================
// PROTECTED PAGES (Require Login)
// ============================================
import AdminDashboard from './pages/AdminDashboard';
import AgentDashboard from './pages/AgentDashboard';
import AgentPropertyUpload from './pages/AgentPropertyUpload';

// ============================================
// WIDGETS
// ============================================
import WhatsAppWidget from './components/chat/WhatsAppWidget';
import AIChatWidget from './components/chat/AIChatWidget';

// ============================================
// MAIN APP COMPONENT
// ============================================
export default function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <Router>
          <Routes>
            {/* ========================================== */}
            {/* PUBLIC ROUTES - No Login Required */}
            {/* ========================================== */}
            
            {/* Home / Landing */}
            <Route path="/" element={<MexicoRealEstate />} />
            
            {/* Main Pages */}
            <Route path="/mexico-real-estate" element={<MexicoRealEstate />} />
            <Route path="/usa-mortgage" element={<USAMortgage />} />
            <Route path="/developments" element={<Developments />} />
            
            {/* Authentication */}
            <Route path="/login" element={<Login />} />
            <Route path="/agent-register" element={<AgentRegistration />} />

            {/* ========================================== */}
            {/* PROTECTED ROUTES - Login Required */}
            {/* ========================================== */}
            
            {/* Admin Dashboard - Admin Only */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Agent Dashboard - Agents & Admins */}
            <Route 
              path="/agent-dashboard" 
              element={
                <ProtectedRoute>
                  <AgentDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Agent Property Upload - Agents & Admins */}
            <Route 
              path="/agent-upload" 
              element={
                <ProtectedRoute>
                  <AgentPropertyUpload />
                </ProtectedRoute>
              } 
            />
            
            {/* Agent Property Upload - Alternative URL */}
            <Route 
              path="/agent-property-upload" 
              element={
                <ProtectedRoute>
                  <AgentPropertyUpload />
                </ProtectedRoute>
              } 
            />

            {/* ========================================== */}
            {/* CATCH ALL - Redirect to Home */}
            {/* ========================================== */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          {/* ========================================== */}
          {/* GLOBAL WIDGETS - Always Visible */}
          {/* ========================================== */}
          <WhatsAppWidget />
          <AIChatWidget />
        </Router>
      </LanguageProvider>
    </AuthProvider>
  );
}