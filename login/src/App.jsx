import React from "react";
import ReactDOM from "react-dom";
import { Login } from "./components/Login";

import "./index.css";

const App = () => (
  <div className="container">
    <Login />
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
