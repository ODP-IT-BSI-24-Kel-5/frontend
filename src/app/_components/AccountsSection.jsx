import AccountCard from "./AccountCard";

// components/AccountsSection.jsx
export default function AccountsSection() {
    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Accounts (2)</h2>
                <button className="btn btn-primary">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 4v16m8-8H4"
                        />
                    </svg>
                    Add Account
                </button>
            </div>

            <h3 className="text-lg font-bold mb-4">Dashboard</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <AccountCard
                    type="Payment Account"
                    accountNumber="10089999"
                    balance="800.000.000"
                    colorClass="card-side bg-base-100 shadow-md border-l-4 border-primary"
                />
                <AccountCard
                    type="Savings Account"
                    accountNumber="10089999"
                    balance="800.000.000"
                    colorClass="card-side bg-base-100 shadow-md border-l-4 border-secondary"
                />
                <AccountCard
                    type="Payment Account"
                    accountNumber="10089999"
                    balance="800.000.000"
                    colorClass="card-side bg-base-100 shadow-md border-l-4 border-accent"
                />
            </div>
        </div>
    );
}
