import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import Base from "../../components/Base";
import Button from "../../components/button/Button";
import SimpleHeader from "../../components/header/Simple";
import Section from "../../components/section/Section";
import InlineSkeleton from "../../components/skeleton/InlineSkeleton";
import { useAuth } from "../../lib/auth/AuthContext";
import { loginLink } from "../../lib/auth/href";
import { auth } from "../../lib/firebase/firebase";

/**
 * Account overview page (seems unfinished because it is).
 *
 * @returns JSX element.
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
      <SimpleHeader
        title="Konto"
        sub={(
          <>
            Inloggad som
            {" "}
            {user?.displayName || <InlineSkeleton width="10em" />}
          </>
        )}
      />
      <Section>
        <Button
          onClick={() => {
            auth.signOut();
            router.push("/");
          }}
          type="button"
          primary
        >
          Logga ut
        </Button>
      </Section>
    </Base>
  );
};

export default Page;
