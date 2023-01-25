import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { Provider } from "react-redux";
import store from './redux/store/store';
import { BrowserRouter as Router } from "react-router-dom";
// import { axiosInterceptor, frcLogout } from "./redux/api/index"
import axiosInterceptor from "./redux/api/index"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  // </React.StrictMode>
);

axiosInterceptor(store);
// frcLogout(store);
