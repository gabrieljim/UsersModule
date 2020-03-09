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

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    box-shadow: 0 0 0 30px ${props => props.theme.surface} inset !important;
  }

  :-webkit-autofill {
    -webkit-text-fill-color: ${props => props.theme.text} !important;
  }

  &::placeholder {
    color: ${props => props.theme.placeholder};
  }

  &:focus {
    transform: scale(1.05);
    border-bottom-color: ${props => props.theme.contrast};
  }
`;

export default Input;
