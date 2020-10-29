import React from "react";
import { Layout } from "../components/layout/Layout";
import { Navigation } from "../components/layout/Navigation";
import { SimpleHero } from "../components/layout/Hero/Simple";
import { ButtonRow, Button } from "../components/basic/Button";
import withAuth from "../hocs/withAuth";
import { useAuth } from "../providers/Auth";
import { LogOut } from "react-feather";

const Page: React.FunctionComponent = () => {
  const { user } = useAuth();

  return (
    <Layout
      metadata={{
        title: "Konto",
      }}
    >
      <Navigation />
      <SimpleHero
        title={`Hej ${user?.displayName}!`}
        lead={`Inloggad som ${user?.discord?.username}.`}
      >
        <ButtonRow center>
          <Button href="/api/auth/logout" icon={<LogOut />}>
            Logga ut
          </Button>
        </ButtonRow>
      </SimpleHero>
    </Layout>
  );
};

export default withAuth(Page);
