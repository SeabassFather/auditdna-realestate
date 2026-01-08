import React, { useState } from 'react';
import { Globe, Maximize2, Minimize2 } from 'lucide-react';

/**
 * SourcingMap3D Component - 3D map for visualizing sourcing locations
 */
const SourcingMap3D = ({ locations = [] }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const sampleLocations = locations.length > 0 ? locations : [
    { id: 1, name: 'Salinas, CA', lat: 36.6777, lon: -121.6555, suppliers: 12 },
    { id: 2, name: 'Yuma, AZ', lat: 32.6927, lon: -114.6277, suppliers: 8 },
    { id: 3, name: 'Jalisco, Mexico', lat: 20.6597, lon: -103.3496, suppliers: 15 },
  ];

  return (
    <div className={`bg-white rounded-lg shadow ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Globe size={24} className="text-green-600" />
            3D Sourcing Map
          </h3>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
          </button>
        </div>

        <div
          className="bg-gradient-to-br from-blue-50 to-green-50 border border-gray-300 rounded-lg flex items-center justify-center"
          style={{ height: isFullscreen ? 'calc(100vh - 120px)' : '500px' }}
        >
          <div className="text-center">
            <Globe size={64} className="text-green-600 mx-auto mb-4 animate-pulse" />
            <p className="text-gray-700 font-medium mb-2">3D Map View</p>
            <p className="text-sm text-gray-600 mb-4">
              Showing {sampleLocations.length} sourcing locations
            </p>
            
            <div className="space-y-2 max-w-md mx-auto">
              {sampleLocations.map((location) => (
                <div
                  key={location.id}
                  className="bg-white p-3 rounded-lg shadow-sm flex items-center justify-between"
                >
                  <div className="text-left">
                    <p className="font-medium text-gray-800">{location.name}</p>
                    <p className="text-xs text-gray-500">
                      {location.lat.toFixed(4)}, {location.lon.toFixed(4)}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    {location.suppliers} suppliers
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SourcingMap3D;

