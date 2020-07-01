import React from "react";

import styled from "styled-components";
import { FaUserAlt, FaHome } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { Route, Link, Switch, useLocation } from "react-router-dom";
import "constants/Animations.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useDispatch } from "react-redux";
import { logout } from "store/authSlice";

import Home from "./screens/Home";
import Users from "./screens/Users";
import NewUser from "./screens/NewUser";

const Dashboard = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const location = useLocation();

  return (
    <Container>
      <Sidebar>
        <List>
          <li>
            <ListItem to="/dashboard">
              <FaHome />
              <Name>Home</Name>
            </ListItem>
          </li>
          <li>
            <ListItem to="/dashboard/users">
              <FaUserAlt />
              <Name>Usuarios</Name>
            </ListItem>
          </li>
          <li>
            <ListItem to="/" onClick={handleLogout}>
              <IoIosLogOut />
              <Name>Cerrar Sesión</Name>
            </ListItem>
          </li>
        </List>
      </Sidebar>
      <Content>
        <TransitionGroup>
          <CSSTransition key={location.key} classNames="content" timeout={200}>
            <Switch location={location}>
              <Route exact path="/dashboard">
                <Home />
              </Route>
              <Route exact path="/dashboard/users">
                <Users />
              </Route>
              <Route path="/dashboard/users/newUser">
                <NewUser />
              </Route>
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </Content>
    </Container>
  );
};

const Name = styled.span`
  margin-left: 20px;
`;

const List = styled.ul`
  padding: 20px auto;
  list-style-type: none;
  font-size: 20px;
`;

const ListItem = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  text-align: left;
  padding: 20px;
  transition: all 0.1s;

  &:hover {
    background-color: ${props => props.theme.surface};
  }
`;

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
`;

const Sidebar = styled.div`
  flex-basis: 18%;
  background-color: ${props => props.theme.background};
  text-align: center;
`;

const Content = styled.div`
  flex-basis: 82%;
  justify-content: center;
  padding: 20px;
  text-align: center;
  background-color: ${props => props.theme.surface};
`;

export default Dashboard;
