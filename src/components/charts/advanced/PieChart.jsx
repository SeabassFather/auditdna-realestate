import React from "react";

export default function PieChart({ title, data }) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  let currentAngle = 0;
  
  const colors = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'];
  
  return (
    <div style={{
      background: 'white',
      padding: '30px',
      borderRadius: '12px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
      border: '2px solid #e5e7eb'
    }}>
      <h3 style={{fontSize: '18px', fontWeight: 'bold', color: '#065f46', marginBottom: '20px'}}>
        {title}
      </h3>
      <div style={{display: 'flex', gap: '30px', alignItems: 'center'}}>
        <svg width="200" height="200" viewBox="0 0 100 100">
          {data.map((d, i) => {
            const percentage = (d.value / total) * 100;
            const angle = (percentage / 100) * 360;
            const startAngle = currentAngle;
            const endAngle = currentAngle + angle;
            
            const x1 = 50 + 40 * Math.cos((startAngle - 90) * Math.PI / 180);
            const y1 = 50 + 40 * Math.sin((startAngle - 90) * Math.PI / 180);
            const x2 = 50 + 40 * Math.cos((endAngle - 90) * Math.PI / 180);
            const y2 = 50 + 40 * Math.sin((endAngle - 90) * Math.PI / 180);
            
            const largeArc = angle > 180 ? 1 : 0;
            const path = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`;
            
            currentAngle += angle;
            
            return (
              <path
                key={i}
                d={path}
                fill={colors[i % colors.length]}
                stroke="white"
                strokeWidth="2"
              />
            );
          })}
        </svg>
        
        <div style={{flex: 1}}>
          {data.map((d, i) => (
            <div key={i} style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px'}}>
              <div style={{
                width: '16px',
                height: '16px',
                borderRadius: '4px',
                background: colors[i % colors.length]
              }}></div>
              <div style={{flex: 1}}>
                <div style={{fontSize: '14px', fontWeight: 'bold', color: '#065f46'}}>{d.label}</div>
                <div style={{fontSize: '12px', color: '#6b7280'}}>
                  {d.value} ({((d.value / total) * 100).toFixed(1)}%)
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

