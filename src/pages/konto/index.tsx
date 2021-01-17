import { NextPage } from "next";
import React from "react";
import AccountCard from "../../components/account/AccountCard";
import AccountSettingsPage from "../../components/account/settings/AccountSettingsPage";
import DisplayNameSetting from "../../components/account/settings/DisplayNameSetting";

/**
 * General account settings.
 *
 * @returns {React.ReactElement} The rendered page.
 */
const Page: NextPage = () => (
  <AccountSettingsPage metadata={{
    title: "Allmänna inställningar",
  }}
  >
    <AccountCard />
    <DisplayNameSetting />
  </AccountSettingsPage>
);

export default Page;
