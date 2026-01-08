import React, { useState } from 'react';
import { FileText, Download } from 'lucide-react';

/**
 * CAPGenerator Component - Generate Corrective Action Plans
 */
const CAPGenerator = () => {
  const [issueDescription, setIssueDescription] = useState('');
  const [correctiveAction, setCorrectiveAction] = useState('');
  const [generating, setGenerating] = useState(false);

  const handleGenerate = () => {
    if (!issueDescription || !correctiveAction) {
      alert('Please fill in all fields');
      return;
    }

    setGenerating(true);
    // TODO: Implement actual CAP generation logic
    setTimeout(() => {
      setGenerating(false);
      alert('Corrective Action Plan generated successfully!');
    }, 1500);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <FileText size={24} />
        Corrective Action Plan Generator
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Issue Description
          </label>
          <textarea
            value={issueDescription}
            onChange={(e) => setIssueDescription(e.target.value)}
            rows={4}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Describe the issue that needs correction..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Corrective Action
          </label>
          <textarea
            value={correctiveAction}
            onChange={(e) => setCorrectiveAction(e.target.value)}
            rows={4}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Describe the corrective action to be taken..."
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={generating}
          className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          <Download size={20} />
          {generating ? 'Generating CAP...' : 'Generate CAP Document'}
        </button>
      </div>
    </div>
  );
};

export default CAPGenerator;

