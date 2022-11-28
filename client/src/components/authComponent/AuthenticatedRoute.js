import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const AuthenticatedRoute = ({ children }) => {
  const auth = useSelector((state) => state.auth);

  const { isLogged } = auth;

  return isLogged === true ? (
    children
  ) : (
    isLogged === false && <Navigate to="/login" />
  );
};

export default AuthenticatedRoute;
