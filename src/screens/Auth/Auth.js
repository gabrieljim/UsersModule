import React, { useState } from "react";
import FormikForm from "components/FormikForm";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "store/authSlice";

import InputContainer from "ui/InputContainer";
import { ThemedLink } from "ui/Links";
import SmallText from "ui/SmallText";

import * as user from "services/user";

import TextField from "components/TextField";

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

const Auth = () => {
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const authorized = useSelector(state => state.auth.isLogged);

  if (authorized) {
    return <Redirect to="/" />;
  }

  const handleSubmit = async (data, setSubmitting) => {
    const responseData = await user.register(data);
    setSubmitting(false);
    if (responseData.error) {
      setError(responseData.error);
    } else {
      dispatch(
        authenticate({ user: responseData.user, token: responseData.token })
      );
    }
  };

  const extraButtons = () => (
    <>
      <SmallText>
        ¿Ya tienes una cuenta?{" "}
        <ThemedLink to="/login">Inicia sesión</ThemedLink>
      </SmallText>
    </>
  );

  return (
    <FormikForm
      title="Registrarse"
      initialValues={{
        username: "",
        email: "",
        password: "",
        passwordConfirmation: ""
      }}
      submitName="Registrarme"
      handleSubmit={handleSubmit}
      validationSchema={validationSchema}
      extraButtons={extraButtons}
      error={error}
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
    </FormikForm>
  );
};

export default Auth;
