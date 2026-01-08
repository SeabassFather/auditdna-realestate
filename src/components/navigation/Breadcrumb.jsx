import React from "react";
import { useNavigate } from "react-router-dom";

export default function Breadcrumb({ items }) {
  const navigate = useNavigate();

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '15px 0',
      fontSize: '14px',
      color: '#6b7280'
    }}>
      {items.map((item, i) => (
        <React.Fragment key={i}>
          <span
            onClick={() => item.path && navigate(item.path)}
            style={{
              cursor: item.path ? 'pointer' : 'default',
              color: item.path ? '#059669' : '#6b7280',
              fontWeight: item.path ? 'normal' : 'bold'
            }}
          >
            {item.label}
          </span>
          {i < items.length - 1 && <span>›</span>}
        </React.Fragment>
      ))}
    </div>
  );
}

