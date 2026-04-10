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
      <Route path="/machinery" element={<Machinery />} />
      <Route path="/poultry" element={<Poultry />} />
      <Route path="/cat" element={<Cat />} />
      <Route path="/veterinary" element={<Veterinary />} />
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

        {/* ADMIN */}
        <Route path="adminHome" element={<AdminHome />} />

      </Route>

    </Routes>
  );
};

export default AppRoutes;