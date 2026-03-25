import React from 'react'
import useCart from "../../store/useCart";

function Payment({ user }) {
    const [cart, refetch, loading] = useCart(user._id);
    const totalPrice = cart.reduce(
        (total, item) => total + item.productDetails.price * item.quantity,
        0
    );
    return (
        <div>
            <div className='mt-10 mb-[50px]'>
                <h1 className='text-center text-sky-500 text-4xl font-bold'> Please Make Payment</h1>
            </div>
            {cart.length > 0 ? (
                <div className="ml-[220px] mr-[220px]">
                    <div className="overflow-x-auto ">
                        <table className="table">
                            {/* head */}
                            <thead className="text-xl text-center mb-4 text-sky-600">
                                <tr>
                                    <th>
                                        Total Orders
                                    </th>
                                    <th>Name</th>
                                    <th>Email</th>

                                    <th>Total Price</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody >

                                <tr className=" h-24 text-base text-center font-semibold">
                                    <th>
                                        {cart.length}
                                    </th>
                                    <td>

                                        <h3>{user.name} </h3>

                                    </td>
                                    <td>
                                        <h3>{user.email}</h3>

                                    </td>
                                    <td>
                                        <h3> ${totalPrice.toFixed(2)}</h3>
                                    </td>
                                    <td>
                                        <h3>{new Date().toLocaleDateString()}</h3>
                                    </td>

                                </tr>
                            </tbody>

                        </table>
                    </div>
                    <div className="flex justify-center mt-6">
                        <button className="btn btn-primary">Primary</button>
                    </div>
                    <div className="bg-red-500 text-white p-4">
                        Tailwind Test
                    </div>
                    <button className="test-daisy">Check</button>
                </div>
            ) : <h1 className='text-center text-2xl mt-10'>No items in cart to make payment</h1>}

        </div >

    )
}

export default Payment
