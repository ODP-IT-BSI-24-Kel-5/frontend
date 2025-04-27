"use client";

import BalanceAndSpendingSection from "./BalanceSpendingSection";
import LineChartAccount from "./LineChartAccount";
import PieChartAccount from "./PieChartAccount";

export default function ChartsSection() {
    return (
        <div className="flex relative flex-col lg:flex-row gap-6 my-8">
            {/* Pie Chart - Full height to match line chart + balance section */}
            <div className="w-full lg:w-2/5 lg:h-[calc(100vh-20rem)] lg:top-24">
                <div className="h-full">
                    <PieChartAccount />
                </div>
            </div>

            {/* Line Chart & Balance Section Container */}
            <div className="flex w-full lg:w-3/5 flex-col gap-6">
                <LineChartAccount />

                <BalanceAndSpendingSection />
            </div>
        </div>
    );
}
