import React from "react";
import Input from "../ui/Input";
import ErrorMessage from "../ui/ErrorMessage";
import Theme from "../constants/Theme";
import { Field, useField } from "formik";

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

export default TextField;
