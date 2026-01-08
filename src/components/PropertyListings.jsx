<<<<<<< HEAD
import React, { useState } from 'react';
=======
ï»¿import React, { useState } from 'react';
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
import { Search, MapPin, Home, DollarSign, User, Filter, Grid, List, Star, Bed, Bath, Maximize, Eye } from 'lucide-react';

export default function PropertyListings() {
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Mock property data
  const properties = [
    {
      id: 1,
      title: 'Luxury Beachfront Villa',
      price: 450000,
      city: 'Ensenada',
      municipio: 'Ensenada',
      zone: 'Playa Hermosa',
      type: 'house',
      beds: 4,
      baths: 3,
      sqft: 3200,
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
      agent: {
        name: 'Maria Rodriguez',
        phone: '+52-646-340-2686',
        email: 'maria@auditdna.com',
        company: 'AuditDNA Real Estate'
      },
      features: ['Ocean View', 'Pool', 'Smart Home', 'Solar Panels'],
      ecoScore: 92,
      status: 'For Sale',
      daysOnMarket: 12
    },
    {
      id: 2,
      title: 'Modern Downtown Condo',
      price: 185000,
      city: 'Tijuana',
      municipio: 'Tijuana',
      zone: 'Zona Rio',
      type: 'condo',
      beds: 2,
      baths: 2,
      sqft: 1100,
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
      agent: {
        name: 'Carlos Hernandez',
        phone: '+52 664 987 6543',
        email: 'carlos@auditdna.com',
        company: 'AuditDNA Real Estate'
      },
      features: ['Gym', 'Parking', 'Security', 'Rooftop Terrace'],
      ecoScore: 78,
      status: 'For Sale',
      daysOnMarket: 5
    },
    {
      id: 3,
      title: 'Valle de Guadalupe Wine Estate',
      price: 875000,
      city: 'Ensenada',
      municipio: 'Ensenada',
      zone: 'Valle de Guadalupe',
      type: 'land',
      beds: 5,
      baths: 4,
      sqft: 5800,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
      agent: {
        name: 'Sofia Martinez',
        phone: '+52 646 555 8888',
        email: 'sofia@auditdna.com',
        company: 'AuditDNA Real Estate'
      },
      features: ['Vineyard', 'Guest House', 'Mountain Views', 'Water Well'],
      ecoScore: 95,
      status: 'For Sale',
      daysOnMarket: 28
    },
    {
      id: 4,
      title: 'Rosarito Beach House',
      price: 320000,
      city: 'Rosarito',
      municipio: 'Playas de Rosarito',
      zone: 'Playa Rosarito',
      type: 'house',
      beds: 3,
      baths: 2.5,
      sqft: 2400,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
      agent: {
        name: 'Miguel Santos',
        phone: '+52 661 234 5678',
        email: 'miguel@auditdna.com',
        company: 'AuditDNA Real Estate'
      },
      features: ['Beachfront', 'Deck', 'Fire Pit', 'Garage'],
      ecoScore: 81,
      status: 'Pending',
      daysOnMarket: 45
    },
    {
      id: 5,
      title: 'Tecate Mountain Retreat',
      price: 215000,
      city: 'Tecate',
      municipio: 'Tecate',
      zone: 'La Rumorosa',
      type: 'house',
      beds: 3,
      baths: 2,
      sqft: 1800,
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800',
      agent: {
        name: 'Ana Garcia',
        phone: '+52 665 777 4444',
        email: 'ana@auditdna.com',
        company: 'AuditDNA Real Estate'
      },
      features: ['Mountain Views', 'Fireplace', 'Large Lot', 'Quiet Area'],
      ecoScore: 88,
      status: 'For Sale',
      daysOnMarket: 8
    },
    {
      id: 6,
      title: 'Mexicali Investment Property',
      price: 145000,
      city: 'Mexicali',
      municipio: 'Mexicali',
      zone: 'Centro',
      type: 'commercial',
      beds: 0,
      baths: 3,
      sqft: 2200,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
      agent: {
        name: 'Roberto Diaz',
        phone: '+52 686 333 2222',
        email: 'roberto@auditdna.com',
        company: 'AuditDNA Real Estate'
      },
      features: ['Commercial Zoning', 'High Traffic', 'Parking', 'Updated'],
      ecoScore: 72,
      status: 'For Sale',
      daysOnMarket: 62
    }
  ];

  const filteredProperties = properties.filter(prop => {
    const matchesSearch = prop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prop.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prop.zone.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || prop.type === filterType;
    return matchesSearch && matchesType;
  });

  const PropertyCard = ({ property }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Image */}
      <div className="relative h-64 overflow-hidden group">
        <img 
          src={property.image} 
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-bold text-blue-600">
          {property.status}
        </div>
        <div className="absolute top-4 left-4 bg-green-500 px-3 py-1 rounded-full text-sm font-bold text-white flex items-center gap-1">
          <Star className="w-4 h-4 fill-white" />
          Eco: {property.ecoScore}
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-white font-bold text-xl">{property.title}</h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-3xl font-bold text-blue-600">
            ${property.price.toLocaleString()}
          </div>
          <div className="text-sm text-gray-500">
            {property.daysOnMarket} days on market
          </div>
        </div>

        {/* Location */}
        <div className="flex items-start gap-2 mb-4 text-gray-700">
          <MapPin className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold">{property.zone}</div>
            <div className="text-sm">{property.city}, {property.municipio}</div>
          </div>
        </div>

        {/* Property Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b">
          <div className="flex flex-col items-center">
            <Bed className="w-5 h-5 text-gray-400 mb-1" />
            <span className="text-sm font-semibold">{property.beds}</span>
            <span className="text-xs text-gray-500">Beds</span>
          </div>
          <div className="flex flex-col items-center">
            <Bath className="w-5 h-5 text-gray-400 mb-1" />
            <span className="text-sm font-semibold">{property.baths}</span>
            <span className="text-xs text-gray-500">Baths</span>
          </div>
          <div className="flex flex-col items-center">
            <Maximize className="w-5 h-5 text-gray-400 mb-1" />
            <span className="text-sm font-semibold">{property.sqft}</span>
            <span className="text-xs text-gray-500">SqFt</span>
          </div>
        </div>

        {/* Features */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {property.features.slice(0, 3).map((feature, idx) => (
              <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
                {feature}
              </span>
            ))}
            {property.features.length > 3 && (
              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                +{property.features.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Agent Info */}
        <div className="border-t pt-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
              {property.agent.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div className="font-semibold text-sm">{property.agent.name}</div>
              <div className="text-xs text-gray-500">{property.agent.company}</div>
            </div>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Eye className="w-4 h-4" />
            View
          </button>
        </div>
      </div>
    </div>
  );

  const PropertyListItem = ({ property }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow flex gap-6">
      {/* Image */}
      <div className="w-64 h-48 flex-shrink-0 rounded-lg overflow-hidden">
        <img 
          src={property.image} 
          alt={property.title}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">{property.title}</h3>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{property.zone}, {property.city}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-600">
              ${property.price.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">{property.daysOnMarket} days</div>
          </div>
        </div>

        <div className="flex gap-6 mb-4">
          <div className="flex items-center gap-2">
            <Bed className="w-5 h-5 text-gray-400" />
            <span className="font-semibold">{property.beds} Beds</span>
          </div>
          <div className="flex items-center gap-2">
            <Bath className="w-5 h-5 text-gray-400" />
            <span className="font-semibold">{property.baths} Baths</span>
          </div>
          <div className="flex items-center gap-2">
            <Maximize className="w-5 h-5 text-gray-400" />
            <span className="font-semibold">{property.sqft} SqFt</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-green-500 fill-green-500" />
            <span className="font-semibold">Eco: {property.ecoScore}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {property.features.map((feature, idx) => (
            <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
              {feature}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between border-t pt-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
              {property.agent.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div className="font-semibold">{property.agent.name}</div>
              <div className="text-sm text-gray-500">{property.agent.phone}</div>
            </div>
          </div>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Eye className="w-5 h-5" />
            View Details
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
<<<<<<< HEAD
              Property Listings
              Property Listings
=======
              Property Listings
              Property Listings
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
          </h1>
          <p className="text-gray-600">
            Discover your perfect property in Baja California
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            {/* Search */}
            <div className="md:col-span-2 relative">
              <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by city, zone, or property name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Property Type Filter */}
            <div className="relative">
              <Filter className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none appearance-none cursor-pointer"
              >
                <option value="all">All Types</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="land">Land</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <span className="font-semibold">{filteredProperties.length}</span> properties found
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Properties */}
        {viewMode === 'grid' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredProperties.map(property => (
              <PropertyListItem key={property.id} property={property} />
            ))}
          </div>
        )}

        {/* No Results */}
        {filteredProperties.length === 0 && (
          <div className="text-center py-16">
            <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No properties found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

