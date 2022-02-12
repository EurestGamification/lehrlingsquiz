import React from "react";
import logo from "./assets/img/logo.png";
import "./App.scss";
import { Test } from "./components";

const App = () => {
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <Test />
    </div>
  );
};

export default App;
