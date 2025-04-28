"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddRecipientPage() {
  const router = useRouter();
  const [walletNumber, setWalletNumber] = useState("");

  const handleSubmit = () => {
    // Add your logic to save the new recipient
    console.log("New recipient wallet:", walletNumber);
    router.push("/transactions/transfer");
  };

  return (
    <div className="space-y-4">
      {/* Title */}
      <div className="border-b items-center p-2">
        <h1 className="text-lg font-medium text-center">New Recipient</h1>
      </div>

      <div className="px-4 space-y-4">
        {/* Wallet Number Input */}
        <div>
          <label className="block mb-2 font-semibold">Wallet Number</label>
          <input
            type="text"
            value={walletNumber}
            onChange={(e) => {
              // Only allow numbers
              const value = e.target.value.replace(/[^\d]/g, "");
              setWalletNumber(value);
            }}
            placeholder="Input wallet number"
            className="w-full border border-gray-300 rounded-md p-3 text-black focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Add Recipient Button */}
        <button
          onClick={handleSubmit}
          disabled={!walletNumber}
          className={`w-full p-3 text-white font-semibold rounded-md transition-colors
            ${
              walletNumber
                ? "bg-emerald-500 hover:bg-emerald-600"
                : "bg-gray-300 cursor-not-allowed"
            }`}
        >
          Add Recipient
        </button>
      </div>
    </div>
  );
}