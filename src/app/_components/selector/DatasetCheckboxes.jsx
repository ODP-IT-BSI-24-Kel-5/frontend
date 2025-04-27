import { CHART_COLORS, CHART_COLORS_TW } from "@/Constant/constant";
import { useTheme } from "@/theme-provider";

export default function DatasetCheckboxes({
    accounts,
    selectedDatasets,
    onChange,
}) {
    const { theme } = useTheme();
    const colors = CHART_COLORS[theme];

    const getCheckboxStyles = (index) => {
        const color = `#${colors[index % colors.length]}`;
        return {
            checkbox: `checkbox checkbox-sm`,
            style: {
                '--chkbg': color,
                '--chkfg': '#ffffff',
                borderColor: color
            }
        };
    };

    return (
        <div className="flex flex-wrap gap-3 p-2">
            {accounts.map((item, index) => {
                const { checkbox, style } = getCheckboxStyles(index);
                return (
                    <label 
                        key={item.label} 
                        className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                    >
                        <input
                            type="checkbox"
                            checked={selectedDatasets[item.label] || false}
                            onChange={() => onChange(item.label)}
                            className={checkbox}
                            style={style}
                        />
                        <span className="text-sm font-medium">
                            {item.label}
                        </span>
                    </label>
                );
            })}
        </div>
    );
}