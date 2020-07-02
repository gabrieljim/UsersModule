import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaUserAlt } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { Route, Link, Switch, useLocation } from "react-router-dom";
import "constants/Animations.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useDispatch } from "react-redux";
import { logout } from "store/authSlice";

import Users from "./screens/Users";
import NewUser from "./screens/NewUser";
import MenuButton from "./components/MenuButton";

const Dashboard = () => {
	const [isMobile, setIsMobile] = useState(true);
	const [showSideBar, setShowSideBar] = useState(false);
	const dispatch = useDispatch();

	const handleResize = () => {
		setIsMobile(window.innerWidth < 800 ? true : false)
	};

	useEffect(() => {
		handleResize();
		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const handleLogout = () => {
		dispatch(logout());
	};

	const location = useLocation();

	return (
		<Container>
			<MenuButton isMobile={isMobile} setShowSideBar={setShowSideBar} />
			<Sidebar showSideBar={showSideBar} isMobile={isMobile}>
				<List>
					<li>
						<ListItem to="/dashboard">
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
								<Users />
							</Route>
							<Route path="/dashboard/newUser">
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
	transform: translateX(${props => (props.isMobile ? "-100%" : "0%")});
	transition: all 0.2s;

	@media (max-width: 800px) {
		height: 100vh;
		z-index: 1;
		transform: translateX(${props => props.showSideBar ? "0%" : "-100%"});
		flex-basis: 0%;
		position: absolute;
	}
`;

const Content = styled.div`
	flex-basis: 82%;
	justify-content: center;
	padding: 20px;
	text-align: center;
	background-color: ${props => props.theme.surface};

	@media (max-width: 800px) {
		flex-basis: 100%;
	}
`;

export default Dashboard;
