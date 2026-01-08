import React, { useState } from 'react';
import { Shield, AlertCircle, CheckCircle } from 'lucide-react';

/**
 * FDAFSMAReview Component - FDA Food Safety Modernization Act review
 */
const FDAFSMAReview = () => {
  const [reviewItems, setReviewItems] = useState([
    { id: 1, section: 'Preventive Controls', requirement: 'Hazard Analysis', status: 'compliant' },
    { id: 2, section: 'Preventive Controls', requirement: 'Food Safety Plan', status: 'compliant' },
    { id: 3, section: 'Preventive Controls', requirement: 'Monitoring Procedures', status: 'review' },
    { id: 4, section: 'Supplier Verification', requirement: 'Risk Assessment', status: 'compliant' },
    { id: 5, section: 'Supplier Verification', requirement: 'Verification Activities', status: 'review' },
    { id: 6, section: 'Traceability', requirement: 'Record Keeping', status: 'compliant' },
    { id: 7, section: 'Produce Safety', requirement: 'Water Testing', status: 'review' },
  ]);

  const sections = [...new Set(reviewItems.map((item) => item.section))];
  
  const getStatusColor = (status) => {
    if (status === 'compliant') return 'text-green-600 bg-green-100';
    if (status === 'review') return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const complianceRate = Math.round(
    (reviewItems.filter((item) => item.status === 'compliant').length / reviewItems.length) * 100
  );

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Shield size={28} className="text-blue-600" />
        FDA FSMA Review
      </h3>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-800">
          Review your facility's compliance with FDA Food Safety Modernization Act requirements
        </p>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Compliance Rate</span>
          <span className="text-sm font-bold text-green-600">{complianceRate}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-green-600 h-3 rounded-full transition-all"
            style={{ width: `${complianceRate}%` }}
          />
        </div>
      </div>

      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section}>
            <h4 className="font-semibold text-gray-800 mb-3">{section}</h4>
            <div className="space-y-2">
              {reviewItems
                .filter((item) => item.section === section)
                .map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="text-sm text-gray-800">{item.requirement}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {item.status === 'compliant' && ' Compliant'}
                      {item.status === 'review' && '  Needs Review'}
                      {item.status === 'non-compliant' && ' Non-Compliant'}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      <button className="mt-6 w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
        Generate FSMA Report
      </button>
    </div>
  );
};

export default FDAFSMAReview;

