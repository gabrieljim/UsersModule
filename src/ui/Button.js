import styled from "styled-components";

export const ContrastButton = styled.button`
  background-color: ${props => props.theme.contrast};
  border: none;
  padding: 10px;
  border-radius: 5px;
  font-family: "Roboto";
  color: ${props => props.theme.background};
  font-size: 15px;
  width: 100%;
  margin-top: 20px;
`;

export const Button = styled(ContrastButton)`
  background-color: ${props => props.theme.surface};
  color: ${props => props.theme.darkerText};
  box-shadow: 0 0 3px #111;
  width: 100%;
  transition: all 0.2s;

  &:hover,
  &:focus {
    cursor: pointer;
    outline: none;
    background-color: ${props => props.theme.contrast};
    color: ${props => props.theme.surface};
  }
`;
