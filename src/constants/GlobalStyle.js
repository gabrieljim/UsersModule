import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.theme.background};
  }
  .App {
    display:flex;
    justify-content: center;
    align-items: center;
    font-family: Roboto, sans-serif;
    color: ${props => props.theme.text};
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  a {
    text-decoration: none;
    color: ${props => props.theme.text}
  }
  h1 {
    margin-bottom: 15px;
  }
`;

export default GlobalStyle;
