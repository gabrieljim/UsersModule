import React, { useState } from "react";
import FormikForm from "components/FormikForm";
import InputContainer from "ui/InputContainer";
import TextField from "components/TextField";
import * as yup from "yup";
import * as user from "services/user";
import styled from "styled-components";
import { Redirect } from "react-router-dom";

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required("El nombre de usuario es obligatorio")
    .min(5, "El nombre de usuario debe ser mayor a 4 caracteres")
    .max(20, "El nombre de usuario no puede ser mayor a 20 caracteres"),
  email: yup
    .string()
    .required("El correo es obligatorio")
    .email("Ingrese un correo válido"),
  password: yup
    .string()
    .required("La contraseña es obligatoria")
    .min(8, "La contraseña debe tener al menos 8 carácteres"),
  passwordConfirmation: yup
    .string()
    .required("Confirme la contraseña")
    .oneOf([yup.ref("password")], "Las contraseñas no coinciden")
});

const NewUser = () => {
  const [redirectToUsers, setRedirectToUsers] = useState(false);
	const [error, setError] = useState();

  const handleSubmit = async (data, setSubmitting) => {
    const responseData = await user.createUser(data);
    setSubmitting(false);
    if (responseData.error) {
      setError(responseData.error);
    } else {
      setRedirectToUsers(true);
    }
  };

  if (redirectToUsers) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Form
      title="Crear Usuario"
      initialValues={{
        username: "",
        email: "",
        password: "",
        passwordConfirmation: ""
      }}
      handleSubmit={handleSubmit}
      validationSchema={validationSchema}
      error={error}
      submitName="Crear"
    >
      <InputContainer>
        <TextField
          placeholder="Nombre de Usuario"
          name="username"
          type="input"
        />
        <TextField placeholder="Correo" name="email" type="email" />
        <TextField placeholder="Contraseña" name="password" type="password" />
        <TextField
          placeholder="Confirmar contraseña"
          name="passwordConfirmation"
          type="password"
        />
      </InputContainer>
    </Form>
  );
};

const Form = styled(FormikForm)`
	width: 70%;

	@media (max-width: 768px) {
		width: 100%;
	}
`

export default NewUser;
