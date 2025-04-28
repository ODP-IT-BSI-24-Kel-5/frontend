export const CHART_COLORS_TW = {
    dark: [
        "bg-[#FFC13A]", // yellow
        "bg-[#74C799]", // green
        "bg-[#FF7A7A]", // red
        "bg-[#7AC7FF]", // blue
        "bg-[#B69CFF]", // purple
    ],
    light: [
        "bg-[#FFC13A]", // yellow
        "bg-[#74C799]", // green
        "bg-[#FF7A7A]", // red
        "bg-[#7AC7FF]", // blue
        "bg-[#B69CFF]", // purple
    ],
}
export const CHART_COLORS = {
    dark: [
        "FFC13A", // yellow
        "74C799", // green
        "FF7A7A", // red
        "7AC7FF", // blue
        "B69CFF", // purple
    ],
    light: [
        "FFC13A", // yellow
        "74C799", // green
        "FF7A7A", // red
        "7AC7FF", // blue
        "B69CFF", // purple
    ],
}
export const PERIOD_OPTIONS = [
    { value: "DAILY", label: "Daily (Last 30 days)", days: 30 },
    { value: "WEEKLY", label: "Weekly (Last 10 weeks)", days: 70 },
    { value: "MONTHLY", label: "Monthly (Last 10 months)", months: 10 },
    { value: "QUARTERLY", label: "Quarterly (Last 10 quarters)", months: 30 },
    { value: "YEARLY", label: "Yearly (Last 10 years)", years: 10 },
];
export const CHART_DEFAULT_OPTIONS = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top',
        }
    }
};