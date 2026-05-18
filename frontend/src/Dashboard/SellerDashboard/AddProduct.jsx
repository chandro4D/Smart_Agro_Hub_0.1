import React, { useState } from "react";
import Swal from "sweetalert2";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router";

function AddProduct() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    image: "",
    description: "",
  });

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "stock"
          ? value === ""
            ? ""
            : Number(value)
          : value,
    }));
  };

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.category ||
      !formData.price ||
      !formData.image
    ) {
      return Swal.fire("Warning", "Please fill all required fields", "warning");
    }

    try {
      setLoading(true);

      const productData = {
        ...formData,
        sellerEmail: user?.email,
        sellerName: user?.name,
        createdAt: new Date(),
      };

      const res = await fetch(`${import.meta.env.VITE_API_URL}/allProducts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      const data = await res.json();

      if (data.success || data.insertedId) {
        Swal.fire("Success", "Product added successfully", "success");

        navigate("/dashboard/manageSellerProducts");

        setFormData({
          name: "",
          category: "",
          price: "",
          stock: "",
          image: "",
          description: "",
        });
      }
    } catch (error) {
      Swal.fire("Error", "Failed to add product", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 w-[1250px]">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Add New Product</h1>

          <p className="text-gray-500 mt-2">
            Fill in the product information below
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* PRODUCT NAME */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Product Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter product name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* CATEGORY + STOCK */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Category
              </label>

              <input
                type="text"
                name="category"
                placeholder="Enter category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Stock
              </label>

              <input
                type="number"
                name="stock"
                placeholder="Available stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* PRICE */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Price
            </label>

            <input
              type="number"
              name="price"
              placeholder="Enter price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* IMAGE */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Product Image URL
            </label>

            <input
              type="text"
              name="image"
              placeholder="Paste image URL"
              value={formData.image}
              onChange={handleChange}
              className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Description
            </label>

            <textarea
              name="description"
              rows="5"
              placeholder="Write product description..."
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl flex items-center justify-center gap-2 font-semibold transition"
          >
            <FaPlus />

            {loading ? "Adding Product..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
