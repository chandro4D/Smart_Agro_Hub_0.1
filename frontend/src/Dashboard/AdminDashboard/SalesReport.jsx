import React, { useEffect, useState } from "react";
import axios from "axios";

function SalesReport() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axios.get("http://localhost:5000/all-payments");
        setPayments(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  // Total Revenue
  const totalRevenue = payments.reduce(
    (sum, item) => sum + (item.amount || 0),
    0
  );

  // Total Orders
  const totalOrders = payments.length;

  // Average Order Value
  const avgOrder = totalOrders ? totalRevenue / totalOrders : 0;

  // Group monthly data manually
  const monthlyMap = {};

  payments.forEach((p) => {
    const month = new Date(p.date).toLocaleString("default", {
      month: "short",
      year: "numeric",
    });

    if (!monthlyMap[month]) {
      monthlyMap[month] = {
        month,
        sales: 0,
        orders: 0,
      };
    }

    monthlyMap[month].sales += p.amount || 0;
    monthlyMap[month].orders += 1;
  });

  const monthlyData = Object.values(monthlyMap);

  if (loading) {
    return <div className="p-6 text-gray-600">Loading sales report...</div>;
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen w-[1250px]">
      <h1 className="text-3xl font-bold text-gray-700">
        Sales Report
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-xl p-5">
          <h2 className="text-gray-500">Total Revenue</h2>
          <p className="text-2xl font-bold text-green-600">
            ৳ {totalRevenue.toFixed(2)}
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          <h2 className="text-gray-500">Total Orders</h2>
          <p className="text-2xl font-bold text-blue-600">
            {totalOrders}
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          <h2 className="text-gray-500">Average Order</h2>
          <p className="text-2xl font-bold text-purple-600">
            ৳ {avgOrder.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Monthly Sales Table */}
      <div className="bg-white shadow rounded-xl p-5">
        <h2 className="text-xl font-semibold mb-4">
          Monthly Sales Summary
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3">Month</th>
                <th className="p-3">Total Sales</th>
                <th className="p-3">Orders</th>
                <th className="p-3">Avg Order Value</th>
              </tr>
            </thead>

            <tbody>
              {monthlyData.length > 0 ? (
                monthlyData.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-3">{item.month}</td>
                    <td className="p-3 text-green-600 font-semibold">
                      ৳ {item.sales.toFixed(2)}
                    </td>
                    <td className="p-3">{item.orders}</td>
                    <td className="p-3">
                      ৳ {(item.sales / item.orders).toFixed(2)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="p-3 text-center" colSpan="4">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white shadow rounded-xl p-5">
        <h2 className="text-xl font-semibold mb-4">
          Recent Transactions
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3">Transaction ID</th>
                <th className="p-3">Email</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {payments.slice(0, 10).map((p) => (
                <tr key={p._id} className="border-t">
                  <td className="p-3 text-sm">{p.transactionId}</td>
                  <td className="p-3">{p.email}</td>
                  <td className="p-3 text-green-600">
                    ৳ {p.amount}
                  </td>
                  <td className="p-3">
                    {new Date(p.date).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SalesReport;