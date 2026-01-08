import React, { useState } from 'react';
import { Search, MapPin, User } from 'lucide-react';

/**
 * GrowerLocator Component - Search and locate growers
 */
const GrowerLocator = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');

  const growers = [
    { id: 1, name: 'Green Valley Farms', region: 'California', product: 'Lettuce', acres: 500 },
    { id: 2, name: 'Sunset Orchards', region: 'Arizona', product: 'Citrus', acres: 350 },
    { id: 3, name: 'Rio Grande Produce', region: 'Mexico', product: 'Tomatoes', acres: 800 },
    { id: 4, name: 'Pacific Coast Growers', region: 'California', product: 'Strawberries', acres: 200 },
  ];

  const filteredGrowers = growers.filter((grower) => {
    const matchesSearch = grower.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         grower.product.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = selectedRegion === 'all' || grower.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <MapPin size={24} className="text-green-600" />
        Grower Locator
      </h3>

      {/* Search and Filter */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or product..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="all">All Regions</option>
          <option value="California">California</option>
          <option value="Arizona">Arizona</option>
          <option value="Mexico">Mexico</option>
        </select>
      </div>

      {/* Results */}
      <div className="space-y-3">
        {filteredGrowers.length > 0 ? (
          filteredGrowers.map((grower) => (
            <div
              key={grower.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <User size={24} className="text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{grower.name}</h4>
                    <p className="text-sm text-gray-600">{grower.product}</p>
                    <p className="text-sm text-gray-500">{grower.region}  {grower.acres} acres</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors">
                  View Profile
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No growers found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
};

export default GrowerLocator;

