import React from 'react';
import { Award, CheckCircle, AlertCircle } from 'lucide-react';

/**
 * TraceCertScoreCard Component - Display traceability certification score
 */
const TraceCertScoreCard = ({ score = 0, status = 'pending' }) => {
  const getStatusColor = () => {
    if (status === 'certified') return 'text-green-600';
    if (status === 'pending') return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusIcon = () => {
    if (status === 'certified') return <CheckCircle size={32} className="text-green-600" />;
    if (status === 'pending') return <AlertCircle size={32} className="text-yellow-600" />;
    return <AlertCircle size={32} className="text-red-600" />;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800">TraceCert Score</h3>
        <Award size={32} className="text-green-600" />
      </div>

      <div className="text-center">
        <div className="mb-4">
          {getStatusIcon()}
        </div>
        
        <div className="text-5xl font-bold text-gray-800 mb-2">
          {score}
          <span className="text-2xl text-gray-500">/100</span>
        </div>

        <div className={`text-lg font-semibold ${getStatusColor()} mb-4 uppercase`}>
          {status}
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div
            className={`h-3 rounded-full transition-all ${
              score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${score}%` }}
          />
        </div>

        <p className="text-sm text-gray-600">
          {score >= 80 && 'Excellent traceability compliance'}
          {score >= 60 && score < 80 && 'Good traceability compliance'}
          {score < 60 && 'Needs improvement'}
        </p>
      </div>
    </div>
  );
};

export default TraceCertScoreCard;

