import React from "react";
import * as SC from "./styles";
import { FiMenu } from "react-icons/fi";

const MenuButton = props => {
	return (
		<SC.CircleContainer onClick={() => props.setShowSideBar(prevState => !prevState)} isMobile={props.isMobile}>
			<FiMenu />
		</SC.CircleContainer>
	);
};

export default MenuButton;
