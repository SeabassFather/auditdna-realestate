<<<<<<< HEAD
import React, { useState } from "react";
=======
ï»¿import React, { useState } from "react";
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
import useMortgageSearch from "../hooks/useMortgageSearch";

export default function LoanMatchForm() {
  const [formData, setFormData] = useState({
    propertyValue: "",
    loanAmount: "",
    occupancy: "primary",
    creditScore: "",
    state: "",
    propertyType: "single_family",
    loanPurpose: "purchase",
    downPayment: "",
    income: "",
    employmentType: "full_time",
  });

  const { loading, searchMortgages, results } = useMortgageSearch();
  const [showResults, setShowResults] = useState(false);

  const ltv = calculateLTV(formData.propertyValue, formData.loanAmount);
  const downPaymentPercent = calculateDownPaymentPercent(formData.propertyValue, formData.downPayment);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowResults(true);
    
    const searchCriteria = {
      ...formData,
      ltv,
      downPaymentPercent,
    };

    await searchMortgages(searchCriteria);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Loan Match Form</h2>
          
          {/* Property Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Value ($)
              </label>
              <input
                type="number"
                value={formData.propertyValue}
                onChange={(e) => handleInputChange('propertyValue', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="500000"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loan Amount ($)
              </label>
              <input
                type="number"
                value={formData.loanAmount}
                onChange={(e) => handleInputChange('loanAmount', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="400000"
                required
              />
            </div>
          </div>

          {/* Calculated Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 p-3 rounded-md">
              <span className="text-sm font-medium text-blue-900">LTV: {ltv}%</span>
            </div>
            <div className="bg-green-50 p-3 rounded-md">
              <span className="text-sm font-medium text-green-900">Down Payment: {downPaymentPercent}%</span>
            </div>
          </div>

          {/* Occupancy */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Occupancy Type</label>
            <div className="flex space-x-4">
              {[
                { value: 'primary', label: 'Primary Residence' },
                { value: 'secondary', label: 'Secondary Home' },
                { value: 'investment', label: 'Investment Property' }
              ].map((option) => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    name="occupancy"
                    value={option.value}
                    checked={formData.occupancy === option.value}
                    onChange={(e) => handleInputChange('occupancy', e.target.value)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Additional Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Credit Score
              </label>
              <input
                type="number"
                value={formData.creditScore}
                onChange={(e) => handleInputChange('creditScore', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="740"
                min="300"
                max="850"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State
              </label>
              <select
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select State</option>
                <option value="CA">California</option>
                <option value="TX">Texas</option>
                <option value="FL">Florida</option>
                <option value="NY">New York</option>
                {/* Add more states as needed */}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Annual Income ($)
              </label>
              <input
                type="number"
                value={formData.income}
                onChange={(e) => handleInputChange('income', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="100000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Type
              </label>
              <select
                value={formData.propertyType}
                onChange={(e) => handleInputChange('propertyType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="single_family">Single Family</option>
                <option value="condo">Condominium</option>
                <option value="townhouse">Townhouse</option>
                <option value="multi_family">Multi-Family</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {loading ? 'Searching...' : 'Find Matching Lenders'}
          </button>
        </div>
      </form>

      {/* Results */}
      {showResults && (
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Matching Lenders</h3>
          {results.length > 0 ? (
            <div className="space-y-4">
              {results.map((lender, index) => (
                <div key={index} className="border border-gray-200 rounded-md p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-gray-900">{lender.name || `Lender ${index + 1}`}</h4>
                      <p className="text-sm text-gray-600">{lender.description || 'Competitive rates and terms'}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">{lender.rate || '6.75%'}</div>
                      <div className="text-sm text-gray-500">APR</div>
                    </div>
                  </div>
                  <div className="mt-2 flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      Est. Monthly Payment: <span className="font-medium">${lender.monthlyPayment || '2,847'}</span>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700">
                      Contact Lender
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-gray-500">
                {loading ? 'Searching for lenders...' : 'No matching lenders found. Try adjusting your criteria.'}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function calculateLTV(propertyValue, loanAmount) {
  const propVal = Number(propertyValue || 0);
  const loanAmt = Number(loanAmount || 0);
  if (propVal <= 0) return 0;
  return Math.round((loanAmt / propVal) * 1000) / 10;
}

function calculateDownPaymentPercent(propertyValue, downPayment) {
  const propVal = Number(propertyValue || 0);
  const downPmt = Number(downPayment || 0);
  if (propVal <= 0) return 0;
  return Math.round((downPmt / propVal) * 1000) / 10;
}
<<<<<<< HEAD
=======

>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

