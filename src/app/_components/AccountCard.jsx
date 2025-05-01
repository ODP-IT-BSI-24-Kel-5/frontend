"use client";
import { formatCurrency } from "@/utils/FormatCurrency";
import { Eye, EyeClosed, Wallet } from "lucide-react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function AccountCard({
    colors,
    accountName,
    accountNumber,
    balance,
    isMain,
    colorClass,
}) {
    const [showBalance, setShowBalance] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(accountNumber).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
            toast.success("Success copying account number!");
        });
    };

    return (
        <div className={`${colorClass} w-full`}>
            <Toaster position="top-center" />
            <div className="card-body p-0 flex-row w-full">
                <div
                    className={`${colors} w-3 h-16 mt-4 rounded-r-lg`}
                ></div>
                <div className="py-3 pr-4 w-full">
                    {/* Account Type & Copy */}
                    <div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <span>
                                    {accountName} -{" "}
                                    <span className="font-bold">
                                        {accountNumber}
                                    </span>
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
                        <span className="divider p-0 m-0 h-fit"></span>
                    </div>

                    {/* Balance & Toggle */}
                    <div className="flex justify-between items-center my-4">
                        <div className="flex gap-3 justify-center items-center">
                            <div className="card border border-primary p-4">
                                <Wallet color="var(--color-primary)" />
                            </div>
                            <div className="text-xl font-bold">
                                <span className="text-base-content/40 font-medium">
                                    Rp{" "}
                                </span>
                                {showBalance ? ` ${balance}` : " ••••••••"}
                            </div>
                        </div>
                        <button
                            onClick={() => setShowBalance((prev) => !prev)}
                            className="btn btn-ghost btn-circle btn-sm"
                            title={
                                showBalance ? "Hide Balance" : "Show Balance"
                            }
                        >
                            {showBalance ? <Eye /> : <EyeClosed />}
                        </button>
                    </div>

                    {/* Yield & Actions */}
                    <div className="flex gap-10 justify-center items-center">
                        {/* <span className="badge badge-success">
                            +22% per year
                        </span> */}
                        {isMain && (
                            <div className="w-fit">
                                <div className="text-neutral-content  w-fit p-1 badge badge-primary">
                                    Main Wallet
                                </div>
                            </div>
                        )}
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
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
