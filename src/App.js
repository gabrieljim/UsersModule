import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "constants/GlobalStyle";

import Theme from "constants/Theme";

import { Provider } from "react-redux";
import store from "store/store";

import MainRouter from "screens/MainRouter";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ThemeProvider theme={Theme}>
          <GlobalStyle />
          <Router>
            <MainRouter />
          </Router>
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
