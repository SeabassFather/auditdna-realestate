<<<<<<< HEAD
import React, { useState } from "react";
=======
ï»¿import React, { useState } from "react";
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
import useTradeFinanceSearch from "../hooks/useTradeFinanceSearch";

export default function TradeFinanceForm({ onSearch }) {
  const [formData, setFormData] = useState({
    // Business Information
    legalName: "",
    duns: "",
    country: "",
    annualRevenue: "",
    arAging: "",
    industryType: "",
    yearsInBusiness: "",
    
    // Facility Type
    facilityType: "factoring",
    
    // Invoice/PO Details
    amount: "",
    currency: "USD",
    debtor: "",
    terms: "Net 30",
    recurrence: "one_off",
    season: "",
    invoiceDate: "",
    dueDate: "",
    
    // Collateral & Risk
    collateral: "",
    inventory: "",
    insurance: "",
    region: "",
    commitment: "30_days",
    creditInsurance: false,
    
    // SBA Information
    sbaEligible: false,
    minorityOwned: false,
    womenOwned: false,
  });

  const { loading, searchTradeFinance, results } = useTradeFinanceSearch();
  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowResults(true);
    const result = await searchTradeFinance(formData);
    if (onSearch) {
      onSearch(result);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Trade Finance Application</h2>
          
          {/* Business Information */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Business Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Legal Name</label>
                <input
                  type="text"
                  value={formData.legalName}
                  onChange={(e) => handleInputChange('legalName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Company Legal Name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">DUNS Number</label>
                <input
                  type="text"
                  value={formData.duns}
                  onChange={(e) => handleInputChange('duns', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="DUNS Number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <select
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Country</option>
                  <option value="US">United States</option>
                  <option value="MX">Mexico</option>
                  <option value="CA">Canada</option>
                  <option value="BR">Brazil</option>
                  <option value="AR">Argentina</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Annual Revenue ($)</label>
                <input
                  type="number"
                  value={formData.annualRevenue}
                  onChange={(e) => handleInputChange('annualRevenue', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="5000000"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Industry Type</label>
                <select
                  value={formData.industryType}
                  onChange={(e) => handleInputChange('industryType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Industry</option>
                  <option value="agriculture">Agriculture</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="import_export">Import/Export</option>
                  <option value="distribution">Distribution</option>
                  <option value="retail">Retail</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Years in Business</label>
                <input
                  type="number"
                  value={formData.yearsInBusiness}
                  onChange={(e) => handleInputChange('yearsInBusiness', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="5"
                />
              </div>
            </div>
          </div>

          {/* Facility Type */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Financing Type</h3>
            <div className="space-y-2">
              {[
                { value: 'factoring', label: 'Invoice Factoring' },
                { value: 'po_financing', label: 'Purchase Order Financing' },
                { value: 'asset_based', label: 'Asset-Based Lending' },
                { value: 'trade_credit', label: 'Trade Credit Insurance' },
                { value: 'letters_of_credit', label: 'Letters of Credit' }
              ].map((option) => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    name="facilityType"
                    value={option.value}
                    checked={formData.facilityType === option.value}
                    onChange={(e) => handleInputChange('facilityType', e.target.value)}
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Invoice/PO Details */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Transaction Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => handleInputChange('amount', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="100000"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                <select
                  value={formData.currency}
                  onChange={(e) => handleInputChange('currency', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="USD">USD</option>
                  <option value="MXN">MXN</option>
                  <option value="CAD">CAD</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Debtor/Buyer</label>
                <input
                  type="text"
                  value={formData.debtor}
                  onChange={(e) => handleInputChange('debtor', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Buyer Company Name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Terms</label>
                <select
                  value={formData.terms}
                  onChange={(e) => handleInputChange('terms', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Net 15">Net 15</option>
                  <option value="Net 30">Net 30</option>
                  <option value="Net 45">Net 45</option>
                  <option value="Net 60">Net 60</option>
                  <option value="Net 90">Net 90</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Recurrence</label>
                <select
                  value={formData.recurrence}
                  onChange={(e) => handleInputChange('recurrence', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="one_off">One-off</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="seasonal">Seasonal</option>
                  <option value="ongoing">Ongoing</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                <select
                  value={formData.region}
                  onChange={(e) => handleInputChange('region', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Region</option>
                  <option value="North America">North America</option>
                  <option value="Mexico">Mexico</option>
                  <option value="Central America">Central America</option>
                  <option value="South America">South America</option>
                  <option value="Europe">Europe</option>
                  <option value="Asia">Asia</option>
                </select>
              </div>
            </div>
          </div>

          {/* Additional Options */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Additional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Collateral Available</label>
                <input
                  type="text"
                  value={formData.collateral}
                  onChange={(e) => handleInputChange('collateral', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Inventory, Equipment, etc."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Inventory/Products</label>
                <input
                  type="text"
                  value={formData.inventory}
                  onChange={(e) => handleInputChange('inventory', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Product types or inventory"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.creditInsurance}
                  onChange={(e) => handleInputChange('creditInsurance', e.target.checked)}
                  className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">Credit insurance available</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.sbaEligible}
                  onChange={(e) => handleInputChange('sbaEligible', e.target.checked)}
                  className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">SBA eligible business</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.minorityOwned}
                  onChange={(e) => handleInputChange('minorityOwned', e.target.checked)}
                  className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">Minority-owned business</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.womenOwned}
                  onChange={(e) => handleInputChange('womenOwned', e.target.checked)}
                  className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">Women-owned business</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {loading ? 'Searching...' : 'Find Finance Partners'}
          </button>
        </div>
      </form>

      {/* Results Section */}
      {showResults && (
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Matching Finance Partners</h3>
          {results.length > 0 ? (
            <div className="space-y-4">
              {results.map((partner, index) => (
                <div key={index} className="border border-gray-200 rounded-md p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-gray-900">{partner.name || `Finance Partner ${index + 1}`}</h4>
                      <p className="text-sm text-gray-600">{partner.specialties || 'Trade finance specialist'}</p>
                      <p className="text-xs text-gray-500 mt-1">Min Amount: ${partner.minAmount || '50,000'} | Max Amount: ${partner.maxAmount || '5,000,000'}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-600">{partner.rate || '2.5% - 4.5%'}</div>
                      <div className="text-sm text-gray-500">Factoring Rate</div>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      Advance Rate: <span className="font-medium">{partner.advanceRate || '80-90%'}</span> | 
                      Processing Time: <span className="font-medium">{partner.processingTime || '24-48 hours'}</span>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700">
                      Contact Partner
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-gray-500">
                {loading ? 'Searching for finance partners...' : 'No matching partners found. Try adjusting your criteria.'}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
<<<<<<< HEAD
=======

>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

