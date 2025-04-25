"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronRight, Eye, EyeOff } from "lucide-react";

export default function TopUpTab() {
  const [selectedAccountId, setSelectedAccountId] = useState("1");
  const [showBalance, setShowBalance] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);

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

  const bankMethods = [
    { id: "bri", name: "Bank BRI", image: "/bank-bri.png" },
    { id: "bca", name: "Bank BCA", image: "/card-bca.png" },
    { id: "bni", name: "Bank BNI", image: "/bank-bni.png" },
    { id: "bsi", name: "Bank BSI", image: "/card-bsi.jpg" },
    { id: "mandiri", name: "Bank Mandiri", image: "/bank-mandiri.png" },
  ];

  const [activeTab, setActiveTab] = useState("topup");
  const [selectedBankId, setSelectedBankId] = useState("");
  const [showBankDropdown, setShowBankDropdown] = useState(false);
  const selectedAccount = accounts.find((acc) => acc.id === selectedAccountId);
  const selectedBank = bankMethods.find((bank) => bank.id === selectedBankId);
  

  return (
    <>
      {/* Amount */}
      <div>
        <label className="block mb-1 font-semibold">Amount</label>
        <input
          type="number"
          placeholder="Rp."
          className="w-full border border-gray-300 rounded-md p-3 text-black "
        />
      </div>

      {/* Choose Account */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Choose Accounts</label>
        <div className="relative">
          <button
            onClick={() => setShowAccountDropdown(!showAccountDropdown)}
            className="w-full flex justify-between items-center border border-gray-300 rounded-lg p-4 hover:shadow cursor-pointer"
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
                  e.stopPropagation(); // biar gak toggle dropdown
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

      {/* Select Bank */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold">From</label>
        <div className="relative">
          <button
            onClick={() => setShowBankDropdown(!showBankDropdown)}
            className="w-full flex justify-between items-center border border-gray-300 rounded-lg p-4 hover:shadow cursor-pointer"
          >
            <div className="flex items-center gap-3">
              {selectedBank ? (
                <>
                  <Image
                    src={selectedBank.image}
                    alt={selectedBank.name}
                    width={50}
                    height={50}
                    className="rounded"
                  />
                  <span className="font-semibold">{selectedBank.name}</span>
                </>
              ) : (
                <span className="text-gray-400 font-medium">Choose Bank Transfer Method</span>
              )}
            </div>
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>

          {showBankDropdown && (
            <ul className="absolute z-20 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-2 max-h-64 overflow-auto">
              {bankMethods.map((bank) => (
                <li
                  key={bank.id}
                  onClick={() => {
                    setSelectedBankId(bank.id);
                    setShowBankDropdown(false);
                  }}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer"
                >
                  <Image src={bank.image} alt={bank.name} width={40} height={40} className="rounded" />
                  <span className="font-medium">{bank.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>


      {/* Note */}
      <div>
        <input
          type="text"
          placeholder="Add note"
          className="w-full p-3 border border-gray-300 rounded-md text-black"
        />
      </div>

      <button className="w-full p-3 bg-gray-300 text-white font-semibold rounded-md cursor-not-allowed">
        Top Up
      </button>
    </>
  );
}