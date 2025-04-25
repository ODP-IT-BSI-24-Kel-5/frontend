"use client";

import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

export default function ScanQrTab() {
  const [selectedAccount, setSelectedAccount] = useState({
    name: "Payment Account",
    balance: "Rp. 10,000,000.00"
  });

  return (
    <div className="p-4">
      <div className="mb-4">
        <h2 className="text-sm text-gray-600 mb-2">Choose Accounts</h2>
        <button 
          className="w-full bg-white rounded-lg p-4 shadow-sm border flex items-center justify-between"
          onClick={() => {/* Handle account selection */}}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-lg"></div>
            <div>
              <p className="text-sm">{selectedAccount.name}</p>
              <p className="text-sm font-semibold">{selectedAccount.balance}</p>
            </div>
          </div>
          <ChevronRight className="text-gray-400" />
        </button>
      </div>

      <button 
        className="w-full bg-emerald-500 text-white py-3 rounded-lg font-medium"
        onClick={() => {/* Handle QR generation */}}
      >
        Generate QR
      </button>
    </div>
  );
}