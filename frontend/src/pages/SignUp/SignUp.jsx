import React from "react";

// import { useContext, useState } from "react";
// import { Helmet } from "react-helmet-async";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { AuthContext } from "../../Provider/AuthProvider";
// import useAxiosPublic from "../../Hook/useAxiosPublic";


const SignUp = () => {

    // const axiosPublic = useAxiosPublic();

    // const [showPassword, setShowPassword] = useState(false);
    // const [registerError, setRegisterError] = useState("");
    // const [success, setSuccess] = useState('');

    // const navigate = useNavigate();

    // const location = useLocation();
    // console.log(location);

    // const from = location.state?.from?.pathname || "/";

    // const { createUser, googleLogin, setUser, updateUserProfile } = useContext(AuthContext);

    // const [selectedRole, setSelectedRole] = useState('user');

    // const handleRoleChange = (event) => {
    //     setSelectedRole(event.target.value);
    // };

    // const handleRegister = e => {
    //     e.preventDefault();
    //     const email = e.target.email.value;
    //     const password = e.target.password.value;
    //     const name = e.target.name.value;
    //     const PhotoURL = e.target.PhotoURL.value;
    //     const role = `${selectedRole}`

    //     console.log(email, password, name, PhotoURL, role);

    //     if (password.length < 6) {
    //         setRegisterError('Password should be at least 6 characters');
    //         Swal.fire({
    //             icon: "error",
    //             text: "Password should be at least 6 characters!",

    //         });
    //         return;
    //     }
    //     else if (!/[A-Z]/.test(password)) {
    //         setRegisterError('Your password should have at least one upper case letter');

    //         Swal.fire({
    //             icon: "error",
    //             text: "Your password should have at least one upper case letter!",

    //         });
    //         return;
    //     }
    //     else if (!/[a-z]/.test(password)) {
    //         setRegisterError('Your password should have at least one lower case letter');
    //         Swal.fire({
    //             icon: "error",
    //             text: "Your password should have at least one lower case letter!",

    //         });
    //         return;
    //     }
    //     setRegisterError('');
    //     setSuccess('');
    //     createUser(email, password, name, PhotoURL)
    //         .then(result => {

    //             console.log(result.user);
    //             setUser(result.user);
    //             setSuccess("Account Created successfully");
    //             // create user entry--------------
    //             const userInfo = {
    //                 email,
    //                 name,
    //                 PhotoURL,
    //                 role

    //             }
    //             axiosPublic.post('/users', userInfo)
    //                 .then(res => {
    //                     if (res.data.insertedId) {
    //                         Swal.fire({
    //                             icon: "success",
    //                             text: "Account Created  successfully!",

    //                         });
    //                     }
    //                 })


    //             updateUserProfile(name, PhotoURL)
    //             // .then()
    //             navigate("/");
    //         })
    //         .catch(error => {
    //             console.log(error);
    //             setRegisterError(error.message);
    //         })
    // }
    // //--------- Google Login-----------
    // const role = "user";
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
        <div className="mt-3">
            <div className="lg:w-[450px] lg:h-[645px] sm:w-[400px] sm:h-[550px] bg-gradient-to-r from-primary to-secondary lg:ml-[500px] sm:ml-0  mb-10 rounded-xl">
                {/* <Helmet>
                    <title>HealthHaven | Register</title>
                </Helmet> */}
                <div className=" pt-3">
                    <h2 className="text-center text-2xl font-bold text-white mb-2 font-serif">WELCOME TO <br /> SMART AGRO HUB</h2>
                    <p className="text-center text-xl font-semibold text-slate-800">Register Your Account </p>
                </div>
                <form /* onSubmit={handleRegister} */ className="pt-2 lg:pl-12 sm:pl-0">
                    <div className=" lg:w-[350px] sm:w-[250px] h-[50px]">
                        <input className="w-full h-full rounded-lg text-center" type="name" placeholder="Your Name" required name="name" />
                    </div>
                    <br />
                    <div className=" lg:w-[350px] sm:w-[250px] h-[50px]">
                        <input className="w-full h-full rounded-lg text-center" type="email" placeholder="Your Email" required name="email" />
                    </div>
                    <br />
                    <div className="flex ">
                        <div className="w-[350px] " >
                            <input className="text-black rounded-lg text-center w-full     h-[50px]" placeholder="password" required
                               /* type={showPassword ? "text" : "password"} */ name="password" />
                        </div>
                        <div className="mt-3  ">
                            {/* <span className=""  onClick={() => { setShowPassword(!showPassword) }}>
                                {
                                    showPassword ? <FaEyeSlash className="w-10 h-5"></FaEyeSlash> : <FaEye className="w-10 h-5"></FaEye>
                                }
                            </span> */}
                        </div>
                    </div>


                    <br />
                    <div className=" lg:w-[350px] sm:w-[250px] h-[50px] ">
                        <input className="w-full h-full text-center rounded-lg" type="text" placeholder="Enter Your Photo URL" required name="PhotoURL" />
                    </div>
                    <br />

                    <div className=" lg:w-[350px] sm:w-[250px] h-[50px] bg-white rounded-lg">
                        
                           <select 
                           /* value={selectedRole} required  onChange={handleRoleChange} */
                           className="select select-bordered text-center pl-[160px] pt-[7px]">
                               
                               <option className="text-center  text-xl">user</option>
                               <option className="text-center  text-xl">seller</option>
                               
                           </select>
                           
                       
                    </div>


                    <br />
                    <div className=" lg:w-[350px] sm:w-[250px]]  h-[50px] bg-lime-400 rounded-2xl">
                        <button className="w-full h-full text-white"> Register</button>
                    </div>
                </form>
                {/* {
                    registerError && <p className="text-red-700 text-center text-xl font-semibold mt-5">{registerError}</p>
                } */}
                {/* {
                    success && <p className="text-green-500 text-center text-xl font-semibold mt-5">{success}</p>
                } */}
            
                <div className="flex  ml-[200px] mt-[4px]  ">
                    <div  >
                        <button /* onClick={handleGoogleLogin} */ className=" mr-8    text-center pt-1 "><FcGoogle className="w-10 h-10"></FcGoogle></button>
                    </div>

                </div>
                <div>
                    <h3 className="text-center text-xl font-medium text-amber-600">Already Have An Account? <Link to={"/login"}><span className="text-lime-300" >LOGIN</span></Link></h3>
                </div>
                <div>

                </div>
            </div>
        </div>
    );
};

export default SignUp;
