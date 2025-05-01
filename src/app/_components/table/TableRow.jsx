import { formatCurrency } from "@/utils/FormatCurrency";
import { DynamicIcon } from "lucide-react/dynamic";

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
                    className={`badge text-neutral-content  ${
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
            <td className="text-primary">
                {transaction.category_icon ? (
                    <div className="flex flex-col items-center gap-1">
                        <DynamicIcon
                            height={20}
                            width={20}
                            name={transaction.category_icon}
                        />
                        <p>{transaction.category}</p>
                    </div>
                ) : (
                    <p className="text-center">{transaction.category}</p>
                )}
            </td>
            <td>{transaction.notes}</td>
            <td>
                <button
                    className="btn btn-xs btn-accent text-neutral-content"
                    onClick={() => onShowDetails(transaction)}
                >
                    Details
                </button>
            </td>
        </tr>
    );
}
