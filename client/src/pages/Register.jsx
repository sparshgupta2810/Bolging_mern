import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Register = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const changeInputHandler = (e) => {
    setUserData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const registerUser = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/register`, userData);
      const newUser = response.data;
      console.log(newUser);
      if (!newUser) {
        setError("User couldn't register, please try again.");
      } else {
        navigate('/login');
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div>
      <section className="bg-gray-100 min-h-screen flex box-border justify-center items-center">
        <div className="bg-[#dfa674] rounded-2xl flex max-w-3xl p-5 items-center">
          <div className="md:w-1/2 px-8">
            <h2 className="font-bold text-3xl text-[#002D74]">Register</h2>
            <p className="text-sm mt-4 text-[#002D74]">Create your account</p>
            
            {error && <p className="text-red-500">{error}</p>}
            
            <form className="flex flex-col gap-4" onSubmit={registerUser}>
              <input
                className="p-2 mt-8 rounded-xl border"
                type="text"
                name="name"
                placeholder="User name"
                value={userData.name}
                onChange={changeInputHandler}
                required
              />
              <div className="relative">
                <input
                  className="p-2 rounded-xl border w-full"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={userData.email}
                  onChange={changeInputHandler}
                  required
                />
              </div>
              <div className="relative">
                <input
                  className="p-2 rounded-xl border w-full"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={userData.password}
                  onChange={changeInputHandler}
                  required
                />
              </div>
              <div className="relative">
                <input
                  className="p-2 rounded-xl border w-full"
                  type="password"
                  name="password2"
                  placeholder="Confirm Password"
                  value={userData.password2}
                  onChange={changeInputHandler}
                  required
                />
              </div>
              <button
                className="bg-[#002D74] text-white py-2 rounded-xl hover:scale-105 duration-300 hover:bg-[#206ab1] font-medium"
                type="submit"
              >
                Register
              </button>
            </form>

            <div className="mt-10 text-sm border-b border-gray-500 py-5">
              Forgot password?
            </div>

            <div className="mt-4 text-sm flex justify-between items-center">
              <p>If you already have an account...</p>
              <button className="hover:border register text-white bg-[#002D74] hover:border-gray-400 rounded-xl py-2 px-5 hover:scale-110 hover:bg-[#002c7424] font-semibold duration-300">
                <Link to="/login">Login</Link>
              </button>
            </div>
          </div>
          <div className="md:block hidden w-1/2">
            {/* <img
              className="rounded-2xl max-h-[1600px]"
              src={`${process.env.REACT_APP_ASSETS_URL}/path/to/your/image.jpg`}
              alt="login form image"
            /> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;


