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

import PaymentHistory from "../Dashboard/UserDashboard/paymentHistory.jsx";
const AppRoutes = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/shop" element={<OurShop />} />
      <Route path="/AgriInfo" element={<AgriInfo />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Products */}
      <Route path="/crop" element={<Crop />} />
      <Route path="/machinery" element={<Machinery />} />
      <Route path="/poultry" element={<Poultry />} />
      <Route path="/cat" element={<Cat />} />
      <Route path="/veterinary" element={<Veterinary />} />
      <Route path="/cattle" element={<Cattle />} />
      <Route path="/cart" element={<Cart user={user} />} />
      <Route path="/Usercart" element={<Usercart user={user} />} />
      <Route path="/seller" element={<Seller />} />

      {/* ✅ Dashboard with nested routes */}
      <Route path="/dashboard" element={<Dashboard />}>

        {/* ✅ DEFAULT PAGE (auto load) */}
        <Route index element={<Usercart user={user} />} />

        {/* User dashboard pages */}
        <Route path="user" element={<User />} />
        <Route path="paymentHistory" element={<PaymentHistory />} />

        {/* Optional: dedicated cart route */}
        <Route path="Usercart" element={<Usercart user={user} />} />

      </Route>

      {/* Optional standalone cart (can remove if not needed) */}
      <Route path="/Usercart" element={<Usercart user={user} />} />
    </Routes>
  );
};

export default AppRoutes;