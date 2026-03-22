import React from 'react'
const User = () => {
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;

    const name = user?.name;

    return (
        <div>
            <div><h1 className='text-center text-sky-500 text-4xl font-bold ml-32 pt-10 mb-10'>HI,WELCOME {user?.name ? user.name : 'BACK'} </h1></div>
        </div>
    );
};

export default User;