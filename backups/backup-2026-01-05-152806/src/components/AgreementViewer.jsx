<<<<<<< HEAD
import React, { useState, useEffect } from "react";
=======
ï»¿import React, { useState, useEffect } from "react";
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
import { apiGet } from "../utils/api";

export default function AgreementViewer({ agreementId, onAccept, onDecline }) {
  const [agreement, setAgreement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [accepted, setAccepted] = useState(false);
  const [signature, setSignature] = useState("");

  useEffect(() => {
    if (agreementId) {
      loadAgreement();
    }
  }, [agreementId]);

  const loadAgreement = async () => {
    try {
      setLoading(true);
      const data = await apiGet(`/api/agreements/${agreementId}`);
      setAgreement(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async () => {
    if (!signature.trim()) {
      alert('Please enter your signature to accept the agreement.');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/api/agreements/${agreementId}/accept`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          signature,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent
        })
      });

      if (response.ok) {
        setAccepted(true);
        if (onAccept) {
          onAccept({ agreementId, signature, timestamp: new Date().toISOString() });
        }
      } else {
        throw new Error('Failed to accept agreement');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDecline = () => {
    if (onDecline) {
      onDecline({ agreementId, timestamp: new Date().toISOString() });
    }
  };

  if (loading && !agreement) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading agreement...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
          <svg className="h-12 w-12 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Agreement</h3>
          <p className="text-red-700">{error}</p>
          <button 
            onClick={loadAgreement}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!agreement) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <p className="text-gray-600">No agreement found.</p>
        </div>
      </div>
    );
  }

  if (accepted) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
          <svg className="h-16 w-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-green-800 mb-2">Agreement Accepted</h2>
          <p className="text-green-700 mb-4">Thank you for accepting the agreement. A copy has been sent to your email.</p>
          <div className="text-sm text-green-600">
            <p>Agreement ID: {agreementId}</p>
            <p>Accepted on: {new Date().toLocaleString()}</p>
            <p>Signature: {signature}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">{agreement.title}</h1>
          <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
            <span>Version: {agreement.version}</span>
            <span>Effective Date: {new Date(agreement.effectiveDate).toLocaleDateString()}</span>
            <span>Last Updated: {new Date(agreement.lastUpdated).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Agreement Content */}
        <div className="px-6 py-6">
          <div className="prose max-w-none">
            {agreement.sections?.map((section, index) => (
              <div key={index} className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {section.number}. {section.title}
                </h3>
                <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {section.content}
                </div>
                {section.subsections && (
                  <div className="ml-4 mt-4 space-y-4">
                    {section.subsections.map((subsection, subIndex) => (
                      <div key={subIndex}>
                        <h4 className="font-medium text-gray-900">
                          {section.number}.{subIndex + 1} {subsection.title}
                        </h4>
                        <p className="text-gray-700 mt-1 whitespace-pre-wrap">
                          {subsection.content}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Key Terms Highlight */}
          {agreement.keyTerms && (
            <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-yellow-800 mb-3">Key Terms Summary</h3>
              <ul className="space-y-2">
                {agreement.keyTerms.map((term, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3"></span>
                    <span className="text-yellow-700">{term}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Signature Section */}
        <div className="border-t border-gray-200 px-6 py-6 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Electronic Signature</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Legal Name (This will serve as your electronic signature)
              </label>
              <input
                type="text"
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full legal name"
                disabled={loading}
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <p className="text-sm text-blue-800">
                <strong>Electronic Signature Disclosure:</strong> By typing your name above and clicking "Accept Agreement," 
                you are signing this agreement electronically. You agree that this electronic signature is the legal equivalent 
                of your manual signature on this agreement.
              </p>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="acknowledge"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                required
              />
              <label htmlFor="acknowledge" className="ml-2 text-sm text-gray-700">
                I acknowledge that I have read, understood, and agree to be bound by this agreement.
              </label>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="border-t border-gray-200 px-6 py-4 flex justify-end space-x-4">
          <button
            onClick={handleDecline}
            disabled={loading}
            className="px-6 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50 font-medium"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            disabled={loading || !signature.trim()}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {loading ? 'Processing...' : 'Accept Agreement'}
          </button>
        </div>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

