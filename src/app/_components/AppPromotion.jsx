// components/AppPromotion.jsx
export default function AppPromotion() {
    return (
        <div className="bg-primary text-primary-content py-12 px-6 rounded-lg my-8 text-center">
            <h2 className="text-2xl font-bold mb-2">Try our mobile app</h2>
            <p className="mb-6">
                All the features you need, packed into a mobile friendly
                version.
                <br />
                Ready to go, anywhere and everywhere that you go!
            </p>

            <div className="flex justify-center gap-4">
                <button className="btn btn-outline btn-secondary">
                    <svg
                        className="w-6 h-6 mr-2"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    Download on the App Store
                </button>
                <button className="btn btn-outline btn-secondary">
                    <svg
                        className="w-6 h-6 mr-2"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M3 20.69a2.9 2.9 0 0 0 2.24 1.35c.9.13 1.76-.22 2.54-.77l.84-.62-5.42-9.4L3 20.69zM5.4 2.96c-.15.42-.24.93-.24 1.5v14.84l6-10.38L7.1 4.27l-1.7-2.97zm9.4 7.33l-2.35-4.08c-.23-.41-.63-.72-1.1-.84a1.7 1.7 0 0 0-.95.06l4.4 7.65zM7.27 22.17c.65.48 1.4.8 2.18.87 1.01.09 1.98-.29 2.85-.95a16.2 16.2 0 0 0 6.43-7.84c.23-.77.35-1.56.25-2.34-.11-.84-.52-1.61-1.16-2.18L7.27 22.17zM14.23 3.2c-.78.59-1.47 1.36-2.02 2.27l1.5 2.6 1.97 3.42 1.79 3.1L24 7.95c-.68-.65-1.59-.95-2.54-.87-.81.08-1.64.39-2.4.8l-4.83 3.55V10.9c0-2.24-.07-2.7-.84-3.87-.45-.67-1.2-1.38-1.63-1.72-.42-.3-1.05-.7-1.53-.93z" />
                    </svg>
                    Get it on Google Play
                </button>
            </div>
        </div>
    );
}
