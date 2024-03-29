import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "./authActions";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";
import { base } from "../../api";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookies = new Cookies();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login(formData));
      alert("Login Successful");
      const response = await axios.get(`${base}/user`);
      console.log(response);
      navigate("/users", { state: response.data });
    } catch (error) {
      console.error(error);
      alert("Login failed. Please check your credentials.");
    }
  };
  if (cookies.get("token")) {
    return <Navigate to="/users"></Navigate>;
  }

  return (
    <div className=" h-[100vh] w-full bg-slate-400 overflow-hidden">
      <div className="max-w-md text-white mx-auto mt-8 p-6 bg-gray-600 rounded-lg  shadow-xl shadow-slate-600 ">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="relative">
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              className="w-full px-3 py-2 text-cyan-700 border rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="password">
              Password:
            </label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              className="w-full px-3 py-2 border text-cyan-700 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:shadow-outline-indigo active:bg-indigo-800"
          >
            Login
          </button>
          <NavLink to="/signup" className="absolute right-0 bottom-0">
            <button className="bg-green-800  hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full">
              SignUp Here
            </button>
          </NavLink>
        </form>
      </div>
    </div>
  );
};

export default Login;
