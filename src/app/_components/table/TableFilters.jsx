export default function TableFilters({
    search,
    onSearchChange,
    onSearchSubmit,
    walletFilter,
    onWalletFilterChange,
    typeFilter,
    onTypeFilterChange,
    wallets,
    onClearFilters,
}) {
    return (
        <div className="flex flex-col lg:flex-row justify-between gap-4 mb-6">
            <form onSubmit={onSearchSubmit} className="flex-1">
                <div className="join w-full max-w-md">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Search transactions..."
                        className="input input-bordered join-item flex-1"
                    />
                    <button type="submit" className="btn join-item">
                        Search
                    </button>
                </div>
            </form>

            <div className="flex flex-wrap gap-4 items-center">
                <div className="form-control">
                    <select
                        value={walletFilter}
                        onChange={(e) => onWalletFilterChange(e.target.value)}
                        className="select select-bordered w-[200px]"
                    >
                        <option value="">All Wallets</option>
                        {wallets.map((wallet) => (
                            <option key={wallet.number} value={wallet.number}>
                                {wallet.name} ({wallet.number})
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-control">
                    <select
                        value={typeFilter}
                        onChange={(e) => onTypeFilterChange(e.target.value)}
                        className="select select-bordered w-[150px]"
                    >
                        <option value="">All Types</option>
                        <option value="TRANSFER">Transfer</option>
                        <option value="TOPUP">Top Up</option>
                    </select>
                </div>

                <button
                    type="button"
                    onClick={onClearFilters}
                    className="btn btn-ghost"
                >
                    Clear Filters
                </button>
            </div>
        </div>
    );
}
