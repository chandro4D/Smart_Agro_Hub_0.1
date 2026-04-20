import React, { useEffect, useState } from "react";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // GET NOTIFICATIONS
  useEffect(() => {
    fetch("http://localhost:5000/notifications")
      .then((res) => res.json())
      .then((data) => {
        setNotifications(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching notifications:", err);
        setLoading(false);
      });
  }, []);

  // MARK AS READ
  const markAsRead = async (id) => {
    try {
      await fetch(`http://localhost:5000/notifications/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });

      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n)),
      );
    } catch (error) {
      console.error("Error updating notification:", error);
    }
  };

  if (loading) {
    return <p className="p-6">Loading notifications...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">🔔 Notifications</h1>

      <div className="space-y-4">
        {notifications.length === 0 ? (
          <p>No notifications found</p>
        ) : (
          notifications.map((n) => (
            <div
              key={n._id}
              className={`p-4 rounded-xl shadow border ${
                n.read ? "bg-gray-100" : "bg-white"
              }`}
            >
              <p className="font-medium">{n.message}</p>

              <p className="text-sm text-gray-500">
                {new Date(n.createdAt).toLocaleString()}
              </p>

              {!n.read && (
                <button
                  onClick={() => markAsRead(n._id)}
                  className="mt-2 text-sm text-blue-600"
                >
                  Mark as read
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Notifications;
