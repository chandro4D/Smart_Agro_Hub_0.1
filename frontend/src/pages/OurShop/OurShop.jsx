import React from "react";
import { useEffect } from "react";
import { useProductStore } from "../../store/useProductStore.js";
import AllProductCard from "../../components/AllProductCard.jsx";
import Footer from "../../components/Footer.jsx";
import { Link } from "react-router-dom";

function OurShop() {
  const { products, loading, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div>
      <div>
        <div>
          <h1 className='text-center mb-5 mt-[60px] font-semibold text-5xl  font-mono tracking-widest 
                  bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary'>SEE ALL PRODUCTS HERE</h1>
        </div>
        <div className="dropdown dropdown-hover ml-[200px]">
          <label tabIndex={0} className="btn m-1">Search By Category</label>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
           <Link to="/machinery"><li><a>Agri Machinery</a></li></Link>
            <Link to="/veterinary"><li><a>Veterinary</a></li></Link>
            <Link to="/poultry"><li><a>Poultry</a></li></Link>
            <Link to="/cattle"><li><a>Cattle</a></li></Link>
            <Link to="/crop"><li><a>Crop</a></li></Link>
            <Link to="/cat"><li><a>Cat</a></li></Link>
          </ul>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="loading loading-spinner loading-lg" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ml-[150px] mr-[150px]">
            {products?.map((product) => (
              <AllProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
      <div className="mt-10">
        <Footer></Footer>
      </div>

    </div>
  );
}
export default OurShop;
