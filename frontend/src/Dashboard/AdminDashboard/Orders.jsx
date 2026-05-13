import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch orders
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/all-payments`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      });
  }, []);

  // Handle status update
  const handleStatusChange = async (id, newStatus) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/payments/status/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      }
    );

    const data = await res.json();

    if (data.success) {
      setOrders((prev) =>
        prev.map((order) =>
          order._id === id ? { ...order, status: newStatus } : order
        )
      );
    }
  };

  // Status badge color
  const getStatusStyle = (status) => {
    switch (status) {
      case "VALID":
      case "delivered":
        return "bg-green-100 text-green-700";
      case "processing":
        return "bg-blue-100 text-blue-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-red-100 text-red-700";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-500 text-lg">Loading orders...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-500">
        No orders found.
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen w-[1250px]">
      <h1 className="text-3xl font-bold mb-6 text-gray-700">
        Orders & Payments
      </h1>

      <div className="bg-white shadow-md rounded-xl overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Customer</th>
              <th className="px-6 py-3">Transaction</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order, index) => (
              <tr
                key={order._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 font-medium">{index + 1}</td>

                <td className="px-6 py-4">
                  <p className="font-semibold text-gray-700">
                    {order.email}
                  </p>
                </td>

                <td className="px-6 py-4 text-gray-500 text-xs">
                  {order.transactionId}
                </td>

                <td className="px-6 py-4 font-semibold text-green-600">
                  ৳ {order.amount}
                </td>

                <td className="px-6 py-4 text-gray-500">
                  {new Date(order.date).toLocaleDateString()}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="px-6 py-4 flex gap-2 justify-center">
                  {/* View Details */}
                  <button
                    onClick={() =>
                      navigate(`/dashboard/order/${order.transactionId}`)
                    }
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
                  >
                    View
                  </button>

                  {/* Status Change */}
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    className="border rounded px-2 py-1 text-xs"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;