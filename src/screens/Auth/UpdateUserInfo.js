import React, { useState } from "react";

import FormikForm from "components/FormikForm";
import * as userServices from "services/user";
import * as yup from "yup";
import TextField from "components/TextField";
import InputContainer from "ui/InputContainer";
import { Button } from "ui/Buttons";
import { Redirect } from "react-router-dom";

const UpdateUserInfo = props => {
  const [errors, setErrors] = useState([]);
  const [done, setDone] = useState(false);
  const { user } = props;

  if (done) {
    return <Redirect to="/dashboard/users" />;
  }

  const extraButtons = () => {
    return (
      <Button type="button" onClick={() => setDone(true)}>
        Volver
      </Button>
    );
  };

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .max(20, "El nombre de usuario no puede ser mayor a 20 caracteres")
      .required("El nombre de usuario es obligatorio"),
    email: yup
      .string()
      .email()
      .required("El correo es obligatorio")
  });

  const handleSubmit = async (data, setSubmitting) => {
    const responseData = await userServices.updateUser({
      changes: data,
      id: user.id
    });
    setSubmitting(false);
    if (responseData.updateError) {
      setErrors([{ message: responseData.updateError }]);
    } else {
      props.goBack();
    }
  };

  return (
    <FormikForm
      title={`Actualizar ${user.username}`}
      initialValues={{
        username: user.username,
        email: user.email
      }}
      validationSchema={validationSchema}
      extraButtons={extraButtons}
      handleSubmit={handleSubmit}
      submitName="Actualizar usuario"
      errors={errors}
    >
      <InputContainer>
        <TextField
          placeholder="Nombre de Usuario"
          name="username"
          type="input"
        />
        <TextField placeholder="Correo" name="email" type="email" />
      </InputContainer>
    </FormikForm>
  );
};

export default UpdateUserInfo;
