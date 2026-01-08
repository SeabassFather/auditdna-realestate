import React from 'react';
import { Clock } from 'lucide-react';

/**
 * LabHistoryTable Component - Display history of lab test results
 */
const LabHistoryTable = ({ tests = [] }) => {
  const sampleTests = tests.length > 0 ? tests : [
    { id: 1, date: '2025-01-15', type: 'Water', status: 'Passed', score: 95 },
    { id: 2, date: '2025-01-10', type: 'Soil', status: 'Passed', score: 88 },
    { id: 3, date: '2025-01-05', type: 'Fertilizer', status: 'Pending', score: null },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Clock size={24} />
        Lab Test History
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Test Type</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Score</th>
            </tr>
          </thead>
          <tbody>
            {sampleTests.map((test) => (
              <tr key={test.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-gray-600">{test.date}</td>
                <td className="py-3 px-4 text-gray-800 font-medium">{test.type}</td>
                <td className="py-3 px-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    test.status === 'Passed' 
                      ? 'bg-green-100 text-green-700' 
                      : test.status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {test.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-600">
                  {test.score !== null ? `${test.score}%` : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LabHistoryTable;

