import React from "react";
import { UserIcon } from "lucide-react";

const Footer = () => {
    return (
        <div className="">
            <footer className="footer bg-center bg-full bg-cover text-green-500 bg-no-repeat  bg-[url('https://png.pngtree.com/thumb_back/fh260/back_our/20190625/ourmid/pngtree-blue-pattern-vouchers-background-image_262052.jpg')]   h-[350px]   ">

                <div className="flex  ">
                    <div className="w-[200px] mr-[250px] ml-[200px]  mt-10 " >
                        <UserIcon className="hover:text-fuchsia-500 text-4xl rounded-full mr-2 ml-16 w-[80px] h-[80px] " />
                        <br />
                        <p className="text-xl text-center underline hover:text-fuchsia-500" >support</p>
                        <p className="text-xl text-center hover:text-fuchsia-500" >+880 17 59 62 64 70</p>
                      
                        <p className="text-xl hover:text-fuchsia-500 "><i>supportSmartAgroHub@.com</i></p>
                        <br />
                        <p className="text-xl text-center underline hover:text-fuchsia-500">social</p>
                       
                        {/* <p>HealthHaven Industries Ltd.<br />Providing reliable tech since 1992</p> */}
                        <div className="  flex ml-12 ">
                            <a className="mr-3 hover:text-fuchsia-500"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg></a>
                            <a className="mr-3 hover:text-fuchsia-500"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg></a>
                            <a className="mr-3 hover:text-fuchsia-500"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg></a>
                        </div>
                    </div>

                    <div className="text-xl w-[200px] mr-[200px] mb-32 text-center mt-20">
                        <p className="mb-3 hover:text-fuchsia-500">About Us</p>
                       
                        <p className="mb-3 hover:text-fuchsia-500">Terms and Conditions</p>
                        
                        <p className="mb-3 hover:text-fuchsia-500">Refund and Return Policy</p>

                        <p className="mb-3 hover:text-fuchsia-500">Privacy Policy</p>

                        <p className="mb-3 hover:text-fuchsia-500">Disclaimer</p>
                    </div>
                    <div className="text-xl w-[200px] mb-32 text-center mt-20">
                        <p className="mb-3 hover:text-fuchsia-500">Buy Products Online</p>
                        <p className="mb-3 hover:text-fuchsia-500">Top 10 Products</p>
                        <p className="mb-3 hover:text-fuchsia-500">Contact us</p>
                        <p className="mb-3 hover:text-fuchsia-500">Blogs</p>
                        <p className="hover:text-fuchsia-500">FAQ</p>

                    </div>
                </div>


            </footer>
            <footer className="footer footer-center h-12 bg-base-300 text-base-content">
                <aside>
                    <p>Copyright © 2024 - All right reserved by <i>SmartAgroHub_0.1</i> Industries Ltd</p>
                </aside>
            </footer>
        </div>

    );
};

export default Footer;