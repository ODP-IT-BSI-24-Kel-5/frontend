export default function SpendingCategoriesModal({
    isOpen,
    onClose,
    categories,
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-base-100 rounded-lg w-full max-w-md mx-4 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">All Categories</h2>
                    <button onClick={onClose} className="btn btn-ghost btn-sm">
                        ×
                    </button>
                </div>

                <div className="space-y-4">
                    {Object.entries(categories).map(([category, data]) => (
                        <div key={category} className="border-b pb-4">
                            <div className="flex justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-base-200 flex items-center justify-center">
                                        {getIconComponent(data.icon)}
                                    </div>
                                    <span>{category}</span>
                                </div>
                                <span className="font-bold">
                                    {formatCurrency(data.amount)}
                                </span>
                            </div>
                            <progress
                                className="progress progress-primary w-full"
                                value={data.amount}
                                max={Math.max(
                                    ...Object.values(categories).map(
                                        (c) => c.amount
                                    )
                                )}
                            ></progress>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
