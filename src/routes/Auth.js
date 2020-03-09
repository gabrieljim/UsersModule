import React from "react";
import { Formik, Field } from "formik";

import Input from "../ui/Input";
import InputContainer from "../ui/InputContainer";
import Form from "../ui/Form";
import { Button, Submit } from "../ui/Button";

const handleSubmit = async data => {
  console.log(
    await fetch("http://localhost:3001", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
  );
};

const Auth = () => {
  return (
    <Formik
      initialValues={{ username: "", email: "", password: "" }}
      onSubmit={data => handleSubmit(data)}
    >
      {() => (
        <Form>
          <h1>Registro</h1>
          <InputContainer>
            <Field
              placeholder="Nombre de usuario"
              name="username"
              type="input"
              as={Input}
            />
            <Field placeholder="Correo" name="email" type="email" as={Input} />
            <Field
              placeholder="Contraseña"
              name="password"
              type="password"
              as={Input}
            />
          </InputContainer>
          <InputContainer>
            <Submit value="Registrarme" />
            <Button>Iniciar Sesión</Button>
          </InputContainer>
        </Form>
      )}
    </Formik>
  );
};

export default Auth;
