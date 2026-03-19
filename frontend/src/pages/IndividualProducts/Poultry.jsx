import React, { useEffect, useState } from "react";
import ProductCard from "../../components/AllProductCard"; 

const Poultry = () => {
  const [products, setProducts] = useState([]);

  const BASE_URL =
    import.meta.env.MODE === "development"
      ? "http://localhost:5000"
      : "";

  useEffect(() => {
    fetch(`${BASE_URL}/products/poultry`) // 👈 only poultry category
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="mt-10 px-5 ml-[130px] mr-[130px]">
      <h1 className='text-center mb-5 mt-[60px] font-semibold text-5xl  font-mono tracking-widest 
                  bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary'>
        Poultry Products
      </h1>

      {/* 🔥 SAME CARD DESIGN GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Poultry;