import { Field, Form, FormikValues } from "formik";
import React, { FunctionComponent } from "react";
import { useAuth } from "../../../lib/auth/AuthContext";
import { translateFirebaseError } from "../../../lib/auth/forms";
import TextField from "../../form/field/TextField";
import AccountSetting from "../AccountSetting";

export interface Values extends FormikValues {
  displayName: string;
}

/**
 *
 */
const DisplayNameSetting: FunctionComponent = () => {
  const { user } = useAuth();

  const initialValues: Values = {
    displayName: user?.displayName,
  };

  return (
    <AccountSetting
      label="Namn"
      initialValues={initialValues}
      onSubmit={({ displayName }, { setSubmitting, setFieldError }) => {
        user.updateProfile({
          displayName,
        }).catch((error) => {
          const { message } = translateFirebaseError(error);
          setFieldError("displayName", message);
        }).finally(() => {
          setSubmitting(false);
        });
      }}
    >
      {() => (
        <Form>
          <Field name="displayName">
            {({
              field,
              meta: {
                error,
              },
            }) => (
              <TextField {...field} type="text" placeholder="Namn" error={error} />
            )}
          </Field>
        </Form>
      )}
    </AccountSetting>
  );
};

export default DisplayNameSetting;
