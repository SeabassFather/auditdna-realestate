import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function FactoringDashboard() {
  const [records, setRecords] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchData = async (searchTerm = '') => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5050/api/factoring/search?query=${searchTerm}`);
      setRecords(response.data || []);
    } catch (err) {
      console.error('Error fetching factoring data:', err);
      // Mock data for demo if backend not available
      setRecords([
        { client: 'Mexausa Food Group', invoice: 'INV-2025-001', po: 'PO-2025-123', amount: 45000, rate: 2.5, term: '30 days', status: 'Approved' },
        { client: 'Fresh Produce Ltd', invoice: 'INV-2025-002', po: 'PO-2025-124', amount: 32000, rate: 3.0, term: '45 days', status: 'Pending' },
        { client: 'California Berry Farms', invoice: 'INV-2025-003', po: 'PO-2025-125', amount: 28000, rate: 2.8, term: '30 days', status: 'Approved' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => fetchData(query), 30000);
    return () => clearInterval(interval);
  }, [query]);

  return (
    <div style={{ backgroundColor: '#f9fafb', padding: '25px', borderRadius: '12px', boxShadow: '0 0 8px rgba(0,0,0,0.05)' }}>
      <h2 style={{ color: '#004080', marginBottom: '15px' }}>Factoring & Trade Finance Engine</h2>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search by client, invoice #, PO ID..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            padding: '10px 15px',
            width: '300px',
            border: '1px solid #ccc',
            borderRadius: '6px',
            marginRight: '10px'
          }}
        />
        <button onClick={() => fetchData(query)} style={{
          backgroundColor: '#004080',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}>
          Search
        </button>
      </div>

      {loading ? (
        <p>Loading data...</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#004080', color: 'white' }}>
              <th style={{ padding: '8px', textAlign: 'left' }}>Client</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>Invoice #</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>PO ID</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>Amount</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>Rate %</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>Term</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {records.length > 0 ? (
              records.map((r, i) => (
                <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#eef4ff' : 'white' }}>
                  <td style={{ padding: '8px' }}>{r.client}</td>
                  <td style={{ padding: '8px' }}>{r.invoice || '-'}</td>
                  <td style={{ padding: '8px' }}>{r.po || '-'}</td>
                  <td style={{ padding: '8px' }}>${r.amount?.toLocaleString() || '0'}</td>
                  <td style={{ padding: '8px' }}>{r.rate || '-'}%</td>
                  <td style={{ padding: '8px' }}>{r.term || '-'}</td>
                  <td style={{ padding: '8px', color: r.status === 'Approved' ? 'green' : 'red' }}>{r.status}</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="7" style={{ padding: '8px', textAlign: 'center' }}>No results found.</td></tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

