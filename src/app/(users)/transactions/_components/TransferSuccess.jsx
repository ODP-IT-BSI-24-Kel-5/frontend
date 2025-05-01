"use client";

import { formatCurrency } from "@/utils/FormatCurrency";
import { CheckCircle2 } from "lucide-react";

export default function TransferSuccess({
    transactionData,
    onClose,
    isTopup = false,
}) {
    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-md mx-4 shadow-2xl p-6">
                <div className="flex flex-col items-center gap-4">
                    <CheckCircle2 className="w-16 h-16 text-success" />

                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-success">
                            Alhamdulillah
                        </h2>
                        <h2 className="text-2xl font-bold text-success">
                            {isTopup ? "Top Up" : "Transfer"} Success
                        </h2>
                    </div>
                </div>

                <div className="mt-8 space-y-4">
                    <div className="flex justify-between">
                        <p className="text-gray-600">Amount</p>
                        <p className="font-bold text-xl">
                            {formatCurrency(transactionData.amount || 0)}
                        </p>
                    </div>

                    <div className="flex justify-between">
                        <p className="text-gray-600">Transaction Id</p>
                        <p className="font-medium">
                            {transactionData.number || "-"}
                        </p>
                    </div>
                    {!isTopup ? (
                        <>
                            <div className="flex justify-between">
                                <p className="text-gray-600">Sender Account</p>
                                <p className="font-medium">
                                    {transactionData.sender_account || "-"}
                                </p>
                            </div>

                            <div className="flex justify-between">
                                <p className="text-gray-600">
                                    Recipient Account
                                </p>
                                <p className="font-medium">
                                    {transactionData.recipient_account || "-"}
                                </p>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex justify-between">
                                <p className="text-gray-600">Acquirer Account</p>
                                <p className="font-medium">
                                    {transactionData.sender_account || "-"}
                                </p>
                            </div>
                        </>
                    )}
                    {transactionData.notes && (
                        <div className="flex justify-between">
                            <p className="text-gray-600">notes</p>
                            <p className="font-medium">
                                {transactionData.notes}
                            </p>
                        </div>
                    )}
                    {transactionData.description && (
                        <div className="flex justify-between">
                            <p className="text-gray-600">Description</p>
                            <p className="font-medium">
                                {transactionData.description}
                            </p>
                        </div>
                    )}
                </div>

                <button
                    onClick={onClose}
                    className="w-full mt-8 p-3 bg-emerald-500 text-white font-medium rounded-md hover:bg-emerald-600 transition-colors"
                >
                    Close
                </button>
            </div>
        </div>
    );
}
