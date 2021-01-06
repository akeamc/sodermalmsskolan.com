import { NextPage } from "next";
import React, { useRef } from "react";
import { Formik, Form, FormikProps } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import AuthFormPage from "../../components/auth/AuthFormPage";
import usePrefilledEmail, { prefilledEmailQueryKey } from "../../lib/auth/hooks/usePrefilledEmail";
import { SignupFormValues, translateFirebaseError } from "../../lib/auth/forms";
import Button from "../../components/button/Button";
import { auth } from "../../lib/firebase/firebase";
import EmailAndPassword from "../../components/auth/EmailAndPassword";
import { loginLink } from "../../lib/auth/href";
import useRedirectUri, { redirectUriQueryKey } from "../../lib/auth/hooks/useRedirectUri";
import { useAuth } from "../../lib/auth/AuthContext";

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
  const { user } = useAuth();

  const initialValues: SignupFormValues = {
    email: initialEmail,
    password: "",
  };

  if (user) {
    router.push(redirectUri);
  }

  return (
    <AuthFormPage title="Registrering">
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
            <Button type="submit" disabled={isSubmitting} primary>
              {isSubmitting ? "Skapar konto ..." : "Skapa konto"}
            </Button>
            <p>
              Har du redan ett konto?
              {" "}
              <Link href={loginLink({
                [prefilledEmailQueryKey]: formRef.current?.values?.email,
                [redirectUriQueryKey]: redirectUri,
              })}
              >
                <a>Logga in</a>
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </AuthFormPage>
  );
};

export default RegistrationPage;
