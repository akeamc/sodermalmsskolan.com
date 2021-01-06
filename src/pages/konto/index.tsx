import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import AccountCard from "../../components/account/AccountCard";
import AccountSettingsSection from "../../components/account/AccountSettingsSection";
import Base from "../../components/Base";
import Section from "../../components/section/Section";
import { useAuth } from "../../lib/auth/AuthContext";
import { loginLink } from "../../lib/auth/href";

/**
 * Account overview page (seems unfinished because it is).
 *
 * @returns {React.ReactElement} JSX element.
 */
const Page: NextPage = () => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  if (!user && !isLoading) {
    router.push(loginLink());
    return <>Omdirigerar ...</>;
  }

  return (
    <Base metadata={{
      title: "Konto",
    }}
    >
      <Section>
        <AccountCard />
      </Section>
      <AccountSettingsSection />
    </Base>
  );
};

export default Page;
