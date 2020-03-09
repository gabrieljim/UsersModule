import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  background-color: ${props => props.theme.surface};
  box-sizing: border-box;
  border: none;
  border-bottom: 2px solid ${props => props.theme.background};
  outline: none;
  color: ${props => props.theme.darkerText};
  font-size: 15px;
  transition: all 0.2s;

  &::placeholder {
    color: ${props => props.theme.placeholder};
  }

  &:focus {
    transform: scale(1.05);
    border-bottom-color: ${props => props.theme.contrast};
  }
`;

export default Input;
