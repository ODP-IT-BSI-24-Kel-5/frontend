"use client";

import { useState } from "react";
import { ChevronRight, Eye, EyeOff } from "lucide-react";
import Image from "next/image";

export default function TransferInputPage() {
  const [showBalance, setShowBalance] = useState(true);
  const [walledNumber, setWalledNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const handleTransfer = () => {
    // Implementasi logic transfer
    console.log("Transfer:", { walledNumber, amount, note });
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <div className="space-y-6">
        {/* Recipient Input */}
        <div>
          <h2 className="text-sm text-gray-600 mb-2">Recipient</h2>
          <div className="w-full bg-white rounded-lg p-4 shadow-sm border">
            <input
              type="text"
              value={walledNumber}
              onChange={(e) => setWalledNumber(e.target.value)}
              placeholder="Input Walled Number"
              className="w-full outline-none"
            />
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

        {/* Choose Account */}
        <div>
          <h2 className="text-sm text-gray-600 mb-2">Choose Accounts</h2>
          <button className="w-full bg-white rounded-lg p-4 shadow-sm border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                <Image
                  src="/walletCards.png"
                  alt="Card"
                  width={48}
                  height={32}
                  className="rounded-lg"
                />
              </div>
              <div>
                <p className="text-sm">Payment Account</p>
                <p className="text-sm font-semibold">
                  {showBalance ? "Rp. 10.000.000,00" : "••••••••••••••"}
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="flex items-center gap-2"
            >
              {showBalance ? (
                <Eye className="w-5 h-5 text-gray-600" />
              ) : (
                <EyeOff className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </button>
        </div>

        {/* Note Input */}
        <div>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add note"
            className="w-full p-4 border rounded-lg outline-none"
          />
        </div>

        {/* Transfer Button */}
        <button
          onClick={handleTransfer}
          className="w-full bg-emerald-500 text-white py-4 rounded-lg font-medium hover:bg-emerald-600 transition-colors"
        >
          Transfer
        </button>
      </div>
    </div>
  );
}