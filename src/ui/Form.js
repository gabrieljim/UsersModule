import styled from "styled-components";
import { Form } from "formik";

const CustomForm = styled(Form)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${props => props.theme.surface};
  padding: 30px;
  width: 50%;
  border-radius: 5px;
  margin: 20px auto;
  border: 1px solid ${props => props.theme.background};
  box-shadow: 0 0 10px #121212;

  @media (max-width: 1000px) {
    width: 80%;
  }
`;

export default CustomForm;
