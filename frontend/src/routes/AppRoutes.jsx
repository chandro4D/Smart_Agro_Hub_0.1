import React from "react";

import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Login from "../pages/LogIn/LogIn.jsx";
import OurShop from "../pages/OurShop/OurShop.jsx";
import AgriInfo from "../pages/AgriInfo/AgriInfo.jsx";
import SignUp from "../pages/SignUp/SignUp.jsx";
import Cart from "../pages/Cart/Cart.jsx";
import Crop from "../pages/IndividualProducts/Crop.jsx";

const AppRoutes = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/shop" element={<OurShop></OurShop>} />
      <Route path="/AgriInfo" element={<AgriInfo />} />
      <Route path="/signup" element={<SignUp></SignUp>} />
      <Route path="/cartPage" element={<Cart user={user} />} />
      {/* For Individual Products */}
      <Route path="/crop" element={<Crop></Crop>} />
    </Routes>
  );
};

export default AppRoutes;