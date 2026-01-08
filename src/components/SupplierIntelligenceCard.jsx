<<<<<<< HEAD
import React, { useState } from 'react';
=======
ï»¿import React, { useState } from 'react';
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

const SupplierIntelligenceCard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  
  const [expandedSections, setExpandedSections] = useState({
    contacts: true,
    logistics: false,
    documents: false,
    relatedSuppliers: false
  });
  
  const [uploadModal, setUploadModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [qrModal, setQrModal] = useState(null);

  // Sample database of suppliers
  const supplierDatabase = [
    {
      id: 1,
      name: "ABC Agro Exports Ltd",
      location: "Punjab, India",
      riskScore: 42,
      established: 1998,
      certifications: ["FDA", "USDA Organic", "ISO 9001"],
      products: ["Basmati Rice", "Wheat", "Pulses"],
      annualRevenue: "$12M",
      exportVolume: "5,000 MT/year",
      contacts: {
        commercial: [
          {
            name: "Rajesh Kumar",
            title: "Head of Sales",
            email: "rajesh.kumar@abcagro.in",
            phone: "+91-98765-43210",
            whatsapp: true,
            responseRate: "94%",
            avgResponseTime: "4 hours",
            preferredContact: true,
            authorizedFor: ["Purchase Orders (PO)", "Price Inquiries", "Sample Requests"]
          }
        ],
        financial: [
          {
            name: "Sunita Verma",
            title: "Finance Director",
            email: "finance@abcagro.in",
            phone: "+91-98765-43213",
            confidential: true,
            responseRate: "78%",
            avgResponseTime: "24 hours",
            authorizedFor: ["Payment Terms", "Factoring Proposals"]
          }
        ]
      }
    },
    {
      id: 2,
      name: "XYZ Foods International",
      location: "Gujarat, India",
      riskScore: 38,
      established: 2005,
      certifications: ["FDA", "ISO 22000"],
      products: ["Organic Grains", "Spices", "Tea"],
      annualRevenue: "$8M",
      exportVolume: "3,500 MT/year",
      contacts: {
        commercial: [
          {
            name: "Sarah Johnson",
            title: "Sales Director",
            email: "sjohnson@xyzfoods.com",
            phone: "+91-98765-11111",
            responseRate: "92%",
            avgResponseTime: "3 hours",
            preferredContact: true,
            authorizedFor: ["Purchase Orders", "Quotes"]
          }
        ],
        financial: [
          {
            name: "Amit Shah",
            title: "CFO",
            email: "amit@xyzfoods.com",
            phone: "+91-98765-11112",
            responseRate: "85%",
            avgResponseTime: "12 hours",
            authorizedFor: ["Payment Terms", "Credit"]
          }
        ]
      }
    },
    {
      id: 3,
      name: "Premium Agro Ltd",
      location: "Maharashtra, India",
      riskScore: 35,
      established: 2010,
      certifications: ["FDA", "USDA", "Organic"],
      products: ["Rice", "Pulses", "Wheat", "Millets"],
      annualRevenue: "$15M",
      exportVolume: "6,200 MT/year",
      contacts: {
        commercial: [
          {
            name: "Michael Chen",
            title: "Export Manager",
            email: "mchen@premiumagro.in",
            phone: "+91-98765-22222",
            responseRate: "88%",
            avgResponseTime: "5 hours",
            preferredContact: true,
            authorizedFor: ["All commercial inquiries"]
          }
        ],
        financial: [
          {
            name: "Priya Desai",
            title: "Finance Head",
            email: "priya@premiumagro.in",
            phone: "+91-98765-22223",
            responseRate: "90%",
            avgResponseTime: "8 hours",
            authorizedFor: ["Financial matters"]
          }
        ]
      }
    }
  ];

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      alert('Please enter a company name to search');
      return;
    }

    setIsSearching(true);
    
    // Simulate API search delay
    setTimeout(() => {
      const results = supplierDatabase.filter(supplier => 
        supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        supplier.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        supplier.products.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      
      setSearchResults(results);
      setIsSearching(false);
      
      if (results.length === 0) {
        alert(`No suppliers found matching "${searchQuery}". Try: ABC, XYZ, or Premium`);
      }
    }, 800);
  };

  const handleSelectSupplier = (supplier) => {
    setSelectedSupplier(supplier);
    setSearchResults([]);
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getRiskColor = (score) => {
    if (score < 30) return { color: '#059669', bg: '#d1fae5' };
    if (score < 50) return { color: '#d97706', bg: '#fef3c7' };
    return { color: '#dc2626', bg: '#fee2e2' };
  };

  const handleSendEmail = (contact, docType) => {
    setSelectedContact({ contact, docType });
  };

  const handleGenerateQR = (item) => {
    setQrModal(item);
  };

  if (!selectedSupplier && searchResults.length === 0) {
    return (
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px' }}>
        <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '40px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#1f2937', marginBottom: '16px' }}>
<<<<<<< HEAD
             Supplier Intelligence Search
             Supplier Intelligence Search
=======
             Supplier Intelligence Search
             Supplier Intelligence Search
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
          </h1>
          <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '32px' }}>
            Search for verified suppliers and view complete intelligence profiles
          </p>

          {/* SEARCH BAR */}
          <div style={{ maxWidth: '700px', margin: '0 auto', marginBottom: '32px' }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <input
                type="text"
                placeholder="Enter company name, location, or product (e.g., ABC, Rice, India)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                style={{
                  flex: 1,
                  padding: '16px 24px',
                  fontSize: '16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  outline: 'none'
                }}
              />
              <button
                onClick={handleSearch}
                disabled={isSearching}
                style={{
                  padding: '16px 32px',
                  background: isSearching ? '#9ca3af' : '#2563eb',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: isSearching ? 'not-allowed' : 'pointer',
                  transition: 'background 0.2s'
                }}
              >
<<<<<<< HEAD
                {isSearching ? ' Searching...' : ' Search'}
                {isSearching ? ' Searching...' : ' Search'}
=======
                {isSearching ? ' Searching...' : ' Search'}
                {isSearching ? ' Searching...' : ' Search'}
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
              </button>
            </div>
          </div>

          {/* QUICK SEARCH SUGGESTIONS */}
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px' }}>Try searching for:</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {['ABC Agro', 'XYZ Foods', 'Premium Agro', 'Rice', 'Organic', 'India'].map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setSearchQuery(term);
                    setTimeout(() => handleSearch(), 100);
                  }}
                  style={{
                    padding: '8px 16px',
                    background: '#eff6ff',
                    color: '#2563eb',
                    border: '1px solid #bfdbfe',
                    borderRadius: '20px',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* FEATURES */}
          <div style={{ marginTop: '48px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', textAlign: 'left' }}>
            <div style={{ padding: '24px', background: '#f9fafb', borderRadius: '8px' }}>
<<<<<<< HEAD
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>
=======
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Smart Contacts</h3>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>Get direct contact info for the right person - sales, finance, or compliance</p>
            </div>
            <div style={{ padding: '24px', background: '#f9fafb', borderRadius: '8px' }}>
<<<<<<< HEAD
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>
=======
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Logistics Costs</h3>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>See complete shipping costs to USA and Latin America</p>
            </div>
            <div style={{ padding: '24px', background: '#f9fafb', borderRadius: '8px' }}>
<<<<<<< HEAD
              <div style={{ fontSize: '32px', marginBottom: '12px' }}> </div>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}> </div>
=======
              <div style={{ fontSize: '32px', marginBottom: '12px' }}> </div>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}> </div>
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Risk Scores</h3>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>Verified suppliers with compliance certificates and ratings</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // SEARCH RESULTS VIEW
  if (searchResults.length > 0) {
    return (
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px' }}>
        <div style={{ marginBottom: '24px' }}>
          <button
            onClick={() => setSearchResults([])}
            style={{
              padding: '8px 16px',
              background: '#e5e7eb',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
<<<<<<< HEAD
              Back to Search
              Back to Search
=======
              Back to Search
              Back to Search
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
          </button>
        </div>

        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
          Found {searchResults.length} supplier{searchResults.length !== 1 ? 's' : ''} matching "{searchQuery}"
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {searchResults.map((supplier) => {
            const riskColors = getRiskColor(supplier.riskScore);
            return (
              <div
                key={supplier.id}
                onClick={() => handleSelectSupplier(supplier)}
                style={{
                  background: '#fff',
                  padding: '24px',
                  borderRadius: '12px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  cursor: 'pointer',
                  border: '2px solid transparent',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#2563eb'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>
                      {supplier.name}
                    </h3>
                    <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: '#6b7280', marginBottom: '12px' }}>
<<<<<<< HEAD
                      <span> {supplier.location}</span>
                      <span> Est. {supplier.established}</span>
                      <span> {supplier.annualRevenue}</span>
                      <span> {supplier.location}</span>
                      <span> Est. {supplier.established}</span>
                      <span> {supplier.annualRevenue}</span>
=======
                      <span> {supplier.location}</span>
                      <span> Est. {supplier.established}</span>
                      <span> {supplier.annualRevenue}</span>
                      <span> {supplier.location}</span>
                      <span> Est. {supplier.established}</span>
                      <span> {supplier.annualRevenue}</span>
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
                    </div>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {supplier.certifications.map((cert, idx) => (
                        <span key={idx} style={{ padding: '4px 12px', background: '#d1fae5', color: '#065f46', borderRadius: '12px', fontSize: '12px' }}>
<<<<<<< HEAD
                           {cert}
                           {cert}
=======
                           {cert}
                           {cert}
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
                        </span>
                      ))}
                    </div>
                  </div>
                  <div style={{ padding: '12px 24px', borderRadius: '8px', fontWeight: 'bold', background: riskColors.bg, color: riskColors.color }}>
                    Risk: {supplier.riskScore}
                  </div>
                </div>
                <div style={{ marginTop: '16px', padding: '12px', background: '#f9fafb', borderRadius: '6px' }}>
                  <strong style={{ fontSize: '13px' }}>Products:</strong> {supplier.products.join(', ')}
                </div>
                <div style={{ marginTop: '12px', textAlign: 'right' }}>
                  <button style={{ padding: '8px 16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: 'bold' }}>
<<<<<<< HEAD
                    View Full Intelligence  
                    View Full Intelligence  
=======
                    View Full Intelligence  
                    View Full Intelligence  
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // FULL SUPPLIER DETAIL VIEW
  const supplier = selectedSupplier;
  const riskColors = getRiskColor(supplier.riskScore);

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px' }}>
      <div style={{ marginBottom: '16px' }}>
        <button
          onClick={() => setSelectedSupplier(null)}
          style={{
            padding: '8px 16px',
            background: '#e5e7eb',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
<<<<<<< HEAD
            Back to Search
            Back to Search
=======
            Back to Search
            Back to Search
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
        </button>
      </div>

      <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        
        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)', color: '#fff', padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <div>
              <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '12px' }}>{supplier.name}</h1>
              <div style={{ display: 'flex', gap: '24px', fontSize: '14px', opacity: 0.9 }}>
<<<<<<< HEAD
                <span> {supplier.location}</span>
                <span> Est. {supplier.established}</span>
                <span> {supplier.exportVolume}</span>
                <span> {supplier.location}</span>
                <span> Est. {supplier.established}</span>
                <span> {supplier.exportVolume}</span>
=======
                <span> {supplier.location}</span>
                <span> Est. {supplier.established}</span>
                <span> {supplier.exportVolume}</span>
                <span> {supplier.location}</span>
                <span> Est. {supplier.established}</span>
                <span> {supplier.exportVolume}</span>
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
              </div>
            </div>
            <div style={{ 
              padding: '12px 24px', 
              borderRadius: '8px', 
              fontWeight: 'bold', 
              background: riskColors.bg,
              color: riskColors.color
            }}>
              Risk: {supplier.riskScore}
            </div>
          </div>
          
          <div style={{ marginTop: '20px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {supplier.certifications.map((cert, idx) => (
              <span key={idx} style={{ 
                padding: '6px 16px', 
                background: 'rgba(255,255,255,0.2)', 
                borderRadius: '20px', 
                fontSize: '13px'
              }}>
<<<<<<< HEAD
                 {cert}
                 {cert}
=======
                 {cert}
                 {cert}
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
              </span>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', padding: '24px', background: '#f9fafb' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#2563eb' }}>{supplier.annualRevenue}</div>
            <div style={{ fontSize: '13px', color: '#6b7280' }}>Annual Revenue</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#059669' }}>{supplier.products.length}</div>
            <div style={{ fontSize: '13px', color: '#6b7280' }}>Products</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#7c3aed' }}>
              {Object.values(supplier.contacts).flat().length}
            </div>
            <div style={{ fontSize: '13px', color: '#6b7280' }}>Key Contacts</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#dc2626' }}>2</div>
            <div style={{ fontSize: '13px', color: '#6b7280' }}>Documents</div>
          </div>
        </div>

        {/* Contacts Section */}
        <div style={{ padding: '24px', borderTop: '1px solid #e5e7eb' }}>
          <button
            onClick={() => toggleSection('contacts')}
            style={{ 
              width: '100%', 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              background: 'none',
              border: 'none',
              fontSize: '20px',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginBottom: '16px'
            }}
          >
<<<<<<< HEAD
            <span> Smart Contact Directory</span>
            <span>{expandedSections.contacts ? ' : '
            <span> Smart Contact Directory</span>
            <span>{expandedSections.contacts ? ' : '
=======
            <span> Smart Contact Directory</span>
            <span>{expandedSections.contacts ? ' : '
            <span> Smart Contact Directory</span>
            <span>{expandedSections.contacts ? ' : '
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
          </button>

          {expandedSections.contacts && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Commercial */}
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#374151', marginBottom: '12px' }}>
<<<<<<< HEAD
                   PURCHASING & ORDERS
                   PURCHASING & ORDERS
=======
                   PURCHASING & ORDERS
                   PURCHASING & ORDERS
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
                </h3>
                {supplier.contacts.commercial.map((contact, idx) => (
                  <div key={idx} style={{ 
                    background: 'linear-gradient(135deg, #d1fae5 0%, #fff 100%)', 
                    padding: '16px', 
                    borderRadius: '8px', 
                    marginBottom: '12px',
                    borderLeft: '4px solid #059669'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <div>
                        <div style={{ fontWeight: 'bold', fontSize: '16px' }}>
<<<<<<< HEAD
                          {contact.name} {contact.preferredContact && <span style={{ fontSize: '11px', background: '#059669', color: '#fff', padding: '2px 8px', borderRadius: '10px' }}> PREFERRED</span>}
                          {contact.name} {contact.preferredContact && <span style={{ fontSize: '11px', background: '#059669', color: '#fff', padding: '2px 8px', borderRadius: '10px' }}> PREFERRED</span>}
=======
                          {contact.name} {contact.preferredContact && <span style={{ fontSize: '11px', background: '#059669', color: '#fff', padding: '2px 8px', borderRadius: '10px' }}> PREFERRED</span>}
                          {contact.name} {contact.preferredContact && <span style={{ fontSize: '11px', background: '#059669', color: '#fff', padding: '2px 8px', borderRadius: '10px' }}> PREFERRED</span>}
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
                        </div>
                        <div style={{ fontSize: '13px', color: '#6b7280' }}>{contact.title}</div>
                      </div>
                      <div style={{ textAlign: 'right', fontSize: '12px' }}>
                        <div style={{ color: '#059669', fontWeight: 'bold' }}>{contact.responseRate}</div>
                        <div style={{ color: '#6b7280' }}>{contact.avgResponseTime}</div>
                      </div>
                    </div>
                    <div style={{ fontSize: '13px', marginBottom: '8px' }}>
<<<<<<< HEAD
                       {contact.email} |  {contact.phone}
                    </div>
                    <div style={{ background: '#fff', padding: '12px', borderRadius: '6px', marginBottom: '8px', fontSize: '12px' }}>
                      <strong> Authorized for:</strong> {contact.authorizedFor.join(', ')}
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => handleSendEmail(contact, 'PO')} style={{ padding: '6px 12px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '12px', cursor: 'pointer' }}>
                         Send PO
                      </button>
                      <button onClick={() => handleGenerateQR(contact)} style={{ padding: '6px 12px', background: '#7c3aed', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '12px', cursor: 'pointer' }}>
                         QR Code
                       {contact.email} |  {contact.phone}
                    </div>
                    <div style={{ background: '#fff', padding: '12px', borderRadius: '6px', marginBottom: '8px', fontSize: '12px' }}>
                      <strong> Authorized for:</strong> {contact.authorizedFor.join(', ')}
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => handleSendEmail(contact, 'PO')} style={{ padding: '6px 12px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '12px', cursor: 'pointer' }}>
                         Send PO
                      </button>
                      <button onClick={() => handleGenerateQR(contact)} style={{ padding: '6px 12px', background: '#7c3aed', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '12px', cursor: 'pointer' }}>
                         QR Code
=======
                       {contact.email} |  {contact.phone}
                    </div>
                    <div style={{ background: '#fff', padding: '12px', borderRadius: '6px', marginBottom: '8px', fontSize: '12px' }}>
                      <strong> Authorized for:</strong> {contact.authorizedFor.join(', ')}
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => handleSendEmail(contact, 'PO')} style={{ padding: '6px 12px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '12px', cursor: 'pointer' }}>
                         Send PO
                      </button>
                      <button onClick={() => handleGenerateQR(contact)} style={{ padding: '6px 12px', background: '#7c3aed', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '12px', cursor: 'pointer' }}>
                         QR Code
                       {contact.email} |  {contact.phone}
                    </div>
                    <div style={{ background: '#fff', padding: '12px', borderRadius: '6px', marginBottom: '8px', fontSize: '12px' }}>
                      <strong> Authorized for:</strong> {contact.authorizedFor.join(', ')}
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => handleSendEmail(contact, 'PO')} style={{ padding: '6px 12px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '12px', cursor: 'pointer' }}>
                         Send PO
                      </button>
                      <button onClick={() => handleGenerateQR(contact)} style={{ padding: '6px 12px', background: '#7c3aed', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '12px', cursor: 'pointer' }}>
                         QR Code
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Financial */}
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#374151', marginBottom: '12px' }}>
<<<<<<< HEAD
                   FINANCE & PAYMENTS
                   FINANCE & PAYMENTS
=======
                   FINANCE & PAYMENTS
                   FINANCE & PAYMENTS
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
                </h3>
                {supplier.contacts.financial.map((contact, idx) => (
                  <div key={idx} style={{ background: '#fef3c7', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #d97706' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '4px' }}>
<<<<<<< HEAD
                      {contact.name} {contact.confidential && <span style={{ fontSize: '11px', background: '#dc2626', color: '#fff', padding: '2px 8px', borderRadius: '10px' }}> CONFIDENTIAL</span>}
                    </div>
                    <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '8px' }}>{contact.title}</div>
                    <div style={{ fontSize: '13px', marginBottom: '8px' }}>
                       {contact.email} |  {contact.phone}
                    </div>
                    <button onClick={() => handleSendEmail(contact, 'Factoring')} style={{ padding: '6px 12px', background: '#d97706', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '12px', cursor: 'pointer' }}>
                       Propose Factoring
                      {contact.name} {contact.confidential && <span style={{ fontSize: '11px', background: '#dc2626', color: '#fff', padding: '2px 8px', borderRadius: '10px' }}> CONFIDENTIAL</span>}
                    </div>
                    <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '8px' }}>{contact.title}</div>
                    <div style={{ fontSize: '13px', marginBottom: '8px' }}>
                       {contact.email} |  {contact.phone}
                    </div>
                    <button onClick={() => handleSendEmail(contact, 'Factoring')} style={{ padding: '6px 12px', background: '#d97706', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '12px', cursor: 'pointer' }}>
                       Propose Factoring
=======
                      {contact.name} {contact.confidential && <span style={{ fontSize: '11px', background: '#dc2626', color: '#fff', padding: '2px 8px', borderRadius: '10px' }}> CONFIDENTIAL</span>}
                    </div>
                    <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '8px' }}>{contact.title}</div>
                    <div style={{ fontSize: '13px', marginBottom: '8px' }}>
                       {contact.email} |  {contact.phone}
                    </div>
                    <button onClick={() => handleSendEmail(contact, 'Factoring')} style={{ padding: '6px 12px', background: '#d97706', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '12px', cursor: 'pointer' }}>
                       Propose Factoring
                      {contact.name} {contact.confidential && <span style={{ fontSize: '11px', background: '#dc2626', color: '#fff', padding: '2px 8px', borderRadius: '10px' }}> CONFIDENTIAL</span>}
                    </div>
                    <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '8px' }}>{contact.title}</div>
                    <div style={{ fontSize: '13px', marginBottom: '8px' }}>
                       {contact.email} |  {contact.phone}
                    </div>
                    <button onClick={() => handleSendEmail(contact, 'Factoring')} style={{ padding: '6px 12px', background: '#d97706', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '12px', cursor: 'pointer' }}>
                       Propose Factoring
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {selectedContact && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', maxWidth: '500px', width: '90%' }}>
            <h2 style={{ marginBottom: '16px' }}>Send Email</h2>
            <p style={{ marginBottom: '16px' }}>To: {selectedContact.contact.email}</p>
            <button onClick={() => setSelectedContact(null)} style={{ padding: '8px 16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
              Close
            </button>
          </div>
        </div>
      )}

      {qrModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', textAlign: 'center', maxWidth: '400px' }}>
<<<<<<< HEAD
            <h2 style={{ marginBottom: '16px' }}> QR Code</h2>
            <h2 style={{ marginBottom: '16px' }}> QR Code</h2>
=======
            <h2 style={{ marginBottom: '16px' }}> QR Code</h2>
            <h2 style={{ marginBottom: '16px' }}> QR Code</h2>
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
            <div style={{ width: '200px', height: '200px', background: '#1f2937', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
              QR Code
            </div>
            <button onClick={() => setQrModal(null)} style={{ padding: '8px 16px', background: '#7c3aed', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

<<<<<<< HEAD
export default SupplierIntelligenceCard;
=======
export default SupplierIntelligenceCard;
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

