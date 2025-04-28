"use client";
import { Eye, EyeClosed, HandCoins } from "lucide-react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { formatCurrency } from "@/utils/FormatCurrency";

// components/BalanceAndSpendingSection.jsx
export default function BalanceAndSpendingSection() {
    const [showBalance, setShowBalance] = useState(false);
    const [totalBalance, setTotalBalance] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTotalBalance = async () => {
            try {
                const token = Cookies.get("token");
                const response = await fetch(
                    "http://localhost:8081/api/v1/users/dashboard/chart/total-trans",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch total balance");
                }

                const data = await response.json();
                if (data.status === "success") {
                    setTotalBalance(data.total_balance || 0);
                }
            } catch (error) {
                console.error("Error fetching total balance:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTotalBalance();
    }, []);
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="card bg-base-100 shadow-md">
                <div className="card-body flex flex-col justify-between">
                    <div className="flex justify-between items-center">
                        <h2 className="font-bold">Total Balance</h2>
                        <button
                            onClick={() => setShowBalance((prev) => !prev)}
                            className="btn btn-ghost btn-circle btn-sm"
                            title={
                                showBalance ? "Hide Balance" : "Show Balance"
                            }
                        >
                            {showBalance ? <Eye /> : <EyeClosed />}
                        </button>
                    </div>

                    <div className="flex gap-7 py-4">
                        <div className="w-15 h-15 rounded-md bg-primary/10 grid place-items-center">
                            <HandCoins
                                className="w-7 h-7 text-primary"
                                strokeWidth={1.5}
                            />
                        </div>
                        <div>
                            <div className="text-xl font-bold mb-1">
                                {loading
                                    ? "Loading..."
                                    : showBalance
                                    ? formatCurrency(totalBalance)
                                    : "••••••••"}
                            </div>
                            {/* Removed percentage badge since it's not in the API response */}
                        </div>
                    </div>

                    <div className="h-4"></div>
                </div>
            </div>

            <div className="card bg-base-100 shadow-md">
                <div className="card-body">
                    <div className="flex justify-between items-center">
                        <h2 className="font-bold">Top Spendings</h2>
                        <button className="btn btn-ghost btn-xs">
                            VIEW ALL
                        </button>
                    </div>

                    <div className="mt-4">
                        <div className="flex justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full text-2xl bg-base-200 flex items-center justify-center">
                                    🍔
                                </div>
                                <span>Food</span>
                            </div>
                            <span className="font-bold">Rp 1.500.000,00</span>
                        </div>
                        <progress
                            className="progress progress-primary w-full"
                            value="60"
                            max="100"
                        ></progress>
                    </div>

                    <div className="mt-4">
                        <div className="flex justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full text-2xl bg-base-200 flex items-center justify-center">
                                    🚗
                                </div>
                                <span>Transport</span>
                            </div>
                            <span className="font-bold">Rp 1.000.000,00</span>
                        </div>
                        <progress
                            className="progress progress-primary w-full"
                            value="40"
                            max="100"
                        ></progress>
                    </div>
                </div>
            </div>
        </div>
    );
}
