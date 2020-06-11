import { Link } from "react-router-dom";
import styled from "styled-components";

export const DarkLink = styled(Link)`
  color: ${props => props.theme.veryDarkText};

  &:hover {
    text-decoration: underline;
    color: ${props => props.theme.contrast};
  }
`;

export const ThemedLink = styled(Link)`
  color: ${props => props.theme.contrast};

  &:hover {
    text-decoration: underline;
  }
`;

export default ThemedLink;
