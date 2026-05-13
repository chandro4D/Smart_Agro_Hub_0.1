import React from "react";
import Swal from "sweetalert2";
import useCart from "../../store/useCart";
import { Link } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";

const Cart = ({ user }) => {
    const [cart, refetch, loading] = useCart(user?._id);

    const totalPrice = cart.reduce((total, item) => {
        const price = Number(item?.productDetails?.price) || 0;
        const qty = Number(item?.quantity) || 0;
        return total + price * qty;
    }, 0);

    const removeCartItem = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this item?",
            icon: "warning",
            showCancelButton: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await fetch(
                        `${import.meta.env.VITE_API_URL}/deleteCartItem/${id}`,
                        { method: "DELETE" }
                    );

                    const data = await res.json();

                    if (res.ok && data.success) {
                        Swal.fire("Deleted!", data.message, "success");
                        refetch();
                    } else {
                        Swal.fire("Error!", data.message, "error");
                    }
                } catch (err) {
                    Swal.fire("Error!", "Server error", "error");
                }
            }
        });
    };
    if (loading) return <p>Loading cart...</p>;

    return (
        <div className="pb-20 mt-8 font-serif">

            {cart.length > 0 ? (
                <>
                    {/* HEADER */}
                    <div className="ml-44 rounded-lg h-24 w-[1200px] bg-gradient-to-r from-cyan-500 to-blue-500 mb-10">
                        <h1 className="text-center font-semibold text-lime-400 text-4xl pt-5">
                            MY CART
                        </h1>
                    </div>

                    {/* TABLE */}
                    <div className="ml-40 overflow-x-auto mr-[47px]">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>PRODUCT NAME</th>
                                    <th>PRODUCT IMAGE</th>
                                    <th>QTY</th>
                                    <th>UNIT PRICE</th>
                                    <th>PRICE</th>
                                    <th>DELETE</th>
                                </tr>
                            </thead>

                            <tbody>
                                {cart.map((item, index) => {
                                    const product = item?.productDetails || {};
                                    const price = Number(product?.price) || 0;
                                    const qty = Number(item?.quantity) || 0;

                                    return (
                                        <tr key={item._id || index}>
                                            <th>{index + 1}</th>

                                            <td>{product?.name || "No Product"}</td>

                                            <td>
                                                <img
                                                    src={
                                                        product?.image ||
                                                        "https://via.placeholder.com/100"
                                                    }
                                                    alt={product?.name || "product"}
                                                    className="w-16 h-16 object-cover rounded"
                                                />
                                            </td>

                                            <td>{qty}</td>

                                            <td>{price.toFixed(2)} BDT</td>

                                            <td>{(price * qty).toFixed(2)} BDT</td>

                                            <td>
                                                <button
                                                    onClick={() =>
                                                        removeCartItem(item._id)
                                                    }
                                                    className="btn btn-ghost text-white w-[60px] h-[40px] bg-red-500 text-xl"
                                                >
                                                    <RiDeleteBin6Line />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* FOOTER */}
                    <div className="flex justify-between ml-[170px] mr-[145px] my-10">
                        <h2 className="text-2xl font-semibold">
                            TOTAL ORDERS: {cart.length}
                        </h2>

                        <Link to="/payment">
                            <button
                                disabled={!cart.length}
                                className="btn w-[400px] bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                            >
                                CHECKOUT
                            </button>
                        </Link>

                        <h2 className="text-2xl font-semibold">
                            TOTAL PRICE: {totalPrice.toFixed(2)} BDT
                        </h2>
                    </div>
                </>
            ) : (
                <div className="pt-40 mb-10">
                    <h3 className="text-center font-semibold text-pink-600 text-3xl">
                        YOU HAVEN'T ADDED ANYTHING TO THE CART YET
                    </h3>
                </div>
            )}
        </div>
    );
};

export default Cart;