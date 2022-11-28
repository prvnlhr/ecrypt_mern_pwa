import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const UnAuthenticatedRoutes = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  const { isLogged } = auth;
  return isLogged === false ? (
    children
  ) : (
    isLogged === true && <Navigate to="/home" />
  )
};

export default UnAuthenticatedRoutes;
