import { NextPage } from "next";
import React, { useRef } from "react";
import { Formik, Form, FormikProps } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import AuthFormPage from "../../components/auth/AuthFormPage";
import usePrefilledEmail from "../../lib/auth/hooks/usePrefilledEmail";
import { LoginFormValues, translateFirebaseError } from "../../lib/auth/forms";
import Button from "../../components/button/Button";
import { auth } from "../../lib/firebase/firebase";
import EmailAndPassword from "../../components/auth/EmailAndPassword";
import { signupLink } from "../../lib/auth/href";
import useRedirectUri from "../../lib/auth/hooks/useRedirectUri";

const Page: NextPage = () => {
  const router = useRouter();
  const initialEmail = usePrefilledEmail();
  const redirectUri = useRedirectUri();
  const formRef = useRef<FormikProps<LoginFormValues>>();

  const initialValues: LoginFormValues = {
    email: initialEmail,
    password: "",
  };

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
                email: formRef.current?.values?.email,
                redirect: redirectUri,
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

export default Page;
