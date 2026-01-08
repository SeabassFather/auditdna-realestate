import React from "react";

export default function LineChart({ title, data, height = "300px", color = "#10b981" }) {
  const maxValue = Math.max(...data.map(d => d.value));
  
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
      <div style={{height: height, position: 'relative', padding: '20px 0'}}>
        <svg width="100%" height="100%" style={{overflow: 'visible'}}>
          {/* Grid Lines */}
          {[0, 25, 50, 75, 100].map(percent => (
            <line
              key={percent}
              x1="0"
              y1={`${100 - percent}%`}
              x2="100%"
              y2={`${100 - percent}%`}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          ))}
          
          {/* Line Path */}
          <polyline
            points={data.map((d, i) => 
              `${(i / (data.length - 1)) * 100}%,${100 - (d.value / maxValue * 100)}%`
            ).join(' ')}
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Data Points */}
          {data.map((d, i) => (
            <circle
              key={i}
              cx={`${(i / (data.length - 1)) * 100}%`}
              cy={`${100 - (d.value / maxValue * 100)}%`}
              r="5"
              fill={color}
              stroke="white"
              strokeWidth="2"
            />
          ))}
        </svg>
        
        {/* Labels */}
        <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '15px'}}>
          {data.map((d, i) => (
            <div key={i} style={{fontSize: '12px', color: '#6b7280', textAlign: 'center'}}>
              {d.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

