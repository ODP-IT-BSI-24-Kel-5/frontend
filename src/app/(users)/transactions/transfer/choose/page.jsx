"use client";

import { useState } from "react";
import { ChevronRight, Eye, EyeOff } from "lucide-react";
import Image from "next/image";

export default function TransferPage() {
  const [showBalance, setShowBalance] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const accounts = [
    {
      id: 1,
      name: "Payment Account",
      balance: "Rp. 10.000.000,00",
      image: "/walletCards.png",
    },
    {
      id: 2,
      name: "Savings Account",
      balance: "Rp. 5.000.000,00",
      image: "/walletCards.png",
    },
  ];

  const recipients = [
    { id: 1, name: "John Doe - 1234567890" },
    { id: 2, name: "Jane Smith - 0987654321" },
  ];

  const handleAccountSelection = (account) => {
    setSelectedAccount(account);
    setShowAccountDropdown(false);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Transfer</h1>
      
      <div className="space-y-6">
        {/* Recipient Selection */}
        <div>
          <h2 className="text-sm text-gray-600 mb-2">Recipient</h2>
          <div className="relative">
            <button
              className="w-full bg-white rounded-lg p-4 shadow-sm border flex items-center justify-between"
              onClick={() => setShowAccountDropdown(false)}
            >
              <span className="text-gray-700">Choose Recipient</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Amount Input */}
        <div>
          <h2 className="text-sm text-gray-600 mb-2">Amount</h2>
          <div className="w-full bg-white rounded-lg p-4 shadow-sm border">
            <div className="flex items-center">
              <span className="text-gray-500 mr-2">Rp.</span>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                className="w-full outline-none"
              />
            </div>
          </div>
        </div>

        {/* Account Selection */}
        <div>
          <h2 className="text-sm text-gray-600 mb-2">Choose Account</h2>
          <div className="relative">
            <button
              className="w-full bg-white rounded-lg p-4 shadow-sm border flex items-center justify-between"
              onClick={() => setShowAccountDropdown(!showAccountDropdown)}
            >
              <div className="flex items-center gap-3">
                {selectedAccount ? (
                  <>
                    <div className="w-12 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                      <Image
                        src={selectedAccount.image}
                        alt="Card"
                        width={48}
                        height={32}
                        className="rounded-lg"
                      />
                    </div>
                    <div>
                      <p className="text-sm">{selectedAccount.name}</p>
                      <p className="text-sm font-semibold">
                        {showBalance ? selectedAccount.balance : "••••••••••••••"}
                      </p>
                    </div>
                  </>
                ) : (
                  <span className="text-gray-700">Select Account</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {selectedAccount && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowBalance(!showBalance);
                    }}
                  >
                    {showBalance ? (
                      <Eye className="w-5 h-5 text-gray-600" />
                    ) : (
                      <EyeOff className="w-5 h-5 text-gray-600" />
                    )}
                  </button>
                )}
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </button>

            {/* Account Dropdown */}
            {showAccountDropdown && (
              <ul className="absolute z-20 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-2 max-h-64 overflow-auto">
                {accounts.map((account) => (
                  <li
                    key={account.id}
                    onClick={() => handleAccountSelection(account)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer"
                  >
                    <div className="w-12 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                      <Image
                        src={account.image}
                        alt="Card"
                        width={48}
                        height={32}
                        className="rounded-lg"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{account.name}</p>
                      <p className="text-sm text-gray-600">{account.balance}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Note Input */}
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add note"
          className="w-full p-4 border rounded-lg outline-none"
        />

        {/* Transfer Button */}
        <button
          className={`w-full py-4 rounded-lg font-medium transition-colors ${
            selectedAccount
              ? "bg-emerald-500 text-white hover:bg-emerald-600"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
          disabled={!selectedAccount}
        >
          Transfer
        </button>
      </div>
    </div>
  );
}