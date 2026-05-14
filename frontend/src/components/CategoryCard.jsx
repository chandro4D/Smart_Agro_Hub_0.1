import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CategoryCard = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        console.log(import.meta.env.VITE_API_URL);
        fetch(`${import.meta.env.VITE_API_URL}/categories`)
            .then((res) => res.json())
            .then((data) => setCategories(data))
            .catch((error) => console.log(error));
    }, []);

    return (
        <div className="grid grid-cols-3 lg:w-[1300px] sm:w-[500px] text-2xl lg:ml-[112px] uppercase mb-20 gap-y-10">
            {categories.map((item) => (
                <Link key={item._id} to={`/${item.slug}`}>
                    <div className="transform hover:scale-105 transition duration-300">
                        <p
                            className="py-3 text-center font-semibold font-mono tracking-widest text-2xl 
              bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
                        >
                            {item.name}
                        </p>

                        <div className="border-4 mr-5 rounded-xl overflow-hidden">
                            <img
                                className="w-[600px] h-[200px] rounded-xl object-cover"
                                src={item.image}
                                alt={item.name}
                            />
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default CategoryCard;