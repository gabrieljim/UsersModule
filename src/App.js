import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import dotenv from "dotenv";
import { createGlobalStyle, ThemeProvider } from "styled-components";

import Auth from "./routes/Auth";
import Login from "./routes/Login";
import Dashboard from "./routes/Dashboard";

import Theme from "./constants/Theme";

const isLoggedIn = true;
dotenv.config();

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return isLoggedIn ? (
    <Router {...rest}>
      <Component />
    </Router>
  ) : (
    <Redirect to="/signin" />
  );
};
const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.theme.background};
  }
  .App {
    display:flex;
    justify-content: center;
    align-items: center;
    font-family: Roboto, sans-serif;
    color: ${props => props.theme.text}
  }
`;

function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
