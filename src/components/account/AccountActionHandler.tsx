import React, { FunctionComponent } from "react";
import AuthFormPage from "../auth/AuthFormPage";
import { DangerParagraph } from "../text/paragraphs";
import ResetPasswordAction from "./actions/ResetPasswordAction";
import { AccountActionProps } from "./actions/types";
import VerifyEmailAction from "./actions/VerifyEmailAction";

export type AccountActionMode = "resetPassword" | "recoverEmail" | "verifyEmail";

export interface AccountActionHandlerProps extends AccountActionProps {
  mode: AccountActionMode,
}

/**
 * Component used to handle various account actions, such as email verifications and password
 * resets.
 *
 * @param {AccountActionHandlerProps} props The props.
 *
 * @returns {React.ReactElement} Rendered components.
 */
const AccountActionHandler: FunctionComponent<AccountActionHandlerProps> = ({
  mode,
  ...accountActionProps
}) => {
  if (accountActionProps.oobCode) {
    // eslint-disable-next-line default-case
    switch (mode) {
      case "resetPassword": {
        return <ResetPasswordAction {...accountActionProps} />;
      }
      case "verifyEmail": {
        return <VerifyEmailAction {...accountActionProps} />;
      }
      case "recoverEmail": {
        break;
      }
    }
  }

  const error = !accountActionProps.oobCode ? (
    <>
      Missing
      {" "}
      <code>?oobCode</code>
      .
    </>
  ) : (
    <>
      Invalid
      {" "}
      <code>?mode</code>
      {" "}
      (got:
      {" "}
      <code>{mode}</code>
      ).
    </>
  );

  return (
    <AuthFormPage title="Ett fel uppstod">
      <DangerParagraph>
        {error}
      </DangerParagraph>
    </AuthFormPage>
  );
};

export default AccountActionHandler;
