import React from 'react';
import { Building, Star, Award, MapPin } from 'lucide-react';

/**
 * SupplierCard Component - Display supplier information card
 */
const SupplierCard = ({ supplier }) => {
  const defaultSupplier = supplier || {
    id: 1,
    name: 'Premium Produce Co.',
    location: 'Salinas, CA',
    rating: 4.8,
    certifications: ['USDA Organic', 'GlobalG.A.P.', 'Primus GFS'],
    products: ['Lettuce', 'Broccoli', 'Cauliflower'],
    yearsInBusiness: 15,
    image: null
  };

  const data = defaultSupplier;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      {/* Header with image placeholder */}
      <div className="h-32 bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
        <Building size={48} className="text-white" />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{data.name}</h3>
            <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
              <MapPin size={16} />
              {data.location}
            </p>
          </div>
          <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
            <Star size={16} className="text-yellow-500 fill-yellow-500" />
            <span className="font-semibold text-gray-800">{data.rating}</span>
          </div>
        </div>

        {/* Years in business */}
        <div className="mb-4 text-sm text-gray-600">
          {data.yearsInBusiness} years in business
        </div>

        {/* Products */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Products</h4>
          <div className="flex flex-wrap gap-2">
            {data.products.map((product, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium"
              >
                {product}
              </span>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
            <Award size={16} />
            Certifications
          </h4>
          <div className="flex flex-wrap gap-2">
            {data.certifications.map((cert, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-4">
          <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
            Contact Supplier
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupplierCard;

