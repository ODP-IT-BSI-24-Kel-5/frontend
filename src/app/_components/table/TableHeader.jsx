export default function TableHeader({ sort, direction, onSort }) {
    const SortableHeader = ({ column, children }) => (
        <th
            className="cursor-pointer hover:bg-base-200"
            onClick={() => onSort(column)}
        >
            <div className="flex items-center gap-2">
                {children}
                {sort === column && (
                    <span>{direction === "asc" ? "↑" : "↓"}</span>
                )}
            </div>
        </th>
    );

    return (
        <tr>
            <th>No</th>
            <SortableHeader column="transactionNumber">
                Transaction Number
            </SortableHeader>
            <SortableHeader column="amount">Amount</SortableHeader>
            <SortableHeader column="createdAt">Date</SortableHeader>
            <SortableHeader column="type">Type</SortableHeader>
            <SortableHeader column="wallet">Sender Account</SortableHeader>
            <th>Sender Name</th>
            <SortableHeader column="associateWallet">
                Acquirer Account
            </SortableHeader>
            <th>Sender Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Notes</th>
            <th>Action</th>
        </tr>
    );
}
