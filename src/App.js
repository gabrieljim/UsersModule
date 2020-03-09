import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";

import Auth from "./routes/Auth";

import { createGlobalStyle, ThemeProvider } from "styled-components";

import Theme from "./constants/Theme";

import Dashboard from "./routes/Dashboard";

const isLoggedIn = true;

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return isLoggedIn ? (
    <Router>
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
            <Route path="/signin">
              <Auth />
            </Route>
            <ProtectedRoute path="/" component={Dashboard} />
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
