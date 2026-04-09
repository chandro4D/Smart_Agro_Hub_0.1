import React from "react";
import { ShoppingCart, Eye } from "lucide-react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

function ProductCard({ product }) {
  const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5000" : "";

  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const user_id = user ? user._id : null;

  const addToCart = async () => {
    if (!user_id) {
      Swal.fire({
        icon: "error",
        text: "You Must Be Logged In To Add Items To The Cart",
        showConfirmButton: true
      });
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/allCartItems`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id,
          product_id: product._id,
          quantity: 1
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.message || "Failed to add to cart");
      } else {
        toast.success(data.message || "Item added to cart!");
        window.dispatchEvent(new Event("cartUpdated"));
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  return (
    <div className="mt-5 card shadow-lg hover:shadow-2xl transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.02] bg-gradient-to-tr from-white via-blue-50 to-blue-100 rounded-xl">
      {/* PRODUCT IMAGE */}
      <figure className="relative pt-[56.25%] ml-3 mr-3 mt-3 rounded-lg overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="absolute top-0 left-0 w-[260px] h-[190px] object-cover transition-transform duration-500 hover:scale-105"
        />
      </figure>

      <div className="card-body">
        {/* PRODUCT INFO */}
        <h2 className="card-title text-lg font-semibold text-gray-800">{product.name}</h2>
        <p className="text-base text-gray-500 mt-1">
          Hybrid Rice is very popular among farmers for its high yield and disease resistance.
        </p>

        {/* CARD ACTIONS */}
        <div className="card-actions justify-end mt-4 items-center gap-2">
          <p className="text-2xl font-bold text-green-600">${Number(product.price).toFixed(2)}</p>
          <div
            onClick={addToCart}
            className="btn btn-sm bg-blue-600 text-white hover:bg-blue-700 border-none transition-all duration-300 shadow hover:shadow-md"
          >
            <ShoppingCart className="size-6" />
          </div>
          <div className="btn btn-sm bg-gray-200 text-gray-700 hover:bg-gray-300 border-none transition-all duration-300 shadow hover:shadow-md">
            <Eye className="size-6" />
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default ProductCard;