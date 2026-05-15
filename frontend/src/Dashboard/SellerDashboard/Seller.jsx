import React from 'react'
import { FaMoneyBillTrendUp, FaUsersLine, FaTruckMedical } from "react-icons/fa6";
const Seller = () => {
    // const { user } = useContext(AuthContext);
    // const [analytics, setAnalytics] = useState([]);
    // useEffect(() => {
    //     fetch('https://medicine-selling-server.vercel.app/admin-stats')
    //         .then(res => res.json())
    //         .then(data => setAnalytics(data))
    // },)
    return (
        <div>
            <div><h1 className='text-center text-sky-500 text-4xl font-bold ml-32 pt-10 mb-10'>HI,WELCOME
                {/* {user?.displayName ? user.displayName : 'BACK'} */}
            </h1></div>
            <div className="flex ml-[80px]">
                <div className="w-[220px] rounded-lg mr-4 h-[150px] bg-gradient-to-r from-indigo-500  to-pink-500">
                    <div className="flex mt-10">
                        <h3 className="text-4xl ml-10  mr-2 text-white"> < FaMoneyBillTrendUp /></h3>
                        <h3 className=" text-xl text-white mt-3 font-semibold">
                            {/* {analytics.revenue} */}
                            BDT</h3>
                    </div>
                    <h3 className="ml-10 text-3xl  text-white">Revenue</h3>
                </div>
                <div className="w-[220px] rounded-lg mr-4 h-[150px] bg-gradient-to-r from-indigo-500 from-10%  to-emerald-500 to-90%">
                    <div className="flex  mt-10">
                        <h3 className="text-4xl ml-10  mr-2 text-white"> <FaUsersLine /></h3>
                        <h3 className=" text-xl text-white mt-1 font-semibold">
                            {/* {analytics.users} */}
                        </h3>
                    </div>
                    <h3 className="ml-10 text-3xl text-white">Customers</h3>
                </div>
                <div className="w-[220px] rounded-lg mr-4 h-[150px] bg-gradient-to-r from-cyan-500 to-blue-500">
                    <div className="flex  mt-10">
                        <h3 className="text-4xl ml-10  mr-2 text-white"> {/* <CgGift /> */} </h3>
                        <h3 className=" text-xl text-white mt-1 font-semibold">
                            {/* {analytics.menuItems} */}
                        </h3>
                    </div>
                    <h3 className="ml-10 text-3xl text-white">Products</h3>
                </div>
                <div className="w-[220px] rounded-lg h-[150px] bg-gradient-to-r from-indigo-500 from-10%  to-emerald-500 to-90%">
                    <div className="flex  mt-10">
                        <h3 className="text-4xl ml-10  mr-2 text-white"> <FaTruckMedical /></h3>
                        <h3 className=" text-xl text-white mt-1 font-semibold">
                            {/* {analytics.orders} */}
                        </h3>
                    </div>
                    <h3 className="ml-10 text-3xl text-white">Orders</h3>
                </div>
            </div>
        </div>
    );
};

export default Seller;