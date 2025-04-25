import Navbar from "@/components/Navbar";

export default function UserLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="relative h-screen bg-base-200 flex justify-center items-center p-6 pt-22">
                <div className="w-full max-w-md bg-base-100 p-6 rounded-xl shadow-md h-fit ">
                    {children}
                </div>
            </div>
        </div>
    );
}
