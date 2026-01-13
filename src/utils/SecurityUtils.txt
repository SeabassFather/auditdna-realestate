// ============================================================================
// ENJOYBAJA SECURITY UTILITIES
// IP Tracking, Rate Limiting, Validation
// ============================================================================

// Get client IP (simplified for localStorage demo)
export const getClientIP = () => {
  // In production, this would come from server
  // For now, use a session-based identifier
  let sessionIP = sessionStorage.getItem('client_session_id');
  if (!sessionIP) {
    sessionIP = 'IP_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem('client_session_id', sessionIP);
  }
  return sessionIP;
};

// Check if IP is blocked
export const isIPBlocked = (ip) => {
  const blockedIPs = JSON.parse(localStorage.getItem('blocked_ips') || '[]');
  const blocked = blockedIPs.find(b => b.ip === ip);
  
  if (!blocked) return { blocked: false };
  
  // Check if block has expired
  if (!blocked.permanent && new Date(blocked.expiresAt) < new Date()) {
    // Remove expired block
    const updated = blockedIPs.filter(b => b.ip !== ip);
    localStorage.setItem('blocked_ips', JSON.stringify(updated));
    return { blocked: false };
  }
  
  return { 
    blocked: true, 
    reason: blocked.reason,
    expiresAt: blocked.expiresAt,
    permanent: blocked.permanent
  };
};

// Block an IP address
export const blockIP = (ip, reason, durationHours = 24) => {
  const blockedIPs = JSON.parse(localStorage.getItem('blocked_ips') || '[]');
  
  // Check if already blocked
  const existing = blockedIPs.find(b => b.ip === ip);
  
  if (existing) {
    // Escalate block duration
    existing.attempts = (existing.attempts || 1) + 1;
    if (existing.attempts >= 3) {
      existing.permanent = true;
      existing.expiresAt = null;
    } else {
      existing.expiresAt = new Date(Date.now() + (durationHours * 60 * 60 * 1000 * existing.attempts)).toISOString();
    }
    existing.reason = reason;
    existing.blockedAt = new Date().toISOString();
  } else {
    blockedIPs.push({
      ip: ip,
      reason: reason,
      attempts: 1,
      blockedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + (durationHours * 60 * 60 * 1000)).toISOString(),
      permanent: false
    });
  }
  
  localStorage.setItem('blocked_ips', JSON.stringify(blockedIPs));
};

// Log access attempt
export const logAccessAttempt = (ip, route, success) => {
  const attempts = JSON.parse(localStorage.getItem('access_attempts') || '[]');
  
  attempts.push({
    ip: ip,
    route: route,
    success: success,
    timestamp: new Date().toISOString()
  });
  
  // Keep only last 1000 attempts
  if (attempts.length > 1000) {
    attempts.shift();
  }
  
  localStorage.setItem('access_attempts', JSON.stringify(attempts));
  
  // Check for bypass attempts
  const recentAttempts = attempts.filter(a => 
    a.ip === ip && 
    !a.success && 
    new Date(a.timestamp) > new Date(Date.now() - 3600000) // Last hour
  );
  
  if (recentAttempts.length >= 3) {
    blockIP(ip, 'bypass_attempt', 24);
    return { blocked: true, reason: 'Too many failed access attempts' };
  }
  
  return { blocked: false };
};

// Validate RFC (Mexico Tax ID)
export const validateRFC = (rfc) => {
  if (!rfc) return { valid: false, error: 'RFC is required' };
  
  // Remove spaces and convert to uppercase
  const cleanRFC = rfc.replace(/\s/g, '').toUpperCase();
  
  // RFC format: 4 letters + 6 digits + 3 alphanumeric (individual)
  // or 3 letters + 6 digits + 3 alphanumeric (company)
  const individualPattern = /^[A-Z]{4}\d{6}[A-Z0-9]{3}$/;
  const companyPattern = /^[A-Z]{3}\d{6}[A-Z0-9]{3}$/;
  
  if (individualPattern.test(cleanRFC) || companyPattern.test(cleanRFC)) {
    return { valid: true, formatted: cleanRFC };
  }
  
  return { 
    valid: false, 
    error: 'Invalid RFC format. Must be 12-13 alphanumeric characters.' 
  };
};

// Validate email
export const validateEmail = (email) => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
};

// Validate phone (Mexico/USA)
export const validatePhone = (phone) => {
  // Remove all non-digits
  const digits = phone.replace(/\D/g, '');
  // Valid if 10-15 digits
  return digits.length >= 10 && digits.length <= 15;
};

// Check registration rate limit
export const checkRegistrationRateLimit = (ip) => {
  const attempts = JSON.parse(localStorage.getItem('registration_attempts') || '[]');
  const today = new Date().toDateString();
  
  const todayAttempts = attempts.filter(a => 
    a.ip === ip && 
    new Date(a.timestamp).toDateString() === today
  );
  
  if (todayAttempts.length >= 5) {
    return { 
      allowed: false, 
      error: 'Maximum registration attempts reached for today. Try again tomorrow.' 
    };
  }
  
  return { allowed: true, remaining: 5 - todayAttempts.length };
};

// Log registration attempt
export const logRegistrationAttempt = (ip) => {
  const attempts = JSON.parse(localStorage.getItem('registration_attempts') || '[]');
  
  attempts.push({
    ip: ip,
    timestamp: new Date().toISOString()
  });
  
  // Keep only last 30 days
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const filtered = attempts.filter(a => new Date(a.timestamp) > thirtyDaysAgo);
  
  localStorage.setItem('registration_attempts', JSON.stringify(filtered));
};

// Get agent by email
export const getAgentByEmail = (email) => {
  const agents = JSON.parse(localStorage.getItem('registered_agents') || '[]');
  return agents.find(a => a.email.toLowerCase() === email.toLowerCase());
};

// Get agent verification status
export const getAgentStatus = (email) => {
  const agent = getAgentByEmail(email);
  if (!agent) return { registered: false };
  
  return {
    registered: true,
    status: agent.status,
    id: agent.id,
    fullName: agent.fullName
  };
};

// Check if user can access protected route
export const canAccessProtectedRoute = (email) => {
  const agent = getAgentByEmail(email);
  if (!agent) return { allowed: false, reason: 'not_registered' };
  
  switch (agent.status) {
    case 'verified':
      return { allowed: true };
    case 'pending':
      return { allowed: false, reason: 'pending_verification' };
    case 'rejected':
      return { allowed: false, reason: 'rejected' };
    case 'suspended':
      return { allowed: false, reason: 'suspended' };
    default:
      return { allowed: false, reason: 'unknown_status' };
  }
};