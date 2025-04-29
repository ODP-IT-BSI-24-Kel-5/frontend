"use client";

import { XCircle } from "lucide-react";

export default function TransferFailed({ isOpen, onClose, error }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-md mx-4 shadow-2xl p-6">
                <div className="flex flex-col items-center gap-4 mb-8">
                    <XCircle className="w-16 h-16 text-red-500" />
                    <h2 className="text-2xl font-bold text-red-500">Transfer Failed</h2>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-base font-medium mb-4">Error Details</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <p className="text-gray-600">Reason</p>
                            <p className="font-medium text-right">{error}</p>
                        </div>
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="w-full mt-8 p-3 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 transition-colors"
                >
                    Close
                </button>
            </div>
        </div>
    );
}