import React from "react";

function AdminHome() {
    const stats = [
        { title: "Total Users", value: "1,250", color: "bg-blue-500" },
        { title: "Total Products", value: "320", color: "bg-green-500" },
        { title: "Total Orders", value: "845", color: "bg-yellow-500" },
        { title: "Total Revenue", value: "$12,400", color: "bg-purple-500" },
    ];

    const orders = [
        { id: "#101", user: "John Doe", status: "Pending", price: "$120" },
        { id: "#102", user: "Sarah Smith", status: "Shipped", price: "$80" },
        { id: "#103", user: "Alex Brown", status: "Delivered", price: "$200" },
    ];

    const users = [
        { name: "Rahim Uddin", email: "rahim@gmail.com" },
        { name: "Karim Mia", email: "karim@gmail.com" },
        { name: "Nusrat Jahan", email: "nusrat@gmail.com" },
    ];

    return (
        <div className="p-6 bg-gray-100 min-h-screen  w-[1250px]">

            {/* Header */}
            <div className="mb-6 text-center">
                <h1 className="text-4xl  font-bold text-gray-800 mt-[20px]">
                    Admin Dashboard
                </h1>
                <p className="text-gray-500 text-base">Welcome back! Manage your store easily.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {stats.map((item, i) => (
                    <div
                        key={i}
                        className={`${item.color} text-white p-5 rounded-2xl shadow-md`}
                    >
                        <p className="text-sm">{item.title}</p>
                        <h2 className="text-2xl font-bold">{item.value}</h2>
                    </div>
                ))}
            </div>

            {/* Main Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Recent Orders */}
                <div className="lg:col-span-2 bg-white p-5 rounded-2xl shadow">
                    <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>

                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-gray-500 border-b">
                                <th className="py-2">Order ID</th>
                                <th>User</th>
                                <th>Status</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, i) => (
                                <tr key={i} className="border-b">
                                    <td className="py-2">{order.id}</td>
                                    <td>{order.user}</td>
                                    <td>
                                        <span className="px-2 py-1 text-xs rounded bg-gray-200">
                                            {order.status}
                                        </span>
                                    </td>
                                    <td>{order.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Recent Users */}
                <div className="bg-white p-5 rounded-2xl shadow">
                    <h2 className="text-xl font-semibold mb-4">New Users</h2>

                    <ul className="space-y-3">
                        {users.map((user, i) => (
                            <li key={i} className="border-b pb-2">
                                <p className="font-medium">{user.name}</p>
                                <p className="text-sm text-gray-500">{user.email}</p>
                            </li>
                        ))}
                    </ul>

                    {/* Quick Actions */}
                    <div className="mt-6">
                        <h3 className="font-semibold mb-2">Quick Actions</h3>
                        <button className="w-full mb-2 bg-blue-500 text-white py-2 rounded-lg">
                            Add Product
                        </button>
                        <button className="w-full mb-2 bg-green-500 text-white py-2 rounded-lg">
                            Manage Orders
                        </button>
                        <button className="w-full bg-purple-500 text-white py-2 rounded-lg">
                            Manage Users
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminHome;