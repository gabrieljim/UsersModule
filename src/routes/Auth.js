import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";

import InputContainer from "../ui/InputContainer";
import Form from "../ui/Form";
import { Button, Submit } from "../ui/Buttons";
import ErrorMessage from "../ui/ErrorMessage";

import { Bounce } from "react-activity";
import "react-activity/dist/react-activity.css";

import * as user from "../services/user";
import translateErrors from "../utils/translateErrors";

import TextField from "../components/TextField";

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
  const [login, setLogin] = useState(false);
  const [errors, setErrors] = useState([]);

  if (login) {
    return <Redirect to="/login" />;
  }

  const handleSubmit = async data => {
    const responseData = await user.createUser(data);
    if (responseData.errors) {
      const translatedErrors = translateErrors(responseData.errors);
      setErrors(translatedErrors);
      setTimeout(() => {
        setErrors([]);
      }, 3000);
    }
  };

  return (
    <Formik
      validateOnChange={true}
      validationSchema={validationSchema}
      initialValues={{
        username: "",
        email: "",
        password: "",
        passwordConfirmation: ""
      }}
      onSubmit={async (data, { setSubmitting }) => {
        setSubmitting(true);
        await handleSubmit(data);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <h1>Registro</h1>
          <InputContainer>
            <TextField
              placeholder="Nombre de Usuario"
              name="username"
              type="input"
            />
            <TextField placeholder="Correo" name="email" type="email" />
            <TextField
              placeholder="Contraseña"
              name="password"
              type="password"
            />
            <TextField
              placeholder="Confirmar contraseña"
              name="passwordConfirmation"
              type="password"
            />
          </InputContainer>
          {isSubmitting ? (
            <div style={{ margin: 30 }}>
              <Bounce />
            </div>
          ) : (
            <InputContainer>
              {errors &&
                errors.map(error => (
                  <ErrorMessage key={error.message}>
                    {error.message}
                  </ErrorMessage>
                ))}
              <Submit value="Registrarme" />
              <Button type="button" onClick={() => setLogin(true)}>
                Iniciar Sesión
              </Button>
            </InputContainer>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default Auth;
