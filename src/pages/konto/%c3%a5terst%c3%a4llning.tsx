import { Form, Formik } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";
import AuthFormPage from "../../components/auth/AuthFormPage";
import EmailField from "../../components/auth/EmailField";
import SubmitButton from "../../components/form/SubmitButton";
import { translateFirebaseError } from "../../lib/auth/forms";
import usePrefilledEmail, { prefilledEmailQueryKey } from "../../lib/auth/hooks/usePrefilledEmail";
import useRedirectUri, { redirectUriQueryKey } from "../../lib/auth/hooks/useRedirectUri";
import { loginLink } from "../../lib/auth/href";
import { auth } from "../../lib/firebase/firebase";

export interface AccountResetValues {
  email: string;
}

/**
 * Account reset page, used to reset accounts that need to be reset.
 *
 * @returns {React.ReactElement} The rendered component.
 */
const AccountResetPage: NextPage = () => {
  const router = useRouter();
  const initialEmail = usePrefilledEmail();
  const redirectUri = useRedirectUri();

  const initialValues: AccountResetValues = {
    email: initialEmail,
  };

  return (
    <AuthFormPage title="Kontoåterställning">
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={({ email }, { setSubmitting, setFieldError }) => {
          auth.sendPasswordResetEmail(email).then(() => {
            toast.success((
              <>
                Ett mejl med instruktioner har skickats till
                {" "}
                <code>{email}</code>
                .
              </>
            ));
            router.push(loginLink({
              [prefilledEmailQueryKey]: email,
              [redirectUriQueryKey]: redirectUri,
            }));
          }).catch((error) => {
            const { message } = translateFirebaseError(error);

            setFieldError("email", message);
          }).finally(() => {
            setSubmitting(false);
          });
        }}
      >
        <Form>
          <EmailField />
          <SubmitButton>Återställ lösenord</SubmitButton>
        </Form>
      </Formik>
    </AuthFormPage>
  );
};

export default AccountResetPage;
