import React from "react";
import { useEffect } from "react";

import Footer from "../../components/Footer.jsx";

function OurShop() {

  return (
    <div>
      <div>
        <h1 className='mb-5 mt-16 text-center font-semibold text-5xl  font-mono tracking-widest 
                  bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary'>
          WELCOME TO  OUR SHOP PAGE
        </h1>
      </div>
      <div className="mt-10">
        <Footer></Footer>
      </div>

    </div>
  );
}
export default OurShop;
