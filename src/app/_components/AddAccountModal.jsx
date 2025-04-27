import { useState } from 'react';
import Cookies from 'js-cookie';

export default function AddAccountModal({ isOpen, onClose, onSuccess, walletsCount }) {
    const [formData, setFormData] = useState({
        name: '',
        main: false
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Check wallet limit
        if (walletsCount >= 5) {
            setError("Maximum wallet limit reached (5 wallets)");
            setLoading(false);
            return;
        }

        try {
            const token = Cookies.get('token');
            const response = await fetch('http://localhost:8081/api/v1/users/wallets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                if (data.error === "You have wallet with the same name!") {
                    throw new Error("A wallet with this name already exists");
                }
                throw new Error(data.error || "Failed to create wallet");
            }

            onSuccess();
            onClose();
            setFormData({ name: '', main: false }); // Reset form
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <dialog className="modal modal-open">
            <div className="modal-box">
                <h3 className="font-bold text-lg mb-4">Create New Account</h3>
                
                {walletsCount >= 5 ? (
                    <div className="alert alert-warning mb-4">
                        <span>You have reached the maximum limit of 5 wallets</span>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Account Name</span>
                            </label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                                placeholder="Enter wallet name"
                            />
                        </div>

                        <div className="form-control mb-6">
                            <label className="label cursor-pointer">
                                <span className="label-text">Set as Main Account</span>
                                <input
                                    type="checkbox"
                                    className="checkbox"
                                    checked={formData.main}
                                    onChange={(e) => setFormData({ ...formData, main: e.target.checked })}
                                />
                            </label>
                        </div>

                        {error && (
                            <div className="alert alert-error mb-4">
                                <span>{error}</span>
                            </div>
                        )}

                        <div className="modal-action">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                            >
                                {loading ? 'Creating...' : 'Create Account'}
                            </button>
                            <button
                                type="button"
                                className="btn"
                                onClick={onClose}
                                disabled={loading}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
            </div>
            <div className="modal-backdrop" onClick={onClose}></div>
        </dialog>
    );
}