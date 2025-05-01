import Navbar from "@/components/Navbar";
import Footer from "../app/_components/Footer";

export default function DashboardLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-base-200 ">
            <Navbar />
            <div className="container mx-auto px-4 py-6 flex-grow">
                {children}
            </div>
            <div className="divider bg-base-100 m-0"></div>
            <div className="px-0 mx-0 w-full bg-base-100">
                <Footer />
            </div>
            <div className="py-4 text-center text-sm bg-base-100">
                <p>Made by Bank Syariah Indonesia. All rights reserved.</p>
            </div>
        </div>
    );
}
