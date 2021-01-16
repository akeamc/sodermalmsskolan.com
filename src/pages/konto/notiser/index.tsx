import { NextPage } from "next";
import React from "react";
import AccountSettingsPage from "../../../components/account/settings/AccountSettingsPage";

/**
 * Notifications settings page.
 *
 * @returns {React.ReactElement} The rendered page.
 */
const Page: NextPage = () => (
  <AccountSettingsPage title="Notiser">
    notisinställningar
  </AccountSettingsPage>
);

export default Page;
