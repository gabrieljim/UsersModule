import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation
} from "react-router-dom";

import Auth from "./Auth/Auth";
import Login from "./Auth/Login";
import RecoverPassword from "./Auth/RequestNewPassword";
import UpdatePassword from "./Auth/UpdatePassword";
import PasswordRequested from "./Auth/PasswordRequested";
import Dashboard from "./Dashboard/Dashboard";

import { TransitionGroup, CSSTransition } from "react-transition-group";
import "../constants/Animations.css";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isLogged = useSelector(state => state.auth.isLogged);
  return isLogged ? (
    <Router {...rest}>
      <Component />
    </Router>
  ) : (
    <Redirect to="/login" />
  );
};

const MainRouter = () => {
  const location = useLocation();
  useEffect(() => {
    document.title = "Módulo de Usuarios";
  }, []);
  return (
    <TransitionGroup style={TransitionStyles}>
      <CSSTransition key={location.key} classNames="routes" timeout={500}>
        <Switch location={location}>
          <Route exact path="/">
            <Redirect to="/dashboard" />
          </Route>
          <ProtectedRoute path="/dashboard" component={Dashboard} />
          <Route path="/signin">
            <Auth />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/recoverPassword">
            <RecoverPassword />
          </Route>
          <Route path="/requested">
            <PasswordRequested />
          </Route>
          <Route path="/:id/:token">
            <UpdatePassword />
          </Route>
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
};

const TransitionStyles = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

export default MainRouter;
