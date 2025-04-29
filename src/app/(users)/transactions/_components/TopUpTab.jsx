"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronRight, Eye, EyeOff, Loader } from "lucide-react";
import { fetchMethod, fetchWallet, topupFunds } from "@/app/api";
import PinInputModal from "./PinInputModal";
import toast, { Toaster } from "react-hot-toast";
import TransferSuccess from "./TransferSuccess";
import TransferFailed from "./TransferFailed";
import { formatCurrency } from "@/utils/FormatCurrency";

export default function TopUpTab() {
    // Untuk Form
    // State untuk form
    const [amount, setAmount] = useState("");
    const [formattedAmount, setFormattedAmount] = useState("Rp. ");
    const [selectedAccountId, setSelectedAccountId] = useState();
    const [accounts, setAccounts] = useState([]);
    const [bankMethods, setBankMethods] = useState([]);
    const [note, setNote] = useState("");
    const [showPinModal, setShowPinModal] = useState(false);
    const [showBalance, setShowBalance] = useState(false);
    const [pinError, setPinError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // State untuk UI
    const [showError, setShowError] = useState(false);
    const [showAccountDropdown, setShowAccountDropdown] = useState(false);

    // const [activeTab, setActiveTab] = useState("topup");
    const [selectedBankId, setSelectedBankId] = useState("");
    const [showBankDropdown, setShowBankDropdown] = useState(false);
    const [transactionResult, setTransactionResult] = useState(null);

    const selectedAccount =
        accounts.find((acc) => acc.number === selectedAccountId) || null;

    const selectedBank = bankMethods.find((bank) => bank.id === selectedBankId);

    const handlePinConfirm = async (pin) => {
        try {
            const result = await handleConfirmTopup(pin);

            if (result.status === "failed") {
                if (
                    result.message?.toLowerCase().includes("pin") ||
                    result.message?.toLowerCase().includes("unauthorized")
                ) {
                    toast.error(result.message);
                    return;
                }

                setShowError(true);
                return;
            }
            setShowSuccess(true);
        } catch (error) {
            if (error.message?.toLowerCase().includes("pin")) {
                toast.error(error.message);
            } else {
                setShowError(true);
            }
        }
    };

    const resetForm = () => {
        setSelectedAccountId("");
        setAmount("");
        setFormattedAmount("Rp. ");
        setNote("");
        setSelectedBankId();
    };

    const handleConfirmTopup = async (pin) => {
        setIsSubmitting(true);
        try {
            const transferData = {
                acquirer_account: selectedAccount.number,
                amount: parseInt(amount),
                pin,
                method: selectedBank.id,
            };

            var data = await topupFunds(transferData);

            setTransactionResult({
                ...data,
                number: data.transaction_number,
                amount: transferData.amount,
                sender_account: selectedAccount.number,
            });
            setShowSuccess(true);
            resetForm();
            return data;
        } catch (error) {
            console.error("Transfer error:", error);
            return error;
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [bankData, accountsData] = await Promise.all([
                    fetchMethod(),
                    fetchWallet(),
                ]);

                console.log(bankData);
                setAccounts(accountsData || []);
                setBankMethods(bankData || []);

                // Set first account as default if available
                if (accountsData.data?.length > 0) {
                    setSelectedAccountId(accountsData.data[0].number);
                }
            } catch (error) {
                toast.error("Failed to load data. Please refresh the page.");
                console.error("Fetch error:", error);
            }
        };

        fetchData();
    }, []);

    // Validasi form
    const isFormValid =
        Boolean(amount) &&
        Boolean(selectedAccountId) &&
        Boolean(selectedBankId);

    const handleAmountChange = (e) => {
        const value = e.target.value;
        if (value.startsWith("Rp. ")) {
            // Remove non digit format
            const numericValue = value.slice(4).replace(/[^\d]/g, "");
            setAmount(numericValue);

            // Thousand Separator
            const formattedValue = new Intl.NumberFormat("id-ID").format(
                numericValue
            );
            setFormattedAmount(`Rp. ${formattedValue}`);
        } else {
            setFormattedAmount("Rp. ");
            setAmount("");
        }
    };

    const handleConfirm = () => {
        setPinError(false);
        setShowPinModal(true);
    };

    if (showError) {
        return (
            <TransferFailed
                isOpen={true}
                error={transactionResult.error || transactionResult.message}
                transactionData={transactionResult}
                onClose={() => {
                    setShowError(false);
                    onClose();
                }}
            />
        );
    }
    if (showSuccess) {
        return (
            <TransferSuccess
                isTopup={true}
                transactionData={transactionResult}
                onClose={() => {
                    setShowSuccess(false);
                    onClose();
                }}
            />
        );
    }
    return (
        <div className="space-y-4">
            <Toaster></Toaster>
            <div>
                <label className="block mb-2 font-semibold">Amount</label>
                <div className="relative">
                    <input
                        type="text"
                        value={formattedAmount}
                        onChange={handleAmountChange}
                        onFocus={(e) => {
                            const length = e.target.value.length;
                            e.target.setSelectionRange(length, length);
                        }}
                        className="w-full border border-gray-300 rounded-md p-3 text-black text-2xl"
                        min="0"
                    />
                </div>
            </div>

            {/* Choose Account */}
            <div>
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
                                            src="/placeholder-avatar.png"
                                            alt="Profile"
                                            width={42}
                                            height={42}
                                            className="w-full h-full rounded-lg"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-left">
                                            {selectedAccount.number}
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
                                    Select your account!
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
                                        src={
                                            account.image ||
                                            "/placeholder-avatar.png"
                                        }
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

            {/* Select Bank */}
            <div>
                <label className="block mb-2 font-semibold">From</label>
                <div className="relative">
                    <button
                        onClick={() => setShowBankDropdown(!showBankDropdown)}
                        className="w-full flex justify-between items-center border border-gray-300 rounded-lg p-4 hover:shadow cursor-pointer"
                    >
                        <div className="flex items-center gap-3">
                            {selectedBank ? (
                                <>
                                    <Image
                                        src={`/${selectedBank?.link}.png`}
                                        alt={selectedBank.name}
                                        width={50}
                                        height={50}
                                        className="rounded"
                                    />
                                    <span className="font-semibold">
                                        {selectedBank.name}
                                    </span>
                                </>
                            ) : (
                                <span className="text-gray-400 font-medium">
                                    Choose Bank Transfer Method
                                </span>
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
                                    <Image
                                        src={`/${bank.link}.png`}
                                        alt={bank.name}
                                        width={40}
                                        height={40}
                                        className="rounded"
                                    />
                                    <span className="font-medium">
                                        {bank.name}
                                    </span>
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
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md text-black"
                />
            </div>

            <button
                onClick={handleConfirm}
                disabled={isSubmitting || !isFormValid}
                className={`w-full mt-6 p-3 text-white font-medium rounded-md transition-colors 
                            ${
                                isSubmitting
                                    ? "bg-emerald-400 cursor-not-allowed"
                                    : "bg-emerald-500 hover:bg-emerald-600"
                            }`}
            >
                {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                        <Loader className="w-5 h-5 animate-spin" />
                        Processing...
                    </div>
                ) : (
                    "Transfer"
                )}
            </button>

            <PinInputModal
                isOpen={showPinModal}
                onClose={() => {
                    if (!isSubmitting) {
                        setShowPinModal(false);
                        setPinError(false);
                    }
                }}
                onConfirm={handlePinConfirm}
                error={pinError}
            />
        </div>
    );
}
