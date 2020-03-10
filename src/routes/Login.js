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

const handleSubmit = async data => {
  const response = await fetch(process.env.REACT_APP_SERVER + "/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  console.log(response);
};

const validationSchema = yup.object().shape({
  username: yup.string().required("El nombre de usuario es obligatorio"),
  password: yup.string().required("La contraseña es obligatoria")
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

const Login = () => {
  const [register, setRegister] = useState(false);

  if (register) {
    return <Redirect to="/signin" />;
  }

  return (
    <Formik
      validateOnChange={true}
      validationSchema={validationSchema}
      initialValues={{
        username: "",
        password: ""
      }}
      onSubmit={async (data, { setSubmitting }) => {
        setSubmitting(true);
        await handleSubmit(data);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <h1>Inicio de sesión</h1>
          <InputContainer>
            <TextField
              placeholder="Nombre de Usuario"
              name="username"
              type="input"
            />
            <TextField
              placeholder="Contraseña"
              name="password"
              type="password"
            />
          </InputContainer>
          {isSubmitting ? (
            <div style={{ margin: 30 }}>
              <Bounce />
            </div>
          ) : (
            <InputContainer>
              <Submit value="Iniciar Sesión" />
              <Button type="button" onClick={() => setRegister(true)}>
                Registrarme
              </Button>
            </InputContainer>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default Login;
