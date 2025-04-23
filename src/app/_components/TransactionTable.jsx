
  
  // components/TransactionTable.jsx
  export default function TransactionTable() {
    return (
      <div className="overflow-x-auto">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">Transaction History</h2>
          <div className="flex gap-2">
            <div className="join">
              <input type="text" placeholder="Type keyword Search" className="input input-bordered join-item" />
              <button className="btn join-item">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
            </div>
            <select className="select select-bordered">
              <option>Date</option>
            </select>
            <select className="select select-bordered">
              <option>Category</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>No</th>
                <th>ID</th>
                <th>No. Transaction</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Date</th>
                <th>Acquirer Account</th>
                <th>Sender Account</th>
                <th>Description</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Array(8).fill().map((_, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>12490</td>
                  <td>00099999</td>
                  <td>+1,000,000.00</td>
                  <td>Topup</td>
                  <td>Jan 1, 2024</td>
                  <td>1099990</td>
                  <td>00018146</td>
                  <td>Bayar Mini Soccer</td>
                  <td>
                    <span className="badge badge-success">Success</span>
                  </td>
                  <td>
                    <button className="btn btn-xs">Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="flex justify-between mt-4">
          <button className="btn btn-outline">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
            </svg>
            Download History Transaction
          </button>
          <select className="select select-bordered">
            <option>10 Rows</option>
          </select>
        </div>
      </div>
    );
  }