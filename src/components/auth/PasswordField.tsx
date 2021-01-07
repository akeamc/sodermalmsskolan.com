import { Field } from "formik";
import React, { FunctionComponent } from "react";
import { validatePassword } from "../../lib/auth/forms";
import TextField, { TextFieldProps } from "../form/field/TextField";

/**
 * Field used for passwords.
 *
 * @param {Partial<TextFieldProps>} props Props passed to the inner `TextField`.
 *
 * @returns {React.ReactElement} The rendered field.
 */
const PasswordField: FunctionComponent<Partial<TextFieldProps>> = ({
  ...textFieldProps
}) => (
  <Field name="password" validate={validatePassword}>
    {({
      field,
      meta: {
        error,
      },
    }) => (
      <TextField {...field} type="password" placeholder="Lösenord" error={error} {...textFieldProps} />
    )}
  </Field>
);

export default PasswordField;
