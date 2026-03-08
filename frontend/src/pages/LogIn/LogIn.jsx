import React from "react";
import { useContext } from "react";
// import { Helmet } from "react-helmet-async";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { AuthContext } from "../../Provider/AuthProvider";
// import Swal from "sweetalert2";
// import useAxiosPublic from "../../Hook/useAxiosPublic";


const LogIn = () => {
    // const { signIn, googleLogin } = useContext(AuthContext);
    // const axiosPublic = useAxiosPublic();


    // const location = useLocation();
    // console.log(location);
    // const navigate = useNavigate();
    // const from = location.state?.from?.pathname || "/";


    // const handleLogIn = e => {
    //     e.preventDefault();
    //     const email = e.target.email.value;
    //     const password = e.target.password.value;
    //     console.log(email, password);
    //     signIn(email, password)
    //         .then(result => {
    //             console.log(result.user);
    //             Swal.fire({
    //                 icon: "success",
    //                 text: "LogIn successfully!",

    //             });

    //             navigate(from, { replace: true });
    //         })
    //         .catch(error => {
    //             console.log(error);
    //             Swal.fire({
    //                 icon: "error",
    //                 text: "Please Provide Correct Email And Password!",

    //             });

    //         })
    // }
    // const role = "user";
    // //--------- Google Login-----------
    // const handleGoogleLogin = e => {
    //     e.preventDefault();
    //     googleLogin()
    //         .then(result => {
    //             console.log(result.user)
    //             const userInfo = {
    //                 email: result.user?.email,
    //                 name: result.user?.displayName,
    //                 role

    //             }
    //             axiosPublic.post('/users', userInfo)
    //                 .then(res => {
    //                     console.log(res.data);
    //                 })
    //             Swal.fire({
    //                 icon: "success",
    //                 text: "LogIn successfully!",

    //             });
    //             navigate(from, { replace: true });
    //         })
    //         .catch(error => {
    //             console.log(error.message);
    //             alert(error.message)
    //         })


    // }
    return (
        <div className="mt-10">
            <div className=" lg:w-[430px] sm:w-[350px] lg:h-[560px] sm:h-[500px] bg-gradient-to-r from-primary to-secondary lg:ml-[550px]  mb-10 rounded-xl sm:ml-[0px]">
                {/* <Helmet>
                    <title>HealthHaven | Login</title>
                </Helmet> */}

                <div className="pt-[25px]">
                    <h2 className="text-center text-2xl font-bold text-yellow-50 mb-2 font-serif ">WELCOME BACK <br /> <span className="font-serif  text-pink-400  text-3xl">SMART AGRO HUB</span> </h2>

                </div>
                <div className="bg-white lg:w-[380px] sm:w-[300px] ml-[25px] rounded-lg mt-[23px]">
                    <p className="text-center text-base font-semibold text-slate-400 pt-3">PLEASE ENTER YOUR YOUR<br />  EMAIL AND  PASSWORD</p>
                    <form /* onSubmit={handleLogIn} */ className="pt-3 lg:pl-12 sm:pl-0">
                        <div className="mb-4 lg:w-[300px] sm:w-[250px] h-[50px]">
                            <input className="w-full h-full rounded-lg text-center" type="email" placeholder="Enter Your Email" required name="email" />
                        </div>
                        
                        <div className="mb-4 lg:w-[300px] sm:w-[250px] h-[50px] ">
                            <input className="w-full h-full text-center rounded-lg" type="password" placeholder="Enter Your Password" required name="password" />
                        </div>

                        

                        <div className=" lg:w-[300px] sm:w-[250px] bg-gradient-to-r from-secondary to-primary hover:border-4 h-[50px] rounded-2xl">
                            <button className=" btn btn-outline btn-secondary w-full h-full text-white"> LOGIN</button>
                        </div>
                    </form>
                    <div className="mt-3" data-aos="fade-down" data-aos-easing="linear" data-aos-duration="1450">
                        <h3 className="text-center text-xl font-semibold text-yellow-600">Don`t Have An Account? <Link to={"/register"}><span className="text-lime-300" >Register</span></Link></h3>
                    </div>
                    <div data-aos="fade-down" data-aos-easing="linear" data-aos-duration="1500">
                        <div className="divider pt-4 divider-neutral text-xl font-medium ml-14 mr-14">
                            Continue With
                        </div>

                        <div className="flex  ml-[170px]  pb-4 mt-6">
                            <div  >
                                <button /* onClick={handleGoogleLogin} */ className=" mr-8    text-center pt-1 "><FcGoogle className="w-10 h-10"></FcGoogle></button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogIn;