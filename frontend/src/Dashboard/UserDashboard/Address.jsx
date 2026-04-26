import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Address = () => {
  const [addresses, setAddresses] = useState([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    area: "",
    address: "",
  });
  const [editingId, setEditingId] = useState(null);

  const userId = "YOUR_USER_ID";

  // Fetch
  const fetchAddresses = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/addresses/${userId}`);
      setAddresses(res.data);
    } catch {
      Swal.fire("Error", "Failed to load addresses", "error");
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  // Input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit (Add / Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.patch(`http://localhost:5000/addresses/${editingId}`, form);
        Swal.fire("Updated!", "Address updated successfully", "success");
      } else {
        await axios.post("http://localhost:5000/addresses", {
          ...form,
          userId,
        });
        Swal.fire("Success!", "Address added successfully", "success");
      }

      // Reset form
      setForm({
        name: "",
        phone: "",
        city: "",
        area: "",
        address: "",
      });
      setEditingId(null);
      fetchAddresses();
    } catch {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  // Delete
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This address will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      await axios.delete(`http://localhost:5000/addresses/${id}`);
      Swal.fire("Deleted!", "Address removed", "success");
      fetchAddresses();
    }
  };

  // Edit
  const handleEdit = (item) => {
    setForm({
      name: item.name,
      phone: item.phone,
      city: item.city,
      area: item.area,
      address: item.address,
    });
    setEditingId(item._id);
    window.scrollTo({ top: 0, behavior: "smooth" }); // nice UX
  };

  return (
    <div className=" mx-auto p-4 space-y-6 w-[1250px]">
      {/* ===== HEADER ===== */}
      <div className=" border-b pb-4 mt-[40px]">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-white">
            Shipping Addresses
          </h1>
          <p className="text-sm text-gray-500">
            Manage where your orders will be delivered
          </p>
        </div>
      </div>
      <div className="flex">
        {/* FORM (Always Visible) */}
        <div className="bg-white shadow-md rounded-2xl p-6 w-[800px]  mr-[10px]">
          <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">
            {editingId ? "Update Address" : "Add New Address"}
          </h1>

          <form onSubmit={handleSubmit} className=" grid md:grid-cols-2 gap-4">
            <input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="border p-2 rounded focus:ring-2 focus:ring-green-500"
              required
            />
            <input
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              className="border p-2 rounded focus:ring-2 focus:ring-green-500"
              required
            />
            <input
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            <input
              name="area"
              placeholder="Area"
              value={form.area}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            <textarea
              name="address"
              placeholder="Full Address"
              value={form.address}
              onChange={handleChange}
              className="border p-2 rounded md:col-span-2"
              required
            />

            <div className="md:col-span-2 flex justify-between items-center">
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setForm({
                      name: "",
                      phone: "",
                      city: "",
                      area: "",
                      address: "",
                    });
                  }}
                  className="text-gray-500"
                >
                  Cancel Edit
                </button>
              )}

              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg">
                {editingId ? "Update Address" : "Save Address"}
              </button>
            </div>
          </form>
        </div>

        {/* ADDRESS LIST */}
        <div>
          {addresses.length === 0 ? (
            <p className="text-gray-500">No address added yet</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-[600px]">
              {addresses.map((item) => (
                <div
                  key={item._id}
                  className="bg-white w-[600px] h-[330px] border rounded-xl p-5 shadow-sm hover:shadow-lg transition"
                >
                  <h2 className="text-xl font-semibold mb-4 text-gray-700">
                    Saved Addresses
                  </h2>
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.phone}</p>

                  <p className="mt-2 text-sm">
                    {item.city}, {item.area}
                  </p>
                  <p className="text-gray-600 text-sm">{item.address}</p>

                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-blue-600 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-500 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Address;
