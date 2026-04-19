import React, { useEffect, useState } from "react";

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const [paymentsRes, usersRes] = await Promise.all([
        fetch("http://localhost:5000/all-payments"),
        fetch("http://localhost:5000/users"),
      ]);

      const payments = await paymentsRes.json();
      const users = await usersRes.json();

      const paymentNotifications = payments.slice(0, 5).map((p) => ({
        id: p._id,
        message: `💳 New payment from ${p.email} - ৳${p.amount}`,
        time: new Date(p.date).toLocaleString(),
        type: "payment",
      }));

      const userNotifications = users.slice(0, 5).map((u) => ({
        id: u._id,
        message: `👤 New user registered: ${u.email}`,
        time: "Recently",
        type: "user",
      }));

      setNotifications([...paymentNotifications, ...userNotifications]);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-700 mb-6">
        🔔 Admin Notifications
      </h1>

      <div className="space-y-4">
        {notifications.length === 0 ? (
          <p className="text-gray-500">No notifications available</p>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className="p-4 bg-white rounded-xl shadow border flex justify-between items-center"
            >
              <div>
                <p className="text-gray-800 font-medium">{n.message}</p>
                <p className="text-sm text-gray-500">{n.time}</p>
              </div>

              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  n.type === "payment"
                    ? "bg-green-100 text-green-600"
                    : "bg-blue-100 text-blue-600"
                }`}
              >
                {n.type}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Notifications;