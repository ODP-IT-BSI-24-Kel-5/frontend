import { formatCurrency } from "@/utils/FormatCurrency";

export default function TableRow({
    transaction,
    index,
    currentPage,
    pageSize,
    onShowDetails,
}) {
    return (
        <tr key={transaction.id}>
            <td>{(currentPage - 1) * pageSize + index + 1}</td>
            <td>{transaction.transaction_number}</td>
            <td>{formatCurrency(transaction.amount)}</td>
            <td>{new Date(transaction.created_at).toLocaleDateString()}</td>
            <td>
                <span
                    className={`badge ${
                        transaction.type === "TRANSFER"
                            ? "badge-primary"
                            : "badge-secondary"
                    }`}
                >
                    {transaction.type}
                </span>
            </td>
            <td>{transaction.wallet}</td>
            <td>{transaction.wallet_name}</td>
            <td>{transaction.associate_wallet}</td>
            <td>{transaction.associate_name}</td>
            <td>{transaction.description}</td>
            <td>{transaction.notes}</td>
            <td>
                <button
                    className="btn btn-xs btn-ghost"
                    onClick={() => onShowDetails(transaction)}
                >
                    Details
                </button>
            </td>
        </tr>
    );
}
