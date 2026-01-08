import React, { useState, useEffect } from 'react';

function LifestyleTest() {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Fetching lifestyle data...');
    
    fetch('/lifestyle-data/all-businesses.json')
      .then(res => {
        console.log('Response status:', res.status);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        console.log('Loaded businesses:', data.length);
        setBusinesses(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading data:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{padding: '40px', textAlign: 'center', backgroundColor: '#fef8e7'}}>
        <h2>Loading lifestyle data...</h2>
        <p>Check browser console (F12) for details</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{padding: '40px', backgroundColor: '#fee', color: 'red'}}>
        <h2>Error Loading Data</h2>
        <p>{error}</p>
        <p>Check browser console (F12) for details</p>
        <h3>Troubleshooting:</h3>
        <ul style={{textAlign: 'left', maxWidth: '600px', margin: '0 auto'}}>
          <li>Is the file at: public/lifestyle-data/all-businesses.json?</li>
          <li>Did you restart the dev server after adding files?</li>
          <li>Open DevTools Network tab and look for the request</li>
        </ul>
      </div>
    );
  }

  return (
    <div style={{padding: '40px', backgroundColor: '#fef8e7'}}>
      <h1 style={{color: '#2c5f2d', marginBottom: '20px'}}>
        Lifestyle Data Test - SUCCESS!
      </h1>
      
      <div style={{backgroundColor: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px'}}>
        <h2>Statistics</h2>
        <p><strong>Total Businesses:</strong> {businesses.length}</p>
        <p><strong>Wineries:</strong> {businesses.filter(b => b.type === 'winery').length}</p>
        <p><strong>Restaurants:</strong> {businesses.filter(b => b.type === 'restaurant').length}</p>
        <p><strong>Breweries:</strong> {businesses.filter(b => b.type === 'brewery').length}</p>
        <p><strong>Michelin Stars:</strong> {businesses.filter(b => b.michelin > 0).length}</p>
      </div>

      <h2 style={{marginBottom: '20px'}}>First 10 Businesses:</h2>
      
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px'}}>
        {businesses.slice(0, 10).map(business => (
          <div 
            key={business.id}
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            <h3 style={{margin: '0 0 10px 0', color: '#2c5f2d'}}>
              {business.name} {business.michelin > 0 ? '⭐'.repeat(business.michelin) : ''}
            </h3>
            <p style={{color: '#666', fontSize: '14px', margin: '5px 0'}}>
              {business.category} • {business.city}
            </p>
            <p style={{margin: '10px 0'}}>{business.description}</p>
            <div style={{fontSize: '13px', color: '#666'}}>
              <p><strong>Phone:</strong> {business.phone || 'N/A'}</p>
              <p><strong>Price:</strong> {business.price} (${business.fee})</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{marginTop: '40px', padding: '20px', backgroundColor: '#d4edda', borderRadius: '8px'}}>
        <h3>Data is loading correctly!</h3>
        <p>You can now use the full LifestyleSection component in your app.</p>
      </div>
    </div>
  );
}

export default LifestyleTest;