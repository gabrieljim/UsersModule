import React, { useState } from "react";
import * as yup from "yup";
import { Redirect, useParams } from "react-router-dom";

import * as user from "services/user";

import FormikForm from "components/FormikForm";
import TextField from "components/TextField";
import InputContainer from "ui/InputContainer";

const validationSchema = yup.object().shape({
  password: yup
    .string()
    .required("La contraseña es obligatoria")
    .min(8, "La contraseña debe tener al menos 8 carácteres"),
  passwordConfirmation: yup
    .string()
    .required("Confirme la contraseña")
    .oneOf([yup.ref("password")], "Las contraseñas no coinciden")
});

const RecoverPassword = () => {
  const [errors, setErrors] = useState([]);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const { id, token } = useParams();

  if (redirectToLogin) {
    return <Redirect to={{ pathname: "/login", state: { refresh: true } }} />;
  }

  const handleSubmit = async (data, setSubmitting) => {
    const responseData = await user.updatePassword(data, id, token);
    setSubmitting(false);
    if (responseData.error) {
      setErrors([{ message: responseData.error }]);
    } else {
     setRedirectToLogin(true);
    }
  };

  return (
    <FormikForm
      validationSchema={validationSchema}
      initialValues={{ password: "", passwordConfirmation: "" }}
      handleSubmit={handleSubmit}
      title="Recuperar contraseña"
      submitName="Cambiar contraseña"
      errors={errors}
    >
      <InputContainer>
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

export default RecoverPassword;
