import React, { useState } from 'react';
import { CheckSquare, AlertCircle } from 'lucide-react';

/**
 * PrimusChecklist Component - Primus GFS audit checklist
 */
const PrimusChecklist = () => {
  const [checklist, setChecklist] = useState([
    { id: 1, category: 'Management System', item: 'Food Safety Policy', checked: true },
    { id: 2, category: 'Management System', item: 'Document Control', checked: true },
    { id: 3, category: 'Management System', item: 'Training Records', checked: false },
    { id: 4, category: 'Personnel', item: 'Health & Hygiene', checked: true },
    { id: 5, category: 'Personnel', item: 'Training Program', checked: false },
    { id: 6, category: 'Site', item: 'Facility Maintenance', checked: true },
    { id: 7, category: 'Site', item: 'Pest Control', checked: true },
    { id: 8, category: 'Water', item: 'Water Quality Testing', checked: false },
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
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Primus GFS Checklist</h3>

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
              Complete all checklist items to meet Primus GFS requirements
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

export default PrimusChecklist;

