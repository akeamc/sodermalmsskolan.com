import { Field } from "formik";
import React, { FunctionComponent } from "react";
import { validateEmail, validatePassword } from "../../lib/auth/forms";
import TextField from "../form/field/TextField";

const EmailAndPassword: FunctionComponent = () => (
  <>
    <Field name="email" validate={validateEmail}>
      {({
        field,
        meta: {
          error,
        },
      }) => (
        <TextField {...field} type="email" placeholder="E-post" error={error} />
      )}
    </Field>
    <Field name="password" validate={validatePassword}>
      {({
        field,
        meta: {
          error,
        },
      }) => (
        <TextField {...field} type="password" placeholder="Lösenord" error={error} />
      )}
    </Field>
  </>
);

export default EmailAndPassword;
