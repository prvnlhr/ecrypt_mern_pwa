import React, { useEffect, useState } from "react";
import { Navigate, Redirect, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";


const RequireAuth = ({ children, currPath }) => {

    const [userLogged, setUserLogged] = useState(false);

    useEffect(() => {
        const item = JSON.parse(localStorage.getItem('isLogged'));
        setUserLogged(item);
    }, []);


    const auth = useSelector((state) => state.auth);

    const { isLogged } = auth;

    return isLogged === true
        ? children
        : isLogged === false && <Navigate to="/user/login" />;
}

export default RequireAuth