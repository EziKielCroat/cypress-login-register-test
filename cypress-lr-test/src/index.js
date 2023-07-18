import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import NotAuthorized from './Components/NotAuthorized';
import Login from './Components/Login';
import Register from './Components/Register';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const CheckIfLoggedIn = ({children}) => {
  const loggedIn = !!localStorage.getItem("logIn");

  if(loggedIn) {
    return {children}
  } else {
    return <NotAuthorized />
  }
}

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <CheckIfLoggedIn><App></App></CheckIfLoggedIn>
    ), 
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
