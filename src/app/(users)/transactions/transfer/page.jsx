"use client";

import { useEffect, useState } from "react";
import { ChevronRight, Eye, EyeOff, Loader, Plus, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { DynamicIcon } from "lucide-react/dynamic";
import TransferConfirmation from "../_components/TransferConfirmation";
import toast, { Toaster } from "react-hot-toast";
import {
    fetchCategory,
    fetchLatestRecipients,
    fetchWallet,
    searchWallet,
    transferFunds,
} from "@/app/api";
import { formatCurrency } from "@/utils/FormatCurrency";

export default function TransferInputPage() {
    const [showBalance, setShowBalance] = useState(false);
    const [walletNumber, setWalletNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [formattedAmount, setFormattedAmount] = useState("Rp. ");
    const [note, setNote] = useState("");
    const [showAccountDropdown, setShowAccountDropdown] = useState(false);
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [selectedAccountId, setSelectedAccountId] = useState(null);
    const [showRecentDropdown, setShowRecentDropdown] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [searchMode, setSearchMode] = useState(false);
    const [accounts, setAccounts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [recipients, setRecipients] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [selectedRecipient, setSelectedRecipient] = useState(null);
    const [selectedCategoryId, setSelectedCategoryId] = useState([]);
    const [showSearch, setShowSearch] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({
        recipient: "",
        amount: "",
        account: "",
    });

    // Get selected account
    const selectedAccount =
        accounts.find((acc) => acc.number === selectedAccountId) || null;
    const selectedCategory =
        categories.find((cat) => cat.id === selectedCategoryId) || null;

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [recipientsData, accountsData, categoryData] =
                    await Promise.all([
                        fetchLatestRecipients(),
                        fetchWallet(),
                        fetchCategory(),
                    ]);

                setRecipients(recipientsData || []);
                setAccounts(accountsData || []);
                setCategories(categoryData || []);

                // Set first account as default if available
                if (accountsData.data?.length > 0) {
                    setSelectedAccountId(accountsData.data[0].number);
                }
            } catch (error) {
                toast.error("Failed to load data. Please refresh the page.");
                console.error("Fetch error:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const validateForm = () => {
        const newErrors = {};

        if (!walletNumber) {
            newErrors.recipient = "Please select a recipient";
        }

        if (!amount || parseInt(amount) <= 0) {
            newErrors.amount = "Please enter a valid amount";
        }

        if (!selectedAccountId) {
            newErrors.account = "Please select an account";
        }

        if (
            selectedAccount &&
            parseInt(amount) > parseInt(selectedAccount.balance)
        ) {
            newErrors.amount = "Insufficient balance";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleTransfer = () => {
        if (validateForm()) {
            setShowConfirmation(true);
        }
    };

    const handleConfirmTransfer = async (pin) => {
        setIsSubmitting(true);
        try {
            const transferData = {
                sender_account: selectedAccount.number,
                acquirer_account: walletNumber,
                amount: parseInt(amount),
                category: parseInt(selectedCategoryId),
                pin,
            };

            var data = await transferFunds(transferData);
            return data;
        } catch (error) {
            console.error("Transfer error:", error);
            return error;
        } finally {
            setIsSubmitting(false);
            // setShowConfirmation(false);
        }
    };

    const resetForm = () => {
        setWalletNumber("");
        setAmount("");
        setFormattedAmount("Rp. ");
        setNote("");
        setErrors({});
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    const handleAmountChange = (e) => {
        const value = e.target.value;
        if (value.startsWith("Rp. ")) {
            // remove non digit
            const numericValue = value.slice(4).replace(/[^\d]/g, "");
            setAmount(numericValue);

            //Thousand separator
            const formattedValue = new Intl.NumberFormat("id-ID").format(
                numericValue
            );
            setFormattedAmount(`Rp. ${formattedValue}`);
        } else {
            setFormattedAmount("Rp. ");
            setAmount("");
        }
    };

    const handleRecipientSelect = (recipientNumber) => {
        setWalletNumber(recipientNumber);
        setShowRecentDropdown(false);
    };

    // Validation for enabling the transfer button
    const isFormValid =
        Boolean(walletNumber) &&
        Boolean(amount) &&
        Boolean(selectedAccountId) &&
        Boolean(selectedAccountId != walletNumber);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchInput) return;

        setIsSearching(true);
        try {
            const wallet = await searchWallet(searchInput);
            setSelectedRecipient(wallet);
            setWalletNumber(wallet.number);
            setShowRecentDropdown(false);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsSearching(false);
        }
    };
    return (
        <div className="space-y-4">
            <Toaster position="top-center" />
            {/* Add name */}
            <div className="border-b items-center p-2">
                <h1 className="text-lg font-medium text-center">Transfer</h1>
            </div>

            {/* Recipient Input */}
            <div>
                <div className="flex justify-between items-center mb-2">
                    <label className="block font-semibold">
                        Recipient Account
                    </label>
                    <button
                        onClick={() => setSearchMode(!searchMode)}
                        className="text-primary text-sm hover:underline"
                    >
                        {searchMode ? "← Back to recent" : "Search by number →"}
                    </button>
                </div>
                <div className="relative space-y-2">
                    {searchMode ? (
                        <form onSubmit={handleSearch} className="flex gap-2">
                            <input
                                type="text"
                                value={searchInput}
                                onChange={(e) => {
                                    const value = e.target.value.replace(
                                        /[^\d]/g,
                                        ""
                                    );
                                    setSearchInput(value);
                                }}
                                placeholder="Enter wallet number"
                                className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <button
                                type="submit"
                                disabled={isSearching || !searchInput}
                                className="btn btn-primary"
                            >
                                {isSearching ? (
                                    <Loader className="w-4 h-4 animate-spin" />
                                ) : (
                                    <Search className="w-4 h-4" />
                                )}
                            </button>
                        </form>
                    ) : (
                        <></>
                    )}
                    {/* Selected Recipient or Dropdown Trigger */}
                    <button
                        onClick={() =>
                            setShowRecentDropdown(!showRecentDropdown)
                        }
                        className="w-full flex justify-between items-center border border-gray-300 rounded-lg p-3 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center gap-3">
                            {selectedRecipient || walletNumber ? (
                                <>
                                    <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                                        <Image
                                            src="/profile.png"
                                            alt="Profile"
                                            width={42}
                                            height={42}
                                            className="w-full h-full rounded-lg"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-left">
                                            {selectedRecipient.user_name ||
                                                selectedRecipient.name}
                                        </p>
                                        <p className="font-semibold text-left"></p>
                                        {selectedRecipient && (
                                            <p className="text-sm text-gray-600">
                                                <span className="font-semibold">
                                                    {selectedRecipient?.name ||
                                                        recipients.find((r) =>
                                                            r.name.includes(
                                                                walletNumber
                                                            )
                                                        )?.name ||
                                                        walletNumber}
                                                </span>{" "}
                                                - {selectedRecipient.number}
                                            </p>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <span className="text-gray-400 font-medium">
                                    Select from recent or search by number
                                </span>
                            )}
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-600" />
                    </button>

                    {/* Recent Recipients Dropdown */}
                    {showRecentDropdown && (
                        <ul className="absolute z-20 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-2 max-h-64 overflow-auto">
                            {recipients.map((recipient) => (
                                <li
                                    key={recipient.number}
                                    onClick={() => {
                                        handleRecipientSelect(recipient.number);
                                        setSelectedRecipient({
                                            user_name: recipient.user_name,
                                            name: recipient.name,
                                            number: recipient.number,
                                        });
                                    }}
                                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer"
                                >
                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                                        <Image
                                            src="/profile.png"
                                            alt="Profile"
                                            width={40}
                                            height={40}
                                            className="w-full h-full rounded-lg"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-left">
                                            {recipient.user_name ||
                                                recipient.name}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            <span className="font-semibold">
                                                {recipient.name}{" "}
                                            </span>{" "}
                                            - {recipient.number}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                {errors.recipient && (
                    <p className="text-error text-sm mt-1">
                        {errors.recipient}
                    </p>
                )}
            </div>

            {/* Amount Input */}
            <div>
                <label className="block mb-2 font-semibold">Amount</label>
                <input
                    type="text"
                    value={formattedAmount}
                    onChange={handleAmountChange}
                    onFocus={(e) => {
                        const length = e.target.value.length;
                        e.target.setSelectionRange(length, length);
                    }}
                    className="w-full border border-gray-300 rounded-md p-3 text-black text-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
            </div>

            {/* Choose Account */}
            <div>
                <label className="block mb-2 font-semibold">
                    Choose Accounts
                </label>
                <div className="relative">
                    <button
                        onClick={() =>
                            setShowAccountDropdown(!showAccountDropdown)
                        }
                        className="w-full flex justify-between items-center border border-gray-300 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center gap-3">
                            {selectedAccount || selectedAccountId ? (
                                <>
                                    <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                                        <Image
                                            src="/profile.png"
                                            alt="Profile"
                                            width={42}
                                            height={42}
                                            className="w-full h-full rounded-lg"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-left">
                                            {selectedAccount.number}
                                        </p>
                                        {selectedAccount && (
                                            <p className="text-left text-sm text-gray-600">
                                                <span className="font-semibold">
                                                    {selectedAccount?.name ||
                                                        recipients.find((r) =>
                                                            r.name.includes(
                                                                walletNumber
                                                            )
                                                        )?.name ||
                                                        walletNumber}{" "}
                                                </span>
                                                -
                                                {formatCurrency(
                                                    selectedAccount.balance
                                                )}
                                            </p>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <span className="text-gray-400 font-medium">
                                    Select your account!
                                </span>
                            )}
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-600" />
                    </button>

                    {showAccountDropdown && (
                        <ul className="absolute z-20 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-2 max-h-64 overflow-auto">
                            {accounts.map((account) => (
                                <li
                                    key={account.number}
                                    onClick={() => {
                                        setSelectedAccountId(account.number);
                                        setShowAccountDropdown(false);
                                    }}
                                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer"
                                >
                                    <Image
                                        src={
                                            account.image ||
                                            "/placeholder-avatar.png"
                                        }
                                        alt={account.name}
                                        width={40}
                                        height={40}
                                        className="rounded"
                                    />
                                    <div>
                                        <p className="text-left font-medium">
                                            {account.number}
                                        </p>
                                        <p className="text-left text-sm text-gray-600">
                                            {account.name} -Rp{" "}
                                            {new Intl.NumberFormat(
                                                "id-ID"
                                            ).format(account.balance)}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                {errors.account && (
                    <p className="text-error text-sm mt-1">{errors.account}</p>
                )}
            </div>

            <div>
                <label className="block mb-2 font-semibold">
                    Choose Category
                </label>
                <div className="relative">
                    <button
                        onClick={() =>
                            setShowCategoryDropdown(!showCategoryDropdown)
                        }
                        className="w-full flex justify-between items-center border border-gray-300 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center gap-3">
                            {selectedCategory ? (
                                <>
                                    <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                                        <DynamicIcon
                                            name={
                                                selectedCategory.icon ||
                                                "camera"
                                            }
                                            size={42}
                                            className="text-primary"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-left">
                                            {selectedCategory?.name}
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <span className="text-gray-400 font-medium">
                                    Select category!
                                </span>
                            )}
                        </div>

                        <ChevronRight className="w-5 h-5 text-gray-600" />
                    </button>

                    {showCategoryDropdown && (
                        <ul className="absolute z-20 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-2 max-h-64 overflow-auto">
                            {categories.map((category) => (
                                <li
                                    key={category.id}
                                    onClick={() => {
                                        setSelectedCategoryId(category.id);
                                        setShowCategoryDropdown(false);
                                    }}
                                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer"
                                >
                                    <DynamicIcon
                                        name={category.icon || "camera"}
                                        size={42}
                                        className="text-primary"
                                    />
                                    <div>
                                        <p className="font-medium">
                                            {category.name}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                {errors.account && (
                    <p className="text-error text-sm mt-1">{errors.account}</p>
                )}
            </div>

            {/* Note Input */}
            <div>
                <input
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Add note (optional)"
                    className="w-full p-3 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
            </div>

            {/* Transfer Button */}
            <button
                onClick={handleTransfer}
                disabled={isSubmitting || !isFormValid}
                className={`w-full p-3 text-white font-semibold rounded-md transition-colors
        ${
            isFormValid && !isSubmitting
                ? "bg-emerald-500 hover:bg-emerald-600"
                : "bg-gray-300 cursor-not-allowed"
        }`}
            >
                {isSubmitting ? (
                    <>
                        <Loader className="w-5 h-5 animate-spin inline mr-2" />
                        Processing...
                    </>
                ) : (
                    "Transfer"
                )}
            </button>

            {/* Transfer Confirmation */}
            <TransferConfirmation
                isOpen={showConfirmation}
                onClose={() => {
                    if (!isSubmitting) {
                        setShowConfirmation(false);
                        resetForm(); // Only reset form when manually closing
                    }
                }}
                onConfirm={handleConfirmTransfer}
                isSubmitting={isSubmitting}
                transferData={{
                    recipient:
                        recipients.find((r) => r.name.includes(walletNumber))
                            ?.name || walletNumber,
                    amount: formattedAmount,
                    note,
                }}
                selectedAccount={selectedAccount}
                onSuccess={() => {
                    setShowConfirmation(false);
                    resetForm();
                }}
            />
        </div>
    );
}
// "use client";

// import { useState } from "react";
// import { ChevronRight, Eye, EyeOff } from "lucide-react";
// import Image from "next/image";

// export default function TransferInputPage() {
//   const [showBalance, setShowBalance] = useState(true);
//   const [walletNumber, setWalletNumber] = useState("");
//   const [amount, setAmount] = useState("");
//   const [formattedAmount, setFormattedAmount] = useState("Rp. ");
//   const [note, setNote] = useState("");
//   const [showAccountDropdown, setShowAccountDropdown] = useState(false);
//   const [selectedAccountId, setSelectedAccountId] = useState("1");
//   const [showRecentDropdown, setShowRecentDropdown] = useState(false);

//   const accounts = [
//     {
//       id: "1",
//       name: "Payment Account",
//       balance: "Rp. 10.000.000,00",
//       image: "/walletCards.png",
//     },
//     {
//       id: "2",
//       name: "Savings Account",
//       balance: "Rp. 5.000.000,00",
//       image: "/walletCards.png",
//     },
//     // ...add more accounts as needed
//   ];

//   const selectedAccount = accounts.find((acc) => acc.id === selectedAccountId);

//   const handleAmountChange = (e) => {
//     const value = e.target.value;
//     if (value.startsWith("Rp. ")) {
//       const numericValue = value.slice(4).replace(/[^\d]/g, "");
//       setAmount(numericValue);

//       //Thousand separator
//       const formattedValue = new Intl.NumberFormat('id-ID').format(numericValue);
//       setFormattedAmount(`Rp. ${formattedValue}`);
//     } else {
//       setFormattedAmount("Rp. ");
//       setAmount("");
//     }
//   };
//   const recipients = [
//     { id: 1, name: 'John Doe - 1234567890' },
//     { id: 2, name: 'Jane Smith - 0987654321' },
//   ];

//   const handleRecipientSelect = (recipientNumber) => {
//     setWalletNumber(recipientNumber);
//     setShowRecentDropdown(false);
//   };

//   // Validation for enabling the transfer button
//   const isFormValid = Boolean(walletNumber) && Boolean(amount) && Boolean(selectedAccountId);

//   return (
//     <div className="space-y-4">
//       {/* Add name */}
//       <div className="border-b items-center p-2">
//         <h1 className="text-lg font-medium text-center">Transfer</h1>
//       </div>
//       {/* Recipient Input */}
//       <div>
//         <label className="block mb-2 font-semibold">Recipient</label>
//         <div className="relative">
//           <input
//             type="text"
//             value={walletNumber}
//             onChange={(e) => {
//               const value = e.target.value.replace(/[^\d]/g, ''); // Only allow numbers
//               setWalletNumber(value);
//             }}
//             onFocus={() => setShowRecentDropdown(true)}
//             placeholder="Input Wallet Number"
//             className="w-full border border-gray-300 rounded-md p-3 text-black focus:outline-none focus:ring-2 focus:ring-emerald-500"
//           />

//           {/* Recent Recipients Dropdown */}
//           {showRecentDropdown && recipients.length > 0 && (
//             <ul className="absolute z-20 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-48 overflow-auto">
//               {recipients.map((recipient) => {
//                 const recipientNumber = recipient.name.split(' - ')[1];
//                 return (
//                   <li
//                     key={recipient.id}
//                     onClick={() => handleRecipientSelect(recipientNumber)}
//                     className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
//                   >
//                     <p className="text-sm font-medium">{recipient.name}</p>
//                   </li>
//                 );
//               })}
//             </ul>
//           )}
//         </div>
//       </div>

//       {/* Amount Input */}
//       <div>
//         <label className="block mb-2 font-semibold">Amount</label>
//         <input
//           type="text"
//           value={formattedAmount}
//           onChange={handleAmountChange}
//           onFocus={(e) => {
//             const length = e.target.value.length;
//             e.target.setSelectionRange(length, length);
//           }}
//           className="w-full border border-gray-300 rounded-md p-3 text-black focus:outline-none focus:ring-2 focus:ring-emerald-500"
//           placeholder="Rp."
//         />
//       </div>

//       {/* Choose Account */}
//       <div>
//         <label className="block mb-2 font-semibold">Choose Accounts</label>
//         <div className="relative">
//           <button
//             onClick={() => setShowAccountDropdown(!showAccountDropdown)}
//             className="w-full flex justify-between items-center border border-gray-300 rounded-lg p-4 hover:shadow-md transition-shadow"
//           >
//             <div className="flex items-center gap-3">
//               <Image
//                 src={selectedAccount.image}
//                 alt="Card"
//                 width={50}
//                 height={50}
//                 className="rounded"
//               />
//               <div>
//                 <p className="font-semibold text-left">{selectedAccount.name}</p>
//                 <p className="text-sm text-gray-600">
//                   {showBalance ? selectedAccount.balance : "••••••••••••••"}
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setShowBalance(!showBalance);
//                 }}
//               >
//                 {showBalance ? (
//                   <Eye className="w-5 h-5 text-gray-600" />
//                 ) : (
//                   <EyeOff className="w-5 h-5 text-gray-600" />
//                 )}
//               </button>
//               <ChevronRight className="w-5 h-5 text-gray-600" />
//             </div>
//           </button>

//           {showAccountDropdown && (
//             <ul className="absolute z-20 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-2 max-h-64 overflow-auto">
//               {accounts.map((account) => (
//                 <li
//                   key={account.id}
//                   onClick={() => {
//                     setSelectedAccountId(account.id);
//                     setShowAccountDropdown(false);
//                   }}
//                   className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer"
//                 >
//                   <Image
//                     src={account.image}
//                     alt={account.name}
//                     width={40}
//                     height={40}
//                     className="rounded"
//                   />
//                   <div>
//                     <p className="font-medium">{account.name}</p>
//                     <p className="text-sm text-gray-600">{account.balance}</p>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>

//       {/* Note Input */}
//       <div>
//         <input
//           type="text"
//           value={note}
//           onChange={(e) => setNote(e.target.value)}
//           placeholder="Add note (optional)"
//           className="w-full p-3 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-emerald-500"
//         />
//       </div>

//       {/* Transfer Button */}
//       <button
//         onClick={() => {
//           if (isFormValid) {
//             handleTransfer();
//           }
//         }}
//         disabled={!isFormValid}
//         className={`w-full p-3 text-white font-semibold rounded-md transition-colors
//           ${
//             isFormValid
//               ? 'bg-emerald-500 hover:bg-emerald-600'
//               : 'bg-gray-300 cursor-not-allowed'
//           }`}
//       >
//         Transfer
//       </button>
//     </div>
//   );
// };
