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
import lenders from "../data/lenders.json"; // Place your lenders.json in src/data/

// Utility for converting 0 => A, 1 => B, etc.
const optionLetter = i => String.fromCharCode(65 + i);

export default function MortgageTabUS() {
  const [searchEngine, setSearchEngine] = useState('us-mortgage');
  const [loanType, setLoanType] = useState('conventional');
  const [loanPurpose, setLoanPurpose] = useState('purchase');
  const [propertyType, setPropertyType] = useState('single');
  const [loanAmount, setLoanAmount] = useState('');
  const [creditScore, setCreditScore] = useState('740');
  const [propertyCountry, setPropertyCountry] = useState('USA');
  const [results, setResults] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [escrowAccount, setEscrowAccount] = useState(null);
  const [showEscrow, setShowEscrow] = useState(false);
  const [movingForwardLender, setMovingForwardLender] = useState(null);

  // --- Lender Matching Logic ---
  function matchLenders() {
    const amount = parseFloat(loanAmount);
    const fico = parseInt(creditScore);

    if (!amount || amount < 50000) {
      alert('Please enter a valid loan amount (minimum $50,000)');
      return;
    }

    // For Mexico Financing
    if (searchEngine === "mexico-financing") {
      // Only show Mexico Financing options, using "Moxxi" logic (never display their name)
      const mexicoLender = lenders.find(
        l =>
          Array.isArray(l.programs) &&
          l.programs.includes("MEXICO_PURCHASE") &&
          l.country === "Mexico"
      );
      if (!mexicoLender) {
        setResults([]);
        return;
      }
      // Check FICO and loan amount
      const minFico = (mexicoLender.minFICO && mexicoLender.minFICO["MEXICO_PURCHASE"]) || 680;
      const minLoan = mexicoLender.minLoan || 100000;
      const maxLoan = mexicoLender.maxLoan || 2000000;
      if (fico < minFico || amount < minLoan || amount > maxLoan) {
        setResults([]);
        return;
      }
      setResults([
        {
          ...mexicoLender,
          estimatedRate: "Ask for Quote",
          monthlyPayment: "Ask for Quote",
          notes: "Mexico Financing available for US citizens. US credit/income/asset verification required. Underwritten to international lending standards. Close in Mexico."
        }
      ]);
      setSelectedProperty({ address: "Mexico Property (Details Provided at Application)" });
      return;
    }

    // US Mortgage Matching
    const programKey = loanType.toUpperCase();
    const realLenders = lenders.filter(lender =>
      Array.isArray(lender.programs) &&
      lender.programs.map(p => p.toUpperCase()).includes(programKey) &&
      (!lender.country || lender.country === "USA")
    );

    const matches = realLenders
      .filter(lender => {
        let minFico = 0;
        if (lender.minFICO && lender.minFICO[programKey]) {
          minFico = lender.minFICO[programKey];
        } else if (
          typeof lender.compPercent_guess === "number" &&
          lender.compPercent_guess > 100 &&
          lender.compPercent_guess < 900
        ) {
          minFico = lender.compPercent_guess;
        }
        if (fico < minFico) return false;
        // Optionally add loanAmount and propertyType filters
        return true;
      })
      .map(lender => {
        // Example pricing logic (replace with your own as needed)
        const baseRate = lender.baseRate || 7.25;
        const creditAdj = fico < 700 ? 0.25 : fico < 740 ? 0.125 : 0;
        const ltvAdj = loanPurpose === 'cashout' ? 0.375 : 0;
        const estRate = (baseRate + creditAdj + ltvAdj).toFixed(3);
        const payment = calculatePayment(amount, baseRate + creditAdj + ltvAdj, 30);
        return {
          ...lender,
          estimatedRate: estRate,
          monthlyPayment: payment,
          notes: lender.notes_excerpt
        };
      });

    // Optionally, rank/sort by estRate, compPercent, etc.
    matches.sort((a, b) => parseFloat(a.estimatedRate) - parseFloat(b.estimatedRate));
    setResults(matches);
    setSelectedProperty({ address: "123 Main St, Example City" });
  }

  function calculatePayment(principal, annualRate, years) {
    const monthlyRate = annualRate / 100 / 12;
    const numPayments = years * 12;
    const payment =
      principal *
      (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);
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

  // --- UI ---
  return (
    <div className="space-y-8 pb-12">
      {/* Search Engine Selector */}
      <div className="flex justify-start items-center gap-8 mb-4">
        <label className="text-lg font-bold">Search Engine:</label>
        <select
          value={searchEngine}
          onChange={e => {
            setSearchEngine(e.target.value);
            setResults([]);
            setSelectedProperty(null);
            setEscrowAccount(null);
            setShowEscrow(false);
          }}
          className="border-2 border-gray-400 rounded-lg px-4 py-2 text-lg"
        >
          <option value="us-mortgage">US Mortgage Loans</option>
          <option value="mexico-financing">Mexico Financing (US Citizens Only)</option>
        </select>
      </div>

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

      {/* Loan Search Form */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6">Loan Search Criteria</h2>
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Show only for US or Mexico as appropriate */}
          {searchEngine === "us-mortgage" && (
            <>
              <div>
                <label className="block font-bold mb-2">Loan Type</label>
                <select
                  value={loanType}
                  onChange={e => setLoanType(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:border-green-500 focus:outline-none"
                >
                  <option value="conventional">Conventional</option>
                  <option value="fha">FHA</option>
                  <option value="va">VA</option>
                  <option value="usda">USDA</option>
                  <option value="dscr">DSCR</option>
                  <option value="non-qm">Non-QM</option>
                </select>
              </div>
              <div>
                <label className="block font-bold mb-2">Loan Purpose</label>
                <select
                  value={loanPurpose}
                  onChange={e => setLoanPurpose(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:border-green-500 focus:outline-none"
                >
                  <option value="purchase">Purchase</option>
                  <option value="refinance">Rate & Term Refinance</option>
                  <option value="cashout">Cash-Out Refinance</option>
                </select>
              </div>
              <div>
                <label className="block font-bold mb-2">Property Type</label>
                <select
                  value={propertyType}
                  onChange={e => setPropertyType(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:border-green-500 focus:outline-none"
                >
                  <option value="single">Single Family Residence</option>
                  <option value="condo">Condominium</option>
                  <option value="multi">Multi-Family (2-4 units)</option>
                  <option value="townhome">Townhome</option>
                </select>
              </div>
              <div>
                <label className="block font-bold mb-2">Property Country</label>
                <select
                  value={propertyCountry}
                  onChange={e => setPropertyCountry(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:border-green-500 focus:outline-none"
                >
                  <option value="USA">USA</option>
                  <option value="Mexico">Mexico</option>
                </select>
              </div>
            </>
          )}
          {searchEngine === "mexico-financing" && (
            <>
              <div>
                <label className="block font-bold mb-2">Property Country</label>
                <select
                  disabled
                  value="Mexico"
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg bg-gray-100"
                >
                  <option value="Mexico">Mexico</option>
                </select>
              </div>
              <div>
                <label className="block font-bold mb-2">Borrower Citizenship</label>
                <select
                  disabled
                  value="US Citizen"
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg bg-gray-100"
                >
                  <option value="US Citizen">US Citizen</option>
                </select>
              </div>
            </>
          )}
          {/* Common fields */}
          <div>
            <label className="block font-bold mb-2">Loan Amount</label>
            <input
              type="number"
              value={loanAmount}
              onChange={e => setLoanAmount(e.target.value)}
              placeholder="Enter loan amount"
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:border-green-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block font-bold mb-2">Credit Score Range</label>
            <select
              value={creditScore}
              onChange={e => setCreditScore(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:border-green-500 focus:outline-none"
            >
              <option value="800">Excellent (740+)</option>
              <option value="720">Good (700-739)</option>
              <option value="680">Fair (660-699)</option>
              <option value="640">Below Average (620-659)</option>
              <option value="600">Poor (580-619)</option>
              <option value="560">Very Poor (Below 580)</option>
            </select>
          </div>
        </div>
        <button
          onClick={matchLenders}
          className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white py-4 rounded-lg font-bold text-xl flex items-center justify-center gap-3 shadow-lg transition-all"
        >
          {searchEngine === 'mexico-financing'
            ? 'Find Mexico Financing Options'
            : 'Find Matching Lenders'}
        </button>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold mb-4">
            {searchEngine === 'mexico-financing'
              ? "Available Mexico Financing Option"
              : "Available Loan Options"}
          </h3>
          <div className="space-y-6">
            {results.map((result, idx) => (
              <div key={idx} className="border-2 border-gray-200 rounded-lg p-6 hover:border-green-400 transition-all">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-3 py-1 rounded-full text-sm font-bold mr-2">
                      Option {optionLetter(idx)}
                    </span>
                    <h4 className="inline text-xl font-bold text-gray-800">
                      {searchEngine === 'mexico-financing'
                        ? "Mexico Financing"
                        : "Lender Option"}
                    </h4>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Estimated Rate*</p>
                    <p className="text-3xl font-bold text-green-600">{result.estimatedRate}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-semibold">Estimated Monthly Payment:</span>
                    <span className="text-2xl font-bold text-gray-800">{result.monthlyPayment}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    *Principal & Interest only. Does not include taxes, insurance, or HOA.<br />
                    {result.notes}
                  </p>
                </div>
                <div className="mt-4 text-right">
                  <button
                    onClick={() => handleMoveForward(result)}
                    className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-6 rounded-lg shadow transition"
                  >
                    Move Forward With Option {optionLetter(idx)}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Escrow Modal: pops up when a consumer clicks "Move Forward" */}
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
              isMexico={searchEngine === "mexico-financing"}
            />
          </div>
        </div>
      )}

      {/* Downstream workflow */}
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

