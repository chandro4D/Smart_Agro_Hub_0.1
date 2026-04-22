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

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:5000/users/${user._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Profile updated");
        const updatedUser = { ...user, ...formData };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      }
    } catch {
      toast.error("Update failed");
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `http://localhost:5000/change-password/${user._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
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
    } catch {
      toast.error("Error updating password");
    }
  };

  if (!user) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen w-[1250px]">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        Settings
      </h1>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* LEFT SIDEBAR PROFILE CARD */}
        <div>
          <div className="bg-white mb-[40px] rounded-2xl shadow p-6 flex flex-col items-center">
            <img
              src={
                formData.PhotoURL || "https://i.ibb.co/2kR4Z8G/default-user.png"
              }
              alt="profile"
              className="w-24 h-24 rounded-full object-cover border"
            />

            <h2 className="mt-4 text-lg font-semibold text-gray-700">
              {user.name}
            </h2>
            <p className="text-sm text-gray-500">{user.email}</p>

            <span className="mt-2 px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full">
              {user.role}
            </span>
          </div>
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Account Details
            </h2>

            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <span className="font-medium text-gray-700">Email:</span>{" "}
                {user.email}
              </p>
              <p>
                <span className="font-medium text-gray-700">Role:</span>{" "}
                {user.role}
              </p>
              <p>
                <span className="font-medium text-gray-700">User ID:</span>{" "}
                {user._id}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE CONTENT */}
        <div className="lg:col-span-2 space-y-6">
          {/* PROFILE UPDATE */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Profile Information
            </h2>

            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">Name</label>
                <input
                  type="text"
                  className="w-full mt-1 border rounded-lg p-2 focus:ring-2 focus:ring-green-500 outline-none"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">
                  Profile Image URL
                </label>
                <input
                  type="text"
                  className="w-full mt-1 border rounded-lg p-2 focus:ring-2 focus:ring-green-500 outline-none"
                  value={formData.PhotoURL}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      PhotoURL: e.target.value,
                    })
                  }
                />
              </div>

              <button className="bg-green-600 hover:bg-green-700 transition text-white px-5 py-2 rounded-lg">
                Save Changes
              </button>
            </form>
          </div>

          {/* PASSWORD CHANGE */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Change Password
            </h2>

            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">Old Password</label>
                <input
                  type="password"
                  className="w-full mt-1 border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={passwordData.oldPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      oldPassword: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">New Password</label>
                <input
                  type="password"
                  className="w-full mt-1 border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                />
              </div>

              <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2 rounded-lg">
                Update Password
              </button>
            </form>
          </div>

          {/* SYSTEM INFO */}
        </div>
      </div>
    </div>
  );
}

export default Settings;
