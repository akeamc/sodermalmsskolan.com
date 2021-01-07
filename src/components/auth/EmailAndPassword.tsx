import React, { FunctionComponent } from "react";
import EmailField from "./EmailField";
import PasswordField from "./PasswordField";

/**
 * Reusable component used to display email-and-password text fields.
 *
 * @returns {React.ReactElement} The text fields.
 */
const EmailAndPassword: FunctionComponent = () => (
  <>
    <EmailField />
    <PasswordField />
  </>
);

export default EmailAndPassword;
