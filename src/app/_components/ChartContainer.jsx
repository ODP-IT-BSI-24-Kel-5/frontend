export default function ChartContainer({ title, children, className = "" }) {
    return (
        <div className={`card bg-base-100 shadow-lg ${className}`}>
            <div className="card-body p-4 md:p-6">
                {title && <h2 className="card-title mb-4">{title}</h2>}
                {children}
            </div>
        </div>
    );
}
