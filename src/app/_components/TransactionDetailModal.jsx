import { Check } from "lucide-react";
import { formatCurrency } from "@/utils/FormatCurrency";

export default function TransactionDetailModal({ transaction, isOpen, onClose }) {
    const handlePrint = async () => {
        if (transaction?.image_receipt) {
            try {
                const response = await fetch(transaction.image_receipt);
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `receipt-${transaction.transaction_number}.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            } catch (error) {
                console.error("Error downloading receipt:", error);
            }
        }
    };

    var stringType = transaction.type.charAt(0) + transaction.type.slice(1).toLowerCase()

    if (!isOpen) return null;

    return (
        <dialog className="modal modal-open">
            <div className="modal-box max-w-2xl">
                <div className="flex flex-col items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-success/20 rounded-full grid place-items-center">
                        <Check className="w-8 h-8 text-success" />
                    </div>
                    <h2 className="text-2xl font-bold text-success">{stringType} Success</h2>
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="text-base-content/70">Amount</div>
                        <div className="text-right font-bold">
                            {formatCurrency(transaction.amount)}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="text-base-content/70">Transaction Number</div>
                        <div className="text-right font-mono">
                            {transaction.transaction_number}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="text-base-content/70">From</div>
                        <div className="text-right">
                            <div className="font-bold">{transaction.wallet_name}</div>
                            <div className="text-sm text-base-content/70">
                                {transaction.wallet}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="text-base-content/70">To</div>
                        <div className="text-right">
                            <div className="font-bold">{transaction.associate_name}</div>
                            <div className="text-sm text-base-content/70">
                                {transaction.associate_wallet}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="text-base-content/70">Description</div>
                        <div className="text-right">{transaction.notes || '-'}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="text-base-content/70">Date</div>
                        <div className="text-right">
                            {new Date(transaction.created_at).toLocaleString()}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="text-base-content/70">Type</div>
                        <div className="text-right">{transaction.type}</div>
                    </div>
                </div>

                <div className="modal-action justify-center gap-2">
                    <button className="btn btn-primary" onClick={handlePrint}>
                        Print
                    </button>
                    <button className="btn" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
            <div className="modal-backdrop" onClick={onClose}></div>
        </dialog>
    );
}