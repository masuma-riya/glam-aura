import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home/Home";
import SignUp from "./Pages/SignUp/SignUp";
import Login from "./Pages/Login/Login";
import UpdateUser from "./Pages/Login/UpdateUser/UpdateUser";
import PrivateRoute from "./Providers/PrivateRoute";
import AuthProviders from "./Providers/AuthProviders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/sign-up",
    element: <SignUp></SignUp>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/update-user",
    element: (
      <PrivateRoute>
        <UpdateUser></UpdateUser>
      </PrivateRoute>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProviders>
      {" "}
      <RouterProvider router={router} />
    </AuthProviders>
  </StrictMode>
);
