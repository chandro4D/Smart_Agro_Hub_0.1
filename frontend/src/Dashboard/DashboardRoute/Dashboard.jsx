import React from 'react';
import Admin from '../AdminDashboard/Admin';
import User from '../UserDashboard/User';
import Seller from '../SellerDashboard/Seller';

function Dashboard() {
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;

    const role = user?.role;

    return (
        <div>
            <div className='mt-10 text-center'>
                {role === "Admin" && (
                    <Admin></Admin>
                )}

                {role === "Seller" && (
                    <Seller></Seller>
                )}

                {role === "user" && (
                    <User></User>
                )}

                {!role && (
                    <h2 className='text-2xl text-gray-600'>
                        Please login
                    </h2>
                )}
            </div>
        </div>
    );
}

export default Dashboard;