import React from "react";
import { Link, useResolvedPath } from "react-router-dom";
import { LogOutIcon, ShoppingBagIcon, ShoppingCartIcon } from "lucide-react";
import Swal from "sweetalert2";
import { UserIcon } from "lucide-react";

import { useNavigate } from "react-router-dom";
import ThemeSelector from "../components/ThemeSelector.jsx";



function Navbar() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  // LogOut
  const handleLogout = () => {
  Swal.fire({
    icon: "success",
    text: "LogOut Successfully!",
    // timer: 1500,
    showConfirmButton: true
  }).then(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  });
};

  return (
    <div className="bg-base-100/80 backdrop-blur-lg border-b border-base-content/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="navbar px-4 min-h-[4rem] justify-between">
          {/* LOGO */}
          <div className="flex-1 lg:flex-none">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <div className="flex items-center gap-2">
                <ShoppingCartIcon className="size-9 text-primary" />
                <span className="font-semibold text-2xl  font-mono tracking-widest 
                  bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  SmartAgroHub
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Buttons */}
          <div>
            <h3 className="btn btn-neutral btn-dash mt-3 mr-5 font-semibold font-mono tracking-widest text-2xl 
              bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              <Link to="/">Home</Link>
            </h3>
            <h3 className="btn btn-neutral btn-dash mt-3 mr-5 font-semibold font-mono tracking-widest text-2xl 
              bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              <Link to="/shop">OurShop</Link>
            </h3>
            <h3 className="btn btn-neutral btn-dash mt-3 mr-5 font-semibold font-mono tracking-widest text-2xl 
              bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              <Link to="/AgriInfo">AGRO INFO</Link>
            </h3>
            {!user ? (
              <>
                <>
                  <h3 className="btn btn-neutral btn-dash mt-3 mr-5 font-semibold font-mono tracking-widest text-2xl 
                  bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                    <Link to="/login">LogIn</Link>
                  </h3>
                  <h3 className="btn btn-neutral btn-dash mt-3 mr-5 font-semibold font-mono tracking-widest text-2xl 
                  bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                    <Link to="/signup">SignUp</Link>
                  </h3>
                </>
              </>
            ) : (
              <>
                <h3 onClick={handleLogout} className="btn btn-neutral btn-dash mt-3 mr-5 font-semibold font-mono tracking-widest text-2xl 
                  bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  Logout
                </h3>
              </>
            )}



          </div>

          <div className="flex items-center gap-4">
            <ThemeSelector />


            <div className="indicator">
              <div onClick={() => navigate("/cartPage")} className="p-2 rounded-full hover:bg-base-200 transition-colors">
                <ShoppingBagIcon className="size-7" />
                <span className="badge badge-sm badge-primary indicator-item">

                </span>
              </div>
            </div>

          </div>


          <div className="tooltip tooltip-bottom mr-5" data-tip="2">
            <div className="dropdown dropdown-bottom">
              <div tabIndex={0} className="m-1">
                <UserIcon className="hover:text-fuchsia-500 text-4xl rounded-full  w-[35px] h-[35px] " />

              </div>
              <ul tabIndex={5} className="dropdown-content text-black w-44 z-[1] menu p-4 shadow bg-gradient-to-r from-cyan-500 to-blue-500 rounded-box">
                <li className="font-semibold">
                  <Link to="/updateProfile">Update Profile</Link>
                </li>
                <li className="font-semibold">
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <button className="btn bg-white w-[120px] mt-3 ml-[10px] font-bold text-red-600 text-base">
                    Logout <LogOutIcon className="text-2xl" />
                  </button>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Navbar;
