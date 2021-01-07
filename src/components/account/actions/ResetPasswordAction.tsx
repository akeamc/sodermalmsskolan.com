import { Form, Formik, FormikProps } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { translateFirebaseError } from "../../../lib/auth/forms";
import { prefilledEmailQueryKey } from "../../../lib/auth/hooks/usePrefilledEmail";
import { redirectUriQueryKey } from "../../../lib/auth/hooks/useRedirectUri";
import { loginLink } from "../../../lib/auth/href";
import { auth } from "../../../lib/firebase/firebase";
import AuthFormPage from "../../auth/AuthFormPage";
import PasswordField from "../../auth/PasswordField";
import SubmitButton from "../../form/SubmitButton";
import InlineSkeleton from "../../skeleton/InlineSkeleton";
import { AccountAction } from "./types";

export interface PasswordResetValues {
  password: string;
}

/**
 * Component used for resetting passwords.
 *
 * @param {import("./types").AccountActionProps} props The props.
 *
 * @returns {React.ReactElement} The rendered form.
 */
const ResetPasswordAction: AccountAction = ({
  oobCode,
  continueUrl,
}) => {
  const router = useRouter();
  const [email, setEmail] = useState<string>();
  const formRef = useRef<FormikProps<PasswordResetValues>>();

  /**
   * Handle error.
   *
   * @param {any} error The Firebase error to be handled.
   */
  const handleError = (error) => {
    const { message } = translateFirebaseError(error);
    formRef.current?.setFieldError("password", message);
  };

  useEffect(() => {
    auth.verifyPasswordResetCode(oobCode)
      .then(setEmail)
      .catch(handleError);
  }, [oobCode, continueUrl]);

  const initialValues: PasswordResetValues = {
    password: "",
  };

  return (
    <AuthFormPage
      title="Lösenordsbyte"
      description={email ? (
        <>
          Byt lösenordet för
          {" "}
          <code>{email}</code>
        </>
      ) : <InlineSkeleton width="80%" />}
      metadata={{
        noIndex: true,
      }}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={({ password }, { setSubmitting }) => {
          auth.confirmPasswordReset(oobCode, password)
            .then(() => {
              const path = loginLink({
                [prefilledEmailQueryKey]: email,
                [redirectUriQueryKey]: continueUrl,
              });

              toast.success("Lösenordet har ändrats.");
              router.push(path);
            })
            .catch(handleError)
            .finally(() => {
              setSubmitting(false);
            });
        }}
        innerRef={formRef}
      >
        <Form>
          <PasswordField placeholder="Nytt lösenord" disabled={!email} />
          <SubmitButton disabled={email ? undefined : true}>Byt lösenord</SubmitButton>
        </Form>
      </Formik>
    </AuthFormPage>
  );
};

export default ResetPasswordAction;
