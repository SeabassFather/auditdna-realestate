import React, { useState } from 'react';
import { Flag, Upload, CheckCircle } from 'lucide-react';

/**
 * SenasicaRegistration Component - SENASICA registration for Mexican exports
 */
const SenasicaRegistration = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    rfc: '',
    address: '',
    productType: '',
    documents: null
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!formData.companyName || !formData.rfc) {
      alert('Please fill in required fields');
      return;
    }

    setSubmitting(true);
    // TODO: Implement actual submission logic
    setTimeout(() => {
      setSubmitting(false);
      alert('SENASICA registration submitted successfully!');
    }, 1500);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Flag size={28} className="text-green-600" />
        SENASICA Registration
      </h3>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-green-800">
           Register with SENASICA for Mexican agricultural product exports
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            className="w-full border border-gray-300 rounded-lg p-3"
            placeholder="Enter company name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            RFC (Tax ID) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.rfc}
            onChange={(e) => setFormData({ ...formData, rfc: e.target.value })}
            className="w-full border border-gray-300 rounded-lg p-3"
            placeholder="ABC123456XXX"
            maxLength={13}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address
          </label>
          <textarea
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full border border-gray-300 rounded-lg p-3"
            rows={3}
            placeholder="Company address"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Type
          </label>
          <select
            value={formData.productType}
            onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
            className="w-full border border-gray-300 rounded-lg p-3"
          >
            <option value="">Select product type</option>
            <option value="fruits">Fruits</option>
            <option value="vegetables">Vegetables</option>
            <option value="grains">Grains</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Supporting Documents
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload size={32} className="mx-auto mb-2 text-gray-400" />
            <input type="file" multiple className="mb-2" />
            <p className="text-sm text-gray-600">Upload company documents</p>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          <CheckCircle size={20} />
          {submitting ? 'Submitting...' : 'Submit Registration'}
        </button>
      </div>
    </div>
  );
};

export default SenasicaRegistration;

