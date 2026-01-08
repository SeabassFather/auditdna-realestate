import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
};

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { ...notification, id }]);
    setTimeout(() => removeNotification(id), 5000);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
      <div style={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 9999, display: 'flex', flexDirection:  'column', gap: '1rem' }}>
        {notifications.map(notif => (
          <div key={notif.id} style={{ background: '#fff', border: '2px solid #22c55e', borderRadius: '8px', padding: '1rem', minWidth: '300px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
            <p style={{ fontWeight: 'bold', color:  '#1e293b' }}>{notif.title}</p>
            <p style={{ fontSize: '0.9rem', color: '#64748b' }}>{notif.message}</p>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
}

export default NotificationProvider;