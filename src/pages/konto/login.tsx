import Link from "next/link";
import React from "react";
import { FormWrapper } from "../../components/auth/FormWrapper";
import { LoginForm } from "../../components/auth/LoginForm";
import { Anchor } from "../../components/basic/Typography";
import { MinimalLayout } from "../../components/layout/Layout/Minimal";
import { signupLink } from "../../lib/auth/href";

const Page: React.FunctionComponent = () => {
  return (
    <MinimalLayout>
      <FormWrapper
        headline="Logga in"
        sub={
          <>
            Har du inget konto?{" "}
            <Link href={signupLink()} passHref>
              <Anchor>Skapa ett</Anchor>
            </Link>
          </>
        }
      >
        <LoginForm />
      </FormWrapper>
    </MinimalLayout>
  );
};

export default Page;
