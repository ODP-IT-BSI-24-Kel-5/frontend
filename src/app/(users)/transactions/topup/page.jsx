"use client";
import { ScanQrCode } from "lucide-react";
import TopUpTab from "../_components/TopUpTab";
import { useState } from "react";

// Komponen utama dengan tab navigasi
export default function TransactionsPage() {
  const [activeTab, setActiveTab] = useState("TopUpTab");

  return (
    <div>
      {/* Tab Navigation */}
      <div className="flex border-b mb-4">
        <button
          className={`flex-1 p-3 text-center ${
            activeTab === "TopUpTab" ? "border-b-2 border-blue-500 font-bold" : ""
          }`}
          onClick={() => setActiveTab("TopUpTab")}
        >
          Top Up
        </button>
        <button
          className={`flex-1 p-3 text-center ${
            activeTab === "ScanQrTab" ? "border-b-2 border-blue-500 font-bold" : ""
          }`}
          onClick={() => setActiveTab("ScanQrTab")}
        >
          Scan QR
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "TopUpTab" && <TopUpTab />}
        {activeTab === "ScanQrTab" && <ScanQrCode />}
      </div>
    </div>
  );
}