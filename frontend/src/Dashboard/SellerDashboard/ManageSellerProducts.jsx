import React, { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import { FaEdit, FaTrash, FaSearch, FaPlus, FaBoxOpen } from "react-icons/fa";

function ManageSellerProducts() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

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

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* HEADER */}{" "}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
        {" "}
        <div>
          {" "}
          <h1 className="text-3xl font-bold text-gray-800">
            Manage My Products{" "}
          </h1>
          <p className="text-gray-500 text-sm">
            Manage your products inventory
          </p>
        </div>
        <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl shadow">
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
                      <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg">
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
    </div>
  );
}

export default ManageSellerProducts;
