"use client";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function PinInputModal({ isOpen, onClose, onConfirm }) {
    const [pin, setPin] = useState(["", "", "", "", "", ""]);
    const [showPin, setShowPin] = useState(false);
    const [error, setError] = useState("");

    const handlePinChange = (index, value) => {
        if (value.length > 1) return;
        if (!/^\d*$/.test(value)) return;

        const newPin = [...pin];
        newPin[index] = value;
        setPin(newPin);

        if (value && index < 5) {
            document.getElementById(`pin-${index + 1}`)?.focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const pinString = pin.join("");

        if (pinString.length !== 6) {
            setError("Please enter a complete 6-digit PIN");
            return;
        }

        try {
            onClose();
            await onConfirm(pinString);
            resetPin();
        } catch (err) {
            setError(err.message);
            resetPin();
        }
    };

    const resetPin = () => {
        setPin(["", "", "", "", "", ""]);
        setError("");
    };
    useEffect(() => {
        if (isOpen) {
            resetPin();
        }
    }, [isOpen]);

    useEffect(() => {
        if (error) {
            resetPin(); // Reset PIN on error
        }
    }, [error]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-md mx-4 p-6">
                <h2 className="text-xl font-semibold mb-4">Enter PIN</h2>
                <p className="text-gray-600 mb-6">
                    Please enter your 6-digit PIN to confirm transfer
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="flex justify-center gap-2 mb-6">
                        {pin.map((digit, index) => (
                            <input
                                key={index}
                                id={`pin-${index}`}
                                type={showPin ? "text" : "password"}
                                value={digit}
                                onChange={(e) =>
                                    handlePinChange(index, e.target.value)
                                }
                                className="w-12 h-12 text-center border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary"
                                maxLength={1}
                                required
                            />
                        ))}
                    </div>

                    <div className="flex justify-end mb-6">
                        <button
                            type="button"
                            onClick={() => setShowPin(!showPin)}
                            className="btn btn-ghost btn-sm"
                        >
                            {showPin ? (
                                <>
                                    <EyeOff className="w-4 h-4 mr-2" /> Hide PIN
                                </>
                            ) : (
                                <>
                                    <Eye className="w-4 h-4 mr-2" /> Show PIN
                                </>
                            )}
                        </button>
                    </div>

                    {error && (
                        <div className="alert alert-error mb-4">{error}</div>
                    )}

                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn btn-ghost"
                        >
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Confirm
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
