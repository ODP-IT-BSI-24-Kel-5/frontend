
  // components/BalanceAndSpendingSection.jsx
  export default function BalanceAndSpendingSection() {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <div className="flex justify-between items-center">
              <h2 className="font-bold">Total Balance</h2>
              <button className="btn btn-ghost btn-circle btn-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
              </button>
            </div>
            
            <div className="flex items-center gap-4 mt-4">
              <div className="avatar">
                <div className="w-12 h-12 rounded-full bg-base-200 flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
              </div>
              <div>
                <div className="text-xl font-bold mb-1">Rp 800.000.000</div>
                <div className="badge badge-success">+22% per year</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <div className="flex justify-between items-center">
              <h2 className="font-bold">Top Spendings</h2>
              <button className="btn btn-ghost btn-xs">VIEW ALL</button>
            </div>
            
            <div className="mt-4">
              <div className="flex justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="avatar">
                    <div className="w-8 h-8 rounded-full bg-base-200 flex items-center justify-center">
                      🍔
                    </div>
                  </div>
                  <span>Food</span>
                </div>
                <span className="font-bold">Rp 1.500.000,00</span>
              </div>
              <progress className="progress progress-primary w-full" value="60" max="100"></progress>
            </div>
            
            <div className="mt-4">
              <div className="flex justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="avatar">
                    <div className="w-8 h-8 rounded-full bg-base-200 flex items-center justify-center">
                      🚗
                    </div>
                  </div>
                  <span>Transport</span>
                </div>
                <span className="font-bold">Rp 1.000.000,00</span>
              </div>
              <progress className="progress progress-primary w-full" value="40" max="100"></progress>
            </div>
          </div>
        </div>
      </div>
    );
  }