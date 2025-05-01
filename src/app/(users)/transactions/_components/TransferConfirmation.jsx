"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import PinInputModal from "./PinInputModal.jsx";
import { Loader } from "lucide-react";
import TransferFailed from "./TransferFailed.jsx";
import TransferSuccess from "./TransferSuccess.jsx";

export default function TransferConfirmation({
    isOpen,
    onClose,
    onConfirm,
    transferData,
    selectedAccount,
    isSubmitting,
}) {
    const [showPinModal, setShowPinModal] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [transactionResult, setTransactionResult] = useState(null);
    const [pinError, setPinError] = useState(false);

    const handleConfirm = () => {
        setPinError(false);
        setShowPinModal(true);
    };

    const handlePinConfirm = async (pin) => {
        try {
            const result = await onConfirm(pin);

            if (result.status === "failed") {
                if (
                    result.message?.toLowerCase().includes("pin") ||
                    result.message?.toLowerCase().includes("unauthorized")
                ) {
                    toast.error(result.message);
                    return;
                }

                setTransactionResult({
                    ...result,
                    amount: parseInt(transferData.amount.replace(/[^\d]/g, "")),
                    sender_account: selectedAccount.number,
                    recipient_account: transferData.recipient,
                    description: transferData.note,
                });
                setShowError(true);
                return;
            }
            setTransactionResult({
                number: result.transactions.transaction_number, // transaction ID from API
                amount: parseInt(transferData.amount.replace(/[^\d]/g, '')), // clean amount string
                sender_account: selectedAccount.number,
                recipient_account: transferData.recipient,
                description: transferData.note,
                status: 'success'
            });
            setShowSuccess(true);
        } catch (error) {
            if (error.message?.toLowerCase().includes("pin")) {
                toast.error(error.message);
            } else {
                setTransactionResult({
                    error: error.message,
                    amount: transferData.amount,
                    sender_account: selectedAccount.number,
                    recipient_account: transferData.recipient,
                    description: transferData.note,
                });
                setShowError(true);
            }
        }
    };

    if (!isOpen) return null;
    if (showSuccess) {
        return (
            <TransferSuccess
                transactionData={transactionResult}
                onClose={() => {
                    setShowSuccess(false);
                    onClose();
                }}
            />
        );
    }
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

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-md mx-4 shadow-2xl">
                <div className="p-4">
                    {/* Title Confirmation Transfer */}
                    <h2 className="border-b text-lg font-medium text-center py-3">
                        Confirmation Transfer
                    </h2>

                    <div className="mt-6">
                        <div className="bg-gray-50 rounded-lg p-4">
                            <h3 className="text-base font-medium mb-4">
                                Detail Transfer
                            </h3>

                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <p className="text-gray-600">
                                        Sender Account
                                    </p>
                                    <p className="font-medium">
                                        {selectedAccount?.name}
                                    </p>
                                </div>

                                <div className="flex justify-between">
                                    <p className="text-gray-600">
                                        Recipient Account
                                    </p>
                                    <p className="font-medium">
                                        {transferData.recipient}
                                    </p>
                                </div>

                                <div className="flex justify-between">
                                    <p className="text-gray-600">Amount</p>
                                    <p className="font-medium">
                                        {transferData.amount}
                                    </p>
                                </div>

                                {transferData.note && (
                                    <div className="flex justify-between">
                                        <p className="text-gray-600">Note</p>
                                        <p className="font-medium">
                                            {transferData.note}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Transfer Button */}
                    <button
                        onClick={handleConfirm}
                        disabled={isSubmitting}
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
                </div>

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
        </div>
    );
}
