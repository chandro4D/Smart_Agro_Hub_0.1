import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    PhotoURL: "",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const storedUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (storedUser) {
      setUser(storedUser);
      setFormData({
        name: storedUser.name || "",
        PhotoURL: storedUser.PhotoURL || "",
      });
    }
  }, []);

  // UPDATE PROFILE
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/users/${user._id}`, formData);

      const updatedUser = { ...user, ...formData };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);

      Swal.fire("Success", "Profile updated", "success");
    } catch {
      Swal.fire("Error", "Update failed", "error");
    } finally {
      setLoading(false);
    }
  };

  // CHANGE PASSWORD
  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (!passwordData.oldPassword || !passwordData.newPassword) {
      return Swal.fire("Warning", "Fill all fields", "warning");
    }

    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/change-password/${user._id}`,
        passwordData,
      );

      if (res.data.success) {
        Swal.fire("Success", "Password changed", "success");
        setPasswordData({ oldPassword: "", newPassword: "" });
      } else {
        Swal.fire("Error", res.data.message, "error");
      }
    } catch {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  if (!user) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  return (
    <div className="w-[1250px] mx-auto p-6 space-y-6">
      {/* ===== HEADER ===== */}
      <div className=" border-b pb-4">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-white">
            Account Settings
          </h1>
          <p className="text-sm text-gray-500">
            Manage your personal information and security
          </p>
        </div>
      </div>

      {/* ===== USER SUMMARY ===== */}
      <div className="grid grid-cols-1 items-center justify-between  pb-4 mt-[40px]">
        <div className=" bg-gray-400 border rounded-xl text-center p-6   gap-6 mb-[20px]">
          {/* Avatar */}
          <img
            src={user.PhotoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
            alt="Profile"
            className="w-[110px] bg-white h-[110px] pb-[15px] rounded-full object-cover border ml-[530px]"
          />

          {/* Info */}
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
            <p className="text-lg text-gray-500">{user.email}</p>

            <div className="mt-2 flex gap-2 ml-[530px]">
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                {user.role}
              </span>
              <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
                Active
              </span>
            </div>
          </div>
        </div>

        {/* ===== FORMS ===== */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* EDIT PROFILE */}
          <form
            onSubmit={handleUpdate}
            className="bg-white border rounded-xl p-6 space-y-4"
          >
            <h2 className="font-semibold text-gray-700">
              Personal Information
            </h2>

            <input
              type="text"
              placeholder="Full Name"
              className="w-full border p-3 rounded focus:ring-1 focus:ring-green-400 outline-none"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Photo URL"
              className="w-full border p-3 rounded focus:ring-1 focus:ring-green-400 outline-none"
              value={formData.PhotoURL}
              onChange={(e) =>
                setFormData({ ...formData, PhotoURL: e.target.value })
              }
            />

            <button
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </form>

          {/* SECURITY */}
          <form
            onSubmit={handlePasswordChange}
            className="bg-white border rounded-xl p-6 space-y-4"
          >
            <h2 className="font-semibold text-gray-700">Security</h2>

            <input
              type="password"
              placeholder="Old Password"
              className="w-full border p-3 rounded focus:ring-1 focus:ring-red-400 outline-none"
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
              className="w-full border p-3 rounded focus:ring-1 focus:ring-red-400 outline-none"
              value={passwordData.newPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  newPassword: e.target.value,
                })
              }
            />

            <button className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
