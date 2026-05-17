import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  FaMoneyBillTrendUp,
  FaUsersLine,
  FaTruckMedical,
  FaBoxOpen,
} from "react-icons/fa6";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Seller = () => {
  const [stats, setStats] = useState({});
  const [orders, setOrders] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/seller-stats/${user?.email}`)
      .then((res) => setStats(res.data));

    axios
      .get(`${import.meta.env.VITE_API_URL}/seller-orders/${user?.email}`)
      .then((res) => setOrders(res.data));
  }, []);

  const chartData = [
    {
      name: "Products",
      value: stats.totalProducts || 0,
    },
    {
      name: "Orders",
      value: stats.totalOrders || 0,
    },
    {
      name: "Revenue",
      value: stats.totalRevenue || 0,
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* TOP HEADER */}

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-sky-600">
          Welcome Back, {user?.name}
        </h1>

        <p className="text-gray-500 mt-2">Here is your business overview</p>
      </div>

      {/* STATS CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Revenue */}

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">Revenue</p>

              <h2 className="text-3xl font-bold text-green-500">
                ৳ {stats.totalRevenue || 0}
              </h2>
            </div>

            <FaMoneyBillTrendUp className="text-5xl text-green-400" />
          </div>
        </div>

        {/* Orders */}

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">Orders</p>

              <h2 className="text-3xl font-bold text-blue-500">
                {stats.totalOrders || 0}
              </h2>
            </div>

            <FaTruckMedical className="text-5xl text-blue-400" />
          </div>
        </div>

        {/* Products */}

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">Products</p>

              <h2 className="text-3xl font-bold text-purple-500">
                {stats.totalProducts || 0}
              </h2>
            </div>

            <FaBoxOpen className="text-5xl text-purple-400" />
          </div>
        </div>

        {/* Low Stock */}

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">Low Stock</p>

              <h2 className="text-3xl font-bold text-red-500">
                {stats.lowStock || 0}
              </h2>
            </div>

            <FaUsersLine className="text-5xl text-red-400" />
          </div>
        </div>
      </div>

      {/* CHART */}

      <div className="bg-white rounded-2xl shadow-lg p-6 mt-10">
        <h2 className="text-2xl font-bold mb-6">Business Overview</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* RECENT ORDERS */}

      <div className="bg-white rounded-2xl shadow-lg p-6 mt-10">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold">Recent Orders</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Transaction ID</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {orders.slice(0, 5).map((order, index) => (
                <tr key={order._id}>
                  <td>{index + 1}</td>

                  <td>{order.transactionId}</td>

                  <td>৳ {order.amount}</td>

                  <td>
                    <span className="badge badge-success">{order.status}</span>
                  </td>

                  <td>{new Date(order.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Seller;
