import React from "react";
import "./App.scss";
import * as fromRouter from "./router/router";
import { Provider as StoreProvider } from "mobx-react";
import { quizStore } from "./stores/quize.store";

const stores = {
  quizStore,
} as const;

const App: React.FC = () => {
  return (
    <div className="App">
      <StoreProvider {...stores}>
        <fromRouter.default />
      </StoreProvider>
    </div>
  );
};

export default App;
