import React from 'react';
import { MapPin } from 'lucide-react';

/**
 * MapWidget Component - Placeholder for map visualization
 * @param {Object} props
 * @param {Array} props.locations - Array of location objects
 * @param {number} props.height - Height of the map widget
 */
const MapWidget = ({ locations = [], height = 400 }) => {
  return (
    <div 
      className="w-full bg-gray-100 border border-gray-300 rounded-lg flex items-center justify-center"
      style={{ height: `${height}px` }}
    >
      <div className="text-center">
        <MapPin size={48} className="text-gray-400 mx-auto mb-2" />
        <p className="text-gray-600 font-medium">Map Widget</p>
        <p className="text-sm text-gray-500">
          {locations.length > 0 
            ? `${locations.length} location(s) to display` 
            : 'No locations to display'}
        </p>
      </div>
    </div>
  );
};

export default MapWidget;

