<<<<<<< HEAD
import React, { useState } from 'react';
=======
ï»¿import React, { useState } from 'react';
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
import EscrowFeatureCard from "../components/EscrowFeatureCard";
import TitleSearchEngine from "../components/TitleSearchEngine";
import PropertyProfileCard from "../components/PropertyProfileCard";
import DocumentUploader from "../components/DocumentUploader";
import StatementOfIdentityForm from "../components/StatementOfIdentityForm";

// Example: import lenders from a JSON file, or replace this with your real data import
// import lenders from "../data/lenders.json";

export default function MortgageTabUS() {
  const [loanType, setLoanType] = useState('conventional');
  const [loanPurpose, setLoanPurpose] = useState('purchase');
  const [propertyType, setPropertyType] = useState('single');
  const [loanAmount, setLoanAmount] = useState('');
  const [creditScore, setCreditScore] = useState('740');
  const [results, setResults] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [escrowAccount, setEscrowAccount] = useState(null);
  const [showEscrow, setShowEscrow] = useState(false); // Control escrow feature card popup
  const [movingForwardLender, setMovingForwardLender] = useState(null);

  // Dummy lender data; replace with your real lenders.json import and match logic!
  const lenders = [
    { id: 1, name: 'Lender A', baseRate: 6.875 },
    { id: 2, name: 'Lender B', baseRate: 6.750 },
    { id: 3, name: 'Lender C', baseRate: 6.625 },
  ];

  function matchLenders() {
    const amount = parseFloat(loanAmount);
    if (!amount || amount < 50000) {
      alert('Please enter a valid loan amount (minimum $50,000)');
      return;
    }
    const creditAdj = creditScore < 700 ? 0.25 : creditScore < 740 ? 0.125 : 0;
    const ltvAdj = loanPurpose === 'cashout' ? 0.375 : 0;
    const matched = lenders.map(lender => ({
      ...lender,
      estimatedRate: (lender.baseRate + creditAdj + ltvAdj).toFixed(3),
      monthlyPayment: calculatePayment(amount, lender.baseRate + creditAdj + ltvAdj, 30)
    }));
    setResults(matched);
    setSelectedProperty({ address: "123 Main St, Example City" });
  }

  function calculatePayment(principal, annualRate, years) {
    const monthlyRate = annualRate / 100 / 12;
    const numPayments = years * 12;
    const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    return payment.toFixed(2);
  }

  function handleMoveForward(lender) {
    setMovingForwardLender(lender);
    setShowEscrow(true);
  }

  function handleEscrowOpened(account) {
    setEscrowAccount(account);
    setShowEscrow(false);
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-600 via-teal-600 to-blue-600 rounded-lg shadow-2xl p-8 text-white">
        <h1 className="text-4xl font-bold">US Mortgage Loan Search Engine</h1>
<<<<<<< HEAD
        <p className="text-xl">Real-Time Lender Matching  Professional Service</p>
        <p className="text-xl">Real-Time Lender Matching  Professional Service</p>
=======
        <p className="text-xl">Real-Time Lender Matching  Professional Service</p>
        <p className="text-xl">Real-Time Lender Matching  Professional Service</p>
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6">Loan Search Criteria</h2>
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block font-bold mb-2">Loan Type</label>
            <select value={loanType} onChange={e => setLoanType(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:border-green-500 focus:outline-none">
              <option value="conventional">Conventional</option>
              <option value="fha">FHA</option>
              <option value="va">VA</option>
              <option value="usda">USDA</option>
            </select>
          </div>
          <div>
            <label className="block font-bold mb-2">Loan Purpose</label>
            <select value={loanPurpose} onChange={e => setLoanPurpose(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:border-green-500 focus:outline-none">
              <option value="purchase">Purchase</option>
              <option value="refinance">Rate & Term Refinance</option>
              <option value="cashout">Cash-Out Refinance</option>
            </select>
          </div>
          <div>
            <label className="block font-bold mb-2">Property Type</label>
            <select value={propertyType} onChange={e => setPropertyType(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:border-green-500 focus:outline-none">
              <option value="single">Single Family Residence</option>
              <option value="condo">Condominium</option>
              <option value="multi">Multi-Family (2-4 units)</option>
              <option value="townhome">Townhome</option>
            </select>
          </div>
          <div>
            <label className="block font-bold mb-2">Loan Amount</label>
            <input type="number" value={loanAmount} onChange={e => setLoanAmount(e.target.value)}
              placeholder="Enter loan amount"
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:border-green-500 focus:outline-none" />
          </div>
          <div className="col-span-2">
            <label className="block font-bold mb-2">Credit Score Range</label>
            <select value={creditScore} onChange={e => setCreditScore(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:border-green-500 focus:outline-none">
              <option value="800">Excellent (740+)</option>
              <option value="720">Good (700-739)</option>
              <option value="680">Fair (660-699)</option>
              <option value="640">Below Average (620-659)</option>
              <option value="600">Poor (580-619)</option>
              <option value="560">Very Poor (Below 580)</option>
            </select>
          </div>
        </div>
        <button onClick={matchLenders}
          className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white py-4 rounded-lg font-bold text-xl flex items-center justify-center gap-3 shadow-lg transition-all">
          Find Matching Lenders
        </button>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold mb-4">Available Loan Options</h3>
          <div className="space-y-4">
            {results.map(result => (
              <div key={result.id} className="border-2 border-gray-200 rounded-lg p-6 hover:border-green-400 transition-all">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xl font-bold text-gray-800">{result.name}</h4>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Estimated Rate*</p>
                    <p className="text-3xl font-bold text-green-600">{result.estimatedRate}%</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-semibold">Estimated Monthly Payment:</span>
                    <span className="text-2xl font-bold text-gray-800">${result.monthlyPayment}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">*Principal & Interest only. Does not include taxes, insurance, or HOA.</p>
                </div>
                <div className="mt-4 text-right">
                  <button
                    onClick={() => handleMoveForward(result)}
                    className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-6 rounded-lg shadow transition"
                  >
                    Move Forward With {result.name}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Show Escrow Feature Card as a modal/popup when "Move Forward" is clicked */}
      {showEscrow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white rounded-xl p-8 shadow-2xl max-w-md w-full relative">
            <button
              className="absolute top-2 right-3 text-xl font-bold text-gray-500 hover:text-red-600"
              onClick={() => setShowEscrow(false)}
              aria-label="Close"
            >
<<<<<<< HEAD
              
              
=======
              
               
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
            </button>
            <EscrowFeatureCard
              property={selectedProperty}
              lender={movingForwardLender}
              onEscrowOpened={handleEscrowOpened}
            />
          </div>
        </div>
      )}

      {/* Escrow/Docs/Title workflow as usual */}
      <TitleSearchEngine onSelectTitleCompany={console.log} />
      {selectedProperty && <PropertyProfileCard property={selectedProperty} />}
      {escrowAccount && (
        <>
          <DocumentUploader escrowAccount={escrowAccount} onUpload={console.log} />
          <StatementOfIdentityForm escrowAccount={escrowAccount} />
        </>
      )}
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

