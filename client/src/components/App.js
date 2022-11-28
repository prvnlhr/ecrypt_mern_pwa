import React from 'react';


import Home from "./appLayoutComponents/Home"
import appStyles from "./app.module.css";



const App = () => {
  return (
    <div className={appStyles.app} >
      <Home />
    </div>
  )
}

export default App;