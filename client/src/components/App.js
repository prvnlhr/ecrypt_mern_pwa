import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
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
const App = () => {

  const getToken = async () => {
    await dispatch(getAuthToken({}))
  };
  const dispatch = useDispatch();
  // const auth = useSelector((state) => state.auth);
  // const { token } = auth;

  useEffect(() => {
    console.log("sss")
    getToken();
  }, [])

  return (
    <div className={appStyles.app} >
      <Routes>
        <Route
          path='/*'
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route exact path='/user/login' element={
          <UnAuthenticatedRoutes>
            <SignInPage />
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