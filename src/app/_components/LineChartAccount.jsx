"use client";
import { useEffect, useRef, useState } from "react";
import { fetchLineChart } from "../api";
import Cookies from "js-cookie";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Filler,
    Title,
} from "chart.js";
import DateRangeSelector from "./selector/DateRangeSelector";
import DatasetCheckboxes from "./selector/DatasetCheckboxes";
import { CHART_COLORS, PERIOD_OPTIONS } from "@/Constant/constant";
import { useTheme } from "@/theme-provider";
import ChartDisplay from "./selector/ChartDisplay";

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Filler,
    Title
);

// Helper functions
const formatDateForInput = (date) => date.toISOString().split("T")[0];

const formatDateForAPI = (date, isEndDate = false) => {
    const formattedDate = date.toISOString().split("T")[0];
    return isEndDate
        ? `${formattedDate}T23:59:59.999Z`
        : `${formattedDate}T00:00:00.000Z`;
};

export default function KLineChartAccount() {
    const initializeDatasets = (datasets) => {
        setAccounts(datasets);
        const selectedDataset = datasets.reduce((acc, item) => {
            acc[item.label] = item.label === "total";
            return acc;
        }, {});

        setSelectedDatasets(selectedDataset);
        const tempAccount = datasets.filter((value) => value.label === "total");
        setTempAccount(tempAccount);
        setIsLoading(false);
    };
    // State management
    const [labels, setLabels] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [tempAccount, setTempAccount] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedDatasets, setSelectedDatasets] = useState({});
    const [period, setPeriod] = useState("DAILY");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const chartRef = useRef();

    const { theme } = useTheme();
    const bgColors = CHART_COLORS[theme];

    // Data fetching and processing
    const fetchChartData = async (selectedPeriod, start, end) => {
        const token = Cookies.get("token");
        try {
            let url = `period=${selectedPeriod ?? period}`;
            if (start && end) {
                url += `&start_date=${start}&end_date=${end}`;
            }
            const { data } = await fetchLineChart(token, url);
            setLabels(data.stats.labels);
            processChartData(data.stats.datasets);
        } catch (error) {
            console.error("Error fetching chart data:", error);
        }
    };

    const processChartData = (datasets) => {
        if (!chartRef.current) {
            requestAnimationFrame(() => processChartData(datasets));
            return;
        }

        const ctx = chartRef.current.ctx;
        const processedDatasets = datasets.map((item, key) => ({
            ...item,
            ...createDatasetStyle(ctx, key),
        }));

        initializeDatasets(processedDatasets);
    };

    const createDatasetStyle = (ctx, index) => {
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        const color = "#"+bgColors[index % bgColors.length];

        gradient.addColorStop(0, `${color}88`);
        gradient.addColorStop(1, `${color}00`);

        return {
            backgroundColor: gradient,
            borderColor: color,
            tension: 0.4,
            pointStyle: false,
            fill: true,
        };
    };

    // Event handlers
    const handlePeriodChange = (selectedPeriod) => {
        setPeriod(selectedPeriod);
        const now = new Date();
        const start = calculateStartDate(now, selectedPeriod);

        setStartDate(formatDateForInput(start));
        setEndDate(formatDateForInput(now));
        fetchChartData(
            selectedPeriod,
            formatDateForAPI(start),
            formatDateForAPI(now)
        );
    };

    const calculateStartDate = (now, selectedPeriod) => {
        const start = new Date(now);
        const option = PERIOD_OPTIONS.find(
            (opt) => opt.value === selectedPeriod
        );

        if (option.days) start.setDate(now.getDate() - option.days);
        if (option.months) start.setMonth(now.getMonth() - option.months);
        if (option.years) start.setFullYear(now.getFullYear() - option.years);

        return start;
    };
    const handleTotalCheckbox = (newSelectedDatasets) => {
        // Toggle total checkbox
        const isTotalChecked = !newSelectedDatasets["total"];

        // Update all checkboxes
        Object.keys(newSelectedDatasets).forEach((key) => {
            newSelectedDatasets[key] = key === "total" ? isTotalChecked : false;
        });

        // Update chart data
        setTempAccount(
            isTotalChecked
                ? accounts.filter((account) => account.label === "total")
                : []
        );
    };

    const handleIndividualCheckbox = (label, newSelectedDatasets) => {
        // Toggle the clicked checkbox
        newSelectedDatasets[label] = !newSelectedDatasets[label];
        // Always uncheck total when individual account is selected
        newSelectedDatasets["total"] = false;

        // Update chart data with selected accounts
        const selectedAccounts = accounts.filter(
            (account) => newSelectedDatasets[account.label]
        );
        setTempAccount(selectedAccounts);
    };

    const handleCheckboxChange = (label) => {
        const newSelectedDatasets = { ...selectedDatasets };

        if (label === "total") {
            handleTotalCheckbox(newSelectedDatasets);
        } else {
            handleIndividualCheckbox(label, newSelectedDatasets);
        }

        setSelectedDatasets(newSelectedDatasets);
    };

    // Initialize chart data
    useEffect(() => {
        const now = new Date();
        const start = new Date(now);
        start.setDate(now.getDate() - 30);

        setStartDate(formatDateForInput(start));
        setEndDate(formatDateForInput(now));
        fetchChartData("DAILY", formatDateForAPI(start), formatDateForAPI(now));
    }, []);

    // Render components
    return (
        <div className="w-full card bg-base-100 shadow-md">
            <div className="card-body w-full items-center">
                {/* Period selector and date range */}
                <div className="flex justify-between w-full mb-4">
                    <select
                        value={period}
                        onChange={(e) => handlePeriodChange(e.target.value)}
                        className="select select-bordered w-full max-w-xs"
                    >
                        {PERIOD_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>

                    <DateRangeSelector
                        startDate={startDate}
                        endDate={endDate}
                        onStartDateChange={setStartDate}
                        onEndDateChange={setEndDate}
                        onApply={() =>
                            fetchChartData(
                                period,
                                formatDateForAPI(new Date(startDate)),
                                formatDateForAPI(new Date(endDate), true)
                            )
                        }
                    />
                </div>

                {/* Chart and checkboxes */}
                <div className="flex justify-center h-full w-full flex-col items-center">
                    <ChartDisplay
                        ref={chartRef}
                        labels={labels}
                        datasets={tempAccount}
                    />
                    <DatasetCheckboxes
                        accounts={accounts}
                        selectedDatasets={selectedDatasets}
                        onChange={handleCheckboxChange}
                    />
                </div>
            </div>
        </div>
    );
}


