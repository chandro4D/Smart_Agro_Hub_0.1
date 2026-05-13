import React, { useEffect, useState } from "react";

function PaymentHistory() {
  const [payments, setPayments] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  // ✅ Show success alert after payment redirect
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("paid") === "true") {
      alert("✅ Payment successful!");
      // Optional: remove query string after showing alert
      window.history.replaceState({}, document.title, "/dashboard/paymentHistory");
    }
  }, []);
  // ✅ Fetch user payment history
  useEffect(() => {
    if (user?.email) {
      fetch(`${import.meta.env.VITE_API_URL}/payment-history/${user.email}`)
        .then(res => res.json())
        .then(data => {
          console.log("Payment History:", data);
          setPayments(data);
        });
    }
  }, [user]);

  return (
    <div className="p-8 w-[1250px] min-h-screen bg-gray-100 ">

      {/* HEADER */}
      <h1 className="text-3xl font-bold text-center mb-8 text-green-600">
        💳 Payment History
      </h1>

      {/* EMPTY STATE */}
      {payments.length === 0 ? (
        <div className="text-center mt-40">
          <h2 className="text-4xl text-pink-500 font-medium">
            No Payments Found
          </h2>
        </div>
      ) : (

        <>
          {/* SUMMARY */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10 text-green-600">
            <div className="bg-white p-5 rounded-xl shadow text-center">
              <h2 className="text-gray-500 text-lg">Total Order Items</h2>
              <p className="text-2xl  font-medium">{payments.length}</p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow text-center">
              <h2 className="text-gray-500 text-lg">Total Spent</h2>
              <p className="text-2xl font-medium ">
                ৳{payments.reduce((sum, p) => sum + p.amount, 0)}
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow text-center">
              <h2 className="text-gray-500 text-lg">Last Payment</h2>
              <p className="text-xl font-medium">
                {new Date(payments[0].date).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto bg-white rounded-xl shadow  text-green-600">
            <table className="table w-full text-center">
              <thead className="bg-green-500 text-white text-lg">
                <tr>
                  <th>#</th>
                  <th>Transaction</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Products</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((item, index) => (
                  <tr key={index} className="hover">
                    <td>{index + 1}</td>
                    <td className="font-mono text-sm">
                      {item.transactionId}
                    </td>
                    <td className="font-semibold">
                      ৳{item.amount}
                    </td>
                    <td>
                      <span className={`badge ${item.status === "VALID" || item.status === "SUCCESS"
                        ? "badge-success"
                        : "badge-error"
                        }`}>
                        {item.status}
                      </span>
                    </td>
                    <td>
                      {new Date(item.date).toLocaleString()}
                    </td>
                    <td>{item.productIds?.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
export default PaymentHistory;







