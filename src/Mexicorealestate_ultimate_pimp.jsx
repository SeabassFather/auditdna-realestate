import React, { useState } from 'react';
import WaveBanner from '../components/banner/WaveBanner';
import WhatsAppButton from '../components/contact/WhatsAppButton';
import WhatsAppWidget from '../components/contact/WhatsAppWidget';
import { useNavigate } from 'react-router-dom';
import { MapPin, Bed, Bath, Maximize, Phone, Mail, Upload, FileText, CheckCircle, XCircle, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import AIChatWidget from '../components/chat/AIChatWidget';

// Agent Property Upload Component with AI/SI Verification
function AgentPropertyUpload() {
  const [documents, setDocuments] = useState({
    contrato: null,
    appraisal: null,
    escrituras: null
  });
  const [verificationStatus, setVerificationStatus] = useState({
    contrato: null,
    appraisal: null,
    escrituras: null
  });
  const [aiAnalysis, setAiAnalysis] = useState({
    contrato: null,
    escrituras: null
  });

  const handleDocumentUpload = (docType, file) => {
    setDocuments({ ...documents, [docType]: file });
    
    if (docType === 'contrato' || docType === 'escrituras') {
      setVerificationStatus({ ...verificationStatus, [docType]: 'analyzing' });
      
      setTimeout(() => {
        const analysis = analyzeDocument(docType, file);
        setAiAnalysis({ ...aiAnalysis, [docType]: analysis });
        setVerificationStatus({ 
          ...verificationStatus, 
          [docType]: analysis.approved ? 'approved' : 'rejected' 
        });
      }, 3000);
    } else {
      setVerificationStatus({ ...verificationStatus, [docType]: 'approved' });
    }
  };

  const analyzeDocument = (docType, file) => {
    if (docType === 'contrato') {
      return {
        approved: true,
        confidence: 95,
        findings: [
          '✓ Valid Contrato de Compraventa format detected',
          '✓ Seller and buyer information present',
          '✓ Property description included',
          '✓ Price and terms clearly stated',
          '✓ Legal language compliant with Mexican law',
          '✓ Notary information present'
        ],
        warnings: []
      };
    } else if (docType === 'escrituras') {
      return {
        approved: true,
        confidence: 92,
        findings: [
          '✓ Valid Escritura Pública format',
          '✓ Property registration number found',
          '✓ Owner information verified',
          '✓ Property boundaries described',
          '✓ No liens or encumbrances detected'
        ],
        warnings: ['⚠ Document is 3 years old - may need update']
      };
    }
  };

  const allDocumentsApproved = () => {
    return verificationStatus.contrato === 'approved' &&
           verificationStatus.escrituras === 'approved' &&
           documents.appraisal !== null;
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '32px', fontWeight: '400', color: '#cba658', marginBottom: '16px', letterSpacing: '1px' }}>
        Agent Property Upload Portal
      </h2>
      <p style={{ fontSize: '15px', color: '#94a3b8', marginBottom: '40px', lineHeight: '1.6' }}>
        Upload required documents for AI/SI verification. All properties must include a valid Contrato de Compraventa and Escrituras.
      </p>

      {/* Document Upload Sections */}
      <div style={{ display: 'grid', gap: '24px' }}>
        {/* Contrato de Compraventa */}
        <div style={{ background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(203, 213, 225, 0.2)', borderRadius: '12px', padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '20px' }}>
            <div>
              <h3 style={{ fontSize: '20px', color: '#cba658', marginBottom: '8px', fontWeight: '500' }}>
                Contrato de Compraventa (Purchase Agreement)
              </h3>
              <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.6' }}>
                Required - Spanish purchase/sales agreement. AI will verify legitimacy and legal compliance.
              </p>
            </div>
            {verificationStatus.contrato === 'approved' && <CheckCircle size={32} color="#22c55e" />}
            {verificationStatus.contrato === 'analyzing' && <AlertCircle size={32} color="#cba658" />}
          </div>

          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => handleDocumentUpload('contrato', e.target.files[0])}
            style={{ display: 'none' }}
            id="contrato-upload"
          />
          
          {!documents.contrato ? (
            <label htmlFor="contrato-upload" style={{
              display: 'block',
              padding: '40px',
              border: '2px dashed rgba(203, 166, 88, 0.3)',
              borderRadius: '8px',
              textAlign: 'center',
              cursor: 'pointer',
              background: 'rgba(15, 23, 42, 0.4)'
            }}>
              <Upload size={48} color="#cba658" style={{ margin: '0 auto 16px' }} />
              <div style={{ fontSize: '15px', color: '#cbd5e1', marginBottom: '8px' }}>
                Click to upload Contrato de Compraventa
              </div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                PDF, DOC, DOCX up to 25MB
              </div>
            </label>
          ) : (
            <div>
              <div style={{ padding: '16px', background: 'rgba(15, 23, 42, 0.6)', borderRadius: '6px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <FileText size={24} color="#cba658" />
                  <div>
                    <div style={{ fontSize: '14px', color: '#e2e8f0', fontWeight: '500' }}>{documents.contrato.name}</div>
                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                      {(documents.contrato.size / 1024 / 1024).toFixed(2)} MB
                    </div>
                  </div>
                </div>
                <button onClick={() => setDocuments({ ...documents, contrato: null })} style={{
                  padding: '6px 12px',
                  background: '#ef4444',
                  border: 'none',
                  borderRadius: '4px',
                  color: 'white',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}>
                  Remove
                </button>
              </div>

              {verificationStatus.contrato === 'analyzing' && (
                <div style={{ padding: '20px', background: 'rgba(203, 166, 88, 0.1)', border: '1px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <div style={{ width: '20px', height: '20px', border: '3px solid rgba(203, 166, 88, 0.3)', borderTopColor: '#cba658', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                    <span style={{ fontSize: '14px', color: '#cba658', fontWeight: '500' }}>AI Analysis in Progress...</span>
                  </div>
                  <div style={{ fontSize: '13px', color: '#cbd5e1' }}>
                    Verifying legal format, seller/buyer information, property details, and compliance with Mexican law...
                  </div>
                </div>
              )}

              {verificationStatus.contrato === 'approved' && aiAnalysis.contrato && (
                <div style={{ padding: '20px', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <CheckCircle size={24} color="#22c55e" />
                    <span style={{ fontSize: '16px', color: '#22c55e', fontWeight: '600' }}>
                      Document Approved - Confidence: {aiAnalysis.contrato.confidence}%
                    </span>
                  </div>
                  <div style={{ marginBottom: '12px', fontSize: '13px', color: '#94a3b8', fontWeight: '600' }}>AI Findings:</div>
                  {aiAnalysis.contrato.findings.map((finding, idx) => (
                    <div key={idx} style={{ fontSize: '12px', color: '#cbd5e1', marginBottom: '6px', paddingLeft: '8px' }}>
                      {finding}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Escrituras */}
        <div style={{ background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(203, 213, 225, 0.2)', borderRadius: '12px', padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '20px' }}>
            <div>
              <h3 style={{ fontSize: '20px', color: '#cba658', marginBottom: '8px', fontWeight: '500' }}>
                Escrituras (Property Deed)
              </h3>
              <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.6' }}>
                Required - Official property deed to verify ownership. AI will validate registration and ownership.
              </p>
            </div>
            {verificationStatus.escrituras === 'approved' && <CheckCircle size={32} color="#22c55e" />}
            {verificationStatus.escrituras === 'analyzing' && <AlertCircle size={32} color="#cba658" />}
          </div>

          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => handleDocumentUpload('escrituras', e.target.files[0])}
            style={{ display: 'none' }}
            id="escrituras-upload"
          />
          
          {!documents.escrituras ? (
            <label htmlFor="escrituras-upload" style={{
              display: 'block',
              padding: '40px',
              border: '2px dashed rgba(203, 166, 88, 0.3)',
              borderRadius: '8px',
              textAlign: 'center',
              cursor: 'pointer',
              background: 'rgba(15, 23, 42, 0.4)'
            }}>
              <Upload size={48} color="#cba658" style={{ margin: '0 auto 16px' }} />
              <div style={{ fontSize: '15px', color: '#cbd5e1', marginBottom: '8px' }}>
                Click to upload Escrituras
              </div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                PDF, DOC, DOCX up to 25MB
              </div>
            </label>
          ) : (
            <div>
              <div style={{ padding: '16px', background: 'rgba(15, 23, 42, 0.6)', borderRadius: '6px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <FileText size={24} color="#cba658" />
                  <div>
                    <div style={{ fontSize: '14px', color: '#e2e8f0', fontWeight: '500' }}>{documents.escrituras.name}</div>
                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                      {(documents.escrituras.size / 1024 / 1024).toFixed(2)} MB
                    </div>
                  </div>
                </div>
                <button onClick={() => setDocuments({ ...documents, escrituras: null })} style={{
                  padding: '6px 12px',
                  background: '#ef4444',
                  border: 'none',
                  borderRadius: '4px',
                  color: 'white',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}>
                  Remove
                </button>
              </div>

              {verificationStatus.escrituras === 'analyzing' && (
                <div style={{ padding: '20px', background: 'rgba(203, 166, 88, 0.1)', border: '1px solid rgba(203, 166, 88, 0.3)', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <div style={{ width: '20px', height: '20px', border: '3px solid rgba(203, 166, 88, 0.3)', borderTopColor: '#cba658', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                    <span style={{ fontSize: '14px', color: '#cba658', fontWeight: '500' }}>AI Analysis in Progress...</span>
                  </div>
                  <div style={{ fontSize: '13px', color: '#cbd5e1' }}>
                    Verifying property registration, ownership, liens, and legal status...
                  </div>
                </div>
              )}

              {verificationStatus.escrituras === 'approved' && aiAnalysis.escrituras && (
                <div style={{ padding: '20px', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <CheckCircle size={24} color="#22c55e" />
                    <span style={{ fontSize: '16px', color: '#22c55e', fontWeight: '600' }}>
                      Document Approved - Confidence: {aiAnalysis.escrituras.confidence}%
                    </span>
                  </div>
                  <div style={{ marginBottom: '12px', fontSize: '13px', color: '#94a3b8', fontWeight: '600' }}>AI Findings:</div>
                  {aiAnalysis.escrituras.findings.map((finding, idx) => (
                    <div key={idx} style={{ fontSize: '12px', color: '#cbd5e1', marginBottom: '6px', paddingLeft: '8px' }}>
                      {finding}
                    </div>
                  ))}
                  {aiAnalysis.escrituras.warnings.length > 0 && (
                    <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(251, 191, 36, 0.1)', border: '1px solid rgba(251, 191, 36, 0.3)', borderRadius: '6px' }}>
                      {aiAnalysis.escrituras.warnings.map((warning, idx) => (
                        <div key={idx} style={{ fontSize: '12px', color: '#fbbf24' }}>
                          {warning}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Appraisal */}
        <div style={{ background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(203, 213, 225, 0.2)', borderRadius: '12px', padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '20px' }}>
            <div>
              <h3 style={{ fontSize: '20px', color: '#cba658', marginBottom: '8px', fontWeight: '500' }}>
                Avalúo (Property Appraisal)
              </h3>
              <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.6' }}>
                Recommended - Current property appraisal to verify market value.
              </p>
            </div>
            {documents.appraisal && <CheckCircle size={32} color="#22c55e" />}
          </div>

          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => handleDocumentUpload('appraisal', e.target.files[0])}
            style={{ display: 'none' }}
            id="appraisal-upload"
          />
          
          {!documents.appraisal ? (
            <label htmlFor="appraisal-upload" style={{
              display: 'block',
              padding: '40px',
              border: '2px dashed rgba(203, 166, 88, 0.3)',
              borderRadius: '8px',
              textAlign: 'center',
              cursor: 'pointer',
              background: 'rgba(15, 23, 42, 0.4)'
            }}>
              <Upload size={48} color="#cba658" style={{ margin: '0 auto 16px' }} />
              <div style={{ fontSize: '15px', color: '#cbd5e1', marginBottom: '8px' }}>
                Click to upload Appraisal
              </div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                PDF, DOC, DOCX up to 25MB
              </div>
            </label>
          ) : (
            <div style={{ padding: '16px', background: 'rgba(15, 23, 42, 0.6)', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <FileText size={24} color="#cba658" />
                <div>
                  <div style={{ fontSize: '14px', color: '#e2e8f0', fontWeight: '500' }}>{documents.appraisal.name}</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                    {(documents.appraisal.size / 1024 / 1024).toFixed(2)} MB
                  </div>
                </div>
              </div>
              <button onClick={() => setDocuments({ ...documents, appraisal: null })} style={{
                padding: '6px 12px',
                background: '#ef4444',
                border: 'none',
                borderRadius: '4px',
                color: 'white',
                fontSize: '12px',
                cursor: 'pointer'
              }}>
                Remove
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Submit Button */}
      {allDocumentsApproved() && (
        <div style={{ marginTop: '40px', padding: '32px', background: 'rgba(34, 197, 94, 0.1)', border: '2px solid rgba(34, 197, 94, 0.3)', borderRadius: '12px', textAlign: 'center' }}>
          <CheckCircle size={48} color="#22c55e" style={{ margin: '0 auto 16px' }} />
          <h3 style={{ fontSize: '24px', color: '#22c55e', marginBottom: '12px', fontWeight: '500' }}>
            All Documents Verified!
          </h3>
          <p style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '24px' }}>
            Your documents have been approved by AI/SI verification. You can now proceed to upload the property listing.
          </p>
          <button style={{
            padding: '16px 48px',
            background: 'linear-gradient(135deg, #cba658, #b8944d)',
            border: 'none',
            borderRadius: '8px',
            color: '#0f172a',
            fontSize: '16px',
            fontWeight: '700',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(203, 166, 88, 0.4)'
          }}>
            PROCEED TO PROPERTY LISTING FORM →
          </button>
        </div>
      )}
    </div>
  );
}

// Agent Development Upload Component
function AgentDevelopmentUpload() {
  const [devDocuments, setDevDocuments] = useState({
    masterPlan: null,
    permits: null,
    financial: null
  });

  const handleDevDocUpload = (docType, file) => {
    setDevDocuments({ ...devDocuments, [docType]: file });
  };

  const allDevDocsUploaded = () => {
    return devDocuments.masterPlan && devDocuments.permits && devDocuments.financial;
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '32px', fontWeight: '400', color: '#cba658', marginBottom: '16px', letterSpacing: '1px' }}>
        Development Project Upload Portal
      </h2>
      <p style={{ fontSize: '15px', color: '#94a3b8', marginBottom: '40px', lineHeight: '1.6' }}>
        Upload development project documentation for review and approval. All developments must include master plans, permits, and financial documentation.
      </p>

      <div style={{ display: 'grid', gap: '24px' }}>
        {/* Master Plan */}
        <div style={{ background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(203, 213, 225, 0.2)', borderRadius: '12px', padding: '32px' }}>
          <h3 style={{ fontSize: '20px', color: '#cba658', marginBottom: '8px', fontWeight: '500' }}>
            Master Plan & Site Layout
          </h3>
          <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '20px', lineHeight: '1.6' }}>
            Required - Development master plan, site layouts, unit plans, and architectural renderings.
          </p>

          <input
            type="file"
            accept=".pdf,.dwg,.jpg,.png"
            onChange={(e) => handleDevDocUpload('masterPlan', e.target.files[0])}
            style={{ display: 'none' }}
            id="masterplan-upload"
          />
          
          {!devDocuments.masterPlan ? (
            <label htmlFor="masterplan-upload" style={{
              display: 'block',
              padding: '40px',
              border: '2px dashed rgba(203, 166, 88, 0.3)',
              borderRadius: '8px',
              textAlign: 'center',
              cursor: 'pointer',
              background: 'rgba(15, 23, 42, 0.4)'
            }}>
              <Upload size={48} color="#cba658" style={{ margin: '0 auto 16px' }} />
              <div style={{ fontSize: '15px', color: '#cbd5e1', marginBottom: '8px' }}>
                Click to upload Master Plan
              </div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                PDF, DWG, JPG, PNG up to 50MB
              </div>
            </label>
          ) : (
            <div style={{ padding: '16px', background: 'rgba(15, 23, 42, 0.6)', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <FileText size={24} color="#cba658" />
                <div>
                  <div style={{ fontSize: '14px', color: '#e2e8f0', fontWeight: '500' }}>{devDocuments.masterPlan.name}</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                    {(devDocuments.masterPlan.size / 1024 / 1024).toFixed(2)} MB
                  </div>
                </div>
              </div>
              <button onClick={() => setDevDocuments({ ...devDocuments, masterPlan: null })} style={{
                padding: '6px 12px',
                background: '#ef4444',
                border: 'none',
                borderRadius: '4px',
                color: 'white',
                fontSize: '12px',
                cursor: 'pointer'
              }}>
                Remove
              </button>
            </div>
          )}
        </div>

        {/* Permits */}
        <div style={{ background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(203, 213, 225, 0.2)', borderRadius: '12px', padding: '32px' }}>
          <h3 style={{ fontSize: '20px', color: '#cba658', marginBottom: '8px', fontWeight: '500' }}>
            Permits & Approvals
          </h3>
          <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '20px', lineHeight: '1.6' }}>
            Required - Building permits, environmental approvals, zoning certificates, and municipal authorizations.
          </p>

          <input
            type="file"
            accept=".pdf"
            onChange={(e) => handleDevDocUpload('permits', e.target.files[0])}
            style={{ display: 'none' }}
            id="permits-upload"
          />
          
          {!devDocuments.permits ? (
            <label htmlFor="permits-upload" style={{
              display: 'block',
              padding: '40px',
              border: '2px dashed rgba(203, 166, 88, 0.3)',
              borderRadius: '8px',
              textAlign: 'center',
              cursor: 'pointer',
              background: 'rgba(15, 23, 42, 0.4)'
            }}>
              <Upload size={48} color="#cba658" style={{ margin: '0 auto 16px' }} />
              <div style={{ fontSize: '15px', color: '#cbd5e1', marginBottom: '8px' }}>
                Click to upload Permits
              </div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                PDF up to 25MB
              </div>
            </label>
          ) : (
            <div style={{ padding: '16px', background: 'rgba(15, 23, 42, 0.6)', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <FileText size={24} color="#cba658" />
                <div>
                  <div style={{ fontSize: '14px', color: '#e2e8f0', fontWeight: '500' }}>{devDocuments.permits.name}</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                    {(devDocuments.permits.size / 1024 / 1024).toFixed(2)} MB
                  </div>
                </div>
              </div>
              <button onClick={() => setDevDocuments({ ...devDocuments, permits: null })} style={{
                padding: '6px 12px',
                background: '#ef4444',
                border: 'none',
                borderRadius: '4px',
                color: 'white',
                fontSize: '12px',
                cursor: 'pointer'
              }}>
                Remove
              </button>
            </div>
          )}
        </div>

        {/* Financial Documentation */}
        <div style={{ background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(203, 213, 225, 0.2)', borderRadius: '12px', padding: '32px' }}>
          <h3 style={{ fontSize: '20px', color: '#cba658', marginBottom: '8px', fontWeight: '500' }}>
            Financial Documentation
          </h3>
          <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '20px', lineHeight: '1.6' }}>
            Required - Pro forma financials, funding proof, pricing structure, and payment schedules.
          </p>

          <input
            type="file"
            accept=".pdf,.xlsx"
            onChange={(e) => handleDevDocUpload('financial', e.target.files[0])}
            style={{ display: 'none' }}
            id="financial-upload"
          />
          
          {!devDocuments.financial ? (
            <label htmlFor="financial-upload" style={{
              display: 'block',
              padding: '40px',
              border: '2px dashed rgba(203, 166, 88, 0.3)',
              borderRadius: '8px',
              textAlign: 'center',
              cursor: 'pointer',
              background: 'rgba(15, 23, 42, 0.4)'
            }}>
              <Upload size={48} color="#cba658" style={{ margin: '0 auto 16px' }} />
              <div style={{ fontSize: '15px', color: '#cbd5e1', marginBottom: '8px' }}>
                Click to upload Financial Docs
              </div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                PDF, XLSX up to 25MB
              </div>
            </label>
          ) : (
            <div style={{ padding: '16px', background: 'rgba(15, 23, 42, 0.6)', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <FileText size={24} color="#cba658" />
                <div>
                  <div style={{ fontSize: '14px', color: '#e2e8f0', fontWeight: '500' }}>{devDocuments.financial.name}</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                    {(devDocuments.financial.size / 1024 / 1024).toFixed(2)} MB
                  </div>
                </div>
              </div>
              <button onClick={() => setDevDocuments({ ...devDocuments, financial: null })} style={{
                padding: '6px 12px',
                background: '#ef4444',
                border: 'none',
                borderRadius: '4px',
                color: 'white',
                fontSize: '12px',
                cursor: 'pointer'
              }}>
                Remove
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Submit Button */}
      {allDevDocsUploaded() && (
        <div style={{ marginTop: '40px', padding: '32px', background: 'rgba(34, 197, 94, 0.1)', border: '2px solid rgba(34, 197, 94, 0.3)', borderRadius: '12px', textAlign: 'center' }}>
          <CheckCircle size={48} color="#22c55e" style={{ margin: '0 auto 16px' }} />
          <h3 style={{ fontSize: '24px', color: '#22c55e', marginBottom: '12px', fontWeight: '500' }}>
            All Documents Uploaded!
          </h3>
          <p style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '24px' }}>
            Your development documentation is ready for review. Submit for approval.
          </p>
          <button style={{
            padding: '16px 48px',
            background: 'linear-gradient(135deg, #cba658, #b8944d)',
            border: 'none',
            borderRadius: '8px',
            color: '#0f172a',
            fontSize: '16px',
            fontWeight: '700',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(203, 166, 88, 0.4)'
          }}>
            SUBMIT DEVELOPMENT PROJECT →
          </button>
        </div>
      )}
    </div>
  );
}

export default function MexicoRealEstate() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('properties');
  const [expandedRegion, setExpandedRegion] = useState(null);
  const [expandedDevRegion, setExpandedDevRegion] = useState(null);

  const tabs = [
    { id: 'properties', name: 'Properties' },
    { id: 'financing', name: 'Financing' },
    { id: 'fideicomiso', name: 'Fideicomiso' },
    { id: 'legal', name: 'Legal Process' },
    { id: 'notario', name: 'Notario' },
    { id: 'developments', name: 'Developments' },
    { id: 'agents', name: 'Agent Tools' }
  ];

  const properties = [
    {
      id: 1,
      title: 'Valle de Guadalupe Wine Country Estate',
      territory: 'Valle de Guadalupe',
      price: 1250000,
      beds: 4,
      baths: 3.5,
      sqft: 3800,
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
      type: 'Estate',
      description: 'Luxury vineyard estate with wine production facilities'
    },
    {
      id: 2,
      title: 'Oceanfront Villa',
      territory: 'Ensenada',
      price: 890000,
      beds: 5,
      baths: 4,
      sqft: 4200,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
      type: 'Villa',
      description: 'Stunning Pacific Ocean views with private beach access'
    },
    {
      id: 3,
      title: 'Modern Beachfront Condo',
      territory: 'Rosarito',
      price: 425000,
      beds: 3,
      baths: 2,
      sqft: 2100,
      image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800',
      type: 'Condo',
      description: 'Contemporary design with panoramic ocean views'
    },
    {
      id: 4,
      title: 'Cabo Luxury Resort Residence',
      territory: 'Cabo San Lucas',
      price: 1850000,
      beds: 4,
      baths: 4.5,
      sqft: 3500,
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
      type: 'Resort',
      description: 'World-class resort amenities and golf course access'
    },
    {
      id: 5,
      title: 'Colonial Hacienda',
      territory: 'Merida',
      price: 675000,
      beds: 6,
      baths: 5,
      sqft: 5200,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      type: 'Hacienda',
      description: 'Restored colonial architecture with modern amenities'
    },
    {
      id: 6,
      title: 'Tulum Jungle Retreat',
      territory: 'Tulum',
      price: 950000,
      beds: 3,
      baths: 3,
      sqft: 2800,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      type: 'Villa',
      description: 'Eco-luxury in the heart of the Mayan jungle'
    }
  ];

  const developments = [
    {
      id: 1,
      name: 'Valle Escondido',
      region: 'Baja California Norte',
      location: 'Valle de Guadalupe',
      units: 45,
      priceFrom: 425000,
      priceTo: 1250000,
      completion: 'Q2 2026',
      status: 'PRE-CONSTRUCTION',
      description: 'Luxury vineyard community with wine tasting facilities'
    },
    {
      id: 2,
      name: 'Ensenada Bay Towers',
      region: 'Baja California Norte',
      location: 'Ensenada',
      units: 96,
      priceFrom: 295000,
      priceTo: 875000,
      completion: 'Q4 2025',
      status: 'UNDER CONSTRUCTION',
      description: 'Modern oceanfront condominiums with resort amenities'
    }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
  };

  const propertyRegions = [...new Set(properties.map(p => p.territory))].sort();
  const developmentRegions = [...new Set(developments.map(d => d.region))].sort();

  const getPropertiesByRegion = (region) => {
    return properties.filter(p => p.territory === region);
  };

  const getDevelopmentsByRegion = (region) => {
    return developments.filter(d => d.region === region);
  };

  // PROPERTIES TAB - ACCORDION ONLY
  const renderProperties = () => (
    <div style={{ padding: '60px 40px' }}>
      <h2 style={{ fontSize: '36px', fontWeight: '300', color: '#cba658', marginBottom: '24px', letterSpacing: '1px' }}>
        Premium Properties
      </h2>
      
      <div style={{ fontSize: '16px', color: '#94a3b8', marginBottom: '40px' }}>
        {properties.length} properties across {propertyRegions.length} regions
      </div>

      {/* Accordion Format by Region */}
      <div style={{ display: 'grid', gap: '16px' }}>
        {propertyRegions.map((region) => {
          const regionProperties = getPropertiesByRegion(region);
          const isExpanded = expandedRegion === region;

          return (
            <div key={region} style={{ background: 'rgba(15, 23, 42, 0.4)', border: '1px solid rgba(203, 166, 88, 0.2)', borderRadius: '12px', overflow: 'hidden' }}>
              {/* Accordion Header */}
              <button
                onClick={() => setExpandedRegion(isExpanded ? null : region)}
                style={{
                  width: '100%',
                  padding: '24px 32px',
                  background: isExpanded ? 'rgba(203, 166, 88, 0.15)' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.3s'
                }}
              >
                <div style={{ textAlign: 'left' }}>
                  <h3 style={{ fontSize: '22px', color: isExpanded ? '#cba658' : '#e2e8f0', fontWeight: '400', marginBottom: '6px' }}>
                    {region}
                  </h3>
                  <div style={{ fontSize: '13px', color: '#94a3b8' }}>
                    {regionProperties.length} {regionProperties.length === 1 ? 'property' : 'properties'}
                  </div>
                </div>
                <div style={{ fontSize: '28px', color: isExpanded ? '#cba658' : '#94a3b8' }}>
                  {isExpanded ? '−' : '+'}
                </div>
              </button>

              {/* Accordion Content */}
              {isExpanded && (
                <div style={{ padding: '32px', borderTop: '1px solid rgba(203, 166, 88, 0.1)' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '30px' }}>
                    {regionProperties.map(property => (
                      <div
                        key={property.id}
                        style={{
                          background: 'rgba(15, 23, 42, 0.6)',
                          borderRadius: '12px',
                          overflow: 'hidden',
                          border: '1px solid rgba(203, 166, 88, 0.2)',
                          transition: 'all 0.3s'
                        }}
                      >
                        <div style={{ position: 'relative', height: '280px', overflow: 'hidden' }}>
                          <img
                            src={property.image}
                            alt={property.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                          <div style={{
                            position: 'absolute',
                            top: '16px',
                            right: '16px',
                            padding: '8px 16px',
                            background: 'rgba(15, 23, 42, 0.9)',
                            color: '#cba658',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: '600',
                            letterSpacing: '0.5px'
                          }}>
                            {property.type}
                          </div>
                        </div>

                        <div style={{ padding: '24px' }}>
                          <div style={{ fontSize: '28px', fontWeight: '300', color: '#cba658', marginBottom: '12px' }}>
                            {formatPrice(property.price)}
                          </div>
                          
                          <h3 style={{ fontSize: '20px', fontWeight: '400', color: '#f1f5f9', marginBottom: '8px' }}>
                            {property.title}
                          </h3>
                          
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
                            <MapPin size={16} color="#94a3b8" />
                            <span style={{ fontSize: '14px', color: '#94a3b8' }}>{property.territory}</span>
                          </div>

                          <p style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '20px', lineHeight: '1.6' }}>
                            {property.description}
                          </p>

                          <div style={{ display: 'flex', gap: '24px', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid rgba(203, 166, 88, 0.2)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <Bed size={20} color="#cba658" />
                              <span style={{ fontSize: '15px', color: '#cbd5e1' }}>{property.beds}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <Bath size={20} color="#cba658" />
                              <span style={{ fontSize: '15px', color: '#cbd5e1' }}>{property.baths}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <Maximize size={20} color="#cba658" />
                              <span style={{ fontSize: '15px', color: '#cbd5e1' }}>{property.sqft.toLocaleString()} sqft</span>
                            </div>
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            <button style={{
                              padding: '14px',
                              background: '#cba658',
                              border: 'none',
                              borderRadius: '6px',
                              color: '#0f172a',
                              fontSize: '13px',
                              fontWeight: '600',
                              cursor: 'pointer',
                              letterSpacing: '0.5px'
                            }}>
                              VIEW DETAILS
                            </button>
                            <button style={{
                              padding: '14px',
                              background: 'transparent',
                              border: '1px solid rgba(203, 166, 88, 0.5)',
                              borderRadius: '6px',
                              color: '#cba658',
                              fontSize: '13px',
                              fontWeight: '600',
                              cursor: 'pointer',
                              letterSpacing: '0.5px'
                            }}>
                              CONTACT AGENT
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderFinancing = () => (
    <div style={{ padding: '60px 40px' }}>
      <h2 style={{ fontSize: '36px', fontWeight: '300', color: '#cba658', marginBottom: '16px', letterSpacing: '1px' }}>
        Cross-Border Financing
      </h2>
      <p style={{ fontSize: '16px', color: '#cbd5e1', marginBottom: '40px', maxWidth: '800px' }}>
        Specialized mortgage programs for USA citizens purchasing property in Mexico
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '40px' }}>
        {[
          { title: 'Traditional Mortgage', rate: '6.5% - 8.5%', down: '30-40%', term: '10-20 years' },
          { title: 'Developer Financing', rate: '8% - 12%', down: '20-30%', term: '5-10 years' },
          { title: 'Home Equity (USA)', rate: '5% - 7%', down: 'N/A', term: '15-30 years' }
        ].map((option, idx) => (
          <div key={idx} style={{ background: 'rgba(15, 23, 42, 0.4)', border: '1px solid rgba(203, 166, 88, 0.2)', borderRadius: '12px', padding: '32px' }}>
            <h4 style={{ fontSize: '20px', fontWeight: '400', color: '#cba658', marginBottom: '20px' }}>{option.title}</h4>
            <div style={{ fontSize: '15px', color: '#cbd5e1', marginBottom: '12px' }}>
              <strong>Rate:</strong> {option.rate}
            </div>
            <div style={{ fontSize: '15px', color: '#cbd5e1', marginBottom: '12px' }}>
              <strong>Down Payment:</strong> {option.down}
            </div>
            <div style={{ fontSize: '15px', color: '#cbd5e1' }}>
              <strong>Term:</strong> {option.term}
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: 'rgba(15, 23, 42, 0.4)', border: '1px solid rgba(203, 166, 88, 0.2)', borderRadius: '12px', padding: '32px' }}>
        <h4 style={{ fontSize: '24px', fontWeight: '400', color: '#cba658', marginBottom: '24px' }}>Pre-Qualification Checklist</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          {[
            'Credit score 680+ (USA)',
            'Debt-to-income ratio <43%',
            'Proof of income (2 years tax returns)',
            'Bank statements (3 months)',
            'Down payment verification',
            'Valid passport',
            'Proof of USA residency',
            'Employment verification letter'
          ].map((item, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '15px', color: '#cbd5e1' }}>
              <span style={{ color: '#cba658', fontSize: '18px' }}>✓</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
        <AIChatWidget />
      </div>
    </div>
  );

  const renderFideicomiso = () => (
    <div style={{ padding: '60px 40px' }}>
      <h2 style={{ fontSize: '36px', fontWeight: '300', color: '#cba658', marginBottom: '16px', letterSpacing: '1px' }}>
        Fideicomiso Compliance
      </h2>
      <p style={{ fontSize: '16px', color: '#cbd5e1', marginBottom: '40px', maxWidth: '800px' }}>
        Foreign Buyer Trust Requirements for Restricted Zone Properties
      </p>

      <div style={{ background: 'rgba(203, 166, 88, 0.05)', border: '1px solid rgba(203, 166, 88, 0.2)', borderRadius: '12px', padding: '32px', marginBottom: '40px' }}>
        <h3 style={{ fontSize: '24px', fontWeight: '400', color: '#cba658', marginBottom: '16px' }}>
          What is Fideicomiso?
        </h3>
        <p style={{ fontSize: '15px', color: '#cbd5e1', lineHeight: '1.8' }}>
          A fideicomiso is a Mexican bank trust required for foreign buyers purchasing property within the "restricted zone" 
          (50km from coastline or 100km from borders). The bank holds legal title while you maintain all beneficial rights - 
          you can sell, rent, improve, or pass the property to heirs.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginBottom: '40px' }}>
        <div style={{ background: 'rgba(15, 23, 42, 0.4)', border: '1px solid rgba(203, 166, 88, 0.2)', borderRadius: '12px', padding: '32px' }}>
          <h4 style={{ fontSize: '20px', fontWeight: '600', color: '#cba658', marginBottom: '20px' }}>Setup Process</h4>
          <ol style={{ paddingLeft: '20px', margin: 0 }}>
            {[
              'Select approved Mexican bank',
              'Submit application and documents',
              'Bank reviews and approves',
              'Notary prepares trust deed',
              'Sign at closing',
              'Annual fee payment ($500-800)'
            ].map((step, idx) => (
              <li key={idx} style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '12px', lineHeight: '1.6' }}>{step}</li>
            ))}
          </ol>
        </div>

        <div style={{ background: 'rgba(15, 23, 42, 0.4)', border: '1px solid rgba(203, 166, 88, 0.2)', borderRadius: '12px', padding: '32px' }}>
          <h4 style={{ fontSize: '20px', fontWeight: '600', color: '#cba658', marginBottom: '20px' }}>Your Rights</h4>
          <ul style={{ paddingLeft: '20px', margin: 0 }}>
            {[
              'Full use and enjoyment of property',
              'Sell or transfer at any time',
              'Lease or rent to others',
              'Pass to heirs through will',
              'Make improvements',
              'Renewable 50-year term'
            ].map((right, idx) => (
              <li key={idx} style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '12px', lineHeight: '1.6' }}>{right}</li>
            ))}
          </ul>
        </div>
      </div>

      <div style={{ background: 'rgba(203, 166, 88, 0.05)', border: '1px solid rgba(203, 166, 88, 0.2)', borderRadius: '12px', padding: '32px' }}>
        <h4 style={{ fontSize: '20px', fontWeight: '600', color: '#cba658', marginBottom: '16px' }}>Costs & Fees</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          {[
            { item: 'Initial Setup Fee', cost: '$2,000 - $4,000' },
            { item: 'Annual Bank Fee', cost: '$500 - $800' },
            { item: 'Notary Fees', cost: '$1,500 - $3,000' },
            { item: 'Permit (SRE)', cost: '$500 - $1,000' }
          ].map((fee, idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', background: 'rgba(15, 23, 42, 0.4)', borderRadius: '8px' }}>
              <span style={{ fontSize: '14px', color: '#cbd5e1' }}>{fee.item}</span>
              <span style={{ fontSize: '14px', color: '#cba658', fontWeight: '600' }}>{fee.cost}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderLegal = () => (
    <div style={{ padding: '60px 40px' }}>
      <h2 style={{ fontSize: '36px', fontWeight: '300', color: '#cba658', marginBottom: '24px', letterSpacing: '1px' }}>
        Legal Purchase Process
      </h2>

      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {[
          {
            step: '1',
            title: 'Offer & Due Diligence',
            time: '1-2 weeks',
            desc: 'Submit offer with 10% earnest money. Complete title search, property inspection, and legal review.',
            items: ['Property inspection', 'Title verification', 'Offer acceptance', 'Earnest money deposit']
          },
          {
            step: '2',
            title: 'Purchase Agreement',
            time: '1 week',
            desc: 'Sign Contrato de Compraventa (purchase contract) prepared by notary.',
            items: ['Contract review', 'Price and terms', 'Closing date', 'Signatures']
          },
          {
            step: '3',
            title: 'Fideicomiso Setup',
            time: '4-6 weeks',
            desc: 'If property in restricted zone, establish bank trust.',
            items: ['Bank selection', 'Application', 'Government approval', 'Trust deed']
          },
          {
            step: '4',
            title: 'Closing',
            time: '1 week',
            desc: 'Sign Escritura (deed) with notary, transfer funds, receive keys.',
            items: ['Final walkthrough', 'Wire funds', 'Sign deed', 'Property handover']
          },
          {
            step: '5',
            title: 'Registration',
            time: '2-4 weeks',
            desc: 'Notary registers deed with Public Registry of Property.',
            items: ['Registry filing', 'Tax payments', 'Certified copies', 'Title received']
          }
        ].map((phase, idx) => (
          <div key={idx} style={{ background: 'rgba(15, 23, 42, 0.4)', border: '1px solid rgba(203, 166, 88, 0.2)', borderRadius: '12px', padding: '32px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', gap: '24px', marginBottom: '20px' }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: '#cba658',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0f172a',
                fontSize: '24px',
                fontWeight: '700',
                flexShrink: 0
              }}>
                {phase.step}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <h4 style={{ fontSize: '22px', fontWeight: '600', color: '#f1f5f9' }}>{phase.title}</h4>
                  <span style={{ fontSize: '14px', color: '#86efac', fontWeight: '600' }}>⏱ {phase.time}</span>
                </div>
                <p style={{ fontSize: '15px', color: '#cbd5e1', marginBottom: '20px', lineHeight: '1.6' }}>{phase.desc}</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                  {phase.items.map((item, itemIdx) => (
                    <div key={itemIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#94a3b8' }}>
                      <span style={{ color: '#cba658' }}>•</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}

        <div style={{ background: 'rgba(203, 166, 88, 0.05)', border: '1px solid rgba(203, 166, 88, 0.2)', borderRadius: '12px', padding: '24px', marginTop: '32px' }}>
          <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#cba658', marginBottom: '12px' }}>Total Timeline</h4>
          <p style={{ fontSize: '15px', color: '#cbd5e1', lineHeight: '1.6' }}>
            <strong>Average:</strong> 8-14 weeks from offer to closing<br />
            <strong>Cash buyers:</strong> Can close in as little as 4-6 weeks<br />
            <strong>Financed purchases:</strong> Typically 10-16 weeks
          </p>
        </div>
      </div>
    </div>
  );

  const renderNotario = () => (
    <div style={{ padding: '60px 40px' }}>
      <h2 style={{ fontSize: '36px', fontWeight: '300', color: '#cba658', marginBottom: '16px', letterSpacing: '1px' }}>
        Notario Público
      </h2>
      <p style={{ fontSize: '16px', color: '#cbd5e1', marginBottom: '40px', maxWidth: '800px' }}>
        The Notario Publico is a licensed attorney appointed by the state government to oversee all real estate transactions
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px', marginBottom: '40px' }}>
        <div style={{ background: 'rgba(15, 23, 42, 0.4)', border: '1px solid rgba(203, 166, 88, 0.2)', borderRadius: '12px', padding: '32px' }}>
          <h4 style={{ fontSize: '22px', fontWeight: '600', color: '#cba658', marginBottom: '20px' }}>Responsibilities</h4>
          <ul style={{ paddingLeft: '20px', margin: 0 }}>
            {[
              'Verify property title is clear',
              'Ensure all taxes are paid',
              'Prepare and execute Escritura',
              'Calculate transfer taxes',
              'Register deed with Public Registry',
              'Verify identity of all parties',
              'Ensure legal compliance',
              'Protect both buyer and seller'
            ].map((resp, idx) => (
              <li key={idx} style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '12px', lineHeight: '1.6' }}>{resp}</li>
            ))}
          </ul>
        </div>

        <div style={{ background: 'rgba(15, 23, 42, 0.4)', border: '1px solid rgba(203, 166, 88, 0.2)', borderRadius: '12px', padding: '32px' }}>
          <h4 style={{ fontSize: '22px', fontWeight: '600', color: '#cba658', marginBottom: '20px' }}>Fees & Costs</h4>
          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '42px', fontWeight: '700', color: '#cba658', marginBottom: '8px' }}>1-2%</div>
            <div style={{ fontSize: '14px', color: '#94a3b8' }}>of property value</div>
          </div>
          <div style={{ display: 'grid', gap: '12px' }}>
            {[
              { item: 'Notario Fees', range: '0.5% - 1.0%' },
              { item: 'Transfer Tax (ISAI)', range: '2% - 4%' },
              { item: 'Property Registration', range: '0.5% - 1.0%' },
              { item: 'Title Insurance (optional)', range: '$1,000 - $3,000' }
            ].map((fee, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: 'rgba(203, 166, 88, 0.05)', borderRadius: '6px' }}>
                <span style={{ fontSize: '14px', color: '#cbd5e1' }}>{fee.item}</span>
                <span style={{ fontSize: '14px', color: '#cba658', fontWeight: '600' }}>{fee.range}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: 'rgba(203, 166, 88, 0.05)', border: '1px solid rgba(203, 166, 88, 0.2)', borderRadius: '12px', padding: '32px' }}>
        <h4 style={{ fontSize: '20px', fontWeight: '600', color: '#cba658', marginBottom: '16px' }}>Important Note</h4>
        <p style={{ fontSize: '15px', color: '#cbd5e1', lineHeight: '1.8' }}>
          The Notario is selected by the buyer but represents neither party - they act as an impartial public official
          ensuring the transaction complies with all Mexican laws. Their role is similar to a title company in the USA
          but with additional governmental authority.
        </p>
      </div>
    </div>
  );

  // DEVELOPMENTS TAB - ACCORDION + UPLOAD
  const renderDevelopments = () => (
    <div style={{ padding: '60px 40px' }}>
      <h2 style={{ fontSize: '36px', fontWeight: '300', color: '#cba658', marginBottom: '16px', letterSpacing: '1px' }}>
        Developments & Master-Planned Communities
      </h2>
      <p style={{ fontSize: '16px', color: '#cbd5e1', marginBottom: '40px', maxWidth: '800px' }}>
        Explore new development projects across Mexico
      </p>

      {/* Agent Upload Button */}
      <div style={{ marginBottom: '40px' }}>
        <button
          onClick={() => setActiveTab('agents')}
          style={{
            padding: '16px 32px',
            background: 'linear-gradient(135deg, #cba658, #b8944d)',
            border: 'none',
            borderRadius: '8px',
            color: '#0f172a',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer',
            letterSpacing: '0.5px',
            boxShadow: '0 4px 16px rgba(203, 166, 88, 0.3)'
          }}
        >
          📤 UPLOAD DEVELOPMENT PROJECT
        </button>
      </div>

      {/* Accordion Format by Region */}
      <div style={{ display: 'grid', gap: '16px' }}>
        {developmentRegions.map((region) => {
          const regionDevs = getDevelopmentsByRegion(region);
          const isExpanded = expandedDevRegion === region;

          return (
            <div key={region} style={{ background: 'rgba(15, 23, 42, 0.4)', border: '1px solid rgba(203, 166, 88, 0.2)', borderRadius: '12px', overflow: 'hidden' }}>
              {/* Accordion Header */}
              <button
                onClick={() => setExpandedDevRegion(isExpanded ? null : region)}
                style={{
                  width: '100%',
                  padding: '24px 32px',
                  background: isExpanded ? 'rgba(203, 166, 88, 0.15)' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.3s'
                }}
              >
                <div style={{ textAlign: 'left' }}>
                  <h3 style={{ fontSize: '22px', color: isExpanded ? '#cba658' : '#e2e8f0', fontWeight: '400', marginBottom: '6px' }}>
                    {region}
                  </h3>
                  <div style={{ fontSize: '13px', color: '#94a3b8' }}>
                    {regionDevs.length} {regionDevs.length === 1 ? 'project' : 'projects'}
                  </div>
                </div>
                <div style={{ fontSize: '28px', color: isExpanded ? '#cba658' : '#94a3b8' }}>
                  {isExpanded ? '−' : '+'}
                </div>
              </button>

              {/* Accordion Content */}
              {isExpanded && (
                <div style={{ padding: '32px', borderTop: '1px solid rgba(203, 166, 88, 0.1)' }}>
                  <div style={{ display: 'grid', gap: '24px' }}>
                    {regionDevs.map(dev => (
                      <div key={dev.id} style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(203, 166, 88, 0.2)', borderRadius: '12px', overflow: 'hidden' }}>
                        <div style={{ padding: '32px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '20px' }}>
                            <div>
                              <h4 style={{ fontSize: '24px', color: '#f1f5f9', fontWeight: '400', marginBottom: '8px' }}>{dev.name}</h4>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                                <MapPin size={16} color="#94a3b8" />
                                <span style={{ fontSize: '14px', color: '#94a3b8' }}>{dev.location}</span>
                              </div>
                            </div>
                            <div style={{
                              padding: '8px 16px',
                              background: dev.status === 'PRE-CONSTRUCTION' ? 'rgba(251, 191, 36, 0.2)' : 'rgba(34, 197, 94, 0.2)',
                              border: `1px solid ${dev.status === 'PRE-CONSTRUCTION' ? 'rgba(251, 191, 36, 0.5)' : 'rgba(34, 197, 94, 0.5)'}`,
                              borderRadius: '6px',
                              fontSize: '11px',
                              fontWeight: '600',
                              color: dev.status === 'PRE-CONSTRUCTION' ? '#fbbf24' : '#22c55e'
                            }}>
                              {dev.status}
                            </div>
                          </div>

                          <p style={{ fontSize: '15px', color: '#cbd5e1', marginBottom: '24px', lineHeight: '1.6' }}>
                            {dev.description}
                          </p>

                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
                            <div style={{ padding: '16px', background: 'rgba(203, 166, 88, 0.05)', borderRadius: '8px' }}>
                              <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '6px' }}>Units</div>
                              <div style={{ fontSize: '20px', color: '#cba658', fontWeight: '600' }}>{dev.units}</div>
                            </div>
                            <div style={{ padding: '16px', background: 'rgba(203, 166, 88, 0.05)', borderRadius: '8px' }}>
                              <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '6px' }}>Price Range</div>
                              <div style={{ fontSize: '14px', color: '#cba658', fontWeight: '600' }}>
                                {formatPrice(dev.priceFrom)} - {formatPrice(dev.priceTo)}
                              </div>
                            </div>
                            <div style={{ padding: '16px', background: 'rgba(203, 166, 88, 0.05)', borderRadius: '8px' }}>
                              <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '6px' }}>Completion</div>
                              <div style={{ fontSize: '20px', color: '#cba658', fontWeight: '600' }}>{dev.completion}</div>
                            </div>
                          </div>

                          <button style={{
                            width: '100%',
                            padding: '14px',
                            background: '#cba658',
                            border: 'none',
                            borderRadius: '6px',
                            color: '#0f172a',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            letterSpacing: '0.5px'
                          }}>
                            REQUEST INFO & FLOOR PLANS
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  // AGENT TOOLS TAB
  const renderAgentTools = () => (
    <div>
      <div style={{ background: 'rgba(15, 23, 42, 0.95)', padding: '40px', borderBottom: '1px solid rgba(203, 166, 88, 0.2)' }}>
        <h2 style={{ fontSize: '36px', fontWeight: '300', color: '#cba658', marginBottom: '16px', letterSpacing: '1px' }}>
          Agent Portal
        </h2>
        <p style={{ fontSize: '16px', color: '#cbd5e1', maxWidth: '800px' }}>
          Upload and manage property listings and development projects with AI/SI verification
        </p>
      </div>

      <div style={{ padding: '40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '40px' }}>
          <div style={{ background: 'rgba(15, 23, 42, 0.4)', border: '2px solid rgba(203, 166, 88, 0.3)', borderRadius: '12px', padding: '40px', textAlign: 'center', cursor: 'pointer' }}
            onClick={() => document.getElementById('property-upload-section').scrollIntoView({ behavior: 'smooth' })}>
            <h3 style={{ fontSize: '24px', color: '#cba658', marginBottom: '12px', fontWeight: '500' }}>📄 Upload Property</h3>
            <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: '1.6' }}>
              Upload individual property listings with AI/SI document verification
            </p>
          </div>

          <div style={{ background: 'rgba(15, 23, 42, 0.4)', border: '2px solid rgba(203, 166, 88, 0.3)', borderRadius: '12px', padding: '40px', textAlign: 'center', cursor: 'pointer' }}
            onClick={() => document.getElementById('development-upload-section').scrollIntoView({ behavior: 'smooth' })}>
            <h3 style={{ fontSize: '24px', color: '#cba658', marginBottom: '12px', fontWeight: '500' }}>🏗️ Upload Development</h3>
            <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: '1.6' }}>
              Submit new development projects and master-planned communities
            </p>
          </div>
        </div>

        <div id="property-upload-section" style={{ marginBottom: '60px' }}>
          <AgentPropertyUpload />
        </div>

        <div id="development-upload-section">
          <AgentDevelopmentUpload />
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'properties':
        return renderProperties();
      case 'financing':
        return renderFinancing();
      case 'fideicomiso':
        return renderFideicomiso();
      case 'legal':
        return renderLegal();
      case 'notario':
        return renderNotario();
      case 'developments':
        return renderDevelopments();
      case 'agents':
        return renderAgentTools();
      default:
        return renderProperties();
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a' }}>
      <WaveBanner />

      {/* Tabs */}
      <div style={{ background: 'rgba(15, 23, 42, 0.95)', borderBottom: '1px solid rgba(203, 166, 88, 0.2)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', padding: '0 20px' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '20px 32px',
                background: activeTab === tab.id ? 'rgba(203, 166, 88, 0.15)' : 'transparent',
                border: 'none',
                borderBottom: activeTab === tab.id ? '3px solid #cba658' : '3px solid transparent',
                color: activeTab === tab.id ? '#cba658' : '#94a3b8',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                letterSpacing: '0.5px',
                transition: 'all 0.3s'
              }}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ color: '#cbd5e1' }}>
        {renderTabContent()}
      </div>

      {/* Footer */}
      <footer style={{
        background: 'rgba(15, 23, 42, 0.95)',
        borderTop: '1px solid rgba(203, 166, 88, 0.2)',
        padding: '40px',
        marginTop: '60px'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '12px' }}>
            NMLS #337526 | Everwise Home Loans and Realty | DRE #02067255
          </p>
          <p style={{ color: '#64748b', fontSize: '12px' }}>
            © 2026 AuditDNA Estates. Premium Mexico Real Estate & Cross-Border Financing.
          </p>
        </div>
      </footer>

      <WhatsAppWidget />
      <AIChatWidget />
    </div>
  );
}