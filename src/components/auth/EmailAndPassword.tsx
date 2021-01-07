import { Field } from "formik";
import React, { FunctionComponent } from "react";
import { validatePassword } from "../../lib/auth/forms";
import TextField from "../form/field/TextField";
import EmailField from "./EmailField";

/**
 * Reusable component used to display email-and-password text fields.
 *
 * @returns {React.ReactElement} The text fields.
 */
const EmailAndPassword: FunctionComponent = () => (
  <>
    <EmailField />
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
