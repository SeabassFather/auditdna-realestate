<<<<<<< HEAD
import React, { useState } from 'react';
=======
ï»¿import React, { useState } from 'react';
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
import { 
  X, Send, FileText, DollarSign, Calendar, Truck, CheckCircle, 
  AlertCircle, Clock, MessageSquare, Upload, Download, Edit, Shield
} from 'lucide-react';
import { predictShipping } from '../utils/aiMatchmaking';

export default function DealRoomModal({ grower, onClose }) {
  const [activeStep, setActiveStep] = useState(0);
  const [dealData, setDealData] = useState({
    commodity: '',
    quantity: '',
    pricePerUnit: '',
    totalValue: '',
    deliveryDate: '',
    incoterms: 'FOB',
    paymentTerms: 'Net 30',
    qualitySpec: '',
    packagingSpec: '',
    deliveryLocation: '',
    specialRequirements: ''
  });
  const [messages, setMessages] = useState([
    {
      sender: 'system',
      text: `Deal room initiated with ${grower.companyName}. Please specify your requirements.`,
      timestamp: new Date().toISOString()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [documents, setDocuments] = useState([]);

  const steps = [
    { id: 0, label: 'Initiate', icon: MessageSquare },
    { id: 1, label: 'Negotiate', icon: Edit },
    { id: 2, label: 'Documentation', icon: FileText },
    { id: 3, label: 'E-Sign', icon: CheckCircle },
    { id: 4, label: 'Logistics', icon: Truck }
  ];

  const handleInputChange = (field, value) => {
    const updated = { ...dealData, [field]: value };
    
    // Auto-calculate total value
    if (field === 'quantity' || field === 'pricePerUnit') {
      const qty = parseFloat(field === 'quantity' ? value : updated.quantity) || 0;
      const price = parseFloat(field === 'pricePerUnit' ? value : updated.pricePerUnit) || 0;
      updated.totalValue = (qty * price).toFixed(2);
    }
    
    setDealData(updated);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    setMessages([...messages, {
      sender: 'buyer',
      text: newMessage,
      timestamp: new Date().toISOString()
    }]);
    setNewMessage('');
    
    // Simulate grower response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        sender: 'grower',
        text: 'Thank you for your inquiry. We can fulfill this order. Let me review the specifications.',
        timestamp: new Date().toISOString()
      }]);
    }, 2000);
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setDocuments([...documents, ...files.map(f => ({
      name: f.name,
      size: f.size,
      type: f.type,
      uploadedAt: new Date().toISOString()
    }))]);
  };

  const handleAdvanceStep = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleInitiateESign = () => {
    alert('Redirecting to DocuSign for e-signature...');
    // In production, integrate with DocuSign API
  };

  const shippingPrediction = dealData.deliveryLocation ? 
    predictShipping(
      grower.location,
      { coordinates: { lat: 0, lng: 0 }, city: dealData.deliveryLocation },
      dealData.commodity
    ) : null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Deal Room</h2>
              <p className="text-blue-100">Negotiating with {grower.companyName}</p>
            </div>
            <button
              onClick={onClose}
              className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition"
            >
              <X size={24} />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mt-6">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = idx === activeStep;
              const isCompleted = idx < activeStep;
              
              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div className={`rounded-full p-2 ${
                      isActive ? 'bg-white text-blue-600' : 
                      isCompleted ? 'bg-green-500 text-white' : 
                      'bg-white/20 text-white/60'
                    }`}>
                      <Icon size={20} />
                    </div>
                    <span className={`text-xs mt-1 ${
                      isActive ? 'text-white font-medium' : 'text-white/70'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className={`h-0.5 flex-1 ${
                      isCompleted ? 'bg-green-500' : 'bg-white/20'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
            {/* Left Column - Deal Details */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Deal Specifications</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Commodity</label>
                    <select
                      value={dealData.commodity}
                      onChange={(e) => handleInputChange('commodity', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select commodity</option>
                      {grower.commodities.map((c, i) => (
                        <option key={i} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Quantity (lbs)</label>
                      <input
                        type="number"
                        value={dealData.quantity}
                        onChange={(e) => handleInputChange('quantity', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="10000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price/Unit ($)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={dealData.pricePerUnit}
                        onChange={(e) => handleInputChange('pricePerUnit', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="1.50"
                      />
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Total Value</span>
                      <span className="text-2xl font-bold text-blue-600">
                        ${dealData.totalValue || '0.00'}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Date</label>
                    <input
                      type="date"
                      value={dealData.deliveryDate}
                      onChange={(e) => handleInputChange('deliveryDate', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Incoterms</label>
                      <select
                        value={dealData.incoterms}
                        onChange={(e) => handleInputChange('incoterms', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="FOB">FOB</option>
                        <option value="CIF">CIF</option>
                        <option value="EXW">EXW</option>
                        <option value="DDP">DDP</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Payment Terms</label>
                      <select
                        value={dealData.paymentTerms}
                        onChange={(e) => handleInputChange('paymentTerms', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Net 7">Net 7</option>
                        <option value="Net 14">Net 14</option>
                        <option value="Net 21">Net 21</option>
                        <option value="Net 30">Net 30</option>
                        <option value="Net 45">Net 45</option>
                        <option value="Net 60">Net 60</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Location</label>
                    <input
                      type="text"
                      value={dealData.deliveryLocation}
                      onChange={(e) => handleInputChange('deliveryLocation', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="City, State"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quality Specifications</label>
                    <textarea
                      value={dealData.qualitySpec}
                      onChange={(e) => handleInputChange('qualitySpec', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="2"
                      placeholder="Grade A, No defects..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Special Requirements</label>
                    <textarea
                      value={dealData.specialRequirements}
                      onChange={(e) => handleInputChange('specialRequirements', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="2"
                      placeholder="Cold chain required, specific packaging..."
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Prediction */}
              {shippingPrediction && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Truck className="text-green-600" size={20} />
                    Shipping Prediction
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Transport Mode:</span>
                      <span className="font-medium">{shippingPrediction.transportMode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Distance:</span>
                      <span className="font-medium">{shippingPrediction.distance.miles} miles</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">ETA:</span>
                      <span className="font-medium">{shippingPrediction.eta.days} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Est. Cost:</span>
                      <span className="font-medium">
                        ${shippingPrediction.estimatedCost.low} - ${shippingPrediction.estimatedCost.high}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Communication & Docs */}
            <div className="space-y-6">
              {/* Messages */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Messages</h3>
                <div className="bg-gray-50 rounded-lg p-4 h-64 overflow-y-auto mb-3">
                  {messages.map((msg, i) => (
                    <div key={i} className={`mb-3 ${msg.sender === 'buyer' ? 'text-right' : ''}`}>
                      <div className={`inline-block max-w-[80%] rounded-lg px-4 py-2 ${
                        msg.sender === 'system' ? 'bg-blue-100 text-blue-800' :
                        msg.sender === 'buyer' ? 'bg-green-600 text-white' :
                        'bg-gray-200 text-gray-800'
                      }`}>
                        <p className="text-sm">{msg.text}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Type a message..."
                  />
                  <button
                    onClick={handleSendMessage}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>

              {/* Documents */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Documents</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                  <p className="text-sm text-gray-600 mb-2">Upload purchase orders, specifications, or other documents</p>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
                  >
                    Choose Files
                  </label>
                </div>
                
                {documents.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {documents.map((doc, i) => (
                      <div key={i} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center gap-3">
                          <FileText className="text-blue-600" size={20} />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                            <div className="text-xs text-gray-500">{(doc.size / 1024).toFixed(1)} KB</div>
                          </div>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                          <Download size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* E-Signature */}
              {activeStep >= 3 && (
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Shield className="text-purple-600" size={20} />
                    E-Signature Ready
                  </h4>
                  <p className="text-sm text-gray-700 mb-3">
                    Contract is ready for electronic signature via DocuSign
                  </p>
                  <button
                    onClick={handleInitiateESign}
                    className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition font-medium"
                  >
                    Sign with DocuSign
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t px-6 py-4 bg-gray-50">
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium"
            >
              Save & Close
            </button>
            <div className="flex gap-3">
              {activeStep > 0 && (
                <button
                  onClick={() => setActiveStep(activeStep - 1)}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
                >
                  Back
                </button>
              )}
              <button
                onClick={handleAdvanceStep}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                {activeStep < steps.length - 1 ? 'Next Step' : 'Complete Deal'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
<<<<<<< HEAD
=======

>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

