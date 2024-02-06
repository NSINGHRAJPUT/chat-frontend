import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./features/auth/Signup";
import Login from "./features/auth/Login";
import Protected from "./component/Protected";
import Home from "./pages/Home/Home";
import Users from "./pages/Users/Users";
import "./App.css";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/signup", element: <Signup /> },
  { path: "/login", element: <Login /> },
  {
    path: "/users",
    element: (
      <Protected>
        <Users />
      </Protected>
    ),
  },
]);

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
