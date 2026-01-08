import React, { useState } from 'react';

/**
 * Tabs Component - Generic tabbed interface
 * @param {Object} props
 * @param {Array} props.tabs - Array of tab objects with { label, content }
 */
const Tabs = ({ tabs = [] }) => {
  const [activeTab, setActiveTab] = useState(0);

  if (tabs.length === 0) {
    return <div className="p-4 text-gray-500">No tabs available</div>;
  }

  return (
    <div className="w-full">
      {/* Tab Headers */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === index
                ? 'border-b-2 border-green-500 text-green-600'
                : 'text-gray-600 hover:text-green-500'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4">
        {tabs[activeTab]?.content || <div>No content available</div>}
      </div>
    </div>
  );
};

export default Tabs;

