import styled from "styled-components";

const ErrorMessage = styled.p`
  color: ${props => props.theme.warning};
  font-size: 14px;
  text-align: center;
  margin: 0;
`;

export default ErrorMessage;
