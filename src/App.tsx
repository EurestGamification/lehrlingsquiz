import React from "react";
import logo from "./assets/img/logo.png";
import "./App.scss";
import Router from "./router/router";
// import { Test } from "@lehrlingsquiz/components";

const App = () => {
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      {/* <Test /> */}
      <Router />
    </div>
  );
};

export default App;
