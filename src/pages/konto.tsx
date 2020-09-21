import React from "react";
import { Layout } from "../components/layout/Layout";
import { Navigation } from "../components/layout/Navigation";
import { HeroWithTitle } from "../components/layout/Hero/Title";
import { ButtonRow, Button } from "../components/basic/Button";
import withAuth from "../hocs/withAuth";
import { useAuth } from "../providers/Auth";

const Page: React.FunctionComponent = () => {
  const { user } = useAuth();

  return (
    <Layout
      metadata={{
        title: "Konto",
      }}
    >
      <Navigation />
      <HeroWithTitle
        title={`Hej ${user?.displayName}!`}
        lead={`Inloggad som ${user?.discord?.username}.`}
      >
        <ButtonRow center>
          <Button href="/api/auth/logout">Logga ut</Button>
        </ButtonRow>
      </HeroWithTitle>
    </Layout>
  );
};

export default withAuth(Page);
