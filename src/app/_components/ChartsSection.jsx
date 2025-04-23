
import AccountCarousel from "./AccountCarousel";

// components/ChartsSection.jsx
export default function ChartsSection() {
    return (
        <div className="flex my-8 gap-5">
            {/* Donut Chart */}
            <AccountCarousel />

            {/* Line Chart */}
            <div className="w-full card bg-base-100 shadow-md">
                <div className="card-body">
                    <div className="flex justify-between items-center">
                        <h2 className="font-bold">Balance Statistics</h2>
                        <p className="text-sm">10 August 2023</p>
                    </div>

                    <div className="h-48 w-full">
                        {/* This would be replaced with an actual chart component */}
                        <div className="flex items-end w-full h-full justify-between">
                            <div className="w-8 bg-primary h-1/4"></div>
                            <div className="w-8 bg-primary h-1/3"></div>
                            <div className="w-8 bg-primary h-2/3"></div>
                            <div className="w-8 bg-primary h-1/2"></div>
                            <div className="w-8 bg-primary h-3/4"></div>
                            <div className="w-8 bg-primary h-1/3"></div>
                            <div className="w-8 bg-primary h-1/4"></div>
                            <div className="w-8 bg-primary h-1/2"></div>
                        </div>
                    </div>

                    <div className="flex justify-between text-xs text-base-content/70 mt-2">
                        <span>Jan</span>
                        <span>Feb</span>
                        <span>Mar</span>
                        <span>Apr</span>
                        <span>May</span>
                        <span>Jun</span>
                        <span>Jul</span>
                        <span>Aug</span>
                    </div>

                    <div className="flex gap-4 justify-center mt-4">
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                defaultChecked
                                className="checkbox checkbox-primary checkbox-sm"
                            />
                            <span>Payment Account</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                className="checkbox checkbox-secondary checkbox-sm"
                            />
                            <span>Savings Account</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                className="checkbox checkbox-accent checkbox-sm"
                            />
                            <span>Corporate Account</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
