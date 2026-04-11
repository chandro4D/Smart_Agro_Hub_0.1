import React from 'react';
import Admin from '../AdminDashboard/AdminHome';
import User from '../UserDashboard/User';
import Seller from '../SellerDashboard/Seller';
import Cart from '../../pages/Cart/Cart';
import { NavLink, Outlet } from 'react-router-dom';
import { FaBook, FaCartPlus, FaEnvelope, FaHome, FaList, FaUsers, FaUser } from "react-icons/fa";
import { MdOutlineManageAccounts, MdRestaurantMenu } from "react-icons/md";

function Dashboard() {
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;

    const role = user?.role;

    return (
        <div className="flex  ml-0">
            <div className="w-[280px] min-h-screen bg-gradient-to-r from-indigo-500  to-pink-500">
                <ul className="menu pl-8  text-white">
                    {/* {user?.PhotoURL ? (
                        <img
                            className="mr-2 border-2 object-cover border-white ml-16 mb-2 w-[80px] h-[80px] rounded-full"
                            src={user.PhotoURL}
                            alt={user.name}
                        />
                    ) : (
                        <FaUser className="mr-2 ml-16 mb-2 w-20 h-20 text-white" />
                    )} */}
                    <div className="pt-8">
                        <img className="mr-2 border-4 object-cover border-indigo-400 ml-16 mb-2 w-[80px] h-[80px] rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3A9J0P677Sulx-vF3NY5-T3zdAz_Z5sZZCwhdfhSW8CY3aR8Ng2-TpfU&s" alt="" />
                        <h1 className="text-xl pl-9 mb-3 font-bold">Smart Agro Hub</h1>
                    </div>
                    {role === "Admin" && (

                        <>
                            <li>
                                <NavLink to="/dashboard/adminHome"><FaHome></FaHome> ADMIN HOME</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manageUsers"> <FaUsers />MANAGE USERS</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/addItems"><MdOutlineManageAccounts />MANAGE CATEGORY</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/paymentManagement"><FaList></FaList> PAYMENT MANAGEMENT</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/adminSalesReport "> <FaBook></FaBook> SALES REPORT</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/adminManageBanner "> <FaBook></FaBook> MANAGE BANNER</NavLink>
                            </li>

                        </>
                    )}

                    {role === "Seller" && (

                        <>
                            <li>
                                <NavLink to="/seller"><FaHome></FaHome> Seller Home</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/manageMedicine'><FaCartPlus></FaCartPlus> Manage Medicine</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/sellerPaymentHistory'><FaCartPlus></FaCartPlus> Payment History</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/sellerAd'><FaCartPlus></FaCartPlus> Advertisement</NavLink>
                            </li>
                        </>
                    )}

                    {role === "user" && (
                        <>
                            <li>
                                <NavLink to="/dashboard/user"><FaHome></FaHome> User Home</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/Usercart'><FaCartPlus></FaCartPlus> My cart</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/paymentHistory'><FaCartPlus></FaCartPlus> Payment History</NavLink>
                            </li>
                        </>

                    )}

                    {!role && (
                        <h2 className='text-2xl text-gray-600'>
                            Please login
                        </h2>
                    )}




                    {/* -----------------------------sherd item------------------------------------------------------------ */}
                    <div className="divider divider-neutral"></div>
                    <li>
                        <NavLink to="/"><FaHome></FaHome>  Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/shop"><MdRestaurantMenu />Shop</NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact"><FaEnvelope />Contact</NavLink>
                    </li>
                </ul>
            </div>
            <div>
                <Outlet></Outlet>
            </div>

        </div>
    );
}

export default Dashboard;