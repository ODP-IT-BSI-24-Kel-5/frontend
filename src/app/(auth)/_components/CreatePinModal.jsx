"use client";
import { useState } from 'react';
import useProfileStore from '@/stores/profileStore';
import { toast } from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';

export default function CreatePinModal({ isOpen, onClose }) {
    const createUserPin = useProfileStore(state => state.createUserPin);
    const [pin, setPin] = useState(['', '', '', '', '', '']);
    const [confirmPin, setConfirmPin] = useState(['', '', '', '', '', '']);
    const [step, setStep] = useState(1); // 1 for first PIN, 2 for confirmation
    const [showPin, setShowPin] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handlePinChange = (index, value, isPinConfirmation = false) => {
        if (value.length > 1) return;
        if (!/^\d*$/.test(value)) return;

        const newPin = isPinConfirmation ? [...confirmPin] : [...pin];
        newPin[index] = value;
        isPinConfirmation ? setConfirmPin(newPin) : setPin(newPin);

        // Auto-focus next input
        if (value && index < 5) {
            const nextInput = document.getElementById(`${isPinConfirmation ? 'confirm-' : ''}pin-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleNext = (e) => {
        e.preventDefault();
        const pinString = pin.join('');
        
        if (pinString.length !== 6) {
            setError('Please enter a complete 6-digit PIN');
            return;
        }

        setStep(2);
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const pinString = pin.join('');
        const confirmPinString = confirmPin.join('');
        
        if (pinString !== confirmPinString) {
            setError('PINs do not match');
            return;
        }

        try {
            setIsLoading(true);
            await createUserPin(pinString, confirmPinString);
            toast.success('PIN created successfully');
            onClose();
        } catch (err) {
            setError(err.message || 'Failed to create PIN');
            toast.error('Failed to create PIN');
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setPin(['', '', '', '', '', '']);
        setConfirmPin(['', '', '', '', '', '']);
        setStep(1);
        setError('');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-base-100 p-6 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6">
                    {step === 1 ? 'Create Your PIN' : 'Confirm Your PIN'}
                </h2>
                <p className="text-base-content/70 mb-8">
                    {step === 1 
                        ? 'Create a 6-digit PIN to secure your transactions' 
                        : 'Please re-enter your PIN to confirm'
                    }
                </p>

                <form onSubmit={step === 1 ? handleNext : handleSubmit}>
                    <div className="flex justify-center gap-2 mb-6">
                        {(step === 1 ? pin : confirmPin).map((digit, index) => (
                            <input
                                key={index}
                                id={`${step === 2 ? 'confirm-' : ''}pin-${index}`}
                                type={showPin ? "text" : "password"}
                                value={digit}
                                onChange={(e) => handlePinChange(index, e.target.value, step === 2)}
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
                                <><EyeOff className="w-4 h-4 mr-2" /> Hide PIN</>
                            ) : (
                                <><Eye className="w-4 h-4 mr-2" /> Show PIN</>
                            )}
                        </button>
                    </div>

                    {error && (
                        <div className="alert alert-error mb-4">
                            {error}
                        </div>
                    )}

                    <div className="flex justify-end gap-4">
                        {step === 2 && (
                            <button
                                type="button"
                                onClick={resetForm}
                                className="btn btn-ghost"
                                disabled={isLoading}
                            >
                                Back
                            </button>
                        )}
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn btn-ghost"
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <><span className="loading loading-spinner"></span>Creating...</>
                            ) : step === 1 ? (
                                'Next'
                            ) : (
                                'Create PIN'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}