import React from "react";
import { DefaultLayout } from "../../components/layout/Layout/Default";
import { Navigation } from "../../components/layout/Navigation";
import { SimpleHero } from "../../components/layout/Hero/Simple";
import { ButtonRow, Button } from "../../components/basic/Button";
import withAuth from "../../hocs/withAuth";
import { sendEmailVerification, signOut, useAuth } from "../../providers/Auth";
import { LogOut } from "react-feather";
import { Anchor } from "../../components/basic/Typography";

const Page: React.FunctionComponent = () => {
  const { user } = useAuth();

  return (
    <DefaultLayout
      metadata={{
        title: "Konto",
      }}
    >
      <Navigation />
      <SimpleHero
        title="Var hälsad"
        lead={
          user.emailVerified ? (
            <>
              Inloggad som <code>{user?.email}</code>.
            </>
          ) : (
            <>
              Din e-postadress har inte bekräftats.{" "}
              <Anchor onClick={() => sendEmailVerification()}>
                Skicka en ny kod
              </Anchor>
            </>
          )
        }
      >
        <ButtonRow center>
          <Button onClick={() => signOut()} icon={<LogOut />}>
            Logga ut
          </Button>
        </ButtonRow>
      </SimpleHero>
    </DefaultLayout>
  );
};

export default withAuth(Page);
