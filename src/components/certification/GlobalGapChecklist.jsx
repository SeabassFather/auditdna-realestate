import React, { useState } from 'react';
import { CheckSquare, AlertCircle } from 'lucide-react';

/**
 * GlobalGapChecklist Component - GlobalG.A.P. certification checklist
 */
const GlobalGapChecklist = () => {
  const [checklist, setChecklist] = useState([
    { id: 1, category: 'Food Safety & Quality', item: 'Risk Assessment', checked: true },
    { id: 2, category: 'Food Safety & Quality', item: 'Traceability System', checked: true },
    { id: 3, category: 'Food Safety & Quality', item: 'Recall Procedures', checked: false },
    { id: 4, category: 'Environment', item: 'Waste Management', checked: true },
    { id: 5, category: 'Environment', item: 'Water Conservation', checked: false },
    { id: 6, category: 'Environment', item: 'Energy Efficiency', checked: true },
    { id: 7, category: 'Workers Welfare', item: 'Training Programs', checked: false },
    { id: 8, category: 'Workers Welfare', item: 'Safety Equipment', checked: true },
  ]);

  const toggleItem = (id) => {
    setChecklist(
      checklist.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const completionPercentage = Math.round(
    (checklist.filter((item) => item.checked).length / checklist.length) * 100
  );

  const categories = [...new Set(checklist.map((item) => item.category))];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">GlobalG.A.P. Checklist</h3>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Completion</span>
          <span className="text-sm font-bold text-green-600">{completionPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-green-600 h-3 rounded-full transition-all"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      {completionPercentage < 100 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-2">
            <AlertCircle size={20} className="text-yellow-600 mt-0.5" />
            <p className="text-sm text-yellow-800">
              Complete all checklist items to meet GlobalG.A.P. requirements
            </p>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {categories.map((category) => (
          <div key={category}>
            <h4 className="font-semibold text-gray-800 mb-3">{category}</h4>
            <div className="space-y-2">
              {checklist
                .filter((item) => item.category === category)
                .map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                    onClick={() => toggleItem(item.id)}
                  >
                    <div
                      className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                        item.checked
                          ? 'bg-green-600 border-green-600'
                          : 'border-gray-300'
                      }`}
                    >
                      {item.checked && <CheckSquare size={20} className="text-white" />}
                    </div>
                    <span className={`text-sm ${item.checked ? 'text-gray-600' : 'text-gray-800 font-medium'}`}>
                      {item.item}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GlobalGapChecklist;

