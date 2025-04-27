"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { fetchTransactions, fetchWallet } from "../api";
import { formatCurrency } from "@/utils/FormatCurrency";
import TransactionDetailModal from "./TransactionDetailModal";
import EStatementModal from "./EStatementModal";
import TablePagination from "./table/TablePagination";
import TableRow from "./table/TableRow";
import TableHeader from "./table/TableHeader";
import TableFilters from "./table/TableFilters";

export default function TransactionTable() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [search, setSearch] = useState("");
    const [totalPages, setTotalPages] = useState(0);
    const [sort, setSort] = useState("createdAt");
    const [direction, setDirection] = useState("desc");
    const [meta, setMeta] = useState(null);
    const [wallets, setWallets] = useState([]);
    const [walletFilter, setWalletFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    const [isEStatementModalOpen, setIsEStatementModalOpen] = useState(false);
    const handleShowDetails = (transaction) => {
        setSelectedTransaction(transaction);
    };

    const fetchWallets = async () => {
        try {
            const token = Cookies.get("token");
            var walletData = await fetchWallet(token);
            setWallets(walletData.data.wallets);
        } catch (error) {
            console.error("Error fetching wallets:", error);
        }
    };
    useEffect(() => {
        fetchWallets();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const token = Cookies.get("token");
            const data = await fetchTransactions(token, {
                page: currentPage,
                size: pageSize,
                sort,
                direction,
                search: search || undefined,
                sender_number: walletFilter || undefined,
                type: typeFilter || undefined,
            });
            setTransactions(data.data);
            setMeta(data.meta);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchWallets();
    }, []);

    useEffect(() => {
        fetchData();
    }, [currentPage, pageSize, sort, direction, walletFilter, typeFilter, search]);

    const handleSort = (column) => {
        setDirection(sort === column ? (direction === "asc" ? "desc" : "asc") : "asc");
        setSort(column);
    };

    return (
        <div className="card bg-base-100">
            <div className="card-body p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <h2 className="text-xl font-bold">Transaction History</h2>
                    <button
                        className="btn btn-primary btn-sm"
                        onClick={() => setIsEStatementModalOpen(true)}
                    >
                        Download E-Statement
                    </button>
                </div>

                <TableFilters
                    search={search}
                    onSearchChange={setSearch}
                    onSearchSubmit={(e) => {
                        e.preventDefault();
                        setCurrentPage(1);
                    }}
                    walletFilter={walletFilter}
                    onWalletFilterChange={(value) => {
                        setWalletFilter(value);
                        setCurrentPage(1);
                    }}
                    typeFilter={typeFilter}
                    onTypeFilterChange={(value) => {
                        setTypeFilter(value);
                        setCurrentPage(1);
                    }}
                    wallets={wallets}
                    onClearFilters={() => {
                        setWalletFilter("");
                        setTypeFilter("");
                        setCurrentPage(1);
                        fetchData();
                    }}
                />

                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <TableHeader
                                sort={sort}
                                direction={direction}
                                onSort={handleSort}
                            />
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="12" className="text-center py-8">
                                        <span className="loading loading-spinner loading-md"></span>
                                    </td>
                                </tr>
                            ) : transactions.length === 0 ? (
                                <tr>
                                    <td colSpan="12" className="text-center py-8">
                                        No transactions found
                                    </td>
                                </tr>
                            ) : (
                                transactions.map((transaction, index) => (
                                    <TableRow
                                        key={transaction.id}
                                        transaction={transaction}
                                        index={index}
                                        currentPage={currentPage}
                                        pageSize={pageSize}
                                        onShowDetails={setSelectedTransaction}
                                    />
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <TablePagination
                    meta={meta}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                    pageSize={pageSize}
                    onPageSizeChange={setPageSize}
                />

                {selectedTransaction && (
                    <TransactionDetailModal
                        transaction={selectedTransaction}
                        isOpen={!!selectedTransaction}
                        onClose={() => setSelectedTransaction(null)}
                    />
                )}

                <EStatementModal
                    isOpen={isEStatementModalOpen}
                    onClose={() => setIsEStatementModalOpen(false)}
                    wallets={wallets}
                />
            </div>
        </div>
    );
}