import React, { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";

import { FaEdit, FaTrash, FaSearch, FaPlus, FaBoxOpen } from "react-icons/fa";

function ManageSellerProducts() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  // ADD MODAL
  const [showModal, setShowModal] = useState(false);

  // EDIT MODAL
  const [showEditModal, setShowEditModal] = useState(false);

  const [editProductId, setEditProductId] = useState(null);

  const emptyForm = {
    name: "",
    category: "",
    price: "",
    stock: "",
    image: "",
    description: "",
  };

  const [formData, setFormData] = useState(emptyForm);

  // FETCH PRODUCTS
  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/seller-products/${user?.email}`,
      );

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

  // INPUT CHANGE
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

  // ADD PRODUCT
  const handleAddProduct = async (e) => {
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

        setShowModal(false);

        setFormData(emptyForm);

        fetchProducts();
      }
    } catch (error) {
      Swal.fire("Error", "Failed to add product", "error");
    }
  };

  // DELETE PRODUCT
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete Product?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/allProducts/${id}`,
          {
            method: "DELETE",
          },
        );

        const data = await res.json();

        if (data.success) {
          Swal.fire("Deleted!", "Product deleted successfully", "success");

          fetchProducts();
        }
      } catch (error) {
        Swal.fire("Error", "Delete failed", "error");
      }
    }
  };

  // FILTER PRODUCTS
  const filteredProducts = useMemo(() => {
    return products.filter(
      (product) =>
        product.name?.toLowerCase().includes(search.toLowerCase()) ||
        product.category?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [products, search]);

  // OPEN EDIT MODAL
  const handleEditClick = (product) => {
    setEditProductId(product._id);

    setFormData({
      name: product.name || "",
      category: product.category || "",
      price: product.price || "",
      stock: product.stock || "",
      image: product.image || "",
      description: product.description || "",
    });

    setShowEditModal(true);
  };

  // UPDATE PRODUCT
  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/allProducts/${editProductId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await res.json();

      if (data.success) {
        Swal.fire("Updated!", "Product updated successfully", "success");

        setShowEditModal(false);

        setFormData(emptyForm);

        fetchProducts();
      }
    } catch (error) {
      Swal.fire("Error", "Failed to update product", "error");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen w-[1250px]">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Manage My Products
          </h1>

          <p className="text-gray-500 text-sm">
            Manage your products inventory
          </p>
        </div>

        <button
          onClick={() => {
            setFormData(emptyForm);
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl shadow"
        >
          <FaPlus />
          Add Product
        </button>
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        <div className="bg-white rounded-2xl shadow p-5">
          <p className="text-gray-500">Total Products</p>

          <h2 className="text-3xl font-bold">{products.length}</h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-5">
          <p className="text-gray-500">Low Stock</p>

          <h2 className="text-3xl font-bold text-red-500">
            {products.filter((item) => Number(item.stock) < 5).length}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-5">
          <p className="text-gray-500">Categories</p>

          <h2 className="text-3xl font-bold text-blue-500">
            {new Set(products.map((p) => p.category)).size}
          </h2>
        </div>
      </div>

      {/* SEARCH */}
      <div className="bg-white rounded-2xl shadow p-4 mb-6">
        <div className="flex items-center border rounded-xl px-3">
          <FaSearch className="text-gray-400" />

          <input
            type="text"
            placeholder="Search product..."
            className="w-full p-3 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow overflow-x-auto">
        {loading ? (
          <div className="p-10 text-center text-gray-500">Loading...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            <FaBoxOpen className="mx-auto text-5xl mb-3" />
            No Products Found
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Stock</th>
                <th className="p-3 text-left">Created</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((product) => (
                <tr
                  key={product._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3">
                    <img
                      src={product.image}
                      alt=""
                      className="w-14 h-14 rounded-xl object-cover"
                    />
                  </td>

                  <td className="p-3 font-medium">{product.name}</td>

                  <td className="p-3">{product.category}</td>

                  <td className="p-3 font-semibold text-green-600">
                    ৳ {product.price}
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        product.stock < 5
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {product.stock}
                    </span>
                  </td>

                  <td className="p-3">
                    {new Date(product.createdAt).toLocaleDateString()}
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
                        onClick={() => handleDelete(product._id)}
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

      {/* ADD PRODUCT MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Add Product</h2>

              <button onClick={() => setShowModal(false)} className="text-xl">
                ✕
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 outline-none"
                required
              />

              <div className="grid grid-cols-2 gap-4">
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
              />

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl"
              >
                Add Product
              </button>
            </form>
          </div>
        </div>
      )}
      {/* EDIT PRODUCT MODAL */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Update Product</h2>

              <button
                onClick={() => setShowEditModal(false)}
                className="text-xl"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdateProduct} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 outline-none"
                required
              />

              <div className="grid grid-cols-2 gap-4">
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
              />

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl"
              >
                Update Product
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageSellerProducts;
