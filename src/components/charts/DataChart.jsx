import React from "react";

export default function DataChart({ title, data, type = "bar" }) {
  return (
    <div style={{
      background: 'white',
      padding: '25px',
      borderRadius: '12px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
    }}>
      <h3 style={{fontSize: '18px', fontWeight: 'bold', color: '#065f46', marginBottom: '20px'}}>
        {title}
      </h3>
      <div style={{height: '200px', display: 'flex', alignItems: 'flex-end', gap: '10px'}}>
        {data && data.map((item, i) => (
          <div key={i} style={{
            flex: 1,
            height: `${item.value}%`,
            background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
            borderRadius: '4px 4px 0 0',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            padding: '5px',
            color: 'white',
            fontSize: '12px',
            fontWeight: 'bold'
          }}>
            {item.value}%
          </div>
        ))}
      </div>
    </div>
  );
}

