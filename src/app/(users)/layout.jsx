import Navbar from "@/components/Navbar";
import Footer from "../_components/Footer";

export default function DashboardLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="container mx-auto px-4 py-6 flex-grow">
                {children}
            </div>
            <div className="divider"></div>
            <div className="container mx-auto px-4">
                <Footer />
            </div>
            <div className="py-4 text-center text-sm bg-base-200">
                <p>Made by Bank Syariah Indonesia. All rights reserved.</p>
            </div>
        </div>
    );
}
