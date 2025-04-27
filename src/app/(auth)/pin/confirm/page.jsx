"use client";

import { useState, useEffect } from 'react';
import { KeyRound } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ConfirmPINPage() {
  const router = useRouter();
  const [pin, setPin] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [originalPin, setOriginalPin] = useState('');

  useEffect(() => {
    const tempPIN = sessionStorage.getItem('tempPIN');
    if (!tempPIN) {
      router.push('/PIN/create');
    }
    setOriginalPin(tempPIN);
  }, []);

  const handlePinChange = (index, value) => {
    if (isNaN(value)) return;

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    if (value !== '' && index < 5) {
      const nextInput = document.getElementById(`confirm-pin-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && index > 0 && pin[index] === '') {
      const newPin = [...pin];
      newPin[index - 1] = '';
      setPin(newPin);
      const prevInput = document.getElementById(`confirm-pin-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmedPin = pin.join('');
    
    if (confirmedPin.length !== 6) {
      setError('Please enter a complete 6-digit PIN');
      return;
    }

    if (confirmedPin !== originalPin) {
      setError('PINs do not match. Please try again.');
      setPin(['', '', '', '', '', '']);
      const firstInput = document.getElementById('confirm-pin-0');
      if (firstInput) firstInput.focus();
      return;
    }

    try {
      // Here you would make an API call to save the PIN
    //   await savePIN(confirmedPin);
      sessionStorage.removeItem('tempPIN');
      router.push('/dashboard');
    } catch (err) {
      setError('Failed to save PIN. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
            <KeyRound className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="mt-6 text-2xl font-bold text-gray-900">
            Confirm Your PIN
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please confirm your PIN to ensure you've entered it correctly.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="flex justify-center gap-2">
            {pin.map((digit, index) => (
              <input
                key={index}
                id={`confirm-pin-${index}`}
                type="password"
                maxLength="1"
                value={digit}
                onChange={(e) => handlePinChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center border-2 rounded-lg text-lg font-bold focus:border-emerald-500 focus:ring-emerald-500 outline-none"
                required
              />
            ))}
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
          >
            Create PIN
          </button>
        </form>
      </div>
    </div>
  );
}