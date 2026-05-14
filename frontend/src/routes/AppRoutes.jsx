import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home.jsx";
import Login from "../pages/LogIn/LogIn.jsx";
import OurShop from "../pages/OurShop/OurShop.jsx";
import AgriInfo from "../pages/AgriInfo/AgriInfo.jsx";
import SignUp from "../pages/SignUp/SignUp.jsx";

import Cart from "../pages/Cart/Cart.jsx";
import Crop from "../pages/IndividualProducts/Crop.jsx";
import Cat from "../pages/IndividualProducts/Cat.jsx";
import Veterinary from "../pages/IndividualProducts/Veterinary.jsx";
import Poultry from "../pages/IndividualProducts/Poultry.jsx";
import Machinery from "../pages/IndividualProducts/Machinery.jsx";
import Cattle from "../pages/IndividualProducts/Cattle.jsx";

import Dashboard from "../Dashboard/DashboardRoute/Dashboard.jsx";
import User from "../Dashboard/UserDashboard/User.jsx";
import Usercart from "../Dashboard/UserDashboard/Usercart.jsx";
import Seller from "../Dashboard/SellerDashboard/Seller.jsx";
import PaymentHistory from "../Dashboard/UserDashboard/PaymentHistory.jsx";
import Payment from "../Dashboard/UserDashboard/Payment.jsx";

// For Admin Dashboard
import AdminHome from "../Dashboard/AdminDashboard/AdminHome.jsx";
import ManageUsers from "../Dashboard/AdminDashboard/ManageUsers.jsx";
import AdminAnalytics from "../Dashboard/AdminDashboard/AdminAnalytics.jsx";
import ManageProducts from "../Dashboard/AdminDashboard/ManageProducts.jsx";
import ManageCategory from "../Dashboard/AdminDashboard/ManageCategory.jsx";
import Orders from "../Dashboard/AdminDashboard/Orders.jsx";
import SalesReport from "../Dashboard/AdminDashboard/SalesReport.jsx";
import ManageBanner from "../Dashboard/AdminDashboard/ManageBanner.jsx";
import Notifications from "../Dashboard/AdminDashboard/Notifications.jsx";
import Settings from "../Dashboard/AdminDashboard/Settings.jsx";
import OrderDetails from "../Dashboard/AdminDashboard/OrderDetails";
import Wishlist from "../Dashboard/UserDashboard/Wishlist.jsx";
import Profile from "../Dashboard/UserDashboard/Profile.jsx";
import Support from "../Dashboard/UserDashboard/Support.jsx";
import Address from "../Dashboard/UserDashboard/Address.jsx";



const AppRoutes = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/shop" element={<OurShop />} />
      <Route path="/AgriInfo" element={<AgriInfo />} />
      <Route path="/signup" element={<SignUp />} />

      {/* PAYMENT */}
      <Route path="/payment" element={<Payment user={user} />} />

      {/* PRODUCTS */}
      <Route path="/crop" element={<Crop />} />
      <Route path="/agri-machinery" element={<Machinery />} />
      <Route path="/poultry" element={<Poultry />} />
      <Route path="/cat-items" element={<Cat />} />
      <Route path="/veterinary-supplies-items" element={<Veterinary />} />
      <Route path="/cattle" element={<Cattle />} />

      {/* CART */}
      <Route path="/cart" element={<Cart user={user} />} />

      {/* DASHBOARD */}
      <Route path="/dashboard" element={<Dashboard />}>

        {/* DEFAULT */}
        <Route index element={<Usercart user={user} />} />

        {/* USER */}
        <Route path="user" element={<User />} />
        <Route path="Usercart" element={<Usercart user={user} />} />
        <Route path="paymentHistory" element={<PaymentHistory />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="profile" element={<Profile />} />
        <Route path="address" element={<Address />} />
        <Route path="support" element={<Support />} />

        {/* ADMIN */}
        <Route path="adminHome" element={<AdminHome />} />
        <Route path="manageUsers" element={<ManageUsers />} />
        <Route path="adminAnalytics" element={<AdminAnalytics />} />
        <Route path="manageProducts" element={<ManageProducts />} />
        <Route path="manageCategory" element={<ManageCategory />} />
        <Route path="orders" element={<Orders />} />
        <Route path="adminSalesReport" element={<SalesReport />} />
        <Route path="adminManageBanner" element={<ManageBanner />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="settings" element={<Settings />} />
        <Route path="order/:trxId" element={<OrderDetails />} />
      </Route>

    </Routes>
  );
};

export default AppRoutes;