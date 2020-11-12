import { useRouter } from "next/router";
import React from "react";
import { AuthActionProps } from "../../components/auth/action";
import { ResetPassword } from "../../components/auth/action/ResetPassword";
import { VerifyEmail } from "../../components/auth/action/VerifyEmail";
import { FullPageText } from "../../components/basic/Typography";
import { MinimalLayout } from "../../components/layout/Layout/Minimal";

const AuthAction: React.FunctionComponent<{
  mode?: string;
  oobCode?: string;
  continueUrl?: string;
}> = ({ mode, oobCode, continueUrl }) => {
  if (!oobCode) {
    return (
      <FullPageText>
        Missing <code>?oobCode</code> parameter.
      </FullPageText>
    );
  }

  const actionProps: AuthActionProps = {
    oobCode,
    continueUrl,
  };

  switch (mode) {
    case "resetPassword":
      return <ResetPassword {...actionProps} />;
    case "recoverEmail":
      // return <p>recover email</p>;
      break;
    case "verifyEmail":
      return <VerifyEmail {...actionProps} />;
  }

  return (
    <MinimalLayout>
      <FullPageText>
        Invalid <code>?mode</code> (got: <code>{mode}</code>).
      </FullPageText>
    </MinimalLayout>
  );
};

const Page: React.FunctionComponent = () => {
  const router = useRouter();

  const { query } = router;

  const mode = query.mode?.toString();
  const oobCode = query.oobCode?.toString();
  const continueUrl = query.continueUrl?.toString() || "/konto";

  return (
    <MinimalLayout>
      <AuthAction mode={mode} oobCode={oobCode} continueUrl={continueUrl} />
    </MinimalLayout>
  );
};

export default Page;
