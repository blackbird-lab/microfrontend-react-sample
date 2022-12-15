import React from "react";
import ReactDOM from "react-dom";
import { Login } from 'login/Login';
import { Dashboard } from 'dashboard/Dashboard';
import {
  createBrowserRouter, Link,
  RouterProvider,
} from "react-router-dom";

import "./index.css";
import {Button} from "@mui/material";

const router = createBrowserRouter([
  {
    path: "/",
    element:
      <div>
        <h1 style={{display: 'flex', justifyContent: 'center', margin: 0, padding: 10, color: 'white', backgroundColor: 'black'}}>Container App</h1>
        <div style={{display: 'flex', flexDirection: 'column',  alignItems: 'center', padding: 30}}>
          <Link to="login" style={{marginBottom: 10}}><Button variant='contained'>Login (Micro App)</Button></Link>
          <Link to="dashboard"><Button variant='contained'>dashboard (Micro App)</Button></Link>
        </div>
      </div>
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);


const App = () => (
  <div>
    <RouterProvider router={router} />
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
