const AUTH_KEY = 'auditdna_agent_auth';

export const authService = {
  register: async (agentData) => {
    if (agentData.ine && agentData.ine.length !== 18) {
      throw new Error('INE must be exactly 18 characters');
    }

    const agents = JSON.parse(localStorage.getItem('agents') || '[]');
    
    const exists = agents.find(a => a.email === agentData.email || a.ine === agentData.ine);
    if (exists) {
      throw new Error('Agent with this email or INE already registered');
    }

    const newAgent = {
      ...agentData,
      id: Date.now().toString(),
      status: 'approved',
      registeredAt: new Date().toISOString()
    };

    agents.push(newAgent);
    localStorage.setItem('agents', JSON.stringify(agents));
    
    return { success: true, message: 'Registration approved! You can login now.' };
  },

  login: async (email, password) => {
    const agents = JSON.parse(localStorage.getItem('agents') || '[]');
    const agent = agents.find(a => a.email === email && a.password === btoa(password));
    
    if (!agent) {
      throw new Error('Invalid email or password');
    }

    localStorage.setItem(AUTH_KEY, JSON.stringify(agent));
    return agent;
  },

  logout: () => {
    localStorage.removeItem(AUTH_KEY);
  },

  getCurrentAgent: () => {
    const data = localStorage.getItem(AUTH_KEY);
    return data ? JSON.parse(data) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem(AUTH_KEY);
  }
};