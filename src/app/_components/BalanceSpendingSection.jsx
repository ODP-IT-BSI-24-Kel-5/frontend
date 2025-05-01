"use client";
import { Eye, EyeClosed, HandCoins } from "lucide-react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { formatCurrency } from "@/utils/FormatCurrency";
import { fetchCategoriesData, fetchTotBalance } from "../api";
import { DynamicIcon } from "lucide-react/dynamic";
import SpendingCategoriesModal from "./SpendingCategoriesModal";

// components/BalanceAndSpendingSection.jsx
export default function BalanceAndSpendingSection() {
    const [showBalance, setShowBalance] = useState(false);
    const [totalBalance, setTotalBalance] = useState(0);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState({});
    const [showAllModal, setShowAllModal] = useState(false);

    useEffect(() => {
        const fetchTotalBalance = async () => {
            try {
                const token = Cookies.get("token");
                const data = await fetchTotBalance(token);

                setTotalBalance(data.total_balance || 0);
            } catch (error) {
                console.error("Error fetching total balance:", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchCategories = async () => {
            try {
                const data = await fetchCategoriesData();
                if (data.status === "success") {
                    setCategories(data.data);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
        fetchTotalBalance();
    }, []);
    return (
        <div className="grid h-4/12 grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card h-full bg-base-100 shadow-md">
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
                        <button
                            onClick={() => setShowAllModal(true)}
                            className="btn btn-ghost btn-xs"
                        >
                            VIEW ALL
                        </button>
                    </div>

                    {Object.entries(categories)
                        .sort((a, b) => b[1].amount - a[1].amount)
                        .slice(0, 2)
                        .map(([category, data]) => (
                            <div key={category} className="mt-4">
                                <div className="flex justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                            <DynamicIcon
                                                height={30}
                                                width={30}
                                                name={data.icon || "camera"}
                                                className=" text-primary"
                                            />
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

            <SpendingCategoriesModal
                isOpen={showAllModal}
                onClose={() => setShowAllModal(false)}
                categories={categories}
            />
        </div>
    );
}
