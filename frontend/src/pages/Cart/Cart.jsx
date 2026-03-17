import React from "react";
import Swal from "sweetalert2";
import useCart from "../../store/useCart" 
import { Link } from "react-router-dom";

const Cart = ({ user }) => {
    const [cart, refetch, loading] = useCart(user._id);

    const totalPrice = cart.reduce(
        (total, item) => total + item.productDetails.price * item.quantity,
        0
    );
    const removeCartItem = async ({ user_id, product_id }) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this item?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await fetch(
                        `http://localhost:5000/deleteCartItem/${user_id}/${product_id}`,
                        {
                            method: "DELETE",
                        }
                    );
                    const data = await res.json();
                    if (res.ok && data.success) {
                        Swal.fire("Deleted!", data.message, "success");
                        refetch(); 
                        window.dispatchEvent(new Event("cartUpdated"));
                    } else {
                        Swal.fire("Error!", data.message || "Failed to delete", "error");
                    }
                } catch (err) {
                    console.error(err);
                    Swal.fire("Error!", "Server error", "error");
                }
            }
        });
    };
    const lineTotal = (item) => item.productDetails?.price * item.quantity;
    if (loading) return <p>Loading cart...</p>;

    return (
        <div className="pb-20 mt-8">
            {cart.length > 0 ? (
                <>
                    <div className="ml-44 rounded-lg h-24 w-[1200px] bg-gradient-to-r from-cyan-500 to-blue-500 mb-10 ">
                        <h1 className="text-center font-semibold text-lime-400 text-4xl pt-5">
                            MY CART
                        </h1>
                    </div>

                    <div className="ml-40 overflow-x-auto mr-[30px]">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>PRODUCT NAME</th>
                                    <th>PRODUCT IMAGE</th>
                                    <th>QTY</th>
                                    <th>UNIT PRICE</th>
                                    <th>TOTAL PRICE</th>
                                    <th>DELETE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((item, index) => (
                                    <tr key={item._id}>
                                        <th>{index + 1}</th>
                                        <td>{item.productDetails?.name}</td>
                                        <td>
                                            <img
                                                src={item.productDetails?.image}
                                                alt={item.productDetails?.name}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                        </td>
                                        <td>{item.quantity}</td>
                                        <td>{item.productDetails?.price.toFixed(2)} BDT</td>
                                        <td>
                                            {(item.productDetails?.price * item.quantity).toFixed(2)} BDT
                                        </td>
                                        <td>
                                            <button
                                                onClick={() =>
                                                    removeCartItem({
                                                        user_id: user._id,
                                                        product_id: item.product_id,
                                                    })
                                                }
                                                className="btn btn-ghost text-white text-center w-[100px] h-[40px] btn-xl bg-red-500 text-xl"
                                            >
                                            Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-between ml-[170px] mr-[145px] my-10">
                        <h2 className="text-2xl font-semibold">
                            TOTAL ORDERS : {cart.length}
                        </h2>
                        <h2 className="text-2xl font-semibold">
                            TOTAL PRICE : {totalPrice.toFixed(2)} BDT
                        </h2>
                        <Link to="/payment">
                            <button
                                disabled={!cart.length}
                                className="btn w-[400px] ml-32 bg-gradient-to-r from-cyan-500 to-blue-500 text-white sm:btn-sm md:btn-md"
                            >
                                CHECKOUT
                            </button>
                        </Link>
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