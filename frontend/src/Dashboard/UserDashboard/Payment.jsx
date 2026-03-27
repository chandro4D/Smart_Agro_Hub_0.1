// import React from 'react'
// import useCart from "../../store/useCart";

// function Payment({ user }) {
//     const [cart, refetch, loading] = useCart(user._id);
//     const totalPrice = cart.reduce(
//         (total, item) => total + item.productDetails.price * item.quantity,
//         0
//     );
//     // for Sslcommerz
//     const handlePayment = async () => {
//         const payment = {
//             email: user.email,
//             price: totalPrice,
//             transactionId: "",
//             date: new Date(),
//             cartIds: cart.map(item => item._id),
//             productIds: cart.map(item => item.product_id),
//             status: "pending"
//         };

//         try {
//             const res = await fetch("http://localhost:5000/create-ssl-payment", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(payment),
//             });

//             const data = await res.json();

//             console.log(data, "Payment response from backend");

//             // 🔥 Critical: redirect user to SSLCommerz payment page
//             if (data.url) {
//                 window.location.href = data.url;
//             } else {
//                 alert(data.error || "Payment initiation failed");
//             }

//         } catch (error) {
//             console.log(error);
//             alert("Payment failed. Check console for details.");
//         }

//         console.log(payment, "Payment details to save in backend");
//     };

//     return (
//         <div className='font-serif'>
//             <div className='mt-10 mb-[50px]'>
//                 <h1 className='text-center text-sky-500 text-5xl font-bold'> Please Make Payment</h1>
//             </div>
//             {cart.length > 0 ? (
//                 <div className="ml-[220px] mr-[220px]">
//                     <div className="overflow-x-auto ">
//                         <table className="table">
//                             {/* head */}
//                             <thead className="text-2xl text-center mb-4 text-sky-600">
//                                 <tr>
//                                     <th>
//                                         Total Orders
//                                     </th>
//                                     <th>Name</th>
//                                     <th>Email</th>

//                                     <th>Total Price</th>
//                                     <th>Date</th>
//                                 </tr>
//                             </thead>
//                             <tbody >

//                                 <tr className=" h-24 text-lg text-center font-semibold">
//                                     <th>
//                                         {cart.length}
//                                     </th>
//                                     <td>

//                                         <h3>{user.name} </h3>

//                                     </td>
//                                     <td>
//                                         <h3>{user.email}</h3>

//                                     </td>
//                                     <td>
//                                         <h3> ${totalPrice.toFixed(2)}</h3>
//                                     </td>
//                                     <td>
//                                         <h3>{new Date().toLocaleDateString()}</h3>
//                                     </td>

//                                 </tr>
//                             </tbody>

//                         </table>
//                     </div>

//                     <div className="flex justify-center mt-[30px]  text-2xl">
//                         <button onClick={handlePayment} disabled={!cart.length}
//                             className="btn  w-[200px] h-[50px] flex justify-center bg-gradient-to-r from-indigo-800 to-indigo-600 text-white sm:btn-sm md:btn-md"
//                         >
//                             Pay
//                         </button>

//                     </div>
//                 </div>
//             ) : <h1 className='text-center text-2xl mt-10'>No items in cart to make payment</h1>}

//         </div >

//     )
// }

// export default Payment
import React from "react";
import { useNavigate } from "react-router-dom";
import useCart from "../../store/useCart";
import Swal from "sweetalert2";

function Payment({ user }) {
    const [cart, refetch, loading] = useCart(user._id);
    const navigate = useNavigate();

    const totalPrice = cart.reduce(
        (total, item) => total + item.productDetails.price * item.quantity,
        0
    );

    const handlePayment = async () => {
        const payment = {
            email: user.email,
            price: totalPrice,
            transactionId: "",
            date: new Date(),
            cartIds: cart.map((item) => item._id),
            productIds: cart.map((item) => item.product_id),
            status: "pending",
        };

        try {
            const res = await fetch("http://localhost:5000/create-ssl-payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payment),
            });

            const data = await res.json();
            console.log("Payment response from backend:", data);

            if (data.url) {
                // Redirect to SSLCommerz payment page
                window.location.href = data.url;
            } else {
                Swal.fire("Error", data.error || "Payment initiation failed", "error");
            }
        } catch (error) {
            console.log(error);
            Swal.fire("Error", "Payment request failed", "error");
        }
    };

    return (
        <div className="font-serif">
            <div className="mt-10 mb-[50px]">
                <h1 className="text-center text-sky-500 text-5xl font-bold">
                    Please Make Payment
                </h1>
            </div>

            {cart.length > 0 ? (
                <div className="ml-[220px] mr-[220px]">
                    {/* Cart Table */}
                    <div className="overflow-x-auto ">
                        <table className="table">
                            <thead className="text-2xl text-center mb-4 text-sky-600">
                                <tr>
                                    <th>Total Orders</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Total Price</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className=" h-24 text-lg text-center font-semibold">
                                    <th>{cart.length}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>${totalPrice.toFixed(2)}</td>
                                    <td>{new Date().toLocaleDateString()}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-center mt-[30px] text-2xl">
                        <button
                            onClick={handlePayment}
                            disabled={!cart.length}
                            className="btn w-[200px] h-[50px] flex justify-center bg-gradient-to-r from-indigo-800 to-indigo-600 text-white sm:btn-sm md:btn-md"
                        >
                            Pay
                        </button>
                    </div>
                </div>
            ) : (
                <h1 className="text-center text-2xl mt-10">
                    No items in cart to make payment
                </h1>
            )}
        </div>
    );
}

export default Payment;