"use client";

import { useState } from "react";
import { ChevronRight, Eye, EyeOff, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function TransferInputPage() {
  const [showBalance, setShowBalance] = useState(true);
  const [walletNumber, setWalletNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [formattedAmount, setFormattedAmount] = useState("Rp. ");
  const [note, setNote] = useState("");
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState("1");
  const [showRecentDropdown, setShowRecentDropdown] = useState(false);

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
    // ...add more accounts as needed
  ];

  const selectedAccount = accounts.find((acc) => acc.id === selectedAccountId);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value.startsWith("Rp. ")) {
      const numericValue = value.slice(4).replace(/[^\d]/g, "");
      setAmount(numericValue);
      setFormattedAmount(`Rp. ${numericValue}`);
    } else {
      setFormattedAmount("Rp. ");
      setAmount("");
    }
  };
  const recipients = [
    { id: 1, name: 'John Doe - 1234567890' },
    { id: 2, name: 'Jane Smith - 0987654321' },
  ];

  const handleRecipientSelect = (recipientNumber) => {
    setWalletNumber(recipientNumber);
    setShowRecentDropdown(false);
  };

  // Validation for enabling the transfer button
  const isFormValid = Boolean(walletNumber) && Boolean(amount) && Boolean(selectedAccountId);

  const handleTransfer = () => {
    // Add your transfer logic here
    console.log({
      recipient: walletNumber,
      amount,
      accountId: selectedAccountId,
      note
    });
  };

  return (
    <div className="space-y-4">
      {/* Add Title */}
      <div className="border-b items-center p-2">
        <h1 className="text-lg font-medium text-center">Transfer</h1>
      </div>


      {/* Recipient Input */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block mb-2 font-semibold">Recipient Account</label>
          <Link
            href="/add"
            className="px-3 py-1 bg-emerald-500 text-white text-sm rounded-md flex items-center gap-1 hover:bg-emerald-600 transition-colors"
          >

            <Plus className="w-4 h-4" />
            New
          </Link>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowRecentDropdown(!showRecentDropdown)}
            className="w-full flex justify-between items-center border border-gray-300 rounded-lg p-3 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3">
              {walletNumber ? (
                <>
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                    <Image
                      src="/profile.png"
                      alt="Profile"
                      width={42}
                      height={42}
                      className="w-full h-full"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">
                      {recipients.find(r => r.name.includes(walletNumber))?.name || walletNumber}
                    </p>
                  </div>
                </>
              ) : (
                <span className="text-gray-400 font-medium">Select Recipient</span>
              )}
            </div>
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>

          {showRecentDropdown && (
            <ul className="absolute z-20 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-2 max-h-64 overflow-auto">
              {recipients.map((recipient) => (
                <li
                  key={recipient.id}
                  onClick={() => handleRecipientSelect(recipient.name.split(' - ')[1])}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                    <Image
                      src="/profile.png"
                      alt="Profile"
                      width={40}
                      height={40}
                      className="w-full h-full"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{recipient.name}</p>
                    <p className="text-sm text-gray-600">Recent Transfer</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>


      {/* Amount Input */}
      <div>
        <label className="block mb-2 font-semibold">Amount</label>
        <input
          type="text"
          value={formattedAmount}
          onChange={handleAmountChange}
          onFocus={(e) => {
            const length = e.target.value.length;
            e.target.setSelectionRange(length, length);
          }}
          className="w-full border border-gray-300 rounded-md p-3 text-black focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {/* Choose Account */}
      <div>
        <label className="block mb-2 font-semibold">Choose Accounts</label>
        <div className="relative">
          <button
            onClick={() => setShowAccountDropdown(!showAccountDropdown)}
            className="w-full flex justify-between items-center border border-gray-300 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3">
              <Image
                src={selectedAccount.image}
                alt="Card"
                width={50}
                height={50}
                className="rounded"
              />
              <div>
                <p className="font-semibold">{selectedAccount.name}</p>
                <p className="text-sm text-gray-600">
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
              <ChevronRight className="w-5 h-5 text-gray-600" />
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
                    width={40}
                    height={40}
                    className="rounded"
                  />
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
      <div>
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add note (optional)"
          className="w-full p-3 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {/* Transfer Button */}
      <button
        onClick={() => {
          if (isFormValid) {
            handleTransfer();
          }
        }}
        disabled={!isFormValid}
        className={`w-full p-3 text-white font-semibold rounded-md transition-colors
          ${isFormValid
            ? 'bg-emerald-500 hover:bg-emerald-600'
            : 'bg-gray-300 cursor-not-allowed'
          }`}
      >
        Transfer
      </button>
    </div>
  );
};