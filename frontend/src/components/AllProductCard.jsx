import { ShoppingCart, Eye } from "lucide-react";
import toast from "react-hot-toast";

function ProductCard({ product }) {
  const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "";

  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);
  const user_id = user.id;

  const addToCart = async () => {
    if (!user_id) {
      alert("You must be logged in to add items to cart");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/api/products/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id,
          product_id: product.id,
          quantity: 1
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to add to cart");
      } else {
        toast.success("Item added to cart!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  return (
    <div className="mt-10  card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
      {/* PRODUCT IMAGE */}
      <figure className="relative pt-[56.25%]">
        <img
          src={product.image}
          alt={product.name}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </figure>

      <div className="card-body">
        {/* PRODUCT INFO */}
        <h2 className="card-title text-lg font-semibold">{product.name}</h2>
        <p className="text-2xl font-bold text-primary">${Number(product.price).toFixed(2)}</p>

        {/* CARD ACTIONS */}
        <div className="card-actions justify-end mt-4">
          <div onClick={addToCart} className="btn btn-sm btn-primary btn-outline">
            <ShoppingCart className="size-4" />
          </div>
          {/* <Link to={`/product/${product.id}`} className="btn btn-sm btn-info btn-outline">
            <ShoppingCart className="size-4" />
          </Link> */}
          <div className="btn btn-sm btn-error  btn-outline">
            <Eye className="size-4" />
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
