import React from "react";
import "./App.scss";
import * as fromRouter from "./router/router";
import { Provider as StoreProvider } from "mobx-react";
import { quizStore } from "./stores/quize.store";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const stores = {
  quizStore,
} as const;

const muiTheme = createTheme({
  palette: {
    primary: {
      main: "#00a13a",
      "100": "rgba(0, 161, 58, 0.25)",
    },
  },
});

const App: React.FC = () => {
  return (
    <div className="App">
      <StoreProvider {...stores}>
        <ThemeProvider theme={muiTheme}>
          <fromRouter.default />
        </ThemeProvider>
      </StoreProvider>
    </div>
  );
};

export default App;
