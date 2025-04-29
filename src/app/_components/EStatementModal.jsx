import { useState } from 'react';
import Cookies from 'js-cookie';
import { getEstatement } from '../api';
import toast from 'react-hot-toast';

export default function EStatementModal({ isOpen, onClose, wallets }) {
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedWallet, setSelectedWallet] = useState('');
    const [loading, setLoading] = useState(false);

    const months = [
        { value: '01', label: 'January' },
        { value: '02', label: 'February' },
        { value: '03', label: 'March' },
        { value: '04', label: 'April' },
        { value: '05', label: 'May' },
        { value: '06', label: 'June' },
        { value: '07', label: 'July' },
        { value: '08', label: 'August' },
        { value: '09', label: 'September' },
        { value: '10', label: 'October' },
        { value: '11', label: 'November' },
        { value: '12', label: 'December' }
    ];

    const years = Array.from(
        { length: 5 },
        (_, i) => new Date().getFullYear() - i
    );

    const handleDownload = async () => {
        try {
            setLoading(true);
            let params = `?month=${selectedMonth}&year=${selectedYear}`;
            
            if (selectedWallet) {
                params = `/${selectedWallet}?month=${selectedMonth}&year=${selectedYear}`;
            }

            const response = await getEstatement(params)
            if (!(response.status == 200)) throw new Error('Failed to download statement');

            const downloadUrl = window.URL.createObjectURL(response.data);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = `statement-${selectedYear}-${selectedMonth}${selectedWallet ? `-${selectedWallet}` : ''}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(downloadUrl);
            onClose();
            toast.success("Download E-Statement successful!");
        } catch (error) {
            console.error('Error downloading statement:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <dialog className="modal modal-open">
            <div className="modal-box">
                <h3 className="font-bold text-lg mb-4">Download E-Statement</h3>
                
                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">Wallet (Optional)</span>
                    </label>
                    <select
                        className="select select-bordered w-full"
                        value={selectedWallet}
                        onChange={(e) => setSelectedWallet(e.target.value)}
                    >
                        <option value="">All Wallets</option>
                        {wallets.map((wallet) => (
                            <option key={wallet.number} value={wallet.number}>
                                {wallet.name} ({wallet.number})
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">Month</span>
                    </label>
                    <select
                        className="select select-bordered w-full"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        required
                    >
                        <option value="" disabled>Select Month</option>
                        {months.map((month) => (
                            <option key={month.value} value={month.value}>
                                {month.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-control mb-6">
                    <label className="label">
                        <span className="label-text">Year</span>
                    </label>
                    <select
                        className="select select-bordered w-full"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        required
                    >
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="modal-action">
                    <button
                        className="btn btn-primary"
                        onClick={handleDownload}
                        disabled={loading || !selectedMonth}
                    >
                        {loading ? "Downloading..." : "Download"}
                    </button>
                    <button className="btn" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
            <div className="modal-backdrop" onClick={onClose}></div>
        </dialog>
    );
}