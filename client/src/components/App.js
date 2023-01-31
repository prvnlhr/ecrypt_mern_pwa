import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import Home from "./appLayoutComponents/Home"
import SignUpPage from './authComponent/SignUpPage';
import appStyles from "./app.module.css";
import SignInPage from './authComponent/SignInPage';
import ProtectedRoute from "./authComponent/ProtectedRoute"
import ActivateAccount from './authComponent/ActivateAccount';
import { getAuthToken } from "../redux/features/auth/authSlice"
import { fecthCardsData } from "../redux/features/cards/cardsSlice"
import UnAuthenticatedRoutes from './authComponent/UnAuthenticatedRoutes';
import { getUserDetails } from "../redux/features/user/userSlice"
import ForgotPassword from './authComponent/ForgotPassword';
import ResetPassword from './authComponent/ResetPassword';

import RequireAuth from './authComponent/RequireAuth';
import SearchList from './searchSection/SearchList';

const App = () => {

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { token } = auth;

  const getToken = async () => {
    await dispatch(getAuthToken({}))
  };

  useEffect(() => {
    if (token != undefined) {
      dispatch(getUserDetails(token));
    }
  }, [token])

  useEffect(() => {
    getToken();
  }, [])

  const theme = "light";

  return (
    <div data-theme={theme} className={appStyles.app} >
      <Routes>

        {/* <Route path="/*" element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        } /> */}

        {/* <Route path="user/login" element={
          <RequireAuth>
            <SignInPage />
          </RequireAuth>
        } /> */}

        {/* <Route
          path='/*'
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        /> */}

        <Route
          path='/*'
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />

        {/* <Route path='/user/login' element={
          <SignInPage />
        } /> */}

        {/* <Route
          path='/user/login'
          element={
            <RequireAuth>
              <SignInPage />
            </RequireAuth>
          }
        /> */}


        <Route exact path='/user/login' element={
          <UnAuthenticatedRoutes>
            <SignInPage />
          </UnAuthenticatedRoutes>
        } />


        <Route exact path='/user/forgotPassword' element={
          <UnAuthenticatedRoutes>
            <ForgotPassword />
          </UnAuthenticatedRoutes>
        } />

        <Route exact path='/user/resetPassword/:reset_token' element={
          <UnAuthenticatedRoutes>
            <ResetPassword />
          </UnAuthenticatedRoutes>
        } />

        <Route exact path='/user/register' element={
          <UnAuthenticatedRoutes>
            <SignUpPage />
          </UnAuthenticatedRoutes>
        } />

        <Route path='/user/auth/activate/:activation_token' element={<ActivateAccount />} />

      </Routes>
    </div>
  )
}

export default App;