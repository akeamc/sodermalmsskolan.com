import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import AccountActionHandler, { AccountActionMode } from "../../components/account/AccountActionHandler";

/**
 * Account action page.
 *
 * @returns {React.ReactElement} Component.
 */
const AccountActionPage: NextPage = () => {
  const { query } = useRouter();

  const mode = query.mode?.toString() as AccountActionMode;
  const oobCode = query.oobCode?.toString();
  const continueUrl = query.continueUrl?.toString() ?? "/konto";

  return (
    <AccountActionHandler mode={mode} oobCode={oobCode} continueUrl={continueUrl} />
  );
};

export default AccountActionPage;
