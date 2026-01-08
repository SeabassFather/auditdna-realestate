import React, { useState } from 'react';
import { Shield, Lock } from 'lucide-react';

/**
 * EscrowIntegration Component - Escrow service integration for secure transactions
 */
const EscrowIntegration = () => {
  const [escrowAmount, setEscrowAmount] = useState('');
  const [buyerName, setBuyerName] = useState('');
  const [sellerName, setSellerName] = useState('');
  const [creating, setCreating] = useState(false);

  const handleCreateEscrow = () => {
    if (!escrowAmount || !buyerName || !sellerName) {
      alert('Please fill in all fields');
      return;
    }

    setCreating(true);
    // TODO: Implement actual escrow creation logic
    setTimeout(() => {
      setCreating(false);
      alert('Escrow account created successfully!');
    }, 1500);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Shield size={24} />
        Escrow Integration
      </h3>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-2">
          <Lock size={20} className="text-blue-600 mt-0.5" />
          <p className="text-sm text-blue-800">
            Secure escrow services protect both buyers and sellers by holding funds until transaction terms are met.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Escrow Amount
          </label>
          <input
            type="number"
            value={escrowAmount}
            onChange={(e) => setEscrowAmount(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3"
            placeholder="$0.00"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Buyer Name
          </label>
          <input
            type="text"
            value={buyerName}
            onChange={(e) => setBuyerName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3"
            placeholder="Buyer Company Name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Seller Name
          </label>
          <input
            type="text"
            value={sellerName}
            onChange={(e) => setSellerName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3"
            placeholder="Seller Company Name"
          />
        </div>

        <button
          onClick={handleCreateEscrow}
          disabled={creating}
          className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {creating ? 'Creating Escrow...' : 'Create Escrow Account'}
        </button>
      </div>
    </div>
  );
};

export default EscrowIntegration;

