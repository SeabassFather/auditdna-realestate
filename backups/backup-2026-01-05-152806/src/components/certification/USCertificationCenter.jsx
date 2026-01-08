import React, { useState } from 'react';
import { Flag, FileText } from 'lucide-react';

/**
 * USCertificationCenter Component - US-specific certification management
 */
const USCertificationCenter = () => {
  const [certifications, setCertifications] = useState([
    { id: 1, name: 'USDA Organic', status: 'active', expiry: '2025-11-30' },
    { id: 2, name: 'GlobalG.A.P.', status: 'active', expiry: '2026-03-15' },
    { id: 3, name: 'Primus GFS', status: 'pending', expiry: '2025-08-20' },
    { id: 4, name: 'FSMA Compliance', status: 'active', expiry: '2026-12-31' },
  ]);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Flag size={28} className="text-blue-600" />
        US Certification Center
      </h3>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-800">
           Manage US agricultural certifications including USDA Organic, GlobalG.A.P., Primus GFS, and FDA FSMA
        </p>
      </div>

      <div className="space-y-4">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText size={24} className="text-blue-600" />
                <div>
                  <h4 className="font-semibold text-gray-800">{cert.name}</h4>
                  <p className="text-sm text-gray-600">Expires: {cert.expiry}</p>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  cert.status === 'active'
                    ? 'bg-green-100 text-green-700'
                    : cert.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {cert.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-6 w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
        + Add New Certification
      </button>
    </div>
  );
};

export default USCertificationCenter;

