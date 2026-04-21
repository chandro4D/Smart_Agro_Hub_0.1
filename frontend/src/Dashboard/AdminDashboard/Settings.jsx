import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Settings() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    PhotoURL: "",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  // Load logged-in user
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setFormData({
        name: storedUser.name,
        PhotoURL: storedUser.PhotoURL || "",
      });
    }
  }, []);

  // Handle profile update
  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:5000/users/${user._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Profile updated");
        const updatedUser = { ...user, ...formData };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      }
    } catch (err) {
      toast.error("Update failed");
    }
  };

  // Handle password change
  const handlePasswordChange = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `http://localhost:5000/change-password/${user._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(passwordData),
        },
      );

      const data = await res.json();

      if (data.success) {
        toast.success("Password updated");
        setPasswordData({ oldPassword: "", newPassword: "" });
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Error updating password");
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold text-gray-700">Admin Settings</h1>

      {/* Profile Section */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Profile Info</h2>

        <form onSubmit={handleProfileUpdate} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full border p-2 rounded"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <input
            type="text"
            placeholder="Photo URL"
            className="w-full border p-2 rounded"
            value={formData.PhotoURL}
            onChange={(e) =>
              setFormData({ ...formData, PhotoURL: e.target.value })
            }
          />

          <button className="bg-green-600 text-white px-4 py-2 rounded">
            Update Profile
          </button>
        </form>
      </div>

      {/* Password Section */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Change Password</h2>

        <form onSubmit={handlePasswordChange} className="space-y-4">
          <input
            type="password"
            placeholder="Old Password"
            className="w-full border p-2 rounded"
            value={passwordData.oldPassword}
            onChange={(e) =>
              setPasswordData({
                ...passwordData,
                oldPassword: e.target.value,
              })
            }
          />

          <input
            type="password"
            placeholder="New Password"
            className="w-full border p-2 rounded"
            value={passwordData.newPassword}
            onChange={(e) =>
              setPasswordData({
                ...passwordData,
                newPassword: e.target.value,
              })
            }
          />

          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Change Password
          </button>
        </form>
      </div>

      {/* System Info */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">System Info</h2>

        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
        <p>
          <strong>User ID:</strong> {user._id}
        </p>
      </div>
    </div>
  );
}

export default Settings;
