import { Field } from "formik";
import React, { FunctionComponent } from "react";
import { validateEmail } from "../../lib/auth/forms";
import TextField from "../form/field/TextField";

/**
 * Field used for emails. Batteries included.
 *
 * @returns {React.ReactElement} The rendered field.
 */
const EmailField: FunctionComponent = () => (
  <Field name="email" validate={validateEmail}>
    {({
      field,
      meta: {
        error,
      },
    }) => (
      <TextField {...field} type="email" placeholder="E-post" autoComplete="email" error={error} />
    )}
  </Field>
);

export default EmailField;
