import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import InputContainer from "../ui/InputContainer";
import Form from "../ui/Form";
import { Button, Submit } from "../ui/Buttons";

import * as user from "../services/user";

import { Bounce } from "react-activity";
import "react-activity/dist/react-activity.css";

import { Redirect } from "react-router-dom";

import TextField from "../components/TextField";

const handleSubmit = async data => {
  const responseData = await user.logUserIn(data);
  console.log(responseData);
};

const validationSchema = yup.object().shape({
  username: yup.string().required("El nombre de usuario es obligatorio"),
  password: yup.string().required("La contraseña es obligatoria")
});

const Login = () => {
  const [register, setRegister] = useState(false);

  const authorized = useSelector(state => state.auth.isLogged);

  if (register) {
    return <Redirect to="/signin" />;
  }

  if (authorized) {
    return <Redirect to="/" />;
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
