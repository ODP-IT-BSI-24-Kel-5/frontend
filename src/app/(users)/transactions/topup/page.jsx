"use client";
import { ScanQrCode } from "lucide-react";
import TopUpTab from "../_components/TopUpTab";
import { useState } from "react";
import ScanQrTab from "../_components/ScanQrTab";

// Komponen utama dengan tab navigasi
export default function TransactionsPage() {
  const [activeTab, setActiveTab] = useState("topup");

  return (
    <div>
      {/* Tab Navigation */}
      <div className="flex border-b mb-4">
        <button
          className={`flex-1 p-3 text-center ${
            activeTab === "topup" ? "border-b-2 border-blue-500 font-bold" : ""
          }`}
          onClick={() => setActiveTab("topup")}
        >
          Top Up
        </button>
        <button
          className={`flex-1 p-3 text-center ${
            activeTab === "scanqr" ? "border-b-2 border-blue-500 font-bold" : ""
          }`}
          onClick={() => setActiveTab("scanqr")}
        >
          Scan QR
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "topup" && <TopUpTab />}
        {activeTab === "scanqr" && <ScanQrTab  />}
      </div>
    </div>
  );
}