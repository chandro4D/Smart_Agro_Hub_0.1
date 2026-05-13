import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

function ManageUsers() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [filterRole, setFilterRole] = useState("all");
    const [loading, setLoading] = useState(true);

    const fetchUsers = () => {
        fetch(`${import.meta.env.VITE_API_URL}/users`)
            .then((res) => res.json())
            .then((data) => {
                setUsers(data);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const filteredUsers = users.filter((user) => {
        const matchSearch =
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase());

        const matchRole =
            filterRole === "all" ? true : user.role === filterRole;

        return matchSearch && matchRole;
    });

    const handleRoleChange = (id, newRole) => {
        fetch(`${import.meta.env.VITE_API_URL}/users/role/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ role: newRole }),
        })
            .then((res) => res.json())
            .then(() => {
                Swal.fire("Updated!", `Role changed to ${newRole}`, "success");
                fetchUsers();
            });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This user will be deleted!",
            icon: "warning",
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${import.meta.env.VITE_API_URL}/users/${id}`, {
                    method: "DELETE",
                })
                    .then((res) => res.json())
                    .then(() => {
                        Swal.fire("Deleted!", "User removed", "success");
                        fetchUsers();
                    });
            }
        });
    };

    const totalUsers = users.length;
    const totalAdmins = users.filter((u) => u.role === "admin").length;
    const totalUsersOnly = users.filter((u) => u.role === "user").length;
    const totalSeller = users.filter((u) => u.role === "seller").length;

    if (loading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen w-[1250px]">

            {/* Header */}
            <div className="mb-8 text-center">
                <h1 className="text-4xl mt-[20px] font-bold text-gray-800">
                    Manage Users
                </h1>
                <p className="text-gray-500 text-base">
                    Control users, roles and permissions easily
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                <div className="bg-blue-500 text-white p-5 rounded-2xl shadow">
                    <p>Total Users</p>
                    <h2 className="text-2xl font-bold">{totalUsers}</h2>
                </div>

                <div className="bg-green-500 text-white p-5 rounded-2xl shadow">
                    <p>Admins</p>
                    <h2 className="text-2xl font-bold">{totalAdmins}</h2>
                </div>

                <div className="bg-yellow-500 text-white p-5 rounded-2xl shadow">
                    <p>Users</p>
                    <h2 className="text-2xl font-bold">{totalUsersOnly}</h2>
                </div>

                <div className="bg-purple-500 text-white p-5 rounded-2xl shadow">
                    <p>Sellers</p>
                    <h2 className="text-2xl font-bold">{totalSeller}</h2>
                </div>
            </div>

            {/* Search & Filter */}
            <div className="bg-white p-4 rounded-2xl shadow mb-6 flex flex-col md:flex-row gap-4">
                <input
                    type="text"
                    placeholder="🔍 Search by name or email..."
                    className="border px-4 py-2 rounded-lg w-[500px] focus:outline-none focus:ring-2 focus:ring-blue-400 "
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                >
                    <option value="all">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    <option value="seller">Seller</option>
                </select>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-100 text-gray-600">
                        <tr>
                            <th className="p-3">#</th>
                            <th>User</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Change Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredUsers.map((user, index) => (
                            <tr key={user._id} className="border-b hover:bg-gray-50 transition">
                                <td className="p-3">{index + 1}</td>

                                <td className="flex items-center gap-3 py-2">
                                    <img
                                        src={user.PhotoURL}
                                        className="w-10 h-10 rounded-full border"
                                    />
                                    <span className="font-medium">{user.name}</span>
                                </td>

                                <td className="text-gray-600">{user.email}</td>

                                <td>
                                    <span
                                        className={`px-3 py-1 text-sm rounded-full text-white
                                        ${user.role === "admin" && "bg-green-500"}
                                        ${user.role === "user" && "bg-blue-500"}
                                        ${user.role === "seller" && "bg-purple-500"}
                                    `}
                                    >
                                        {user.role}
                                    </span>
                                </td>

                                <td>
                                    <select
                                        value={user.role}
                                        onChange={(e) =>
                                            handleRoleChange(user._id, e.target.value)
                                        }
                                        className="border px-2 py-1 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                        <option value="seller">Seller</option>
                                    </select>
                                </td>

                                <td>
                                    <button
                                        onClick={() => handleDelete(user._id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default ManageUsers;