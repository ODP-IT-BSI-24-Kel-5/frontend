"use client";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useTheme } from "@/theme-provider";
import { fetchPieChartData } from "../api";
import Cookies from "js-cookie";

export default function AccountCarousel() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [labels, setLabels] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const { theme } = useTheme();

    const primaryColor = theme === "dark" ? "#9333EA" : "#1D4ED8"; // Primary color for light/dark mode
    const secondaryColor = theme === "dark" ? "#1D4ED8" : "#9333EA";

    // Register Chart.js components
    ChartJS.register(ArcElement, Tooltip, Legend);

    // Fetch account data on component mount
    useEffect(() => {
        const fetchData = async () => {
            const token = Cookies.get("token");
            try {
                const data = await fetchPieChartData(token);
                setLabels(data.data.stats.labels);
                setAccounts(data.data.stats.datasets);
                setIsLoading(false);
            } catch (err) {
                setError("Failed to load account data");
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const paginate = (newDirection) => {
        setDirection(newDirection);
        setActiveIndex((prev) => {
            const next = prev + newDirection;
            if (next < 0) return accounts.length - 1;
            if (next >= accounts.length) return 0;
            return next;
        });
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="w-3/5 card bg-base-100 shadow-md overflow-hidden">
            <div className="card-body">
                <div className="flex justify-between items-center mb-2">
                    <button
                        onClick={() => paginate(-1)}
                        className="btn btn-circle btn-ghost"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </button>
                    <h2 className="card-title">Payment Account</h2>
                    <button
                        onClick={() => paginate(1)}
                        className="btn btn-circle btn-ghost"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </button>
                </div>

                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={activeIndex}
                        initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                        }}
                        className="space-y-6"
                    >
                        <div className="flex justify-center">
                            <div className="w-40 h-40">
                                <Doughnut
                                    data={{
                                        labels: labels,
                                        datasets: [accounts[activeIndex]],
                                    }}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="flex items-center gap-2">
                                    <div className="badge badge-primary"></div>
                                    <span>Earnings</span>
                                </div>
                                <div className="font-bold">
                                    Rp.{" "}
                                    {accounts[
                                        activeIndex
                                    ].data[0].toLocaleString()}
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <div className="badge badge-secondary"></div>
                                    <span>Spendings</span>
                                </div>
                                <div className="font-bold">
                                    Rp.{" "}
                                    {accounts[
                                        activeIndex
                                    ].data[1].toLocaleString()}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                <div className="flex justify-center mt-6">
                    {accounts.map((_, i) => (
                        <div
                            key={i}
                            className={`w-2 h-2 mx-1 rounded-full ${
                                i === activeIndex ? "bg-primary" : "bg-base-300"
                            }`}
                            style={{ transition: "background 0.3s" }}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
}
