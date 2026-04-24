import React, { useEffect, useState } from "react";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    PhotoURL: "",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetch(`http://localhost:5000/users`)
      .then((res) => res.json())
      .then((data) => {
        const currentUser = data.find((u) => u._id === userId);
        setUser(currentUser);
        setFormData({
          name: currentUser?.name || "",
          PhotoURL: currentUser?.PhotoURL || "",
        });
        setLoading(false);
      });
  }, [userId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:5000/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data.success) alert("Profile updated");
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:5000/change-password/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(passwordData),
    });
    const data = await res.json();
    alert(data.success ? "Password changed" : data.message);
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-50 p-6 w-[1250px]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        {/* LEFT SIDE PROFILE CARD */}
        <div className="bg-white/70 backdrop-blur-lg shadow-xl rounded-3xl p-6 text-center border">
          <img
            src={user?.PhotoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
            alt="profile"
            className="w-28 h-28 mx-auto rounded-full border-4 border-green-400 object-cover"
          />

          <h2 className="text-2xl font-bold mt-4">{user?.name}</h2>
          <p className="text-gray-500">{user?.email}</p>

          <span className="inline-block mt-2 px-3 py-1 text-sm bg-green-200 text-green-700 rounded-full capitalize">
            {user?.role}
          </span>

          <div className="mt-6 text-sm text-gray-400">Account Active ✅</div>
        </div>

        {/* RIGHT SIDE FORMS */}
        <div className="md:col-span-2 space-y-6">
          {/* EDIT PROFILE */}
          <div className="bg-white shadow-lg rounded-3xl p-6 border">
            <h2 className="text-xl font-semibold mb-4 text-green-600">
              Edit Profile
            </h2>

            <form onSubmit={handleUpdate}>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                />

                <input
                  type="text"
                  name="PhotoURL"
                  value={formData.PhotoURL}
                  onChange={handleChange}
                  placeholder="Photo URL"
                  className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>

              <button className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl transition">
                Update Profile
              </button>
            </form>
          </div>

          {/* CHANGE PASSWORD */}
          <div className="bg-white shadow-lg rounded-3xl p-6 border">
            <h2 className="text-xl font-semibold mb-4 text-red-500">
              Change Password
            </h2>

            <form onSubmit={handlePasswordChange}>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="password"
                  placeholder="Old Password"
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      oldPassword: e.target.value,
                    })
                  }
                  className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
                />

                <input
                  type="password"
                  placeholder="New Password"
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                  className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
                />
              </div>

              <button className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl transition">
                Change Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
