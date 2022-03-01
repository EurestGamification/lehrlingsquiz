import React from "react";
import "./App.scss";
import * as fromRouter from "./router/router";
import { Provider as StoreProvider } from "mobx-react";
import { quizStore } from "./stores/quize.store";
import {
  createTheme,
  Theme,
  ThemeProvider
} from "@mui/material/styles";
import { colors, eurestAscii } from "@lehrlingsquiz/theme";
import { ReactComment } from "@lehrlingsquiz/components";

const stores = {
  quizStore
} as const;

const muiTheme: Theme = createTheme({
  palette: {
    primary: {
      main: `${colors.green_100}`,
      "100": colors.green_25
    }
  }
});

const App: React.FC = () => {
  return (
    <div className="App">
      <ReactComment text={eurestAscii} />
      <StoreProvider {...stores}>
        <ThemeProvider theme={muiTheme}>
          <fromRouter.default />
        </ThemeProvider>
      </StoreProvider>
    </div>
  );
};

export default App;
