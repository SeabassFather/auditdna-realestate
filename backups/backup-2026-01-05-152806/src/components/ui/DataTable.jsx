import React from "react";

export default function DataTable({ columns, data }) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
      overflow: 'hidden'
    }}>
      <table style={{width: '100%', borderCollapse: 'collapse'}}>
        <thead>
          <tr style={{background: '#f3f4f6'}}>
            {columns.map((col, i) => (
              <th key={i} style={{
                padding: '16px',
                textAlign: 'left',
                fontSize: '13px',
                fontWeight: 'bold',
                color: '#065f46',
                textTransform: 'uppercase'
              }}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data && data.map((row, i) => (
            <tr key={i} style={{borderBottom: '1px solid #e5e7eb'}}>
              {Object.values(row).map((cell, j) => (
                <td key={j} style={{
                  padding: '16px',
                  fontSize: '14px',
                  color: '#6b7280'
                }}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

