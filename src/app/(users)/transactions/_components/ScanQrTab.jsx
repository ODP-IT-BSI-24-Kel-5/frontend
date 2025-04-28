"use client";

import { useState } from 'react';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

export default function ScanQrTab() {
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [showBalance, setShowBalance] = useState(true);
  const [selectedAccountId, setSelectedAccountId] = useState("1");

  const accounts = [
    {
      id: "1",
      name: "Payment Account",
      balance: "Rp. 10.000.000,00",
      image: "/walletCards.png",
    },
    {
      id: "2",
      name: "Savings Account",
      balance: "Rp. 5.000.000,00",
      image: "/walletCards.png",
    },
    {
      id: "3",
      name: "Emergency Fund",
      balance: "Rp. 2.000.000,00",
      image: "/walletCards.png",
    },
    {
      id: "4",
      name: "Investment Account",
      balance: "Rp. 15.000.000,00",
      image: "/walletCards.png",
    },
    {
      id: "5",
      name: "Holiday Budget",
      balance: "Rp. 1.500.000,00",
      image: "/walletCards.png",
    },
  ];

  const selectedAccount = accounts.find(account => account.id === selectedAccountId);

  return (
    <div className="p-4">
      <div className="mb-4">
        <h2 className="text-sm text-gray-600 mb-2">Choose Accounts</h2>
        <button
          className="w-full bg-white rounded-lg p-4 shadow-sm border flex items-center justify-between"
          onClick={() => setShowAccountDropdown(!showAccountDropdown)}
        >

          <div className="flex items-center gap-3">
            <div className="w-12 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              {/* Ganti div ini dengan Image jika sudah ada asset */}
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
          </div>

          <div className="flex items-center gap-2">
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
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </button>
      

        {showAccountDropdown && (
          <ul className="absolute z-20 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-2 max-h-64 overflow-auto">
            {accounts.map((account) => (
              <li
                key={account.id}
                onClick={() => {
                  setSelectedAccountId(account.id);
                  setShowAccountDropdown(false);
                }}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer"
              >
                <Image
                  src={account.image}
                  alt={account.name}
                  width={48}
                  height={32}
                  className="rounded-lg"
                />
                <div>
                  <p className="font-medium">{account.name}</p>
                  <p className="text-sm text-gray-600">{account.balance}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div >

      <button
        className="w-full bg-emerald-500 text-white py-3 rounded-lg font-medium hover:bg-emerald-600 transition-colors"
        onClick={() => {/* Handle QR generation */ }}
      >
        Generate QR
      </button>
    </div >
  );
}