import React from "react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
// import { AuthContext } from "../../Provider/AuthProvider";
// import useAxiosPublic from "../../Hook/useAxiosPublic";
// import { useContext, useState } from "react";
// import { Helmet } from "react-helmet-async";

const SignUp = () => {

    // const axiosPublic = useAxiosPublic();
    // const [showPassword, setShowPassword] = useState(false);
    const [registerError, setRegisterError] = useState("");
    // const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [selectedRole, setSelectedRole] = useState("user");

    const handleRoleChange = (e) => {
        setSelectedRole(e.target.value);
    };


    const navigate = useNavigate();

    const location = useLocation();
    // console.log(location);

    // const from = location.state?.from?.pathname || "/";

    // const { createUser, googleLogin, setUser, updateUserProfile } = useContext(AuthContext);

    // const [selectedRole, setSelectedRole] = useState('user');

    // const handleRoleChange = (event) => {
    //     setSelectedRole(event.target.value);
    // };
    const handleRegister = async (e) => {
        e.preventDefault();

        const form = e.target;

        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const PhotoURL = form.PhotoURL.value;
        const role = selectedRole;

        const userInfo = {
            name,
            email,
            password,
            PhotoURL,
            role,
        };
        if (password.length < 6) {
            setRegisterError('Password should be at least 6 characters');
            Swal.fire({
                icon: "error",
                text: "Password should be at least 6 characters!",

            });
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setRegisterError('Your password should have at least one upper case letter');

            Swal.fire({
                icon: "error",
                text: "Your password should have at least one upper case letter!",

            });
            return;
        }
        else if (!/[a-z]/.test(password)) {
            setRegisterError('Your password should have at least one lower case letter');
            Swal.fire({
                icon: "error",
                text: "Your password should have at least one lower case letter!",

            });
            return;
        }
        setRegisterError('');

        try {
            const res = await fetch("http://localhost:5000/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userInfo),
            });

            const data = await res.json();

            console.log(data);

            Swal.fire({
                icon: "success",
                text: "Account Created  successfully!",

            });

            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };
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
        <div className="mt-[20px]">
            <div className="text-black text-lg font-light font-serif lg:w-[450px] lg:h-[630px] sm:w-[400px] sm:h-[550px] bg-gradient-to-r from-primary to-secondary lg:ml-[500px] sm:ml-0  mb-10 rounded-xl">
                {/* <Helmet>
                    <title>HealthHaven | Register</title>
                </Helmet> */}
                <div className=" pt-[30px] mb-[15px]">
                    <h2 className="text-center text-3xl font-bold text-white mb-1 font-serif">WELCOME TO <br /> SMART AGRO HUB</h2>
                    <p className="text-center text-xl font-semibold text-slate-800">Register Your Account </p>
                </div>
                <form onSubmit={handleRegister} className="pt-2 lg:pl-12 sm:pl-0">
                    <div className="mb-[13px] lg:w-[350px] sm:w-[250px] h-[50px] bg-slate-200 rounded-lg">
                        <input className="w-full h-full rounded-lg text-center " type="name" placeholder="Your Name" required name="name" />
                    </div>
                    <div className="mb-[13px] lg:w-[350px] sm:w-[250px] h-[50px] bg-slate-200 rounded-lg">
                        <input className="w-full h-full rounded-lg text-center " type="email" placeholder="Your Email" required name="email" />
                    </div>
                    <div className="flex mb-[13px]">
                        <div className="w-[350px] bg-slate-200 rounded-lg" >
                            <input className="text-black rounded-lg text-center w-full     h-[50px]" placeholder="password" required
                                type={showPassword ? "text" : "password"} name="password" />
                        </div>
                        <div className="mt-3  ">
                            <span className="" onClick={() => { setShowPassword(!showPassword) }}>
                                {
                                    showPassword ? <FaEyeSlash className="w-10 h-5"></FaEyeSlash> : <FaEye className="w-10 h-5"></FaEye>
                                }
                            </span>
                        </div>
                    </div>
                    <div className="mb-[13px] lg:w-[350px] sm:w-[250px] h-[50px] bg-slate-200 rounded-lg">
                        <input className="w-full h-full text-center rounded-lg" type="text" placeholder="Enter Your Photo URL" required name="PhotoURL" />
                    </div >
                    <div className="mb-[13px]">
                        <select value={selectedRole} required onChange={handleRoleChange}
                            className="lg:w-[350px] sm:w-[250px] h-[50px] select select-bordered text-center pl-[160px]">
                            <option className="text-center  text-xl">User</option>
                            <option className="text-center  text-xl">Seller</option>
                            <option className="text-center  text-xl">Admin</option>
                        </select>
                    </div>
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
