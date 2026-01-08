import React, { useState } from 'react';
import { ClipboardCheck, AlertCircle } from 'lucide-react';

/**
 * FSVPVerification Component - Foreign Supplier Verification Program
 */
const FSVPVerification = () => {
  const [suppliers, setSuppliers] = useState([
    { id: 1, name: 'Supplier A - Mexico', product: 'Avocados', status: 'verified', lastVerification: '2025-01-10' },
    { id: 2, name: 'Supplier B - Chile', product: 'Grapes', status: 'pending', lastVerification: '2024-11-15' },
    { id: 3, name: 'Supplier C - Peru', product: 'Asparagus', status: 'verified', lastVerification: '2025-01-05' },
  ]);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <ClipboardCheck size={28} className="text-blue-600" />
        FSVP Verification
      </h3>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-800">
          Verify foreign suppliers comply with FDA safety standards under the Foreign Supplier Verification Program
        </p>
      </div>

      <div className="space-y-4">
        {suppliers.map((supplier) => (
          <div
            key={supplier.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="font-semibold text-gray-800">{supplier.name}</h4>
                <p className="text-sm text-gray-600">Product: {supplier.product}</p>
                <p className="text-sm text-gray-500">Last Verification: {supplier.lastVerification}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  supplier.status === 'verified'
                    ? 'bg-green-100 text-green-700'
                    : supplier.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {supplier.status === 'verified' && ' Verified'}
                {supplier.status === 'pending' && '  Pending'}
                {supplier.status === 'failed' && ' Failed'}
              </span>
            </div>

            <div className="mt-3 flex gap-2">
              <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                View Details
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
                Re-verify
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-6 w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
        + Add New Supplier
      </button>

      <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start gap-2">
          <AlertCircle size={20} className="text-yellow-600 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-yellow-800 mb-1">Verification Reminder</p>
            <p className="text-sm text-yellow-700">
              Supplier B requires re-verification. Verification is more than 60 days old.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FSVPVerification;

