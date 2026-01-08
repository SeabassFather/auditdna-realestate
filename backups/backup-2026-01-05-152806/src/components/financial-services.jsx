import React, { useState } from 'react';
import { 
  DollarSign, TrendingUp, Activity, Globe, FileText,
  Download, Printer, Mail, Share2, Calculator, BarChart3, 
  AlertCircle, CheckCircle, ChevronDown, Calendar,
  Shield, Award, Eye
} from 'lucide-react';

const FinancialServicesModule = () => {
  const [activeTab, setActiveTab] = useState('factoring');
  const [showExportMenu, setShowExportMenu] = useState(false);

  const [factoringData, setFactoringData] = useState({
    invoiceAmount: '',
    advanceRate: 85,
    factoringFee: 3.5,
    paymentTerms: 30,
    creditRating: 'A'
  });

  const [paymentTermsData, setPaymentTermsData] = useState({
    invoiceAmount: '',
    standardTerms: 'NET30',
    discountRate: 2,
    discountDays: 10,
    netDays: 30
  });

  const [creditRiskData, setCreditRiskData] = useState({
    companyName: '',
    annualRevenue: '',
    yearsInBusiness: '',
    paymentHistory: 'excellent',
    industryRisk: 'low'
  });

  const [workingCapitalData, setWorkingCapitalData] = useState({
    currentAssets: '',
    currentLiabilities: '',
    inventory: '',
    receivables: '',
    payables: ''
  });

  const [currencyData, setCurrencyData] = useState({
    fromCurrency: 'USD',
    toCurrency: 'MXN',
    amount: ''
  });

  const tabs = [
    { id: 'factoring', name: 'Invoice Factoring', icon: DollarSign },
    { id: 'payment-terms', name: 'Payment Terms', icon: Calendar },
    { id: 'credit-risk', name: 'Credit Risk', icon: Shield },
    { id: 'working-capital', name: 'Working Capital', icon: TrendingUp },
    { id: 'currency', name: 'Currency Exchange', icon: Globe },
    { id: 'reports', name: 'Financial Reports', icon: FileText }
  ];

  const creditRatings = [
    { rating: 'AAA', fee: 2.5, advance: 90 },
    { rating: 'AA', fee: 3.0, advance: 87.5 },
    { rating: 'A', fee: 3.5, advance: 85 },
    { rating: 'BBB', fee: 4.5, advance: 82.5 },
    { rating: 'BB', fee: 6.0, advance: 80 },
    { rating: 'B', fee: 8.0, advance: 75 }
  ];

  const currencies = ['USD', 'MXN', 'EUR', 'GBP', 'CAD', 'JPY', 'CNY', 'BRL'];

  const exchangeRates = {
    'USD-MXN': 17.25,
    'USD-EUR': 0.92,
    'USD-GBP': 0.79,
    'USD-CAD': 1.36,
    'USD-JPY': 149.50,
    'USD-CNY': 7.24,
    'USD-BRL': 4.98,
    'MXN-USD': 0.058,
    'EUR-USD': 1.09,
    'GBP-USD': 1.27,
    'CAD-USD': 0.74,
    'JPY-USD': 0.0067,
    'CNY-USD': 0.138,
    'BRL-USD': 0.201
  };

  const calculateFactoring = () => {
    const amount = parseFloat(factoringData.invoiceAmount) || 0;
    const advance = amount * (factoringData.advanceRate / 100);
    const fee = amount * (factoringData.factoringFee / 100);
    const reserve = amount - advance;
    const netAdvance = advance - fee;
    
    return { advance, fee, reserve, netAdvance, amount };
  };

  const calculatePaymentTerms = () => {
    const amount = parseFloat(paymentTermsData.invoiceAmount) || 0;
    const discount = amount * (paymentTermsData.discountRate / 100);
    const netWithDiscount = amount - discount;
    const annualizedRate = (paymentTermsData.discountRate / (paymentTermsData.netDays - paymentTermsData.discountDays)) * 365;
    
    return { amount, discount, netWithDiscount, annualizedRate };
  };

  const calculateCreditScore = () => {
    let score = 600;
    const revenue = parseFloat(creditRiskData.annualRevenue) || 0;
    const years = parseFloat(creditRiskData.yearsInBusiness) || 0;
    
    if (revenue > 10000000) score += 100;
    else if (revenue > 5000000) score += 75;
    else if (revenue > 1000000) score += 50;
    
    if (years > 10) score += 80;
    else if (years > 5) score += 50;
    else if (years > 2) score += 30;
    
    if (creditRiskData.paymentHistory === 'excellent') score += 100;
    else if (creditRiskData.paymentHistory === 'good') score += 70;
    else if (creditRiskData.paymentHistory === 'fair') score += 40;
    
    if (creditRiskData.industryRisk === 'low') score += 20;
    else if (creditRiskData.industryRisk === 'medium') score += 10;
    
    return Math.min(850, score);
  };

  const calculateWorkingCapital = () => {
    const assets = parseFloat(workingCapitalData.currentAssets) || 0;
    const liabilities = parseFloat(workingCapitalData.currentLiabilities) || 0;
    const inventory = parseFloat(workingCapitalData.inventory) || 0;
    
    const workingCapital = assets - liabilities;
    const currentRatio = liabilities > 0 ? (assets / liabilities) : 0;
    const quickRatio = liabilities > 0 ? ((assets - inventory) / liabilities) : 0;
    
    return { workingCapital, currentRatio, quickRatio, assets, liabilities };
  };

  const convertCurrency = () => {
    const amount = parseFloat(currencyData.amount) || 0;
    const rateKey = currencyData.fromCurrency + '-' + currencyData.toCurrency;
    const rate = exchangeRates[rateKey] || 1;
    const converted = amount * rate;
    
    return { amount, rate, converted };
  };

  const handleExport = (type) => {
    if (type === 'pdf') {
      alert('PDF export functionality - integrate with jsPDF');
    } else if (type === 'excel') {
      alert('Excel export functionality - integrate with xlsx');
    } else if (type === 'print') {
      window.print();
    } else if (type === 'email') {
      alert('Email functionality');
    }
    setShowExportMenu(false);
  };

  const factoringResults = calculateFactoring();
  const paymentResults = calculatePaymentTerms();
  const creditScore = calculateCreditScore();
  const workingCapitalResults = calculateWorkingCapital();
  const currencyResults = convertCurrency();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-xl shadow-lg">
                <DollarSign className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Financial Services</h1>
                <p className="text-sm text-gray-600">Advanced financial tools and analytics</p>
              </div>
            </div>
            
            <div className="relative">
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition shadow-lg"
              >
                <Share2 size={18} />
                Export & Share
                <ChevronDown size={16} />
              </button>
              
              {showExportMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50">
                  <button onClick={() => handleExport('pdf')} className="w-full px-4 py-2.5 text-left hover:bg-blue-50 flex items-center gap-3 text-gray-700">
                    <Download size={18} className="text-red-600" />
                    <span className="font-medium">Export as PDF</span>
                  </button>
                  <button onClick={() => handleExport('excel')} className="w-full px-4 py-2.5 text-left hover:bg-green-50 flex items-center gap-3 text-gray-700">
                    <FileText size={18} className="text-green-600" />
                    <span className="font-medium">Export as Excel</span>
                  </button>
                  <button onClick={() => handleExport('print')} className="w-full px-4 py-2.5 text-left hover:bg-purple-50 flex items-center gap-3 text-gray-700">
                    <Printer size={18} className="text-purple-600" />
                    <span className="font-medium">Print Report</span>
                  </button>
                  <button onClick={() => handleExport('email')} className="w-full px-4 py-2.5 text-left hover:bg-yellow-50 flex items-center gap-3 text-gray-700">
                    <Mail size={18} className="text-yellow-600" />
                    <span className="font-medium">Email Report</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-semibold whitespace-nowrap border-b-4 transition ${
                    isActive
                      ? 'border-blue-600 text-blue-700 bg-blue-50'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={20} />
                  {tab.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {activeTab === 'factoring' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-green-100 p-3 rounded-xl">
                  <DollarSign className="text-green-700" size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Invoice Factoring Calculator</h2>
                  <p className="text-gray-600">Get immediate cash flow for your invoices</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Invoice Amount ($)</label>
                    <input
                      type="number"
                      value={factoringData.invoiceAmount}
                      onChange={(e) => setFactoringData({...factoringData, invoiceAmount: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none text-lg font-semibold"
                      placeholder="100000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Advance Rate: {factoringData.advanceRate}%
                    </label>
                    <input
                      type="range"
                      min="70"
                      max="95"
                      step="2.5"
                      value={factoringData.advanceRate}
                      onChange={(e) => setFactoringData({...factoringData, advanceRate: parseFloat(e.target.value)})}
                      className="w-full h-3 bg-green-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Factoring Fee: {factoringData.factoringFee}%
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      step="0.5"
                      value={factoringData.factoringFee}
                      onChange={(e) => setFactoringData({...factoringData, factoringFee: parseFloat(e.target.value)})}
                      className="w-full h-3 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Payment Terms (Days)</label>
                    <select
                      value={factoringData.paymentTerms}
                      onChange={(e) => setFactoringData({...factoringData, paymentTerms: parseInt(e.target.value)})}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 outline-none font-semibold"
                    >
                      <option value={15}>NET 15</option>
                      <option value={30}>NET 30</option>
                      <option value={45}>NET 45</option>
                      <option value={60}>NET 60</option>
                      <option value={90}>NET 90</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Client Credit Rating</label>
                    <select
                      value={factoringData.creditRating}
                      onChange={(e) => setFactoringData({...factoringData, creditRating: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 outline-none font-semibold"
                    >
                      {creditRatings.map(r => (
                        <option key={r.rating} value={r.rating}>{r.rating} - {r.fee}% fee</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Calculator className="text-green-600" size={24} />
                    Factoring Analysis
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-600">Invoice Amount</span>
                        <span className="text-2xl font-bold text-gray-900">
                          ${factoringResults.amount.toLocaleString('en-US', {minimumFractionDigits: 2})}
                        </span>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-600">Cash Advance</span>
                        <span className="text-2xl font-bold text-green-600">
                          ${factoringResults.advance.toLocaleString('en-US', {minimumFractionDigits: 2})}
                        </span>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-600">Factoring Fee</span>
                        <span className="text-xl font-bold text-red-600">
                          -${factoringResults.fee.toLocaleString('en-US', {minimumFractionDigits: 2})}
                        </span>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-4 shadow-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-white">Net Cash Received</span>
                        <span className="text-3xl font-bold text-white">
                          ${factoringResults.netAdvance.toLocaleString('en-US', {minimumFractionDigits: 2})}
                        </span>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-600">Reserve</span>
                        <span className="text-xl font-bold text-blue-600">
                          ${factoringResults.reserve.toLocaleString('en-US', {minimumFractionDigits: 2})}
                        </span>
                      </div>
                    </div>

                    <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                        <div className="text-sm text-blue-900">
                          <p className="font-semibold mb-1">Instant Cash Flow</p>
                          <p>Receive funds within 24-48 hours</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'currency' && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-yellow-100 p-3 rounded-xl">
                <Globe className="text-yellow-700" size={28} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Currency Exchange</h2>
                <p className="text-gray-600">Real-time multi-currency conversion</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Amount</label>
                  <input
                    type="number"
                    value={currencyData.amount}
                    onChange={(e) => setCurrencyData({...currencyData, amount: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-yellow-500 outline-none text-lg font-semibold"
                    placeholder="10000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">From Currency</label>
                  <select
                    value={currencyData.fromCurrency}
                    onChange={(e) => setCurrencyData({...currencyData, fromCurrency: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-yellow-500 outline-none font-semibold"
                  >
                    {currencies.map(curr => (
                      <option key={curr} value={curr}>{curr}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">To Currency</label>
                  <select
                    value={currencyData.toCurrency}
                    onChange={(e) => setCurrencyData({...currencyData, toCurrency: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-yellow-500 outline-none font-semibold"
                  >
                    {currencies.map(curr => (
                      <option key={curr} value={curr}>{curr}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-6 border-2 border-yellow-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Conversion Result</h3>
                
                <div className="space-y-4">
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="text-sm font-medium text-gray-600 mb-2">Original Amount</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {currencyData.fromCurrency} {currencyResults.amount.toLocaleString('en-US', {minimumFractionDigits: 2})}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="text-sm font-medium text-gray-600 mb-2">Exchange Rate</div>
                    <div className="text-xl font-bold text-blue-600">
                      {currencyResults.rate.toFixed(4)}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-yellow-600 to-amber-600 rounded-xl p-4 shadow-lg">
                    <div className="text-sm font-semibold text-white mb-2">Converted Amount</div>
                    <div className="text-3xl font-bold text-white">
                      {currencyData.toCurrency} {currencyResults.converted.toLocaleString('en-US', {minimumFractionDigits: 2})}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-indigo-100 p-3 rounded-xl">
                <FileText className="text-indigo-700" size={28} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Financial Reports Dashboard</h2>
                <p className="text-gray-600">Comprehensive financial analytics</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
                <BarChart3 className="text-green-600 mb-3" size={32} />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Cash Flow Analysis</h3>
                <p className="text-sm text-gray-600 mb-4">Track cash flows</p>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg">
                  Generate Report
                </button>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6">
                <TrendingUp className="text-blue-600 mb-3" size={32} />
                <h3 className="text-lg font-bold text-gray-900 mb-2">AR Aging Report</h3>
                <p className="text-sm text-gray-600 mb-4">Outstanding receivables</p>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg">
                  Generate Report
                </button>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6">
                <DollarSign className="text-purple-600 mb-3" size={32} />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Profitability Analysis</h3>
                <p className="text-sm text-gray-600 mb-4">Profit margins</p>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg">
                  Generate Report
                </button>
              </div>
            </div>

            <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Award className="text-indigo-600" size={28} />
                  <h3 className="text-xl font-bold text-gray-900">Executive Dashboard</h3>
                </div>
                <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold">
                  <Eye size={18} />
                  View Dashboard
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancialServicesModule;

