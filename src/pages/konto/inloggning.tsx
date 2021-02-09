import { NextPage } from "next";
import React, { useRef } from "react";
import { Formik, Form, FormikProps } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import AuthFormPage from "../../components/auth/AuthFormPage";
import usePrefilledEmail, { prefilledEmailQueryKey } from "../../lib/auth/hooks/usePrefilledEmail";
import { LoginFormValues, translateFirebaseError } from "../../lib/auth/forms";
import { auth } from "../../lib/firebase/firebase";
import EmailAndPassword from "../../components/auth/EmailAndPassword";
import { AuthQueryParams, resetLink, signupLink } from "../../lib/auth/href";
import useRedirectUri, { redirectUriQueryKey } from "../../lib/auth/hooks/useRedirectUri";
import FormText from "../../components/form/text/FormText";
import SubmitButton from "../../components/form/SubmitButton";
import reportEvent from "../../lib/analytics/reportEvent";

/**
 * Login page. Used to log in.
 *
 * @returns {React.ReactElement} JSX element.
 */
const LoginPage: NextPage = () => {
  const router = useRouter();
  const initialEmail = usePrefilledEmail();
  const redirectUri = useRedirectUri();
  const formRef = useRef<FormikProps<LoginFormValues>>();

  const initialValues: LoginFormValues = {
    email: initialEmail,
    password: "",
  };

  /**
   * Query to pass along to other routes.
   *
   * @returns {AuthQueryParams} Query parameters.
   */
  const query = (): AuthQueryParams => ({
    [prefilledEmailQueryKey]: formRef.current?.values?.email,
    [redirectUriQueryKey]: redirectUri,
  });

  return (
    <AuthFormPage
      title="Inloggning"
      metadata={{
        title: "Inloggning",
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
          auth.signInWithEmailAndPassword(email, password).then(() => {
            reportEvent("login", {
              method: "password",
            });
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
            <FormText>
              <Link href={resetLink(query())}>Glömt lösenordet?</Link>
            </FormText>
            <SubmitButton>
              {isSubmitting ? "Loggar in ..." : "Logga in"}
            </SubmitButton>
            <FormText css={{
              marginBottom: 0,
            }}
            >
              Har du inget konto?
              {" "}
              <Link href={signupLink(query())}>
                <a>Skapa ett</a>
              </Link>
            </FormText>
          </Form>
        )}
      </Formik>
    </AuthFormPage>
  );
};

export default LoginPage;
