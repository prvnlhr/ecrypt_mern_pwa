import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const auth = useSelector((state) => state.auth);

  const { isLogged } = auth;

  return isLogged === true ? children :
    isLogged === false && <Navigate to="/user/login" />
};

export default ProtectedRoute;
