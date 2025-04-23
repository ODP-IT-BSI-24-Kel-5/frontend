"use client";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function AccountCard({
    type,
    accountNumber,
    balance,
    colorClass,
}) {
    const [showBalance, setShowBalance] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(accountNumber).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
            toast.success("Success copying account number!")
        });
    };

    return (
        <div className={colorClass}>
            <Toaster position="top-center" />
            <div className="card-body p-4">
                {/* Account Type & Copy */}
                <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                        <span className="bg-base-100 p-2 rounded-full">
                            {/* Account Icon */}
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                />
                            </svg>
                        </span>
                        <span>
                            {type} - {accountNumber}
                        </span>
                    </div>
                    <button
                        onClick={handleCopy}
                        className="btn btn-ghost btn-circle btn-sm"
                        title="Copy Account Number"
                    >
                        {copied ? (
                            <span className="text-xs">✔</span>
                        ) : (
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Balance & Toggle */}
                <div className="flex justify-between items-center mb-4">
                    <div className="text-xl font-bold">
                        {showBalance ? `Rp ${balance}` : "Rp ••••••••"}
                    </div>
                    <button
                        onClick={() => setShowBalance((prev) => !prev)}
                        className="btn btn-ghost btn-circle btn-sm"
                        title={showBalance ? "Hide Balance" : "Show Balance"}
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {showBalance ? (
                                // Eye Off
                                <>
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a10.057 10.057 0 014.187-5.482M14.121 14.121A3 3 0 0112 15c-1.657 0-3-1.343-3-3 0-.879.381-1.671.996-2.236M9.879 9.879A3 3 0 0115 12m5.121 5.121L4.879 4.879"
                                    />
                                </>
                            ) : (
                                // Eye
                                <>
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                </>
                            )}
                        </svg>
                    </button>
                </div>

                {/* Yield & Actions */}
                <div className="flex justify-between items-center">
                    <span className="badge badge-success">+22% per year</span>
                    <div className="flex gap-2">
                        <button className="btn btn-sm btn-outline">
                            <svg
                                className="w-4 h-4 mr-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                />
                            </svg>
                            Topup
                        </button>
                        <button className="btn btn-sm btn-outline">
                            <svg
                                className="w-4 h-4 mr-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                />
                            </svg>
                            Withdraw
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
