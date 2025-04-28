export default function DateRangeSelector({ startDate, endDate, onStartDateChange, onEndDateChange, onApply }) {
    return (
        <div className="flex gap-2">
            <input
                type="date"
                value={startDate}
                onChange={(e) => onStartDateChange(e.target.value)}
                className="input input-bordered"
            />
            <input
                type="date"
                value={endDate}
                onChange={(e) => onEndDateChange(e.target.value)}
                className="input input-bordered"
            />
            <button onClick={onApply} className="btn btn-primary">
                Apply
            </button>
        </div>
    );
}