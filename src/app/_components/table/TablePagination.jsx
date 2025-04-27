export default function TablePagination({
    meta,
    currentPage,
    onPageChange,
    pageSize,
    onPageSizeChange,
}) {
    if (!meta) return null;

    return (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
            <div className="join">
                <button
                    className="join-item btn btn-sm"
                    disabled={!meta.has_previous}
                    onClick={() => onPageChange(currentPage - 1)}
                >
                    «
                </button>
                <button className="join-item btn btn-sm no-animation">
                    Page {meta.current_page} of {meta.total_pages}
                </button>
                <button
                    className="join-item btn btn-sm"
                    disabled={!meta.has_next}
                    onClick={() => onPageChange(currentPage + 1)}
                >
                    »
                </button>
            </div>

            <select
                className="select select-bordered select-sm"
                value={pageSize}
                onChange={(e) => onPageSizeChange(Number(e.target.value))}
            >
                {[5, 10, 20, 30, 50].map((size) => (
                    <option key={size} value={size}>
                        {size} per page
                    </option>
                ))}
            </select>
        </div>
    );
}
