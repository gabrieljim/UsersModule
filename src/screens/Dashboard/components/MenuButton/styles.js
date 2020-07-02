import styled from "styled-components";

export const CircleContainer = styled.div`
	display: ${props => props.isMobile ? "flex" : "none"};
	position: absolute;
	top: 20px;
	right: 20px;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	background-color: ${props => props.theme.background};
	padding: 14px;
	color: ${props => props.theme.darkerText};
	z-index: 1;
	box-shadow: 0px 0px 2px ${props => props.theme.darkerText};
	font-size: 33px;
	transition: all 0.2s;

	&:hover {
		cursor: pointer;
		box-shadow: 0px 0px 4px ${props => props.theme.darkerText};
	}
`
