import React, { useState } from 'react';
import DocumentUploader from '../loan/DocumentUploader';
import PropertyPhotoUploader from '../upload/PropertyPhotoUploader';

export default function FSBOListing() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Property Info
    propertyAddress: '',
    city: '',
    state: '',
    zipCode: '',
    propertyType: 'Single Family',
    bedrooms: '',
    bathrooms: '',
    squareFeet: '',
    lotSize: '',
    yearBuilt: '',
    price: '',
    
    // Owner Info
    ownerName: '',
    ownerEmail: '',
    ownerPhone: '',
    
    // Property Details
    description: '',
    features: [],
    hoa: false,
    hoaFee: '',
    taxAmount: '',
    garage: '',
    basement: false,
    pool: false,
    
    // Additional
    showingInstructions: '',
    availability: 'Available Now'
  });
  
  const [photos, setPhotos] = useState([]);
  const [documents, setDocuments] = useState({});

  const propertyFeatures = [
    'Hardwood Floors', 'Granite Countertops', 'Stainless Appliances',
    'Updated Kitchen', 'Updated Bathrooms', 'Central Air',
    'Fireplace', 'Walk-in Closets', 'Deck/Patio',
    'Fenced Yard', 'New Roof', 'Energy Efficient Windows'
  ];

  const handleFeatureToggle = (feature) => {
    if (formData.features.includes(feature)) {
      setFormData({
        ...formData,
        features: formData.features.filter(f => f !== feature)
      });
    } else {
      setFormData({
        ...formData,
        features: [...formData.features, feature]
      });
    }
  };

  const handlePhotoUpload = (files) => {
    setPhotos(files);
  };

  const handleDocumentUpload = (docType, files) => {
    setDocuments({
      ...documents,
      [docType]: files
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Save to localStorage
    const listing = {
      ...formData,
      photos,
      documents,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      status: 'active'
    };
    
    const existingListings = JSON.parse(localStorage.getItem('fsbo_listings') || '[]');
    existingListings.push(listing);
    localStorage.setItem('fsbo_listings', JSON.stringify(existingListings));
    
    alert('Your property has been listed successfully!');
    
    // Reset form
    setStep(1);
    setFormData({
      propertyAddress: '', city: '', state: '', zipCode: '',
      propertyType: 'Single Family', bedrooms: '', bathrooms: '',
      squareFeet: '', lotSize: '', yearBuilt: '', price: '',
      ownerName: '', ownerEmail: '', ownerPhone: '',
      description: '', features: [], hoa: false, hoaFee: '',
      taxAmount: '', garage: '', basement: false, pool: false,
      showingInstructions: '', availability: 'Available Now'
    });
    setPhotos([]);
    setDocuments({});
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px' }}>
      {/* Progress Steps */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
          {['Property Info', 'Owner Details', 'Photos & Docs', 'Review'].map((label, idx) => (
            <div key={idx} style={{ flex: 1, textAlign: 'center' }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: step > idx ? '#cba658' : step === idx + 1 ? '#cba658' : '#334155',
                color: '#fff',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                fontWeight: '700',
                marginBottom: '8px',
                border: '3px solid ' + (step >= idx + 1 ? '#cba658' : '#334155')
              }}>
                {step > idx ? '✓' : idx + 1}
              </div>
              <div style={{ fontSize: '14px', color: step >= idx + 1 ? '#cba658' : '#64748b', fontWeight: '600' }}>
                {label}
              </div>
            </div>
          ))}
        </div>
        <div style={{ height: '4px', background: '#334155', borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{ width: `${(step / 4) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #cba658, #b8944d)', transition: 'width 0.3s' }}></div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* STEP 1: PROPERTY INFO */}
        {step === 1 && (
          <div>
            <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#cba658', marginBottom: '32px' }}>
              Property Information
            </h2>

            <div style={{
              background: 'rgba(30, 41, 59, 0.6)',
              border: '2px solid rgba(203, 166, 88, 0.3)',
              borderRadius: '16px',
              padding: '32px',
              marginBottom: '32px'
            }}>
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#cbd5e1', marginBottom: '24px' }}>
                Location
              </h3>
              
              <div style={{ display: 'grid', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    Property Address *
                  </label>
                  <input
                    type="text"
                    value={formData.propertyAddress}
                    onChange={(e) => setFormData({ ...formData, propertyAddress: e.target.value })}
                    required
                    placeholder="123 Main Street"
                    style={{
                      width: '100%',
                      padding: '14px',
                      background: 'rgba(15, 23, 42, 0.8)',
                      border: '2px solid rgba(203, 166, 88, 0.3)',
                      borderRadius: '8px',
                      color: '#f1f5f9',
                      fontSize: '16px'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                      City *
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      required
                      style={{
                        width: '100%',
                        padding: '14px',
                        background: 'rgba(15, 23, 42, 0.8)',
                        border: '2px solid rgba(203, 166, 88, 0.3)',
                        borderRadius: '8px',
                        color: '#f1f5f9',
                        fontSize: '16px'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                      State *
                    </label>
                    <select
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      required
                      style={{
                        width: '100%',
                        padding: '14px',
                        background: 'rgba(15, 23, 42, 0.8)',
                        border: '2px solid rgba(203, 166, 88, 0.3)',
                        borderRadius: '8px',
                        color: '#f1f5f9',
                        fontSize: '16px'
                      }}
                    >
                      <option value="">Select State</option>
                      <option value="CA">California</option>
                      <option value="TX">Texas</option>
                      <option value="FL">Florida</option>
                      <option value="NY">New York</option>
                      {/* Add more states */}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      value={formData.zipCode}
                      onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                      required
                      style={{
                        width: '100%',
                        padding: '14px',
                        background: 'rgba(15, 23, 42, 0.8)',
                        border: '2px solid rgba(203, 166, 88, 0.3)',
                        borderRadius: '8px',
                        color: '#f1f5f9',
                        fontSize: '16px'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div style={{
              background: 'rgba(30, 41, 59, 0.6)',
              border: '2px solid rgba(203, 166, 88, 0.3)',
              borderRadius: '16px',
              padding: '32px',
              marginBottom: '32px'
            }}>
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#cbd5e1', marginBottom: '24px' }}>
                Property Details
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    Property Type *
                  </label>
                  <select
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '14px',
                      background: 'rgba(15, 23, 42, 0.8)',
                      border: '2px solid rgba(203, 166, 88, 0.3)',
                      borderRadius: '8px',
                      color: '#f1f5f9',
                      fontSize: '16px'
                    }}
                  >
                    <option value="Single Family">Single Family Home</option>
                    <option value="Condo">Condo</option>
                    <option value="Townhouse">Townhouse</option>
                    <option value="Multi-Family">Multi-Family</option>
                    <option value="Land">Land</option>
                    <option value="Mobile Home">Mobile Home</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    Asking Price *
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                    placeholder="500000"
                    style={{
                      width: '100%',
                      padding: '14px',
                      background: 'rgba(15, 23, 42, 0.8)',
                      border: '2px solid rgba(203, 166, 88, 0.3)',
                      borderRadius: '8px',
                      color: '#f1f5f9',
                      fontSize: '16px'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    Bedrooms *
                  </label>
                  <input
                    type="number"
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '14px',
                      background: 'rgba(15, 23, 42, 0.8)',
                      border: '2px solid rgba(203, 166, 88, 0.3)',
                      borderRadius: '8px',
                      color: '#f1f5f9',
                      fontSize: '16px'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    Bathrooms *
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={formData.bathrooms}
                    onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '14px',
                      background: 'rgba(15, 23, 42, 0.8)',
                      border: '2px solid rgba(203, 166, 88, 0.3)',
                      borderRadius: '8px',
                      color: '#f1f5f9',
                      fontSize: '16px'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    Square Feet *
                  </label>
                  <input
                    type="number"
                    value={formData.squareFeet}
                    onChange={(e) => setFormData({ ...formData, squareFeet: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '14px',
                      background: 'rgba(15, 23, 42, 0.8)',
                      border: '2px solid rgba(203, 166, 88, 0.3)',
                      borderRadius: '8px',
                      color: '#f1f5f9',
                      fontSize: '16px'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    Lot Size (acres)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.lotSize}
                    onChange={(e) => setFormData({ ...formData, lotSize: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '14px',
                      background: 'rgba(15, 23, 42, 0.8)',
                      border: '2px solid rgba(203, 166, 88, 0.3)',
                      borderRadius: '8px',
                      color: '#f1f5f9',
                      fontSize: '16px'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    Year Built *
                  </label>
                  <input
                    type="number"
                    value={formData.yearBuilt}
                    onChange={(e) => setFormData({ ...formData, yearBuilt: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '14px',
                      background: 'rgba(15, 23, 42, 0.8)',
                      border: '2px solid rgba(203, 166, 88, 0.3)',
                      borderRadius: '8px',
                      color: '#f1f5f9',
                      fontSize: '16px'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    Garage Spaces
                  </label>
                  <input
                    type="number"
                    value={formData.garage}
                    onChange={(e) => setFormData({ ...formData, garage: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '14px',
                      background: 'rgba(15, 23, 42, 0.8)',
                      border: '2px solid rgba(203, 166, 88, 0.3)',
                      borderRadius: '8px',
                      color: '#f1f5f9',
                      fontSize: '16px'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginTop: '24px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '12px' }}>
                  Property Features
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                  {propertyFeatures.map((feature, idx) => (
                    <label key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={formData.features.includes(feature)}
                        onChange={() => handleFeatureToggle(feature)}
                        style={{ width: '20px', height: '20px' }}
                      />
                      <span style={{ fontSize: '14px', color: '#cbd5e1' }}>{feature}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '24px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={formData.basement}
                    onChange={(e) => setFormData({ ...formData, basement: e.target.checked })}
                    style={{ width: '24px', height: '24px' }}
                  />
                  <span style={{ fontSize: '16px', fontWeight: '600', color: '#cbd5e1' }}>Has Basement</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={formData.pool}
                    onChange={(e) => setFormData({ ...formData, pool: e.target.checked })}
                    style={{ width: '24px', height: '24px' }}
                  />
                  <span style={{ fontSize: '16px', fontWeight: '600', color: '#cbd5e1' }}>Has Pool</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={formData.hoa}
                    onChange={(e) => setFormData({ ...formData, hoa: e.target.checked })}
                    style={{ width: '24px', height: '24px' }}
                  />
                  <span style={{ fontSize: '16px', fontWeight: '600', color: '#cbd5e1' }}>HOA</span>
                </label>
              </div>

              {formData.hoa && (
                <div style={{ marginTop: '20px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    HOA Monthly Fee
                  </label>
                  <input
                    type="number"
                    value={formData.hoaFee}
                    onChange={(e) => setFormData({ ...formData, hoaFee: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '14px',
                      background: 'rgba(15, 23, 42, 0.8)',
                      border: '2px solid rgba(203, 166, 88, 0.3)',
                      borderRadius: '8px',
                      color: '#f1f5f9',
                      fontSize: '16px'
                    }}
                  />
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setStep(2)}
              style={{
                width: '100%',
                padding: '18px',
                background: 'linear-gradient(135deg, #cba658, #b8944d)',
                color: '#0f172a',
                border: 'none',
                borderRadius: '12px',
                fontSize: '18px',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 8px 20px rgba(203, 166, 88, 0.5)'
              }}
            >
              Continue to Owner Details
            </button>
          </div>
        )}

        {/* STEP 2: OWNER DETAILS */}
        {step === 2 && (
          <div>
            <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#cba658', marginBottom: '32px' }}>
              Owner Information
            </h2>

            <div style={{
              background: 'rgba(30, 41, 59, 0.6)',
              border: '2px solid rgba(203, 166, 88, 0.3)',
              borderRadius: '16px',
              padding: '32px',
              marginBottom: '32px'
            }}>
              <div style={{ display: 'grid', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.ownerName}
                    onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '14px',
                      background: 'rgba(15, 23, 42, 0.8)',
                      border: '2px solid rgba(203, 166, 88, 0.3)',
                      borderRadius: '8px',
                      color: '#f1f5f9',
                      fontSize: '16px'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.ownerEmail}
                      onChange={(e) => setFormData({ ...formData, ownerEmail: e.target.value })}
                      required
                      style={{
                        width: '100%',
                        padding: '14px',
                        background: 'rgba(15, 23, 42, 0.8)',
                        border: '2px solid rgba(203, 166, 88, 0.3)',
                        borderRadius: '8px',
                        color: '#f1f5f9',
                        fontSize: '16px'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                      Phone *
                    </label>
                    <input
                      type="tel"
                      value={formData.ownerPhone}
                      onChange={(e) => setFormData({ ...formData, ownerPhone: e.target.value })}
                      required
                      style={{
                        width: '100%',
                        padding: '14px',
                        background: 'rgba(15, 23, 42, 0.8)',
                        border: '2px solid rgba(203, 166, 88, 0.3)',
                        borderRadius: '8px',
                        color: '#f1f5f9',
                        fontSize: '16px'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    Property Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows="6"
                    placeholder="Describe your property, neighborhood, recent upgrades, etc."
                    style={{
                      width: '100%',
                      padding: '14px',
                      background: 'rgba(15, 23, 42, 0.8)',
                      border: '2px solid rgba(203, 166, 88, 0.3)',
                      borderRadius: '8px',
                      color: '#f1f5f9',
                      fontSize: '16px',
                      resize: 'vertical'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                    Showing Instructions
                  </label>
                  <textarea
                    value={formData.showingInstructions}
                    onChange={(e) => setFormData({ ...formData, showingInstructions: e.target.value })}
                    rows="3"
                    placeholder="How should interested buyers schedule a showing?"
                    style={{
                      width: '100%',
                      padding: '14px',
                      background: 'rgba(15, 23, 42, 0.8)',
                      border: '2px solid rgba(203, 166, 88, 0.3)',
                      borderRadius: '8px',
                      color: '#f1f5f9',
                      fontSize: '16px',
                      resize: 'vertical'
                    }}
                  />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <button
                type="button"
                onClick={() => setStep(1)}
                style={{
                  flex: 1,
                  padding: '18px',
                  background: 'rgba(100, 116, 139, 0.3)',
                  color: '#cbd5e1',
                  border: '2px solid #64748b',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                style={{
                  flex: 2,
                  padding: '18px',
                  background: 'linear-gradient(135deg, #cba658, #b8944d)',
                  color: '#0f172a',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '18px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  boxShadow: '0 8px 20px rgba(203, 166, 88, 0.5)'
                }}
              >
                Continue to Photos & Documents
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: PHOTOS & DOCUMENTS */}
        {step === 3 && (
          <div>
            <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#cba658', marginBottom: '32px' }}>
              Photos & Documents
            </h2>

            <div style={{
              background: 'rgba(30, 41, 59, 0.6)',
              border: '2px solid rgba(203, 166, 88, 0.3)',
              borderRadius: '16px',
              padding: '32px',
              marginBottom: '32px'
            }}>
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#cbd5e1', marginBottom: '16px' }}>
                Property Photos (Minimum 5 required)
              </h3>
              <PropertyPhotoUploader onUpload={handlePhotoUpload} existingFiles={photos} />
            </div>

            <div style={{
              background: 'rgba(30, 41, 59, 0.6)',
              border: '2px solid rgba(203, 166, 88, 0.3)',
              borderRadius: '16px',
              padding: '32px',
              marginBottom: '32px'
            }}>
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#cbd5e1', marginBottom: '24px' }}>
                Supporting Documents
              </h3>

              <div style={{ marginBottom: '32px' }}>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#cbd5e1', marginBottom: '12px' }}>
                  Recent Property Tax Bill
                </div>
                <DocumentUploader documentType="tax_bill" onUpload={handleDocumentUpload} existingFiles={documents.tax_bill || []} />
              </div>

              <div style={{ marginBottom: '32px' }}>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#cbd5e1', marginBottom: '12px' }}>
                  Title/Deed (Optional)
                </div>
                <DocumentUploader documentType="title_deed" onUpload={handleDocumentUpload} existingFiles={documents.title_deed || []} />
              </div>

              <div style={{ marginBottom: '32px' }}>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#cbd5e1', marginBottom: '12px' }}>
                  Inspection Reports (Optional)
                </div>
                <DocumentUploader documentType="inspection" onUpload={handleDocumentUpload} existingFiles={documents.inspection || []} />
              </div>

              <div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#cbd5e1', marginBottom: '12px' }}>
                  HOA Documents (If applicable)
                </div>
                <DocumentUploader documentType="hoa_docs" onUpload={handleDocumentUpload} existingFiles={documents.hoa_docs || []} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <button
                type="button"
                onClick={() => setStep(2)}
                style={{
                  flex: 1,
                  padding: '18px',
                  background: 'rgba(100, 116, 139, 0.3)',
                  color: '#cbd5e1',
                  border: '2px solid #64748b',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(4)}
                disabled={photos.length < 5}
                style={{
                  flex: 2,
                  padding: '18px',
                  background: photos.length >= 5 ? 'linear-gradient(135deg, #cba658, #b8944d)' : '#334155',
                  color: photos.length >= 5 ? '#0f172a' : '#64748b',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '18px',
                  fontWeight: '700',
                  cursor: photos.length >= 5 ? 'pointer' : 'not-allowed',
                  boxShadow: photos.length >= 5 ? '0 8px 20px rgba(203, 166, 88, 0.5)' : 'none'
                }}
              >
                {photos.length < 5 ? `Upload ${5 - photos.length} More Photos` : 'Review Listing'}
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: REVIEW */}
        {step === 4 && (
          <div>
            <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#cba658', marginBottom: '32px' }}>
              Review Your Listing
            </h2>

            <div style={{
              background: 'rgba(30, 41, 59, 0.6)',
              border: '2px solid rgba(203, 166, 88, 0.3)',
              borderRadius: '16px',
              padding: '32px',
              marginBottom: '32px'
            }}>
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#cba658', marginBottom: '16px' }}>
                  ${parseInt(formData.price).toLocaleString()}
                </h3>
                <div style={{ fontSize: '18px', color: '#cbd5e1', marginBottom: '8px' }}>
                  {formData.propertyAddress}
                </div>
                <div style={{ fontSize: '16px', color: '#94a3b8' }}>
                  {formData.city}, {formData.state} {formData.zipCode}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
                <div style={{ padding: '16px', background: 'rgba(203, 166, 88, 0.1)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '28px', fontWeight: '700', color: '#cba658' }}>{formData.bedrooms}</div>
                  <div style={{ fontSize: '14px', color: '#94a3b8' }}>Bedrooms</div>
                </div>
                <div style={{ padding: '16px', background: 'rgba(203, 166, 88, 0.1)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '28px', fontWeight: '700', color: '#cba658' }}>{formData.bathrooms}</div>
                  <div style={{ fontSize: '14px', color: '#94a3b8' }}>Bathrooms</div>
                </div>
                <div style={{ padding: '16px', background: 'rgba(203, 166, 88, 0.1)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '28px', fontWeight: '700', color: '#cba658' }}>{parseInt(formData.squareFeet).toLocaleString()}</div>
                  <div style={{ fontSize: '14px', color: '#94a3b8' }}>Sq Ft</div>
                </div>
                <div style={{ padding: '16px', background: 'rgba(203, 166, 88, 0.1)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '28px', fontWeight: '700', color: '#cba658' }}>{formData.yearBuilt}</div>
                  <div style={{ fontSize: '14px', color: '#94a3b8' }}>Year Built</div>
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '18px', fontWeight: '700', color: '#cbd5e1', marginBottom: '12px' }}>
                  Description
                </h4>
                <p style={{ fontSize: '15px', color: '#94a3b8', lineHeight: '1.8' }}>
                  {formData.description}
                </p>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '18px', fontWeight: '700', color: '#cbd5e1', marginBottom: '12px' }}>
                  Photos ({photos.length})
                </h4>
                <div style={{ fontSize: '14px', color: '#94a3b8' }}>
                  ✓ {photos.length} property photos uploaded
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '18px', fontWeight: '700', color: '#cbd5e1', marginBottom: '12px' }}>
                  Contact
                </h4>
                <div style={{ fontSize: '15px', color: '#94a3b8' }}>
                  {formData.ownerName}<br />
                  {formData.ownerEmail}<br />
                  {formData.ownerPhone}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <button
                type="button"
                onClick={() => setStep(3)}
                style={{
                  flex: 1,
                  padding: '18px',
                  background: 'rgba(100, 116, 139, 0.3)',
                  color: '#cbd5e1',
                  border: '2px solid #64748b',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Back
              </button>
              <button
                type="submit"
                style={{
                  flex: 2,
                  padding: '18px',
                  background: 'linear-gradient(135deg, #cba658, #b8944d)',
                  color: '#0f172a',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '20px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  boxShadow: '0 8px 20px rgba(203, 166, 88, 0.5)'
                }}
              >
                Publish Listing
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}