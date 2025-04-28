"use client";
import { useEffect, useState, useRef } from "react";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import AccountCard from "./AccountCard";
import { useTheme } from "@/theme-provider";
import { fetchWallet } from "../api";
import Cookies from "js-cookie";
import { formatCurrency } from "@/utils/FormatCurrency";
import AddAccountModal from "./AddAccountModal";
import { CHART_COLORS_TW } from "@/Constant/constant";

export default function AccountsSection() {
    const [accounts, setAccounts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    const scrollContainerRef = useRef(null);
    const { theme } = useTheme();

    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    // Add these drag handling functions before your return statement
    const handleMouseDown = (e) => {
        if (!scrollContainerRef.current) return;

        setIsDragging(true);
        setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
        setScrollLeft(scrollContainerRef.current.scrollLeft);
    };
    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e) => {
        if (!isDragging || !scrollContainerRef.current) return;

        e.preventDefault();
        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX) * 2; // Adjust scroll speed
        scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    };
    const bgColor = CHART_COLORS_TW[theme];

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } =
                scrollContainerRef.current;
            setShowLeftArrow(scrollLeft > 0);
            setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
        }
    };

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const cardWidth = 360; 
            scrollContainerRef.current.scrollBy({
                left: direction === "left" ? -cardWidth : cardWidth,
                behavior: "smooth",
            });
        }
    };

    const fetchData = async () => {
        try {
            const data = await fetchWallet();
            setAccounts(data);
            setError(null);
        } catch (err) {
            setError("Failed to load wallet data");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer) {
            scrollContainer.addEventListener("scroll", handleScroll);
            handleScroll();
            return () =>
                scrollContainer.removeEventListener("scroll", handleScroll);
        }
    }, [accounts]);

    return isLoading ? (
        <div className="w-full animate-pulse">
            <div className="h-8 bg-base-300 rounded w-48 mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-40 bg-base-300 rounded-box"></div>
                ))}
            </div>
        </div>
    ) : error ? (
        <div className="alert alert-error">{error}</div>
    ) : (
        <div className="w-full space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-2">
                    <h2 className="text-xl font-bold">
                        Accounts ({accounts.length})
                    </h2>
                    <h3 className="text-base-content/70">Dashboard</h3>
                </div>
                <button
                    className="btn btn-primary w-full sm:w-auto"
                    onClick={() => setIsAddModalOpen(true)}
                >
                    <Plus className="h-5 w-5" />
                    Add Wallet
                </button>
            </div>

            <div className="relative">
                {showLeftArrow && (
                    <button
                        onClick={() => scroll("left")}
                        className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 btn btn-circle btn-ghost bg-base-100/80"
                        aria-label="Scroll left"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </button>
                )}

                <div
                    ref={scrollContainerRef}
                    className={`flex gap-5 overflow-x-auto scroll-smooth py-4 px-2 no-scrollbar cursor-grab active:cursor-grabbing ${
                        isDragging ? "select-none" : ""
                    }`}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onMouseMove={handleMouseMove}
                >
                    {accounts.map((items, key) => (
                        <div
                            key={items.number}
                            className="flex-none w-[340px]" // Changed to flex-none with fixed width
                        >
                            <AccountCard
                                colors={bgColor[key]}
                                accountName={items.name}
                                accountNumber={items.number}
                                balance={formatCurrency(items.balance, false)}
                                isMain={items.is_main}
                                colorClass="card h-full bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-200"
                            />
                        </div>
                    ))}
                </div>

                {showRightArrow && (
                    <button
                        onClick={() => scroll("right")}
                        className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 btn btn-circle btn-ghost bg-base-100/80"
                        aria-label="Scroll right"
                    >
                        <ChevronRight className="h-6 w-6" />
                    </button>
                )}
            </div>

            <AddAccountModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSuccess={fetchData}
            />
        </div>
    );
}
