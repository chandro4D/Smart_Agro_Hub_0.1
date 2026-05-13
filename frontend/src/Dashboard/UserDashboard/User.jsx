import React, { useEffect, useState } from "react";
import { FaUser, FaShoppingCart, FaHistory, FaHeart, FaBoxOpen } from "react-icons/fa";
import useCart from "./../../store/useCart.js";
const User = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id;
    const [cart, refetch] = useCart(userId);

    const [stats, setStats] = useState({
        cartItems: 0,
        paymentHistory: 0,
        wishlistItems: 0,
        orders: 0,
    });

    const [recentPayments, setRecentPayments] = useState([]);
    const [recentCartItems, setRecentCartItems] = useState([]);

    useEffect(() => {
        if (!user?.email) return;

        // Fetch Cart Items
        fetch(`${import.meta.env.VITE_API_URL}/cart/${user.email}`)
            .then((res) => res.json())
            .then((data) => {
                setStats((prev) => ({ ...prev, cartItems: data.length }));

                // Map last 5 cart items for dashboard
                const mappedCart = data.slice(-5).reverse().map((item) => ({
                    name: item.productDetails?.name,
                    price: item.productDetails?.price,
                    quantity: item.quantity,
                }));
                setRecentCartItems(mappedCart);
            })
            .catch((err) => console.error(err));

        // Fetch Payment History
        fetch(`${import.meta.env.VITE_API_URL}/payment-history/${user.email}`)
            .then((res) => res.json())
            .then((data) => {
                setStats((prev) => ({ ...prev, paymentHistory: data.length }));

                // Map last 5 payments
                const mappedPayments = data.slice(-5).reverse().map((item) => ({
                    transactionId: item.transactionId,
                    amount: item.amount,
                    status: item.status,
                }));
                setRecentPayments(mappedPayments);
            })
            .catch((err) => console.error(err));

        // Fetch Wishlist
        fetch(`${import.meta.env.VITE_API_URL}/wishlist/${user.email}`)
            .then((res) => res.json())
            .then((data) => setStats((prev) => ({ ...prev, wishlistItems: data.length })))
            .catch((err) => console.error(err));

        // Fetch Orders
        fetch(`${import.meta.env.VITE_API_URL}/orders/${user.email}`)
            .then((res) => res.json())
            .then((data) => setStats((prev) => ({ ...prev, orders: data.length })))
            .catch((err) => console.error(err));
    }, [user]);

    if (!user) {
        return (
            <div className="flex justify-center items-center h-[70vh]">
                <h2 className="text-3xl text-red-500">Please login to access your dashboard</h2>
            </div>
        );
    }

    return (
        <div className="p-10 min-h-screen bg-gray-100 w-[1240px]">
            {/* Profile Section */}
            <div className="flex flex-col items-center mb-12">
                {user.PhotoURL ? (
                    <img
                        src={user.PhotoURL}
                        alt={user.name}
                        className="w-32 h-32 rounded-full text-center pt-6 border-4 border-indigo-500 object-cover"
                    />
                ) : (
                    <FaUser className="w-32 h-32 text-indigo-500" />
                )}
                <h1 className="text-4xl font-bold text-indigo-500 mt-4">{user.name}</h1>
                <p className="text-gray-700 mt-1">{user.email}</p>
                <p className="text-gray-500">{user.role?.toUpperCase()}</p>
            </div>

            {/* Stats Cards */}
            <div className="grid text-black grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                <StatCard icon={<FaShoppingCart />} label="Cart Items" value={cart?.length || 0} color="green-500" />
                <StatCard icon={<FaHistory />} label="Total Payments" value={recentPayments.reduce((sum, p) => sum + p.amount, 0)} color="pink-500" />
                <StatCard icon={<FaHeart />} label="Wishlist" value={stats.wishlistItems} color="pink-500" />
                <StatCard icon={<FaBoxOpen />} label="Total Orders" value={stats.paymentHistory} color="green-500" />
            </div>

            {/* Recent Activities */}
            <div className="grid text-black grid-cols-1 md:grid-cols-2 gap-6">
                <ActivityCard title="Recent Payments" data={recentPayments} type="payment" />
                <ActivityCard title="Recent Cart Items" data={recentCartItems} type="cart" />
            </div>
        </div>
    );
};

// Reusable Stat Card
const StatCard = ({ icon, label, value, color }) => (
    <div className={`bg-white shadow-lg rounded-lg p-6 flex items-center gap-4`}>
        <div className={`text-3xl text-${color}`}>{icon}</div>
        <div>
            <p className="text-gray-500">{label}</p>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    </div>
);

// Reusable Activity Card
const ActivityCard = ({ title, data, type }) => (
    <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        {data.length === 0 ? (
            <p className="text-gray-500">No {title.toLowerCase()}.</p>
        ) : (
            <ul className="space-y-2">
                {data.map((item, idx) => (
                    <li key={idx} className="border-b py-2 flex justify-between">
                        {type === "payment" ? (
                            <>
                                <span>{item.transactionId}</span>
                                <span className="font-semibold">৳{item.amount}</span>
                                <span className={`font-semibold ${item.status === "SUCCESS" ? "text-green-500" : "text-red-500"}`}>
                                    {item.status}
                                </span>
                            </>
                        ) : (
                            <>
                                <span>{item.name}</span>
                                <span className="font-semibold">Qty: {item.quantity}</span>
                                <span className="font-semibold">৳{item.price}</span>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        )}
    </div>
);

export default User;