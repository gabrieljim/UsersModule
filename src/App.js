import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import dotenv from "dotenv";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./constants/GlobalStyle";

import Auth from "./routes/Auth";
import Login from "./routes/Login";
import Dashboard from "./routes/Dashboard";

import Theme from "./constants/Theme";

import { Provider, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./redux/authSlice";

dotenv.config();

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isLogged = useSelector(state => state.auth.isLogged);
  return isLogged ? (
    <Router {...rest}>
      <Component />
    </Router>
  ) : (
    <Redirect to="/signin" />
  );
};

const store = configureStore({
  reducer: {
    auth: authReducer
  }
});

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ThemeProvider theme={Theme}>
          <GlobalStyle />
          <Router>
            <Switch>
              <ProtectedRoute exact path="/" component={Dashboard} />
              <Route path="/signin">
                <Auth />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
            </Switch>
          </Router>
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
