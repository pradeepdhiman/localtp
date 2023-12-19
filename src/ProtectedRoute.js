import React from "react";
import { useNavigate, Outlet } from 'react-router-dom';
import SoftAlert from "./components/SoftAlert";
import { authUser } from "layouts/authentication/functions/query";

export const ProtectedRoute = () => {
  const navigate = useNavigate();
  let user = authUser();

  if (!user || !user.token || user.token === "") {
    navigate("/authentication/sign-in");
    return null; 
  }

  return <Outlet />;
};
