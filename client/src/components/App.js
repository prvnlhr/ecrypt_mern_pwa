import React from 'react';
import Home from "./appLayoutComponents/Home"
import SignUpPage from './authComponent/SignUpPage';
import appStyles from "./app.module.css";

const App = () => {
  return (
    <div className={appStyles.app} >
      <SignUpPage />
      {/* <Home /> */}
    </div>
  )
}

export default App;