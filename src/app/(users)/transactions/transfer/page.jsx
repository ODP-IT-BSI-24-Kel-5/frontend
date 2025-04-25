'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function TransferPage() {
  const [showBalance, setShowBalance] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedRecipient, setSelectedRecipient] = useState(null);

  const accounts = [
    { id: 1, name: 'Payment Account', balance: 'Rp. 10.000.000,00' },
    { id: 2, name: 'Savings Account', balance: 'Rp. 5.000.000,00' },
  ];

  const recipients = [
    { id: 1, name: 'John Doe - 1234567890' },
    { id: 2, name: 'Jane Smith - 0987654321' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Transfer</h2>

      {/* Recipient */}
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text font-semibold">Recipient</span>
        </label>
        <select
          className="select select-lg select-bordered w-full"
          onChange={(e) => setSelectedRecipient(e.target.value)}
        >
          <option value="">Choose Recipient</option>
          {recipients.map((r) => (
            <option key={r.id} value={r.name}>
              {r.name}
            </option>
          ))}
        </select>
      </div>

      {/* Amount */}
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text font-semibold">Amount</span>
        </label>
        <input
          type="number"
          placeholder="Rp."
          className="input input-lg input-bordered w-full appearance-none"
        />
      </div>

      {/* Account Selection */}
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text font-semibold">Choose Account</span>
        </label>
        <select
          className="select select-lg select-bordered w-full"
          onChange={(e) => setSelectedAccount(e.target.value)}
        >
          <option value="">Select Account</option>
          {accounts.map((a) => (
            <option key={a.id} value={a.name}>
              {a.name}
            </option>
          ))}
        </select>

        {selectedAccount && (
          <div className="flex justify-between items-center mt-2">
            <p className="text-sm text-gray-700">{selectedAccount}</p>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="btn btn-ghost btn-sm"
            >
              {showBalance ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
            </button>
          </div>
        )}

        {showBalance && selectedAccount && (
          <p className="text-sm text-gray-700 mt-1">
            Balance: {accounts.find((a) => a.name === selectedAccount)?.balance}
          </p>
        )}
      </div>

      {/* Note */}
      <div className="form-control mb-4">
        <input
          type="text"
          placeholder="Add note"
          className="input input-lg input-bordered w-full"
        />
      </div>

      {/* Transfer Button */}
      <button className="text-lg btn btn-disabled w-full">
        Transfer
      </button>
    </div>
  );
}
