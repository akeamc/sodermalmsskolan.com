import { NextPage } from "next";
import React from "react";
import AccountSettingsPage from "../../../components/account/settings/AccountSettingsPage";
import InstagramSettings from "../../../components/account/settings/InstagramSettings";

/**
 * Notifications settings page.
 *
 * @returns {React.ReactElement} The rendered page.
 */
const Page: NextPage = () => (
  <AccountSettingsPage metadata={{
    title: "Notisinställningar",
  }}
  >
    <InstagramSettings />
  </AccountSettingsPage>
);

export default Page;
