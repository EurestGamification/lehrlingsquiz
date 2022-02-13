import React from "react";
import "./App.scss";
import * as fromRouter from "./router/router";
import { Provider as StoreProvider } from "mobx-react";
import { quizStore } from "./stores/quize.store";

const stores = {
  quizStore
} as const;

const App: React.FC = () => {
  return (
    <StoreProvider {...stores}>
      <fromRouter.default />
    </StoreProvider>
  );
};

export default App;
