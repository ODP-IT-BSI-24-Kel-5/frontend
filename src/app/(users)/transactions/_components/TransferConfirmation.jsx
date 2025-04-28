"use client";

export default function TransferConfirmation({ isOpen, onClose, onConfirm, transferData, selectedAccount }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-md mx-4 shadow-2xl">
                <div className="p-4">
                    {/* Title Confirmation Transfer */}
                    <h2 className="border-b text-lg font-medium text-center py-3">Confirmation Transfer</h2>

                    <div className="mt-6">
                        <div className="bg-gray-50 rounded-lg p-4">
                            <h3 className="text-base font-medium mb-4">Detail Transfer</h3>

                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <p className="text-gray-600">Sender Account</p>
                                    <p className="font-medium">{selectedAccount?.name}</p>
                                </div>

                                <div className="flex justify-between">
                                    <p className="text-gray-600">Recipient Account</p>
                                    <p className="font-medium">{transferData.recipient}</p>
                                </div>

                                <div className="flex justify-between">
                                    <p className="text-gray-600">Amount</p>
                                    <p className="font-medium">{transferData.amount}</p>
                                </div>

                                {transferData.note && (
                                    <div className="flex justify-between">
                                        <p className="text-gray-600">Note</p>
                                        <p className="font-medium">{transferData.note}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    {/* Transfer Button */}
                    <button
                        onClick={onConfirm}
                        className="w-full mt-6 p-3 bg-emerald-500 text-white font-medium rounded-md hover:bg-emerald-600 transition-colors"
                    >
                        Transfer
                    </button>
                </div>
            </div>
        </div>
    );
}