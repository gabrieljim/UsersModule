import styled from "styled-components";

export const Button = styled.button`
  background-color: ${props => props.theme.surface};
  border: none;
  padding: 10px;
  border-radius: 5px;
  font-family: "Roboto";
  box-shadow: 0 0 3px #111;
  color: ${props => props.theme.darkerText};
  font-size: 15px;
  width: 100%;
  margin-top: 20px;
  transition: all 0.2s;

  &:hover {
    cursor: pointer;
    outline: none;
    background-color: ${props => props.theme.contrast};
    color: ${props => props.theme.surface};
  }
`;

export const Submit = styled.input.attrs({ type: "submit" })`
  background-color: ${props => props.theme.surface};
  border: none;
  padding: 10px;
  border-radius: 5px;
  font-family: "Roboto";
  box-shadow: 0 0 3px #111;
  color: ${props => props.theme.darkerText};
  font-size: 15px;
  width: 100%;
  margin-top: 20px;
  transition: all 0.2s;

  &:hover {
    cursor: pointer;
    outline: none;
    background-color: ${props => props.theme.contrast};
    color: ${props => props.theme.surface};
  }
`;
