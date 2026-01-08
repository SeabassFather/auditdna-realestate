import React from "react";

export default function ProgressBar({ label, value, max = 100, color = "#10b981", showPercentage = true }) {
  const percentage = (value / max) * 100;
  
  return (
    <div style={{marginBottom: '20px'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px'}}>
        <span style={{fontSize: '14px', fontWeight: 'bold', color: '#065f46'}}>{label}</span>
        {showPercentage && (
          <span style={{fontSize: '14px', fontWeight: 'bold', color: color}}>
            {percentage.toFixed(1)}%
          </span>
        )}
      </div>
      <div style={{
        width: '100%',
        height: '12px',
        background: '#e5e7eb',
        borderRadius: '6px',
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${percentage}%`,
          height: '100%',
          background: `linear-gradient(90deg, ${color} 0%, ${color}dd 100%)`,
          borderRadius: '6px',
          transition: 'width 0.5s ease'
        }}></div>
      </div>
    </div>
  );
}

