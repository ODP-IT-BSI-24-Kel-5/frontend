"use client";

import { useState } from "react";
import { ChevronRight, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function TransferPage() {
  const router = useRouter();
  const [showBalance, setShowBalance] = useState(true);
  const [recipientType, setRecipientType] = useState("input"); // input, choose, new

  const handleRecipientClick = (type) => {
    setRecipientType(type);
    // Navigasi ke halaman berikutnya berdasarkan tipe
    if (type === "choose") {
      router.push("/transactions/transfer/choose");
    } else if (type === "new") {
      router.push("/transactions/transfer/new");
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-4">Recipient</h2>


          {/* Choose Recipient Option */}
          <button
            onClick={() => handleRecipientClick("choose")}
            className="w-full bg-white rounded-lg p-4 shadow-sm border flex items-center justify-between mb-3"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center">
                <Image
                  src="/walletCards.png"
                  alt="Wallet"
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
              </div>
              <span>Choose Recipient</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          {/* New Recipient Option */}
          <button
            onClick={() => handleRecipientClick("new")}
            className="w-full bg-white rounded-lg p-4 shadow-sm border flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center">
                <Image
                  src="/walletCards.png"
                  alt="Wallet"
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
              </div>
              <span>New Recipient</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
};