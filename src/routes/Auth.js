import React from "react";

import styled from "styled-components";
import Input from "../ui/Input";
import InputContainer from "../ui/InputContainer";
import Form from "../ui/Form";
import { Button, ContrastButton } from "../ui/Button";

const Auth = () => {
  return (
    <Form>
      <h1>Registro</h1>
      <InputContainer>
        <Input placeholder="Nombre" />
        <Input placeholder="Correo" />
        <Input placeholder="Clave" />
      </InputContainer>
      <InputContainer>
        <Button>Registrarme</Button>
        <Button>Iniciar Sesión</Button>
      </InputContainer>
    </Form>
  );
};

export default Auth;
