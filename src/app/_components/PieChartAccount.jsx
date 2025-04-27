"use client";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useTheme } from "@/theme-provider";
import { fetchPieChartData } from "../api";
import Cookies from "js-cookie";
import { formatCurrency } from "@/utils/FormatCurrency";

export default function PieChartAccount() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [labels, setLabels] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const { theme } = useTheme();

    const bgColor =
        theme === "dark"
            ? ["#FFC13A", "#74C799", "#FFFFE2"]
            : ["#FFC13A", "#74C799", "#FFFFE2"]; // Primary color for light/dark mode

    // Register Chart.js components
    ChartJS.register(ArcElement, Tooltip, Legend);

    // Fetch account data on component mount
    useEffect(() => {
        const fetchData = async () => {
            const token = Cookies.get("token");
            try {
                const data = await fetchPieChartData(token);
                setLabels(data.data.stats.labels);
                var datasets = data.data.stats.datasets;
                console.log(datasets);
                datasets = datasets.map((e) => {
                    e.backgroundColor = bgColor;

                    return e;
                });
                setAccounts(datasets);
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
        return (
            <div className="card bg-base-100 shadow-lg h-full">
                <div className="card-body flex items-center justify-center">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="card bg-base-100 shadow-lg h-full">
                <div className="card-body">
                    <div className="alert alert-error">{error}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="card w-full h-full  bg-base-100 shadow-md overflow-hidden">
            <div className="card-body h-full flex justify-between items-center w-full">
                <div className="flex  w-full justify-between items-center mb-4">
                    <button
                        onClick={() => paginate(-1)}
                        className="btn btn-circle btn-ghost"
                        disabled={accounts.length <= 1}
                    >
                        ←
                    </button>
                    <h2 className="card-title">
                        {accounts[activeIndex]?.label || "Wallet Statistics"}
                    </h2>
                    <button
                        onClick={() => paginate(1)}
                        className="btn btn-circle btn-ghost"
                        disabled={accounts.length <= 1}
                    >
                        →
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
                        className="w-full flex flex-col items-center gap-5"
                    >
                        <div className="flex justify-center">
                            <div className="w-full">
                                <Doughnut
                                    options={{
                                        responsive: true,
                                        plugins: {
                                            legend: {
                                                labels: {
                                                    usePointStyle: true,
                                                    padding: 20,
                                                },
                                            },
                                            tooltip: {
                                                callbacks: {
                                                    label: (context) => {
                                                        const value =
                                                            formatCurrency(
                                                                context.raw
                                                            );
                                                        return `${context.label}: ${value}`;
                                                    },
                                                },
                                            },
                                        },
                                    }}
                                    data={{
                                        labels: labels,
                                        datasets: [accounts[activeIndex]],
                                    }}
                                />
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                <div className="flex flex-wrap justify-around w-full">
                    <div>
                        <div className="flex items-center gap-1">
                            <div className={`badge bg-[#FFC13A]`}></div>
                            <span>Income</span>
                        </div>
                        <div className="font-bold">
                            {formatCurrency(accounts[activeIndex].data[0])}
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-1">
                            <div className="badge bg-[#74C799]"></div>
                            <span>Expense</span>
                        </div>
                        <div className="font-bold">
                            {formatCurrency(accounts[activeIndex].data[1])}
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-1">
                            <div className="badge bg-[#FFFFE2]"></div>
                            <span>Internal</span>
                        </div>
                        <div className="font-bold">
                            {formatCurrency(accounts[activeIndex].data[2])}
                        </div>
                    </div>
                </div>
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
