import React from "react";
import { NavLink, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

function Home() {
  const cookies = new Cookies();

  if (cookies.get("token")) {
    return <Navigate to="/users"></Navigate>;
  }
  return (
    <div className="h-[100vh] w-full flex flex-col text-white justify-between items-center bg-gradient-to-b from-[#10162843] to-[#2c872d]">
      <div className="flex h-[50%] text-center justify-center">
        <h1>Welcome to Chat App</h1>
      </div>
      <div className="flex flex-row gap-2 float-start justify-start h-[50%]">
        <NavLink to="/login">
          <button className="bg-green-800 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full">
            Login Here
          </button>
        </NavLink>
        <NavLink to="/signup">
          <button className="bg-green-800 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full">
            SignUp Here
          </button>
        </NavLink>
      </div>
    </div>
  );
}

export default Home;
