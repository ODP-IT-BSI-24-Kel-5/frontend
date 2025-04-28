import { Line } from "react-chartjs-2";
import { forwardRef } from "react";
import { config } from "process";

const ChartDisplay = forwardRef(({ labels, datasets }, ref) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
        },
        elements: {
            point: {
                borderWidth: 0,
                radius: 20,
                backgroundColor: "#FFFFFF00",
            },
        },
    };

    const data = {
        labels,
        datasets,
    };

    return <Line ref={ref} options={options} data={data} />;
});

ChartDisplay.displayName = "ChartDisplay";
export default ChartDisplay;
