import React from "react";

export default function StatCard({ icon, label, value, change, color = "#10b981" }) {
  return (
    <div style={{
      background: 'white',
      padding: '25px',
      borderRadius: '12px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
      border: `2px solid ${color}20`,
      transition: 'all 0.3s'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-5px)';
      e.currentTarget.style.boxShadow = `0 8px 25px ${color}40`;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.08)';
    }}
    >
      {icon && <div style={{fontSize: '32px', marginBottom: '12px'}}>{icon}</div>}
      <div style={{fontSize: '32px', fontWeight: 'bold', color: color, marginBottom: '8px'}}>
        {value}
      </div>
      <div style={{fontSize: '13px', color: '#6b7280', marginBottom: '8px', textTransform: 'uppercase'}}>
        {label}
      </div>
      {change && (
        <div style={{
          fontSize: '12px',
          fontWeight: 'bold',
          color: change.startsWith('+') ? '#10b981' : '#ef4444'
        }}>
          {change}
        </div>
      )}
    </div>
  );
}

