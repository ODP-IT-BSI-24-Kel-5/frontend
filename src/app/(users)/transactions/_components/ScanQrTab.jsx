"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronRight, Eye, EyeOff } from "lucide-react";
import { fetchQrData, fetchWallet } from "@/app/api";
import toast, { Toaster } from "react-hot-toast";
import { formatCurrency } from "@/utils/FormatCurrency";

export default function ScanQrTab() {
    const [showAccountDropdown, setShowAccountDropdown] = useState(false);
    const [selectedAccountId, setSelectedAccountId] = useState();
    const [accounts, setAccounts] = useState([]);
    const [qrImageUrl, setQrImageUrl] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [qrLoad, setQrLoad] = useState(false);
    const [showQr, setShowQr] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const accountsData = await fetchWallet();

                setAccounts(accountsData || []);

                // Set first account as default if available
                if (accountsData.length > 0) {
                    setSelectedAccountId(accountsData[0].number);
                }
            } catch (error) {
                toast.error("Failed to load data. Please refresh the page.");
                console.error("Fetch error:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleShowQr = async () => {
        setQrLoad(true);
        try {
            const qrData = await fetchQrData(selectedAccountId);

            if (!qrData?.data) {
                throw new Error("No QR data received from server");
            }

            // Create blob from the binary data
            const blob = new Blob([qrData.data], { type: "image/png" });

            // Create object URL from blob
            const objectUrl = URL.createObjectURL(blob);
            setQrImageUrl(objectUrl);
            setShowQr(true);
        } catch (error) {
            console.error("Failed to generate QR:", error);
            toast.error("Failed to generate QR code");
        } finally {
            setQrLoad(false);
        }
    };
    useEffect(() => {
        return () => {
            if (qrImageUrl) {
                URL.revokeObjectURL(qrImageUrl);
            }
        };
    }, [qrImageUrl]);

    const selectedAccount = accounts.find(
        (acc) => acc.number === selectedAccountId
    );

    return (
        <div className="space-y-4">
            <Toaster />
            {/* Choose Account */}
            <div>
                {showQr && (
                    <div className="flex justify-center">
                        {qrLoad ? (
                            <div className="w-64 h-64 flex items-center justify-center">
                                <span className="loading loading-spinner loading-lg"></span>
                            </div>
                        ) : (
                            <Image
                                src={qrImageUrl}
                                alt="QR Code"
                                width={256}
                                height={256}
                                className="rounded-lg shadow-lg"
                            />
                        )}
                    </div>
                )}
                <label className="block mb-2 font-semibold">
                    Choose Accounts
                </label>
                <div className="relative">
                    <button
                        onClick={() =>
                            setShowAccountDropdown(!showAccountDropdown)
                        }
                        className="w-full flex justify-between items-center border border-gray-300 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center gap-3">
                            {selectedAccount || selectedAccountId ? (
                                <>
                                    <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                                        <Image
                                            src="/profile.png"
                                            alt="Profile"
                                            width={42}
                                            height={42}
                                            className="w-full h-full rounded-lg"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-left">
                                            {selectedAccount?.number}
                                        </p>
                                        {selectedAccount && (
                                            <p className="text-left text-sm text-gray-600">
                                                <span className="font-semibold">
                                                    {selectedAccount?.name ||
                                                        recipients.find((r) =>
                                                            r.name.includes(
                                                                walletNumber
                                                            )
                                                        )?.name ||
                                                        walletNumber}{" "}
                                                </span>
                                                -
                                                {formatCurrency(
                                                    selectedAccount.balance
                                                )}
                                            </p>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <span className="text-gray-400 font-medium">
                                    Select from recent or search by number
                                </span>
                            )}
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-600" />
                    </button>
                    {showAccountDropdown && (
                        <ul className="absolute z-20 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-2 max-h-64 overflow-auto">
                            {accounts.map((account) => (
                                <li
                                    key={account.number}
                                    onClick={() => {
                                        setSelectedAccountId(account.number);
                                        setShowAccountDropdown(false);
                                    }}
                                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer"
                                >
                                    <Image
                                        src={"/placeholder-avatar.png"}
                                        alt={account.name}
                                        width={40}
                                        height={40}
                                        className="rounded"
                                    />
                                    <div>
                                        <p className="font-medium">
                                            {account.number}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            <span className="font-semibold">
                                                {account?.name}{" "}
                                            </span>{" "}
                                            - {formatCurrency(account.balance)}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <button
                className="w-full bg-emerald-500 text-white py-3 rounded-lg font-medium hover:bg-emerald-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                onClick={handleShowQr}
                // disabled={qrLoad || !selectedAccountId}
            >
                {qrLoad ? (
                    <span className="loading loading-spinner loading-sm mr-2"></span>
                ) : (
                    "Generate QR"
                )}
            </button>
        </div>
    );
}
