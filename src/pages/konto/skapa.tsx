import Link from "next/link";
import React from "react";
import { FormWrapper } from "../../components/auth/FormWrapper";
import { SignupForm } from "../../components/auth/SignupForm";
import { Anchor } from "../../components/basic/Typography";
import { MinimalLayout } from "../../components/layout/Layout/Minimal";
import { loginLink } from "../../lib/auth/href";

const Page: React.FunctionComponent = () => {
  return (
    <MinimalLayout>
      <FormWrapper
        headline="Skapa konto"
        sub={
          <>
            Har du redan ett konto?{" "}
            <Link href={loginLink()} passHref>
              <Anchor>Logga in</Anchor>
            </Link>
          </>
        }
      >
        <SignupForm />
      </FormWrapper>
    </MinimalLayout>
  );
};

export default Page;
