import React, { useEffect, useState } from "react";
import { useProductStore } from "../../store/useProductStore.js";
import AllProductCard from "../../components/AllProductCard.jsx";
import Footer from "../../components/Footer.jsx";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
function OurShop() {
  const { products, loading, fetchProducts } = useProductStore();

  // Category & search state
  const [searchParams] = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "all"
  );
  // ✅ PUT IT HERE
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    navigate(`/ourshop?category=${category}`);
  };
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const categoryFromURL = searchParams.get("category");

    if (categoryFromURL) {
      setSelectedCategory(categoryFromURL);
    } else {
      setSelectedCategory("all");
    }
  }, [searchParams]);


  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Filter products by category and search text
  const filteredProducts = products?.filter((product) => {
    const matchCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    const matchSearch = product.name
      .toLowerCase()
      .includes(searchText.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <div>
      <div>
        <h1
          className="text-center mb-5 mt-[60px] font-semibold text-5xl font-mono tracking-widest 
          bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
        >
          SEE ALL PRODUCTS HERE
        </h1>

        {/* Dropdown + Search */}
        <div className="flex gap-4 ml-[200px] mt-4 items-center">
          {/* Category Dropdown */}
          <div className="dropdown dropdown-hover">
            <label tabIndex={0} className="btn w-[200px] text-base font-serif rounded-lg ">
              {selectedCategory === "all" ? "Search By Category" : selectedCategory}
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li onClick={() => setSelectedCategory("all")}>
                <a>All</a>
              </li>
              <li onClick={() => setSelectedCategory("machinery")}>
                <a>Agri Machinery</a>
              </li>
              <li onClick={() => setSelectedCategory("veterinary")}>
                <a>Veterinary</a>
              </li>
              <li onClick={() => setSelectedCategory("poultry")}>
                <a>Poultry</a>
              </li>
              <li onClick={() => setSelectedCategory("cattle")}>
                <a>Cattle</a>
              </li>
              <li onClick={() => setSelectedCategory("crop")}>
                <a>Crop</a>
              </li>
              <li onClick={() => setSelectedCategory("cat")}>
                <a>Cat</a>
              </li>
            </ul>
          </div>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search product..."
            className="input input-bordered w-60 bg-slate-500 rounded-lg text-white text-lg text-center"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="loading loading-spinner loading-lg" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ml-[150px] mr-[150px]">
            {filteredProducts?.length > 0 ? (
              filteredProducts.map((product) => (
                <AllProductCard key={product._id} product={product} />
              ))
            ) : (

              <p className="mt-[100px] mb-[100px] font-semibold text-5xl font-mono text-center  col-span-full  text-gray-500">
                No products found...
              </p>
            )}
          </div>
        )}
      </div>

      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
}

export default OurShop;