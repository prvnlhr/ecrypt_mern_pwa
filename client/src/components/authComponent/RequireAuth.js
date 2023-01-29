import React, { useEffect } from "react";
import { Navigate, Redirect, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";


const RequireAuth = ({ children }) => {

    const auth = useSelector((state) => state.auth);

    const { isLogged } = auth;

    return isLogged === true
        ? children
        : isLogged === false && <Navigate to="/user/login" />;
}

export default RequireAuth