import React, { useState } from 'react';
import { Flag, AlertCircle, CheckCircle } from 'lucide-react';

/**
 * MexicoFinanceCompliance Component - Mexico-specific finance compliance checker
 */
const MexicoFinanceCompliance = () => {
  const [companyRFC, setCompanyRFC] = useState('');
  const [checking, setChecking] = useState(false);
  const [complianceStatus, setComplianceStatus] = useState(null);

  const handleCheck = () => {
    if (!companyRFC) {
      alert('Please enter RFC number');
      return;
    }

    setChecking(true);
    // TODO: Implement actual compliance check
    setTimeout(() => {
      setChecking(false);
      setComplianceStatus({
        isCompliant: true,
        details: [
          { item: 'RFC Registration', status: 'valid' },
          { item: 'SAT Status', status: 'valid' },
          { item: 'CFDI Compliance', status: 'valid' },
          { item: 'Banking Information', status: 'valid' }
        ]
      });
    }, 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Flag size={24} className="text-green-600" />
        Mexico Finance Compliance
      </h3>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-2">
          <AlertCircle size={20} className="text-yellow-600 mt-0.5" />
          <p className="text-sm text-yellow-800">
            Verify Mexican tax and banking compliance for cross-border transactions
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company RFC (Tax ID)
          </label>
          <input
            type="text"
            value={companyRFC}
            onChange={(e) => setCompanyRFC(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3"
            placeholder="ABC123456XXX"
            maxLength={13}
          />
        </div>

        <button
          onClick={handleCheck}
          disabled={checking}
          className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {checking ? 'Checking Compliance...' : 'Check Compliance Status'}
        </button>

        {complianceStatus && (
          <div className="mt-6 border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle size={24} className="text-green-600" />
              <h4 className="font-semibold text-gray-800">Compliance Check Results</h4>
            </div>

            <div className="space-y-2">
              {complianceStatus.details.map((detail, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <span className="text-sm font-medium text-gray-700">{detail.item}</span>
                  <span
                    className={`text-sm font-semibold ${
                      detail.status === 'valid' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {detail.status === 'valid' ? ' Valid' : ' Invalid'}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm font-medium text-green-800">
                 Company is compliant for Mexico finance operations
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MexicoFinanceCompliance;

