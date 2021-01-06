import { NextPage } from "next";
import React, { useRef } from "react";
import { Formik, Form, FormikProps } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import AuthFormPage from "../../components/auth/AuthFormPage";
import usePrefilledEmail, { prefilledEmailQueryKey } from "../../lib/auth/hooks/usePrefilledEmail";
import { LoginFormValues, translateFirebaseError } from "../../lib/auth/forms";
import Button from "../../components/button/Button";
import { auth } from "../../lib/firebase/firebase";
import EmailAndPassword from "../../components/auth/EmailAndPassword";
import { signupLink } from "../../lib/auth/href";
import useRedirectUri, { redirectUriQueryKey } from "../../lib/auth/hooks/useRedirectUri";
import { useAuth } from "../../lib/auth/AuthContext";

/**
 * Login page. Used to log in.
 *
 * @returns JSX element.
 */
const LoginPage: NextPage = () => {
  const router = useRouter();
  const initialEmail = usePrefilledEmail();
  const redirectUri = useRedirectUri();
  const formRef = useRef<FormikProps<LoginFormValues>>();
  const { user } = useAuth();

  const initialValues: LoginFormValues = {
    email: initialEmail,
    password: "",
  };

  if (user) {
    router.push(redirectUri);
  }

  return (
    <AuthFormPage title="Inloggning">
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
          auth.signInWithEmailAndPassword(email, password).then(() => {
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
              {isSubmitting ? "Loggar in ..." : "Logga in"}
            </Button>
            <p>
              Har du inget konto?
              {" "}
              <Link href={signupLink({
                [prefilledEmailQueryKey]: formRef.current?.values?.email,
                [redirectUriQueryKey]: redirectUri,
              })}
              >
                <a>Skapa ett</a>
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </AuthFormPage>
  );
};

export default LoginPage;
