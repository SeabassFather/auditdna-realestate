import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function ProtectedRoute({ children, requireOwner = false }) {
  const { isAuthenticated, user } = useAuth();
  const storedPin = sessionStorage.getItem('admin_pin');

  // Not logged in at all
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Owner-only routes require PIN verification
  if (requireOwner) {
    const accessLevel = sessionStorage.getItem('admin_access_level');
    
    // Not owner role
    if (accessLevel !== 'owner') {
      return <Navigate to="/" replace />;
    }
    
    // Owner but no PIN verified
    if (!storedPin || storedPin !== '060905') {
      return <Navigate to="/login" replace />;
    }
  }

  return children;
}

export default ProtectedRoute;