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

// const AppRoutes = () => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/shop" element={<OurShop></OurShop>} />
//       <Route path="/AgriInfo" element={<AgriInfo />} />
//       <Route path="/signup" element={<SignUp></SignUp>} />
//       <Route path="/cartPage" element={<Cart user={user} />} />
//       {/* For Individual Products */}
//       <Route path="/crop" element={<Crop></Crop>} />
//       <Route path="/machinery" element={<Machinery></Machinery>} />
//       <Route path="/poultry" element={<Poultry></Poultry>} />
//       <Route path="/cat" element={<Cat></Cat>} />
//       <Route path="/veterinary" element={<Veterinary></Veterinary>} />
//       <Route path="/cattle" element={<Cattle></Cattle>} />
//       {/* Dashboard */}
//       <Route path="/dashboard" element={<Dashboard />} />
//       <Route path="/dashboard/user" element={<User></User>} />

//       <Route path="/cart" element={<Cart user={user} />} />
//     </Routes>
//   );
// };

// export default AppRoutes;

import Dashboard from "../Dashboard/DashboardRoute/Dashboard.jsx";
import User from "../Dashboard/UserDashboard/User.jsx";


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

      {/* ✅ Dashboard with nested routes */}
      <Route path="/dashboard" element={<Dashboard />}>
        
        {/* ✅ DEFAULT PAGE (auto load) */}
        <Route index element={<Cart user={user} />} />

        {/* User dashboard pages */}
        <Route path="user" element={<User />} />
        <Route path="paymentHistory" element={<div>Payment History</div>} />

        {/* Optional: dedicated cart route */}
        <Route path="cart" element={<Cart user={user} />} />

      </Route>

      {/* Optional standalone cart (can remove if not needed) */}
      <Route path="/cart" element={<Cart user={user} />} />
    </Routes>
  );
};

export default AppRoutes;