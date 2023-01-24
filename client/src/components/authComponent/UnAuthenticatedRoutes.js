import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UnAuthenticatedRoutes = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  const { isLogged } = auth;
  return isLogged === false ? children :
    isLogged === true && <Navigate to="/" />
};

export default UnAuthenticatedRoutes;
