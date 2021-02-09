import { NextPage } from "next";
import React, { useRef } from "react";
import { Formik, Form, FormikProps } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import AuthFormPage from "../../components/auth/AuthFormPage";
import usePrefilledEmail, { prefilledEmailQueryKey } from "../../lib/auth/hooks/usePrefilledEmail";
import { SignupFormValues, translateFirebaseError } from "../../lib/auth/forms";
import { auth } from "../../lib/firebase/firebase";
import EmailAndPassword from "../../components/auth/EmailAndPassword";
import { loginLink } from "../../lib/auth/href";
import useRedirectUri, { redirectUriQueryKey } from "../../lib/auth/hooks/useRedirectUri";
import FormText from "../../components/form/text/FormText";
import SubmitButton from "../../components/form/SubmitButton";
import { sendEmailVerification } from "../../components/account/EmailVerificationButton";
import reportEvent from "../../lib/analytics/reportEvent";

/**
 * The page used by users to create an account.
 *
 * @returns {React.ReactElement} JSX element.
 */
const RegistrationPage: NextPage = () => {
  const router = useRouter();
  const initialEmail = usePrefilledEmail();
  const redirectUri = useRedirectUri();
  const formRef = useRef<FormikProps<SignupFormValues>>();

  const initialValues: SignupFormValues = {
    email: initialEmail,
    password: "",
  };

  return (
    <AuthFormPage
      title="Registrering"
      metadata={{
        title: "Registrering",
      }}
      showExternalProviders
      prohibitAuthenticated
    >
      <Formik
        initialValues={initialValues}
        enableReinitialize
        innerRef={formRef}
        onSubmit={({
          email,
          password,
        }, {
          setSubmitting,
          setFieldError,
        }) => {
          auth.createUserWithEmailAndPassword(email, password).then(() => {
            reportEvent("sign_up", {
              method: "password",
            });
            sendEmailVerification();
            router.push(redirectUri);
          }).catch((error) => {
            const { field, message } = translateFirebaseError(error);
            setFieldError(field, message);
          }).finally(() => {
            setSubmitting(false);
          });
        }}
      >
        {({
          isSubmitting,
        }) => (
          <Form>
            <EmailAndPassword />
            <SubmitButton>
              {isSubmitting ? "Skapar konto ..." : "Skapa konto"}
            </SubmitButton>
            <FormText css={{
              marginBottom: 0,
            }}
            >
              Har du redan ett konto?
              {" "}
              <Link href={loginLink({
                [prefilledEmailQueryKey]: formRef.current?.values?.email,
                [redirectUriQueryKey]: redirectUri,
              })}
              >
                <a>Logga in</a>
              </Link>
            </FormText>
          </Form>
        )}
      </Formik>
    </AuthFormPage>
  );
};

export default RegistrationPage;
