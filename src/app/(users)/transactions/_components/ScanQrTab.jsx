"use client";

import { useState } from "react";
import { ChevronRight, Eye, EyeOff, QrCode } from "lucide-react";
import Image from "next/image";

export default function ScanQrTab() {
    const [showAccountDropdown, setShowAccountDropdown] = useState(false);
    const [showBalance, setShowBalance] = useState(true);
    const [selectedAccountId, setSelectedAccountId] = useState("1");
    const [showQR, setShowQR] = useState(false);

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
    ];

    const selectedAccount = accounts.find(
        (account) => account.id === selectedAccountId
    );

    const handleGenerateQR = () => {
        setShowQR(true);
    };

    return (
        <div className="p-4">
            <div className="flex flex-col items-center">
                {/* QR Code Section */}
                {showQR && (
                    <div className="mb-8 w-full max-w-[300px] aspect-square bg-white p-4 rounded-lg shadow-lg flex items-center justify-center">
                        <QrCode
                            value={JSON.stringify({
                                accountId: selectedAccount.id,
                                name: selectedAccount.name,
                                balance: selectedAccount.balance,
                            })}
                            size={256}
                            style={{ width: "100%", height: "100%" }}
                        />
                    </div>
                )}

                {/* Account Selection */}
                <div className="w-full mb-4">
                    <label className="block mb-1 font-semibold">
                        Choose Accounts
                    </label>
                    <div className="relative">
                        <div
                            onClick={() =>
                                setShowAccountDropdown(!showAccountDropdown)
                            }
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
                                    <p className="font-semibold">
                                        {selectedAccount.name}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {showBalance
                                            ? selectedAccount.balance
                                            : "••••••••••••••"}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowBalance(!showBalance);
                                    }}
                                    className="p-1 hover:bg-gray-100 rounded-full"
                                >
                                    {showBalance ? (
                                        <Eye className="w-5 h-5 text-gray-600" />
                                    ) : (
                                        <EyeOff className="w-5 h-5 text-gray-600" />
                                    )}
                                </button>
                                <ChevronRight className="w-5 h-5 text-gray-600" />
                            </div>
                        </div>

                        {/* Account Dropdown */}
                        {showAccountDropdown && (
                            <ul className="absolute z-20 w-[calc(100%)] bg-white border border-gray-300 rounded-lg shadow-lg mt-2 max-h-64 overflow-auto">
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
                                            <p className="font-medium">
                                                {account.name}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                {account.balance}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* Generate QR Button */}
                <button
                    className="w-full bg-emerald-500 text-white py-3 rounded-lg font-medium hover:bg-emerald-600 transition-colors"
                    onClick={handleGenerateQR}
                >
                    Generate QR
                </button>
            </div>
        </div>
    );
}
