import React, { useState, useEffect } from 'react';
import { Upload, Plus, Edit, Trash2, Save, X, Image as ImageIcon, FileText, Tag, MapPin, DollarSign, Phone, Globe, Star } from 'lucide-react';

export default function AdminLifestyleManager() {
  const [activeSection, setActiveSection] = useState('establishments');
  const [establishments, setEstablishments] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);

  // Load establishments from BajaLuxuryGuide data
  useEffect(() => {
    // In production, this would fetch from API/database
    // For now, we'll use placeholder
    setEstablishments([]);
  }, []);

  const sections = [
    { id: 'establishments', label: 'POI Management', icon: MapPin },
    { id: 'photos', label: 'Photo Gallery', icon: ImageIcon },
    { id: 'magazine', label: 'Magazine Articles', icon: FileText },
    { id: 'partners', label: 'Partners & Ads', icon: Star }
  ];

  const establishmentTypes = [
    'winery', 'restaurant', 'hotel', 'brewery', 'spa', 'golf', 
    'cigar-bar', 'rooftop', 'beach-club', 'nightclub', 'yacht',
    'adventure', 'gallery', 'salon', 'casino'
  ];

  // SECTION 1: POI MANAGEMENT
  const renderEstablishmentsSection = () => {
    const filteredEstablishments = establishments.filter(est => {
      const matchesSearch = est.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          est.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = filterType === 'all' || est.type === filterType;
      return matchesSearch && matchesType;
    });

    return (
      <div>
        {/* HEADER */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px',
          paddingBottom: '24px',
          borderBottom: '1px solid rgba(203,166,88,0.2)'
        }}>
          <div>
            <h2 style={{
              fontSize: '28px',
              fontWeight: '300',
              color: '#e2e8f0',
              letterSpacing: '2px',
              marginBottom: '8px'
            }}>
              POI Management
            </h2>
            <p style={{ fontSize: '13px', color: '#94a3b8', letterSpacing: '1px' }}>
              Manage establishments across Baja California
            </p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 24px',
              background: 'linear-gradient(135deg, #cba658, #b8944d)',
              border: 'none',
              color: '#0f172a',
              fontSize: '11px',
              fontWeight: '600',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          >
            <Plus size={16} /> Add New POI
          </button>
        </div>

        {/* FILTERS */}
        <div style={{
          display: 'flex',
          gap: '16px',
          marginBottom: '32px',
          flexWrap: 'wrap'
        }}>
          <input
            type="text"
            placeholder="Search establishments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              minWidth: '300px',
              padding: '12px 16px',
              background: 'rgba(30,41,59,0.5)',
              border: '1px solid rgba(148,163,184,0.2)',
              color: '#e2e8f0',
              fontSize: '13px',
              outline: 'none'
            }}
          />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            style={{
              padding: '12px 16px',
              background: 'rgba(30,41,59,0.5)',
              border: '1px solid rgba(148,163,184,0.2)',
              color: '#e2e8f0',
              fontSize: '13px',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="all">All Types</option>
            {establishmentTypes.map(type => (
              <option key={type} value={type}>{type.replace('-', ' ').toUpperCase()}</option>
            ))}
          </select>
        </div>

        {/* TABLE */}
        <div style={{
          background: 'rgba(15,23,42,0.6)',
          border: '1px solid rgba(148,163,184,0.1)',
          overflow: 'hidden'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'rgba(30,41,59,0.8)', borderBottom: '1px solid rgba(148,163,184,0.2)' }}>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '11px', color: '#cba658', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: '600' }}>ID</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '11px', color: '#cba658', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: '600' }}>Name</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '11px', color: '#cba658', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: '600' }}>Type</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '11px', color: '#cba658', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: '600' }}>Region</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '11px', color: '#cba658', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: '600' }}>Price</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '11px', color: '#cba658', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: '600' }}>Michelin</th>
                <th style={{ padding: '16px', textAlign: 'right', fontSize: '11px', color: '#cba658', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: '600' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEstablishments.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ padding: '60px', textAlign: 'center', fontSize: '13px', color: '#94a3b8' }}>
                    No establishments found. Click "Add New POI" to get started.
                  </td>
                </tr>
              ) : (
                filteredEstablishments.map(est => (
                  <tr key={est.id} style={{ borderBottom: '1px solid rgba(148,163,184,0.1)' }}>
                    <td style={{ padding: '16px', fontSize: '13px', color: '#94a3b8' }}>{est.id}</td>
                    <td style={{ padding: '16px', fontSize: '13px', color: '#e2e8f0', fontWeight: '500' }}>{est.name}</td>
                    <td style={{ padding: '16px', fontSize: '12px', color: '#94a3b8' }}>{est.type}</td>
                    <td style={{ padding: '16px', fontSize: '12px', color: '#94a3b8' }}>{est.region}</td>
                    <td style={{ padding: '16px', fontSize: '12px', color: '#94a3b8' }}>{est.price}</td>
                    <td style={{ padding: '16px', fontSize: '12px', color: est.michelin > 0 ? '#cba658' : '#94a3b8' }}>
                      {est.michelin > 0 ? '⭐'.repeat(est.michelin) : '-'}
                    </td>
                    <td style={{ padding: '16px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => setEditingItem(est)}
                          style={{
                            padding: '8px',
                            background: 'rgba(203,166,88,0.1)',
                            border: '1px solid rgba(203,166,88,0.3)',
                            color: '#cba658',
                            cursor: 'pointer',
                            transition: 'all 0.3s'
                          }}
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(est.id)}
                          style={{
                            padding: '8px',
                            background: 'rgba(248,113,113,0.1)',
                            border: '1px solid rgba(248,113,113,0.3)',
                            color: '#f87171',
                            cursor: 'pointer',
                            transition: 'all 0.3s'
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // SECTION 2: PHOTO GALLERY MANAGER
  const renderPhotosSection = () => {
    return (
      <div>
        <h2 style={{
          fontSize: '28px',
          fontWeight: '300',
          color: '#e2e8f0',
          letterSpacing: '2px',
          marginBottom: '32px'
        }}>
          Photo Gallery Manager
        </h2>
        
        <div style={{
          border: '2px dashed rgba(203,166,88,0.3)',
          padding: '80px 40px',
          textAlign: 'center',
          background: 'rgba(30,41,59,0.3)',
          marginBottom: '40px'
        }}>
          <Upload size={48} color="#cba658" style={{ margin: '0 auto 20px' }} />
          <p style={{ fontSize: '15px', color: '#e2e8f0', marginBottom: '8px', fontWeight: '500' }}>
            Drag & Drop Photos Here
          </p>
          <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '20px' }}>
            Or click to browse • JPG, PNG • Max 10MB per file
          </p>
          <button style={{
            padding: '14px 32px',
            background: 'linear-gradient(135deg, #cba658, #b8944d)',
            border: 'none',
            color: '#0f172a',
            fontSize: '11px',
            fontWeight: '600',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            cursor: 'pointer'
          }}>
            Select Files
          </button>
        </div>

        <p style={{ fontSize: '13px', color: '#94a3b8', textAlign: 'center' }}>
          Photo gallery coming soon. Upload functionality will integrate with Cloudinary/S3.
        </p>
      </div>
    );
  };

  // SECTION 3: MAGAZINE MANAGER
  const renderMagazineSection = () => {
    return (
      <div>
        <h2 style={{
          fontSize: '28px',
          fontWeight: '300',
          color: '#e2e8f0',
          letterSpacing: '2px',
          marginBottom: '32px'
        }}>
          Magazine Articles
        </h2>
        <p style={{ fontSize: '13px', color: '#94a3b8' }}>
          Magazine editor coming soon. Rich text editor for creating and managing articles.
        </p>
      </div>
    );
  };

  // SECTION 4: PARTNERS MANAGER
  const renderPartnersSection = () => {
    return (
      <div>
        <h2 style={{
          fontSize: '28px',
          fontWeight: '300',
          color: '#e2e8f0',
          letterSpacing: '2px',
          marginBottom: '32px'
        }}>
          Partners & Advertising
        </h2>
        <p style={{ fontSize: '13px', color: '#94a3b8' }}>
          Partner management coming soon. Manage scrolling ribbon partners and advertising placements.
        </p>
      </div>
    );
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this establishment?')) {
      setEstablishments(establishments.filter(est => est.id !== id));
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f172a',
      padding: '40px'
    }}>
      {/* HEADER */}
      <div style={{
        maxWidth: '1600px',
        margin: '0 auto 40px'
      }}>
        <h1 style={{
          fontSize: '42px',
          fontWeight: '200',
          color: '#e2e8f0',
          letterSpacing: '4px',
          marginBottom: '12px'
        }}>
          Lifestyle Management
        </h1>
        <p style={{
          fontSize: '14px',
          color: '#cba658',
          letterSpacing: '2px',
          textTransform: 'uppercase'
        }}>
          Baja California Magazine & Directory
        </p>
      </div>

      <div style={{
        maxWidth: '1600px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '280px 1fr',
        gap: '40px'
      }}>
        {/* SIDEBAR */}
        <div style={{
          background: 'rgba(30,41,59,0.5)',
          border: '1px solid rgba(148,163,184,0.1)',
          padding: '24px',
          height: 'fit-content'
        }}>
          <p style={{
            fontSize: '10px',
            color: '#94a3b8',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: '20px',
            fontWeight: '600'
          }}>
            Management Sections
          </p>
          {sections.map(section => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 16px',
                  background: activeSection === section.id 
                    ? 'linear-gradient(135deg, rgba(203,166,88,0.2), rgba(203,166,88,0.1))' 
                    : 'transparent',
                  border: 'none',
                  borderLeft: activeSection === section.id 
                    ? '2px solid #cba658' 
                    : '2px solid transparent',
                  color: activeSection === section.id ? '#cba658' : '#94a3b8',
                  fontSize: '13px',
                  fontWeight: activeSection === section.id ? '600' : '400',
                  letterSpacing: '1px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  marginBottom: '8px',
                  transition: 'all 0.3s'
                }}
              >
                <Icon size={18} />
                {section.label}
              </button>
            );
          })}
        </div>

        {/* MAIN CONTENT */}
        <div>
          {activeSection === 'establishments' && renderEstablishmentsSection()}
          {activeSection === 'photos' && renderPhotosSection()}
          {activeSection === 'magazine' && renderMagazineSection()}
          {activeSection === 'partners' && renderPartnersSection()}
        </div>
      </div>
    </div>
  );
}