import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function OrderDetails() {
    const { trxId } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/payment-details/${trxId}`)
            .then(res => res.json())
            .then(data => {
                console.log("Order Data:", data); // 🔍 debug
                setData(data);
            });
    }, [trxId]);

    if (!data) {
        return (
            <div className="flex justify-center items-center h-40">
                <p className="text-gray-500 text-lg">Loading order details...</p>
            </div>
        );
    }

    const { payment, products } = data;

    return (
        <div className="p-6 bg-gray-50 min-h-screen w-[1250px]">

            {/* 🔙 Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="mb-4 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
            >
                ← Back
            </button>

            {/* 📦 Order Info */}
            <div className="bg-white shadow-md rounded-xl p-5 mb-6">
                <h1 className="text-2xl font-bold mb-4 text-gray-700">
                    Order Details
                </h1>

                <div className="grid md:grid-cols-2 gap-4 text-gray-600">
                    <p><strong>Email:</strong> {payment.email}</p>
                    <p><strong>Transaction ID:</strong> {payment.transactionId}</p>
                    <p><strong>Amount:</strong> <span className="text-green-600 font-semibold">৳ {payment.amount}</span></p>

                    <p>
                        <strong>Status:</strong>{" "}
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${payment.status === "VALID" || payment.status === "delivered"
                                    ? "bg-green-100 text-green-700"
                                    : payment.status === "pending"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : "bg-red-100 text-red-700"
                                }`}
                        >
                            {payment.status}
                        </span>
                    </p>
                </div>
            </div>

            {/* 🛒 Products Section */}
            <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-700">
                    Products
                </h2>

                {/* ❌ Empty State */}
                {!products || products.length === 0 ? (
                    <p className="text-gray-500">No products found for this order.</p>
                ) : (
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                        {products.map(product => (
                            <div
                                key={product._id}
                                className="bg-white shadow-sm hover:shadow-md transition rounded-xl p-4"
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-40 w-full object-cover rounded mb-3"
                                />

                                <h3 className="font-semibold text-gray-700">
                                    {product.name}
                                </h3>

                                <p className="text-green-600 font-bold mt-1">
                                    ৳ {product.price}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default OrderDetails;