import React, { useState } from "react";
import FormikForm from "components/FormikForm";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "store/authSlice";

import InputContainer from "ui/InputContainer";
import { ThemedLink, DarkLink } from "ui/Links";
import SmallText from "ui/SmallText";

import * as user from "services/user";

import { Redirect } from "react-router-dom";

import TextField from "components/TextField";

const validationSchema = yup.object().shape({
  username: yup.string().required("El nombre de usuario es obligatorio"),
  password: yup.string().required("La contraseña es obligatoria")
});

const Login = () => {
  const [error, setError] = useState();
  const serverError = useSelector(state => state.auth.error);

  const dispatch = useDispatch();

  const handleSubmit = async (data, setSubmitting) => {
    const responseData = await user.logUserIn(data);
    setSubmitting(false);
    if (responseData.error) {
      setError(responseData.error);
    } else {
      dispatch(
        authenticate({ user: responseData.user, token: responseData.token })
      );
    }
  };

  const authorized = useSelector(state => state.auth.isLogged);

  if (authorized) {
    return <Redirect to="/" />;
  }

  const extraButtons = () => (
    <>
      <SmallText>
        No tienes cuenta? <ThemedLink to="/signin">Regístrate</ThemedLink>
      </SmallText>
      <SmallText>
        <DarkLink to="/recoverPassword">¿Olvidaste tu clave?</DarkLink>
      </SmallText>
    </>
  );

  return (
    <FormikForm
      title="Iniciar sesión"
      initialValues={{
        username: "",
        password: ""
      }}
      validationSchema={validationSchema}
      extraButtons={extraButtons}
      error={error}
      handleSubmit={handleSubmit}
      serverError={serverError}
      submitName="Iniciar sesión"
    >
      <InputContainer>
        <TextField
          placeholder="Nombre de Usuario"
          name="username"
          type="input"
        />
        <TextField placeholder="Contraseña" name="password" type="password" />
      </InputContainer>
    </FormikForm>
  );
};

export default Login;
