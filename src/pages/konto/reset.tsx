import React from "react";
import { FormWrapper } from "../../components/auth/FormWrapper";
import { ResetForm } from "../../components/auth/ResetForm";
import { MinimalLayout } from "../../components/layout/Layout/Minimal";

const Page: React.FunctionComponent = () => {
  return (
    <MinimalLayout>
      <FormWrapper
        headline="Återställ konto"
        sub="Om du har glömt lösenordet kan du återställa det här."
      >
        <ResetForm />
      </FormWrapper>
    </MinimalLayout>
  );
};

export default Page;
