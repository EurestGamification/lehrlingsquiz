import React from "react";
import logo from "./assets/img/logo.png";
import "./App.scss";
import * as fromRouter from "./router/router";
import { Provider as StoreProvider } from "mobx-react";
import { quizStore } from "./stores/quize.store";
// import { Test } from "@lehrlingsquiz/components";

const stores = {
  quizStore
};

const App: React.FC = () => {
  return (
    <StoreProvider {...stores}>
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        {/* <Test /> */}
        <fromRouter.default />
      </div>
    </StoreProvider>
  );
};

export default App;
