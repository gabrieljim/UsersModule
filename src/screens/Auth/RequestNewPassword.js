import React, { useState } from "react";
import * as yup from "yup";
import { Redirect } from "react-router-dom";

import * as user from "../services/user";

import FormikForm from "../components/FormikForm";
import TextField from "../components/TextField";
import InputContainer from "../ui/InputContainer";
import { DarkLink } from "../ui/Links";
import SmallText from "../ui/SmallText";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Ingrese un correo válido")
    .required("Ingrese un correo")
});

const RequestNewPassword = () => {
  const [errors, setErrors] = useState([]);
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  if (redirectToLogin) {
    return <Redirect to="/requested" />;
  }

  const handleSubmit = async (data, setSubmitting) => {
    const responseData = await user.requestNewPassword(data);
    setSubmitting(false);
    if (responseData.error) {
      setErrors([{ message: responseData.error }]);
    } else {
      setRedirectToLogin(true);
    }
  };

  const extraButtons = () => (
    <SmallText>
      <DarkLink to="/login">Volver</DarkLink>
    </SmallText>
  );

  return (
    <FormikForm
      validationSchema={validationSchema}
      initialValues={{ email: "" }}
      handleSubmit={handleSubmit}
      title="Recuperar contraseña"
      extraButtons={extraButtons}
      submitName="Enviar correo"
      errors={errors}
    >
      <InputContainer>
        <TextField placeholder="Correo" name="email" type="email" />
      </InputContainer>
    </FormikForm>
  );
};

export default RequestNewPassword;
