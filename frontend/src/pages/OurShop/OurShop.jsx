import React from "react";
import { useEffect } from "react";
import { useProductStore } from "../../store/useProductStore.js";
import AllProductCard from "../../components/AllProductCard.jsx";
import Footer from "../../components/Footer.jsx";

function OurShop() {
  const { products, loading, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div>
      <div>
        <div>
          <h1 className='text-center mb-10 mt-[60px] font-semibold text-5xl  font-mono tracking-widest 
                  bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary'>SEE ALL PRODUCTS HERE</h1>
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
