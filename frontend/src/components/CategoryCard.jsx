import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = () => {
    return (
        <div className="grid grid-cols-3 lg:w-[1300px]  sm:w-[500px] text-2xl lg:ml-[112px]  uppercase mb-20">
            <Link to='/crop'>
                <div>
                    <p className="py-3 text-center font-semibold font-mono tracking-widest text-2xl 
                    bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"> Crop </p>
                    <div className="border-4  mr-5  rounded-xl ">
                        <img className="w-[600px]  h-[200px] rounded-xl" src="https://www.zashopbd.com/wp-content/uploads/2024/11/Dimension-12-SC-420x420.jpg.webp" alt="" />
                    </div>
                </div>
            </Link>
            <Link to='/cattle'>
                <div>
                    <p className="py-3 text-center font-semibold font-mono tracking-widest text-2xl 
                    bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Cattle</p>
                    <div className="border-4  mr-5  rounded-xl ">
                        <img className="w-[600px]  h-[200px] rounded-xl" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhLZdwLL18thkAAX4paPU47Y0SFumo7A0U8w&s" alt="" />
                    </div>
                </div>
            </Link>
            <Link to='/machinery'>
                <div >
                    <p className="py-3 text-center font-semibold font-mono tracking-widest text-2xl 
                    bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Agri Machinery</p>
                    <div className="border-4  mr-5  rounded-xl ">
                        <img className="w-[600px]  h-[200px] rounded-xl" src="https://shservicebd.com/wp-content/uploads/2024/08/SONALI-7-HP-Diesel-Engine-Self-Propelled-Power-Tiller-SPL1100A-6-2-247x296.jpg" alt="" />
                    </div>
                </div>
            </Link>
            <Link to='/poultry'>
                <div className="mt-10">
                    <p className="py-5 text-center font-semibold font-mono tracking-widest text-2xl 
                    bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Poultry </p>
                    <div className="border-4  mr-5  rounded-xl ">
                        <img className="w-[600px]  h-[200px] rounded-xl" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Cows_eating_TMR.JPG/500px-Cows_eating_TMR.JPG" alt="" />
                    </div>
                </div>

            </Link>
            <Link to='/veterinary'>
                <div className="mt-10">
                    <p className="py-5 text-center font-semibold font-mono tracking-widest text-2xl 
                    bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Veterinary Supplies Items</p>
                    <div className="border-4  mr-5  rounded-xl ">
                        <img className="w-[600px]  h-[200px] rounded-xl" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Cows_eating_TMR.JPG/500px-Cows_eating_TMR.JPG" alt="" />
                    </div>
                </div>

            </Link>
            <Link to='/cat'>
                <div className="mt-10">
                    <p className="py-5 text-center font-semibold font-mono tracking-widest text-2xl 
                    bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Cat Items</p>
                    <div className="border-4  mr-5  rounded-xl ">
                        <img className="w-[600px]  h-[200px] rounded-xl" src="https://cdn.pixabay.com/photo/2016/09/05/21/37/cat-1647775_1280.jpg" alt="" />
                    </div>
                </div>

            </Link>
        </div>
    );
};

export default CategoryCard;