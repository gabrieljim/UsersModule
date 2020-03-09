import styled from "styled-components";

const Form = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${props => props.theme.surface};
  padding: 30px;
  width: 50%;
  border-radius: 5px;
  border: 1px solid ${props => props.theme.background};
  box-shadow: 0 0 10px #121212;

  @media (max-width: 768px) {
    width: 80%;
  }
`;

export default Form;
