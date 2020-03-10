import React, { useState } from "react";
import { Formik, Field, useField } from "formik";
import * as yup from "yup";

import Input from "../ui/Input";
import InputContainer from "../ui/InputContainer";
import Form from "../ui/Form";
import { Button, Submit } from "../ui/Buttons";
import ErrorMessage from "../ui/ErrorMessage";
import Theme from "../constants/Theme";

import { Bounce } from "react-activity";
import "react-activity/dist/react-activity.css";

import { Redirect } from "react-router-dom";

const translateErrors = () => {};

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

const TextField = props => {
  const meta = useField(props)[1];
  const error = meta.error && meta.touched;
  return (
    <>
      <Field
        style={{ borderBottomColor: error ? Theme.warning : "" }}
        {...props}
        as={Input}
      />
      {error ? <ErrorMessage>{meta.error}</ErrorMessage> : null}
    </>
  );
};

const Auth = () => {
  const [login, setLogin] = useState(false);
  const [errors, setErrors] = useState([]);

  if (login) {
    return <Redirect to="/login" />;
  }

  const translateErrors = errors => {
    const translatedErrors = [];
    errors.map(error => {
      switch (error.message) {
        case "username must be unique":
          translatedErrors.push({ message: "Nombre de usuario existente" });
          break;
        case "email must be unique":
          translatedErrors.push({ message: "Correo ya registrado" });
          break;
      }
    });
    return translatedErrors;
  };

  const handleSubmit = async data => {
    const response = await fetch(
      process.env.REACT_APP_SERVER + "/users/newUser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
    );
    const responseData = await response.json();
    if (responseData.errors) {
      setErrors(translateErrors(responseData.errors));
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
