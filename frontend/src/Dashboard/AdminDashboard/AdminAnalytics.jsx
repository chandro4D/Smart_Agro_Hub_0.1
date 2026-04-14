import React, { useEffect, useState } from "react";

function AdminAnalytics() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then(setUsers);

    fetch("http://localhost:5000/allProducts")
      .then((res) => res.json())
      .then(setProducts);

    fetch("http://localhost:5000/all-payments")
      .then((res) => res.json())
      .then(setPayments);
  }, []);

  const totalRevenue = payments.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0
  );

  const totalOrders = payments.length;

  // Roles
  const adminCount = users.filter(
    (u) => u.role === "admin"
  ).length;

  const sellerCount = users.filter(
    (u) => u.role === "seller"
  ).length;

  const userCount = users.filter(
    (u) => u.role === "user"
  ).length;

  // Categories
  const categoryCount = {};
  products.forEach((item) => {
    const cat = item.category || "Unknown";
    categoryCount[cat] = (categoryCount[cat] || 0) + 1;
  });

  const categoryData = Object.entries(categoryCount);
  const maxCategory =
    Math.max(...Object.values(categoryCount), 1);

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-[1250px]">
      <h1 className="text-3xl font-bold text-center mb-8">
        📊 Smart Agro Hub Analytics
      </h1>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <Card title="Revenue" value={`৳${totalRevenue}`} />
        <Card title="Orders" value={totalOrders} />
        <Card title="Users" value={users.length} />
        <Card title="Products" value={products.length} />
      </div>

      {/* Roles + Categories */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Roles */}
        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-xl font-semibold mb-4">
            👥 User Roles
          </h2>

          <ProgressRow
            label="Admin"
            value={adminCount}
            total={users.length}
            color="bg-red-500"
          />

          <ProgressRow
            label="Seller"
            value={sellerCount}
            total={users.length}
            color="bg-yellow-500"
          />

          <ProgressRow
            label="User"
            value={userCount}
            total={users.length}
            color="bg-blue-500"
          />
        </div>

        {/* Categories */}
        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-xl font-semibold mb-4">
            📦 Product Categories
          </h2>

          {categoryData.map(([name, total], index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>{name}</span>
                <span>{total}</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-full"
                  style={{
                    width: `${(total / maxCategory) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Payments */}
      <div className="bg-white rounded-xl shadow p-5">
        <h2 className="text-xl font-semibold mb-4">
          💳 Recent Transactions
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3">Email</th>
                <th className="p-3">Transaction</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {payments.slice(0, 5).map((pay) => (
                <tr key={pay._id} className="border-b">
                  <td className="p-3">{pay.email}</td>
                  <td className="p-3">{pay.transactionId}</td>
                  <td className="p-3">৳{pay.amount}</td>
                  <td className="p-3">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      {pay.status}
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

function Card({ title, value }) {
  return (
    <div className="bg-white rounded-xl shadow p-5 text-center">
      <h3 className="text-gray-500">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}

function ProgressRow({
  label,
  value,
  total,
  color,
}) {
  const percent = total ? (value / total) * 100 : 0;

  return (
    <div className="mb-5">
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span>{value}</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className={`${color} h-3 rounded-full`}
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
}

export default AdminAnalytics;