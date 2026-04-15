import React, { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import {
  FaEdit,
  FaTrash,
  FaSearch,
  FaPlus,
  FaBoxOpen,
} from "react-icons/fa";

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  // Add Product States
  const [showModal, setShowModal] = useState(false);
  const [adding, setAdding] = useState(false);

  // Update Product States
  const [editModal, setEditModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const emptyForm = {
    name: "",
    category: "",
    price: "",
    stock: "",
    image: "",
    description: "",
  };

  const [formData, setFormData] = useState(emptyForm);

  // Fetch Products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/allProducts");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      Swal.fire("Error", "Failed to load products", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete Product
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete Product?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:5000/allProducts/${id}`, {
          method: "DELETE",
        });

        const data = await res.json();

        if (data.success || data.deletedCount > 0) {
          Swal.fire("Deleted!", "Product removed successfully", "success");
          fetchProducts();
        }
      } catch (error) {
        Swal.fire("Error", "Delete failed", "error");
      }
    }
  };

  // Input Change
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

  // Add Product
  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.category ||
      !formData.price ||
      !formData.image
    ) {
      return Swal.fire(
        "Warning",
        "Please fill all required fields",
        "warning"
      );
    }

    try {
      setAdding(true);

      const res = await fetch("http://localhost:5000/allProducts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          createdAt: new Date(),
        }),
      });

      const data = await res.json();

      if (data.insertedId || data.acknowledged) {
        Swal.fire("Success", "Product added successfully", "success");
        setShowModal(false);
        setFormData(emptyForm);
        fetchProducts();
      } else {
        Swal.fire("Error", "Failed to add product", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong", "error");
    } finally {
      setAdding(false);
    }
  };

  // Open Edit Modal
  const handleEditClick = (product) => {
    setEditingId(product._id);
    setFormData({
      name: product.name || "",
      category: product.category || "",
      price: product.price || "",
      stock: product.stock || "",
      image: product.image || "",
      description: product.description || "",
    });
    setEditModal(true);
  };

  // Update Product
  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    try {
      setAdding(true);

      const res = await fetch(
        `http://localhost:5000/allProducts/${editingId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (data.success) {
        Swal.fire("Updated!", "Product updated successfully", "success");
        setEditModal(false);
        setEditingId(null);
        setFormData(emptyForm);
        fetchProducts();
      } else {
        Swal.fire("Error", "Update failed", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong", "error");
    } finally {
      setAdding(false);
    }
  };

  // Filter Products
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchSearch =
        item.name?.toLowerCase().includes(search.toLowerCase()) ||
        item.category?.toLowerCase().includes(search.toLowerCase());

      const matchCategory =
        category === "all" ? true : item.category === category;

      return matchSearch && matchCategory;
    });
  }, [products, search, category]);

  const categories = [
    "all",
    ...new Set(products.map((item) => item.category).filter(Boolean)),
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen w-[1250px]">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Manage Products
          </h1>
          <p className="text-gray-500 text-sm">
            Add, update, search and manage all products
          </p>
        </div>

        <button
          onClick={() => {
            setFormData(emptyForm);
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl shadow"
        >
          <FaPlus />
          Add Product
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl shadow p-5">
          <p className="text-gray-500">Total Products</p>
          <h2 className="text-2xl font-bold">{products.length}</h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-5">
          <p className="text-gray-500">Categories</p>
          <h2 className="text-2xl font-bold">
            {categories.length - 1}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-5">
          <p className="text-gray-500">Filtered Result</p>
          <h2 className="text-2xl font-bold">
            {filteredProducts.length}
          </h2>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow p-4 mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex items-center border rounded-xl px-3 w-full">
          <FaSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Search product..."
            className="w-full p-2 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="border rounded-xl px-3 py-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow overflow-x-auto">
        {loading ? (
          <div className="p-10 text-center text-gray-500">
            Loading...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            <FaBoxOpen className="mx-auto text-4xl mb-2" />
            No Products Found
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Stock</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((product, index) => (
                <tr
                  key={product._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3">{index + 1}</td>

                  <td className="p-3">
                    <img
                      src={product.image}
                      alt=""
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  </td>

                  <td className="p-3 font-medium">
                    {product.name}
                  </td>

                  <td className="p-3">{product.category}</td>

                  <td className="p-3">৳ {product.price}</td>

                  <td className="p-3">
                    {product.stock ? product.stock : "N/A"}
                  </td>

                  <td className="p-3">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEditClick(product)}
                        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg"
                      >
                        <FaEdit />
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(product._id)
                        }
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">
                Add Product
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-xl"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={handleAddProduct}
              className="space-y-4"
            >
              <ProductForm
                formData={formData}
                handleChange={handleChange}
              />

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={adding}
                  className="flex-1 bg-green-600 text-white py-3 rounded-xl"
                >
                  {adding ? "Adding..." : "Add Product"}
                </button>

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-200 py-3 rounded-xl"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">
                Update Product
              </h2>
              <button
                onClick={() => setEditModal(false)}
                className="text-xl"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={handleUpdateProduct}
              className="space-y-4"
            >
              <ProductForm
                formData={formData}
                handleChange={handleChange}
              />

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={adding}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-xl"
                >
                  {adding ? "Updating..." : "Update Product"}
                </button>

                <button
                  type="button"
                  onClick={() => setEditModal(false)}
                  className="flex-1 bg-gray-200 py-3 rounded-xl"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Reusable Form
function ProductForm({ formData, handleChange }) {
  return (
    <>
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full border rounded-xl p-3 outline-none"
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border rounded-xl p-3 outline-none"
          required
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          className="w-full border rounded-xl p-3 outline-none"
        />
      </div>

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        className="w-full border rounded-xl p-3 outline-none"
        required
      />

      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={formData.image}
        onChange={handleChange}
        className="w-full border rounded-xl p-3 outline-none"
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        rows="4"
        value={formData.description}
        onChange={handleChange}
        className="w-full border rounded-xl p-3 outline-none"
      ></textarea>
    </>
  );
}

export default ManageProducts;