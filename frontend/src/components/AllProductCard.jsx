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
    <div className="mt-5 bg-gradient-to-r from-blue-200 to-blue-300 card  shadow-xl hover:shadow-2xl transition-shadow duration-300">
      {/* PRODUCT IMAGE */}
      <figure className="relative pt-[56.25%] ml-3 mr-3 mt-3 rounded-lg bg-slate-400 w-[260px] h-[190px]">
        <img
          src={product.image}
          alt={product.name}
          className="absolute top-0   left-0  object-cover"
        />
      </figure>

      <div className="card-body">
        {/* PRODUCT INFO */}
        <h2 className="card-title text-lg font-semibold">{product.name}</h2>
        <p className="text-base text-slate-400">Hybrid Rice is very popular among farmers for its high yield and disease resistance.</p>

        {/* CARD ACTIONS */}
        <div className="card-actions justify-end mt-4">
          <p className="text-2xl font-bold text-primary">${Number(product.price).toFixed(2)}</p>
          <div onClick={addToCart} className="btn btn-sm btn-primary btn-outline">
            <ShoppingCart className="size-6" />
          </div>
          {/* <Link to={`/product/${product.id}`} className="btn btn-sm btn-info btn-outline">
            <ShoppingCart className="size-4" />
          </Link> */}
          <div className="btn btn-sm btn-error  btn-outline">
            <Eye className="size-6" />
          </div>
          {/* <button
            className="btn btn-sm btn-error  btn-outline"
            onClick={() => deleteProduct(product.id)}
          >
            <Eye className="size-4" />
          </button> */}
        </div>
      </div>
    </div>
  );
}
export default ProductCard;
