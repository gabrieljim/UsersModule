import React from "react";

import InputContainer from "../ui/InputContainer";
import { Formik } from "formik";
import Form from "../ui/Form";
import { Submit } from "../ui/Buttons";
import ErrorMessage from "../ui/ErrorMessage";

import { Bounce } from "react-activity";
import "react-activity/dist/react-activity.css";

const FormikForm = props => {
  return (
    <Formik
      validateOnChange={true}
      validationSchema={props.validationSchema}
      initialValues={props.initialValues}
      onSubmit={async (data, { setSubmitting }) => {
        setSubmitting(true);
        await props.handleSubmit(data, setSubmitting);
      }}
    >
      {({ isSubmitting }) => (
        <Form style={{ ...props.style }}>
          <h1>{props.title}</h1>
          {props.children}
          {isSubmitting ? (
            <div style={{ margin: 30 }}>
              <Bounce />
            </div>
          ) : (
            <InputContainer>
              {props.errors &&
                props.errors.map(error => (
                  <ErrorMessage key={error.message}>
                    {error.message}
                  </ErrorMessage>
                ))}
              {props.serverError && (
                <ErrorMessage key={props.serverError}>
                  {props.serverError}
                </ErrorMessage>
              )}
              <Submit value={props.submitName} />
              {props.extraButtons && <props.extraButtons />}
            </InputContainer>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default FormikForm;
